/* Pawty family shop on pawtyapp.com.
   Backend is owned by the app project (pawty-app, release 1.8.0):
   - products:   Supabase table "products" (id, slug, sort, price_cents, name, description, images, active)
   - settings:   Supabase table "app_config" (family_on, family_title_<lang>, family_pct, family_code,
                 family_img1..3, ship_si_cents, ship_eu_cents, shop_seller)
   - checkout:   Supabase function "checkout", body {items:[{id,qty}], code, lang, country} -> {url}
   Stripe collects name, delivery address and phone, and returns to /shop?paid=1 or /shop?cancelled=1.
   The website never sees card data and never stores orders. */
(function () {
  var SB = 'https://jjqfspknjpjkcuvtfsli.supabase.co';
  var KEY = 'sb_publishable_h9cryFZyRED8rffIVPtBuw_klaQOTOJ';
  var H = { apikey: KEY, Authorization: 'Bearer ' + KEY };
  var LANGS = ['en','de','es','fr','hr','it','nl','pl','pt','ro','sl'];
  var EU = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE'];
  var MAX_LINES = 20, MAX_QTY = 10;

  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(id) { return document.getElementById(id); }
  function config(keys) {
    return fetch(SB + '/rest/v1/app_config?select=key,value&key=in.(' + keys.join(',') + ')', { headers: H })
      .then(function (r) { if (!r.ok) throw new Error('config ' + r.status); return r.json(); })
      .then(function (rows) { var o = {}; rows.forEach(function (r) { o[r.key] = r.value; }); return o; });
  }

  /* ---------- shop page ---------- */
  var root = $('shop');
  if (root) {
    var T = root.dataset, lang = T.lang || 'en';
    var q = new URLSearchParams(location.search);

    /* The app and Stripe open /shop at the root. Send the visitor to their language version. */
    if (lang === 'en') {
      var want = q.get('lang') || ((q.get('paid') || q.get('cancelled')) ? store('pawty_shop_lang') : null);
      if (want && want !== 'en' && LANGS.indexOf(want) > -1) { location.replace('/' + want + '/shop.html' + location.search); return; }
    }
    if (q.get('code')) store('pawty_shop_code', q.get('code').trim().slice(0, 40));

    var fmt; try { fmt = new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR' }); } catch (e) { fmt = { format: function (n) { return n.toFixed(2) + ' EUR'; } }; }
    var money = function (c) { return fmt.format((c || 0) / 100); };
    var pick = function (o) { if (typeof o === 'string') { try { o = JSON.parse(o); } catch (e) { return o; } } return o ? (o[lang] || o.en || '') : ''; };
    var cart = function () { try { var c = JSON.parse(store('pawty_cart') || '[]'); return Array.isArray(c) ? c : []; } catch (e) { return []; } };
    var setCart = function (c) { store('pawty_cart', JSON.stringify(c)); count(); };
    var count = function () { var n = cart().reduce(function (s, i) { return s + i.qty; }, 0); $('shop-count').textContent = n ? '(' + n + ')' : ''; };
    var products = {}, cfg = {}, codeOk = false;
    var PAW = '<svg viewBox="0 0 64 64" width="44" height="44" aria-hidden="true"><g fill="#BFE3CE"><ellipse cx="32" cy="42" rx="13" ry="11"/><circle cx="17" cy="26" r="6"/><circle cx="27" cy="17" r="6"/><circle cx="38" cy="17" r="6"/><circle cx="48" cy="26" r="6"/></g></svg>';

    function show(view) {
      $('shop-list-view').hidden = view !== 'list';
      $('shop-cart-view').hidden = view !== 'cart';
      if (view === 'cart') renderCart();
      window.scrollTo(0, 0);
    }
    function note(msg, ok) { var n = $('shop-note'); n.textContent = msg || ''; n.className = 'shopnotice' + (ok ? ' shopok' : ''); n.hidden = !msg; }

    function renderList() {
      var ids = Object.keys(products).sort(function (a, b) { return products[a].sort - products[b].sort; });
      var list = $('shop-list');
      if (!ids.length) { list.innerHTML = '<div class="shopsoon"><b class="disp">' + esc(T.soonTitle) + '</b><p>' + esc(T.soonText) + '</p></div>'; return; }
      list.innerHTML = ids.map(function (id) {
        var p = products[id], img = p.images && p.images[0];
        return '<div class="shopitem"><div class="shopimg">' + (img ? '<img src="' + esc(img) + '" alt="' + esc(pick(p.name)) + '" loading="lazy">' : PAW) + '</div><div class="shopbody">'
          + '<h3>' + esc(pick(p.name)) + '</h3>' + (pick(p.description) ? '<p>' + esc(pick(p.description)) + '</p>' : '')
          + '<div class="shoprow"><b>' + money(p.price_cents) + '</b><button class="shopbtn" type="button" data-id="' + esc(id) + '">' + esc(T.add) + '</button></div></div></div>';
      }).join('');
    }

    function totals() {
      var lines = cart().filter(function (i) { return products[i.id]; });
      var sub = lines.reduce(function (s, i) { return s + products[i.id].price_cents * i.qty; }, 0);
      var pct = parseInt(cfg.family_pct, 10) || 0;
      var disc = codeOk ? Math.round(sub * pct / 100) : 0;
      var ship = $('f-country').value === 'SI' ? parseInt(cfg.ship_si_cents, 10) : parseInt(cfg.ship_eu_cents, 10);
      if (isNaN(ship)) ship = 0;
      return { lines: lines, sub: sub, disc: disc, pct: pct, ship: ship, total: sub - disc + ship };
    }
    function renderCart() {
      var t = totals(), box = $('cart-lines');
      $('cart-form').hidden = !t.lines.length;
      if (!t.lines.length) { box.innerHTML = '<p class="shopmsg">' + esc(T.empty) + '</p>'; return; }
      var h = t.lines.map(function (i) {
        var p = products[i.id];
        return '<div class="cartline"><span>' + esc(pick(p.name)) + '</span>'
          + '<span class="cartqty"><button type="button" data-d="-1" data-id="' + esc(i.id) + '" aria-label="-">−</button><b aria-label="' + esc(T.qty) + '">' + i.qty + '</b><button type="button" data-d="1" data-id="' + esc(i.id) + '" aria-label="+">+</button></span>'
          + '<b>' + money(p.price_cents * i.qty) + '</b></div>';
      }).join('');
      h += '<div class="cartline cartsub"><span>' + esc(T.shipping) + '</span><span></span><b>' + (t.ship ? money(t.ship) : esc(T.free)) + '</b></div>';
      if (t.disc) h += '<div class="cartline cartcode"><span>' + esc(T.code) + ' ' + esc(cfg.family_code) + '</span><span></span><b>−' + t.pct + '%</b></div>';
      h += '<div class="cartline carttotal"><span>' + esc(T.total) + '</span><span></span><b>' + money(t.total) + '</b></div>';
      box.innerHTML = h;
    }
    function applyCode(silent) {
      var v = $('f-code').value.trim();
      codeOk = !!v && !!cfg.family_code && v.toUpperCase() === String(cfg.family_code).toUpperCase();
      $('code-msg').textContent = v && !codeOk && !silent ? T.codeInvalid : '';
      if (codeOk) store('pawty_shop_code', v); renderCart();
    }

    /* countries, named in the page language */
    (function () {
      var names; try { names = new Intl.DisplayNames([lang], { type: 'region' }); } catch (e) { names = { of: function (c) { return c; } }; }
      var def = store('pawty_shop_country') || (lang === 'sl' ? 'SI' : ({ de: 'DE', es: 'ES', fr: 'FR', hr: 'HR', it: 'IT', nl: 'NL', pl: 'PL', pt: 'PT', ro: 'RO' })[lang] || 'SI');
      $('f-country').innerHTML = EU.map(function (c) { return [c, names.of(c) || c]; })
        .sort(function (a, b) { return a[1].localeCompare(b[1], lang); })
        .map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === def ? ' selected' : '') + '>' + esc(o[1]) + '</option>'; }).join('');
    })();
    $('f-code').value = store('pawty_shop_code') || '';
    count();

    if (q.get('paid')) { setCart([]); store('pawty_shop_lang', null); note(T.thanks, true); }
    else if (q.get('cancelled')) note(T.cancelled, false);
    if (q.get('paid') || q.get('cancelled')) history.replaceState(null, '', location.pathname);

    Promise.all([
      fetch(SB + '/rest/v1/products?select=id,slug,sort,price_cents,name,description,images&active=eq.true&order=sort', { headers: H }).then(function (r) { if (!r.ok) throw new Error('products ' + r.status); return r.json(); }),
      config(['family_pct', 'family_code', 'ship_si_cents', 'ship_eu_cents'])
    ]).then(function (res) {
      res[0].forEach(function (p) { products[p.id] = p; });
      cfg = res[1];
      setCart(cart().filter(function (i) { return products[i.id]; }));
      renderList(); applyCode(true);
      if (location.hash === '#cart' && cart().length) show('cart');
    }).catch(function (err) { $('shop-list').innerHTML = '<p class="shopmsg">' + esc(T.loadError) + '</p>'; console.error('[Pawty shop]', err); });

    $('shop-list').addEventListener('click', function (e) {
      var b = e.target.closest('.shopbtn'); if (!b) return;
      var c = cart(), id = b.getAttribute('data-id'), row = c.filter(function (i) { return i.id === id; })[0];
      if (row) row.qty = Math.min(MAX_QTY, row.qty + 1); else if (c.length < MAX_LINES) c.push({ id: id, qty: 1 });
      setCart(c); b.textContent = T.added; setTimeout(function () { b.textContent = T.add; }, 1200);
    });
    $('shop-open-cart').addEventListener('click', function () { show('cart'); });
    $('shop-back').addEventListener('click', function () { show('list'); });
    $('cart-lines').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-d]'); if (!b) return;
      var id = b.getAttribute('data-id'), d = parseInt(b.getAttribute('data-d'), 10);
      setCart(cart().map(function (i) { if (i.id === id) i.qty = Math.min(MAX_QTY, i.qty + d); return i; }).filter(function (i) { return i.qty > 0; }));
      renderCart();
    });
    $('f-country').addEventListener('change', function () { store('pawty_shop_country', this.value); renderCart(); });
    $('code-apply').addEventListener('click', function () { applyCode(false); });
    $('pay').addEventListener('click', function () {
      var btn = this, msg = $('pay-msg'); msg.textContent = '';
      var items = cart().filter(function (i) { return products[i.id]; }).map(function (i) { return { id: i.id, qty: i.qty }; });
      if (!items.length) return;
      var body = { items: items, lang: lang, country: $('f-country').value };
      if (codeOk) body.code = $('f-code').value.trim();
      btn.disabled = true; store('pawty_shop_lang', lang);
      fetch(SB + '/functions/v1/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: KEY, Authorization: 'Bearer ' + KEY }, body: JSON.stringify(body) })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (j) {
          if (j && j.url) { location.href = j.url; return; }
          btn.disabled = false; msg.textContent = T.error; console.error('[Pawty shop] checkout', j && j.error);
        })
        .catch(function () { btn.disabled = false; msg.textContent = T.error; });
    });
  }

  /* ---------- Marketplace: "From the Pawty family" card, first, only when family_on is 1 ---------- */
  var card = $('familycard');
  if (card) {
    var L = card.dataset.lang || 'en';
    config(['family_on', 'family_title_' + L, 'family_title_en', 'family_pct', 'family_code', 'family_img1', 'family_img2', 'family_img3'])
      .then(function (c) {
        if (String(c.family_on) !== '1') return;
        var title = c['family_title_' + L] || c.family_title_en || '';
        var imgs = [c.family_img1, c.family_img2, c.family_img3].filter(function (u) { return u && /^https:\/\//.test(u); });
        $('fam-title').textContent = title;
        $('fam-imgs').innerHTML = imgs.map(function (u) { return '<img src="' + esc(u) + '" alt="" loading="lazy">'; }).join('');
        $('fam-imgs').hidden = !imgs.length;
        if (c.family_code && c.family_pct) {
          $('fam-pct').textContent = card.dataset.pct.replace('{pct}', c.family_pct);
          $('fam-code').textContent = c.family_code;
          $('fam-promo').hidden = false;
          $('fam-copy').addEventListener('click', function () {
            var b = this;
            (navigator.clipboard ? navigator.clipboard.writeText(c.family_code) : Promise.reject()).then(function () { b.textContent = card.dataset.copied; setTimeout(function () { b.textContent = card.dataset.copy; }, 1500); }).catch(function () {});
          });
        }
        $('fam-visit').href = (L === 'en' ? '' : '/' + L) + '/shop.html' + (c.family_code ? '?code=' + encodeURIComponent(c.family_code) : '');
        card.hidden = false;
      }).catch(function () {});
  }
})();

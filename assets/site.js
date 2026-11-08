
(function(){
  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!rm && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:0,rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }
  var nums = document.querySelectorAll('.stat .n[data-to]');
  if(nums.length){
    var run = function(el){
      var to = parseInt(el.dataset.to,10), suf = el.dataset.suffix||'', t0 = null;
      if(rm){ el.textContent = to + suf; return; }
      var step = function(t){
        if(!t0) t0 = t;
        var p = Math.min((t-t0)/1100, 1), e = 1-Math.pow(1-p,3);
        el.textContent = Math.round(to*e) + suf;
        if(p<1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if('IntersectionObserver' in window){
      var io2 = new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ run(e.target); io2.unobserve(e.target); } });
      },{threshold:.5});
      nums.forEach(function(n){ io2.observe(n); });
    } else { nums.forEach(run); }
  }
  // pause offscreen videos so nothing burns battery
  if('IntersectionObserver' in window){
    var io3 = new IntersectionObserver(function(es){
      es.forEach(function(e){
        var v = e.target;
        if(e.isIntersecting){ var p = v.play(); if(p&&p.catch) p.catch(function(){}); } else { v.pause(); }
      });
    },{threshold:.25});
    document.querySelectorAll('video[data-auto]').forEach(function(v){ io3.observe(v); });
  }
})();

(function(){
  var box=document.getElementById('plogos'); if(!box) return;
  fetch('https://jjqfspknjpjkcuvtfsli.supabase.co/rest/v1/partners?select=name,logo_url,sort&active=eq.true&order=sort,name',
    {headers:{apikey:'sb_publishable_h9cryFZyRED8rffIVPtBuw_klaQOTOJ',Authorization:'Bearer sb_publishable_h9cryFZyRED8rffIVPtBuw_klaQOTOJ'}})
  .then(function(r){return r.ok?r.json():[];})
  .then(function(rows){
    var seen={}, out='';
    (rows||[]).forEach(function(r){
      if(!r.logo_url || seen[r.name]) return; seen[r.name]=1;
      out+='<img src="'+r.logo_url.replace(/"/g,'')+'" alt="'+String(r.name).replace(/[<>"]/g,'')+'" loading="lazy">';
    });
    box.innerHTML=out;
  }).catch(function(){ box.remove(); });
})();

(function(){
  function closeAll(except){ document.querySelectorAll('details.lang[open]').forEach(function(d){ if(d!==except) d.removeAttribute('open'); }); }
  document.addEventListener('click',function(e){ var d=e.target.closest && e.target.closest('details.lang'); closeAll(d); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ var d=document.querySelector('details.lang[open]'); if(d){ d.removeAttribute('open'); d.querySelector('summary').focus(); } } });
})();

(function(){
  // current page in the menu
  var here = location.pathname.replace(/\/(de|es|fr|hr|it|nl|pl|pt|ro|sl)\//,'/').replace(/index\.html$/,'');
  document.querySelectorAll('.links a').forEach(function(a){
    var p = a.getAttribute('href').replace(/\/(de|es|fr|hr|it|nl|pl|pt|ro|sl)\//,'/').replace(/index\.html$/,'');
    if(p === here || (p === '/' && (here === '' || here === '/'))) a.setAttribute('aria-current','page');
  });

  // Try it with Nala: pick a skill, show step 1 and the photo
  var tr = document.getElementById('try');
  if(tr){
    var img = tr.querySelector('.shot img'), step = tr.querySelector('.stepbox .v');
    tr.querySelectorAll('[data-step]').forEach(function(b){
      b.addEventListener('click', function(){
        tr.querySelectorAll('[data-step]').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
        step.textContent = b.getAttribute('data-step');
        img.src = b.getAttribute('data-img'); img.alt = b.getAttribute('data-alt');
      });
    });
    var msgs = (tr.getAttribute('data-msgs') || '').split('|'), out = tr.querySelector('.ratemsg');
    var paws = tr.querySelectorAll('.rate button');
    paws.forEach(function(b, i){
      b.addEventListener('click', function(){
        paws.forEach(function(x, j){ x.classList.toggle('on', j <= i); x.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
        out.textContent = msgs[i] || '';
      });
    });
  }

  // filter chips on guides and blog
  document.querySelectorAll('[data-filter]').forEach(function(bar){
    var target = document.getElementById(bar.getAttribute('data-filter'));
    var count = document.getElementById(bar.getAttribute('data-filter') + '-count');
    var tpl = count ? count.getAttribute('data-tpl') : '';
    bar.addEventListener('click', function(e){
      var b = e.target.closest('button'); if(!b) return;
      var c = b.getAttribute('data-c'), n = 0;
      bar.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
      Array.prototype.forEach.call(target.children, function(el){
        var on = c === 'all' || el.getAttribute('data-c') === c;
        el.hidden = !on; if(on) n++;
      });
      if(count) count.textContent = tpl.replace('{n}', n);
    });
  });

  // marketplace: show the first 9 offers, then a button for the rest
  var mk = document.getElementById('mk-list');
  if(mk && 'MutationObserver' in window){
    var label = mk.getAttribute('data-more') || 'Show all {n}';
    var all = false, busy = false;
    var trim = function(){
      if(busy) return; busy = true;
      var cards = mk.querySelectorAll('.mkcard'), old = document.getElementById('mk-more');
      if(old) old.remove();
      cards.forEach(function(c, i){ c.hidden = !all && i >= 9; });
      if(!all && cards.length > 9){
        var w = document.createElement('div'); w.className = 'mkmore'; w.id = 'mk-more';
        var b = document.createElement('button'); b.type = 'button'; b.className = 'chip';
        b.textContent = label.replace('{n}', cards.length);
        b.addEventListener('click', function(){ all = true; trim(); });
        w.appendChild(b); mk.parentNode.insertBefore(w, mk.nextSibling);
      }
      busy = false;
    };
    new MutationObserver(function(){ all = false; trim(); }).observe(mk, {childList:true});
  }
})();

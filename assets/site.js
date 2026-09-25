
(function(){
  var rm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!rm && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    },{threshold:.12});
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

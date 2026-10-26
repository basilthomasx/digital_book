(function(){
  var total=5,cur=1,dots=document.getElementById('dots');
  for(var i=1;i<=total;i++){(function(n){var b=document.createElement('button');b.setAttribute('aria-label','Go to page '+n);b.onclick=function(){go(n)};dots.appendChild(b)})(i)}
  function go(n){
    n=Math.max(1,Math.min(total,n));var back=n<cur;cur=n;
    for(var i=1;i<=total;i++){var el=document.getElementById('p'+i);el.classList.remove('on','back');if(i===n){void el.offsetWidth;el.classList.add('on');if(back)el.classList.add('back')}el.setAttribute('aria-hidden',i!==n)}
    document.getElementById('pn').textContent='Page '+n+' of '+total;
    document.getElementById('bar').style.width=(n/total*100)+'%';
    document.getElementById('prev').disabled=(n===1);
    document.getElementById('next').disabled=(n===total);
    var d=dots.children;for(var j=0;j<d.length;j++)d[j].setAttribute('aria-current',(j+1===n)?'true':'false');
    try{history.replaceState(null,'','#p'+n)}catch(e){}
    window.scrollTo(0,0);
  }
  document.getElementById('prev').onclick=function(){go(cur-1)};
  document.getElementById('next').onclick=function(){go(cur+1)};
  document.addEventListener('keydown',function(e){var t=e.target.tagName;if(t==='INPUT'||t==='SELECT')return;if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
  var sx=null;
  document.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  document.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;var t=e.target.tagName;if(Math.abs(dx)>70&&t!=='INPUT'&&t!=='SELECT')go(cur+(dx<0?1:-1))},{passive:true});

  var root=document.documentElement;
  document.getElementById('theme').onclick=function(){
    var dark=root.getAttribute('data-theme')?root.getAttribute('data-theme')==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
    root.setAttribute('data-theme',dark?'light':'dark');
  };

  function picker(group,info,texts){
    var cs=document.querySelectorAll('#'+group+' .chip');
    cs.forEach(function(c){c.onclick=function(){
      cs.forEach(function(k){k.classList.remove('act')});c.classList.add('act');
      document.getElementById(info).innerHTML=texts[+c.dataset.k];
    }});
  }
  picker('acts','actinfo',[
    '<b>Communication.</b> Talk with stakeholders to understand objectives and gather requirements.',
    '<b>Planning.</b> Create the plan: tasks, risks, resources, work products and schedule.',
    '<b>Modeling.</b> Build models (sketches, diagrams, designs) to understand requirements and shape the solution.',
    '<b>Construction.</b> Generate code and test it to uncover errors.',
    '<b>Deployment.</b> Deliver the software (whole or an increment) to the customer, who evaluates it and gives feedback.']);
  picker('scrum','scrinfo',[
    '<b>Product Backlog.</b> The ordered list of everything the product might need, owned by the Product Owner.',
    '<b>Sprint Planning.</b> The team picks backlog items for the sprint and agrees a sprint goal.',
    '<b>Daily Scrum.</b> A short daily check so Developers can inspect progress and adjust the plan.',
    '<b>Sprint Review.</b> The team shows the increment to stakeholders and gathers feedback.',
    '<b>Retrospective.</b> The team reflects on how it worked and plans improvements for the next sprint.']);

  var S={w:'<b>Waterfall.</b> With stable, well-understood requirements, a linear plan works and is easy to manage.',
         i:'<b>Incremental.</b> Deliver a working core first, then add features in later increments.',
         p:'<b>Prototyping.</b> Show a quick version, collect feedback, and refine until the need is clear.',
         s:'<b>Spiral.</b> Each cycle starts with risk analysis, which suits large, high-risk systems.'};
  document.getElementById('scn').onchange=function(){document.getElementById('scninfo').innerHTML=S[this.value]||'The suggested model appears here.'};

  document.querySelectorAll('#quiz .chip').forEach(function(c){c.onclick=function(){
    var f=document.getElementById('qfb'),ok=c.dataset.a==='1';
    f.style.color=ok?'var(--ok)':'var(--bad)';
    f.textContent=ok?'Correct. Prototyping lets the client react to something real.':'Not quite. Think about a model built on quick feedback.';
  }});

  var m=/^#p([1-5])$/.exec(location.hash);go(m?+m[1]:1);
})();

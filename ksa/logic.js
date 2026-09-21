/* ================= HELPERS ================= */
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
function shotBlock(src,cap,alt,note){
  var h='<div class="shot"><div class="shot-bar"><span class="dot"></span><span class="dot"></span><span class="dot"></span>'
       +'<span class="shot-cap">'+esc(cap)+'</span></div>'
       +'<img src="'+esc(src)+'" alt="'+esc(alt)+'" loading="lazy">';
  if(note)h+='<div class="shot-note">'+note+'</div>';
  return h+'</div>';
}

/* ================= CHAPTER NAV ================= */
var nav=document.getElementById("chapnav");
CHAPTERS.forEach(function(c){
  var b=el("button","chip",'<b>'+c.n+'</b>'+esc(c.t));
  b.type="button";b.dataset.target=c.id;
  b.addEventListener("click",function(){
    var t=document.getElementById(c.id);
    if(t)t.scrollIntoView({block:"start"});
  });
  nav.appendChild(b);
});

/* ================= PERSONAS ================= */
var pTabs=document.getElementById("personaTabs"),pBody=document.getElementById("personaBody");
function renderPersona(i){
  var p=PERSONAS[i];
  pBody.innerHTML=
    '<div class="persona-head">'
   +'<span class="persona-face">'+FACES[p.face]+'</span>'
   +'<span class="persona-id"><h3>'+esc(p.nm)+'</h3>'
   +'<span class="persona-role">'+esc(p.ro)+' <b>\u00b7 '+esc(p.loc)+'</b></span>'
   +'<p class="persona-quote">&ldquo;'+esc(p.q)+'&rdquo;</p></span></div>'
   +'<div class="persona-cols">'
   +'<div class="pcol"><h4>What they do</h4><ul class="plist">'+p.does.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul></div>'
   +'<div class="pcol"><h4>What they can finally see</h4><ul class="plist">'+p.sees.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul></div>'
   +'<div class="pcol"><h4>What stops being their problem</h4><ul class="plist win">'+p.wins.map(function(x){return '<li>'+esc(x)+'</li>';}).join("")+'</ul></div>'
   +'</div>';
  Array.prototype.forEach.call(pTabs.children,function(b,j){b.setAttribute("aria-selected",j===i?"true":"false");});
}
PERSONAS.forEach(function(p,i){
  var b=el("button","ptab",'<span class="ptab-ini">'+FACES[p.face]+'</span><span><span class="ptab-nm">'+esc(p.nm)+'</span><span class="ptab-ro">'+esc(p.ro)+'</span></span>');
  b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",i===0?"true":"false");
  b.addEventListener("click",function(){renderPersona(i);});
  pTabs.appendChild(b);
});
renderPersona(0);

/* ================= PROCESS EXPLORER ================= */
var pexTabs=document.getElementById("pexTabs"),
    pexTrack=document.getElementById("pexTrack"),
    pexDetail=document.getElementById("pexDetail"),
    curProc=0,curStep=0;

function renderDetail(){
  var pr=PROCESSES[curProc],s=pr.steps[curStep];
  var src=s.shot||pr.shot, cap=s.shotcap||pr.shotcap, alt=s.shotalt||pr.shotalt;
  pexDetail.innerHTML=
    '<span class="pd-owner">'
   +'<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/></svg>'
   +esc(s.o)+'</span>'
   +'<h3 class="pd-h">'+esc(s.t)+'</h3>'
   +'<p class="pd-desc">'+esc(s.d)+'</p>'
   +'<div class="pd-meta">'+s.m.map(function(m){
       return '<div class="pd-m"><span>'+esc(m[0])+'</span><b>'+esc(m[1])+'</b></div>';}).join("")
   +'</div>'
   +(s.tags&&s.tags.length?'<div class="pd-capt">'+s.tags.map(function(t){
       return '<span class="tagx '+t[0]+'">'+esc(t[1])+'</span>';}).join("")+'</div>':"")
   +shotBlock(src,cap,alt,null);
  Array.prototype.forEach.call(pexTrack.children,function(b,j){
    b.setAttribute("aria-current",j===curStep?"true":"false");});
}
function renderTrack(){
  var pr=PROCESSES[curProc];
  pexTrack.innerHTML="";
  pr.steps.forEach(function(s,i){
    var b=el("button","mstep",'<span class="mstep-n">'+(i+1)+'</span>'
      +'<span><span class="mstep-t">'+esc(s.t)+'</span><span class="mstep-o">'+esc(s.o)+'</span></span>');
    b.type="button";b.setAttribute("role","tab");
    b.addEventListener("click",function(){curStep=i;renderDetail();});
    pexTrack.appendChild(b);
  });
  renderDetail();
}
PROCESSES.forEach(function(pr,i){
  var b=el("button","pex-tab",esc(pr.nm)+'<small>'+esc(pr.sub)+' · '+pr.steps.length+' milestones</small>');
  b.type="button";b.setAttribute("role","tab");b.setAttribute("aria-selected",i===0?"true":"false");
  b.addEventListener("click",function(){
    curProc=i;curStep=0;
    Array.prototype.forEach.call(pexTabs.children,function(x,j){x.setAttribute("aria-selected",j===i?"true":"false");});
    renderTrack();
  });
  pexTabs.appendChild(b);
});
renderTrack();


/* ================= LIGHTBOX ================= */
var lb=document.getElementById("lightbox"),lbImg=document.getElementById("lbImg"),lbClose=document.getElementById("lbClose");
document.addEventListener("click",function(e){
  var t=e.target;
  if(t&&t.tagName==="IMG"&&t.closest(".shot")){
    lbImg.src=t.currentSrc||t.src;lbImg.alt=t.alt||"";lb.hidden=false;
    document.body.style.overflow="hidden";
  }
});
function closeLb(){lb.hidden=true;lbImg.src="";document.body.style.overflow="";}
lb.addEventListener("click",closeLb);
lbClose.addEventListener("click",function(e){e.stopPropagation();closeLb();});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!lb.hidden)closeLb();});

/* ================= SCROLL PROGRESS + ACTIVE CHAPTER ================= */
var prog=document.getElementById("prog"),chips=nav.children,
    secs=CHAPTERS.map(function(c){return document.getElementById(c.id);}),
    ticking=false;
function onScroll(){
  var h=document.documentElement,
      max=h.scrollHeight-h.clientHeight,
      pct=max>0?(h.scrollTop/max)*100:0;
  prog.style.width=pct.toFixed(2)+"%";
  var mark=h.scrollTop+h.clientHeight*0.32,active=-1;
  secs.forEach(function(s,i){if(s&&s.offsetTop<=mark)active=i;});
  for(var i=0;i<chips.length;i++)chips[i].setAttribute("aria-current",i===active?"true":"false");
  if(active>-1){
    var c=chips[active],box=nav.getBoundingClientRect(),cb=c.getBoundingClientRect();
    if(cb.left<box.left+8||cb.right>box.right-8)
      nav.scrollTo({left:c.offsetLeft-box.width/2+cb.width/2,behavior:"smooth"});
  }
  ticking=false;
}
window.addEventListener("scroll",function(){
  if(!ticking){ticking=true;window.requestAnimationFrame(onScroll);}
},{passive:true});
window.addEventListener("resize",onScroll,{passive:true});
window.addEventListener("load",onScroll);
onScroll();

/* ================= THEME TOGGLE ================= */
var root=document.documentElement,tBtn=document.getElementById("themeBtn");
try{var saved=localStorage.getItem("vpm-theme");if(saved)root.setAttribute("data-theme",saved);}catch(e){}
tBtn.addEventListener("click",function(){
  var cur=root.getAttribute("data-theme"),next;
  if(cur)next=cur==="dark"?"light":"dark";
  else next=window.matchMedia("(prefers-color-scheme: dark)").matches?"light":"dark";
  root.setAttribute("data-theme",next);
  try{localStorage.setItem("vpm-theme",next);}catch(e){}
});
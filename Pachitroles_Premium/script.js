const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const WA='528331537611',money=n=>'$'+n.toLocaleString('es-MX'),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const menu=$('.menu'),nav=$('#nav');
const shut=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded',false);menu.textContent='Menú'};
menu.addEventListener('click',()=>{const o=nav.classList.toggle('open');menu.setAttribute('aria-expanded',o);menu.textContent=o?'Cerrar':'Menú'});
document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!menu.contains(e.target))shut()});
nav.addEventListener('click',e=>{if(e.target.closest('a'))shut()});
/* cotizador */
const packs=$$('.card').map(el=>({el,n:+el.dataset.n,p:+el.dataset.p,a:+el.dataset.a,btn:el.querySelector('.go')}));
const sum=$('#sum'),er=$('#er'),tp=$('#tp');
let sel=null,shown=2700,raf;
function tween(to){cancelAnimationFrame(raf);const from=shown,t0=performance.now();
  const step=t=>{const k=Math.min(1,(t-t0)/600),e=1-Math.pow(1-k,3);shown=Math.round(from+(to-from)*e);tp.textContent=money(shown);if(k<1)raf=requestAnimationFrame(step)};
  reduce?(shown=to,tp.textContent=money(to)):raf=requestAnimationFrame(step)}
function pick(p){
  sel=p;
  packs.forEach(x=>{const on=x===p;x.el.classList.toggle('on',on);x.btn.setAttribute('aria-pressed',on);x.btn.setAttribute('aria-label',on?`Paquete de ${x.n} elegido. Agendar`:`Agendar paquete de ${x.n}`)});
  sum.textContent=`Paquete de ${p.n} personas. Anticipo para apartar: ${money(p.a)}.`;tween(p.p);
}
packs.forEach(p=>p.btn.addEventListener('click',()=>{pick(p);$('#f').scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});setTimeout(()=>$('#nm').focus({preventScroll:true}),reduce?0:700)}));
const fe=$('#fe'),t=new Date();
fe.min=new Date(t.getTime()-t.getTimezoneOffset()*6e4).toISOString().slice(0,10);
$('#f').addEventListener('submit',e=>{
  e.preventDefault();
  const nm=$('#nm').value.trim();
  if(!nm||!fe.value){er.textContent=!nm?'Escribe tu nombre para continuar.':'Elige la fecha de tu evento.';(!nm?$('#nm'):fe).focus();return}
  er.textContent='';
  const f=new Date(fe.value+'T12:00:00').toLocaleDateString('es-MX',{dateStyle:'long'});
  const paq=`el paquete de ${sel.n} personas (${money(sel.p)})`;
  const msg=`Hola Pachitroles, soy ${nm}. Quiero reservar ${paq} para un evento (${$('#ev').value.toLowerCase()}) el ${f} en ${$('#zo').value}, con ${sel.n} invitados. ¿Me confirman disponibilidad?`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
});
$('#y').textContent=t.getFullYear();
pick(packs.find(x=>x.n===60));
/* movimiento */
$$('.how li,.pq h2,.card,.inc,.fm,.gal h2,.gg figure,.faq h2,details,.how h2,.end h2,.end .btn').forEach(el=>el.classList.add('rv'));
$$('.how ol,.gg,.fg>div').forEach(par=>[...par.children].forEach((c,i)=>c.style.setProperty('--dl',Math.min(i,6)*.09+'s')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
$$('.rv').forEach(el=>io.observe(el));
/* carrusel de paquetes (celular) */
const mob=()=>matchMedia('(max-width:699px)').matches,cs=$('.cards'),dots=$('.dots');
packs.forEach(()=>dots.append(document.createElement('i')));
const setDot=i=>[...dots.children].forEach((d,k)=>d.classList.toggle('on',k===i));
if(mob()){const c=packs[2].el;cs.scrollLeft=c.offsetLeft-(cs.clientWidth-c.clientWidth)/2}
setDot(2);
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&mob()){const i=packs.findIndex(x=>x.el===e.target);if(packs[i]!==sel)pick(packs[i]);setDot(i)}}),{root:cs,threshold:.7});
packs.forEach(p=>cio.observe(p.el));
/* barra inferior (celular) */
const dock=$('.dock');
addEventListener('scroll',()=>dock.classList.toggle('on',scrollY>260),{passive:true});
document.addEventListener('focusin',e=>{if(e.target.matches('input,select'))dock.classList.add('hide')});
document.addEventListener('focusout',()=>dock.classList.remove('hide'));
/* palabras que cambian */
const words=['cumpleaños','bodas','XV años','bautizos','graduaciones','fiestas de empresa'],rot=$('#rot');let wi=0;
if(!reduce)setInterval(()=>{wi=(wi+1)%words.length;rot.textContent=words[wi];rot.classList.remove('sw');void rot.offsetWidth;rot.classList.add('sw')},2400);
if(!reduce){
  const hero=$('.hero'),cols=['#f4b9a3','#ffc233','#9bc96b','#c9432c'];
  for(let i=0;i<14;i++){const s=document.createElement('span');s.className='cf';const w=6+Math.random()*10;
    s.style.cssText=`left:${Math.random()*96}%;top:${12+Math.random()*84}%;width:${i%2?w:w*2}px;height:${w}px;background:${cols[i%4]};--t:${6+Math.random()*5}s;--dl:-${Math.random()*6}s;rotate:${Math.random()*90}deg`;hero.prepend(s)}
  const top=$('.top'),prog=$('.prog'),wa=$('.wa');let tick=false,ly=0;
  const frame=()=>{tick=false;const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
    prog.style.setProperty('--p',h>0?y/h:0);top.classList.toggle('solid',y>40);
    if(y<innerHeight*1.4)hero.style.setProperty('--sy',Math.min(1,y/700));
    const dy=y-ly;if(Math.abs(dy)>6){wa.classList.toggle('off',y>300&&dy>0);ly=y}};
  addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(frame)}},{passive:true});frame();
  if(matchMedia('(hover:hover)').matches){
    hero.addEventListener('pointermove',e=>{const b=hero.getBoundingClientRect();hero.style.setProperty('--tx',((e.clientX-b.left)/b.width-.5)*2);hero.style.setProperty('--ty',((e.clientY-b.top)/b.height-.5)*2)});
    $$('.btn').forEach(b=>{b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.18}px)`});b.addEventListener('pointerleave',()=>b.style.transform='')});
  }
}

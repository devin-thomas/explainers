(()=>{
const main=document.querySelector('#main'),progress=document.querySelector('#progress');
const files=['overview.html','tools.html','context.html'].map(name=>`/free-zapier-alternatives/${name}`);
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?scrollY/max*100:0}%`}
function initialize(){
 const links=[...document.querySelectorAll('nav a')],sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
 const buttons=[...document.querySelectorAll('.filter')],cards=[...document.querySelectorAll('.tool')],status=document.querySelector('#status');
 function filter(mode){let count=0;cards.forEach(card=>{const show=mode==='all'||card.dataset.modes.split(/\s+/).includes(mode);card.hidden=!show;if(show)count++});buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===mode)));const label=mode==='all'?'':`${mode.replace('selfhost','self-hosted')} `;status.textContent=`Showing ${count} ${label}alternative${count===1?'':'s'}.`}
 buttons.forEach(button=>button.addEventListener('click',()=>filter(button.dataset.filter)));
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;links.forEach(link=>link.removeAttribute('aria-current'));links.find(link=>link.getAttribute('href')===`#${entry.target.id}`)?.setAttribute('aria-current','true')}),{rootMargin:'-24% 0px -68% 0px'});
 sections.forEach(section=>observer.observe(section));filter('all');updateProgress();
}
Promise.all(files.map(file=>fetch(file).then(response=>{if(!response.ok)throw new Error(`${response.status} ${file}`);return response.text()})))
 .then(parts=>{main.innerHTML=parts.join('\n');initialize()})
 .catch(error=>{console.error(error);main.innerHTML='<div class="load-error"><strong>The explainer could not load.</strong><br>Refresh the page or return to the <a href="/">Explainers catalog</a>.</div>'});
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);updateProgress();
})();

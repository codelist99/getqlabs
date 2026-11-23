let me;
let links=[];
let savedContent=[];

const productNames={
  oto1:'MoneyLabs Done-For-You',
  oto2:'MoneyLabs Automated Profits',
  oto3:'MoneyLabs Instant Income',
  oto4:'MoneyLabs Cyber Protection',
  oto5:'MoneyLabs Autopilot Earnings',
  oto6:'MoneyLabs High-Ticket Payout',
  oto7:'MoneyLabs Reseller & License Rights'
};
const viewProducts={dfy:'oto1',automated:'oto2',instant:'oto3',cyber:'oto4',autopilot:'oto5','high-ticket':'oto6',license:'oto7'};
const premiumCopy={
  dfy:['Done-For-You Profit Kits','Use proven campaign angles and promotion blueprints.'],
  automated:['Automated Profits Planner','Build repeatable campaign workflows and promotion schedules.'],
  instant:['Instant Income Launcher','Turn one offer into a ready-to-post daily action plan.'],
  cyber:['Cyber Protection Center','Apply account security, link safety, and scam-prevention checks.'],
  autopilot:['Autopilot Earnings Center','Organize recurring promotions and follow-up campaigns.'],
  'high-ticket':['High-Ticket Payout Center','Position premium offers with longer-form authority content.'],
  license:['Reseller & License Rights','Submit your license request and receive fulfillment support.']
};
const has=product=>me.isAdmin||me.entitlements.includes(product);
const esc=value=>String(value||'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

async function api(path,options){
  const response=await fetch(path,options);
  const data=await response.json();
  if(response.status===401){location.href='/member-login';throw Error('Sign in required')}
  if(!response.ok)throw Error(data.error||'Request failed');
  return data;
}
function shell(title,subtitle,body){return `<div class="hero"><span class="eyebrow">MONEYLABS MEMBER SYSTEM</span><h1>${title}</h1><p>${subtitle}</p></div>${body}`}
function locked(product){return shell('Upgrade Required',`${productNames[product]} is not included with this account. Access is based on completed MoneyLabs purchases.`,`<div class="card" style="margin-top:22px"><h3>Unlock ${productNames[product]}</h3><p>Contact support if you already purchased this upgrade and it is not showing.</p><a class="button" href="mailto:support@kairostechnologylabs.com">Contact support</a></div>`)}
function dashboard(){return shell('Your MoneyLabs is live.','Build promotional assets, organize your money links, and access every training and upgrade attached to your purchase.',`<div class="grid"><div class="card"><span class="tag">CORE</span><h3>Gold Rush Generator</h3><p>Create ready-to-post comments with your affiliate link already inside.</p><button class="primary" onclick="go('create')">Start creating</button></div><div class="card"><h3>Link Vault</h3><p>${links.length} saved money link${links.length===1?'':'s'}.</p><button onclick="go('links')">Open vault</button></div><div class="card"><h3>Your access</h3><p>${me.entitlements.length} product level${me.entitlements.length===1?'':'s'} unlocked.</p></div></div>`)}
function create(){return shell('Gold Rush Generator','Create comments designed to fit naturally beneath high-interest videos.',`<div class="card" style="margin-top:22px"><label>Offer name</label><input id="offer" placeholder="e.g. Home Business Blueprint"><label>What does it help people do?</label><textarea id="desc" placeholder="Describe the benefit and audience"></textarea><label>Your affiliate link</label><input id="money" placeholder="https://..."><button class="primary" onclick="generate()">Generate comments</button><div id="result"></div></div>`)}
window.generate=async()=>{
  const offer=document.querySelector('#offer').value.trim(),description=document.querySelector('#desc').value.trim(),link=document.querySelector('#money').value.trim();
  if(!offer||!description||!link)return alert('Complete all three fields.');
  const body=[`This is a smart shortcut for anyone interested in ${offer}: ${link}`,`I found a simple way to ${description.toLowerCase()}. Details here: ${link}`,`Worth a look if ${offer} is on your radar: ${link}`].join('\n\n');
  document.querySelector('#result').innerHTML=`<div class="result">${esc(body)}</div>`;
  const item=await api('/api/member/content',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({kind:'gold-rush',title:offer,body})});
  savedContent.unshift(item.item);
};
function vault(){return shell('My Vault','Every asset you generate stays organized here.',`<div class="grid">${savedContent.length?savedContent.map(item=>`<div class="card"><span class="tag">${esc(item.kind)}</span><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></div>`).join(''):'<div class="card"><h3>Your vault is ready</h3><p>Create your first campaign in Gold Rush.</p></div>'}</div>`)}
function linkView(){return shell('Link Vault','Store the affiliate and checkout links you use in your campaigns.',`<div class="card" style="margin-top:22px"><input id="linkName" placeholder="Link name"><input id="linkUrl" placeholder="https://..."><button class="primary" onclick="saveLink()">Save link</button></div><div class="grid">${links.map(item=>`<div class="card"><h3>${esc(item.name)}</h3><a href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.url)}</a></div>`).join('')}</div>`)}
window.saveLink=async()=>{const response=await api('/api/member/links',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({name:linkName.value,url:linkUrl.value})});links.unshift(response.item);render('links')};
function academy(){return shell('MoneyLabs Academy','Follow the launch path in order, then return whenever you need a refresher.',`<div class="grid">${['Set up your money links','Choose a focused offer','Generate natural comments','Find high-intent conversations','Track clicks and refine'].map((title,index)=>`<div class="card"><span class="tag">MODULE ${index+1}</span><h3>${title}</h3><p>${['Build a clean vault before publishing.','One audience and one promise create clarity.','Use the generator, then add your own voice.','Prioritize relevance over raw view counts.','Repeat what gets attention and conversions.'][index]}</p></div>`).join('')}</div>`)}
function premium(view){const product=viewProducts[view],[title,subtitle]=premiumCopy[view];return shell(title,subtitle,`<div class="card" style="margin-top:22px"><h3>${view==='license'?'Request your license package':'Your premium workspace is unlocked'}</h3><p>${productNames[product]}</p><textarea id="requestText" placeholder="Tell us what you need or what campaign you are building"></textarea><button class="primary" onclick="sendRequest('${view}')">Submit request</button></div>`)}
window.sendRequest=async kind=>{const field=document.querySelector('#requestText');await api('/api/member/request',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({kind,message:field.value})});field.value='';alert('Request received. Our team will follow up by email.')};
function support(){return shell('Member Support','Tell us what you need. Our team will respond using your account email.',`<div class="card" style="margin-top:22px"><textarea id="requestText" placeholder="How can we help?"></textarea><button class="primary" onclick="sendRequest('support')">Send support request</button><p class="muted">support@kairostechnologylabs.com</p></div>`)}

const views={dashboard,create,vault,links:linkView,academy,support};
window.go=view=>{location.hash=view;render(view)};
function render(view=location.hash.slice(1)||'dashboard'){
  const link=document.querySelector(`[data-view="${view}"]`),product=link?.dataset.product;
  document.querySelector('#content').innerHTML=product&&!has(product)?locked(product):(views[view]?.()||premium(view));
  document.querySelectorAll('nav a').forEach(item=>item.classList.toggle('active',item===link));
  document.querySelector('aside').classList.remove('open');
}
async function init(){
  me=await api('/api/member/me');
  document.querySelector('#user').textContent=me.email+(me.isAdmin?' - ADMIN':'');
  [links,savedContent]=await Promise.all([api('/api/member/links').then(result=>result.items),api('/api/member/content').then(result=>result.items)]);
  document.querySelectorAll('[data-product]').forEach(link=>link.classList.toggle('locked',!has(link.dataset.product)));
  render();
}
document.querySelector('#logout').onclick=async()=>{await api('/api/member/logout',{method:'POST'});location.href='/member-login'};
document.querySelector('#menu').onclick=()=>document.querySelector('aside').classList.toggle('open');
addEventListener('hashchange',()=>render());
init().catch(console.error);

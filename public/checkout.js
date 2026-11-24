const query=new URLSearchParams(location.search),productId=query.get('product')||'front';
let config,processing=false,captchaToken='';
const $=id=>document.getElementById(id);
const buttonText=()=>`Complete Secure Order — ${config?.product?.formatted||''}`;
const showError=message=>{processing=false;$('error').textContent=message;$('submit').disabled=false;$('submit').textContent=buttonText()};
async function loadCaptcha(){const response=await fetch('/api/captcha',{cache:'no-store'}),data=await response.json();captchaToken=data.token;$('captchaImage').src=data.image;$('captchaAnswer').value=''}

function acceptMessages(response){return (response?.messages?.message||[]).map(item=>item.text).filter(Boolean).join(' ')||'Card details could not be verified'}

async function finishPayment(opaqueData){
  try{
    const payload={product:productId,opaqueData,captchaToken,captchaAnswer:$('captchaAnswer').value,website:$('website').value,first_name:$('firstName').value,last_name:$('lastName').value,email:$('email').value,phone:$('phone').value,address:$('address').value,city:$('city').value,state:$('state').value,zip:$('zip').value,country:'US',consent:$('consent').checked};
    const result=await fetch('/api/checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)}),data=await result.json();
    if(!result.ok)throw Error(data.error||'Payment could not be completed');
    location.href=query.toString()?`${data.next}?${query}`:data.next;
  }catch(cause){loadCaptcha().catch(()=>{});showError(cause.message)}
}

function submitPayment(event){
  event.preventDefault();
  if(processing)return;
  if(!config)return showError('Secure checkout is still loading. Please try again.');
  if(!$('paymentForm').reportValidity())return;
  if(!$('captchaAnswer').value.trim())return showError('Enter the security code shown');
  if(!window.Accept)return showError('Secure payment service could not load. Refresh and try again.');
  processing=true;$('error').textContent='';$('submit').disabled=true;$('submit').textContent='Securely processing…';
  const cardNumber=$('cardNumber').value.replace(/\D/g,''),month=$('expMonth').value.padStart(2,'0'),year=$('expYear').value;
  Accept.dispatchData({authData:{apiLoginID:config.apiLoginId,clientKey:config.publicClientKey},cardData:{cardNumber,month,year,cardCode:$('cardCode').value,zip:$('zip').value,fullName:$('cardName').value}},response=>{
    if(response.messages.resultCode!=='Ok'){loadCaptcha().catch(()=>{});return showError(acceptMessages(response))}
    finishPayment(response.opaqueData);
  });
}

$('cardNumber').addEventListener('input',event=>{event.target.value=event.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()});
$('expMonth').addEventListener('input',event=>{event.target.value=event.target.value.replace(/\D/g,'').slice(0,2)});
$('expYear').addEventListener('input',event=>{event.target.value=event.target.value.replace(/\D/g,'').slice(0,2)});
$('cardCode').addEventListener('input',event=>{event.target.value=event.target.value.replace(/\D/g,'').slice(0,4)});
$('paymentForm').addEventListener('submit',submitPayment);
$('captchaRefresh').addEventListener('click',()=>loadCaptcha().catch(()=>showError('Security verification could not refresh.')));

fetch(`/api/checkout/config?product=${encodeURIComponent(productId)}`).then(async response=>{const data=await response.json();if(!response.ok)throw Error(data.error);return data}).then(data=>{
  config=data;$('productName').textContent=data.product.name;$('productPrice').textContent=data.product.formatted;
  if(!data.apiLoginId||!data.publicClientKey)throw Error('Secure checkout is not configured');
  if(!window.Accept)throw Error('Secure payment service could not load. Refresh and try again.');
  loadCaptcha().catch(()=>showError('Security verification could not load. Refresh and try again.'));
  $('submit').disabled=false;$('submit').textContent=buttonText();
}).catch(cause=>showError(cause.message));

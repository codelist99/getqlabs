const query=new URLSearchParams(location.search),productId=query.get('product')||'front';
let config,processing=false;
const $=id=>document.getElementById(id);
const buttonText=()=>`Complete Secure Order — ${config?.product?.formatted||''}`;
const error=message=>{processing=false;$('error').textContent=message;$('submit').disabled=false;$('submit').textContent=buttonText()};

async function pay(response){
  if(processing)return;
  processing=true;$('error').textContent='';$('submit').disabled=true;$('submit').textContent='Securely processing…';
  try{
    const payload={product:productId,paymentToken:response.token,first_name:$('firstName').value,last_name:$('lastName').value,email:$('email').value,phone:$('phone').value,address:$('address').value,city:$('city').value,state:$('state').value,zip:$('zip').value,country:'US',consent:$('consent').checked};
    const result=await fetch('/api/checkout',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)}),data=await result.json();
    if(!result.ok)throw Error(data.error||'Payment could not be completed');
    location.href=query.toString()?`${data.next}?${query}`:data.next;
  }catch(cause){error(cause.message)}
}

fetch(`/api/checkout/config?product=${encodeURIComponent(productId)}`).then(async response=>{const data=await response.json();if(!response.ok)throw Error(data.error);return data}).then(data=>{
  config=data;$('productName').textContent=data.product.name;$('productPrice').textContent=data.product.formatted;
  if(!data.publicKey)throw Error('Secure checkout is not configured');
  const script=document.createElement('script');script.src='https://secure.nmi.com/token/Collect.js';script.dataset.tokenizationKey=data.publicKey;
  script.onload=()=>{CollectJS.configure({variant:'inline',paymentSelector:'#submit',fields:{ccnumber:{selector:'#cardNumber',title:'Card Number',placeholder:'Card number'},ccexp:{selector:'#cardExpiration',title:'Expiration',placeholder:'MM / YY'},cvv:{selector:'#cardCvv',title:'CVV',placeholder:'CVV'}},styleSniffer:'false',customCss:{display:'block',width:'100%',height:'43px',border:'0',padding:'0 12px','font-size':'15px','font-family':'Arial','box-sizing':'border-box',outline:'none'},callback:pay});$('submit').disabled=false;$('submit').textContent=buttonText()};
  script.onerror=()=>error('Secure payment fields could not load. Refresh and try again.');document.head.appendChild(script);
}).catch(cause=>error(cause.message));
$('submit').addEventListener('click',event=>{if(!$('paymentForm').reportValidity()){event.preventDefault();event.stopImmediatePropagation()}},true);

(() => {
  if (!/^\/thankyou\/?$/.test(location.pathname)) return;
  const enhanceThankYou = () => {
    const callout = document.querySelector('.wc-call-now');
    if (!callout) return;
    if (callout.dataset.qlCompact === 'true') return;
    callout.dataset.qlCompact = 'true';
    callout.classList.add('ql-compact');
    callout.innerHTML = '<div class="ql-compact-inner"><h1>Congratulations</h1><div class="refund-notice">FOR REFUNDS PLEASE EMAIL SUPPORT@KAIROSTECHNOLOGYLABS.COM</div><div class="dispute-warning">DO NOT FILE A DISPUTE. THEN WE ARE FORCED TO FIGHT THE DISPUTE, WHICH CAN OFTEN LEAD TO YOU LOSING. CALL US FOR A NO-QUESTIONS-ASKED REFUND.</div><h2>CALL OUR OFFICE NOW TO GET STARTED</h2><a class="phone" href="tel:+12067032153">(206) 703-2153</a><div class="ql-action-row"><a class="schedule" href="https://cal.com/jon19/qlabs-onboarding" target="_blank" rel="noreferrer noopener">SCHEDULE ONBOARDING</a><a class="member-access" href="/member-login">CREATE YOUR ACCOUNT</a></div></div>';
  };
  const style = document.createElement('style');
  style.textContent = '.wc-call-now.ql-compact{box-sizing:border-box!important;min-height:0!important;padding:14px 18px 20px!important;border-bottom:6px solid #ffd43b!important;background:linear-gradient(135deg,#06135c,#0b4db8)!important}.wc-call-now.ql-compact .ql-compact-inner{width:min(1180px,100%)!important;max-width:1180px!important;margin:0 auto!important}.wc-call-now.ql-compact h1{margin:0 0 8px!important;font:900 clamp(42px,6vw,74px)/.95 Arial,sans-serif!important}.wc-call-now.ql-compact .refund-notice{box-sizing:border-box!important;margin:0 auto 8px!important;padding:10px 14px!important;border:3px solid #ffd43b!important;border-radius:12px!important;background:#fff!important;color:#081b61!important;white-space:normal!important;font:900 clamp(13px,1.55vw,20px)/1.1 Arial,sans-serif!important}.wc-call-now.ql-compact .dispute-warning{box-sizing:border-box!important;margin:0 auto 10px!important;padding:9px 14px!important;border:2px solid #fff!important;border-radius:10px!important;background:#b91c1c!important;color:#fff!important;font:900 clamp(12px,1.25vw,17px)/1.15 Arial,sans-serif!important;letter-spacing:.01em!important}.wc-call-now.ql-compact h2{margin:8px 0!important;font:900 clamp(25px,3.5vw,44px)/1 Arial,sans-serif!important}.wc-call-now.ql-compact a.phone{display:inline-block!important;width:auto!important;margin:0 auto 12px!important;padding:12px 28px!important;border-radius:12px!important;background:#22c55e!important;color:#fff!important;font:900 clamp(30px,4vw,50px)/1 Arial,sans-serif!important;box-shadow:0 6px 0 #147a38!important}.wc-call-now.ql-compact .ql-action-row{display:grid!important;grid-template-columns:1fr 1fr!important;gap:16px!important;margin:0 auto!important}.wc-call-now.ql-compact .ql-action-row a{box-sizing:border-box!important;display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:72px!important;margin:0!important;padding:12px 18px!important;border-radius:12px!important;color:#fff!important;text-decoration:none!important;font:900 clamp(19px,2.3vw,30px)/1 Arial,sans-serif!important}.wc-call-now.ql-compact .schedule{background:#7c3aed!important;box-shadow:0 6px 0 #4c1d95!important}.wc-call-now.ql-compact .member-access{background:#ef1d24!important;box-shadow:0 6px 0 #8f1116!important}@media(max-width:700px){.wc-call-now.ql-compact{padding:12px 10px 18px!important}.wc-call-now.ql-compact .ql-action-row{grid-template-columns:1fr!important;gap:12px!important}.wc-call-now.ql-compact .ql-action-row a{min-height:58px!important}.wc-call-now.ql-compact a.phone{width:100%!important}.wc-call-now.ql-compact h1{font-size:42px!important}}';
  document.head.appendChild(style);
  const mobileUpgradeRepair=document.createElement('style');
  mobileUpgradeRepair.textContent='@media(max-width:767px){#row-OhZHbSVWr3>.inner{display:flex!important;flex-direction:column!important}#col-sDsIL-1L91,#col-Vbe7V42goy{box-sizing:border-box!important;width:100%!important;max-width:100%!important;padding:10px 14px!important}#heading-0Vog27u2MO,#heading-dHXuPLGoz6{width:100%!important;max-width:100%!important}#heading-0Vog27u2MO h1,#heading-0Vog27u2MO h2,#heading-0Vog27u2MO h3,#heading-0Vog27u2MO .text-output,#heading-dHXuPLGoz6 h1,#heading-dHXuPLGoz6 h2,#heading-dHXuPLGoz6 h3,#heading-dHXuPLGoz6 .text-output{font-size:clamp(26px,8vw,38px)!important;line-height:1.15!important;overflow-wrap:normal!important;word-break:normal!important;white-space:normal!important}#image-kHAvaD_dmY img{display:block!important;width:100%!important;max-width:430px!important;height:auto!important;margin:auto!important}}';
  document.head.appendChild(mobileUpgradeRepair);
  enhanceThankYou();
  addEventListener('load',enhanceThankYou,{once:true});
  new MutationObserver(enhanceThankYou).observe(document.body,{childList:true,subtree:true});
})();

(() => {
  if (/^\/thankyou\/?$/.test(location.pathname)) {
    const bookingUrl = 'https://cal.com/jon19/qlabs-onboarding';
    const repairBookingLinks = () => {
      document.querySelectorAll('a[href*="cal.com/support-staff-wznd51"],a.schedule').forEach(link => {
        if (link.href !== bookingUrl) link.href = bookingUrl;
      });
    };
    const ensureCallout = () => {
      repairBookingLinks();
      if (document.querySelector('.wc-call-now')) return;
      const callout = document.createElement('section');
      callout.className = 'wc-call-now';
      callout.innerHTML = '<div><h1>Congratulations</h1><p class="thanks">Thanks for purchasing Q Labs</p><strong>YOUR ORDER IS COMPLETE</strong><h2>Step 1: Call Our Office Now To Get Started</h2><a class="phone" href="tel:+12067032153">(206) 703-2153</a><p>Tap the number or call now so our team can help you get started.</p><div class="or">— OR —</div><a class="schedule" href="'+bookingUrl+'" target="_blank" rel="noreferrer noopener">Schedule Your Onboarding Call</a></div>';
      callout.querySelector('.schedule').insertAdjacentHTML('afterend','<div class="refund-notice">FOR REFUNDS PLEASE EMAIL SUPPORT@KAIROSTECHNOLOGYLABS.COM</div><a class="member-access" href="/member-login">CREATE YOUR QLABS MEMBER ACCOUNT</a>');
      document.body.prepend(callout);
    };
    if (!document.getElementById('wc-call-now-style')) {
      const style = document.createElement('style');
      style.id = 'wc-call-now-style';
      style.textContent = '.wc-call-now{position:relative!important;display:block!important;z-index:99999;background:linear-gradient(135deg,#050a54,#0b4db8);color:#fff;text-align:center;padding:42px 18px;border-bottom:8px solid #ffd43b;box-shadow:0 10px 35px #0005}.wc-call-now>div{max-width:1050px;margin:auto}.wc-call-now h1{margin:0;font:900 clamp(48px,8vw,92px)/1 Arial,sans-serif}.wc-call-now .thanks{margin:10px 0 30px;font:700 clamp(20px,3vw,30px)/1.3 Georgia,serif}.wc-call-now strong{display:inline-block;background:#ffd43b;color:#111827;padding:8px 16px;border-radius:999px;font:800 15px/1.2 Arial,sans-serif;letter-spacing:.08em}.wc-call-now h2{margin:22px 0 8px;font:900 clamp(30px,5vw,58px)/1.05 Arial,sans-serif;text-transform:uppercase}.wc-call-now a{display:inline-block;margin:10px 0;padding:18px 30px;border-radius:14px;color:#fff!important;text-decoration:none;font:900 clamp(28px,5vw,60px)/1 Arial,sans-serif}.wc-call-now .phone{background:#22c55e;box-shadow:0 8px 0 #147a38,0 14px 30px #0005}.wc-call-now .or{margin:28px auto 12px;font:900 25px/1 Arial,sans-serif}.wc-call-now .schedule{background:#7c3aed;box-shadow:0 8px 0 #4c1d95,0 14px 30px #0005}.wc-call-now p{margin:22px 0 0;font:700 20px/1.4 Arial,sans-serif}@media(max-width:600px){.wc-call-now{padding:28px 12px}.wc-call-now a{padding:16px 14px;width:100%}}';
      style.textContent += '.wc-call-now .refund-notice{box-sizing:border-box;display:block;margin:30px auto 0;max-width:100%;padding:16px 20px;border:3px solid #ffd43b;border-radius:12px;background:#fff;color:#081b61;font:900 clamp(9px,1.6vw,20px)/1.2 Arial,sans-serif;letter-spacing:.02em;white-space:nowrap}.wc-call-now .member-access{display:block;max-width:760px;margin:28px auto 0;background:linear-gradient(135deg,#307cff,#8b5cf6);box-shadow:0 8px 0 #16245c,0 0 35px #4de4ff}@media(max-width:600px){.wc-call-now .refund-notice{padding:12px 6px}}';
      document.head.appendChild(style);
    }
    ensureCallout();
    addEventListener('load', ensureCallout, { once:true });
    setTimeout(ensureCallout, 500);
    setTimeout(ensureCallout, 2000);
    new MutationObserver(ensureCallout).observe(document.body, { childList:true });
    document.querySelectorAll('a[href*="perpetualincome365.convertri.com/7figure-everwebinar-registration"]').forEach(link=>{link.href='/webinar'});
  }
  const params = new URLSearchParams(location.search);
  const attribution = Object.fromEntries(['aid','tid','utm_source','utm_campaign'].map(key => [key, params.get(key) || localStorage.getItem(`wc_${key}`) || '']));
  Object.entries(attribution).forEach(([key,value]) => value && localStorage.setItem(`wc_${key}`, value));
  let sessionId=sessionStorage.getItem('ql_session_id');if(!sessionId){sessionId=globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;sessionStorage.setItem('ql_session_id',sessionId)}
  const device=innerWidth<768?'Mobile':innerWidth<1100?'Tablet':'Desktop',context={...attribution,session_id:sessionId,device};
  const send = (url, data) => fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify(data), keepalive:true }).catch(()=>{});
  send('/api/events', { type:'page_view', page:location.pathname, ...context });
  document.addEventListener('click', event => {
    if (!/^\/thankyou\/?$/.test(location.pathname)) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const label = link.textContent.replace(/\s+/g, ' ').trim();
    let target;
    try { target = new URL(link.href, location.href); } catch { return; }
    if (target.pathname === '/webinar' || /click here to see how/i.test(label)) {
      send('/api/events', { type:'step2_webinar_click', page:location.pathname, product_id:target.href, ...context });
    }
  }, true);
  if(location.pathname==='/checkout'){let started=false;document.addEventListener('focusin',event=>{if(!started&&event.target.matches('input,select')){started=true;send('/api/events',{type:'checkout_start',page:location.pathname,...context})}},true)}
  document.querySelectorAll('video').forEach(video=>{const fired=new Set();const fire=type=>{if(fired.has(type))return;fired.add(type);send('/api/events',{type,page:location.pathname,...context})};video.addEventListener('volumechange',()=>{if(!video.muted&&video.volume>0)fire('video_unmute')});video.addEventListener('timeupdate',()=>{if(!video.duration)return;const progress=video.currentTime/video.duration;if(progress>=.25)fire('video_25');if(progress>=.5)fire('video_50');if(progress>=.75)fire('video_75');if(progress>=.98)fire('video_100')})});
  document.addEventListener('submit', event => {
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    const email = data.email || data.Email || form.querySelector('input[type=email]')?.value;
    const phone = data.phone || data.Phone || form.querySelector('input[type=tel]')?.value;
    if (!email && !phone) return;
    send('/api/leads', { ...data, email, phone, email_consent:Boolean(data.email_consent || form.querySelector('[name*=email_consent]:checked')),
      sms_consent:Boolean(data.sms_consent || form.querySelector('[name*=sms_consent]:checked')), landing_page:location.pathname, ...attribution });
  }, true);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href*="jvzoo.com"],a[href*="/b/"]');
    if (!link) return;
    send('/api/events', { type:'checkout_click', page:location.pathname, product_id:link.href, ...context });
    const oto = location.pathname.match(/^\/oto([1-7])\/?$/);
    if (!oto) {
      event.preventDefault();
      location.href = '/checkout?product=front';
      return;
    }
    event.preventDefault();
    const discounted = new URL(link.href, location.href).searchParams.has('coupon');
    const product = `oto${oto[1]}${discounted ? '_downsell' : ''}`;
    const label = link.textContent;
    link.style.pointerEvents = 'none';
    link.textContent = 'Processing…';
    fetch('/api/purchase', { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({product}) })
      .then(async response => { const data=await response.json(); if(!response.ok)throw Error(data.error||'Purchase failed'); location.href=data.next; })
      .catch(error => { link.style.pointerEvents=''; link.textContent=label; alert(error.message); });
  }, true);
})();

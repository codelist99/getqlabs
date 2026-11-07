(() => {
  const product = window.QL_PRODUCT || '';
  const next = product === 'oto7' ? '/thankyou' : `/oto${Number(product.slice(3) || 0) + 1}`;
  const isJvzoo = value => /jvzoo\.com\/b\/|\/buy\//i.test(value || '');
  const isDiscount = value => /coupon=|_downsell/i.test(value || '');
  const purchase = async id => {
    const confirmed = confirm(`Add this ${id.includes('downsell') ? 'discounted ' : ''}upgrade to your order?`);
    if (!confirmed) return;
    try {
      const response = await fetch('/api/purchase', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ product: id }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'The upgrade could not be completed.');
      location.href = data.next;
    } catch (error) { alert(error.message); }
  };
  const handleDestination = href => {
    if (!isJvzoo(href)) return false;
    if (product === 'front') location.href = '/checkout?product=front';
    else purchase(product + (isDiscount(href) ? '_downsell' : ''));
    return true;
  };
  const nativeOpen = window.open.bind(window);
  window.open = (url, ...args) => handleDestination(String(url || '')) ? null : nativeOpen(url, ...args);
  document.addEventListener('click', event => {
    const anchor = event.composedPath().find(node => node?.tagName === 'A') || event.target.closest?.('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href') || '';
    if (!isJvzoo(href)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    handleDestination(href);
  }, true);
  const normalize = () => document.querySelectorAll('a[href]').forEach(anchor => {
    const href = anchor.getAttribute('href') || '';
    if (href.includes('getqlabs.com/')) anchor.href = href.replace(/^https?:\/\/getqlabs\.com/i, '');
    if (href.includes('getrobinhod.com/')) anchor.href = href.replace(/^https?:\/\/getrobinhod\.com/i, '');
  });
  normalize();
  new MutationObserver(normalize).observe(document.documentElement, { subtree: true, childList: true });
})();

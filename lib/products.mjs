export const products = Object.freeze({
  front: { name: 'MoneyLabs', amount: 47, next: '/oto1' },
  oto1: { name: 'MoneyLabs Done-For-You', amount: 197, next: '/oto2' },
  oto1_downsell: { name: 'MoneyLabs Done-For-You — Discount', amount: 97, next: '/oto2' },
  oto2: { name: 'MoneyLabs Automated Profits', amount: 97, next: '/oto3' },
  oto2_downsell: { name: 'MoneyLabs Automated Profits — Discount', amount: 47, next: '/oto3' },
  oto3: { name: 'MoneyLabs Instant Income', amount: 67, next: '/oto4' },
  oto3_downsell: { name: 'MoneyLabs Instant Income — Discount', amount: 37, next: '/oto4' },
  oto4: { name: 'MoneyLabs Cyber Protection', amount: 127, next: '/oto5' },
  oto4_downsell: { name: 'MoneyLabs Cyber Protection — Discount', amount: 97, next: '/oto5' },
  oto5: { name: 'MoneyLabs Autopilot Earnings', amount: 147, next: '/oto6' },
  oto5_downsell: { name: 'MoneyLabs Autopilot Earnings — Discount', amount: 47, next: '/oto6' },
  oto6: { name: 'MoneyLabs High-Ticket Payout', amount: 97, next: '/oto7' },
  oto6_downsell: { name: 'MoneyLabs High-Ticket Payout — Discount', amount: 47, next: '/oto7' },
  oto7: { name: 'MoneyLabs Reseller & License Rights', amount: 167, next: '/thankyou' },
  oto7_downsell: { name: 'MoneyLabs Reseller & License Rights — Discount', amount: 67, next: '/thankyou' }
});

export function getProduct(id) {
  const product = products[id];
  if (!product) throw new Error('Unknown product');
  return { id, ...product, currency: 'USD' };
}

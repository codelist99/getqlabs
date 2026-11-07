export const products = Object.freeze({
  front: { name: 'Q Labs', amount: 47, next: '/oto1' },
  oto1: { name: 'Q Labs Done-For-You', amount: 197, next: '/oto2' },
  oto1_downsell: { name: 'Q Labs Done-For-You — Discount', amount: 97, next: '/oto2' },
  oto2: { name: 'Q Labs Automated Profits', amount: 97, next: '/oto3' },
  oto2_downsell: { name: 'Q Labs Automated Profits — Discount', amount: 47, next: '/oto3' },
  oto3: { name: 'Q Labs Instant Income', amount: 67, next: '/oto4' },
  oto3_downsell: { name: 'Q Labs Instant Income — Discount', amount: 37, next: '/oto4' },
  oto4: { name: 'Q Labs Cyber Protection', amount: 127, next: '/oto5' },
  oto4_downsell: { name: 'Q Labs Cyber Protection — Discount', amount: 97, next: '/oto5' },
  oto5: { name: 'Q Labs Autopilot Earnings', amount: 147, next: '/oto6' },
  oto5_downsell: { name: 'Q Labs Autopilot Earnings — Discount', amount: 47, next: '/oto6' },
  oto6: { name: 'Q Labs High-Ticket Payout', amount: 97, next: '/oto7' },
  oto6_downsell: { name: 'Q Labs High-Ticket Payout — Discount', amount: 47, next: '/oto7' },
  oto7: { name: 'Q Labs Reseller & License Rights', amount: 167, next: '/thankyou' },
  oto7_downsell: { name: 'Q Labs Reseller & License Rights — Discount', amount: 67, next: '/thankyou' }
});

export function getProduct(id) {
  const product = products[id];
  if (!product) throw new Error('Unknown product');
  return { id, ...product, currency: 'USD' };
}

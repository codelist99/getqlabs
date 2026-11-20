import test from 'node:test';
import assert from 'node:assert/strict';
import { parseJvzooNotification } from '../lib/jvzoo.mjs';

test('parses a JVZIPN v2 sale', () => {
  const item = parseJvzooNotification({ transaction_type: 'SALE', customer_email: 'Buyer@Example.com', customer_first_name: 'Ada', customer_last_name: 'Lovelace', transaction_id: 'JV-1', amount: '47.00', currency: 'USD' }, 'front');
  assert.equal(item.eventType, 'sale');
  assert.equal(item.email, 'buyer@example.com');
  assert.equal(item.product.id, 'front');
  assert.equal(item.transactionId, 'JV-1');
});

test('parses RFND and downsell entitlement products', () => {
  const item = parseJvzooNotification({ transaction_type: 'RFND', customer_email: 'buyer@example.com', transaction_id: 'JV-1', amount: '97.00' }, 'oto1_downsell');
  assert.equal(item.eventType, 'refund');
  assert.equal(item.product.id, 'oto1_downsell');
  assert.equal(item.amount, 97);
});

import { getProduct } from './products.mjs';

const text = value => String(value ?? '').trim();

export function parseJvzooNotification(input = {}, requestedProduct = '') {
  const product = getProduct(text(requestedProduct));
  const transactionType = text(input.transaction_type || input.ctransaction || input.type || input.event_type || 'SALE').toUpperCase();
  const status = text(input.status || input.transaction_status).toUpperCase();
  const isRefund = ['RFND', 'REFUND', 'REFUNDED', 'CANCEL', 'CANCELED', 'CANCELLED'].some(value => transactionType.includes(value)) || status === 'REFUNDED';
  const isDispute = ['DISPUTE', 'ALERT', 'CHARGEBACK'].some(value => transactionType.includes(value));
  const amount = Math.abs(Number(input.amount || input.transaction_amount || input.camount || input.ctransamount || product.amount));
  const transactionId = text(input.transaction_id || input.ctransreceipt || input.receipt || input.pay_key);
  const originalTransactionId = text(input.original_transaction_id || input.parent_transaction_id || input.sale_transaction_id || input.ctransreceipt || input.transaction_id);
  return {
    product,
    eventType: isDispute ? 'dispute' : isRefund ? 'refund' : 'sale',
    transactionType,
    email: text(input.customer_email || input.ccustemail || input.email).toLowerCase(),
    firstName: text(input.customer_first_name || input.ccustfirstname || input.first_name),
    lastName: text(input.customer_last_name || input.ccustlastname || input.last_name),
    name: text(input.customer_name || input.ccustname || input.name),
    phone: text(input.customer_phone || input.ccustphone || input.phone),
    amount: Number.isFinite(amount) ? amount : product.amount,
    currency: text(input.currency || input.ccurrency || 'USD').toUpperCase(),
    transactionId,
    originalTransactionId,
    input
  };
}

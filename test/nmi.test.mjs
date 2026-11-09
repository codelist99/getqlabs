import test from 'node:test';
import assert from 'node:assert/strict';
import {parseReturnTransactions} from '../lib/nmi.mjs';

test('NMI return parser preserves refund dates and original transactions',()=>{
  const xml=`<nm_response><transaction><transaction_id>refund-1</transaction_id><original_transaction_id>sale-1</original_transaction_id><action><action_type>refund</action_type><amount>-47.00</amount><date>20261108143000</date><success>1</success></action></transaction><transaction><transaction_id>void-1</transaction_id><original_transaction_id>sale-2</original_transaction_id><action><action_type>void</action_type><amount>97.00</amount><date>20261109101500</date><success>1</success></action></transaction></nm_response>`;
  assert.deepEqual(parseReturnTransactions(xml),[
    {transactionId:'refund-1',originalTransactionId:'sale-1',action:'refund',amount:47,submittedAt:'2026-11-08T14:30:00.000Z'},
    {transactionId:'void-1',originalTransactionId:'sale-2',action:'void',amount:97,submittedAt:'2026-11-09T10:15:00.000Z'}
  ]);
});

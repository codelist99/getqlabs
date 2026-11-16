import test from 'node:test';
import assert from 'node:assert/strict';
import {chargeToken,parseReturnTransactions} from '../lib/nmi.mjs';

test('NMI return parser preserves refund dates and original transactions',()=>{
  const xml=`<nm_response><transaction><transaction_id>refund-1</transaction_id><original_transaction_id>sale-1</original_transaction_id><action><action_type>refund</action_type><amount>-47.00</amount><date>20261108143000</date><success>1</success></action></transaction><transaction><transaction_id>void-1</transaction_id><original_transaction_id>sale-2</original_transaction_id><action><action_type>void</action_type><amount>97.00</amount><date>20261109101500</date><success>1</success></action></transaction></nm_response>`;
  assert.deepEqual(parseReturnTransactions(xml),[
    {transactionId:'refund-1',originalTransactionId:'sale-1',action:'refund',amount:47,submittedAt:'2026-11-08T14:30:00.000Z'},
    {transactionId:'void-1',originalTransactionId:'sale-2',action:'void',amount:97,submittedAt:'2026-11-09T10:15:00.000Z'}
  ]);
});

test('initial NMI vault sale is marked as a customer-stored credential',async()=>{
  const originalFetch=global.fetch,originalKey=process.env.NMI_PRIVATE_KEY;
  process.env.NMI_PRIVATE_KEY='test-key';
  let submitted;
  global.fetch=async(_url,options)=>{submitted=new URLSearchParams(options.body);return new Response('response=1&response_code=100&responsetext=Approved&transactionid=123&customer_vault_id=456')};
  try{
    await chargeToken({product:{amount:47,currency:'USD',name:'Q Labs'},paymentToken:'token',invoice:'QL-1',customer:{first_name:'Test',last_name:'Buyer',email:'buyer@example.com',phone:'5555551212',address:'123 Main St',city:'Austin',state:'TX',zip:'78701',country:'US'}});
    assert.equal(submitted.get('stored_credential_indicator'),'stored');
    assert.equal(submitted.get('initiated_by'),'customer');
    assert.equal(submitted.get('customer_vault'),'add_customer');
  }finally{global.fetch=originalFetch;if(originalKey===undefined)delete process.env.NMI_PRIVATE_KEY;else process.env.NMI_PRIVATE_KEY=originalKey}
});

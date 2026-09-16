import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://llezinlbznlhkvkskkki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZXppbmxiem5saGt2a3Nra2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjgwNjQsImV4cCI6MjEwNDQ0NDA2NH0.-R9A5kO6PASM-JVSWh1oS9z1tLCiXUIPKuDcm1E6XCg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCompleteInsert() {
  const orderId = `ORD_TEST_${Date.now()}`;
  const dbOrder = {
    id: orderId,
    total: 100,
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    trackingnumber: `TRK-PH-TEST`
  };

  console.log('Inserting into orders...');
  const { data: orderData, error: orderError } = await supabase.from('orders').insert(dbOrder);
  
  if (orderError) {
    console.error('Order Insert failed:', JSON.stringify(orderError, null, 2));
    return;
  }
  
  console.log('Order insert success.');

  const orderItems = [{
    order_id: orderId,
    product_id: 1,
    qty: 1,
    price: 100,
    name: 'Test Plant',
    image: 'test.jpg'
  }];

  console.log('Inserting into order_items...');
  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

  if (itemsError) {
    console.error('Order Items Insert failed:', JSON.stringify(itemsError, null, 2));
  } else {
    console.log('Order Items insert success.');
  }
}

testCompleteInsert();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://llezinlbznlhkvkskkki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZXppbmxiem5saGt2a3Nra2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjgwNjQsImV4cCI6MjEwNDQ0NDA2NH0.-R9A5kO6PASM-JVSWh1oS9z1tLCiXUIPKuDcm1E6XCg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetchItems() {
  console.log('Testing fetch from order_items table...');
  const { data, error } = await supabase.from('order_items').select('*').limit(1);
  
  if (error) {
    console.error('Fetch failed with error:', JSON.stringify(error, null, 2));
  } else {
    console.log('Fetch successful, columns might be:', data.length > 0 ? Object.keys(data[0]) : 'Table is empty');
  }
}

testFetchItems();

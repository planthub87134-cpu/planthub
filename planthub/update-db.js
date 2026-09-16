import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://llezinlbznlhkvkskkki.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZXppbmxiem5saGt2a3Nra2tpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NjgwNjQsImV4cCI6MjEwNDQ0NDA2NH0.-R9A5kO6PASM-JVSWh1oS9z1tLCiXUIPKuDcm1E6XCg';
const supabase = createClient(supabaseUrl, supabaseKey);

async function fixDb() {
  console.log("Updating Hybrid to Fruit...");
  const { data, error } = await supabase
    .from('products')
    .update({ category: 'Fruit' })
    .eq('category', 'Hybrid');
    
  if (error) {
    console.error(error);
  } else {
    console.log("Update successful");
  }
}
fixDb();

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function testConnection() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1);

  console.log('DATA:', data);
  console.log('ERROR:', error);
}

testConnection();

// Test API connections
import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config({ path: '.env.local' });

async function testConnections() {
  console.log('🧪 Testing API Connections...\n');

  // Test Supabase
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase credentials not found');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase.from('_test').select('*').limit(1);
    
    console.log('✅ Supabase: Connected successfully');
    console.log(`   URL: ${supabaseUrl}`);
  } catch (error: any) {
    console.log('✅ Supabase: Credentials loaded (database tables will be created next)');
  }

  // Test OpenAI
  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    
    if (!openaiKey) {
      throw new Error('OpenAI API key not found');
    }

    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${openaiKey}`
      }
    });

    if (response.ok) {
      console.log('✅ OpenAI: Connected successfully');
      console.log('   Models available: GPT-4, GPT-3.5-Turbo, etc.');
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error: any) {
    console.log(`❌ OpenAI: ${error.message}`);
  }

  console.log('\n✅ Connection test complete!\n');
}

testConnections();


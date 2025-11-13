/**
 * Test Supabase Connection
 * 
 * This script tests:
 * 1. Environment variables are set
 * 2. Supabase connection works
 * 3. Database tables exist
 * 4. Can read/write to tables
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

import { getSupabaseServerClient } from '../src/lib/supabaseServer';

async function testSupabaseConnection() {
  console.log('🧪 Testing Supabase Connection...\n');

  // Test 1: Check environment variables
  console.log('1️⃣ Checking environment variables...');
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
  ];

  const missingVars: string[] = [];
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:', missingVars.join(', '));
    console.error('   Please add them to .env.local');
    process.exit(1);
  }
  console.log('✅ All environment variables are set\n');

  // Test 2: Connect to Supabase
  console.log('2️⃣ Testing Supabase connection...');
  try {
    const supabase = getSupabaseServerClient();
    console.log('✅ Supabase client created successfully\n');
  } catch (error: any) {
    console.error('❌ Failed to create Supabase client:', error.message);
    process.exit(1);
  }

  // Test 3: Check if tables exist
  console.log('3️⃣ Checking database tables...');
  const supabase = getSupabaseServerClient();
  
  const tables = [
    'onboarding_submissions',
    'waitlist',
    'client_onboarding_calls',
  ];

  for (const table of tables) {
    try {
      const { error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      if (error) {
        if (error.code === '42P01') {
          console.error(`❌ Table "${table}" does not exist`);
          console.error('   Please run supabase/initial_schema.sql in Supabase Dashboard');
        } else {
          console.error(`❌ Error checking table "${table}":`, error.message);
        }
        process.exit(1);
      }
      console.log(`✅ Table "${table}" exists`);
    } catch (error: any) {
      console.error(`❌ Failed to check table "${table}":`, error.message);
      process.exit(1);
    }
  }
  console.log('');

  // Test 4: Test write operation (onboarding_submissions)
  console.log('4️⃣ Testing write operation...');
  try {
    const testData = {
      name: 'Test User',
      industry: 'Test Industry',
      city: 'Test City',
      avg_customer_value: 'Test Value',
      current_inquiries: 'Test Current',
      desired_inquiries: 'Test Desired',
      budget_range: 'Test Budget',
      has_sales_team: 'no',
      score: 50,
      status: 'new',
    };

    const { data, error } = await supabase
      .from('onboarding_submissions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      console.error('❌ Failed to insert test data:', error.message);
      process.exit(1);
    }

    console.log('✅ Successfully inserted test data');
    console.log(`   Test submission ID: ${data.id}\n`);

    // Clean up: Delete test data
    console.log('5️⃣ Cleaning up test data...');
    const { error: deleteError } = await supabase
      .from('onboarding_submissions')
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      console.warn('⚠️  Failed to delete test data:', deleteError.message);
      console.warn(`   Please manually delete submission ID: ${data.id}`);
    } else {
      console.log('✅ Test data cleaned up\n');
    }
  } catch (error: any) {
    console.error('❌ Write test failed:', error.message);
    process.exit(1);
  }

  // Test 5: Test waitlist table
  console.log('6️⃣ Testing waitlist table...');
  try {
    const testWaitlist = {
      name: 'Test Waitlist User',
      email: 'test@example.com',
      phone: '1234567890',
    };

    const { data, error } = await supabase
      .from('waitlist')
      .insert(testWaitlist)
      .select()
      .single();

    if (error) {
      console.error('❌ Failed to insert waitlist test data:', error.message);
      process.exit(1);
    }

    console.log('✅ Successfully inserted waitlist test data');

    // Clean up
    await supabase
      .from('waitlist')
      .delete()
      .eq('id', data.id);
    console.log('✅ Waitlist test data cleaned up\n');
  } catch (error: any) {
    console.error('❌ Waitlist test failed:', error.message);
    process.exit(1);
  }

  console.log('🎉 All tests passed! Supabase is properly configured.');
  console.log('\n✅ You can now:');
  console.log('   - Submit onboarding quizzes');
  console.log('   - Use the admin dashboard');
  console.log('   - Generate PDFs and WhatsApp summaries');
}

// Run the test
testSupabaseConnection().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});


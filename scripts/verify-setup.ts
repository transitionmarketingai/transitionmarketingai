/**
 * Database Setup Verification Script
 * Run this to verify your database is properly configured
 * 
 * Usage: npx ts-node scripts/verify-setup.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('\n🔍 Verifying Transition Marketing AI Setup...\n');

// Check environment variables
console.log('1️⃣ Checking Environment Variables...');
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set in .env.local');
  process.exit(1);
}
if (!supabaseKey) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set in .env.local');
  process.exit(1);
}
console.log('✅ Environment variables found');

// Create Supabase client
console.log('\n2️⃣ Connecting to Supabase...');
const supabase = createClient(supabaseUrl, supabaseKey);
console.log('✅ Supabase client created');

// Check tables
console.log('\n3️⃣ Checking Database Tables...');

async function verifyTables() {
  const tables = [
    'audit_submissions',
    'leads',
    'deals',
    'profiles',
    'email_campaigns',
    'campaign_recipients',
    'credit_transactions',
    'subscriptions',
    'team_members',
    'activity_log',
  ];

  let allTablesExist = true;

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('id').limit(1);
      
      if (error) {
        console.error(`❌ Table '${table}' not found or not accessible`);
        allTablesExist = false;
      } else {
        console.log(`✅ Table '${table}' exists`);
      }
    } catch (err) {
      console.error(`❌ Error checking table '${table}':`, err);
      allTablesExist = false;
    }
  }

  return allTablesExist;
}

// Test lead insertion
async function testLeadInsertion() {
  console.log('\n4️⃣ Testing Lead Insertion...');
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          company: 'Test Company',
          contact_name: 'Test Contact',
          email: 'test@example.com',
          industry: 'Technology',
          location: 'Mumbai',
          company_size: '50-200',
          ai_score: 85,
          insights: JSON.stringify(['Test insight 1', 'Test insight 2']),
          status: 'new',
        },
      ])
      .select();

    if (error) {
      console.error('❌ Failed to insert test lead:', error.message);
      return false;
    }

    console.log('✅ Successfully inserted test lead');
    
    // Clean up test lead
    if (data && data.length > 0) {
      await supabase.from('leads').delete().eq('id', data[0].id);
      console.log('✅ Cleaned up test lead');
    }

    return true;
  } catch (err) {
    console.error('❌ Error during lead insertion test:', err);
    return false;
  }
}

// Run verification
async function main() {
  const tablesExist = await verifyTables();
  
  if (!tablesExist) {
    console.log('\n❌ Some tables are missing. Please run the complete-database-setup.sql script in Supabase SQL Editor.');
    process.exit(1);
  }

  const insertionWorks = await testLeadInsertion();
  
  if (!insertionWorks) {
    console.log('\n❌ Database insertion test failed. Check your RLS policies and permissions.');
    process.exit(1);
  }

  console.log('\n✅ All checks passed! Your database is properly configured.');
  console.log('\n🎉 You can now proceed to Phase 2: Authentication System\n');
}

main().catch((error) => {
  console.error('\n❌ Verification failed:', error);
  process.exit(1);
});


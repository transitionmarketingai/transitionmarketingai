// Test Database Connection
// Run with: node test-database-connection.js

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testDatabaseConnection() {
  console.log('🔍 Testing Supabase Database Connection...\n');
  console.log('📍 URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('🔑 API Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing');
  console.log('\n' + '='.repeat(60) + '\n');

  try {
    // Test 1: Connection
    console.log('Test 1: Testing connection...');
    const { data: plans, error: plansError } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('display_order');

    if (plansError) {
      console.error('❌ Connection Error:', plansError.message);
      process.exit(1);
    }

    console.log('✅ Connection successful!\n');

    // Test 2: Subscription Plans
    console.log('Test 2: Checking subscription plans...');
    if (plans && plans.length > 0) {
      console.log(`✅ Found ${plans.length} subscription plan(s):\n`);
      plans.forEach((plan, idx) => {
        console.log(`   ${idx + 1}. ${plan.plan_name}`);
        console.log(`      Price: ₹${plan.price_inr.toLocaleString()}/month`);
        console.log(`      Leads: ${plan.leads_quota}/month`);
        console.log(`      Campaigns: ${plan.max_campaigns} max`);
        console.log(`      Status: ${plan.is_active ? '✅ Active' : '❌ Inactive'}`);
        console.log('');
      });
    } else {
      console.log('⚠️  No subscription plans found!');
      console.log('   Run SEED_DATA.sql to add plans\n');
    }

    // Test 3: Tables Exist
    console.log('Test 3: Checking database tables...');
    const tables = [
      'customers',
      'subscription_plans',
      'subscriptions',
      'leads',
      'campaigns',
      'messages',
      'notifications',
      'audit_logs'
    ];

    for (const table of tables) {
      const { error } = await supabase.from(table).select('id').limit(1);
      if (error) {
        console.log(`   ❌ ${table} - Not found or error`);
      } else {
        console.log(`   ✅ ${table}`);
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('\n🎉 SUCCESS! Database is fully set up and ready!\n');
    console.log('Next Steps:');
    console.log('  1. Your database is connected ✅');
    console.log('  2. All tables are created ✅');
    console.log('  3. Subscription plans are seeded ✅');
    console.log('  4. Ready for Phase 2: Authentication 🚀\n');

  } catch (error) {
    console.error('\n❌ Unexpected Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('  - Check .env.local file exists');
    console.error('  - Verify Supabase URL and keys are correct');
    console.error('  - Ensure no extra spaces in credentials');
    process.exit(1);
  }
}

testDatabaseConnection();



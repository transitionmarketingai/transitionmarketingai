/**
 * Test Supabase Connection on Production
 * 
 * Tests the production deployment to verify Supabase is working
 */

const PRODUCTION_URL = 'https://transitionmarketingai.com';

async function testProduction() {
  console.log('🧪 Testing Production Supabase Connection...\n');
  console.log(`Testing: ${PRODUCTION_URL}\n`);

  // Test 1: Test onboarding submission
  console.log('1️⃣ Testing /api/onboarding/submit on production...');
  try {
    const testPayload = {
      name: 'Production Test User',
      industry: 'Test Industry',
      city: 'Test City',
      avgCustomerValue: '₹50k-₹1L',
      currentInquiries: '5-10',
      desiredInquiries: '20-30',
      budgetRange: '₹25k-₹40k',
      hasSalesTeam: 'yes',
      email: 'test-prod@example.com',
      phone: '1234567890',
      score: 75,
    };

    const response = await fetch(`${PRODUCTION_URL}/api/onboarding/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('✅ Production onboarding endpoint works!');
      console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
    } else {
      console.error('❌ Production onboarding failed:');
      console.error(`   Status: ${response.status}`);
      console.error(`   Error: ${data.error || JSON.stringify(data)}\n`);
    }
  } catch (error: any) {
    console.error('❌ Failed to test production:', error.message);
    console.error('   This might indicate a network issue or deployment problem\n');
  }

  // Test 2: Test waitlist
  console.log('2️⃣ Testing /api/waitlist/submit on production...');
  try {
    const testPayload = {
      name: 'Production Test Waitlist',
      email: 'waitlist-prod@example.com',
      phone: '9876543210',
    };

    const response = await fetch(`${PRODUCTION_URL}/api/waitlist/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('✅ Production waitlist endpoint works!');
      console.log(`   Response: ${JSON.stringify(data, null, 2)}\n`);
    } else {
      console.error('❌ Production waitlist failed:');
      console.error(`   Status: ${response.status}`);
      console.error(`   Error: ${data.error || JSON.stringify(data)}\n`);
    }
  } catch (error: any) {
    console.error('❌ Failed to test production waitlist:', error.message);
  }

  console.log('\n📋 Summary:');
  console.log('   If both tests passed ✅, Supabase is working on production!');
  console.log('   If tests failed ❌, check:');
  console.log('   1. Environment variables are set in Vercel');
  console.log('   2. Database schema is applied in Supabase');
  console.log('   3. Supabase project is active');
}

testProduction().catch(console.error);


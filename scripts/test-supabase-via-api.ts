/**
 * Test Supabase Connection via API Routes
 * 
 * This tests the actual API endpoints to verify Supabase is working
 */

async function testViaAPI() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  console.log('🧪 Testing Supabase via API Routes...\n');
  console.log(`Testing against: ${baseUrl}\n`);

  // Test 1: Test onboarding submission endpoint
  console.log('1️⃣ Testing /api/onboarding/submit endpoint...');
  try {
    const testPayload = {
      name: 'API Test User',
      industry: 'Test Industry',
      city: 'Test City',
      avgCustomerValue: '₹50k-₹1L',
      currentInquiries: '5-10',
      desiredInquiries: '20-30',
      budgetRange: '₹25k-₹40k',
      hasSalesTeam: 'yes',
      email: 'test@example.com',
      phone: '1234567890',
      score: 75,
    };

    const response = await fetch(`${baseUrl}/api/onboarding/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('✅ Onboarding submission endpoint works!');
      console.log(`   Submission ID: ${data.data?.id || 'N/A'}\n`);
    } else {
      console.error('❌ Onboarding submission failed:', data.error || 'Unknown error');
      console.error(`   Status: ${response.status}\n`);
    }
  } catch (error: any) {
    console.error('❌ Failed to test onboarding endpoint:', error.message);
    console.error('   Make sure your dev server is running: npm run dev\n');
  }

  // Test 2: Test waitlist endpoint
  console.log('2️⃣ Testing /api/waitlist/submit endpoint...');
  try {
    const testPayload = {
      name: 'API Test Waitlist User',
      email: 'waitlist@example.com',
      phone: '9876543210',
    };

    const response = await fetch(`${baseUrl}/api/waitlist/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      console.log('✅ Waitlist submission endpoint works!');
      console.log(`   Waitlist ID: ${data.data?.id || 'N/A'}\n`);
    } else {
      console.error('❌ Waitlist submission failed:', data.error || 'Unknown error');
      console.error(`   Status: ${response.status}\n`);
    }
  } catch (error: any) {
    console.error('❌ Failed to test waitlist endpoint:', error.message);
  }

  console.log('\n📝 Note: If tests failed, check:');
  console.log('   1. Environment variables are set in .env.local');
  console.log('   2. Dev server is running (npm run dev)');
  console.log('   3. Database schema is applied in Supabase');
}

testViaAPI().catch(console.error);


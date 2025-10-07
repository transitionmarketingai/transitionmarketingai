// Test Supabase Connection
// Run this in your browser console or as a Node.js script

import { createClient } from '@supabase/supabase-js';

// Replace these with your actual values
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-service-role-key-here';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test 1: Check if we can connect
    const { data, error } = await supabase
      .from('audit_submissions')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Connection successful!');
    
    // Test 2: Try to insert a test record
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Company',
      website: 'https://test.com',
      industry: 'SaaS/Startup',
      goal: 'Test connection',
      source: 'Connection Test'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('audit_submissions')
      .insert([testData])
      .select();
    
    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      return false;
    }
    
    console.log('✅ Test record inserted successfully:', insertData);
    
    // Test 3: Clean up test record
    const { error: deleteError } = await supabase
      .from('audit_submissions')
      .delete()
      .eq('email', 'test@example.com');
    
    if (deleteError) {
      console.error('⚠️ Could not clean up test record:', deleteError.message);
    } else {
      console.log('✅ Test record cleaned up');
    }
    
    console.log('🎉 All tests passed! Your Supabase integration is working.');
    return true;
    
  } catch (err) {
    console.error('❌ Unexpected error:', err);
    return false;
  }
}

// Run the test
testConnection();


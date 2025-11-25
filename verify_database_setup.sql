-- Verification Query for verified_inquiries Table
-- Run this in Supabase SQL Editor to verify the setup

-- Check if table exists and show all columns
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'verified_inquiries'
ORDER BY ordinal_position;

-- Expected output: 20 rows with all columns listed

-- Quick test: Try to insert a test record (optional - you can delete it after)
-- INSERT INTO verified_inquiries (name, phone, industry) 
-- VALUES ('Test Inquiry', '9876543210', 'Real Estate')
-- RETURNING id, name, created_at;

-- If you ran the test insert above, delete it:
-- DELETE FROM verified_inquiries WHERE name = 'Test Inquiry';


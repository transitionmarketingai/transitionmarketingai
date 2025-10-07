-- Critical Database Fixes for Transition Marketing AI
-- Run this in your Supabase SQL Editor

-- 1. Fix leads table - make name nullable first, then populate it
ALTER TABLE leads ALTER COLUMN name DROP NOT NULL;

-- 2. Update existing records to have name = contact_name
UPDATE leads SET name = contact_name WHERE name IS NULL;

-- 3. Now make name NOT NULL again
ALTER TABLE leads ALTER COLUMN name SET NOT NULL;

-- 4. Verify the fix
SELECT id, name, contact_name, company, email 
FROM leads 
LIMIT 5;

-- 5. Refresh schema cache
NOTIFY pgrst, 'reload schema';


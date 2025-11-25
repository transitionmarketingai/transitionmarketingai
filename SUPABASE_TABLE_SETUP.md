# Supabase Table Setup: verified_inquiries

## Quick Setup

Run this SQL in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS verified_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  phone text,
  email text,
  industry text,
  requirement text,
  budget text,
  timeline text,
  source text,
  utm jsonb DEFAULT '{}'::jsonb,
  verification_status text DEFAULT 'pending',
  created_at timestamp with time zone DEFAULT now(),
  delivered boolean DEFAULT false,
  delivered_at timestamp with time zone
);
```

## Table Structure

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | uuid | gen_random_uuid() | Primary key |
| `name` | text | null | Inquiry name |
| `phone` | text | null | Phone number |
| `email` | text | null | Email address |
| `industry` | text | null | Industry type |
| `requirement` | text | null | Requirement details |
| `budget` | text | null | Budget range |
| `timeline` | text | null | Timeline |
| `source` | text | null | Source of inquiry |
| `utm` | jsonb | '{}' | UTM parameters |
| `verification_status` | text | 'pending' | Status: pending, verified, rejected |
| `created_at` | timestamp | now() | Creation timestamp |
| `delivered` | boolean | false | Delivery status |
| `delivered_at` | timestamp | null | Delivery timestamp |

## Migration File

The migration file is located at:
- `supabase/migrations/002_create_verified_inquiries_table.sql`

## Notes

- This table stores inquiries AFTER verification is complete
- No triggers or AI logic included
- No frontend connections yet
- No dashboard modifications
- Clean, simple table structure only

## Next Steps

After creating the table:
1. Verify table exists in Supabase dashboard
2. Test insert manually if needed
3. Connect via API routes when ready


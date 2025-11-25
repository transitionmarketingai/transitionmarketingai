# Environment Variables Setup

## Required for Strategy Call Form → Airtable Integration

Add these to your `.env.local` file:

```bash
# Airtable Configuration (PRIMARY)
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_strategy_sessions_base_id_here

# Optional: If using different base for strategy sessions
AIRTABLE_STRATEGY_SESSIONS_BASE_ID=your_base_id_here

# Optional: Custom table name (defaults to "Bookings")
AIRTABLE_BOOKINGS_TABLE_NAME=Bookings

# Supabase Configuration (for mirroring)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Getting Your Airtable Credentials

### 1. API Key
1. Go to https://airtable.com/api
2. Select your base
3. Copy the API key from the documentation page
4. Or go to Account Settings → Developer → Personal access tokens

### 2. Base ID
1. Go to https://airtable.com/api
2. Select your base
3. The Base ID is in the URL: `https://api.airtable.com/v0/{BASE_ID}/TableName`
4. Or find it in the API documentation page under "Base ID"

### 3. Table Name
- Default: `Bookings`
- Or set custom name via `AIRTABLE_BOOKINGS_TABLE_NAME`

## Testing

After setting environment variables:

1. Restart your Next.js dev server
2. Submit a test booking via `/book`
3. Check Airtable "Bookings" table for the new record
4. Check console logs for confirmation

## Troubleshooting

### Error: "Airtable configuration missing"
- Check that `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` are set
- Restart dev server after adding env vars
- Ensure no typos in variable names

### Error: "Failed to connect to Airtable"
- Verify API key is valid
- Check Base ID matches your base
- Ensure table name exists in your base
- Check Airtable API rate limits

### Record not appearing in Airtable
- Check browser console for errors
- Verify field names match Airtable table schema
- Check Airtable API logs for errors


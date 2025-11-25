# Airtable Base Setup Instructions

## Base Name: "Strategy Sessions"

### Table: "Bookings"

Create the following fields in your Airtable base:

| Field Name | Field Type | Options/Notes |
|------------|------------|---------------|
| id | Autonumber | Auto-incrementing |
| name | Single line text | Required |
| phone | Phone number | Required |
| industry | Single select | Options: Real Estate, Healthcare, Education, B2B Services, Startups & SaaS, Other |
| revenue_range | Single select | Options: Below ₹5L/month, ₹5L–₹20L/month, ₹20L–₹50L/month, ₹50L+/month |
| inquiry_volume | Single select | Options: 20–30 per month, 30–50 per month, 50+ per month |
| utm_source | Single line text | Optional |
| utm_medium | Single line text | Optional |
| utm_campaign | Single line text | Optional |
| utm_term | Single line text | Optional |
| utm_content | Single line text | Optional |
| referrer | Long text | Optional |
| created_at | Date & time | Formula: NOW() or default to current timestamp |
| status | Single select | Default: "New" | Options: New, Contacted, Qualified, Converted, Lost |
| assigned_to | Link to another record | Optional (link to Team Members table if exists) |
| notes | Long text | Optional |

## Environment Variables Required

Add these to your `.env.local`:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=your_strategy_sessions_base_id_here
AIRTABLE_BOOKINGS_TABLE_NAME=Bookings

# Optional: If using different base for strategy sessions
AIRTABLE_STRATEGY_SESSIONS_BASE_ID=your_base_id_here
```

## Getting Your Airtable API Key

1. Go to https://airtable.com/api
2. Select your base
3. Copy the API key from the documentation page

## Getting Your Base ID

1. Go to https://airtable.com/api
2. Select your base
3. The Base ID is in the URL: `https://api.airtable.com/v0/{BASE_ID}/TableName`
4. Or find it in the API documentation page


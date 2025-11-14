# Airtable Integration Setup Guide

This guide explains how to set up the AI Marketing Report generator with Airtable for one-click "Send Proposal" functionality.

## Overview

The integration allows you to:
1. Store lead data in Airtable
2. Click "Send Proposal" button in Airtable
3. Automatically generate PDF report
4. Email PDF to client
5. Update Airtable status to "Proposal Sent"

## Prerequisites

1. **Airtable Account**
   - Sign up at https://airtable.com
   - Create a base called "Leads"

2. **Airtable API Key**
   - Go to https://airtable.com/create/tokens
   - Create a new token with `data.records:read` and `data.records:write` scopes

3. **Airtable Base ID**
   - Open your base
   - Go to Help → API documentation
   - Copy the Base ID (starts with `app`)

## Setup Instructions

### Step 1: Create Airtable Base

Create a base called **"Leads"** with the following fields:

| Field Name | Type | Options |
|------------|------|---------|
| Name | Single line text | Required |
| Business | Single line text | Required |
| Industry | Single select | Real Estate, Healthcare, Education, B2B, SaaS, Local Business, Other |
| Ad Budget | Single line text | Required |
| Goal | Single select | Generate New Leads, Scale Existing Campaign, Improve Conversion Rate |
| Estimated Inquiries | Single line text | Optional (default: 40–60) |
| Email | Email | Required |
| Phone | Phone number | Optional |
| Status | Single select | New, Call Booked, Proposal Sent, Closed |
| Report URL | URL | Formula or text |
| Created Time | Created time | Auto-generated |

### Step 2: Configure Environment Variables

Add to `.env.local`:
```bash
AIRTABLE_API_KEY=pat_xxxxxxxxxxxxx
AIRTABLE_BASE_ID=appXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Leads
NEXT_PUBLIC_BASE_URL=https://transitionmarketingai.com
```

Add to Vercel (Production):
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add all the above variables

### Step 3: Create Airtable Button Field

1. In your Airtable base, add a new field called "Send Proposal"
2. Set field type to "Button"
3. Configure the button with:
   - **Action:** Open URL
   - **URL formula:** 
     ```
     "https://transitionmarketingai.com/api/send-proposal?recordId=" & RECORD_ID()
     ```
   - **Label:** "Send Proposal"

### Step 4: API Endpoints

#### 1. Generate Report
**POST** `/api/generate-report`

**Request Body:**
```json
{
  "name": "Rajesh Kumar",
  "business": "Mumbai Realty",
  "industry": "Real Estate",
  "ad_budget": "₹50,000",
  "goal": "Generate New Leads",
  "est_inquiries": "45–60",
  "format": "pdf" // or "html"
}
```

**Response:**
- PDF: Returns PDF file for download
- HTML: Returns JSON with HTML content

#### 2. Send Proposal (Airtable Integration)
**GET** `/api/send-proposal?recordId=recXXXXXXXXXXXXX`

**OR**

**POST** `/api/send-proposal`

**Request Body:**
```json
{
  "recordId": "recXXXXXXXXXXXXX",
  "sendEmail": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Proposal sent successfully",
  "data": {
    "recordId": "recXXXXXXXXXXXXX",
    "reportUrl": "https://transitionmarketingai.com/api/generate-report?recordId=recXXXXXXXXXXXXX",
    "emailSent": true
  }
}
```

### Step 5: Workflow

1. **Lead captured** → Stored in Airtable with status "New"
2. **Call booked** → Update status to "Call Booked"
3. **Click "Send Proposal" button** in Airtable
4. **System automatically:**
   - Fetches lead data from Airtable
   - Generates PDF report
   - Emails PDF to client
   - Updates status to "Proposal Sent"
   - Updates Report URL field
   - Fires analytics event
   - Sends Slack/Discord notification (if configured)

## Testing

### Test Generate Report

```bash
curl -X POST http://localhost:3000/api/generate-report \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "business": "Test Business",
    "industry": "Real Estate",
    "ad_budget": "₹50,000",
    "goal": "Generate New Leads",
    "est_inquiries": "45–60"
  }' \
  --output test-report.pdf
```

### Test Send Proposal

```bash
curl -X GET "http://localhost:3000/api/send-proposal?recordId=recXXXXXXXXXXXXX"
```

### Test with Airtable Record

1. Create a test record in Airtable
2. Click "Send Proposal" button
3. Check email for PDF attachment
4. Verify status updated to "Proposal Sent"
5. Verify Report URL field populated

## Optional: Slack/Discord Notifications

### Slack Webhook

1. Create a Slack webhook: https://api.slack.com/messaging/webhooks
2. Add to `.env.local`:
   ```bash
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxxxx/xxxxx/xxxxx
   ```
3. When proposal is sent, Slack will receive a notification

### Discord Webhook

1. Create a Discord webhook: https://support.discord.com/hc/en-us/articles/228383668
2. Add to `.env.local`:
   ```bash
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxxxx/xxxxx
   ```
3. When proposal is sent, Discord will receive a notification

## Analytics Events

The following GA4 events are fired:

1. **`report_generated`**
   - Fired when PDF/HTML report is generated
   - Properties: `industry`, `format` (pdf/html)

2. **`proposal_sent_auto`**
   - Fired when proposal is sent via Airtable
   - Properties: `industry`, `record_id`

3. **`email_followup_sent`**
   - Fired when follow-up email is sent
   - Properties: `email`

## Troubleshooting

### Issue: "Airtable not configured"
- **Solution:** Ensure `AIRTABLE_API_KEY` and `AIRTABLE_BASE_ID` are set in environment variables

### Issue: "Failed to fetch record from Airtable"
- **Solution:** 
  - Check API key has correct scopes
  - Verify base ID is correct
  - Check record ID exists
  - Verify table name matches `AIRTABLE_TABLE_NAME`

### Issue: "Failed to generate PDF"
- **Solution:** 
  - Check `pdf-lib` is installed: `npm install pdf-lib`
  - Verify all required fields are present in Airtable record
  - Check server logs for errors

### Issue: Email not sent
- **Solution:** 
  - Verify email field is populated in Airtable
  - Check email service is configured (Resend or SMTP)
  - Verify email address is valid
  - Check email service logs

### Issue: Status not updated
- **Solution:** 
  - Check API key has `data.records:write` scope
  - Verify "Status" field exists in Airtable
  - Check field name matches exactly (case-sensitive)

## Advanced: Custom Fields

You can customize the report by adding more fields to Airtable:

- `Custom Message` - Custom message in email
- `Proposal Date` - Date proposal was sent
- `Follow-up Date` - Date for follow-up
- `Notes` - Internal notes

Update `/api/send-proposal/route.ts` to include these fields in the report generation.

## Next Steps

1. ✅ Set up Airtable base with required fields
2. ✅ Configure environment variables
3. ✅ Create "Send Proposal" button in Airtable
4. ✅ Test with a sample record
5. ⏳ Set up Slack/Discord webhooks (optional)
6. ⏳ Monitor analytics events in GA4
7. ⏳ Customize report template as needed

## Support

For issues or questions:
- Check server logs: `vercel logs`
- Check Airtable API status: https://status.airtable.com
- Review API documentation: https://airtable.com/api


# WhatsApp Automation Setup Guide

This guide explains how to set up WhatsApp automation for post-booking communication on Transition Marketing AI.

## Overview

The WhatsApp automation system sends three types of messages:
1. **Confirmation** - Sent immediately after a booking is confirmed
2. **Reminder** - Sent 1 hour before the scheduled call
3. **Follow-up** - Sent after the call (manually or via workflow)

## Prerequisites

1. **Interakt Account** (or Twilio WhatsApp API)
   - Sign up at https://interakt.ai
   - Get your API token from the dashboard

2. **Environment Variables**
   - Add `INTERAKT_API_TOKEN` to your `.env.local` and Vercel environment variables

## Setup Instructions

### Step 1: Configure Environment Variables

Add to `.env.local`:
```bash
INTERAKT_API_TOKEN=your_interakt_api_token_here
```

Add to Vercel (Production):
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `INTERAKT_API_TOKEN` with your token value

### Step 2: API Endpoint

The WhatsApp API endpoint is available at:
- **POST** `/api/whatsapp-leads`

**Request Body:**
```json
{
  "phoneNumber": "+919876543210",
  "name": "John Doe",
  "date_time": "2025-01-20 10:00 AM",
  "messageType": "confirmation" | "reminder" | "followup",
  "customMessage": "Optional custom message for followup"
}
```

**Response:**
```json
{
  "success": true,
  "message": "WhatsApp message sent successfully",
  "data": {
    "phoneNumber": "+919876543210",
    "messageType": "confirmation",
    "analyticsEvent": "lead_confirmation_sent"
  }
}
```

### Step 3: Message Types

#### 1. Confirmation Message (Automatic)
Sent automatically when a Calendly booking is confirmed.

**Trigger:** `handleCalendlyEventScheduled()` in `/book` page

**Message:**
```
Hi {name}, 👋

Thanks for booking your free strategy call with Transition Marketing AI!

✅ We've received your details and are preparing your custom AI Marketing Report.
📅 Call Details: {date_time}.

Before the call, you'll get a short summary of how many verified leads we can deliver for your business.

See you soon!
— The Transition Marketing AI Team
```

#### 2. Reminder Message (1 Hour Before)
Send this 1 hour before the scheduled call.

**Options:**
- **Option A:** Use Interakt's "Delay Trigger" automation (recommended)
- **Option B:** Use a cron job (Vercel Cron) to check upcoming calls and send reminders
- **Option C:** Manual trigger from admin dashboard

**Example API Call:**
```javascript
await fetch('/api/whatsapp-leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
    name: 'John Doe',
    messageType: 'reminder',
  }),
});
```

**Message:**
```
Hey {name}, reminder for your Transition Marketing AI strategy call in 1 hour ⏰

We'll review your business goals and show you how our Verified Leads Launch Program works.

Reply *Ready* if you'd like to reschedule.
```

#### 3. Follow-up Message (Post-Call)
Send this after the call is completed.

**Options:**
- **Option A:** Manual trigger from admin dashboard (recommended)
- **Option B:** Automated workflow based on call completion status

**Example API Call:**
```javascript
await fetch('/api/whatsapp-leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phoneNumber: '+919876543210',
    name: 'John Doe',
    messageType: 'followup',
    customMessage: 'Optional custom message', // Optional
  }),
});
```

**Default Message:**
```
Hi {name}, great speaking with you today! 🙌

Your custom verified lead proposal is being finalized — expect it within 24 hours.

Reply *Quote* if you'd like it sooner.
```

## Analytics Events

The following GA4 events are fired:

1. **`lead_confirmation_sent`**
   - Fired when confirmation message is sent
   - Properties: `phone_number`, `name`

2. **`lead_reminder_sent`**
   - Fired when reminder message is sent
   - Properties: `phone_number`, `name`

3. **`lead_followup_sent`**
   - Fired when follow-up message is sent
   - Properties: `phone_number`, `name`

## Testing

### Test the API Endpoint

```bash
curl -X POST http://localhost:3000/api/whatsapp-leads \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "+919876543210",
    "name": "Test User",
    "messageType": "confirmation"
  }'
```

### Health Check

```bash
curl http://localhost:3000/api/whatsapp-leads
```

Response:
```json
{
  "success": true,
  "configured": true,
  "message": "WhatsApp service is configured"
}
```

## Alternative: Twilio WhatsApp API

If you prefer Twilio instead of Interakt, update `/api/whatsapp-leads/route.ts`:

```typescript
// Replace Interakt API call with Twilio
const twilioResponse = await fetch(
  `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
  {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      From: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      To: `whatsapp:${formattedPhone}`,
      Body: message,
    }),
  }
);
```

## Troubleshooting

### Issue: "WhatsApp service not configured"
- **Solution:** Ensure `INTERAKT_API_TOKEN` is set in environment variables

### Issue: "Failed to send WhatsApp message"
- **Solution:** Check Interakt API token validity and account status
- Verify phone number format (must include country code, e.g., +91)

### Issue: Messages not being received
- **Solution:** 
  - Verify phone number is registered with Interakt
  - Check Interakt dashboard for delivery status
  - Ensure recipient has opted in to receive messages

## Next Steps

1. ✅ Set up Interakt account and get API token
2. ✅ Add `INTERAKT_API_TOKEN` to environment variables
3. ✅ Test confirmation message after booking
4. ⏳ Set up reminder automation (Interakt Delay Trigger or Vercel Cron)
5. ⏳ Add manual follow-up trigger in admin dashboard
6. ⏳ Monitor analytics events in GA4

## Admin Dashboard Integration (Future)

Consider adding to `/admin/clients/[id]`:
- "Send Reminder" button (1 hour before call)
- "Send Follow-up" button (after call)
- WhatsApp message history/log


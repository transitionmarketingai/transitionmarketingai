# Email Automation Setup Guide

This guide explains how to set up automated email confirmation and follow-up for strategy call bookings on Transition Marketing AI.

## Overview

The email automation system sends two types of messages:
1. **Confirmation Email** - Sent immediately after a booking is confirmed
2. **Follow-up Email** - Sent after the call (manually or via scheduler)

## Prerequisites

Choose one of the following email providers:

### Option 1: Resend (Recommended)
- Sign up at https://resend.com
- Get your API key from the dashboard
- Verify your domain

### Option 2: SMTP (Gmail, SendGrid, etc.)
- Use any SMTP provider (Gmail, SendGrid, Mailgun, etc.)
- Get SMTP credentials (host, port, user, password)

## Setup Instructions

### Step 1: Configure Environment Variables

#### For Resend (Recommended):
Add to `.env.local`:
```bash
RESEND_API_KEY=re_your_api_key_here
SMTP_FROM=Transition Marketing AI <hello@transitionmarketingai.com>
```

Add to Vercel (Production):
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add `RESEND_API_KEY` with your API key
4. Add `SMTP_FROM` with your verified sender email

#### For SMTP:
Add to `.env.local`:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM="Transition Marketing AI" <hello@transitionmarketingai.com>
SMTP_SECURE=true
```

**Note:** For Gmail, you'll need to:
1. Enable 2-factor authentication
2. Generate an "App Password" (not your regular password)
3. Use the app password in `SMTP_PASSWORD`

### Step 2: Install Dependencies (if using SMTP)

If you're using SMTP with nodemailer, install it:

```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### Step 3: API Endpoints

#### 1. Confirmation Email
**POST** `/api/email-leads`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "date_time": "2025-01-20 10:00 AM",
  "calendly_link": "https://calendly.com/transitionmarketingai-info/30min",
  "phone": "+919876543210",
  "industry": "real-estate"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Confirmation email sent successfully",
  "data": {
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### 2. Follow-up Email
**POST** `/api/email-followup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "customMessage": "Optional custom message",
  "proposalLink": "https://transitionmarketingai.com/proposals/123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Follow-up email sent successfully",
  "data": {
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

### Step 4: Email Templates

#### Confirmation Email
- **Subject:** "Your Free Strategy Call is Confirmed ✅"
- **Content:**
  - Thank you message
  - Call time and meeting link
  - What to expect before the call
  - Professional branding

#### Follow-up Email
- **Subject:** "Your Verified Lead Proposal is on the Way"
- **Content:**
  - Thank you for the call
  - Proposal timeline (24 hours)
  - What's included in the proposal
  - Link to sample results or proposal

### Step 5: Integration with Booking Flow

The confirmation email is automatically triggered when:
1. A Calendly booking is confirmed
2. The `handleCalendlyEventScheduled()` function is called

**Note:** Currently, the email confirmation requires an email address. Since Calendly doesn't provide email in the client-side event, you have two options:

**Option A:** Add email field to the booking form
```typescript
// Add to booking form
<Input
  id="email"
  type="email"
  placeholder="your@email.com"
  value={bookingData.email}
  onChange={(e) => handleChange('email', e.target.value)}
/>
```

**Option B:** Use Calendly webhooks to get email
1. Set up Calendly webhook: https://calendly.com/integrations/webhooks
2. Create webhook endpoint: `/api/webhooks/calendly`
3. Extract email from webhook payload
4. Trigger email confirmation from webhook

### Step 6: Post-Call Follow-up

Send follow-up emails manually or via scheduler:

**Manual Trigger (Admin Dashboard):**
```typescript
await fetch('/api/email-followup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    customMessage: 'Great speaking with you!',
    proposalLink: 'https://...',
  }),
});
```

**Automated Scheduler (Vercel Cron):**
Create `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/cron/send-followups",
      "schedule": "0 9 * * *"
    }
  ]
}
```

Create `/api/cron/send-followups/route.ts`:
```typescript
// Check for calls completed yesterday
// Send follow-up emails to those clients
```

## Analytics Events

The following GA4 events are fired:

1. **`email_confirmation_sent`**
   - Fired when confirmation email is sent
   - Properties: `email`, `industry`

2. **`email_followup_sent`**
   - Fired when follow-up email is sent
   - Properties: `email`

## Testing

### Test Confirmation Email

```bash
curl -X POST http://localhost:3000/api/email-leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "date_time": "2025-01-20 10:00 AM",
    "calendly_link": "https://calendly.com/transitionmarketingai-info/30min"
  }'
```

### Test Follow-up Email

```bash
curl -X POST http://localhost:3000/api/email-followup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com"
  }'
```

### Health Check

```bash
curl http://localhost:3000/api/email-leads
curl http://localhost:3000/api/email-followup
```

Response:
```json
{
  "success": true,
  "configured": true,
  "provider": "Resend",
  "message": "Email service configured (Resend)"
}
```

## Troubleshooting

### Issue: "Email service not configured"
- **Solution:** Ensure `RESEND_API_KEY` or SMTP credentials are set in environment variables

### Issue: "Failed to send email"
- **Solution:** 
  - Check API key validity (Resend)
  - Verify SMTP credentials (SMTP)
  - Check sender email is verified (Resend)
  - For Gmail, ensure you're using an App Password, not your regular password

### Issue: Emails going to spam
- **Solution:**
  - Verify your domain with Resend
  - Set up SPF/DKIM records
  - Use a professional sender email address
  - Avoid spam trigger words in subject/content

### Issue: Email not received
- **Solution:**
  - Check spam/junk folder
  - Verify email address is correct
  - Check email service logs (Resend dashboard or SMTP logs)
  - Test with a different email address

## Next Steps

1. ✅ Set up Resend account or SMTP credentials
2. ✅ Add environment variables
3. ✅ Test confirmation email endpoint
4. ✅ Add email field to booking form (or set up Calendly webhooks)
5. ⏳ Set up automated follow-up scheduler
6. ⏳ Add manual follow-up trigger in admin dashboard
7. ⏳ Monitor analytics events in GA4

## Admin Dashboard Integration (Future)

Consider adding to `/admin/clients/[id]`:
- "Send Confirmation Email" button
- "Send Follow-up Email" button
- Email delivery status/log
- Email history per client


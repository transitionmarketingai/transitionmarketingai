# Razorpay Client Portal Setup Guide

This guide explains how to set up the secure client portal for Transition Marketing AI.

## Overview

The client portal allows paying clients to:
- View verified leads delivered to them
- Monitor campaign performance (CPL, conversion rate)
- Download proposals and reports (PDFs)
- View billing history and invoices from Razorpay
- Contact support via WhatsApp or support request form

## Environment Variables

Add these to `.env.local` or Vercel:

```bash
# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Airtable Configuration
AIRTABLE_API_KEY=pat_xxxxxxxxxxxxx
AIRTABLE_BASE_ID=app_xxxxxxxxxxxxx
AIRTABLE_CLIENTS_TABLE_NAME=Clients
AIRTABLE_LEADS_TABLE_NAME=Leads
AIRTABLE_SUPPORT_TABLE_NAME=Support

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxx

# WhatsApp (for support)
NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
INTERAKT_API_TOKEN=your_interakt_token (optional, for automated WhatsApp)

# Admin WhatsApp (for support notifications)
ADMIN_WHATSAPP_NUMBER=919876543210
```

## Airtable Schema

### Clients Table

Required fields:
- `Client Name` (Single line text) - or `Name`
- `Email` (Email)
- `Password` or `Password Hash` (Single line text) - bcrypt hashed password
- `Status` (Single select) - "Active" / "Inactive"
- `Industry` (Single line text)
- `Phone` or `WhatsApp Number` (Phone number)
- `Billing Status` (Single select) - "Active" / "Paused" / "Failed" / "Cancelled"
- `Subscription Type` (Single line text)
- `Report URL` (URL) - Link to generated report PDF
- `Razorpay Customer ID` (Single line text) - Optional, for invoice matching
- `Razorpay Subscription ID` (Single line text) - Optional

### Leads Table

Required fields:
- `Name` (Single line text)
- `Email` (Email)
- `Phone` (Phone number)
- `Source` or `Lead Source` (Single line text)
- `Status` or `Verification Status` (Single select) - "Verified" / "Pending" / "Failed"
- `Client Record ID` (Link to Clients table) - Links lead to client
- `Created Time` (Created time) - Auto-generated
- `Industry` (Single line text) - Optional
- `Notes` (Long text) - Optional

### Support Table (Optional)

Required fields:
- `Client Name` (Single line text)
- `Client Email` (Email)
- `Client Record ID` (Link to Clients table)
- `Subject` (Single line text)
- `Message` (Long text)
- `Type` (Single select) - "general" / "billing" / "technical"
- `Status` (Single select) - "Open" / "Resolved" / "Closed"
- `Created Time` (Created time)

## Setting Up Client Passwords

### Option 1: Manual Setup in Airtable

1. Generate bcrypt hash for password:
   ```bash
   node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('client-password', 10).then(hash => console.log(hash));"
   ```

2. Copy the hash and paste into Airtable `Password` or `Password Hash` field.

### Option 2: API Endpoint (Admin Only)

Create an admin-only endpoint to set client passwords:

```typescript
// src/app/api/admin/set-client-password/route.ts
import bcrypt from 'bcryptjs';
// ... admin auth check ...
// Update Airtable with hashed password
```

## Razorpay Invoice Integration

The client portal fetches invoices from Razorpay using the client's email or customer ID.

### Matching Invoices

1. **By Email**: Razorpay invoices are matched by `customer_email` field.
2. **By Customer ID**: If `Razorpay Customer ID` is stored in Airtable, invoices are matched by `customer_id`.

### Invoice Fields Displayed

- Invoice Number
- Amount (converted from paise to rupees)
- Date
- Due Date
- Status (paid / pending / failed)
- View Invoice link (opens Razorpay invoice page)

## Client Portal Routes

- `/client/login` - Client login page
- `/client/dashboard` - Main dashboard (protected)
  - Overview tab - KPIs and recent leads
  - Leads tab - Full leads table with search/export
  - Reports tab - Downloadable PDFs
  - Billing tab - Razorpay invoices
  - Support tab - WhatsApp and support request form

## Security

1. **JWT Tokens**: 24-hour expiration, stored in httpOnly cookies
2. **Route Protection**: All `/api/client/*` routes require valid JWT
3. **Client ID Verification**: All data fetches verify client ID matches token
4. **Password Hashing**: bcrypt with salt rounds = 10

## Testing

1. Create a test client in Airtable:
   - Email: `test@example.com`
   - Password Hash: Generate using bcrypt
   - Status: "Active"

2. Login at `/client/login`

3. Verify:
   - Dashboard loads
   - Leads are filtered by client
   - Reports are accessible
   - Invoices load (if Razorpay configured)

## GA4 Events

The portal fires these events:
- `client_login_success` - On successful login
- `client_view_leads` - When leads tab is viewed
- `client_download_report` - When report is downloaded
- `client_view_invoice` - When invoice is viewed
- `export_csv` - When leads are exported

## Future Enhancements

- Upload monthly performance charts
- Email notifications for new reports
- Push notifications (web push)
- Real-time lead notifications
- Campaign performance charts
- Custom date range filters

## Troubleshooting

### "Client not found" error
- Check email matches exactly in Airtable
- Verify Status = "Active"
- Check Airtable API key and base ID

### "Invalid password" error
- Verify password hash is correct bcrypt format
- Check Password field name matches (`Password` or `Password Hash`)

### No leads showing
- Verify `Client Record ID` field in Leads table links to correct client
- Check Leads table has records with matching client ID

### Invoices not loading
- Verify Razorpay credentials
- Check client email matches Razorpay customer email
- Verify `Razorpay Customer ID` is set if using customer ID matching


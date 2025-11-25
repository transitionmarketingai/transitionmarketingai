# Hybrid Integration Architecture

## Overview

TransitionMarketingAI.com uses a hybrid data architecture that combines:
- **Airtable**: Strategy call form submissions + UTM capture (source of truth for bookings)
- **Supabase**: Verified inquiries, verification logs, dashboard data (source of truth for inquiries)
- **Unified API Layer**: Syncs data between systems

## Architecture Diagram

```
┌─────────────────┐
│  Booking Form   │
│   (Frontend)    │
└────────┬────────┘
         │
         │ POST /api/sync/airtable-to-supabase
         │
         ▼
┌─────────────────────────────────────┐
│   Sync API Route                    │
│   /api/sync/airtable-to-supabase   │
└────────┬───────────────────┬────────┘
         │                   │
         │                   │
    ┌────▼────┐        ┌────▼────┐
    │ Airtable│        │ Supabase│
    │ Bookings│        │ Sessions│
    │  Table  │        │  Table  │
    └─────────┘        └─────────┘
                              │
                              │ (Later: triggers)
                              │
                              ▼
                    ┌─────────────────┐
                    │ Verification    │
                    │   Pipeline      │
                    └────────┬────────┘
                             │
                             │ Creates
                             │
                    ┌────────▼────────┐
                    │ Supabase        │
                    │ verified.       │
                    │ inquiries       │
                    └─────────────────┘
```

## Data Flow

### 1. Strategy Call Booking Flow

1. User fills booking form (`/book`)
2. Form submits to `/api/sync/airtable-to-supabase`
3. API writes to Airtable "Bookings" table
4. API mirrors data to Supabase "verified.sessions" table
5. Returns success (even if one system fails - graceful degradation)

### 2. Verified Inquiry Flow

1. Verification pipeline calls `/api/inquiries/create`
2. Creates inquiry in `verified.inquiries` with status: "pending"
3. Verification steps call `/api/inquiries/verify`
4. Updates scores, flags, status
5. Logs steps in `verified.verification_logs`
6. When ready, calls `/api/inquiries/deliver`
7. Marks as delivered with timestamp

## API Endpoints

### POST `/api/sync/airtable-to-supabase`

**Purpose**: Sync strategy call booking to both Airtable and Supabase

**Request Body**:
```json
{
  "name": "John Doe",
  "phone": "+919876543210",
  "industry": "real-estate",
  "revenue_range": "₹5L–₹20L/month",
  "inquiry_volume": "30–50 per month",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "strategy-call",
  "utm_term": null,
  "utm_content": null,
  "referrer": "https://google.com"
}
```

**Response**:
```json
{
  "success": true,
  "airtable_id": 123,
  "supabase_id": "uuid-here",
  "message": "Booking synced successfully"
}
```

### POST `/api/inquiries/create`

**Purpose**: Create a new verified inquiry

**Request Body**:
```json
{
  "name": "Jane Smith",
  "phone": "+919876543211",
  "email": "jane@example.com",
  "industry": "healthcare",
  "requirement": "Patient inquiries",
  "budget": "₹50L+",
  "timeline": "0-30 days",
  "source": "google_ads",
  "utm_source": "google",
  "utm_medium": "cpc"
}
```

**Response**:
```json
{
  "success": true,
  "inquiry_id": "uuid-here",
  "inquiry": { ... }
}
```

### POST `/api/inquiries/verify`

**Purpose**: Update inquiry verification details

**Request Body**:
```json
{
  "inquiry_id": "uuid-here",
  "intent_score": 85,
  "identity_score": 90,
  "fraud_flags": {},
  "human_verified": true,
  "verification_status": "verified",
  "step": "human_verification",
  "step_status": "completed",
  "step_details": { "duration": 45 }
}
```

### POST `/api/inquiries/deliver`

**Purpose**: Mark inquiry as delivered

**Request Body**:
```json
{
  "inquiry_id": "uuid-here",
  "delivered": true
}
```

## Database Schema

### Supabase Schema: `verified`

#### Table: `sessions`
- Stores strategy call bookings synced from Airtable
- Mirrors Airtable "Bookings" table

#### Table: `inquiries`
- Stores verified inquiries
- Tracks verification status, scores, flags

#### Table: `verification_logs`
- Logs each verification step
- Links to inquiries via `inquiry_id`

#### Table: `clients`
- Stores client information
- Links to inquiries and sessions

## Environment Variables

```bash
# Airtable
AIRTABLE_API_KEY=your_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_STRATEGY_SESSIONS_BASE_ID=your_base_id_here  # Optional
AIRTABLE_BOOKINGS_TABLE_NAME=Bookings

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Setup Instructions

### 1. Create Airtable Base

See `AIRTABLE_SETUP.md` for detailed instructions.

### 2. Run Supabase Migration

```bash
# Apply migration
supabase migration up

# Or manually run the SQL in Supabase dashboard
# File: supabase/migrations/001_create_verified_schema.sql
```

### 3. Configure Environment Variables

Add all required environment variables to `.env.local`

### 4. Test the Integration

1. Submit a test booking via `/book`
2. Check Airtable "Bookings" table
3. Check Supabase `verified.sessions` table
4. Verify data is synced correctly

## Backward Compatibility

- Existing webhook endpoints still work
- Existing `/api/onboarding/submit` still works
- New sync endpoint runs in parallel (non-blocking)
- If Airtable fails, Supabase still writes (and vice versa)
- Form submission never fails due to sync issues

## Error Handling

- All sync operations are non-blocking
- Errors are logged but don't break user flow
- Partial success is returned if one system fails
- Graceful degradation ensures form always works

## Future Enhancements

- [ ] Real-time sync via webhooks
- [ ] Automatic inquiry creation from sessions
- [ ] WhatsApp delivery trigger in `/api/inquiries/deliver`
- [ ] Dashboard integration for viewing synced data
- [ ] Retry mechanism for failed syncs


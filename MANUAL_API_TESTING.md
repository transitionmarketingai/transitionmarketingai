# Manual API Testing Guide

This guide helps you test the three inquiry API routes manually using Postman, ThunderClient, or curl.

## Prerequisites

1. **Start your Next.js dev server:**
   ```bash
   npm run dev
   ```

2. **Set up environment variable:**
   Add to `.env.local`:
   ```bash
   ADMIN_API_KEY=yourstrongsecretkey123
   ```

## Test Routes

### 1. CREATE Inquiry Route

**Endpoint:** `POST http://localhost:3000/api/inquiries/create`

**Headers:**
```
x-admin-key: yourstrongsecretkey123
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "name": "Test User",
  "phone": "+919999999999",
  "email": "test@example.com",
  "industry": "Real Estate",
  "requirement": "2 BHK in Mumbai",
  "budget": "60–80L",
  "timeline": "Next 3 months",
  "source": "manual-test",
  "utm": {
    "source": "google",
    "medium": "cpc"
  }
}
```

**Expected Response:**
```json
{
  "success": true
}
```

**Verify in Supabase:**
- Check `verified_inquiries` table
- New entry should be created with `verification_status: "pending"`
- Copy the `id` field for next tests

---

### 2. VERIFY Inquiry Route

**Endpoint:** `POST http://localhost:3000/api/inquiries/verify`

**Headers:**
```
x-admin-key: yourstrongsecretkey123
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "id": "THE-INQUIRY-ID-FROM-STEP-1",
  "verification_status": "verified"
}
```

**Expected Response:**
```json
{
  "success": true
}
```

**Verify in Supabase:**
- Check `verified_inquiries` table
- `verification_status` should be updated to `"verified"`

---

### 3. DELIVER Inquiry Route

**Endpoint:** `POST http://localhost:3000/api/inquiries/deliver`

**Headers:**
```
x-admin-key: yourstrongsecretkey123
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "id": "THE-INQUIRY-ID-FROM-STEP-1"
}
```

**Expected Response:**
```json
{
  "success": true
}
```

**Verify in Supabase:**
- Check `verified_inquiries` table
- `delivered` should be `true`
- `delivered_at` should have a timestamp

---

## Security Test: Unauthorized Access

**Test without API key:**

**Endpoint:** `POST http://localhost:3000/api/inquiries/create`

**Headers:**
```
Content-Type: application/json
```
(No `x-admin-key` header)

**Expected Response:**
```json
{
  "success": false,
  "error": "Unauthorized"
}
```

**Expected HTTP Status:** `401 Unauthorized`

---

## Quick Test with curl

You can also test using the provided script:

```bash
# Set your admin key
export ADMIN_API_KEY=yourstrongsecretkey123

# Run the test script
./test-inquiry-routes.sh
```

Or test manually with curl:

```bash
# Test CREATE
curl -X POST http://localhost:3000/api/inquiries/create \
  -H "x-admin-key: yourstrongsecretkey123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+919999999999",
    "email": "test@example.com",
    "industry": "Real Estate",
    "requirement": "2 BHK in Mumbai",
    "budget": "60–80L",
    "timeline": "Next 3 months",
    "source": "manual-test",
    "utm": {"source": "google", "medium": "cpc"}
  }'

# Test VERIFY (replace INQUIRY_ID)
curl -X POST http://localhost:3000/api/inquiries/verify \
  -H "x-admin-key: yourstrongsecretkey123" \
  -H "Content-Type: application/json" \
  -d '{"id": "INQUIRY_ID", "verification_status": "verified"}'

# Test DELIVER (replace INQUIRY_ID)
curl -X POST http://localhost:3000/api/inquiries/deliver \
  -H "x-admin-key: yourstrongsecretkey123" \
  -H "Content-Type: application/json" \
  -d '{"id": "INQUIRY_ID"}'
```

---

## Troubleshooting

1. **401 Unauthorized:**
   - Check that `ADMIN_API_KEY` is set in `.env.local`
   - Verify the `x-admin-key` header matches exactly
   - Restart dev server after changing `.env.local`

2. **500 Internal Server Error:**
   - Check Supabase configuration in `.env.local`
   - Verify `verified_inquiries` table exists
   - Check server logs for detailed error messages

3. **Connection Refused:**
   - Ensure dev server is running on port 3000
   - Check if another process is using port 3000

---

## Expected Database Changes

After running all three tests, check Supabase `verified_inquiries` table:

| Field | Value |
|-------|-------|
| `name` | "Test User" |
| `phone` | "+919999999999" |
| `email` | "test@example.com" |
| `industry` | "Real Estate" |
| `verification_status` | "verified" |
| `delivered` | `true` |
| `delivered_at` | [timestamp] |


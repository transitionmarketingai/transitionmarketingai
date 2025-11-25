# API Security: Admin API Key Protection

## Overview

The inquiry-related API routes are protected by an admin API key check. Only requests with a valid API key in the header can access these endpoints.

## Protected Routes

- `/api/inquiries/create` - Create verified inquiry
- `/api/inquiries/verify` - Update verification status
- `/api/inquiries/deliver` - Mark inquiry as delivered

## Environment Variable

Add to your `.env.local`:

```bash
ADMIN_API_KEY=yourstrongsecretkey123
```

## Usage

Include the admin API key in the request header:

```javascript
fetch('/api/inquiries/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-admin-key': 'yourstrongsecretkey123'
  },
  body: JSON.stringify({
    name: 'John Doe',
    phone: '+919876543210',
    // ... other fields
  })
});
```

## Security Notes

- The API key is checked before any processing
- Invalid or missing keys return 401 Unauthorized
- No UI or form changes required
- Backward compatible - existing flows unaffected

## Implementation

The check is performed by `checkAdminKey()` function in `src/lib/checkAdminKey.ts`:
- Reads `x-admin-key` header from request
- Compares with `ADMIN_API_KEY` environment variable
- Returns `true` if valid, `false` otherwise


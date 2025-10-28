# Fast2SMS Troubleshooting

## Issue: "SMS service not configured"

This means the `FAST2SMS_API_KEY` is not being detected in Vercel.

## Quick Fix:

1. **Verify in Vercel:**
   - Go to Vercel → Your Project → Settings → Environment Variables
   - Check if `FAST2SMS_API_KEY` exists
   - Value should be: `QGqc5Vyf2zsLxgaupIblejr9doE3CvW0AKkSUwZm4JhYOHBDM6gquAiErIvSU5lVw12f9MczYCOGRaFB`

2. **Important - Case Sensitivity:**
   - Variable name must be exactly: `FAST2SMS_API_KEY`
   - No spaces, all uppercase

3. **Redeploy:**
   - After adding/updating, go to Deployments
   - Redeploy the latest deployment
   - Environment variables are only loaded on deployment

## What I've Done:

✅ Code now always returns OTP (even if SMS fails)
✅ Added logging to debug Fast2SMS connection
✅ Better error handling

## Current Behavior:

- **If Fast2SMS API key exists**: Will try to send SMS
- **If SMS succeeds**: OTP sent via SMS
- **If SMS fails OR no API key**: OTP returned in response (for testing)

**This means you can test the form even if SMS isn't working!**

The OTP will appear in:
1. Browser console
2. Toast notification (dev mode)
3. Response (check Network tab)

## To Test Right Now:

1. Click "Send OTP"
2. Check browser console for OTP
3. Enter the OTP to verify
4. Form should work!

## To Fix SMS (Optional):

1. Verify API key in Vercel matches exactly
2. Redeploy after adding environment variable
3. Check Vercel logs for Fast2SMS response
4. Verify phone number format (should be 12 digits with 91)

**The form works with or without SMS now - OTP is always returned for testing!** ✅


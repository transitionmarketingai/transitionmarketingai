# How to Check Vercel Logs for Fast2SMS Debugging

## Steps:

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard
   - Click on your project

2. **View Logs**
   - Click "Deployments" tab
   - Click on the latest deployment
   - Click "View Function Logs" or "Logs" tab
   - OR use: Vercel → Your Project → Settings → Logs

3. **Look for These Logs:**
   - `Fast2SMS API Key exists: true/false`
   - `Fast2SMS API Key length: XX`
   - `Sending OTP to Fast2SMS for phone: XXXXXXXXXX`
   - `Fast2SMS HTTP Status: XXX`
   - `Fast2SMS response: {...}`

## What to Check:

1. **Is API key detected?**
   - Should see: `Fast2SMS API Key exists: true`
   - Should see: `Fast2SMS API Key length: 86` (your key length)

2. **Is Fast2SMS API being called?**
   - Should see: `Sending OTP to Fast2SMS for phone: 91XXXXXXXXXX`

3. **What's the response?**
   - Check: `Fast2SMS response:` - This will show the actual API response
   - Common responses:
     - `{return: true}` = Success
     - `{message: "..."}` = Error with message
     - HTTP 401 = Invalid API key
     - HTTP 402 = Insufficient balance

## Common Issues:

### Issue 1: API Key Not Found
**Log shows**: `Fast2SMS API Key exists: false`
**Solution**: 
- Verify in Vercel: Settings → Environment Variables
- Variable name must be: `FAST2SMS_API_KEY` (exact case)
- Redeploy after adding

### Issue 2: Fast2SMS API Error
**Log shows**: `Fast2SMS error: {...}`
**Check**:
- Account balance in Fast2SMS dashboard
- API key validity
- Phone number format

### Issue 3: No Logs at All
**Solution**: 
- Make sure deployment completed
- Try clicking "Send OTP" again
- Check if function is being called

## Quick Test:

**Right now, OTP is always returned for testing**, so:
1. Click "Send OTP"
2. Check browser console for OTP
3. Check Vercel logs for Fast2SMS errors
4. Share the logs and I can help fix the issue

**The form works even if SMS fails - OTP is returned!** ✅


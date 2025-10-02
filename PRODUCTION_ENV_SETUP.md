# 🔐 PRODUCTION ENVIRONMENT VARIABLES SETUP

## ✅ REQUIRED VARIABLES FOR VERCEL DEPLOYMENT

### **Authentication (NextAuth)**
```
NEXTAUTH_SECRET=your-random-secret-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=https://transitionmarketingai.com
```

### **Supabase Database**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### **Optional Integrations**
```
GOOGLE_CLIENT_ID=your-google-oauth-client-id (for Google login)
GOOGLE_CLIENT_SECRET=your-google-oauth-secret
SENDGRID_API_KEY=SG.your-sendgrid-key (for email notifications)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_your-key (for payments)
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

## 🚀 SETUP INSTRUCTIONS

1. **Generate NextAuth Secret**: Run `openssl rand -base64 32`
2. **Get Supabase Keys**: Go to your Supabase project → Settings → API
3. **Set in Vercel**: Project Settings → Environment Variables → Add each variable
4. **Redeploy**: Trigger a new deployment after adding variables

## ⚠️ SECURITY NOTES
- Never commit `.env.local` to git
- Use production URLs (https://) for NEXTAUTH_URL
- Keep service role keys private
- Use live Razorpay keys only in production

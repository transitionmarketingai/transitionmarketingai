# 🚨 URGENT: Fix Vercel Root Directory - Step by Step

## **The Problem:**
- ✅ Code is correct in root directory (`src/app/(marketing)/page.tsx` has "Get Verified Leads")
- ❌ Vercel is deploying from `transition-marketing-ai/` subdirectory (old code)
- ❌ Production site still shows old content

---

## **🎯 SOLUTION: Update Root Directory in Vercel Dashboard**

### **Step 1: Open Vercel Dashboard**

1. Go to: **https://vercel.com/dashboard**
2. Sign in if needed
3. Find project: **"transition-marketing-ai"** (or similar)

### **Step 2: Change Root Directory**

1. Click on your project
2. Go to **"Settings"** (top navigation bar)
3. Click **"General"** (left sidebar)
4. Scroll down to **"Root Directory"** section
5. **Current value:** Probably shows `transition-marketing-ai` or `/transition-marketing-ai`
6. **Change to:** `.` (just a dot) OR leave it **EMPTY**
7. Click **"Save"** button

### **Step 3: Verify Build Settings**

While in Settings → General, also verify:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next` (or leave default)
- **Install Command:** `npm install`
- **Root Directory:** `.` (should be empty or just a dot)

### **Step 4: Force Redeploy**

1. Go to **"Deployments"** tab
2. Find the **latest deployment**
3. Click the **3 dots (⋮)** menu on the right
4. Click **"Redeploy"**
5. **CRITICAL:** In the popup, **UNCHECK** "Use existing Build Cache"
6. Click **"Redeploy"** button
7. Wait 2-5 minutes for build to complete

### **Step 5: Verify Deployment**

After redeploy completes:

1. Check the **build logs** - should show building from root directory
2. Look for: `Building in /` (NOT `/transition-marketing-ai`)
3. Visit: https://transitionmarketingai.com
4. **Hard refresh:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
5. Should see: "Get Verified Leads" in the hero section

---

## **🔍 Alternative: Check for Multiple Projects**

You might have TWO Vercel projects:

1. **Project A:** `transition-marketing-ai` (deploying from subdirectory - OLD)
2. **Project B:** `transitionmarketingai` (should deploy from root - NEW)

### **If You Have Two Projects:**

1. **Check which project has your domain:**
   - Go to each project → Settings → Domains
   - See which one has `transitionmarketingai.com`

2. **Update the project with your domain:**
   - Change its Root Directory to `.` (root)
   - Redeploy

3. **OR point domain to correct project:**
   - Remove domain from old project
   - Add domain to new project (the one deploying from root)

---

## **📋 What to Look For:**

### **In Build Logs (After Redeploy):**

**WRONG (deploying from subdirectory):**
```
Building in /transition-marketing-ai
Installing dependencies...
```

**CORRECT (deploying from root):**
```
Building in /
Installing dependencies...
```

### **In Vercel Settings:**

**WRONG:**
```
Root Directory: transition-marketing-ai
```

**CORRECT:**
```
Root Directory: .  (or empty)
```

---

## **🚀 Quick Test After Fix:**

1. **Check homepage content:**
   - Should see: "Get Verified Leads" in hero
   - Should see: "Delivered to Your Dashboard"
   - Should see: Dashboard mockup with "Verified 94%"

2. **Check browser console:**
   - Open DevTools (F12)
   - Console tab should show NO errors
   - Network tab - all requests should succeed

3. **Check page source:**
   - Right-click → View Page Source
   - Search for "Get Verified Leads"
   - Should find it in the HTML

---

## **⚠️ If Still Not Working:**

### **Check 1: Browser Cache**
- Try incognito/private mode
- Clear browser cache completely
- Try different browser

### **Check 2: CDN Cache**
- Vercel uses CDN caching
- May take 5-10 minutes to propagate
- Try adding `?v=2` to URL: `https://transitionmarketingai.com?v=2`

### **Check 3: DNS Cache**
- Your DNS might be cached
- Try accessing from different network
- Or wait 10-15 minutes for DNS propagation

### **Check 4: Verify Root Directory Changed**
- Go back to Vercel Settings → General
- Verify Root Directory shows `.` (not `transition-marketing-ai`)
- If it didn't save, try again

---

## **✅ Success Indicators:**

After fixing root directory and redeploying:

- ✅ Build logs show "Building in /"
- ✅ Deployment completes successfully
- ✅ Site shows "Get Verified Leads" in hero
- ✅ No errors in browser console
- ✅ Middleware fixes are active (site loads without errors)

---

**Status:** ⚠️ **ROOT DIRECTORY MUST BE CHANGED IN VERCEL DASHBOARD**

**Action Required:** Go to Vercel Dashboard → Settings → General → Change Root Directory to `.` → Save → Redeploy


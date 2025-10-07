# 🧪 Quick Test Guide

## 🚀 **Start Testing (5 minutes)**

### **1. Access the Platform**
```bash
# Server is running at:
http://localhost:3000
```

### **2. Test Toast Notifications**

**Sign Up Flow:**
1. Click "Start Free Trial" or "Sign Up"
2. Try entering weak password (e.g., "test123")
3. **Expected:** Red strength meter
4. Try strong password (e.g., "MyPassword123!")
5. **Expected:** Green strength meter
6. Click "Create Account"
7. **Expected Toasts:**
   - "Creating your account..." (loading)
   - "Account created successfully! 🎉" (success)

**Sign In Flow:**
1. Go to Sign In
2. Enter wrong credentials
3. **Expected:** Red error toast
4. Enter correct credentials
5. **Expected Toasts:**
   - "Signing you in..." (loading)
   - "Welcome back! 👋" (success)

### **3. Test Lead Generation**

1. Click dashboard
2. Click "Generate AI Leads" button
3. **Expected Toasts:**
   - "Generating AI leads..." (loading)
   - "Generated 10 qualified leads! 🎯" (success)
4. Leads appear in table below

### **4. Test Lead Export**

1. After generating leads
2. Click green "Export CSV" button
3. **Expected:**
   - Toast: "Exported X leads to CSV! 📊"
   - CSV file downloads automatically
4. Open CSV file
5. **Verify:** All fields present (Company, Contact, Email, etc.)

### **5. Test Password Strength**

Try these passwords and watch the meter:

| Password | Expected Strength | Color |
|----------|------------------|-------|
| test | Weak | Red |
| testpassword | Medium | Yellow |
| TestPass123! | Strong | Green |

---

## 🔍 **Visual Checklist**

### ✅ **What You Should See:**

**On Every Page:**
- [ ] Toast notifications appear top-right
- [ ] Toasts auto-dismiss after 3-5 seconds
- [ ] Loading toasts have spinner icon

**On Sign Up:**
- [ ] Password strength meter appears
- [ ] Meter color changes (red→yellow→green)
- [ ] Meter fills as password gets stronger
- [ ] Helpful text below password field

**On Dashboard:**
- [ ] "Generate AI Leads" button exists
- [ ] "Export CSV" button is green
- [ ] Leads appear in table after generation
- [ ] Each lead shows AI score (60-100)

---

## 🐛 **Common Issues & Fixes**

### **Issue 1: "Auth import error"**
**Fix:** Server restarted, should be fixed now

### **Issue 2: Leads don't save**
**Fix:** Run `database-fix-final.sql` in Supabase

### **Issue 3: No toasts appear**
**Check:**
- Look in top-right corner
- Check browser console for errors
- Refresh page

### **Issue 4: Port 3000 in use**
**Check:**
```bash
lsof -ti:3000
# Server should be on 3000 now
```

---

## 📊 **Success Metrics**

After testing, you should have:
- ✅ Seen at least 5 toast notifications
- ✅ Password strength meter working
- ✅ Generated 10+ leads
- ✅ Exported 1 CSV file
- ✅ No errors in browser console

---

## 🎯 **Quick Commands**

```bash
# Check server status
lsof -ti:3000

# View server logs
tail -f /tmp/nextjs.log

# Restart server
pkill -9 node && npm run dev

# Open browser
open http://localhost:3000
```

---

## 💬 **What to Report**

If something isn't working, tell me:
1. What action you took
2. What you expected to see
3. What actually happened
4. Any error messages

**Example:**
> "I clicked Generate Leads, expected toast, but nothing appeared. Console shows: [error message]"

---

**Ready to test! 🚀**

Start at http://localhost:3000 and work through the checklist above.

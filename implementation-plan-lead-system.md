# 🚀 LEAD GENERATION SYSTEM - IMPLEMENTATION PLAN

## 🎯 **Goal:**
Build a credit-based lead unlocking system that:
1. Uses onboarding preferences
2. Generates unique leads each time
3. Hides contact info until unlocked (costs credits)
4. Allows saved searches
5. Tracks usage and prevents duplicates

---

## 📋 **Implementation Order**

### **PHASE 1: Database Schema (30 minutes)**

#### **1.1: Update leads table**
```sql
-- Add unlocking fields
ALTER TABLE leads ADD COLUMN is_unlocked BOOLEAN DEFAULT FALSE;
ALTER TABLE leads ADD COLUMN unlocked_at TIMESTAMPTZ;
ALTER TABLE leads ADD COLUMN unlocked_by UUID REFERENCES auth.users(id);
ALTER TABLE leads ADD COLUMN credits_used INTEGER DEFAULT 0;
ALTER TABLE leads ADD COLUMN search_id UUID;

-- Add index for performance
CREATE INDEX idx_leads_unlocked ON leads(is_unlocked);
CREATE INDEX idx_leads_search_id ON leads(search_id);
```

#### **1.2: Create user_preferences table**
```sql
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  target_industries TEXT[],
  target_locations TEXT[],
  company_sizes TEXT[],
  budget TEXT,
  keywords TEXT[],
  monthly_lead_goal INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **1.3: Create saved_searches table**
```sql
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  criteria JSONB NOT NULL,
  last_used TIMESTAMPTZ,
  total_leads_found INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### **1.4: Create lead_unlocks table (transaction log)**
```sql
CREATE TABLE lead_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  lead_id BIGINT REFERENCES leads(id),
  credits_spent INTEGER NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### **PHASE 2: Onboarding Integration (1 hour)**

#### **2.1: Save preferences from onboarding**
Update `src/app/onboarding/page.tsx`:
```typescript
// After step 4 completion
const savePreferences = async () => {
  await supabase.from('user_preferences').upsert({
    user_id: user.id,
    target_industries: [formData.industry],
    target_locations: [formData.location],
    company_sizes: [formData.companySize],
    budget: formData.budget,
    keywords: formData.keywords.split(',').map(k => k.trim()),
    monthly_lead_goal: parseInt(formData.quantity)
  });
};
```

#### **2.2: Load preferences in dashboard**
```typescript
const [userPreferences, setUserPreferences] = useState(null);

useEffect(() => {
  const loadPreferences = async () => {
    const { data } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('user_id', user.id)
      .single();
    setUserPreferences(data);
  };
  loadPreferences();
}, [user]);
```

---

### **PHASE 3: Smart Lead Generation UI (1.5 hours)**

#### **3.1: Create Lead Generation Modal**
New component: `src/components/LeadGenerationModal.tsx`

Features:
- Pre-filled with user preferences
- Editable fields
- Shows estimated leads: "~50 leads"
- Shows credits: "0 credits (generation is FREE)"
- Save search option
- Generate button

#### **3.2: Display Search Criteria**
```typescript
<div className="mb-4 p-4 bg-blue-50 rounded-lg">
  <h4 className="font-medium mb-2">Current Search:</h4>
  <div className="flex flex-wrap gap-2">
    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
      {industry}
    </span>
    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
      {location}
    </span>
    <button className="text-sm text-blue-600 hover:underline">
      Edit Search
    </button>
  </div>
</div>
```

---

### **PHASE 4: Lead Unlocking System (2 hours)**

#### **4.1: Update Lead Card Component**
```typescript
function LeadCard({ lead, onUnlock }) {
  return (
    <div className="border rounded-lg p-4">
      {/* Always visible */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{lead.company}</h3>
          <p className="text-sm text-gray-600">
            {lead.industry} · {lead.location} · {lead.company_size}
          </p>
        </div>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
          {lead.ai_score}
        </div>
      </div>

      {/* Basic insight (1 line) */}
      <p className="text-sm text-gray-700 mb-3">
        💡 {lead.insights?.[0] || 'Company appears to be growing'}
      </p>

      {/* Contact info - Locked or Unlocked */}
      {lead.is_unlocked ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
          <div className="text-sm space-y-1">
            <div><strong>Contact:</strong> {lead.contact_name}</div>
            <div><strong>Email:</strong> {lead.email}</div>
            <div><strong>Phone:</strong> {lead.phone}</div>
            <div><strong>Website:</strong> {lead.website}</div>
          </div>
          <div className="mt-3 text-xs text-green-700">
            ✅ Unlocked on {new Date(lead.unlocked_at).toLocaleDateString()}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
          <div className="text-sm space-y-1 text-gray-400">
            <div><strong>Contact:</strong> ████████ 🔒</div>
            <div><strong>Email:</strong> ████████@████.com 🔒</div>
            <div><strong>Phone:</strong> +91-████████ 🔒</div>
            <div><strong>Website:</strong> ████████.com 🔒</div>
          </div>
          <button
            onClick={() => onUnlock(lead.id)}
            className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Unlock Full Contact - 20 Credits
          </button>
        </div>
      )}

      {/* Actions */}
      {lead.is_unlocked && (
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            Add to CRM
          </button>
          <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Send Email
          </button>
        </div>
      )}
    </div>
  );
}
```

#### **4.2: Create Unlock Confirmation Modal**
```typescript
function UnlockModal({ lead, userCredits, onConfirm, onCancel }) {
  const UNLOCK_COST = 20;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Unlock Lead Contact?</h3>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="font-medium text-lg mb-2">{lead.company}</div>
          <div className="text-sm text-gray-600">
            {lead.industry} · {lead.location}
          </div>
          <div className="mt-2 text-2xl font-bold text-green-600">
            AI Score: {lead.ai_score}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-700 mb-2">You'll get access to:</div>
          <ul className="text-sm space-y-1 text-gray-600">
            <li>✅ Contact name</li>
            <li>✅ Email address</li>
            <li>✅ Phone number</li>
            <li>✅ Website URL</li>
            <li>✅ Detailed AI insights (3 points)</li>
          </ul>
        </div>

        <div className="flex items-center justify-between mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div>
            <div className="font-medium">Cost:</div>
            <div className="text-sm text-gray-600">One-time charge</div>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {UNLOCK_COST} credits
          </div>
        </div>

        <div className="text-sm text-gray-600 mb-4">
          Your balance: <strong>{userCredits} credits</strong>
          {userCredits < UNLOCK_COST && (
            <span className="text-red-600 ml-2">⚠️ Insufficient credits</span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={userCredits < UNLOCK_COST}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Unlock Now
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### **PHASE 5: API Updates (1.5 hours)**

#### **5.1: Update Lead Generation API**
`src/app/api/leads/generate/route.ts`:

```typescript
// Generate leads with hidden contacts
const leads = await generateLeads(criteria);

// Store in database WITHOUT contact info visible
const hiddenLeads = leads.map(lead => ({
  company: lead.company,
  industry: lead.industry,
  location: lead.location,
  company_size: lead.companySize,
  ai_score: lead.score,
  insights: JSON.stringify([lead.insights[0]]), // Only first insight
  
  // Store but mark as locked
  contact_name_encrypted: encrypt(lead.contact),
  email_encrypted: encrypt(lead.email),
  phone_encrypted: encrypt(lead.phone),
  website_encrypted: encrypt(lead.website),
  
  is_unlocked: false,
  assigned_to: userId,
  search_id: searchId,
  status: 'new'
}));
```

#### **5.2: Create Unlock API**
`src/app/api/leads/unlock/route.ts`:

```typescript
export async function POST(req: Request) {
  const { leadId, userId } = await req.json();
  
  // Check user credits
  const { data: profile } = await supabase
    .from('profiles')
    .select('credits')
    .eq('id', userId)
    .single();

  if (profile.credits < 20) {
    return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
  }

  // Unlock lead
  const { data: lead } = await supabase
    .from('leads')
    .update({
      is_unlocked: true,
      unlocked_at: new Date().toISOString(),
      unlocked_by: userId,
      credits_used: 20
    })
    .eq('id', leadId)
    .select()
    .single();

  // Deduct credits
  await supabase.rpc('deduct_credits', {
    user_id: userId,
    amount: 20
  });

  // Log transaction
  await supabase.from('lead_unlocks').insert({
    user_id: userId,
    lead_id: leadId,
    credits_spent: 20
  });

  return NextResponse.json({ success: true, lead });
}
```

---

### **PHASE 6: Smart Generation (2 hours)**

#### **6.1: Duplicate Prevention**
```typescript
// Before generating, check existing leads
const existingCompanies = await supabase
  .from('leads')
  .select('company')
  .eq('assigned_to', userId)
  .in('industry', [criteria.industry])
  .in('location', [criteria.location]);

const existingNames = new Set(existingCompanies.data.map(l => l.company));

// Filter out duplicates
const newLeads = allLeads.filter(lead => 
  !existingNames.has(lead.company)
);
```

#### **6.2: Saved Search Creation**
```typescript
const saveSearch = async (name: string, criteria: any) => {
  await supabase.from('saved_searches').insert({
    user_id: user.id,
    name,
    criteria,
    last_used: new Date().toISOString(),
    total_leads_found: 0
  });
  
  toast.success('Search saved! Access it from Quick Searches.');
};
```

---

## 🎨 **UI COMPONENTS TO CREATE**

### **1. LeadGenerationModal.tsx**
- Search criteria form (pre-filled from preferences)
- Edit mode for custom searches
- Estimated leads count
- Save search checkbox
- Generate button

### **2. LeadUnlockModal.tsx**
- Lead preview
- Cost breakdown
- Credit balance check
- Confirm/Cancel buttons

### **3. SavedSearchesSidebar.tsx**
- List of saved searches
- Last used date
- Quick action buttons
- Edit/Delete options

### **4. LeadCard.tsx** (Enhanced)
- Preview mode (locked)
- Unlocked mode (full info)
- Unlock button
- CRM/Email actions

---

## 📊 **DASHBOARD CHANGES**

### **Before:**
```
[Generate AI Leads] → Hardcoded → All contacts visible
```

### **After:**
```
[Quick Searches]
- Real Estate in Mumbai (Your preference) ⭐
- Healthcare in Delhi (Saved search)
- Custom Search...

[Generated Leads - Preview]
┌─────────────────────────────┐
│ TechCorp Solutions    [95] │
│ Technology · Mumbai        │
│ 💡 Growing company         │
│ Contact: ████ 🔒 20 credits│
│ [Unlock]                   │
└─────────────────────────────┘

[Recently Unlocked]
- ABC Corp (john@abc.com) - Unlocked today
- XYZ Ltd (contact@xyz.com) - Unlocked yesterday
```

---

## 💰 **CREDIT ECONOMICS**

### **User Journey:**

**Month 1 (Starter Plan - ₹4,999):**
- Subscription: ₹4,999
- Included credits: 200
- Can unlock: 10 leads
- Generates: 50-100 leads (finds good prospects)
- Unlocks: 10 best leads (200 credits)
- **Result:** Gets 10 high-quality contacts

**Need More?**
- Buy 200 more credits: ₹2,000
- Unlock 10 more leads
- Total spent: ₹6,999 for 20 contacts

**vs ZoomInfo:**
- 20 contacts = $400/month
- Our price: ₹6,999 (~$84) - **5x cheaper!**

---

## 🔥 **KEY INNOVATIONS**

### **1. Try Before You Buy**
- Generate unlimited leads (FREE)
- See company names and scores (FREE)
- Only pay for contacts you want

### **2. AI Scoring Advantage**
- See quality before unlocking
- Unlock high-scorers (90+) first
- Avoid wasting credits on bad leads

### **3. Saved Searches**
- Find winning formula
- Reuse anytime
- Track performance

### **4. Duplicate Prevention**
- Never pay twice for same lead
- Track across all searches
- Smart deduplication

---

## ✅ **IMPLEMENTATION STEPS**

### **I'll implement in this order:**

1. ✅ Create database schema (saved_searches, user_preferences, lead_unlocks)
2. ✅ Update leads table (add is_unlocked, etc.)
3. ✅ Save onboarding preferences
4. ✅ Load preferences in dashboard
5. ✅ Create Lead Generation Modal (editable criteria)
6. ✅ Hide contact info in leads (show ████)
7. ✅ Create Unlock Modal
8. ✅ Create Unlock API endpoint
9. ✅ Add unlock button to lead cards
10. ✅ Implement duplicate prevention
11. ✅ Add saved searches feature
12. ✅ Show unlocked leads separately

**Estimated Time: 6-8 hours total**

---

## 🎯 **BENEFITS**

### **For Users:**
- ✅ Try before you buy (see quality first)
- ✅ Only pay for good leads
- ✅ AI scoring saves time
- ✅ Saved searches for efficiency

### **For Business:**
- ✅ Higher perceived value
- ✅ Credit top-ups revenue stream
- ✅ Users engage more (unlimited searches)
- ✅ Better retention (saved searches)

---

**Shall I proceed with implementing this complete system?**

This will transform your platform from basic lead generation to a professional, credit-based lead intelligence system!


# �� Secure Environment Setup Instructions

## Step 1: Create .env.local file

Run this command in your terminal:

```bash
cp env.template .env.local
```

## Step 2: Open .env.local in a text editor

```bash
open .env.local
```

OR use Cursor to open the file (it won't be shared in chat)

## Step 3: Add Your Keys

Replace the placeholder values with your actual keys:

### Supabase (you have these now):
- NEXT_PUBLIC_SUPABASE_URL=https://veeylzzymqqfecnlnqr.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY=[paste your anon key]
- SUPABASE_SERVICE_ROLE_KEY=[paste your service_role key]

### OpenAI (you have this):
- OPENAI_API_KEY=[paste your OpenAI key starting with sk-]

### Leave blank for now (we'll add later):
- ANTHROPIC_API_KEY=
- APOLLO_API_KEY=
- HUNTER_API_KEY=
- SENDGRID_API_KEY=

## Step 4: Save the file

Press Cmd+S to save.

## Step 5: Verify it's protected

Run:
```bash
cat .gitignore | grep .env.local
```

You should see `.env.local` listed (this means it won't be committed to git)

## Step 6: Tell me when done

Just reply: "✅ Keys added securely"

DO NOT paste the actual keys in chat!

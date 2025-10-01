#!/bin/bash

echo "🔐 Let's add your API keys securely"
echo ""

read -p "Paste your Supabase ANON key (then press Enter): " ANON_KEY
read -p "Paste your Supabase SERVICE_ROLE key (then press Enter): " SERVICE_KEY
read -p "Paste your OpenAI API key (then press Enter): " OPENAI_KEY

# Update .env.local file
sed -i.backup "s|PASTE_YOUR_ANON_KEY_HERE|$ANON_KEY|g" .env.local
sed -i.backup "s|PASTE_YOUR_SERVICE_ROLE_KEY_HERE|$SERVICE_KEY|g" .env.local
sed -i.backup "s|PASTE_YOUR_OPENAI_KEY_HERE|$OPENAI_KEY|g" .env.local

echo ""
echo "✅ All keys added successfully!"
echo "✅ Your .env.local is now configured"
echo ""
echo "Verifying..."
grep -q "eyJ" .env.local && echo "✅ Keys detected in file" || echo "❌ Something went wrong"


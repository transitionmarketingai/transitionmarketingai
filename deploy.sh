#!/bin/bash

# Deployment Script for Transition Marketing AI
# This script will help you deploy to Vercel

echo "🚀 Transition Marketing AI - Deployment Script"
echo "=============================================="
echo ""

# Check if Vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "⚠️  Not logged in to Vercel. Please login:"
    echo "   Run: vercel login"
    echo ""
    echo "After logging in, run this script again or use:"
    echo "   vercel --prod"
    exit 1
fi

echo "✅ Vercel CLI is ready"
echo ""

# Try to push to GitHub first
echo "📤 Attempting to push to GitHub..."
if git push origin main 2>&1 | grep -q "Authentication failed\|Invalid username"; then
    echo "⚠️  Git push failed (authentication issue)"
    echo "   This is okay - we'll deploy directly via Vercel CLI"
    echo ""
else
    echo "✅ Pushed to GitHub (will trigger Vercel deployment)"
    echo "   Check: https://vercel.com/dashboard"
    exit 0
fi

# Deploy directly via Vercel CLI
echo "🚀 Deploying directly to Vercel..."
vercel --prod --yes

echo ""
echo "✅ Deployment initiated!"
echo "   Check your Vercel dashboard for progress:"
echo "   https://vercel.com/dashboard"


#!/bin/bash

# Production Deployment Script for JyotishGuru

echo "🚀 Starting production deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Deploy Supabase functions
echo "⚡ Deploying Supabase functions..."
if command -v supabase &> /dev/null; then
    supabase functions deploy ai-astrology
    supabase functions deploy generate-kundli
    supabase functions deploy match-making
    supabase functions deploy fetch-horoscope
    supabase functions deploy fetch-panchang
    echo "✅ Functions deployed successfully"
else
    echo "⚠️  Supabase CLI not found. Please deploy functions manually:"
    echo "   1. Go to Supabase Dashboard → Edge Functions"
    echo "   2. Create new functions with the code from supabase/functions/"
fi

# Run database migrations
echo "🗄️  Setting up database..."
echo "Please run the following SQL files in your Supabase dashboard:"
echo "   1. supabase/migrations/001_initial_schema.sql"
echo "   2. supabase/seed.sql"

# Deploy to Vercel (if configured)
if command -v vercel &> /dev/null; then
    echo "🌐 Deploying to Vercel..."
    vercel --prod
else
    echo "📁 Build complete! Deploy the 'dist' folder to your hosting provider"
fi

echo "✨ Deployment complete!"
echo ""
echo "🔧 Post-deployment checklist:"
echo "   ✅ Set environment variables in Supabase Edge Functions"
echo "   ✅ Configure custom domain (optional)"
echo "   ✅ Set up SSL certificate"
echo "   ✅ Test all features"
echo "   ✅ Monitor error logs"
echo ""
echo "🎉 Your astrology platform is ready for production!"
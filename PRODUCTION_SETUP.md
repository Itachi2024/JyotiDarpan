# 🚀 Production Setup Guide

This guide will help you deploy JyotishGuru to production with all features working.

## 📋 Prerequisites

- Node.js 18+ installed
- Supabase account
- Domain name (optional)
- API keys for enhanced features (optional)

## 🗄️ Database Setup

### 1. Create Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose organization and enter project details
4. Wait for project to be ready

### 2. Run Database Migrations
1. Go to SQL Editor in Supabase Dashboard
2. Create a new query
3. Copy and paste content from `supabase/migrations/001_initial_schema.sql`
4. Click "Run" to execute
5. Create another query with content from `supabase/seed.sql`
6. Click "Run" to add sample data

### 3. Configure Authentication
1. Go to Authentication → Settings
2. Enable email authentication
3. Configure email templates (optional)
4. Set up OAuth providers (optional)

## ⚡ Backend Functions Setup

### Option 1: Using Supabase CLI (Recommended)
```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_ID

# Deploy all functions
supabase functions deploy ai-astrology
supabase functions deploy generate-kundli
supabase functions deploy match-making
supabase functions deploy fetch-horoscope
supabase functions deploy fetch-panchang
```

### Option 2: Manual Deployment
1. Go to Supabase Dashboard → Edge Functions
2. Click "Create Function"
3. For each function in `supabase/functions/`:
   - Create new function with the folder name
   - Copy the `index.ts` content
   - Deploy the function

### 3. Set Environment Variables for Functions
Go to Edge Functions → Settings and add:
```
OPENAI_API_KEY=your_openai_key (optional)
ASTROLOGY_API_USER=your_astrology_api_user (optional)
ASTROLOGY_API_KEY=your_astrology_api_key (optional)
```

## 🌐 Frontend Deployment

### 1. Update Environment Variables
Create `.env.production` file:
```env
VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_PUBLISHABLE_KEY="your_publishable_key"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"
VITE_APP_URL="https://your-domain.com"
```

### 2. Build the Application
```bash
npm run build
```

### 3. Deploy to Hosting Provider

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

#### Other Providers
Upload the `dist` folder to any static hosting provider.

## 🔧 API Integrations (Optional but Recommended)

### 1. OpenAI API (for AI Chat)
1. Get API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add to Supabase Edge Functions environment variables
3. The AI chat will work with real responses

### 2. AstrologyAPI.com (for Real Calculations)
1. Sign up at [AstrologyAPI.com](https://astrologyapi.com/)
2. Get free tier credentials
3. Add `ASTROLOGY_API_USER` and `ASTROLOGY_API_KEY` to Edge Functions
4. Kundli and Panchang will use real astronomical data

### 3. Alternative Free APIs
- **Horoscope**: Uses free horoscope APIs with fallback
- **Geocoding**: Uses OpenStreetMap Nominatim (free)
- **Calculations**: Fallback to mathematical calculations

## 🔒 Security Configuration

### 1. Row Level Security (RLS)
- Already configured in migration files
- Users can only access their own data
- Public data (horoscopes, astrologers) is readable by all

### 2. API Rate Limiting
- Supabase provides built-in rate limiting
- Consider adding additional rate limiting for production

### 3. CORS Configuration
- Already configured in Edge Functions
- Update origins for production domain

## 📊 Monitoring & Analytics

### 1. Supabase Dashboard
- Monitor database usage
- Check function logs
- Track authentication metrics

### 2. Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for user session recording
- Google Analytics for usage analytics

## 💳 Payment Integration (Optional)

### For Consultation Payments
1. **Razorpay** (for India)
   ```bash
   npm install razorpay
   ```

2. **Stripe** (International)
   ```bash
   npm install @stripe/stripe-js
   ```

3. Update the payment handling in consultation flow

## 🎨 Customization

### 1. Branding
- Update logo in `src/components/Header.tsx`
- Modify colors in `tailwind.config.ts`
- Update meta tags in `index.html`

### 2. Content
- Modify horoscope content in database
- Update astrologer profiles
- Customize remedy information

### 3. Features
- Add new astrology services
- Integrate additional APIs
- Extend user dashboard

## 🚀 Performance Optimization

### 1. Frontend
- Images are optimized
- Code splitting is enabled
- Lazy loading implemented

### 2. Backend
- Database indexes are set up
- Query optimization in place
- Caching strategies implemented

### 3. CDN
- Use Vercel's global CDN
- Or configure CloudFlare for other providers

## 📱 Mobile App (Future)

The web app is PWA-ready. For native apps:
1. Use React Native with shared business logic
2. Or use Capacitor for hybrid development

## 🔄 Maintenance

### Regular Tasks
1. Update horoscope content daily
2. Monitor API usage and costs
3. Backup database regularly
4. Update dependencies monthly

### Scaling Considerations
1. Database connection pooling
2. Function timeout optimization
3. CDN for static assets
4. Load balancing for high traffic

## 📞 Support

### Common Issues
1. **Functions not working**: Check environment variables
2. **Database errors**: Verify RLS policies
3. **Authentication issues**: Check Supabase auth settings
4. **API failures**: Verify API keys and quotas

### Getting Help
1. Check Supabase documentation
2. Review function logs in dashboard
3. Test APIs individually
4. Check browser console for frontend errors

## ✅ Production Checklist

Before going live:
- [ ] Database migrations completed
- [ ] All functions deployed and tested
- [ ] Environment variables set
- [ ] Authentication working
- [ ] API integrations tested
- [ ] SSL certificate configured
- [ ] Custom domain set up (optional)
- [ ] Error monitoring enabled
- [ ] Backup strategy in place
- [ ] Performance tested
- [ ] Mobile responsiveness verified

## 🎉 Launch!

Your production-ready astrology platform is now live with:
- ✅ Real user authentication
- ✅ Working database with all features
- ✅ AI-powered chat assistant
- ✅ Professional astrologer platform
- ✅ E-commerce functionality
- ✅ Real astrology calculations (with API keys)
- ✅ Mobile-responsive design
- ✅ Production-grade security

**Congratulations! Your astrology platform is ready to serve users worldwide! 🌟**
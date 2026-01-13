# 🚀 JyotishGuru - Complete Setup Guide

## 📋 Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Basic knowledge of React and SQL

## 🗄️ Database Setup (Supabase)

### Step 1: Create New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `jyotishguru` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for project to be ready (2-3 minutes)

### Step 2: Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **Anon public key** (starts with `eyJ`)

### Step 3: Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire content from `supabase/migrations/001_final_schema.sql`
4. Click "Run" to execute the migration
5. You should see "Success. No rows returned" message

### Step 4: Add Sample Data (Optional)

1. In SQL Editor, create another new query
2. Copy and paste content from `supabase/seed.sql`
3. Click "Run" to add sample data

### Step 5: Verify Database Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see these tables:
   - `profiles`
   - `astrologers`
   - `contact_submissions`
   - `kundlis`
   - `horoscopes`
   - `panchangs`
   - `muhurats`

## 📧 Email Setup (Contact Form)

### Step 1: Create Resend Account (Free)

1. Go to [resend.com](https://resend.com) and sign up (free tier: 3,000 emails/month)
2. Get your API key from the dashboard
3. In Supabase dashboard, go to **Settings** → **Environment Variables**
4. Add: `RESEND_API_KEY` = `your_resend_api_key`

### Step 2: Deploy Email Function

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login and link your project:
   ```bash
   supabase login
   supabase link --project-ref YOUR_PROJECT_ID
   ```

3. Deploy the email function:
   ```bash
   supabase functions deploy send-contact-email --no-verify-jwt
   ```

### Step 3: Update Email Settings

Edit `supabase/functions/send-contact-email/index.ts` and update:
```typescript
// Change this line to your domain or use resend.dev
from: 'JyotishGuru <noreply@yourdomain.com>',
```

### Step 4: Test Email Function

1. Go to your contact page
2. Submit a test form
3. Check your email inbox
4. You should receive a professional formatted email

**📖 Detailed Guide**: See `EMAIL_SETUP_GUIDE.md` for complete instructions

## 💻 Frontend Setup

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Optional customization
   VITE_CONTACT_PHONE=+919799104619
   VITE_CONTACT_EMAIL=shreedarshanjyoti@gmail.com
   VITE_WHATSAPP_NUMBER=919799104619
   ```

### Step 3: Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your application!

## 🌐 Production Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repo
4. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

### Option 2: Netlify

1. Build the project:
   ```bash
   npm run build:prod
   ```
2. Upload the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Option 3: Manual Hosting

1. Build the project:
   ```bash
   npm run build:prod
   ```
2. Upload contents of `dist` folder to your web server
3. Configure your server to serve `index.html` for all routes

## ✅ Testing Checklist

After setup, test these features:

- [ ] **Homepage loads correctly**
- [ ] **User can sign up/login**
- [ ] **Contact form submits successfully**
- [ ] **Horoscope page shows data**
- [ ] **Kundli form works**
- [ ] **Payment page displays**
- [ ] **All navigation links work**
- [ ] **Mobile responsive design**

## 🔧 Customization

### Update Astrologer Information

Edit these files:
- `src/pages/AstrologersNew.tsx` - Main astrologer display
- `src/components/AstrologerSection.tsx` - Homepage section
- Database: Update the astrologers table

### Update Contact Information

Search and replace in all files:
- Phone: `+919799104619`
- Email: `shreedarshanjyoti@gmail.com`
- WhatsApp: `919799104619`

### Styling Changes

- Colors: Edit `tailwind.config.js`
- Components: Modify files in `src/components/`
- Global styles: Edit `src/index.css`

## 🚨 Troubleshooting

### Database Issues
- **Migration fails**: Check SQL syntax, ensure you're using the latest migration file
- **RLS errors**: Verify user is authenticated when accessing protected data

### Email Function Issues
- **Function not deploying**: Ensure Supabase CLI is installed and you're logged in
- **Emails not sending**: Check function logs in Supabase dashboard

### Build Issues
- **TypeScript errors**: Run `npm run type-check` to see detailed errors
- **Missing dependencies**: Run `npm install` to ensure all packages are installed

## 📞 Support

For technical support:
- **Email**: shreedarshanjyoti@gmail.com
- **WhatsApp**: +91 97991 04619

## 🎉 You're Ready!

Your JyotishGuru application is now set up and ready for production use. The system includes:

- ✅ User authentication
- ✅ Contact form with database storage
- ✅ Astrologer information display
- ✅ All astrology services (Horoscope, Kundli, etc.)
- ✅ Payment page with UPI integration
- ✅ Mobile-responsive design
- ✅ Production-ready database schema

Happy coding! 🚀
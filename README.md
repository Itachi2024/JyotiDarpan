# JyotishGuru - Complete Astrology Platform

A comprehensive astrology platform built with React, TypeScript, Supabase, and modern web technologies. Features include horoscope readings, Kundli generation, match making, AI astrology bot, and more.

## 🌟 Features

### Core Astrology Services
- **Daily Horoscope (राशिफल)** - Personalized daily, weekly, and monthly predictions for all 12 zodiac signs
- **Kundli Generation (कुंडली)** - Free birth chart generation with North & South Indian styles
- **Match Making (कुंडली मिलान)** - 36 Guna compatibility analysis for marriages
- **Panchang (पंचांग)** - Daily Hindu calendar with Tithi, Nakshatra, Muhurat timings
- **Muhurta Finder (मुहूर्त)** - Find auspicious timings for important events
- **AI Astrology Bot** - Intelligent chatbot for instant astrological guidance

### Professional Services
- **Expert Astrologers** - Connect with 500+ verified astrologers via chat, call, or video
- **Astro Shop** - Certified gemstones, Rudraksha, Yantras, and spiritual products
- **Remedies (उपाय)** - Comprehensive database of astrological remedies and solutions

### User Features
- **Multi-language Support** - Hindi and English interface
- **User Authentication** - Secure login/signup with Supabase Auth
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Real-time Chat** - Live consultation with astrologers
- **Payment Integration** - Secure payment processing for consultations

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful UI components
- **React Query** for data fetching and caching
- **React Router** for navigation

### Backend
- **Supabase** for database, authentication, and real-time features
- **PostgreSQL** database with Row Level Security
- **Supabase Edge Functions** for serverless API endpoints
- **AI Integration** via Lovable AI Gateway

### Key Libraries
- **Lucide React** for icons
- **React Hook Form** with Zod validation
- **Sonner** for toast notifications
- **Date-fns** for date manipulation
- **Recharts** for data visualization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   The `.env` file is already configured with Supabase credentials:
   ```env
   VITE_SUPABASE_PROJECT_ID="rxddgezmhstdnznvjhos"
   VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   VITE_SUPABASE_URL="https://rxddgezmhstdnznvjhos.supabase.co"
   ```

4. **Database Setup**
   
   Run the database migrations:
   ```bash
   # If you have Supabase CLI installed
   supabase db reset
   
   # Or manually run the SQL files in Supabase dashboard:
   # 1. Run supabase/migrations/001_initial_schema.sql
   # 2. Run supabase/seed.sql for sample data
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── auth/           # Authentication components
│   ├── Header.tsx      # Main navigation
│   └── Footer.tsx      # Site footer
├── pages/              # Route components
│   ├── Index.tsx       # Homepage
│   ├── Horoscope.tsx   # Horoscope page
│   ├── Kundli.tsx      # Kundli generation
│   ├── MatchMaking.tsx # Marriage compatibility
│   ├── Panchang.tsx    # Hindu calendar
│   ├── Muhurta.tsx     # Auspicious timings
│   ├── Astrologers.tsx # Astrologer directory
│   ├── Payment.tsx    # Secure payment gateway
│   ├── Shop.tsx        # Product catalog
│   ├── Remedies.tsx    # Astrological remedies
│   └── Services.tsx    # All services overview
├── hooks/              # Custom React hooks
│   ├── useAuth.ts      # Authentication hook
│   ├── useAstrologers.ts # Astrologer data
│   ├── useHoroscope.ts # Horoscope data
│   └── usePanchang.ts  # Panchang data
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
└── App.tsx             # Main app component

supabase/
├── functions/          # Edge Functions
│   └── send-contact-email/ # Contact form email handler
├── migrations/         # Database schema
│   └── 001_final_schema.sql # Complete database setup
└── seed.sql           # Sample data
```

## 🗄️ Database Schema

The application uses a comprehensive PostgreSQL schema with the following main tables:

- **profiles** - User profile information
- **astrologers** - Astrologer profiles and details
- **consultations** - Chat/call/video sessions
- **kundlis** - Birth chart data
- **match_results** - Compatibility analysis results
- **horoscopes** - Daily horoscope content
- **panchangs** - Hindu calendar data
- **muhurats** - Auspicious timing data
- **payments** - Transaction records
- **reviews** - User feedback and ratings

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Run the migration files in the SQL editor
3. Set up Row Level Security policies
4. Configure authentication providers if needed

### AI Integration
The AI astrology bot uses the Lovable AI Gateway. Configure the `LOVABLE_API_KEY` in your Supabase Edge Function environment variables.

### Payment Integration
For production, integrate with payment providers like Razorpay or Stripe by updating the payment handling logic.

## 🚀 Deployment

### Frontend Deployment
The app can be deployed to any static hosting service:

```bash
# Build for production
npm run build

# Deploy to Vercel, Netlify, or similar
```

### Backend Deployment
Supabase handles the backend deployment automatically. For Edge Functions:

```bash
# Deploy contact email function
supabase functions deploy send-contact-email --no-verify-jwt
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update CSS variables in `src/index.css`
- Customize component styles in individual files

### Content
- Update horoscope content in the database
- Modify remedy information in `src/pages/Remedies.tsx`
- Customize astrologer profiles via the admin interface

### Features
- Add new astrology services by creating new pages
- Extend the database schema for additional features
- Integrate with external astrology APIs for calculations

## 📱 Mobile App
The web app is fully responsive and works as a PWA. For native mobile apps, consider using:
- React Native with shared business logic
- Capacitor for hybrid app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Vedic Astrology** traditions and knowledge systems
- **Open source community** for amazing tools and libraries
- **Supabase** for the excellent backend-as-a-service platform
- **shadcn/ui** for beautiful and accessible UI components

## 📞 Support

For support and queries:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and FAQ section

---

**Made with ❤️ for the astrology community**

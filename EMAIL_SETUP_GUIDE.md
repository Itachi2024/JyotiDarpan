# 📧 Email Service Setup Guide

## 🎯 Overview

Your contact form now includes **Resend** email service integration - a free, reliable email API service perfect for small to medium applications.

## 🆓 Why Resend?

- **Free Tier**: 3,000 emails/month (perfect for contact forms)
- **Easy Setup**: Simple API integration
- **Reliable**: High deliverability rates
- **Developer Friendly**: Great documentation and support

## 🚀 Setup Steps

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Get API Key

1. In Resend dashboard, go to **API Keys**
2. Click "Create API Key"
3. Name it: `JyotishGuru Contact Form`
4. Copy the API key (starts with `re_`)

### Step 3: Add Domain (Optional but Recommended)

1. In Resend dashboard, go to **Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Follow DNS setup instructions
5. Wait for verification (can take up to 24 hours)

**Note**: Without a custom domain, emails will be sent from `noreply@resend.dev`

### Step 4: Configure Supabase Function

1. In your Supabase dashboard, go to **Settings** → **Environment Variables**
2. Add a new environment variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (from Step 2)
3. Click "Save"

### Step 5: Update Email Function

The email function is already configured! Just update the `from` field in `supabase/functions/send-contact-email/index.ts`:

```typescript
// If you have a custom domain:
from: 'JyotishGuru <noreply@yourdomain.com>',

// If using Resend's domain:
from: 'JyotishGuru <noreply@resend.dev>',
```

### Step 6: Deploy Function

```bash
supabase functions deploy send-contact-email --no-verify-jwt
```

## ✅ Testing

### Test Contact Form

1. Go to your website's contact page
2. Fill out the form with your email
3. Submit the form
4. Check your email inbox (and spam folder)
5. You should receive a formatted email notification

### Check Logs

1. In Supabase dashboard, go to **Edge Functions**
2. Click on `send-contact-email`
3. Check the logs for any errors

## 📊 Email Template

The email includes:
- **Professional formatting** with your brand colors
- **Contact details** (name, email, phone)
- **Message content** with proper formatting
- **Timestamp** in Indian Standard Time
- **Direct reply functionality**

## 🔧 Customization

### Update Email Template

Edit `supabase/functions/send-contact-email/index.ts`:

```typescript
// Change recipient email
to: ['your-email@domain.com'],

// Update subject line
subject: `New Inquiry from ${name}`,

// Modify HTML template
html: `Your custom HTML template here`
```

### Add Multiple Recipients

```typescript
to: [
  'admin@yourdomain.com',
  'support@yourdomain.com',
  'shreedarshanjyoti@gmail.com'
],
```

### Add Auto-Reply

```typescript
// Send confirmation email to user
const confirmationEmail = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${RESEND_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: 'JyotishGuru <noreply@yourdomain.com>',
    to: [email], // User's email
    subject: 'Thank you for contacting JyotishGuru',
    html: `
      <h2>🙏 Thank you for reaching out!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p>Best regards,<br>JyotishGuru Team</p>
    `
  }),
})
```

## 🚨 Troubleshooting

### Common Issues

**1. Emails not sending**
- Check if `RESEND_API_KEY` is set in Supabase environment variables
- Verify API key is correct and active
- Check function logs for errors

**2. Emails going to spam**
- Set up custom domain with proper DNS records
- Add SPF, DKIM records (Resend provides these)
- Avoid spam trigger words in subject/content

**3. Function deployment fails**
- Ensure Supabase CLI is installed and updated
- Check if you're logged in: `supabase auth status`
- Verify project is linked: `supabase status`

### Check Function Status

```bash
# View function logs
supabase functions logs send-contact-email

# Test function locally
supabase functions serve send-contact-email
```

## 📈 Monitoring

### Resend Dashboard

Monitor your email activity:
1. Go to Resend dashboard
2. Check **Emails** section for delivery status
3. View **Analytics** for open rates, clicks, etc.

### Supabase Logs

1. Go to **Edge Functions** in Supabase
2. Click on your function
3. View real-time logs and errors

## 💰 Pricing

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day
- All features included

**Paid Plans** (if you need more):
- Pro: $20/month for 50,000 emails
- Business: $80/month for 200,000 emails

## 🔄 Alternative Email Services

If you prefer other services, here are alternatives:

### SendGrid (Free: 100 emails/day)
```typescript
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: 'admin@yourdomain.com' }] }],
    from: { email: 'noreply@yourdomain.com' },
    subject: 'New Contact Form',
    content: [{ type: 'text/html', value: htmlContent }]
  })
})
```

### Mailgun (Free: 5,000 emails/month)
```typescript
const formData = new FormData()
formData.append('from', 'JyotishGuru <noreply@yourdomain.com>')
formData.append('to', 'admin@yourdomain.com')
formData.append('subject', 'New Contact Form')
formData.append('html', htmlContent)

const response = await fetch(`https://api.mailgun.net/v3/yourdomain.com/messages`, {
  method: 'POST',
  headers: { 'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}` },
  body: formData
})
```

## ✅ Final Checklist

- [ ] Resend account created
- [ ] API key generated and added to Supabase
- [ ] Domain added and verified (optional)
- [ ] Email function deployed
- [ ] Contact form tested
- [ ] Email received successfully
- [ ] Auto-reply configured (optional)

## 📞 Support

Need help with email setup?
- **Email**: shreedarshanjyoti@gmail.com
- **WhatsApp**: +91 97991 04619

Your contact form is now fully functional with professional email notifications! 🎉
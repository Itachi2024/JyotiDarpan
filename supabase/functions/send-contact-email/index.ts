import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, phone, message } = await req.json()

    // Validate input
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store contact submission in database
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone,
        message,
        is_read: false
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return new Response(
        JSON.stringify({ error: 'Failed to save contact form' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Send email using Resend (free tier: 3000 emails/month)
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    if (RESEND_API_KEY) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'AstroRishabh <noreply@resend.dev>', // Replace with your domain
            to: ['rishabhdadhich21@gmail.com'],
            subject: `New Contact Form Submission from ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 10px;">
                  🔮 New Contact Form Submission
                </h2>
                
                <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                  ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
                </div>
                
                <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #d97706;">
                  <h3 style="color: #92400e; margin-top: 0;">Message:</h3>
                  <p style="color: #451a03; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div style="margin-top: 30px; padding: 15px; background: #ecfdf5; border-radius: 8px;">
                  <p style="margin: 0; color: #065f46; font-size: 14px;">
                    📧 Reply directly to this email or contact them at: ${email}
                    ${phone ? `<br>📞 Call them at: ${phone}` : ''}
                  </p>
                </div>
                
                <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 12px; text-align: center;">
                  This email was sent from your AstroRishabh contact form.<br>
                  Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </p>
              </div>
            `
          }),
        })

        if (!emailResponse.ok) {
          const errorData = await emailResponse.text()
          console.error('Resend API error:', errorData)
        } else {
          console.log('Email sent successfully via Resend')
        }
      } catch (emailError) {
        console.error('Email sending error:', emailError)
        // Don't fail the entire request if email fails
      }
    } else {
      console.log('RESEND_API_KEY not configured, skipping email send')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully. We will get back to you soon!' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
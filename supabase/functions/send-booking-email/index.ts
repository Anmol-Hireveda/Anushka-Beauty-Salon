import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  name: string;
  email: string;
  phone: string;
  service_interest: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service_interest, message }: BookingEmailRequest = await req.json();

    console.log("Received booking request:", { name, email, phone, service_interest });

    // Send email to salon owner
    const ownerEmailResponse = await resend.emails.send({
      from: "Anushka Beauty Salon <onboarding@resend.dev>",
      to: ["loveboyl32925@gmail.com"],
      subject: `New Booking Request from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a1a1a; color: #fff;">
          <h1 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Booking Request</h1>
          
          <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #d4af37; margin-top: 0;">Customer Details</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service Interest:</strong> ${service_interest || 'Not specified'}</p>
          </div>
          
          <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #d4af37; margin-top: 0;">Message</h2>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px;">
            This email was sent from Anushka Beauty Salon website booking form.
          </p>
        </div>
      `,
    });

    console.log("Owner email sent successfully:", ownerEmailResponse);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "Anushka Beauty Salon <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for your booking request - Anushka Beauty Salon",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a1a1a; color: #fff;">
          <h1 style="color: #d4af37; text-align: center;">Anushka Beauty Salon</h1>
          
          <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h2 style="color: #d4af37;">Thank You, ${name}!</h2>
            <p>We have received your booking request and will get back to you shortly.</p>
          </div>
          
          <div style="background: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d4af37;">Your Request Details</h3>
            <p><strong>Service:</strong> ${service_interest || 'Not specified'}</p>
            <p><strong>Message:</strong> ${message}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p>For faster response, contact us on WhatsApp:</p>
            <a href="https://wa.me/919694834669" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Chat on WhatsApp</a>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            Anushka Beauty Salon<br>
            Expert in Bridal & Party Makeup, Hair Styling & Coloring
          </p>
        </div>
      `,
    });

    console.log("Customer confirmation email sent:", customerEmailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Emails sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

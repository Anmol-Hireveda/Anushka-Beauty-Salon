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

    // Generate WhatsApp confirmation link for customer
    const whatsappMessage = encodeURIComponent(
      `🙏 Thank you ${name} for your booking request at Anushka Beauty Salon!\n\n` +
      `📋 Your Request:\n` +
      `• Service: ${service_interest || 'Not specified'}\n` +
      `• Message: ${message}\n\n` +
      `We will contact you shortly. For faster response, reply here!`
    );
    const whatsappLink = `https://wa.me/919694834669?text=${whatsappMessage}`;

    console.log("WhatsApp confirmation link generated for customer");

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Booking request sent successfully",
        whatsappLink: whatsappLink
      }),
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

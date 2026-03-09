import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-razorpay-signature",
};

async function verifySignature(
  body: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const expectedSignature = Array.from(new Uint8Array(signed))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return expectedSignature === signature;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RAZORPAY_WEBHOOK_SECRET = Deno.env.get("RAZORPAY_WEBHOOK_SECRET");
    if (!RAZORPAY_WEBHOOK_SECRET) {
      console.error("Webhook secret not configured");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    const isValid = await verifySignature(body, signature, RAZORPAY_WEBHOOK_SECRET);
    if (!isValid) {
      console.error("Invalid webhook signature");
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);
    const eventType = event.event;

    console.log("Webhook event:", eventType);

    if (eventType === "payment.captured" || eventType === "order.paid") {
      const payment = event.payload?.payment?.entity;
      if (!payment) {
        console.error("No payment entity in webhook");
        return new Response("No payment entity", { status: 400 });
      }

      const orderId = payment.order_id;
      const paymentId = payment.id;

      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const { error } = await supabase
        .from("payments")
        .update({
          razorpay_payment_id: paymentId,
          payment_status: "success",
        })
        .eq("razorpay_order_id", orderId);

      if (error) {
        console.error("Failed to update payment:", error);
        return new Response("Database update failed", { status: 500 });
      }

      console.log(`Payment ${paymentId} for order ${orderId} marked as success`);
    }

    return new Response(JSON.stringify({ status: "ok" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal error", { status: 500 });
  }
});

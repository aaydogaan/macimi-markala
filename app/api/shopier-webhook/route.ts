import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const res = formData.get("res") as string;
    const hash = formData.get("hash") as string;

    const username = process.env.SHOPIER_OSB_USERNAME || "7bce50007fe8547f6db2ac39880991ba";
    const key = process.env.SHOPIER_OSB_KEY || "92bf6f4e825e5ec55caf965fb3c45cc8";

    if (!res || !hash) {
      return new NextResponse("missing parameter", { status: 400 });
    }

    // SHA-256 HMAC Hash Verification
    const expectedHash = crypto
      .createHmac("sha256", key)
      .update(res + username)
      .digest("hex");

    if (expectedHash !== hash) {
      console.warn("Shopier OSB Hash mismatch");
      return new NextResponse("invalid hash", { status: 403 });
    }

    // Decode base64 payload
    const decodedJson = Buffer.from(res, "base64").toString("utf-8");
    const payload = JSON.parse(decodedJson);

    const email = payload.email;
    const orderid = payload.orderid;
    const price = payload.price;
    const customernote = payload.customernote || "";

    console.log("Shopier Webhook Received:", { email, orderid, price, customernote });

    // Update Supabase reservation to 'confirmed' (Payment Verified)
    try {
      const supabase = await createClient();

      // Look up by customer note / order code or by email
      let query = supabase.from("reservations").update({
        status: "confirmed", // Marks payment verified in /recep admin panel
      });

      if (customernote && customernote.includes("MAC-")) {
        query = query.ilike("order_code", `%${customernote.trim()}%`);
      } else if (email) {
        query = query.eq("contact_email", email.trim().toLowerCase());
      }

      await query;
    } catch (dbErr) {
      console.error("Database update error during Shopier webhook:", dbErr);
    }

    // Shopier requires returning exact string "success"
    return new NextResponse("success", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("Shopier webhook error:", err);
    return new NextResponse("error", { status: 500 });
  }
}

// Support GET for testing URL connectivity
export async function GET() {
  return new NextResponse("Shopier Webhook Endpoint is Active", { status: 200 });
}

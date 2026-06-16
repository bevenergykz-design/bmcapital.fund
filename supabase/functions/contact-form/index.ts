import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { name, email, message }: ContactFormData = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store to database using service role (always succeeds regardless of Telegram)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({ name, email, message, status: "new" });

    if (dbError) {
      console.error("Database insert error:", dbError);
    }

    // Send Telegram notification (non-blocking — failure does not cause form error)
    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    let TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");
    const TELEGRAM_CHANNEL_USERNAME = Deno.env.get("TELEGRAM_CHANNEL_USERNAME");

    if (TELEGRAM_BOT_TOKEN && (TELEGRAM_CHAT_ID || TELEGRAM_CHANNEL_USERNAME)) {
      if (!TELEGRAM_CHAT_ID) {
        TELEGRAM_CHAT_ID = TELEGRAM_CHANNEL_USERNAME!.startsWith("@")
          ? TELEGRAM_CHANNEL_USERNAME!
          : `@${TELEGRAM_CHANNEL_USERNAME}`;
      }

      const timestamp = new Date().toLocaleString("ru-RU", {
        timeZone: "Asia/Almaty",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const telegramText = `
🔔 <b>Новое обращение с сайта</b>

👤 <b>Имя:</b> ${name}
📧 <b>Email:</b> ${email}
💬 <b>Сообщение:</b>
${message}

🕒 <b>Время:</b> ${timestamp}
📩 <b>Переслать на:</b> yerik.atyrau@gmail.com
🌐 <b>Источник:</b> site form
      `.trim();

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramText,
          parse_mode: "HTML",
        }),
      }).catch((err) => {
        console.error("Telegram notification failed:", err);
      });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

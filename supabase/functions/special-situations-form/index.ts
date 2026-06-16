import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ApplicationData {
  company_name: string;
  country: string;
  jurisdiction: string;
  industry: string;
  role: string;
  situation_group: string;
  situation_description: string;
  deal_size: string;
  urgency: string;
  full_name: string;
  phone: string;
  applicant_email: string;
  data_confirmed: boolean;
  has_authority: boolean;
  consent_personal_data: boolean;
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

    const body: ApplicationData = await req.json();

    const requiredFields: (keyof ApplicationData)[] = [
      "company_name",
      "country",
      "jurisdiction",
      "industry",
      "role",
      "situation_group",
      "situation_description",
      "deal_size",
      "urgency",
      "full_name",
      "phone",
      "applicant_email",
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ error: `Missing required field: ${field}` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    if (!body.data_confirmed || !body.has_authority || !body.consent_personal_data) {
      return new Response(
        JSON.stringify({ error: "All consents must be accepted" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: dbError } = await supabase
      .from("special_situations_applications")
      .insert({
        company_name: body.company_name,
        country: body.country,
        jurisdiction: body.jurisdiction,
        industry: body.industry,
        role: body.role,
        situation_group: body.situation_group,
        situation_description: body.situation_description,
        deal_size: body.deal_size,
        urgency: body.urgency,
        full_name: body.full_name,
        phone: body.phone,
        applicant_email: body.applicant_email,
        data_confirmed: body.data_confirmed,
        has_authority: body.has_authority,
        consent_personal_data: body.consent_personal_data,
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save application" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send Telegram notification (non-blocking)
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
🔔 <b>Новая заявка: Special Situations</b>

👤 <b>ФИО:</b> ${body.full_name}
📧 <b>Email:</b> ${body.applicant_email}
📞 <b>Телефон:</b> ${body.phone}

🏢 <b>Компания:</b> ${body.company_name}
🌍 <b>Страна:</b> ${body.country}
⚖️ <b>Юрисдикция:</b> ${body.jurisdiction}
🏭 <b>Отрасль:</b> ${body.industry}
👔 <b>Роль:</b> ${body.role}
📋 <b>Тип ситуации:</b> ${body.situation_group}
💰 <b>Размер сделки:</b> ${body.deal_size}
⏱ <b>Срочность:</b> ${body.urgency}

📝 <b>Описание:</b>
${body.situation_description}

🕒 <b>Время:</b> ${timestamp}
📩 <b>Переслать на:</b> yerik.atyrau@gmail.com
🌐 <b>Источник:</b> special situations form
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
      JSON.stringify({ success: true, message: "Application submitted successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing application:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

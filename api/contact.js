// Vercel serverless function. Save this file as /api/contact.js in your project root
// (the "api" folder sits next to "src" and "public", not inside them).
//
// Set these in Vercel > Project > Settings > Environment Variables:
//   RESEND_API_KEY     your key from resend.com
//   CONTACT_TO_EMAIL   the inbox that should receive messages (the email you signed up to Resend with)

import { redis } from "./_redis.js";

const TYPES = ["Business system", "Website", "Web app", "Job offers"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Strip line breaks so user input can't inject extra email headers.
const oneLine = (s) =>
  String(s ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body =
    typeof req.body === "string" ? safeParse(req.body) : req.body || {};

  // Honeypot: bots fill the hidden field. Pretend success and send nothing.
  if (body.company) return res.status(200).json({ ok: true });

  const name = oneLine(body.name).slice(0, 100);
  const email = oneLine(body.email).slice(0, 200);
  const message = String(body.message ?? "")
    .trim()
    .slice(0, 3000);
  const type = TYPES.includes(body.type) ? body.type : "General";

  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return res.status(400).json({ error: "Please fill in every field." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL");
    return res.status(500).json({ error: "Server is not configured." });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `Work order: ${type} from ${name}`,
        text: `Type: ${type}\nName: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!r.ok) {
      console.error("Resend error", r.status, await r.text());
      return res.status(502).json({ error: "Could not send message." });
    }

    // Count the message (only after the email really went out).
    // A counter problem must never make the visitor's message look failed.
    try {
      const key = type === "Job offers" ? "stats:jobs" : "stats:projects";
      await redis([["INCR", key]]);
    } catch (err) {
      console.error("Counter update failed", err);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Could not send message." });
  }
}

function safeParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}

// GET  /api/stats  -> returns the current counters
// POST /api/stats  -> counts one visit, then returns the counters
//
// The site calls POST once per browser session, so refreshing the page
// does not keep raising the visit count.
import { redis } from "./_redis.js";

const BOT_RE = /bot|crawl|spider|preview|headless|lighthouse/i;

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    if (req.method === "POST") {
      const ua = String(req.headers["user-agent"] || "");
      if (!BOT_RE.test(ua)) await redis([["INCR", "stats:visits"]]);
    }

    const out = await redis([
      ["GET", "stats:visits"],
      ["GET", "stats:projects"],
      ["GET", "stats:jobs"],
    ]);

    // Redis not connected yet: the site hides the counters section.
    if (!out) return res.status(200).json({ ready: false });

    const [visits, projects, jobs] = out.map((n) => Number(n) || 0);
    return res.status(200).json({ ready: true, visits, projects, jobs });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ ready: false });
  }
}

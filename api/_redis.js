// Tiny helper for talking to Upstash Redis over its REST API (no npm package needed).
// The file name starts with "_" so Vercel does NOT turn it into a public endpoint.
//
// Connecting Upstash from the Vercel dashboard (Storage tab) adds these variables
// to your project automatically. Both common naming styles are supported.
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// Runs several Redis commands in one request.
// Example: await redis([["INCR", "stats:visits"], ["GET", "stats:jobs"]])
// Returns an array of results, or null if Redis is not connected yet.
export async function redis(commands) {
  if (!URL_ || !TOKEN) return null;
  const r = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commands),
  });
  if (!r.ok) throw new Error(`Redis request failed (${r.status})`);
  const data = await r.json();
  return data.map((item) => {
    if (item.error) throw new Error(item.error);
    return item.result;
  });
}

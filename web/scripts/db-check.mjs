// Check the desk can reach its Supabase schema as the marketing_desk login. Run from web/: node scripts/db-check.mjs
import fs from "node:fs";
import postgres from "postgres";
const env = Object.fromEntries(fs.readFileSync(".env.local", "utf8").split("\n").map((l) => l.match(/^([A-Z_]+)=(.*)$/)).filter(Boolean).map((m) => [m[1], m[2]]));
const ref = "aaeebhiiausfxcyatzjc";
for (const host of ["aws-0-eu-west-2.pooler.supabase.com", "aws-1-eu-west-2.pooler.supabase.com"]) {
  const sql = postgres({ host, port: 6543, database: "postgres", username: `marketing_desk.${ref}`, password: env.MARKETING_DB_PASSWORD, ssl: "require", prepare: false, connect_timeout: 10, max: 1 });
  try {
    const r = await sql`select current_user, (select count(*) from marketing.accounts) as accounts`;
    console.log("OK", host, r[0]);
    await sql.end();
    break;
  } catch (e) {
    console.log("FAIL", host, e.code || "", (e.message || "").slice(0, 120));
    await sql.end({ timeout: 1 }).catch(() => {});
  }
}

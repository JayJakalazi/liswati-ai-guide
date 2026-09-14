// Live lookups against the project database (health facilities + stock listings).
// Returns a compact, factual context block the model must ground its answer in.

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
// Least privilege: use the public (anon) key — these are public read-only reference tables.
// The service-role key is deliberately NOT used here, so the AI path can never read or write
// anything beyond what a normal visitor may read.
const SERVICE_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";


const HEALTH_HINTS = [
  "clinic", "clinics", "hospital", "sibhedlela", "umtfolamphilo", "doctor", "dokotela",
  "art", "hiv", "aids", "tb", "malaria", "cancer", "diabetes", "sugar disease",
  "pregnan", "maternity", "umtfwana", "ambulance", "977", "emergency", "gbv",
  "mental", "psychiatric", "medicine", "muti", "pharmacy", "health", "imphilo",
  "luke commission", "rfm", "mbabane government", "good shepherd", "baylor", "flas",
  "vaccine", "immunis", "family planning", "prep", "screening", "dental", "eye",
];

const STOCK_HINTS = [
  "stock", "shares", "emasheshi", "share", "ese", "c-trade", "ctrade", "ticker",
  "invest", "tjalisimali", "dividend", "exchange", "imakethe", "market", "listed",
  "fnbe", "nedbank", "standard bank", "rssc", "swazispa", "greystone", "inala",
  "portfolio", "broker", "jse", "price",
];

function hits(text: string, hints: string[]) {
  const t = text.toLowerCase();
  return hints.some((h) => t.includes(h));
}

async function rest(path: string) {
  if (!SUPABASE_URL || !SERVICE_KEY) return [];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
  });
  if (!res.ok) {
    console.error("live data query failed", path, res.status, await res.text());
    return [];
  }
  return await res.json();
}

interface Facility {
  name: string;
  facility_type: string;
  region: string | null;
  town: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  hours: string | null;
  services: string[] | null;
  is_public: boolean;
  notes: string | null;
}

interface Listing {
  ticker: string;
  company_name: string;
  sector: string | null;
  market: string;
  last_price: number | null;
  currency: string;
  price_updated_at: string | null;
}

function facilityLine(f: Facility) {
  const bits = [
    `${f.name} (${f.facility_type}${f.is_public ? ", public/free services" : ", private"})`,
    [f.town, f.region].filter(Boolean).join(", "),
    f.address ? `Address: ${f.address}` : "",
    f.phone ? `Tel: ${f.phone}` : "",
    f.email ? `Email: ${f.email}` : "",
    f.hours ? `Hours: ${f.hours}` : "",
    f.services?.length ? `Services: ${f.services.join(", ")}` : "",
    f.notes ?? "",
  ].filter(Boolean);
  return `- ${bits.join(" | ")}`;
}

function listingLine(l: Listing) {
  const price =
    l.last_price != null
      ? `${l.currency} ${Number(l.last_price).toFixed(2)}${
          l.price_updated_at ? ` (as at ${l.price_updated_at.slice(0, 10)})` : ""
        }`
      : "price not recorded in database";
  return `- ${l.ticker} — ${l.company_name}${l.sector ? ` | ${l.sector}` : ""} | ${l.market} | ${price}`;
}

export async function retrieveLiveData(userText: string): Promise<string> {
  const wantsHealth = hits(userText, HEALTH_HINTS);
  const wantsStocks = hits(userText, STOCK_HINTS);
  if (!wantsHealth && !wantsStocks) return "";

  const sections: string[] = [];

  if (wantsHealth) {
    const words = userText
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3);
    let rows: Facility[] = [];
    if (words.length) {
      const or = words
        .slice(0, 8)
        .flatMap((w) => [`name.ilike.*${w}*`, `town.ilike.*${w}*`, `region.ilike.*${w}*`, `notes.ilike.*${w}*`])
        .join(",");
      rows = (await rest(
        `health_facilities?select=*&or=(${encodeURIComponent(or)})&limit=25`
      )) as Facility[];
      const serviceRows = (await rest(
        `health_facilities?select=*&services=ov.{${encodeURIComponent(words.slice(0, 6).join(","))}}&limit=15`
      )) as Facility[];
      const seen = new Set(rows.map((r) => r.name));
      for (const r of serviceRows) if (!seen.has(r.name)) rows.push(r);
    }
    if (rows.length < 5) {
      const fallback = (await rest("health_facilities?select=*&order=name&limit=30")) as Facility[];
      const seen = new Set(rows.map((r) => r.name));
      for (const r of fallback) if (!seen.has(r.name) && rows.length < 30) rows.push(r);
    }
    if (rows.length) {
      sections.push(
        `HEALTH FACILITIES (live from the BAFO database — use these exact names, phone numbers and hours):\n${rows
          .map(facilityLine)
          .join("\n")}\nNational emergency ambulance: 977. Childline / GBV: 116.`
      );
    }
  }

  if (wantsStocks) {
    const rows = (await rest("stock_listings?select=*&order=ticker&limit=40")) as Listing[];
    if (rows.length) {
      sections.push(
        `STOCK LISTINGS (live from the BAFO database — Eswatini Stock Exchange / C-Trade):\n${rows
          .map(listingLine)
          .join(
            "\n"
          )}\nIf a price says "not recorded", tell the user to check live prices on www.ese.co.sz or C-Trade — do NOT invent a price.`
      );
    }
  }

  if (!sections.length) return "";

  return `LIVE DATABASE FACTS — these are verified records. Ground your answer in them, quote the real names and phone numbers, and never invent a facility, contact or share price that is not listed here.\n\n${sections.join(
    "\n\n"
  )}`;
}

# SEO Next-Phase Plan — drneilpatelmd.com
Date: June 7, 2026 | Follows: SEO-QUICK-WINS-COMPLETION-FINAL.md

## Completed This Session

1. **sitemap.xml** — added 5 missing URLs (athletes.html, teams.html, rtp-football, rtp-soccer, rtp-basketball). Now 19 URLs, XML validated, synced to /deploy/.
2. **Team page cannibalization fixed** — teams.html and team-neurology-consulting.html were both targeting "team neurologist." Differentiated:
   - `teams.html` → **Sideline Concussion Coverage & Team Protocols** (event coverage, on-site assessment, protocol development, staff training)
   - `team-neurology-consulting.html` → **Retained Team Neurologist & Organizational Consulting** (ongoing engagements, leagues, training facilities) — unchanged
   - Cross-links added between the two with distinct anchor text.

---

## 1. Unblock AI Crawlers (Cloudflare) — DO THIS FIRST

**Problem:** Your robots.txt (verified live at https://drneilpatelmd.com/robots.txt) contains a Cloudflare-managed block disallowing GPTBot, ClaudeBot, Google-Extended, CCBot, Amazonbot, Bytespider, and meta-externalagent, plus `Content-Signal: ai-train=no`. This directly contradicts your agent-readiness work (.html.md markdown versions, markdown-negotiation worker). Blocked bots cannot retrieve or cite your site when someone asks an AI assistant about sports neurologists or concussion care.

**Steps (Cloudflare dashboard):**
1. Log in at dash.cloudflare.com → select the drneilpatelmd.com zone
2. Go to **Security → Bots** (or **Settings → Bots** depending on plan UI)
3. Find **"Block AI bots"** / **AI Crawl Control** — set to **Allow** (or "Block only on hostnames with ads")
4. Find **"Manage AI bot traffic with robots.txt"** (managed robots.txt) — turn **Off**, or edit content signals to `ai-input=yes`
5. Verify: reload https://drneilpatelmd.com/robots.txt — the "Cloudflare Managed content" block should be gone or no longer disallow GPTBot/ClaudeBot

**DONE (origin side):** robots.txt updated with `Content-Signal: search=yes, ai-input=yes, ai-train=no` and no Disallow lines — AI retrieval/citation allowed, training disallowed via content signal. Synced to /deploy/. The AI-bot Disallow block you see live is injected by Cloudflare, not your file — once you complete the dashboard steps above and deploy, verify the live robots.txt shows your version. Note: content-signal compliance is voluntary for crawlers; it expresses your rights reservation but isn't technically enforced.

*Note: exact menu names vary by Cloudflare plan and change over time. If the UI differs, search "AI Crawl Control" in the dashboard search bar.*

---

## 2. Google Search Console Setup

You currently have no indexing/ranking feedback loop. ~15 minutes.

1. Go to https://search.google.com/search-console → **Add property**
2. Choose **Domain** property type, enter `drneilpatelmd.com` (covers www + non-www, http + https)
3. Verify via **DNS TXT record**: Cloudflare → DNS → Add record → Type TXT, Name `@`, paste the value Google gives you. Verification usually completes in minutes.
4. Once verified: **Sitemaps** (left menu) → submit `https://www.drneilpatelmd.com/sitemap.xml`
5. **URL Inspection** → in GSC, paste each URL into the search bar at the very top of the page, wait for the result, then click **Request Indexing**. Do these 6 (new or substantially changed pages — the rest of the site gets picked up via the sitemap):
   - https://www.drneilpatelmd.com/athletes.html
   - https://www.drneilpatelmd.com/teams.html
   - https://www.drneilpatelmd.com/team-neurology-consulting
   - https://www.drneilpatelmd.com/articles/rtp-football.html
   - https://www.drneilpatelmd.com/articles/rtp-soccer.html
   - https://www.drneilpatelmd.com/articles/rtp-basketball.html

   Google rate-limits manual requests (~10–12/day per property), so 6 is fine in one sitting. Use the exact URLs above — they match each page's canonical tag.
6. Also set up **Bing Webmaster Tools** (https://www.bing.com/webmasters) — you can import your GSC property in one click. Bing powers ChatGPT search results.

**What to watch (after ~2 weeks of data):**
- Coverage report: are all 19 sitemap URLs indexed?
- Performance report: queries containing "sports neurologist," "return to play," "team concussion"
- Any "Duplicate, Google chose different canonical" warnings (would indicate residual teams-page conflict)

---

## 3. Off-Site Authority Plan (Biggest Remaining Lever)

On-site is done. For a YMYL medical site, off-site trust signals now decide rankings. Prioritized:

### Tier 1 — Physician directories (free, do first, ~2–3 hrs total)
Consistent NAP (name, credentials, specialty, contact) everywhere. Claim/complete:

| Directory | URL | Why |
|---|---|---|
| Google Business Profile | https://business.google.com | #1 local signal — required for "sports neurologist near me" map pack. If you practice via Neura Health (telehealth), list as service-area business. |
| Doximity | https://www.doximity.com | Physician-network profile, high domain authority, ranks for "[name] MD" |
| Healthgrades | https://www.healthgrades.com | Highest-traffic patient directory |
| Vitals | https://www.vitals.com | Patient directory + reviews |
| WebMD Care | https://doctor.webmd.com | High-authority physician listing |
| NPI registry check | https://npiregistry.cms.hhs.gov | Ensure taxonomy/specialty current — many directories sync from it |
| Castle Connolly | https://www.castleconnolly.com | Prestige signal if nominated |

### Tier 2 — Sports-specific authority (highest relevance, ongoing)
- **Team/league partnerships**: any team you cover should link to you from their sports-medicine/staff page ("Team Neurologist: Dr. Neil Patel, MD" → drneilpatelmd.com). One .edu athletic-department link is worth dozens of generic directories.
- **Professional societies**: member directories of AAN (Sports Neurology Section), AMSSM if applicable — these produce trusted backlinks.
- **Concussion-education outreach**: offer coach/AT training to local schools and clubs; ask for a link in their resources page. Press release per engagement.
- **Podcast/expert quotes**: sports medicine and athletic-training podcasts; HARO-style expert-quote services (e.g., Qwoted) for journalist citations.

### Tier 3 — Content-driven links
- Pitch your sport-specific RTP protocols to athletic trainer associations and coaching newsletters as a free resource.
- Your CTE-vs-PCS and second-impact-syndrome articles are linkable assets — share where coaches/parents congregate.

**Cadence:** Tier 1 in week 1. Tier 2: one outreach action/week. Expect movement in 1–3 months.

---

## 4. Content Expansion Roadmap (After 1–3 Are Done)

Priority order by expected return:

1. **More sport-specific RTP pages** — hockey, lacrosse, wrestling, rugby, cheerleading (highest catastrophic-injury rates per existing pattern; reuse the rtp-football template). Each is a low-competition long-tail page.
2. **Spanish-language pages** — your pages already carry `data-es` attributes and an Español toggle. For SEO, JS toggles are invisible to Google: Spanish content needs separate URLs (e.g., `/es/conmocion`) with hreflang pairs. Worth it only if Spanish-speaking patients/teams are a real audience — otherwise skip.
3. **Testimonials & case studies** — athlete/coach testimonials (with permission) on athletes.html and teams.html; anonymized team case studies on team-neurology-consulting.html. Strongest E-E-A-T addition available.
4. **Athlete FAQ expansion** — add baseball/softball, equestrian, combat-sports questions to the FAQ schema as those audiences appear in Search Console queries.
5. **Quarterly content refresh** — update `lastReviewed` dates and any consensus-statement references (Amsterdam 2022 → newer when published).

---

## Verification Sources
- robots.txt findings: fetched live 2026-06-07 from https://drneilpatelmd.com/robots.txt
- Sitemap gap: local sitemap.xml vs. files present in repo + deploy/
- Cannibalization: titles/H1/meta extracted from teams.html and team-neurology-consulting.html
- Live page check: https://www.drneilpatelmd.com/athletes (canonical, meta, schema confirmed)

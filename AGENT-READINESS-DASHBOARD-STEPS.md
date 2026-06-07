# Cloudflare dashboard steps (can't be done via files)

## 0. Deploy correctly (do this first — June 2026 update)

The last scan failed because the drag-and-drop upload missed hidden files.
**Upload `deploy-upload.zip`** (in the project root) instead of dragging the
folder: Workers & Pages > your Pages project > Create new deployment > upload
the zip. The zip contains `.well-known/` (40 files verified). Re-zip after any
content change, or run: `cd deploy && zip -r ../deploy-upload.zip . -x "functions/*" "*.DS_Store"`

## 0b. Fix AI Crawl Control robots.txt (it currently blocks all AI agents)

Your live robots.txt now contains Cloudflare-managed rules with
`Disallow: /` for ClaudeBot, GPTBot, CCBot, Amazonbot, etc. This tells
compliant AI agents to stay away from the entire site — the opposite of
agent-ready. In **AI Crawl Control**:

1. Find the robots.txt / crawler management setting.
2. Recommended: set AI crawlers to **Allow**, and keep/set the Content Signal
   to `search=yes, ai-input=yes, ai-train=no` — agents and AI search can read
   the content, but it is not used for model training.
3. If you'd rather allow everything (max reach for patient education), turn
   managed robots.txt off entirely; our own robots.txt (Allow: / + sitemap)
   then serves as-is.

## 0c. Markdown negotiation via Worker (replaces the Pages Function)

Drag-and-drop deployments cannot ship Pages Functions, so use the standalone
Worker in `worker-markdown-negotiation.js` — setup steps are in that file's
header comment (create Worker, paste, add route `www.drneilpatelmd.com/*`).
This needs the `.md` files from the zip to be deployed first.

## 1. Markdown for Agents (check #3 — alternative to 0c on Pro/Business)

Requires a **Pro or Business plan** (free at those tiers).

1. Log in at dash.cloudflare.com and select the `drneilpatelmd.com` zone.
2. Go to the **AI Crawl Control** section.
3. Toggle **Markdown for Agents** on.

Verify after enabling:

```
curl -s -H "Accept: text/markdown" https://www.drneilpatelmd.com/ -D - -o /dev/null | grep -i 'content-type\|x-markdown-tokens'
```

Expect `content-type: text/markdown` and an `x-markdown-tokens` header.

Source: https://developers.cloudflare.com/fundamentals/reference/markdown-for-agents/

## 2. DNS-AID records (check #2)

In the zone's **DNS > Records**, add an HTTPS (SVCB-compatible) record:

| Field | Value |
|---|---|
| Type | HTTPS |
| Name | `_index._agents` |
| Priority | 1 (ServiceMode) |
| Target | `www.drneilpatelmd.com.` |
| Value/params | `alpn="h2"` |

Then enable DNSSEC: **DNS > Settings > Enable DNSSEC**, and add the DS record it gives you at your domain registrar (if your registrar is Cloudflare, this is automatic).

Verify:

```
dig +dnssec HTTPS _index._agents.drneilpatelmd.com
```

Caveats (flagging honestly):

- The DNS-AID spec is an early IETF draft (draft-mozleywilliams-dnsop-dnsaid); record naming/params may change.
- The record advertises an agent entrypoint at your web host. You don't run an A2A/MCP service, so this satisfies the scanner but doesn't point to a real agent endpoint. Skip `_a2a._agents` / `_mcp._agents` records — those would be outright false advertising.

Source: https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/, https://www.rfc-editor.org/rfc/rfc9460

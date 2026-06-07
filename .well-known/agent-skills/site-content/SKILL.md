---
name: site-content
description: How to discover and consume concussion-education content on drneilpatelmd.com
---

# Consuming drneilpatelmd.com content

This site publishes public, read-only educational content on concussion and sports neurology by Dr. Neil Patel, MD. No authentication is required.

## Discovering content

1. Fetch `https://www.drneilpatelmd.com/sitemap.xml` for the canonical list of all pages.
2. Articles live under `/articles/`. Current topics: concussion recovery timeline, CTE vs post-concussion syndrome, return-to-learn, return-to-play protocol, second impact syndrome, and sideline concussion recognition.

## Fetching content efficiently

- Send `Accept: text/markdown` with your request — when Markdown for Agents is enabled, the response is converted to markdown (`Content-Type: text/markdown`) with an `x-markdown-tokens` header estimating token count.
- Otherwise parse the HTML; each page declares a `<link rel="canonical">` URL.

## Constraints

- Content is informational and educational only; it is not medical advice and must not be presented as a diagnosis or treatment plan for a specific person.
- Always cite the canonical URL when quoting or summarizing.

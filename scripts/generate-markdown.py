#!/usr/bin/env python3
"""Generate .md versions of canonical HTML pages for markdown content negotiation.

Run after editing any page, from the project root:
    python3 scripts/generate-markdown.py
Requires: pip install markdownify beautifulsoup4

For each canonical page foo.html this writes foo.html.md next to it
(in both the project root and deploy/). The Cloudflare Pages Function in
functions/_middleware.js serves these when a request includes
Accept: text/markdown.
"""
import sys
from pathlib import Path

from bs4 import BeautifulSoup
from markdownify import markdownify

CANONICAL_PAGES = [
    "index.html",
    "legal.html",
    "accessibility.html",
    "concussion.html",
    "post-concussion-syndrome.html",
    "headache-migraine-athletes.html",
    "neurological-performance.html",
    "team-neurology-consulting.html",
    "articles/concussion-recovery-timeline.html",
    "articles/cte-vs-post-concussion-syndrome.html",
    "articles/return-to-learn.html",
    "articles/return-to-play-protocol.html",
    "articles/second-impact-syndrome.html",
    "articles/sideline-concussion-recognition.html",
]

STRIP_TAGS = ["script", "style", "noscript", "nav", "iframe", "svg", "form", "video"]


def convert(html_path: Path) -> str:
    soup = BeautifulSoup(html_path.read_text(encoding="utf-8"), "html.parser")
    title = soup.title.string.strip() if soup.title and soup.title.string else html_path.stem
    canonical = soup.find("link", rel="canonical")
    canonical_url = canonical["href"] if canonical else ""
    for tag in soup(STRIP_TAGS):
        tag.decompose()
    body = soup.body or soup
    md = markdownify(str(body), heading_style="ATX", strip=["img"])
    md = "\n".join(line.rstrip() for line in md.splitlines())
    while "\n\n\n" in md:
        md = md.replace("\n\n\n", "\n\n")
    header = f"---\ntitle: {title}\n"
    if canonical_url:
        header += f"canonical: {canonical_url}\n"
    header += "---\n\n"
    return header + md.strip() + "\n"


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    count = 0
    for rel in CANONICAL_PAGES:
        src = root / "deploy" / rel
        if not src.exists():
            src = root / rel
        if not src.exists():
            print(f"SKIP (missing): {rel}", file=sys.stderr)
            continue
        md = convert(src)
        for base in (root, root / "deploy"):
            out = base / (rel + ".md")
            if out.parent.is_dir():
                out.write_text(md, encoding="utf-8")
                count += 1
    print(f"Wrote {count} markdown files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

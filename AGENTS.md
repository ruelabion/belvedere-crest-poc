# Codex Project Notes

## Project

This is a static HTML/CSS/JavaScript hotel website located at:

`/Users/ruelabion/Sites/spiceworx-sales-activities/dotPH/study/aquila.foxcreation.net`

`rebrand-belvedere-crest` was the rebrand working branch; it has since been merged into `main` (fast-forward), which is now the deployable branch — see Deployment section below.

## Git History

- `5dc143d Initial website baseline`
  - Initialized Git on `main` and committed the original static website.
- `3285125 Rebrand website to Belvedere Crest`
  - Created branch `rebrand-belvedere-crest`.
  - Rebranded visible Aquila references to Belvedere Crest.
  - Added `assets/images/belvedere-crest-logo.svg`.
  - Updated email/domain text to Belvedere Crest variants.
- `4dae88b Replace placeholder site content`
  - Replaced Latin/template placeholder copy across HTML pages.
  - Fixed obvious template typos such as `Avaliable`, `Standart`, `Shower Bathub`, and `sg ft`.
  - Replaced footer attribution text and the placeholder address.
- `5d39cc9 Fix content bugs, add per-page metadata, and promote Spiceworx`
  - Fixed 6 of 12 `faq.html` accordion answers that were misaligned with their questions.
  - Resolved a pet-policy contradiction between the FAQ and the house rules on `rooms-detail.html`.
  - Fixed a VIP Room bed/capacity mismatch between `rooms.html` and `rooms-detail.html`.
  - Fixed the Google Maps embed on `contact.html`/`rooms-detail.html`, which pointed to "London Eye, London" instead of the brand's own fictional address.
  - Added a tailored `<meta name="description">` plus Open Graph tags to all 11 content pages.
  - Added a "Powered by Spiceworx" footer credit (links to spiceworx.com) site-wide.
  - Added the AI chat widget (`chat.html`, `assets/js/chat-widget.js`, `assets/css/chat-widget.css`, chat avatar/logo images).
  - Merged `rebrand-belvedere-crest` → `main` (fast-forward) so `main` is the deployable source of truth.
- `3d85472 Add CI/CD deploy workflow (GitHub Actions -> S3 -> CloudFront)`
  - Added `.github/workflows/deploy.yml` — syncs the repo root to S3 and invalidates CloudFront on every push to `main`.
- `a7fccf5 Fix chat widget tenant_id and API key for hotel_poc`
  - Corrected `chat.html`'s `TENANT_ID` (`joignacio` → `hotel_poc`) and `API_KEY` to match the tenant actually provisioned on the RAG backend.
- `bbec252 Rename AI Assistant to AI Concierge across the site`
  - Renamed the chat widget's label/title/aria text from "AI Assistant" to "AI Concierge" (hotel-appropriate) across all 12 HTML pages.

## Site Decisions

- Brand name: `Belvedere Crest`
- Contact email: `hello@belvederecrest.com`
- Fictional address: `7 Sanctuary Vale, Crestwood Haven`
- Copyright footer should read:
  `Belvedere Crest © <year> All Rights Reserved`
- Do not use `FoxCreation`, `Fox Creation`, or the old Aquila brand in visible site content.

## Technical Notes

- Static website only. No package manager or build step is currently present.
- Main pages are root-level `.html` files.
- Shared styles live in `assets/css/main.css` and `assets/css/responsive.css`.
- Shared scripts live in `assets/js/script.js`, `assets/js/submit-form.js`, and `assets/js/swiper-script.js`.
- The floating chat widget (`assets/js/chat-widget.js`, `assets/css/chat-widget.css`) is embedded near the end of every page's `<body>`, right before `</body>`, and loads `chat.html` in an iframe. Any full-site markup change (e.g. renaming widget labels) needs to touch all 12 HTML files identically — see the Git History entries for `5d39cc9` and `bbec252` for the pattern.
- The former homepage YouTube hero transition was removed:
  - `assets/js/banner.js` was deleted.
  - The `banner.js` script include was removed from `index.html`.
  - The unused hero video container and CSS were removed.

## Validation Checks Used

- Search for leftover placeholder/rebrand text:
  `rg -n "Lorem|ipsum|Avaliable|Avaliability|Standart|Bathub|Jhon|Goe|Testinomials|sg ft|FoxCreation|Fox Creation|Fly Me to The Moon|All Rights Reserved by" *.html`
- Local link/asset reference scan was run and returned `missing count 0`.
- FAQ Q&A pairs were verified programmatically (parsed each accordion question against its answer) after the misalignment fix, to confirm every question now has a matching, sensible answer.

## Deployment — `belvedere-crest-poc`

This is the first entry in a planned POC series for Spiceworx, deployed live to demonstrate managed hosting, web development, and the AI Business Chatbot capability.

- **GitHub repo:** `github.com/ruelabion/belvedere-crest-poc` (private). `origin` remote already configured locally; both `main` and `rebrand-belvedere-crest` are pushed.
- **Live URLs:**
  - `https://hotel-poc.spiceworx.com` (custom subdomain, primary)
  - `https://d2viw7iepmh0w3.cloudfront.net` (CloudFront default domain)
- **AWS account:** `033858994314`, profile `sciadmin` (also owns the `spiceworx.com` Route 53 hosted zone `Z1FGLTWQDGCNBH`).
- **Infrastructure:**
  - S3 bucket: `belvedere-crest-poc` (ap-southeast-1, private — no static website hosting, CloudFront-only access via OAC).
  - CloudFront distribution: `E2L1N5HY5HF5AM`, alias `hotel-poc.spiceworx.com`, using the existing `*.spiceworx.com` ACM cert (`us-east-1`, valid until 2026-09-27 — reused, not newly issued).
  - IAM deploy user: `github-deploy-belvedere-crest-poc`, scoped only to this bucket + this distribution's `CreateInvalidation`.
  - Route 53: CNAME `hotel-poc.spiceworx.com` → CloudFront domain, in the `spiceworx.com` zone.
- **CI/CD:** `.github/workflows/deploy.yml` triggers on every push to `main` — `aws s3 sync` (excludes `.git/*`, `.github/*`) then a CloudFront `/*` invalidation. GitHub repo secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `CLOUDFRONT_DISTRIBUTION_ID` (set manually — `gh` CLI was not installed on this machine at setup time).
- Provisioned using the `/setup-cicd-aws` skill (`~/.claude/skills/setup-cicd-aws/`).

## Chat Widget (AI Concierge) — RAG Backend

- `chat.html` is the standalone iframe page embedded site-wide via a floating widget (`assets/js/chat-widget.js`, `assets/css/chat-widget.css`); it calls the live SpiceWorx multi-tenant RAG API at `https://api.spiceworx.com`.
- **Tenant:** `hotel_poc`. Its API key is hardcoded client-side in `chat.html` (`const API_KEY`) — this is expected/by-design for this widget architecture (same pattern as every other tenant embed), not a leaked backend secret.
- **RAG backend server:** AWS Lightsail instance `RAG-App` (ap-southeast-1, `13.229.201.235`, Ubuntu 22.04, user `ubuntu`). App lives in `~/ragdemo/` — see that repo's own `CLAUDE.md` for full ops docs (Docker Compose services, tenant list, ingestion flow, restart procedure). SSH key: `~/.ssh/lightsail-key.pem`.
- The `hotel_poc` tenant's knowledge base was ingested from the `kb/*.md` files generated by the `/extract-site-kb` skill (sibling directory `dotPH/study/kb/`, 8 topic files derived from this site's own content).
- If the chat widget ever 401s again: SSH into the Lightsail box and check `~/ragdemo/.env`'s `TENANT_API_KEYS` map for the `hotel_poc` entry — a prior incident was traced to a copy/paste mixup between digit-zero (`0`) and capital-O (`O`) in the key string, not a backend misconfiguration.
- Known pre-existing gaps noticed in `~/ragdemo/CLAUDE.md`'s tenant table (not yet fixed, flagged for future follow-up): `rfq_demo` is listed with a bucket (`rag-s3-rfq_demo`) that doesn't actually exist in S3, and a bucket `rag-s3-electrical` exists with no corresponding tenant table entry or `TENANT_API_KEYS` entry.

## Editing Guidance

- Keep changes scoped to static HTML/CSS/JS.
- Preserve the current branch unless the user asks to switch branches.
- Do not restore or overwrite user changes unless explicitly requested.
- If making content changes, scan all root HTML files for repeated footer/header/sidebar sections.
- This site is now live (see Deployment section) — any push to `main` auto-deploys via GitHub Actions. Commit deliberately; there's no staging environment.
- Never print AWS secret keys or RAG API keys into a shell transcript, even truncated. When retrieving them (e.g. from `aws iam create-access-key` or the Lightsail server's `.env`), redirect straight to the consuming step or ask the user to handle it in their own terminal.

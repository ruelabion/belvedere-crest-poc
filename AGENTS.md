# Codex Project Notes

## Project

This is a static HTML/CSS/JavaScript hotel website located at:

`/Users/ruelabion/Sites/spiceworx-sales-activities/dotPH/study/aquila.foxcreation.net`

The active rebrand branch is:

`rebrand-belvedere-crest`

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
- The former homepage YouTube hero transition was removed:
  - `assets/js/banner.js` was deleted.
  - The `banner.js` script include was removed from `index.html`.
  - The unused hero video container and CSS were removed.

## Validation Checks Used

- Search for leftover placeholder/rebrand text:
  `rg -n "Lorem|ipsum|Avaliable|Avaliability|Standart|Bathub|Jhon|Goe|Testinomials|sg ft|FoxCreation|Fox Creation|Fly Me to The Moon|All Rights Reserved by" *.html`
- Local link/asset reference scan was run and returned `missing count 0`.

## Editing Guidance

- Keep changes scoped to static HTML/CSS/JS.
- Preserve the current branch unless the user asks to switch branches.
- Do not restore or overwrite user changes unless explicitly requested.
- If making content changes, scan all root HTML files for repeated footer/header/sidebar sections.

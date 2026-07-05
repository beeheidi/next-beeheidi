# Plan du site (sitemap page) — Design

## Context

The site currently has no sitemap page. While reviewing the footer for a
place to link it, we found `/galerie` existed as a real route but was never
linked from the header nav or the footer — it has been removed as part of
this change (no other code referenced it).

## Goal

Add a simple "Plan du site" page listing the site's existing static pages,
and link to it from the footer.

## Scope

Static pages only. Dynamic prestation detail pages (`/explore/[slug]`, ~62
pages) are not listed individually — they remain discoverable via `/explore`.

## Route

- New path key `/plan-du-site` in `i18n/navigation.js`:
  - `fr`: `/plan-du-site`
  - `en`: `/sitemap`
- Follows the existing convention (e.g. `mentions-legales` → `legal-notice`).

## Page

`app/[locale]/plan-du-site/page.js` — server component, same shape as
`app/[locale]/mentions-legales/page.js`:
- `TopImage` + `PageTitle`
- Two grouped lists of links, using `Link` + `getTranslatedPathname`:
  - **Navigation principale**: Accueil (`/`), Explorer (`/explore`), Qui est
    Heidi (`/qui-est-heidi`), Services (`/services`), Contact (`/contact`)
  - **Informations légales**: Mentions légales (`/mentions-legales`), CGV
    (`/cgv`)

## Footer

Add a third link, "Plan du site", to the existing "Mentions légales" column
in `components/Footer/Footer.js`, below "Mentions légales" and "CGV".

## i18n

- Add `pathnames["/plan-du-site"]` entry to `i18n/navigation.js`.
- Add translation keys to `messages/fr.json` and `messages/en.json`:
  - A new `sitemap` namespace: `title`, `sectionMain`, `sectionLegal`.
  - Footer link label: `footer.sitemap`.
  - Link labels for the page itself reuse existing `common.*` keys (home,
    explore, whoIsHeidi, services, contact) and `footer.legal` /
    `footer.terms`.

## Out of scope

- No XML `/sitemap.xml` — this is a human-facing HTML page, not an SEO
  sitemap file.
- No listing of individual prestations.

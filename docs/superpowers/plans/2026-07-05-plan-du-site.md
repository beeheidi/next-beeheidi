# Plan du site (sitemap page) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Plan du site" page listing the site's static pages, linked from the footer.

**Architecture:** A new locale-aware route (`/plan-du-site` fr, `/sitemap` en) rendered by a server component that mirrors the existing `mentions-legales` page shape (`TopImage` + `PageTitle` + content). The footer gets one more link in its existing "Mentions légales" column. All new copy goes through the existing `messages/{locale}.json` + `i18n/navigation.js` pathname-mapping mechanism already used by every other page.

**Tech Stack:** Next.js App Router (server components), `next-intl` for i18n, Tailwind CSS. No test framework exists in this repo (`npm run lint` and `npm run build` are the available verification commands) — verification steps use those plus `curl` against the local dev server instead of unit tests.

## Global Constraints

- Static pages only in the sitemap listing — no individual prestation pages (spec: Scope section).
- Route must follow the existing per-locale pathname convention in `i18n/navigation.js` (e.g. `mentions-legales` → `legal-notice`): fr `/plan-du-site`, en `/sitemap`.
- Sitemap link goes inside the existing "Mentions légales" footer column, as a third `<li>` after "CGV" (per user's approved footer placement choice).
- No XML `/sitemap.xml` — this is a human-facing HTML page only.
- `/galerie` has already been deleted in a prior step (not part of this plan's tasks).

---

### Task 1: Route mapping and translation keys

**Files:**
- Modify: `i18n/navigation.js` (add one `pathnames` entry)
- Modify: `messages/fr.json:223` (footer object), `messages/fr.json:397-398` (end of file)
- Modify: `messages/en.json:223` (footer object), `messages/en.json:397-398` (end of file)

**Interfaces:**
- Produces: `pathnames["/plan-du-site"]` resolvable via `getTranslatedPathname("/plan-du-site", locale)` from `@/i18n/navigation`.
- Produces: translation keys `footer.sitemap`, `sitemap.title`, `sitemap.sectionMain`, `sitemap.sectionLegal` in both locale files, readable via `t.footer.sitemap` / `t.sitemap.title` / etc. after `const t = await import(`../../../messages/${locale}.json`)`.

- [ ] **Step 1: Confirm the route doesn't exist yet (red)**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/fr/plan-du-site`
Expected: `404` (dev server must already be running on port 3000; if not, run `npm run dev` in the background first)

- [ ] **Step 2: Add the pathname mapping**

In `i18n/navigation.js`, add a new entry to the `pathnames` object, right after the `"/mentions-legales"` entry:

```js
  "/mentions-legales": {
    fr: "/mentions-legales",
    en: "/legal-notice",
  },
  "/plan-du-site": {
    fr: "/plan-du-site",
    en: "/sitemap",
  },
};
```

(This replaces the existing closing `};` of the `pathnames` object — the new entry goes before it.)

- [ ] **Step 3: Add the footer link translation key**

In `messages/fr.json`, inside the `"footer"` object, add a `"sitemap"` key after `"terms"` (line 223):

```json
    "terms": "Conditions générales",
    "sitemap": "Plan du site",
```

In `messages/en.json`, same location:

```json
    "terms": "General Conditions",
    "sitemap": "Sitemap",
```

- [ ] **Step 4: Add the page's own translation namespace**

In `messages/fr.json`, the file currently ends with:

```json
    "linkToCGV": "Voir les Conditions Générales"
  }
}
```

Change it to:

```json
    "linkToCGV": "Voir les Conditions Générales"
  },
  "sitemap": {
    "title": "Plan du site",
    "sectionMain": "Navigation principale",
    "sectionLegal": "Informations légales"
  }
}
```

In `messages/en.json`, the file currently ends with:

```json
    "linkToCGV": "View Terms and Conditions"
  }
}
```

Change it to:

```json
    "linkToCGV": "View Terms and Conditions"
  },
  "sitemap": {
    "title": "Sitemap",
    "sectionMain": "Main navigation",
    "sectionLegal": "Legal information"
  }
}
```

- [ ] **Step 5: Verify both JSON files are still valid and lint passes**

Run:
```bash
node -e "JSON.parse(require('fs').readFileSync('messages/fr.json'))" && echo "fr OK"
node -e "JSON.parse(require('fs').readFileSync('messages/en.json'))" && echo "en OK"
npx eslint i18n/navigation.js
```
Expected: `fr OK`, `en OK`, no eslint output (no errors).

- [ ] **Step 6: Commit**

```bash
git add i18n/navigation.js messages/fr.json messages/en.json
git commit -m "$(cat <<'EOF'
Add plan-du-site route mapping and translation keys

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Sitemap page component

**Files:**
- Create: `app/[locale]/plan-du-site/page.js`

**Interfaces:**
- Consumes: `getTranslatedPathname(pathname, locale)` and `Link` from `@/i18n/navigation` (produced by Task 1); `t.common.home`, `t.common.explore`, `t.common.whoIsHeidi`, `t.common.services`, `t.common.contact`, `t.footer.legal`, `t.footer.terms`, `t.sitemap.title`, `t.sitemap.sectionMain`, `t.sitemap.sectionLegal` (all already existing or added in Task 1); `PageTitle` from `@/components/ui/PageTitle/PageTitle`; `TopImage` from `@/components/ui/TopImage/TopImage`.
- Produces: the route `/fr/plan-du-site` and `/en/sitemap`.

- [ ] **Step 1: Confirm the route still 404s before creating the file (red)**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/fr/plan-du-site`
Expected: `404`

- [ ] **Step 2: Create the page**

Create `app/[locale]/plan-du-site/page.js`:

```js
import PageTitle from "@/components/ui/PageTitle/PageTitle";
import TopImage from "@/components/ui/TopImage/TopImage";
import { Link, getTranslatedPathname } from "@/i18n/navigation";

export default async function SitemapPage({ params }) {
  const { locale } = await params;
  const t = await import(`../../../messages/${locale}.json`).then(
    (m) => m.default
  );

  const mainLinks = [
    { href: "/", label: t.common.home },
    {
      href: getTranslatedPathname("/explore", locale),
      label: t.common.explore,
    },
    {
      href: getTranslatedPathname("/qui-est-heidi", locale),
      label: t.common.whoIsHeidi,
    },
    {
      href: getTranslatedPathname("/services", locale),
      label: t.common.services,
    },
    {
      href: getTranslatedPathname("/contact", locale),
      label: t.common.contact,
    },
  ];

  const legalLinks = [
    {
      href: getTranslatedPathname("/mentions-legales", locale),
      label: t.footer.legal,
    },
    {
      href: getTranslatedPathname("/cgv", locale),
      label: t.footer.terms,
    },
  ];

  return (
    <main className="bg-background pt-24 pb-16 relative">
      <TopImage position="top-left" size="large" />
      <div className="max-w-laptop mx-auto px-6 relative z-10">
        <PageTitle title={t.sitemap.title} textMaxWidth="7xl" align="left" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {t.sitemap.sectionMain}
            </h2>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 leading-relaxed hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-light text-anthracite mb-4">
              {t.sitemap.sectionLegal}
            </h2>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-700 leading-relaxed hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify the route now resolves in both locales (green)**

Run:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/fr/plan-du-site
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/en/sitemap
```
Expected: `200` for both.

- [ ] **Step 4: Verify the expected content is present**

Run:
```bash
curl -s http://localhost:3000/fr/plan-du-site | grep -o "Navigation principale\|Informations légales\|Qui est Heidi" | sort -u
```
Expected output (three lines):
```
Informations légales
Navigation principale
Qui est Heidi
```

- [ ] **Step 5: Lint**

Run: `npx eslint "app/[locale]/plan-du-site/page.js"`
Expected: no output (no errors)

- [ ] **Step 6: Commit**

```bash
git add "app/[locale]/plan-du-site/page.js"
git commit -m "$(cat <<'EOF'
Add plan-du-site sitemap page

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: Footer link

**Files:**
- Modify: `components/Footer/Footer.js:96-118` (the "Mentions légales" column)

**Interfaces:**
- Consumes: `getTranslatedPathname("/plan-du-site", locale)` (Task 1); `tFooter("sitemap")` (Task 1); existing `locale` state and `tFooter` from `useTranslations("footer")` already present in `Footer.js`.

- [ ] **Step 1: Confirm the link is absent before the change (red)**

Run: `curl -s http://localhost:3000/fr | grep -c "plan-du-site"`
Expected: `0`

- [ ] **Step 2: Add the link**

In `components/Footer/Footer.js`, inside the "Mentions légales" column, add a third `<li>` after the CGV one:

```jsx
          {/* Mentions légales */}
          <div>
            <h3 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">
              {tFooter("legal")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={getTranslatedPathname("/mentions-legales", locale)}
                  className="text-gray-500 text-sm font-light hover:text-primary transition-colors duration-200"
                >
                  {tFooter("legal")}
                </Link>
              </li>
              <li>
                <Link
                  href={getTranslatedPathname("/cgv", locale)}
                  className="text-gray-500 text-sm font-light hover:text-primary transition-colors duration-200"
                >
                  {tFooter("terms")}
                </Link>
              </li>
              <li>
                <Link
                  href={getTranslatedPathname("/plan-du-site", locale)}
                  className="text-gray-500 text-sm font-light hover:text-primary transition-colors duration-200"
                >
                  {tFooter("sitemap")}
                </Link>
              </li>
            </ul>
          </div>
```

- [ ] **Step 3: Verify the link now appears on the homepage (green)**

Run: `curl -s http://localhost:3000/fr | grep -o 'href="/fr/plan-du-site"' | head -1`
Expected: `href="/fr/plan-du-site"`

- [ ] **Step 4: Lint**

Run: `npx eslint components/Footer/Footer.js`
Expected: no output (no errors)

- [ ] **Step 5: Commit**

```bash
git add components/Footer/Footer.js
git commit -m "$(cat <<'EOF'
Link plan-du-site page from the footer

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Full verification

**Files:** none (verification only)

**Interfaces:** none

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build completes successfully, and the route listing includes `/[locale]/plan-du-site` alongside the other static routes (e.g. `/fr/plan-du-site`, `/en/sitemap` in the prerendered paths).

- [ ] **Step 2: Manual check in both locales**

With `npm run dev` running, fetch each locale's homepage and sitemap page, confirming 200s and the translated title:

```bash
curl -s -o /dev/null -w "fr home: %{http_code}\n" http://localhost:3000/fr
curl -s -o /dev/null -w "fr sitemap: %{http_code}\n" http://localhost:3000/fr/plan-du-site
curl -s -o /dev/null -w "en sitemap: %{http_code}\n" http://localhost:3000/en/sitemap
curl -s http://localhost:3000/en/sitemap | grep -o "Main navigation\|Legal information"
```
Expected: all `200`, and both English section titles printed.

- [ ] **Step 3: Confirm no stray references to the deleted `/galerie` route were reintroduced**

Run: `grep -rln "galerie" --include="*.js" app components 2>/dev/null`
Expected: no output.

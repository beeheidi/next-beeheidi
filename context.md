# Beeheidi — Contexte & TODO

Site vitrine de Beeheidi (Sàrl, Valais), société d'expériences outdoor (randonnées, team building, safaris gourmands en altitude). Stack : Next.js 16 App Router, React 19, Tailwind 4, Sanity v4, next-intl (FR/EN), GSAP, Swiper.

---

## Bugs critiques

### ~~1. Middleware i18n inactif~~ ✅ (fausse alerte)
- Next.js 16 utilise `proxy.js` comme convention (et non `middleware.js`). Le fichier était déjà correct.

### 2. Formulaire de contact ne fait rien
- **Fichier** : `components/ui/ContactForm/ContactForm.js:52`
- **Problème** : Le submit simule un envoi (`setTimeout`) mais n'appelle aucune API. Les messages partent dans le vide.
- **Fix** : créer une API route `app/api/contact/route.js` + intégrer un service email (Resend recommandé)

### 3. Site invisible pour les moteurs de recherche
- **Fichier** : `app/[locale]/layout.js:32`
- **Problème** : `robots: "noindex, nofollow"` bloque tout indexing Google.
- **Fix** : supprimer la ligne avant mise en prod + ajouter `generateMetadata` par page avec titre, description, og:image

---

## Bugs secondaires

### 4. i18n inconsistant (2 pages)
- **Fichiers** : `app/[locale]/services/page.js`, `app/[locale]/contact/page.js`
- **Problème** : importent les messages via `await import('../../../messages/${locale}.json')` au lieu de `getTranslations()` de next-intl.
- **Fix** : remplacer par `getTranslations({ locale })` comme dans `app/[locale]/page.js`

### 5. Détection homepage fragile dans le Header
- **Fichier** : `components/Header/Header.js:18`
- **Problème** : `pathname?.endsWith("/")` matche `/services/`, `/contact/` etc. en plus de la homepage.
- **Fix** : `const isHomePage = pathname === "/"` (next-intl's `usePathname` retourne le path sans préfixe de locale)

### 6. Liens non localisés dans la page Services
- **Fichier** : `app/[locale]/services/page.js`
- **Problème** : `href="/contact"` et `href="/services"` utilisent `Link` de Next.js au lieu du `Link` de `@/i18n/navigation` — risque de mauvaise locale dans l'URL.
- **Fix** : importer `Link` depuis `@/i18n/navigation`

---

## Améliorations

### 7. Overfetching GROQ
- **Fichier** : `lib/sanity.queries.js`
- **Problème** : chaque requête fetche les deux langues de chaque champ (`"titleFr": title.fr, "titleEn": title.en`) alors qu'une seule locale est utilisée par requête.
- **Fix** : ne projeter que la locale active (supprimer les champs `*Fr` / `*En` redondants)

### 8. Contenu statique non éditable via Sanity
- **Fichiers** : `components/Hero/Hero.js`, `app/[locale]/page.js:22-55`
- **Problème** : les slides du Hero et les 6 services de la homepage sont hardcodés — toute modif nécessite un redéploiement.
- **Fix** : créer des documents Sanity `heroSlide` et `service` + requêtes GROQ correspondantes

---

## Ordre de priorité

| # | Tâche | Effort | Impact |
|---|---|---|---|
| 1 | ~~Middleware i18n — fausse alerte, `proxy.js` est correct en Next.js 16~~ ✅ | — | — |
| 2 | Implémenter envoi email formulaire contact | Moyen | Critique |
| 3 | Supprimer noindex + SEO metadata par page | Faible | Critique (prod) |
| 4 | Uniformiser i18n avec `getTranslations` | Faible | Moyen |
| 5 | Corriger détection homepage Header | Très faible | Faible |
| 6 | Corriger liens localisés dans Services | Très faible | Faible |
| 7 | Alléger requêtes GROQ | Faible | Moyen |
| 8 | Hero + Services dans Sanity | Élevé | Moyen |

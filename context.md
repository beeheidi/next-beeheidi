# Beeheidi — Contexte & TODO

Site vitrine de Beeheidi (Sàrl, Valais), société d'expériences outdoor (randonnées, team building, safaris gourmands en altitude). Stack : Next.js 16 App Router, React 19, Tailwind 4, Sanity v4, next-intl (FR/EN), GSAP, Swiper.

---

## Modifications PDF — branche `pdf-modifications`

### ✅ Tout fait

**Design global**
- Couleur `#404040` anthracite → token Tailwind `text-anthracite`
- Font Poppins ajoutée (300/400/500/600/700), appliquée via `--font-poppins` sur le `body`
- `PageTitle` : prop `align` ajoutée (center / left / right)

**Header / Navigation**
- "Explore" → "Expériences", "Services" → "Services partenaires" (FR + EN)
- Burger menu : panneau latéral droit (w-80 lg:w-96), overlay semi-opaque, Poppins léger anthracite
- `isHomePage` corrigé (`pathname === "/"`)

**Footer**
- Colonne Contact (Beeheidi Sàrl, tél, email) à la place de Navigation
- Instagram uniquement, "Conditions générales", lien Studio discret `✦`

**Hero**
- Logo + baseline centrés, titre `font-light`
- Texte bas → "Nos expériences coups de coeur" `font-light`, design original conservé

**Page d'accueil**
- Ordre : Hero → Qui sommes-nous → Les incontournables → Espace partenaires
- WhoAreWe : card compacte (logo doré, "Expériences d'exception - Alpes suisses", icônes tél/email)
- "Les incontournables" : titre `font-light`, filigrane Heidi en haut derrière le titre
- "Espace partenaires" : fond blanc, titre `font-light text-anthracite`

**Page Expériences (`/explore`)**
- Titre : "Le Valais avec Heidi", subtitle : "Expériences alpines d'exception"
- Alignement à droite, `getTranslations`

**Page Qui est Heidi (`/qui-est-heidi`)**
- Sandra (fondatrice) + Stéphane (guide), textes biographiques avec `<br/>`
- PageTitle aligné à droite, `imageLeft=true` pour les deux blocs
- Photos à remplacer quand fournies par la cliente

**Page Services partenaires (`/services`)**
- Vignettes : texte gauche + image droite (plus d'alternance)
- Navigation icônes : 6 cards avec icône Lucide + `rotate-12` au hover
- `getTranslations`, `Link` depuis `@/i18n/navigation`

**Page Contact (`/contact`)**
- Champs ajoutés : Prénom* + Téléphone (layout 2 colonnes)
- `getTranslations`

**Page Galerie (`/galerie`)**
- Page créée, grille masonry 2→3→4 colonnes
- Images collées, bordure blanche fine (`border border-white`), sans titre
- À ajouter à la navigation si souhaité

**Sanity schema (`schemas/prestation.js`)**
- `durationCategory` : dropdown 5 options (Moins de 3h / Demi-journée / Journée complète / Plusieurs jours / Sur mesure)
- `priceText` : texte libre bilingue FR/EN + `amount` optionnel pour tri
- `activityReference` : référence texte libre (ex: BH-001)
- Queries simplifiées (plus d'overfetching `*Fr`/`*En`)
- `PrestationCard` : affiche `priceText` directement

---

## 🔲 À faire

### Contenu / Photos
- Nouvelle photo hero (fleurs cerisier) — à fournir par la cliente
- Photos Sandra + Stéphane — à fournir par la cliente (remplacer dans `/qui-est-heidi`)

### Fonctionnel
- **Formulaire contact** : créer `app/api/contact/route.js` + connecter Resend pour l'envoi réel
- **Galerie** : décider si la page apparaît dans la navigation

### Avant mise en production
- **SEO** : supprimer `robots: "noindex, nofollow"` dans `app/[locale]/layout.js:32`
- Ajouter `generateMetadata` par page si besoin

---

## 🔧 Micro-corrections (plus tard)

- Ajustement fin du positionnement du filigrane Heidi sur la section "Les incontournables"
- Texte définitif "Qui est Heidi" (Sandra + Stéphane) à valider avec la cliente
- Mobile : vérifier l'affichage des vignettes Services sur petits écrans

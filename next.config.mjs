import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

// Anciennes fiches activité (beeheidi.ch/fr/{slug}-{id}.html) -> nouvelle page /fr/explore/{slug}
// Le slug Sanity correspond à l'ancien slug sans le suffixe -{id}
const legacyPrestationSlugs = [
  "aujourd-tartes-fruits",
  "bike-avec-emily",
  "bisse-barrage-rawyl",
  "bisse-varen-reveillez-tous-sens",
  "brunch-nature-pied-christ-roi",
  "cascades-paturages-crans-montana",
  "coucher-soleil-fondue-sommet",
  "coucher-soleil-pointe-bellevue",
  "escapade-chez-heidi",
  "escapade-yoga-randonnee",
  "footing-teatime-panoramique",
  "herbier-tisanes-decoctions-cataplasme",
  "immersion-totale-dans-nature",
  "lever-soleil-chocolate",
  "lever-soleil-tartine-miel-sommet",
  "mais-passe-loup-aminona",
  "marche-raquettes-fondue-savoureuse",
  "marmotte-elle-emballe-chocolat",
  "petites-plantes-dans-plats",
  "plantes-sauvages-fraicheur-bisse",
  "plongez-dans-monde-nuit",
  "raclette-alpine-chalet",
  "randonnee-estivale-fondue-savoureuse-pleine",
  "randonnee-nocturne-caramel-maison",
  "randonnee-pays-helvetes",
  "saveurs-terroir-pied-christ-roi",
  "soiree-romantique-haute-nendaz",
  "traces-mythique-sierre-zinal",
  "trail-gourmand-saveurs-valais",
  "vache-fleur-gout-lait",
  "zinal-village-glacier",
];

const legacyPrestationRedirects = legacyPrestationSlugs.map((slug) => ({
  source: `/fr/${slug}-:id(\\d+).html`,
  destination: `/fr/explore/${slug}`,
  permanent: true,
}));

// Anciennes pages structurelles -> équivalent sur le nouveau site
const legacyStructuralRedirects = [
  { source: "/fr/homepage.html", destination: "/fr" },
  { source: "/fr/accueil-77.html", destination: "/fr" },
  { source: "/fr/contact-15.html", destination: "/fr/contact" },
  { source: "/fr/services-1033.html", destination: "/fr/services" },
  { source: "/fr/heidi-dans-tout-cela-12.html", destination: "/fr/qui-est-heidi" },
  { source: "/fr/equipe-heidi-1361.html", destination: "/fr/qui-est-heidi" },
  { source: "/fr/propos-heidi-1360.html", destination: "/fr/qui-est-heidi" },
  { source: "/fr/conditions-generales-95.html", destination: "/fr/cgv" },
  { source: "/fr/charte", destination: "/fr/cgv" },
  { source: "/fr/homepage/protectiondonnees-view-1.html", destination: "/fr/mentions-legales" },
  { source: "/fr/homepage/sitemap-view-1.html", destination: "/fr/plan-du-site" },
  // Anciennes rubriques (run / explore / enjoy / behealthy) fusionnées dans /explore
  { source: "/fr/explore-with-heidi-2.html", destination: "/fr/explore" },
  { source: "/fr/enjoy-with-heidi-93.html", destination: "/fr/explore" },
  { source: "/fr/enjoy", destination: "/fr/explore" },
  { source: "/fr/healthy-with-heidi-94.html", destination: "/fr/explore" },
  { source: "/fr/behealthy", destination: "/fr/explore" },
  { source: "/fr/with-heidi-experience-trail-running-valais-98.html", destination: "/fr/explore" },
  { source: "/fr/run", destination: "/fr/explore" },
  { source: "/fr/rando-montagne-6.html", destination: "/fr/explore" },
].map((r) => ({ ...r, permanent: true }));

// Pages sans équivalent sur le nouveau site (boutique, agenda, presse, activités
// retirées de Sanity...) -> page d'accueil, dans la langue d'origine si connue
const legacyFallbackRedirects = [
  "/fr/agenda-17.html",
  "/fr/matin-26.html",
  "/fr/articles-vente-1340.html",
  "/fr/casquette-explore-with-heidi-1351.html",
  "/fr/bandeau-compressport-1341.html",
  "/fr/beeheidi-beebeen-finisher-carton-pces-1352.html",
  "/fr/pack-beeheidi-1353.html",
  "/fr/t-shirt-femme-compressport-1349.html",
  "/fr/t-shirt-homme-compressport-1342.html",
  "/fr/bons-cadeaux-1333.html",
  "/fr/espace-presse-388.html",
  "/fr/organisez-votre-evenement-avec-beeheidi-103.html",
  "/fr/proposez-votre-evenement-170.html",
  "/fr/after-work-trail-saveur-sapin-montagnes-1018.html",
  "/fr/raclette-tartes-myrtilles-390.html",
  "/fr/trail-cocktail-1209.html",
  "/fr/decouvrez-aussi-patrimoine-vaudois-1249.html",
  "/fr/vivez-experience-inoubliable-dans-alpes-suisses-389.html",
].map((source) => ({ source, destination: "/fr", permanent: true }));

const legacyFallbackRedirectsNoLocale = [
  "/boutique",
  "/calendrier",
  "/news",
  "/newsletter",
  "/presse",
  "/welcome",
  "/login.php",
].map((source) => ({ source, destination: "/", permanent: true }));

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  async redirects() {
    return [
      ...legacyPrestationRedirects,
      ...legacyStructuralRedirects,
      ...legacyFallbackRedirects,
      ...legacyFallbackRedirectsNoLocale,
    ];
  },
};

export default withNextIntl(nextConfig);

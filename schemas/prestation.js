import {
  localizedString,
  localizedHybridContent,
  imageField,
  galleryImageType,
  durationOptions,
} from "./fields";

export default {
  name: "prestation",
  title: "Activité",
  type: "document",
  groups: [
    { name: "content", title: "Contenu de la page", default: true },
    { name: "card", title: "Vignette" },
    { name: "internal", title: "Utilisation interne" },
    { name: "legacy", title: "Ancien format (lecture seule)" },
  ],
  fieldsets: [
    { name: "pageText", title: "Textes de la page", options: { collapsible: true } },
    { name: "cardMedia", title: "Images vignette & bandeau", options: { collapsible: true } },
    { name: "cardMeta", title: "Infos vignette", options: { collapsible: true } },
    { name: "internalFlags", title: "Publication", options: { collapsible: true } },
  ],
  fields: [
    // ─── Contenu de la page ───────────────────────────────────────────────
    localizedString("title", "Titre", {
      group: "content",
      fieldset: "pageText",
      required: true,
      validation: (Rule) => Rule.required(),
    }),
    localizedString("subtitle", "Sous-titre", {
      group: "content",
      fieldset: "pageText",
      description: "Affiché sous le titre sur la page activité",
    }),
    localizedHybridContent("description", "Descriptif", {
      group: "content",
      fieldset: "pageText",
    }),
    localizedHybridContent("technicalDetailsContent", "Détails techniques", {
      group: "content",
      fieldset: "pageText",
    }),
    localizedHybridContent("equipment", "Matériel à prévoir", {
      group: "content",
      fieldset: "pageText",
    }),
    localizedHybridContent("practicalInfo", "Infos complémentaires", {
      group: "content",
      fieldset: "pageText",
    }),
    {
      name: "priceText",
      title: "Prix",
      type: "object",
      group: "content",
      fieldset: "pageText",
      description:
        "Le montant « à partir de » s'affiche sur la vignette. La grille tarifaire complète s'affiche sur la page activité.",
      fields: [
        {
          name: "amount",
          title: "Prix à partir de (vignette)",
          type: "number",
          description: "Ex: 600 — affiché sur la carte comme « Dès 600 CHF »",
        },
        {
          name: "currency",
          title: "Devise",
          type: "string",
          initialValue: "CHF",
        },
        {
          name: "fr",
          title: "Grille tarifaire (Français — éditeur visuel)",
          type: "blockContent",
        },
        {
          name: "en",
          title: "Grille tarifaire (English — visual editor)",
          type: "blockContent",
        },
        {
          name: "frHtml",
          title: "Grille tarifaire (Français — HTML brut)",
          type: "text",
          rows: 8,
          description:
            "HTML autorisé. Si rempli, remplace l'éditeur visuel sur la page activité.",
        },
        {
          name: "enHtml",
          title: "Grille tarifaire (English — raw HTML)",
          type: "text",
          rows: 8,
        },
      ],
    },
    localizedHybridContent("included", "Prestations incluses", {
      group: "content",
      fieldset: "pageText",
    }),

    // ─── Vignette ─────────────────────────────────────────────────────────
    imageField("thumbnailImage", "Image vignette", {
      group: "card",
      fieldset: "cardMedia",
      description: "Image affichée sur les cartes (liste d'activités, accueil)",
    }),
    imageField("bannerImage", "Image bandeau", {
      group: "card",
      fieldset: "cardMedia",
      description: "Grande image en haut de la page activité",
    }),
    {
      name: "gallery",
      title: "Galerie d'images",
      type: "array",
      group: "card",
      fieldset: "cardMedia",
      description:
        "Vous pouvez cocher « Utiliser comme vignette » ou « Utiliser comme bandeau » sur une image de la galerie à la place des uploads dédiés.",
      of: [galleryImageType],
    },
    {
      name: "durationCategory",
      title: "Durée",
      type: "string",
      group: "card",
      fieldset: "cardMeta",
      options: {
        list: durationOptions,
        layout: "dropdown",
      },
    },
    localizedString("shortDescription", "Accroche vignette (optionnel)", {
      group: "card",
      fieldset: "cardMeta",
      description:
        "Texte court sous le titre sur la carte. Si vide, le sous-titre de la page est utilisé.",
    }),

    // ─── Utilisation interne ──────────────────────────────────────────────
    {
      name: "slug",
      title: "Slug (URL)",
      type: "object",
      group: "internal",
      description: "URL de la page : /fr/explore/[slug] et /en/explore/[slug]",
      fields: [
        {
          name: "fr",
          title: "Slug (Français)",
          type: "slug",
          options: { source: "title.fr", maxLength: 96 },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "Slug (English)",
          type: "slug",
          options: { source: "title.en", maxLength: 96 },
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "activityReference",
      title: "Référence activité",
      type: "string",
      group: "internal",
      description: "Code interne (ex: BH-001)",
    },
    {
      name: "active",
      title: "Activer / désactiver",
      type: "boolean",
      group: "internal",
      fieldset: "internalFlags",
      description: "Décochez pour masquer l'activité sur le site",
      initialValue: true,
    },
    {
      name: "featured",
      title: "Coup de cœur",
      type: "boolean",
      group: "internal",
      fieldset: "internalFlags",
      description: "Afficher en avant sur la page d'accueil",
      initialValue: false,
    },
    {
      name: "activityDate",
      title: "Date (tri & filtres)",
      type: "date",
      group: "internal",
      fieldset: "internalFlags",
      description:
        "Date de référence pour trier et filtrer les activités dans Sanity et sur le site. Si vide, la date de publication est utilisée.",
    },
    {
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      group: "internal",
      fieldset: "internalFlags",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "category",
      title: "Catégorie (filtre)",
      type: "object",
      group: "internal",
      fields: [
        {
          name: "fr",
          title: "Catégorie (Français)",
          type: "string",
          options: {
            list: [
              { title: "Randonnée", value: "randonnee" },
              { title: "Déjeuner en altitude", value: "dejeuner-altitude" },
              { title: "Escapade culinaire", value: "escapade-culinaire" },
              { title: "Aventure", value: "aventure" },
              { title: "Détente", value: "detente" },
              { title: "Autre", value: "autre" },
            ],
            layout: "dropdown",
          },
        },
        {
          name: "en",
          title: "Catégorie (English)",
          type: "string",
          options: {
            list: [
              { title: "Hiking", value: "randonnee" },
              { title: "Mountain lunch", value: "dejeuner-altitude" },
              { title: "Culinary escape", value: "escapade-culinaire" },
              { title: "Adventure", value: "aventure" },
              { title: "Relaxation", value: "detente" },
              { title: "Other", value: "autre" },
            ],
            layout: "dropdown",
          },
        },
      ],
    },
    {
      name: "region",
      title: "Région",
      type: "string",
      group: "internal",
      options: {
        list: [
          { title: "Chablais", value: "chablais" },
          { title: "Haut-Valais", value: "haut-valais" },
          { title: "Martigny", value: "martigny" },
          { title: "Sion & Sierre", value: "sion-sierre" },
          { title: "Crans-Montana", value: "crans-montana" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "season",
      title: "Saison",
      type: "array",
      group: "internal",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Printemps", value: "printemps" },
          { title: "Été", value: "ete" },
          { title: "Automne", value: "automne" },
          { title: "Hiver", value: "hiver" },
        ],
      },
    },
    {
      name: "availabilityPeriod",
      title: "Période de disponibilité",
      type: "object",
      group: "internal",
      fields: [
        { name: "fr", title: "Français", type: "string" },
        { name: "en", title: "English", type: "string" },
      ],
    },

    // ─── Ancien format (données existantes, masqué) ───────────────────────
    {
      name: "mainImage",
      title: "[Ancien] Image principale",
      type: "image",
      group: "legacy",
      hidden: ({ document }) => !document?.mainImage,
      readOnly: true,
      options: { hotspot: true },
    },
    {
      name: "price",
      title: "[Ancien] Grille tarifaire",
      type: "array",
      group: "legacy",
      hidden: ({ document }) => !document?.price?.length,
      readOnly: true,
      of: [
        {
          type: "object",
          fields: [
            { name: "groupSize", title: "Taille groupe", type: "object", fields: [{ name: "fr", type: "string" }, { name: "en", type: "string" }] },
            { name: "amount", title: "Montant", type: "number" },
            { name: "currency", title: "Devise", type: "string" },
          ],
        },
      ],
    },
    {
      name: "duration",
      title: "[Ancien] Durée détaillée",
      type: "object",
      group: "legacy",
      hidden: ({ document }) => !document?.duration,
      readOnly: true,
      fields: [
        {
          name: "total",
          type: "object",
          fields: [{ name: "fr", type: "string" }, { name: "en", type: "string" }],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title.fr",
      subtitle: "durationCategory",
      media: "thumbnailImage",
      ref: "activityReference",
      fallbackMedia: "mainImage",
      active: "active",
      featured: "featured",
      activityDate: "activityDate",
      publishedAt: "publishedAt",
    },
    prepare({ title, subtitle, media, ref, fallbackMedia, active, featured, activityDate, publishedAt }) {
      const durationLabels = Object.fromEntries(
        durationOptions.map((o) => [o.value, o.title])
      );
      const flags = [!active ? "masquée" : null, featured ? "♥" : null]
        .filter(Boolean)
        .join(" · ");

      const dateLabel = activityDate
        ? new Date(activityDate).toLocaleDateString("fr-CH")
        : publishedAt
          ? new Date(publishedAt).toLocaleDateString("fr-CH")
          : null;

      return {
        title: ref ? `[${ref}] ${title || "Sans titre"}` : title || "Sans titre",
        subtitle: [dateLabel, durationLabels[subtitle], flags].filter(Boolean).join(" · ") || "Activité",
        media: media || fallbackMedia,
      };
    },
  },
  orderings: [
    {
      title: "Date, récent",
      name: "activityDateDesc",
      by: [{ field: "activityDate", direction: "desc" }],
    },
    {
      title: "Date de publication, récent",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Prix croissant",
      name: "priceAsc",
      by: [{ field: "priceText.amount", direction: "asc" }],
    },
    {
      title: "Titre A-Z",
      name: "titleAsc",
      by: [{ field: "title.fr", direction: "asc" }],
    },
  ],
};

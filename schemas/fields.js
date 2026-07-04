const htmlHint =
  "HTML autorisé : <p>, <br>, <strong>, <em>, <ul>, <li>. Si ce champ est rempli, il remplace l'éditeur visuel sur le site. Texte normal en Poppins léger, gras en Poppins moyen.";

export const localizedString = (name, title, options = {}) => ({
  name,
  title,
  type: "object",
  group: options.group,
  fieldset: options.fieldset,
  description: options.description,
  validation: options.validation,
  fields: [
    {
      name: "fr",
      title: "Français",
      type: "string",
      validation: options.required ? (Rule) => Rule.required() : undefined,
    },
    {
      name: "en",
      title: "English",
      type: "string",
      validation: options.required ? (Rule) => Rule.required() : undefined,
    },
  ],
});

/** Éditeur visuel Sanity + champ HTML brut optionnel (HTML prioritaire sur le site) */
export const localizedHybridContent = (name, title, options = {}) => ({
  name,
  title,
  type: "object",
  group: options.group,
  fieldset: options.fieldset,
  description:
    options.description ||
    "Éditeur visuel ou HTML brut. Si le champ HTML est rempli, c'est lui qui s'affiche sur le site.",
  validation: options.validation,
  fields: [
    {
      name: "fr",
      title: "Français (éditeur visuel)",
      type: "blockContent",
    },
    {
      name: "en",
      title: "English (visual editor)",
      type: "blockContent",
    },
    {
      name: "frHtml",
      title: "Français (HTML brut — optionnel)",
      type: "text",
      rows: options.rows || 10,
      description: htmlHint,
    },
    {
      name: "enHtml",
      title: "English (raw HTML — optional)",
      type: "text",
      rows: options.rows || 10,
      description:
        "HTML allowed: <p>, <br>, <strong>, <em>, <ul>, <li>. If filled, overrides the visual editor on the site.",
    },
  ],
});

/** @deprecated Utiliser localizedHybridContent */
export const localizedBlockContent = localizedHybridContent;

export const localizedText = (name, title, options = {}) => ({
  name,
  title,
  type: "object",
  group: options.group,
  fieldset: options.fieldset,
  description: options.description,
  validation: options.validation,
  fields: [
    {
      name: "fr",
      title: "Français",
      type: "text",
      rows: options.rows || 6,
    },
    {
      name: "en",
      title: "English",
      type: "text",
      rows: options.rows || 6,
    },
  ],
});

export const imageField = (name, title, options = {}) => ({
  name,
  title,
  type: "image",
  group: options.group,
  fieldset: options.fieldset,
  description: options.description,
  options: { hotspot: true },
  validation: options.validation,
  fields: [
    {
      name: "alt",
      title: "Texte alternatif",
      type: "string",
      description: "Important pour le SEO et l'accessibilité",
    },
  ],
});

export const galleryImageType = {
  type: "image",
  options: { hotspot: true },
  fields: [
    { name: "alt", title: "Texte alternatif", type: "string" },
    {
      name: "useAsThumbnail",
      title: "Utiliser comme vignette",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "useAsBanner",
      title: "Utiliser comme bandeau",
      type: "boolean",
      initialValue: false,
    },
  ],
};

export const durationOptions = [
  { title: "Moins de 3 heures", value: "moins-3h" },
  { title: "Demi-journée", value: "demi-journee" },
  { title: "Journée complète", value: "journee" },
  { title: "Plusieurs jours", value: "plusieurs-jours" },
  { title: "Sur mesure", value: "sur-mesure" },
];

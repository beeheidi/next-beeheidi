export default {
  name: "prestation",
  title: "Prestation",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Titre (Français)",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
        },
        {
          name: "en",
          title: "Titre (English)",
          type: "string",
          validation: (Rule) => Rule.required().max(100),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "object",
      description: "Slug unique pour chaque langue. Utilisé dans les URLs : /fr/explore/[slug.fr] et /en/explore/[slug.en]",
      fields: [
        {
          name: "fr",
          title: "Slug (Français)",
          type: "slug",
          options: {
            source: "title.fr",
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "Slug (English)",
      type: "slug",
      options: {
            source: "title.en",
        maxLength: 96,
      },
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Catégorie",
      type: "object",
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
        layout: "radio",
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
            layout: "radio",
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      title: "Description courte",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Description courte (Français)",
      type: "text",
      rows: 3,
      description: "Description affichée dans les listes (max 200 caractères)",
      validation: (Rule) => Rule.required().max(200),
        },
        {
          name: "en",
          title: "Description courte (English)",
          type: "text",
          rows: 3,
          description: "Short description displayed in lists (max 200 characters)",
          validation: (Rule) => Rule.required().max(200),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description complète",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Description complète (Français)",
      type: "array",
      of: [
        {
          type: "block",
            },
          ],
          validation: (Rule) => Rule.required(),
        },
        {
          name: "en",
          title: "Description complète (English)",
          type: "array",
          of: [
            {
              type: "block",
            },
          ],
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mainImage",
      title: "Image principale",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          description: "Important pour le SEO et l'accessibilité",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "gallery",
      title: "Galerie d'images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "price",
      title: "Prix",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "groupSize",
              title: "Taille du groupe",
              type: "object",
              fields: [
                {
                  name: "fr",
                  title: "Taille du groupe (Français)",
              type: "string",
              description: 'Ex: "1 à 2 personnes", "3 à 4 personnes"',
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "en",
                  title: "Group size (English)",
                  type: "string",
                  description: 'Ex: "1 to 2 people", "3 to 4 people"',
                  validation: (Rule) => Rule.required(),
                },
              ],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "amount",
              title: "Montant",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: "currency",
              title: "Devise",
              type: "string",
              options: {
                list: [
                  { title: "CHF", value: "CHF" },
                  { title: "EUR", value: "EUR" },
                ],
              },
              initialValue: "CHF",
            },
          ],
          preview: {
            select: {
              groupSize: "groupSize.fr",
              amount: "amount",
              currency: "currency",
            },
            prepare({ groupSize, amount, currency }) {
              return {
                title: `${groupSize || "N/A"}`,
                subtitle: `${amount} ${currency}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "duration",
      title: "Durée",
      type: "object",
      fields: [
        {
          name: "category",
          title: "Catégorie de durée",
          type: "object",
          fields: [
            {
              name: "fr",
              title: "Catégorie (Français)",
          type: "string",
          options: {
            list: [
              { title: "Moins de 3 heures", value: "moins-3h" },
              { title: "Demi-journée", value: "demi-journee" },
              { title: "Journée", value: "journee" },
              { title: "Plusieurs jours", value: "plusieurs-jours" },
            ],
          },
            },
            {
              name: "en",
              title: "Category (English)",
              type: "string",
              options: {
                list: [
                  { title: "Less than 3 hours", value: "moins-3h" },
                  { title: "Half day", value: "demi-journee" },
                  { title: "Full day", value: "journee" },
                  { title: "Several days", value: "plusieurs-jours" },
                ],
              },
            },
          ],
        },
        {
          name: "total",
          title: "Durée totale",
          type: "object",
          fields: [
            {
              name: "fr",
              title: "Durée totale (Français)",
          type: "string",
          description: 'Ex: "5h30 (dont 2h45 de montée)"',
            },
            {
              name: "en",
              title: "Total duration (English)",
              type: "string",
              description: 'Ex: "5h30 (including 2h45 of ascent)"',
            },
          ],
        },
        {
          name: "hours",
          title: "Heures",
          type: "number",
          validation: (Rule) => Rule.min(0).max(24),
        },
        {
          name: "days",
          title: "Jours",
          type: "number",
          validation: (Rule) => Rule.min(0),
        },
      ],
    },
    {
      name: "difficulty",
      title: "Difficulté",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Difficulté (Français)",
      type: "string",
      options: {
        list: [
          { title: "Facile", value: "facile" },
          { title: "Modérée", value: "moderee" },
          { title: "Difficile", value: "difficile" },
          { title: "Très difficile", value: "tres-difficile" },
        ],
      },
        },
        {
          name: "en",
          title: "Difficulté (English)",
          type: "string",
          options: {
            list: [
              { title: "Easy", value: "facile" },
              { title: "Moderate", value: "moderee" },
              { title: "Difficult", value: "difficile" },
              { title: "Very difficult", value: "tres-difficile" },
            ],
          },
        },
      ],
    },
    {
      name: "included",
      title: "Inclus dans la prestation",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Inclus (Français)",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste des éléments inclus (ex: repas, guide, matériel)",
        },
        {
          name: "en",
          title: "Included (English)",
          type: "array",
          of: [{ type: "string" }],
          description: "List of included items (e.g., meals, guide, equipment)",
        },
      ],
    },
    {
      name: "notIncluded",
      title: "Non inclus",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Non inclus (Français)",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste des éléments non inclus",
        },
        {
          name: "en",
          title: "Not included (English)",
          type: "array",
          of: [{ type: "string" }],
          description: "List of items not included",
        },
      ],
    },
    {
      name: "region",
      title: "Région",
      type: "string",
      options: {
        list: [
          { title: "Chablais", value: "chablais" },
          { title: "Haut-Valais", value: "haut-valais" },
          { title: "Martigny", value: "martigny" },
          { title: "Sion & Sierre", value: "sion-sierre" },
          { title: "Crans-Montana", value: "crans-montana" },
        ],
      },
    },
    {
      name: "season",
      title: "Saison",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Printemps", value: "printemps" },
          { title: "Été", value: "ete" },
          { title: "Automne", value: "automne" },
          { title: "Hiver", value: "hiver" },
        ],
      },
      description: "Saisons où cette prestation est disponible",
    },
    {
      name: "availabilityPeriod",
      title: "Période de disponibilité",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Période (Français)",
      type: "string",
      description: 'Ex: "de juin à fin septembre"',
        },
        {
          name: "en",
          title: "Period (English)",
          type: "string",
          description: 'Ex: "from June to end of September"',
        },
      ],
    },
    {
      name: "technicalDetails",
      title: "Détails techniques",
      type: "object",
      fields: [
        {
          name: "duration",
          title: "Durée détaillée",
          type: "object",
          fields: [
            {
              name: "fr",
              title: "Durée (Français)",
          type: "string",
          description: 'Ex: "5h30 (dont 2h45 de montée)"',
            },
            {
              name: "en",
              title: "Duration (English)",
              type: "string",
              description: 'Ex: "5h30 (including 2h45 of ascent)"',
            },
          ],
        },
        {
          name: "difficultyDescription",
          title: "Description de la difficulté",
          type: "object",
          fields: [
            {
              name: "fr",
              title: "Description (Français)",
          type: "text",
          description:
            'Ex: "Chemins faciles mais moyennement techniques sur les derniers mètres"',
            },
            {
              name: "en",
              title: "Description (English)",
              type: "text",
              description:
                'Ex: "Easy paths but moderately technical on the last meters"',
            },
          ],
        },
      ],
    },
    {
      name: "equipment",
      title: "Matériel à prévoir",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Matériel (Français)",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste du matériel nécessaire (chaussures, vêtements, etc.)",
        },
        {
          name: "en",
          title: "Equipment (English)",
          type: "array",
          of: [{ type: "string" }],
          description: "List of necessary equipment (shoes, clothing, etc.)",
        },
      ],
    },
    {
      name: "practicalInfo",
      title: "Informations complémentaires",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Informations (Français)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
            },
            {
              name: "value",
              title: "Valeur",
              type: "text",
            },
          ],
        },
      ],
      description:
        "Informations complémentaires (possibilité de raccourcir, etc.)",
        },
        {
          name: "en",
          title: "Information (English)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "label",
                  title: "Label",
                  type: "string",
                },
                {
                  name: "value",
                  title: "Value",
                  type: "text",
                },
              ],
            },
          ],
          description: "Additional information (possibility to shorten, etc.)",
        },
      ],
    },
    {
      name: "highlights",
      title: "Points forts",
      type: "object",
      fields: [
        {
          name: "fr",
          title: "Points forts (Français)",
      type: "array",
      of: [{ type: "string" }],
      description: "Points forts de la prestation (max 5)",
      validation: (Rule) => Rule.max(5),
        },
        {
          name: "en",
          title: "Highlights (English)",
          type: "array",
          of: [{ type: "string" }],
          description: "Service highlights (max 5)",
          validation: (Rule) => Rule.max(5),
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "featured",
      title: "Mise en avant",
      type: "boolean",
      description: "Afficher cette prestation en avant sur la page d'accueil",
      initialValue: false,
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Afficher cette prestation sur le site",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title.fr",
      subtitle: "category.fr",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      const categoryLabels = {
        randonnee: "Randonnée",
        "dejeuner-altitude": "Déjeuner en altitude",
        "escapade-culinaire": "Escapade culinaire",
        aventure: "Aventure",
        detente: "Détente",
        autre: "Autre",
      };
      return {
        title: title || "Sans titre",
        subtitle: categoryLabels[subtitle] || subtitle || "Sans catégorie",
        media,
      };
    },
  },
  orderings: [
    {
      title: "Date de publication, nouveau",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Date de publication, ancien",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Titre, A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
};

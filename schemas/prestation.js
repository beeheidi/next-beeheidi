export default {
  name: "prestation",
  title: "Prestation",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "category",
      title: "Catégorie",
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
      validation: (Rule) => Rule.required(),
    },
    {
      name: "shortDescription",
      title: "Description courte",
      type: "text",
      rows: 3,
      description: "Description affichée dans les listes (max 200 caractères)",
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: "description",
      title: "Description complète",
      type: "array",
      of: [
        {
          type: "block",
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
              type: "string",
              description: 'Ex: "1 à 2 personnes", "3 à 4 personnes"',
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
              groupSize: "groupSize",
              amount: "amount",
              currency: "currency",
            },
            prepare({ groupSize, amount, currency }) {
              return {
                title: `${groupSize}`,
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
          name: "total",
          title: "Durée totale",
          type: "string",
          description: 'Ex: "5h30 (dont 2h45 de montée)"',
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
      name: "included",
      title: "Inclus dans la prestation",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste des éléments inclus (ex: repas, guide, matériel)",
    },
    {
      name: "notIncluded",
      title: "Non inclus",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste des éléments non inclus",
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
      type: "string",
      description: 'Ex: "de juin à fin septembre"',
    },
    {
      name: "technicalDetails",
      title: "Détails techniques",
      type: "object",
      fields: [
        {
          name: "duration",
          title: "Durée détaillée",
          type: "string",
          description: 'Ex: "5h30 (dont 2h45 de montée)"',
        },
        {
          name: "difficultyDescription",
          title: "Description de la difficulté",
          type: "text",
          description:
            'Ex: "Chemins faciles mais moyennement techniques sur les derniers mètres"',
        },
      ],
    },
    {
      name: "equipment",
      title: "Matériel à prévoir",
      type: "array",
      of: [{ type: "string" }],
      description: "Liste du matériel nécessaire (chaussures, vêtements, etc.)",
    },
    {
      name: "practicalInfo",
      title: "Informations complémentaires",
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
      name: "highlights",
      title: "Points forts",
      type: "array",
      of: [{ type: "string" }],
      description: "Points forts de la prestation (max 5)",
      validation: (Rule) => Rule.max(5),
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
      title: "title",
      subtitle: "category",
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
        title,
        subtitle: categoryLabels[subtitle] || subtitle,
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

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Site Vitrine',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'nw16vt02',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: [
      // Ajoutez vos types de schéma ici
    ],
  },
})


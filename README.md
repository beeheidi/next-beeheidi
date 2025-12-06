# Site Vitrine avec Next.js et Sanity

Un site vitrine moderne créé avec Next.js, Sanity CMS et Tailwind CSS.

## 🚀 Technologies

- **Next.js 16** - Framework React
- **Sanity** - CMS headless
- **Tailwind CSS** - Framework CSS utilitaire
- **JavaScript** (sans TypeScript)

## 📦 Installation

1. Clonez le projet et installez les dépendances :

```bash
npm install
```

2. Configurez les variables d'environnement :

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=votre_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Pour obtenir votre `project_id` Sanity :
- Créez un projet sur [sanity.io](https://www.sanity.io)
- Ou utilisez un projet existant
- Le `project_id` se trouve dans votre dashboard Sanity

## 🏃 Démarrage

Lancez le serveur de développement :

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
next-beeheidi/
├── app/              # Pages et layouts Next.js
│   ├── layout.js     # Layout principal
│   └── page.js       # Page d'accueil
├── lib/              # Utilitaires
│   └── sanity.js     # Configuration Sanity
└── public/           # Fichiers statiques
```

## 🔧 Configuration Sanity

Le fichier `lib/sanity.js` contient la configuration du client Sanity. Vous pouvez l'utiliser pour récupérer des données depuis votre studio Sanity.

Exemple d'utilisation :

```javascript
import { client } from '@/lib/sanity'

const data = await client.fetch(`*[_type == "page"]`)
```

## 📝 Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run start` - Lance le serveur de production
- `npm run lint` - Lance ESLint

## 🎨 Personnalisation

- Modifiez `app/page.js` pour personnaliser la page d'accueil
- Les styles Tailwind sont déjà configurés
- Ajoutez vos propres composants dans un dossier `components/`

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Sanity](https://www.sanity.io/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)

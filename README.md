# Scolar Auth Users Front

Application frontend pour l'authentification et la gestion des utilisateurs.

## Structure du projet

Le projet est organisé en **modules par feature** pour faciliter la collaboration :

```
src/
├── features/
│   ├── auth/                    # Module d'authentification
│   │   ├── components/         # Composants spécifiques à l'auth
│   │   ├── pages/              # Pages d'authentification
│   │   ├── hooks/              # Hooks React spécifiques
│   │   ├── services/           # Services API/auth
│   │   ├── types/              # Types TypeScript spécifiques
│   │   └── index.ts            # Export public du module
│   │
│   └── admin-users/            # Module de gestion des utilisateurs
│       ├── components/         # Composants spécifiques à l'admin
│       ├── pages/              # Pages d'administration
│       ├── hooks/              # Hooks React spécifiques
│       ├── services/           # Services API/admin
│       ├── types/              # Types TypeScript spécifiques
│       └── index.ts            # Export public du module
│
├── shared/                     # Code partagé entre les modules
│   ├── components/            # Composants réutilisables
│   ├── hooks/                  # Hooks réutilisables
│   ├── utils/                 # Utilitaires
│   └── types/                 # Types partagés
│
├── routes/                     # Configuration des routes
├── App.tsx                     # Composant racine
└── main.tsx                    # Point d'entrée
```

## Organisation du travail

### CALEB : Module Auth (`features/auth/`)
- Travaille exclusivement dans `src/features/auth/`
- Peut utiliser les composants/services de `shared/`
- Exporte son API via `features/auth/index.ts`

### YANN : Module Admin Users (`features/admin-users/`)
- Travaille exclusivement dans `src/features/admin-users/`
- Peut utiliser les composants/services de `shared/`
- Exporte son API via `features/admin-users/index.ts`

## Règles de collaboration

1. **Pas de modifications dans le dossier de l'autre développeur**
2. **Pour partager du code** : utiliser `shared/`
3. **Pour importer un module** : utiliser les exports depuis `features/[module]/index.ts`
4. **Types communs** : placer dans `shared/types/`

## Workflow Git avec branches

Le projet utilise un système de branches pour faciliter la collaboration :

### Branches disponibles

- **`main`** : Branche principale (production-ready)
- **`feature/auth`** : Branche pour le développement du module d'authentification
- **`feature/admin-users`** : Branche pour le développement du module de gestion des utilisateurs

### Instructions pour chaque développeur

#### Développeur Auth (feature/auth)

```bash
# 1. Récupérer la dernière version
git checkout main
git pull origin main

# 2. Basculer sur votre branche
git checkout feature/auth

# 3. Mettre à jour votre branche avec main
git merge main  # ou git rebase main

# 4. Travailler dans src/features/auth/
# ... faire vos modifications ...

# 5. Committer et pousser
git add src/features/auth/
git commit -m "feat(auth): description de vos changements"
git push origin feature/auth
```

#### Développeur Admin Users (feature/admin-users)

```bash
# 1. Récupérer la dernière version
git checkout main
git pull origin main

# 2. Basculer sur votre branche
git checkout feature/admin-users

# 3. Mettre à jour votre branche avec main
git merge main  # ou git rebase main

# 4. Travailler dans src/features/admin-users/
# ... faire vos modifications ...

# 5. Committer et pousser
git add src/features/admin-users/
git commit -m "feat(admin-users): description de vos changements"
git push origin feature/admin-users
```

### Fusion dans main

Quand une feature est prête :

```bash
# 1. S'assurer que main est à jour
git checkout main
git pull origin main

# 2. Fusionner la branche feature
git merge feature/auth  # ou feature/admin-users

# 3. Résoudre les conflits si nécessaire (normalement peu probable grâce à la séparation)

# 4. Pousser vers main
git push origin main
```

### Avantages de cette approche

- ✅ Chaque développeur travaille sur sa propre branche
- ✅ Pas de conflits Git grâce à la séparation des modules
- ✅ Intégration continue possible avec tests sur chaque branche
- ✅ Code review facilité via Pull Requests sur GitHub

## Installation

```bash
bun install
```

## Développement

```bash
bun run dev
```

## Build

```bash
bun run build
```

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

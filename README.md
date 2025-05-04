# 🧱 Create Robust Nuxt

A modern, opinionated Nuxt 3 starter with optional modules like authentication, internationalization, and networking — designed to scale, customize, and ship fast.

## ✨ Features

- ✅ Nuxt 3 + TypeScript
- 🎨 Prettier & ESLint with Tailwind support
- 🗂 Modular feature-based architecture
- 🔐 Optional Supabase auth module
- 📡 Optional networking module
- ⚙️ CLI to scaffold features dynamically

## 🚀 Getting Started

```bash
npx create-robust-nuxt my-app
cd my-app
pnpm install
pnpm dev
````

Use the CLI prompts to enable features like `auth`, `networking`, and more in the future.

## 🧩 Available Feature Modules

| Feature      | Description                      |
| ------------ | -------------------------------- |
| `auth`       | Adds Supabase + basic auth views |
| `networking` | Placeholder for API utils setup  |

## 🛠 Project Structure

```
.
├── components/
├── composables/
├── features/
│   ├── auth/
│   ├── i18n/
│   └── networking/
├── pages/
├── public/
├── utils/
└── app.config.ts
```

## 🧪 Scripts

| Script       | Description            |
| ------------ | ---------------------- |
| `pnpm dev`   | Run development server |
| `pnpm build` | Build for production   |
| `pnpm lint`  | Lint your codebase     |

## 📦 Built-in Tech Stack

* Nuxt 3
* Vue 3 + Vue Router
* TypeScript
* Pinia
* Tailwind CSS
* Supabase (optional)
* Zod (optional)
* Nuxt UI

## 📃 License

MIT

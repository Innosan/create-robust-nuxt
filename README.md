# 🧱 Create Robust Nuxt

A modern, internationalized + opinionated Nuxt 3 starter with optional modules like authentication, networking and content support — designed to scale, customize, and ship fast.

#### [GitHub Template](https://github.com/Innosan/nuxt-template-project)
> You can hit me up on [GitHub](https://github.com/Innosan) or [Twitter](https://twitter.com/inno__san) if you have any questions or feedback (would appreciate it).

## ✨ Features

- ✅ Nuxt 3 + TypeScript
- 🎨 Prettier & ESLint with Tailwind support
- 🍍 Pinia stores included
- 🗂 Modular feature-based architecture
- 🌐 Nuxt I18n for internationalization
	- Supports multiple languages and locales
    - English (en) and Russian (ru) included
- 🔐 Optional Supabase auth module
  - With Zod validation and basic auth views (Form and Page)
- 📡 Optional networking module
  - Placeholder for API utils setup and Pinia store
  - Easily extendable for future features
- 🖌 Optional Nuxt Content module
  - For easy content management and rendering
  - Supports Markdown and JSON files
- ⚙️ CLI to scaffold features dynamically

## Important note
> Template project and CLI Tool were developed using pnpm. It is recommended to use pnpm for installation and development. Otherwise, you may encounter issues with dependencies and compatibility.

## 🚀 Getting Started

```bash
npx create-robust-nuxt
cd project-name
pnpm i
pnpm run dev

# optional prettier run
pnpm exec prettier --write .
```

> Use the CLI prompts to enable features like `auth`, `networking`, and more in the future.

## 🧩 Available Feature Modules

| Feature      | Description                      |
| ------------ | -------------------------------- |
| `auth`       | Adds Supabase and basic auth views |
| `networking` | Placeholder for API utils setup and Pinia store |
| `content`    | Adds Nuxt Content module for easy content management |

## 📦 Built-in Tech Stack

* Nuxt 3
* Nitro
* Nuxt UI
* Vue 3 + Vue Router
* TypeScript
* Pinia
* Nuxt I18n
* Tailwind CSS

## 📃 License

MIT

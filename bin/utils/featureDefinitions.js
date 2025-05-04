const versions = {
  typescript: "^5.8.3",

  eslint: "^9.0.0",
  prettier: "^3.5.3",
  "prettier-plugin-tailwindcss": "^0.6.11",
  "@nuxt/eslint": "^1.3.0",

  vue: "^3.5.13",
  "vue-router": "^4.5.0",
  "@vue/language-server": "^2.2.10",

  nuxt: "^3.16.2",
  nuxi: "^3.25.0",
  "@nuxt/ui": "^3.0.2",
  "@pinia/nuxt": "^0.11.0",
  "pinia-plugin-persistedstate": "^4.2.0",

  sass: "^1.86.3",
  "@formkit/auto-animate": "^0.8.2",

  "@intlify/message-compiler": "^11.1.3",
  "@nuxtjs/i18n": "^9.5.3",

  zod: "^3.24.3",

  "@nuxtjs/supabase": "^1.4.5",
};

export const baseSet = {
  packages: {
    dev: {
      eslint: versions["eslint"],
      prettier: versions["prettier"],
      "prettier-plugin-tailwindcss": versions["prettier-plugin-tailwindcss"],

      vue: versions["vue"],
      "vue-router": versions["vue-router"],
      nuxt: versions["nuxt"],
      nuxi: versions["nuxi"],

      "@vue/language-server": versions["@vue/language-server"],
      "@nuxt/eslint": versions["@nuxt/eslint"],

      sass: versions["sass"],
    },
    prod: {
      "@nuxt/ui": versions["@nuxt/ui"],
      "@pinia/nuxt": versions["@pinia/nuxt"],
      "pinia-plugin-persistedstate": versions["pinia-plugin-persistedstate"],
      "@formkit/auto-animate/nuxt": versions["@formkit/auto-animate"],
    },
  },
};

export const auth = {
  marker: "@feature/auth",
  pages: ["/login.vue"],
  packages: {
    dev: {
      "@nuxtjs/supabase": versions["@nuxtjs/supabase"],
    },
    prod: {
      zod: versions["zod"],
    },
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY,
    },
  },
  env: {
    SUPABASE_URL: "https://your-supabase-url.supabase.co",
    SUPABASE_KEY: "your-supabase-key",
  },
};

export const i18n = {
  marker: "@feature/i18n",
  components: ["/utility/LanguageSwitcher"],
  packages: {
    prod: {
      "@nuxtjs/i18n": versions["@nuxtjs/i18n"],
      "@intlify/message-compiler": versions["@intlify/message-compiler"],
    },
  },
};

export const networking = {
  marker: "@feature/networking",
};

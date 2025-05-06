import type { Packages } from "../../dev/types/Packages.js";

export const versions = {
	typescript: "^5.8.3",

	eslint: "^9.26.0",
	prettier: "^3.5.3",
	"prettier-plugin-tailwindcss": "^0.6.11",
	"@nuxt/eslint": "^1.3.0",

	vue: "^3.5.13",
	"vue-router": "^4.5.1",
	"@vue/language-server": "^2.2.10",

	nuxt: "^3.17.2",
	nuxi: "^3.25.0",
	"@nuxt/ui": "^3.1.1",
	"@pinia/nuxt": "^0.11.0",
	"@nuxt/content": "^3.5.1",
	"pinia-plugin-persistedstate": "^4.2.0",

	sass: "^1.87.0",
	"@formkit/auto-animate": "^0.8.2",
	"@iconify-json/heroicons": "^1.2.2",

	"@intlify/message-compiler": "^11.1.3",
	"@nuxtjs/i18n": "^9.5.4",

	zod: "^3.24.4",

	"@nuxtjs/supabase": "^1.5.0",
};

export const baseSet: Packages = {
	dev: {
		eslint: versions["eslint"],
		prettier: versions["prettier"],
		"prettier-plugin-tailwindcss": versions["prettier-plugin-tailwindcss"],
		vue: versions["vue"],
		"vue-router": versions["vue-router"],
		nuxt: versions["nuxt"],
		"@nuxt/kit": versions["nuxt"],
		nuxi: versions["nuxi"],
		"@vue/language-server": versions["@vue/language-server"],
		"@nuxt/eslint": versions["@nuxt/eslint"],
		sass: versions["sass"],
		typescript: versions["typescript"],
		"@iconify-json/heroicons": versions["@iconify-json/heroicons"],
	},
	prod: {
		"@nuxt/ui": versions["@nuxt/ui"],
		"@pinia/nuxt": versions["@pinia/nuxt"],
		"pinia-plugin-persistedstate": versions["pinia-plugin-persistedstate"],
		"@formkit/auto-animate": versions["@formkit/auto-animate"],
		"@nuxtjs/i18n": versions["@nuxtjs/i18n"],
		"@intlify/message-compiler": versions["@intlify/message-compiler"],
	},
};

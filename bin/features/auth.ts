import { BaseFeature } from "../types/feature/BaseFeature.js";
import { versions } from "../utils/packages.js";

export default new (class AuthFeature extends BaseFeature {
	constructor() {
		super({
			marker: "auth",
			lines: [
				"app.vue",
				"pages/index.vue",
				"components/layout/AppHeader.vue",
				"nuxt.config.ts",
			],
			directoriesAndFiles: [
				"components/features/auth",
				"composables",
				"middleware",
				"layouts/authed.vue",
				"layouts/unauthed.vue",
				"pages/login.vue",
			],
			question: {
				type: "confirm",
				name: "includeAuth",
				message: "Include auth module?",
				default: false,
			},
			packages: {
				dev: {
					"@nuxtjs/supabase": versions["@nuxtjs/supabase"],
				},
				prod: {
					zod: versions["zod"],
				},
			},
			env: {
				NUXT_PUBLIC_SUPABASE_URL: "https://your-supabase-url.supabase.co",
				NUXT_PUBLIC_SUPABASE_KEY: "your-supabase-key",
			},
		});
	}
})();

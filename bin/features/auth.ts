import { BaseFeature } from "../types/feature/BaseFeature.js";
import { versions } from "../utils/packages.js";

export default new (class AuthFeature extends BaseFeature {
	constructor() {
		super({
			marker: "auth",
			selectedMessage:
				"Don't forget to configure your Supabase URL and key in .env",
			lines: [
				"app.vue",
				"pages/index.vue",
				"components/layout/AppHeader.vue",
				"nuxt.config.ts",
			],
			directoriesAndFiles: [
				"components/features/auth",
				"composables/auth.ts",
				"composables/authForm.ts",
				"middleware",
				"layouts/authed.vue",
				"layouts/unauthed.vue",
				"pages/login.vue",
				"types/ui/Tabs.ts",
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
				SUPABASE_URL: "https://your-supabase-url.supabase.co",
				SUPABASE_KEY: "your-supabase-key",
			},
		});
	}
})();

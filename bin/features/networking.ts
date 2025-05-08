import { BaseFeature } from "../types/feature/BaseFeature.js";

export default new (class NetworkingFeature extends BaseFeature {
	constructor() {
		super({
			marker: "networking",
			selectedMessage:
				"Basic API endpoints located in the server/api directory",
			lines: ["components/layout/AppNavigation.vue", "nuxt.config.ts"],
			directoriesAndFiles: [
				"components/features/networking",
				"server/api",
				"pages/recommendations.vue",
				"stores/recommendations.ts",
				"types/server",
			],
			question: {
				type: "confirm",
				name: "includeNetworking",
				message: "Include networking module?",
				default: false,
			},
			packages: {},
			env: {
				NUXT_API_BASE: "https://api.jikan.moe/v4",
			},
		});
	}
})();

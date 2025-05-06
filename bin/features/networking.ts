import { BaseFeature } from "../../dev/types/feature/BaseFeature.js";

export default new (class NetworkingFeature extends BaseFeature {
	constructor() {
		super({
			marker: "networking",
			lines: ["components/layout/AppNavigation.vue", "nuxt.config.ts"],
			directoriesAndFiles: [
				"components/features/networking",
				"types/server",
				"server/api",
				"pages/articles.vue",
				"stores/articles.ts",
			],
			question: {
				type: "confirm",
				name: "includeNetworking",
				message: "Include networking module?",
				default: false,
			},
			packages: {},
			env: {},
		});
	}
})();

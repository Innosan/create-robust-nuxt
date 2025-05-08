import { BaseFeature } from "../types/feature/BaseFeature.js";
import { versions } from "../utils/packages.js";

export default new (class ContentFeature extends BaseFeature {
	constructor() {
		super({
			marker: "content",
			selectedMessage:
				"All basic content files are included in /content folder",
			lines: ["components/layout/AppNavigation.vue", "nuxt.config.ts"],
			directoriesAndFiles: [
				"components/features/content",
				"content",
				"pages/guides",
				"content.config.ts",
			],
			question: {
				type: "confirm",
				name: "includeContent",
				message: "Include content module?",
				default: false,
			},
			packages: {
				prod: {
					"@nuxt/content": versions["@nuxt/content"],
				},
			},
			env: {},
		});
	}
})();

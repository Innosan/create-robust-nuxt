import fs from "fs-extra";

import type { Feature, FeaturesMap } from "../../dev/types/Feature";

import { versions } from "./packages.js";

import {
	removeFeatureBlockFromFiles,
	removeNotFeatureBlockFromFiles,
} from "./removeBlock.js";
import { removeFeatureMarkers, removeNotFeatureMarkers } from "./removeMarkers.js";

const auth: Feature = {
	question: {
		type: "confirm",
		name: "includeAuth",
		message: "Include auth module?",
		default: false,
	},
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
	onFeatureRemoved: async function (targetDir: string) {
		// Files & Directories to remove
		for (const fileOrDirectory of auth.directoriesAndFiles) {
			await fs.remove(`${targetDir}/${fileOrDirectory}`);
		}

		// Lines to remove from files
		await removeFeatureBlockFromFiles(targetDir, auth.lines, auth.marker);
		await removeNotFeatureMarkers(targetDir, auth.lines, auth.marker);
	},
	onFeatureSelected: async function (targetDir: string) {
		await removeNotFeatureBlockFromFiles(targetDir, auth.lines, auth.marker);
		await removeFeatureMarkers(targetDir, auth.lines, auth.marker);
	},
};

const networking: Feature = {
	question: {
		type: "confirm",
		name: "includeNetworking",
		message: "Include networking module?",
		default: false,
	},
	marker: "networking",
	lines: ["components/layout/AppNavigation.vue", "nuxt.config.ts"],
	directoriesAndFiles: [
		"components/features/networking",
		"types/server",
		"server/api",
		"pages/articles.vue",
		"stores/articles.ts",
	],
	onFeatureRemoved: async function (targetDir: string) {
		// Files & Directories to remove
		for (const fileOrDirectory of networking.directoriesAndFiles) {
			await fs.remove(`${targetDir}/${fileOrDirectory}`);
		}

		// Lines to remove from files
		await removeFeatureBlockFromFiles(targetDir, networking.lines, networking.marker);
	},
	onFeatureSelected: async function (targetDir: string) {
		await removeFeatureMarkers(targetDir, networking.lines, networking.marker);
	},
};

const content: Feature = {
	question: {
		type: "confirm",
		name: "includeContent",
		message: "Include content module?",
		default: false,
	},
	marker: "content",
	lines: ["components/layout/AppNavigation.vue", "nuxt.config.ts"],
	directoriesAndFiles: ["content", "pages/guides", "content.config.ts"],
	packages: {
		prod: {
			"@nuxt/content": versions["@nuxt/content"],
		},
	},
	onFeatureRemoved: async function (targetDir: string) {
		for (const fileOrDirectory of content.directoriesAndFiles) {
			await fs.remove(`${targetDir}/${fileOrDirectory}`);
		}

		// Lines to remove from files
		await removeFeatureBlockFromFiles(targetDir, content.lines, content.marker);
	},
	onFeatureSelected: async function (targetDir: string) {
		await removeFeatureMarkers(targetDir, content.lines, content.marker);
	},
};

export enum Features {
	AUTH = "auth",
	NETWORKING = "networking",
	CONTENT = "content",
}

export const featuresMap: FeaturesMap = {
	[Features.AUTH]: auth,
	[Features.NETWORKING]: networking,
	[Features.CONTENT]: content,
};

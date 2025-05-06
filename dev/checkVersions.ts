import fs from "fs-extra";
import path from "path";
import { execa } from "execa";

import { baseSet } from "../bin/utils/packages.js";
import { featuresMap } from "../bin/utils/features.js";

async function generateAndCheckVersions() {
	const devDir = path.join(process.cwd(), "dev");
	const pkgPath = path.join(devDir, "package.json");

	await fs.ensureDir(devDir);

	// Initialize package.json structure
	const pkg = {
		name: "nuxt-app",
		private: true,
		type: "module",
		scripts: {
			build: "nuxt build",
			dev: "nuxt dev",
			generate: "nuxt generate",
			preview: "nuxt preview",
			postinstall: "nuxt prepare",
		},
		devDependencies: {},
		dependencies: {},
	};

	// Collect all devDependencies and dependencies
	const devDeps = { ...baseSet.dev };
	const prodDeps = { ...baseSet.prod };

	for (const feature of Object.values(featuresMap)) {
		if (feature.packages?.dev) {
			Object.assign(devDeps, feature.packages.dev);
		}
		if (feature.packages?.prod) {
			Object.assign(prodDeps, feature.packages.prod);
		}
	}

	// Attach them to the package.json
	pkg.devDependencies = devDeps;
	pkg.dependencies = prodDeps;

	// Write it to disk
	await fs.writeJson(pkgPath, pkg, { spaces: 2 });
	console.log(`[ncu] Written package.json to ${pkgPath}`);

	// Check for updates
	try {
		const { stdout } = await execa("ncu", ["--packageFile", pkgPath]);
		if (stdout.trim() === "") {
			console.log("[ncu] ✅ All packages are up to date.");
		} else {
			console.log("[ncu] 🔼 Upgrade suggestions:\n" + stdout);
		}
	} catch (err) {
		// @ts-ignore
		console.error("[ncu] ❌ Failed to run ncu:", err.message);
	}
}

generateAndCheckVersions();

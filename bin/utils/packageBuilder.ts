import fs from "fs-extra";
import path from "path";

import { baseSet, auth, networking } from "./featureDefinitions.js";

const featureMap = { auth, networking };

export const prunePackageJson = async (targetDir: string, selectedFeatures: string[]) => {
	const pkgPath = path.join(targetDir, "package.json");
	const pkgJson = await fs.readJSON(pkgPath);

	const keepDev = new Set(Object.keys(baseSet.packages.dev));
	const keepProd = new Set(Object.keys(baseSet.packages.prod));

	for (const featureKey of selectedFeatures) {
		// @ts-ignore
		const feature = featureMap[featureKey];
		if (!feature?.packages) continue;

		for (const type of ["dev", "prod"]) {
			Object.keys(feature.packages[type] || {}).forEach((pkg) =>
				type === "dev" ? keepDev.add(pkg) : keepProd.add(pkg),
			);
		}
	}

	// Prune devDependencies
	for (const pkg of Object.keys(pkgJson.devDependencies || {})) {
		if (!keepDev.has(pkg)) {
			delete pkgJson.devDependencies[pkg];
		}
	}

	// Prune dependencies
	for (const pkg of Object.keys(pkgJson.dependencies || {})) {
		if (!keepProd.has(pkg)) {
			delete pkgJson.dependencies[pkg];
		}
	}

	await fs.writeJSON(pkgPath, pkgJson, { spaces: 2 });
};

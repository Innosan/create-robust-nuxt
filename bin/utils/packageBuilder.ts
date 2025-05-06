import fs from "fs-extra";
import path from "path";

import { PackageType } from "../../dev/types/Feature.js";

import { baseSet } from "./packages.js";
import { featuresMap } from "./features.js";

export const prunePackageJson = async (targetDir: string, selectedFeatures: string[]) => {
	const pkgPath = path.join(targetDir, "package.json");
	const pkgJson = await fs.readJSON(pkgPath);

	const keepDev = new Set(Object.keys(baseSet.dev ?? {}));
	const keepProd = new Set(Object.keys(baseSet.prod ?? {}));

	for (const featureKey of selectedFeatures) {
		// @ts-ignore
		const feature = featuresMap[featureKey];
		if (!feature?.packages) continue;

		for (const type of ["dev", "prod"]) {
			Object.keys(feature.packages[type as PackageType] || {}).forEach((pkg) =>
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

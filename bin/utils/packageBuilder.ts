import fs from "fs-extra";
import path from "path";

import type { PackageType } from "../../dev/types/Packages.js";

import { baseSet } from "./packages.js";
import { AuthFeature, NetworkingFeature, ContentFeature } from "../features/index.js";

export const prunePackageJson = async (targetDir: string, selectedFeatures: string[]) => {
	const pkgPath = path.join(targetDir, "package.json");
	const pkgJson = await fs.readJSON(pkgPath);

	const keepDev = new Set(Object.keys(baseSet.dev ?? {}));
	const keepProd = new Set(Object.keys(baseSet.prod ?? {}));

	for (const featureKey of selectedFeatures) {
		const feature = [AuthFeature, NetworkingFeature, ContentFeature].find(
			(f) => f.marker === featureKey,
		);
		if (feature) {
			for (const type of ["dev", "prod"]) {
				Object.keys(feature.packages[type as PackageType] || {}).forEach((pkg) =>
					type === "dev" ? keepDev.add(pkg) : keepProd.add(pkg),
				);
			}
		}
	}

	for (const pkg of Object.keys(pkgJson.devDependencies || {})) {
		if (!keepDev.has(pkg)) {
			delete pkgJson.devDependencies[pkg];
		}
	}
	for (const pkg of Object.keys(pkgJson.dependencies || {})) {
		if (!keepProd.has(pkg)) {
			delete pkgJson.dependencies[pkg];
		}
	}

	await fs.writeJSON(pkgPath, pkgJson, { spaces: 2 });
};

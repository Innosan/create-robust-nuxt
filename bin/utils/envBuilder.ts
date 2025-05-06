import fs from "fs-extra";
import path from "path";

import { featuresMap } from "./features.js";

export const generateEnvFile = async (targetDir: string, features: string[]) => {
	const envVars = {};

	for (const featureKey of features) {
		// @ts-ignore
		const feature = featuresMap[featureKey];
		if (!feature?.env) continue;

		Object.assign(envVars, feature.env);
	}

	const envContent = Object.entries(envVars)
		.map(([key, value]) => `${key}=${value}`)
		.join("\n");

	const envPath = path.join(targetDir, ".env");

	try {
		await fs.writeFile(envPath, envContent);
		// console.log(`[env] .env file created at ${envPath}`);
	} catch (error) {
		console.error("[env] Failed to write .env file:", error);
	}
};

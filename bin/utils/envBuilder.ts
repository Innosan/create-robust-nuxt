import fs from "fs-extra";
import path from "path";

import { AuthFeature, NetworkingFeature, ContentFeature } from "../features/index.js";

export const generateEnvFile = async (targetDir: string, features: string[]) => {
	const envVars = {};
	const featureClasses = [AuthFeature, NetworkingFeature, ContentFeature];

	for (const feature of featureClasses) {
		if (features.includes(feature.marker) && feature.env) {
			Object.assign(envVars, feature.env);
		}
	}

	const envContent = Object.entries(envVars)
		.map(([key, value]) => `${key}=${value}`)
		.join("\n");

	const envPath = path.join(targetDir, ".env");

	try {
		await fs.writeFile(envPath, envContent);
	} catch (error) {
		console.error("[env] Failed to write .env file:", error);
	}
};

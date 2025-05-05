import fs from "fs-extra";
import path from "path";

import { featuresMap } from "./featureDefinitions.js";

export async function generateEnvFile(targetDir, features) {
  const envVars = {};

  for (const featureKey of features) {
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
}

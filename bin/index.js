#!/usr/bin/env node

import inquirer from "inquirer";
import { execa } from "execa";
import degit from "degit";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

import { removeFeatureBlock } from "./utils/removeFeatureBlock.js";
import { prunePackageJson } from "./utils/packageBuilder.js";

const answers = await inquirer.prompt([
  {
    type: "input",
    name: "projectName",
    message: "Project name:",
    default: "nuxt-template-site",
  },
  {
    type: "confirm",
    name: "includeAuth",
    message: "Include auth module?",
    default: false,
  },
  {
    type: "confirm",
    name: "includeNetworking",
    message: "Include networking module?",
    default: false,
  },
  // Add more features as needed
]);

const { projectName, includeAuth, includeNetworking } = answers;
const targetDir = path.resolve(process.cwd(), projectName);

// Clone the template
const emitter = degit("Innosan/nuxt-template-project");
await emitter.clone(targetDir);

// Remove unnecessary files and directories of auth module
if (!includeAuth) {
  // Files & Directories to remove
  await fs.remove(`${targetDir}/components/features/auth`);
  await fs.remove(`${targetDir}/composables`);
  await fs.remove(`${targetDir}/middleware`);

  await fs.remove(`${targetDir}/layouts/authed.vue`);
  await fs.remove(`${targetDir}/layouts/unauthed.vue`);

  await fs.remove(`${targetDir}/pages/login.vue`);

  // Lines to remove from files
  await removeFeatureBlock(targetDir, "auth");
}

// Example: remove networking files if not selected
if (!includeNetworking) {
  // Files & Directories to remove
  await fs.remove(`${targetDir}/components/features/networking`);
  await fs.remove(`${targetDir}/types/server`);
  await fs.remove(`${targetDir}/server/api`);
  await fs.remove(`${targetDir}/pages/articles.vue`);
  await fs.remove(`${targetDir}/stores/articles.ts`);

  // Lines to remove from files
  await removeFeatureBlock(targetDir, "networking");
}

const selectedFeatures = [];
if (includeAuth) selectedFeatures.push("auth");
if (includeNetworking) selectedFeatures.push("networking");

await prunePackageJson(targetDir, selectedFeatures);

console.log(
  chalk.green(`\nProject ready! cd ${projectName} and start building.`),
);

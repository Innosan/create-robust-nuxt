#!/usr/bin/env node

import inquirer from "inquirer";
import { execa } from "execa";
import degit from "degit";
import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

import { removeFeatureBlockFromFiles } from "./utils/removeFeatureBlock.js";
import { prunePackageJson } from "./utils/packageBuilder.js";
import { generateEnvFile } from "./utils/envBuilder.js";
import { auth, networking } from "./utils/featureDefinitions.js";

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

const selectedFeatures = [];

console.log(
  chalk.blue("\nPreparing your new project! Please, wait for a moment..."),
);

// Remove unnecessary files and directories of auth module
if (!includeAuth) {
  // Files & Directories to remove
  for (const fileOrDirectory of auth.directoriesAndFiles) {
    await fs.remove(`${targetDir}/${fileOrDirectory}`);
  }

  // Lines to remove from files
  await removeFeatureBlockFromFiles(targetDir, auth.lines, auth.marker);
} else {
  selectedFeatures.push(auth.marker);
}

// Remove networking files if not selected
if (!includeNetworking) {
  // Files & Directories to remove
  for (const fileOrDirectory of networking.directoriesAndFiles) {
    await fs.remove(`${targetDir}/${fileOrDirectory}`);
  }

  // Lines to remove from files
  await removeFeatureBlockFromFiles(
    targetDir,
    networking.lines,
    networking.marker,
  );
} else {
  selectedFeatures.push(networking.marker);
}

await prunePackageJson(targetDir, selectedFeatures);
await generateEnvFile(targetDir, selectedFeatures);

console.log(
  chalk.green(`\nProject ready! cd ${projectName} and start building.\n`),
);

console.log(
  chalk.blue(
    "👉 It is recommended to run `pnpm exec prettier --write .` to format your project after `pnpm i`.\n",
  ),
);

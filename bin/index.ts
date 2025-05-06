#!/usr/bin/env node

import type { Question } from "inquirer";

import fs from "fs-extra";
import inquirer from "inquirer";
import degit from "degit";
import path from "path";
import chalk from "chalk";

import { prunePackageJson } from "./utils/packageBuilder.js";
import { generateEnvFile } from "./utils/envBuilder.js";

import { AuthFeature, NetworkingFeature, ContentFeature } from "./features/index.js";

const features = [AuthFeature, NetworkingFeature, ContentFeature];

const questions: Question[] = [
	{
		type: "input",
		name: "projectName",
		message: "What is the name of your project?",
		default: "my-nuxt-app",
	},
	...features.map((feature) => feature.question),
];

// @ts-ignore
const answers = await inquirer.prompt(questions);

const { projectName } = answers;
const targetDir = path.resolve(process.cwd(), projectName);

// Check if the directory already exists
if (fs.existsSync(targetDir)) {
	console.error(
		chalk.red(
			`\nDirectory '${projectName}' already exists. Please choose a different name.`,
		),
	);

	process.exit(1);
}

// Clone the template
const emitter = degit("Innosan/nuxt-template-project");
console.log(chalk.blue(`\nCloning template into '${projectName}'...`));
await emitter.clone(targetDir);

console.log(chalk.blue("Preparing your new project! Please, wait for a moment..."));

// Process each feature based on the corresponding prompt answer.
const selectedFeatures: string[] = [];
for (const feature of features) {
	if (answers[feature.question.name]) {
		selectedFeatures.push(feature.marker);

		await feature.onFeatureSelected(targetDir);
	} else {
		await feature.onFeatureRemoved(targetDir);
	}
}
const skipped = features.filter((f) => !selectedFeatures.includes(f.marker));

await prunePackageJson(targetDir, selectedFeatures);
await generateEnvFile(targetDir, selectedFeatures);

console.log(chalk.cyan("\nIncluded features:"));
selectedFeatures.forEach((f) => console.log(" - " + f));

if (skipped.length) {
	console.log(chalk.gray("\nSkipped features:"));
	skipped.forEach((f) => console.log(" - " + f.marker));
}

console.log(chalk.green(`Project ready! cd ${projectName} and start building.\n`));

console.log(
	chalk.blue(
		"\n👉 It is recommended to run `pnpm exec prettier --write .` to format your project after `pnpm i`.\n",
	),
);

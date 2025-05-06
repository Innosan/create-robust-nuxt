#!/usr/bin/env node

import type { Question } from "inquirer";

import fs from "fs-extra";
import inquirer from "inquirer";
import degit from "degit";
import path from "path";
import chalk from "chalk";

import { prunePackageJson } from "./utils/packageBuilder.js";
import { generateEnvFile } from "./utils/envBuilder.js";
import { Features, featuresMap } from "./utils/features.js";

const authFeature = featuresMap[Features.AUTH];
const networkingFeature = featuresMap[Features.NETWORKING];
const contentFeature = featuresMap[Features.CONTENT];

const questions: Question[] = [
	{
		type: "input",
		name: "projectName",
		message: "What is the name of your project?",
		default: "my-nuxt-app",
	},
	authFeature.question,
	networkingFeature.question,
	contentFeature.question,
];

// @ts-ignore
const answers = await inquirer.prompt(questions);

const { projectName, includeAuth, includeNetworking, includeContent } = answers;
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

console.log(chalk.blue("\nPreparing your new project! Please, wait for a moment..."));

const selectedFeatures: string[] = [
	...(includeAuth ? [Features.AUTH] : []),
	...(includeNetworking ? [Features.NETWORKING] : []),
	...(includeContent ? [Features.CONTENT] : []),
];

const featureStates = [
	[Features.AUTH, includeAuth],
	[Features.NETWORKING, includeNetworking],
	[Features.CONTENT, includeContent],
] as const;

// Remove the feature blocks, markers, files and directories from the files
for (const [key, isEnabled] of featureStates) {
	if (isEnabled) {
		await featuresMap[key].onFeatureSelected(targetDir);
	} else {
		await featuresMap[key].onFeatureRemoved(targetDir);
	}
}

await prunePackageJson(targetDir, selectedFeatures);
await generateEnvFile(targetDir, selectedFeatures);

console.log(chalk.green(`\nProject ready! cd ${projectName} and start building.\n`));

console.log(chalk.cyan("Included features:"));
selectedFeatures.forEach((f) => console.log(" - " + f));

console.log(
	chalk.blue(
		"\n👉 It is recommended to run `pnpm exec prettier --write .` to format your project after `pnpm i`.\n",
	),
);

import { Question } from "inquirer";

export type Packages = {
	dev?: Record<string, string>;
	prod?: Record<string, string>;
};

export type PackageType = keyof Packages; // 'dev' | 'prod'

export type Feature = {
	question: Question;
	marker: string;
	lines: string[];
	directoriesAndFiles: string[];
	onFeatureSelected: (targetDir: string) => Promise<void>;
	onFeatureRemoved: (targetDir: string) => Promise<void>;
	packages?: Packages;
	env?: Record<string, string>;
};

export type FeaturesMap = Record<string, Feature>;

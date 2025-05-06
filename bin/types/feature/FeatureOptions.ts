import type { Question } from "inquirer";
import type { Packages } from "../Packages";

export interface FeatureOptions {
	marker: string;
	lines: string[];
	directoriesAndFiles: string[];
	question: Question;
	packages: Packages;
	env: Record<string, string>;
}

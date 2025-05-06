import fs from "fs-extra";

import type { FeatureOptions } from "./FeatureOptions.js";

import {
	removeFeatureBlockFromFiles,
	removeNotFeatureBlockFromFiles,
} from "../../utils/removeBlock.js";

import {
	removeFeatureMarkers,
	removeNotFeatureMarkers,
} from "../../utils/removeMarkers.js";

/**
 * BaseFeature class
 *
 * This class serves as a base for creating features in a project.
 * It provides methods to handle the addition and removal of features,
 * as well as managing the associated files and directories.
 *
 * @abstract
 * @class
 * @param {FeatureOptions} options - Options for the feature, including directories, files, and markers.
 */
export abstract class BaseFeature {
	protected options: FeatureOptions;

	protected constructor(options: FeatureOptions) {
		this.options = options;
	}

	async onFeatureRemoved(targetDir: string): Promise<void> {
		for (const fileOrDirectory of this.options.directoriesAndFiles) {
			await fs.remove(`${targetDir}/${fileOrDirectory}`);
		}

		await removeFeatureBlockFromFiles(
			targetDir,
			this.options.lines,
			this.options.marker,
		);
		await removeNotFeatureMarkers(targetDir, this.options.lines, this.options.marker);
	}

	async onFeatureSelected(targetDir: string): Promise<void> {
		await removeNotFeatureBlockFromFiles(
			targetDir,
			this.options.lines,
			this.options.marker,
		);
		await removeFeatureMarkers(targetDir, this.options.lines, this.options.marker);
	}

	get marker() {
		return this.options.marker;
	}

	get question() {
		return this.options.question;
	}

	get packages() {
		return this.options.packages;
	}

	get env() {
		return this.options.env;
	}
}

import fs from "fs-extra";
import path from "path";

/**
 * Removes blocks between @feature/[name] - start/end markers in specified files,
 * using targetDir as the root for relative paths.
 *
 * @param targetDir - Project root directory
 * @param relativePaths - Array of file paths (relative to targetDir)
 * @param feature - Feature name to remove
 */
export const removeFeatureBlockFromFiles = async (
	targetDir: string,
	relativePaths: string[],
	feature: string,
) => {
	// Return if no relative paths are provided
	if (!relativePaths || relativePaths.length === 0) {
		return;
	}

	const blockStart = `@feature/${feature} - start`;
	const blockEnd = `@feature/${feature} - end`;

	const regex = new RegExp(
		`(?:\\/\\/|<!--)\\s*${blockStart}[\\s\\S]*?(?:\\/\\/|<!--)?\\s*${blockEnd}\\s*(?:-->)?`,
		"g",
	);

	for (const relPath of relativePaths) {
		const fullPath = path.join(targetDir, relPath);

		// Only process supported file types
		if (!/\.(ts|js|vue)$/.test(fullPath)) continue;

		try {
			const content = await fs.readFile(fullPath, "utf8");
			const newContent = content.replace(regex, "").trimEnd();

			if (newContent !== content) {
				await fs.writeFile(fullPath, newContent);
				// console.log(
				//   `[feature:remove] Removed "${feature}" block in ${relPath}`,
				// );
			}
		} catch (err) {
			// @ts-ignore
			console.error(`Error processing ${relPath}:`, err.message);
		}
	}
};

/**
 * Removes blocks between !@feature/[name] - start/end markers in specified files,
 * using targetDir as the root for relative paths.
 *
 * @param targetDir - Project root directory
 * @param relativePaths - Array of file paths (relative to targetDir)
 * @param feature - Feature name to remove
 */
export const removeNotFeatureBlockFromFiles = async (
	targetDir: string,
	relativePaths: string[],
	feature: string,
) => {
	// Return if no relative paths are provided
	if (!relativePaths || relativePaths.length === 0) {
		return;
	}

	const notBlockStart = `!@feature/${feature} - start`;
	const notBlockEnd = `!@feature/${feature} - end`;

	const regex = new RegExp(
		`(?:\\/\\/|<!--)\\s*${notBlockStart}[\\s\\S]*?(?:\\/\\/|<!--)?\\s*${notBlockEnd}\\s*(?:-->)?`,
		"g",
	);

	for (const relPath of relativePaths) {
		const fullPath = path.join(targetDir, relPath);

		if (!/\.(ts|js|vue)$/.test(fullPath)) continue;

		try {
			const content = await fs.readFile(fullPath, "utf8");
			const newContent = content.replace(regex, "");

			if (newContent !== content) {
				await fs.writeFile(fullPath, newContent);
			}
		} catch (err) {
			// @ts-ignore
			console.error(`Error processing ${relPath}:`, err.message);
		}
	}
};

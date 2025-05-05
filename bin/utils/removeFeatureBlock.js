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
export async function removeFeatureBlockFromFiles(
  targetDir,
  relativePaths,
  feature,
) {
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
      console.error(`Error processing ${relPath}:`, err.message);
    }
  }
}

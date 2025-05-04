import fs from "fs-extra";
import path from "path";

/**
 * Removes blocks in files between @feature/[name] - start/end markers.
 * Supports both JS and HTML (Vue SFC) comments.
 */
export async function removeFeatureBlock(targetDir, feature) {
  try {
    const files = await fs.readdir(targetDir);

    for (const file of files) {
      const fullPath = path.join(targetDir, file);

      const stats = await fs.stat(fullPath);
      if (stats.isDirectory()) {
        await removeFeatureBlock(fullPath, feature);
        continue;
      }

      // Only process source files
      if (!/\.(ts|js|vue)$/.test(file)) continue;

      const content = await fs.readFile(fullPath, "utf-8");

      const blockStart = `@feature/${feature} - start`;
      const blockEnd = `@feature/${feature} - end`;

      const regex = new RegExp(
        `(?:\\/\\/|<!--)\\s*${blockStart}[\\s\\S]*?(?:\\/\\/|<!--)?\\s*${blockEnd}\\s*(?:-->)?`,
        "g",
      );

      const newContent = content.replace(regex, "").trimEnd();

      if (newContent !== content) {
        await fs.writeFile(fullPath, newContent);
        console.log(
          `[feature:remove] Removed "${feature}" block in ${fullPath}`,
        );
      }
    }
  } catch (error) {
    console.error("Error while processing the directory:", error);
  }
}

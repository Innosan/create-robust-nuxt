import fs from "fs-extra";
import path from "path";
import { execa } from "execa"; // Modern alternative to child_process

import { versions } from "../bin/utils/featureDefinitions.js";

async function generateAndCheckVersions() {
  const devDir = path.join(process.cwd(), "dev");
  const pkgPath = path.join(devDir, "package.json");

  // Ensure dev directory exists
  await fs.ensureDir(devDir);

  // Create temp package.json structure
  const tempPackageJson = {
    name: "temp-check",
    version: "0.0.1",
    dependencies: { ...versions },
  };

  // Write it
  await fs.writeJson(pkgPath, tempPackageJson, { spaces: 2 });
  console.log(`[ncu] Written to ${pkgPath}`);

  // Run ncu against the file
  try {
    const { stdout } = await execa("ncu", ["--packageFile", pkgPath]);
    if (stdout.trim() === "") {
      console.log("[ncu] All packages are up to date.");
    } else {
      console.log("[ncu] Upgrade suggestions:\n" + stdout);
    }
  } catch (err) {
    console.error("[ncu] Failed to run ncu:", err.message);
  }
}

generateAndCheckVersions();

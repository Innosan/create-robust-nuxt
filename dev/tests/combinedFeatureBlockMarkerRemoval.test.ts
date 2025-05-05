import fs from "fs-extra";
import path from "path";

import { removeFeatureBlockFromFiles } from "../../bin/utils/removeBlock";
import { removeNotFeatureMarkers } from "../../bin/utils/removeMarkers";

describe("Combined Feature Block and Marker Removal", () => {
	const tempFileName = "testFile1.ts";
	const tempDirName = "temp1";
	const tempDir = path.join(__dirname, tempDirName);
	const testFile = path.join(tempDir, tempFileName);

	beforeAll(async () => {
		await fs.ensureDir(tempDir);
	});

	afterAll(async () => {
		await fs.remove(tempDir);
	});

	beforeEach(async () => {
		const content = `
// @feature/auth - start
const authVariable = "authValue";
// @feature/auth - end

// !@feature/auth - start
const authFallbackVariable = "authFallbackValue";
// !@feature/auth - end

<!-- @feature/auth - start -->
<div>Auth Feature</div>
<!-- @feature/auth - end -->

<!-- !@feature/auth - start -->
<div>Auth Fallback</div>
<!-- !@feature/auth - end -->
        `;
		await fs.writeFile(testFile, content);
	});

	it("removes @feature blocks and cleans up !@feature markers", async () => {
		// Remove @feature blocks
		await removeFeatureBlockFromFiles(tempDir, [tempFileName], "auth");

		// Clean up !@feature markers
		await removeNotFeatureMarkers(tempDir, [tempFileName], "auth");

		const result = await fs.readFile(testFile, "utf8");

		// Ensure @feature blocks are removed
		expect(result).not.toContain("authVariable");
		expect(result).not.toContain("<div>Auth Feature</div>");

		// Ensure !@feature markers are removed but block content remains
		expect(result).toContain("authFallbackVariable");
		expect(result).toContain("<div>Auth Fallback</div>");
		expect(result).not.toContain("!@feature/auth - start");
		expect(result).not.toContain("!@feature/auth - end");
	});
});

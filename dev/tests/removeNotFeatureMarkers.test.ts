import fs from "fs-extra";
import path from "path";

import { removeNotFeatureMarkers } from "../../bin/utils/removeMarkers";

describe("Remove Not Feature Markers", () => {
	const tempFileName = "testFile3.ts";
	const tempDirName = "temp3";
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

<!-- !@feature/auth - start -->
<div>Auth Fallback</div>
<!-- !@feature/auth - end -->
        `;
		await fs.writeFile(testFile, content);
	});

	it("removes !@feature markers but keeps block content intact", async () => {
		await removeNotFeatureMarkers(tempDir, [tempFileName], "auth");
		const result = await fs.readFile(testFile, "utf8");

		expect(result).toContain("authFallbackVariable");
		expect(result).toContain("<div>Auth Fallback</div>");
		expect(result).not.toContain("!@feature/auth - start");
		expect(result).not.toContain("!@feature/auth - end");
	});
});

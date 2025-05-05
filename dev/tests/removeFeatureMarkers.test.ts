import fs from "fs-extra";
import path from "path";

import { removeFeatureMarkers } from "../../bin/utils/removeMarkers";

describe("Remove Feature Markers", () => {
	const tempFileName = "testFile4.ts";
	const tempDirName = "temp4";
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

<!-- @feature/auth - start -->
<div>Auth Feature</div>
<!-- @feature/auth - end -->
        `;
		await fs.writeFile(testFile, content);
	});

	it("removes @feature markers but keeps block content intact", async () => {
		await removeFeatureMarkers(tempDir, [tempFileName], "auth");
		const result = await fs.readFile(testFile, "utf8");

		expect(result).toContain('const authVariable = "authValue";');
		expect(result).toContain("<div>Auth Feature</div>");
		expect(result).not.toContain("@feature/auth - start");
		expect(result).not.toContain("@feature/auth - end");
	});
});

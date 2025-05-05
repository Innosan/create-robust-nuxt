import fs from "fs-extra";
import path from "path";
import {
	removeFeatureBlockFromFiles,
	removeNotFeatureBlockFromFiles,
} from "../../bin/utils/removeBlock";

describe("Feature Block Removal", () => {
	const tempFileName = "testFile2.ts";
	const tempDirName = "temp2";
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
        `;
		await fs.writeFile(testFile, content);
	});

	it("removes @feature blocks when feature is not enabled", async () => {
		await removeFeatureBlockFromFiles(tempDir, [tempFileName], "auth");
		const result = await fs.readFile(testFile, "utf8");
		expect(result).not.toContain("authVariable");
		expect(result).toContain("authFallbackVariable");
	});

	it("removes !@feature blocks when feature is enabled", async () => {
		await removeNotFeatureBlockFromFiles(tempDir, [tempFileName], "auth");
		const result = await fs.readFile(testFile, "utf8");
		expect(result).not.toContain("authFallbackVariable");
		expect(result).toContain("authVariable");
	});

	it("handles both @feature and !@feature blocks correctly", async () => {
		await removeFeatureBlockFromFiles(tempDir, [tempFileName], "auth");
		await removeNotFeatureBlockFromFiles(tempDir, [tempFileName], "auth");
		const result = await fs.readFile(testFile, "utf8");
		expect(result).not.toContain("authVariable");
		expect(result).not.toContain("authFallbackVariable");
	});

	it("removes @feature blocks with HTML comments when feature is not enabled", async () => {
		const htmlContent = `
<!-- @feature/auth - start -->
<div>Auth Feature</div>
<!-- @feature/auth - end -->

<!-- !@feature/auth - start -->
<div>Auth Fallback</div>
<!-- !@feature/auth - end -->
    `;
		await fs.writeFile(testFile, htmlContent);

		await removeFeatureBlockFromFiles(tempDir, [tempFileName], "auth");
		const result = await fs.readFile(testFile, "utf8");
		expect(result).not.toContain("Auth Feature");
		expect(result).toContain("Auth Fallback");
	});

	it("removes !@feature blocks with HTML comments when feature is enabled", async () => {
		const htmlContent = `
<!-- @feature/auth - start -->
<div>Auth Feature</div>
<!-- @feature/auth - end -->

<!-- !@feature/auth - start -->
<div>Auth Fallback</div>
<!-- !@feature/auth - end -->
    `;
		await fs.writeFile(testFile, htmlContent);

		await removeNotFeatureBlockFromFiles(tempDir, [tempFileName], "auth");
		const result = await fs.readFile(testFile, "utf8");
		expect(result).not.toContain("Auth Fallback");
		expect(result).toContain("Auth Feature");
	});
});

export type Packages = {
	dev?: Record<string, string>;
	prod?: Record<string, string>;
};

export type PackageType = keyof Packages; // 'dev' | 'prod'

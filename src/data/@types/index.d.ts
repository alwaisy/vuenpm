interface Package {
  meta: PackageMeta;
  commands: {
    pkgManager: PackageManager;
    install: InstallCommand;
  };
}

interface PackageMeta {
  name: string;
  version: string;
  description: string;
  repository: string;
  homepage: string;
  license: string;
  author: {
    name: string;
    email: string;
    url: string;
  };
}

type PackageManager = 'npm' | 'pnpm' | 'yarn';
type InstallCommand =
  | `npm install ${string}`
  | `pnpm add ${string}`
  | `yarn add ${string}`;

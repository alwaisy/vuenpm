interface BasicObject {
  name: string;
  keywords: string[];
  subtitle: string;
}

export type BasicList = BasicObject[];

export interface Package {
  name: string;
  keywords: string[];
  description: string;
}

export type PackageList = Package[];

export interface PkgDetails extends Package {
  name: string;
  description: string;
  readme: string;
  keywords: string[];
  currentVersion: string;
  links: {
    homepage: {
      url: string;
    };
    repository: {
      url: string;
    };
  };
  maintainers: {
    name: string;
    email: string;
  };
  author: {
    name: string;
    url: string;
  };
  scope: string;
  version: string;
  time: {
    modified: string;
    published: string;
  };
  weeklyDownloads: string;
  license: string;

  // homepage: string;
}

export type PmList = 'npm' | 'pnpm' | 'yarn';

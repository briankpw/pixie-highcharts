export interface Title {
  title?: string;
  subtitle?: string;
}

export interface Export {
  title?: string;
  subtitle?: string;
  filename?: string;

  width?: number;
  height?: number;
  scale?: number;
  customExport?: boolean;
}

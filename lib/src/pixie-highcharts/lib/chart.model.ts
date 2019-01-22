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

  enabled?: boolean;
  fallbackToExportServer?: boolean;
  customExport?: boolean;
}

export class ChartEvent {
  originalEvent: Event;
  context: any;
  constructor(event, context) {
    this.originalEvent = event;
    this.context = context;
  }
}

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
  theme?: Object;
  url?: string;

  enabled?: boolean;
  fallbackToExportServer?: boolean;
  customExport?: boolean;
  clearDefaultField?: boolean;
}

export interface GlobalPXH {
  standardTooltipDesign?: Object;
  dateTimeLabelFormats?: Object;
  export?: Export;
  url?: string;
  sameLegendSymbol?: boolean;
  legendPosition?: string;
  debug?: boolean;
  debugStringify?: boolean;
}

export class ChartEvent {
  originalEvent: Event;
  context: any;
  constructor(event, context) {
    this.originalEvent = event;
    this.context = context;
  }
}

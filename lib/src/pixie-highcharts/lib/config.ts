import { GlobalPXH, Export } from './chart.model';

const standardTooltipDesign = {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table style="margin-bottom:unset">',
  pointFormat:
    '<tr><td style="color:{point.color};padding:0">{series.name}</td>' +
    '<td style="padding:0"> : </td>' +
    '<td style="padding:0"><b>{point.y}</b></td></tr>',
  footerFormat: '</table>',
  useHTML: true
};

const dateTimeLabelFormats = {
  millisecond: '%H:%M:%S.%L',
  second: '%H:%M:%S',
  minute: '%H:%M',
  hour: '%H:%M',
  day: '%b %e',
  week: '%b %e',
  month: '%b, %y',
  year: '%y'
};

const exportConfig: Export = {
  filename: 'Pixie_Highcharts',
  enabled: true,
  theme: { chart: { events: { load: function() {} } }, title: {}, subtitle: {} },
  fallbackToExportServer: false,
  height: 600,
  width: 800
};

const config: GlobalPXH = {
  standardTooltipDesign: standardTooltipDesign,
  dateTimeLabelFormats: dateTimeLabelFormats,
  url: 'https://www.highcharts.com?credits',
  export: exportConfig,
  sameLegendSymbol: false,
  legendPosition: 'top',
  debug: false,
  debugStringify: false
};

export { config, exportConfig };

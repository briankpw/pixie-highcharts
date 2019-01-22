const standardTooltipDesign = {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table style="margin-bottom:unset">',
  pointFormat:
    '<tr><td style="color:{series.color};padding:0">{series.name}</td>' +
    '<td style="padding:0"> : </td>' +
    '<td style="padding:0"><b>{point.y}</b></td></tr>',
  footerFormat: '</table>'
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

const config = {
  standardTooltipDesign: standardTooltipDesign,
  dateTimeLabelFormats: dateTimeLabelFormats,
  url: 'https://www.highcharts.cossm?credits',
  filename: 'Pixie_Highcharts'
};

export { config };

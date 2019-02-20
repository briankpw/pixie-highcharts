import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var require: any;
const locales = require('../../../lib/src/pixie-highcharts/lib/locale.json');
// import { LocaleService } from 'pixie-highcharts';

@Component({
  selector: 'pixie-app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {
  public formGroupChart: FormGroup;
  type = 'bar';
  zoomType = 'x';
  data = [
    { name: 'OMAK-1', data: [{ x: 0, y: 983 }] },
    { name: 'OMAK-2', data: [{ x: 1, y: 70 }] },
    { name: 'OMAK-3', data: [{ x: 2, y: 10 }] },
    { name: 'OMAK-4', data: [{ x: 2, y: 108 }, { x: 3, y: 308 }] },
    { name: 'OMAK-5', data: [{ x: 1, y: 108 }, { x: 3, y: 108 }] }
  ];

  data2 = [
    {
      name: 'OMAK-C',
      data: [
        { x: 1512691300000, y: 2.787037037037037, equipmentName: 'OMAK-C' },
        { x: 1512691400000, y: 61.638888888888886, equipmentName: 'OMAK-C' },
        { x: 1512691500000, y: 56.97222222222222, equipmentName: 'OMAK-C' },
        { x: 1512692200000, y: 67.7962962962963, equipmentName: 'OMAK-C' },
        { x: 1512693200000, y: 58.2037037037037, equipmentName: 'OMAK-C' }
      ]
    }
  ];

  title = { title: 'Sample Title', subtitle: 'Sample SubTitle' };

  xAxis = { title: { text: 'Sample X-Axis' }, type: 'category' };
  // type: 'datetime'

  yAxis = { title: { text: 'Sample Y-Axis' } };

  footer = 'Sample Footer';
  color = ['rgb(0, 255, 255)', 'rgb(246, 107, 0)', 'rgb(115, 211, 44)', 'rgb(227, 2, 42)', 'rgb(23,119,25)'];
  colorAxis = {
    stops: [[0, 'rgb(115, 211, 44)'], [1, 'rgb(255, 255, 42)']],
    min: 0,
    max: 50,
    labels: { overflow: 'allow', useHTML: 'true' }
  };

  tooltip = {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table style="margin-bottom:unset">',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}</td>' +
      '<td style="padding:0"> : </td>' +
      '<td style="padding:0"><b>{point.y}</b></td></tr>',
    footerFormat: '</table>',
    xDateFormat: '%A, %b %d, %Y',
    shared: true,
    useHTML: true
  };

  export = { title: 'Volume', filename: 'Volume', scale: 3 };
  config = { legend: { borderWidth: 0, borderRadius: 0, itemMarginTop: 0, padding: 0 } };

  chart;
  locale = Object.keys(locales);
  localeModel = 'en';
  isLegend = true;
  isAxisPrefix = true;
  axisPrefixFloat = 4;
  isStacked = false;
  isGroup = false;
  isPointRange = false;
  isGap = true;
  isUTC = false;
  isBoost = false;
  // , private pixieHighchartsLocaleService: LocaleService
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroupChart = this.formBuilder.group({
      type: [this.type],
      zoomType: [this.zoomType],
      data: [JSON.stringify(this.data)],
      title: [JSON.stringify(this.title)],
      xAxis: [JSON.stringify(this.xAxis)],
      yAxis: [JSON.stringify(this.yAxis)],
      footer: [this.footer],
      color: [JSON.stringify(this.color)],
      colorAxis: [JSON.stringify(this.colorAxis)],
      tooltip: [JSON.stringify(this.tooltip)],
      export: [JSON.stringify(this.export)],
      config: [JSON.stringify(this.config)],
      localeModel: [this.localeModel]
    });

    // Watch...
    this.formGroupChart.controls['type'].valueChanges.subscribe(d => {
      this.type = d;
    });
    this.formGroupChart.controls['zoomType'].valueChanges.subscribe(d => {
      this.zoomType = d;
    });
    this.formGroupChart.controls['data'].valueChanges.subscribe(d => {
      this.data = JSON.parse(d);
    });
    this.formGroupChart.controls['title'].valueChanges.subscribe(d => {
      this.title = JSON.parse(d);
    });
    this.formGroupChart.controls['xAxis'].valueChanges.subscribe(d => {
      this.xAxis = JSON.parse(d);
    });
    this.formGroupChart.controls['yAxis'].valueChanges.subscribe(d => {
      this.yAxis = JSON.parse(d);
    });
    this.formGroupChart.controls['footer'].valueChanges.subscribe(d => {
      this.footer = d;
    });
    this.formGroupChart.controls['color'].valueChanges.subscribe(d => {
      this.color = JSON.parse(d);
    });
    this.formGroupChart.controls['colorAxis'].valueChanges.subscribe(d => {
      this.colorAxis = JSON.parse(d);
    });
    this.formGroupChart.controls['tooltip'].valueChanges.subscribe(d => {
      this.tooltip = JSON.parse(d);
      this.axisPrefixFloat = 2;
    });
    this.formGroupChart.controls['export'].valueChanges.subscribe(d => {
      this.export = JSON.parse(d);
    });
    this.formGroupChart.controls['config'].valueChanges.subscribe(d => {
      this.config = JSON.parse(d);
    });
    this.formGroupChart.controls['localeModel'].valueChanges.subscribe(d => {
      // this.pixieHighchartsLocaleService.setLocale(d);
    });
  }

  onLoad(e) {
    this.chart = e;
    console.log(e);
  }

  onEventClick(e, name) {
    console.log('[' + name + '] : ', e);
  }

  toggle(e, type) {
    this[type] = e;
    console.log(e);
  }

  exportClicked() {
    console.log('Export clicked');
    this.chart.exportChart();
  }
}

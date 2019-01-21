import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css', './table.component.css']
})
export class MainComponent implements OnInit {
  public basicSelectorChart = '';
  public combinationSelectorChart = '[isStacked]="\'true\'"';
  public groupSelectorChart = '[isGroup]="\'true\'"';

  public chartData = [
    {
      name: 'General Infromation',
      route: 'general'
    },

    {
      name: 'Configure',
      type: 'bar',
      route: 'configure',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: 'Configure Highstock',
      type: 'bar',
      route: 'configure-stock',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: 'Configure Map',
      type: 'bar',
      route: 'configure-map',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Bar',
      type: 'bar',
      route: 'bar',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Column',
      type: 'column',
      route: 'column',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Line',
      type: 'line',
      route: 'line',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Dynamic Line',
      type: 'line',
      route: 'dynamic-line',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Pie',
      type: 'pie',
      route: 'pie',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Semi-Donut',
      type: 'pie',
      route: 'semidonut',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Scatter',
      type: 'scatter',
      route: 'scatter',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Scatter Scale',
      type: 'scatter',
      route: 'scale-scatter',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Linear Regression',
      type: 'scatter',
      route: 'linearregression',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },

    {
      name: '[B]: Gauge',
      type: 'solidgauge',
      route: 'gauge',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Spider Web',
      type: 'line',
      route: 'spiderweb',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },

    // {
    //   name: '[B]: Group Bar',
    //   type: 'bar',
    //   route: 'groupbar',
    //   html: this.basicSelectorChart,
    //   label: 'Support',
    //   data: 'Support',
    //   title: 'Support',
    //   types: 'Support',
    //   yaxisLabelFormatter: 'Not Support [Prefix Added]'
    // },
    // {
    //   name: '[B]: Group Column',
    //   type: 'column',
    //   route: 'groupcolumn',
    //   html: this.basicSelectorChart,
    //   label: 'Support',
    //   data: 'Support',
    //   title: 'Support',
    //   types: 'Support',
    //   yaxisLabelFormatter: 'Not Support [Prefix Added]'
    // },
    {
      name: '[B]: MultiDrillDown',
      type: 'scatter/line/bar',
      route: 'multidrilldown',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Histrogram Bin',
      type: 'scatter/line/bar',
      route: 'histrogrambin',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[C]: Stacked Bar',
      type: 'bar',
      route: 'stackedbar',
      html: this.combinationSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[C]: Stacked Column',
      type: 'column',
      route: 'stackedcolumn',
      html: this.combinationSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[C]: Stacked Bar Line',
      type: 'bar',
      route: 'stackedbarline',
      html: this.combinationSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[C]: Stacked Column Line',
      type: 'column',
      route: 'stackedcolumnline',
      html: this.combinationSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[G]: Group Stacked Column',
      type: 'column',
      route: 'groupstackedcolumn',
      html: this.groupSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[G]: Group Column Line',
      type: 'column',
      route: 'groupcolumnline',
      html: this.groupSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[B]: Heatmap',
      type: 'heatmap',
      route: 'heatmap',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[S]: Candle Column',
      type: 'column',
      route: 'candle-bar',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    },
    {
      name: '[S]: Three Layer Column',
      type: 'column',
      route: 'three-layer-stock',
      html: this.basicSelectorChart,
      label: 'Support',
      data: 'Support',
      title: 'Support',
      types: 'Support',
      yaxisLabelFormatter: 'Not Support [Prefix Added]'
    }
  ];
  constructor(private router: Router) {}

  ngOnInit() {}

  redirectToPage(d) {
    this.router.navigate([d['route']]);
  }
}

import { Component } from '@angular/core';

import * as Highcharts from 'highcharts';
@Component({
  selector: 'pixie-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pixie';
  theme: Highcharts.Options = {
    colors: ['#B9E8E0', '#F2DFBE', '#FFC189', '#F5AB99', '#F07A9A', '#FF7E5F', '#FEB47B', '#ff0066', '#eeaaee', '#55BF3B'],
    chart: {
      backgroundColor: 'rgba(255, 255, 255, 0.0)',
      style: {
        fontFamily: "'Unica One', sans-serif"
      },
      plotBorderColor: '#292b2c',
      selectionMarkerFill: 'rgba(255, 255, 255, 0.3)',
      resetZoomButton: {
        position: { x: 0, y: 1 },
        theme: {
          fill: 'rgba(60,61,68, 0.2)',
          stroke: '#4c8eff',
          style: { color: 'white' },
          states: { hover: { fill: 'rgb(60,61,60)', style: { color: 'white' } } }
        }
      }
    },
    global: {
      useUTC: false
    },
    title: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    subtitle: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase'
      }
    },
    xAxis: {
      // rotation: 0,
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        },
        rotation: 0
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    yAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
        style: {
          color: '#A0A0A3'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
        color: '#F0F0F0'
      }
    },
    plotOptions: {
      series: { dataLabels: { color: '#FFF' }, marker: { lineColor: '#333' } },
      scatter: { marker: { states: { hover: { lineColor: 'rgb(100,100,100)' } } } },
      boxplot: { fillColor: 'rgb(100,100,100)' },
      candlestick: { lineColor: 'white' },
      errorbar: { color: 'white' }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      maxHeight: 40,
      x: 0,
      y: 0,
      borderWidth: 1,
      borderRadius: 3,
      itemMarginTop: 2,
      padding: 5,
      navigation: { style: { color: '#FFFFFF' }, activeColor: '#039BD5' },
      itemStyle: { color: '#E0E0E3', fontWeight: 'normal' },
      itemHoverStyle: { color: '#FFF' },
      itemHiddenStyle: { color: '#606063' }
    },
    credits: { style: { color: '#666' } },
    labels: { style: { color: '#707073' } },
    drilldown: { activeAxisLabelStyle: { color: '#F0F0F3' }, activeDataLabelStyle: { color: '#F0F0F3' } },
    navigation: { buttonOptions: { symbolStroke: '#DDDDDD', theme: { fill: '#505053' } } },

    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
          color: '#CCC'
        },
        states: {
          // hover: {
          //   fill: '#707073',
          //   stroke: '#000000',
          //   style: {
          //     color: 'white'
          //   }
          // },
          // select: {
          //   fill: '#000003',
          //   stroke: '#000000',
          //   style: {
          //     color: 'white'
          //   }
          // }
        }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },

    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
        // color: '#7798BF',
        lineColor: '#A6C7ED'
      },
      xAxis: {
        gridLineColor: '#505053'
      }
    },

    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
    }

    // special colors for some of the
    // legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    // background2: '#505053',
    // dataLabelsColor: '#B0B0B3',
    // textColor: '#C0C0C0',
    // contrastTextColor: '#F0F0F3',
    // maskColor: 'rgba(255,255,255,0.3)'
  };

  constructor() {
    Highcharts.setOptions(this.theme);
    Highcharts['footerURL'] = 'aa';
  }
}

declare module 'highcharts' {
  // interface Options {
  interface ChartResetZoomButtonThemeOptions {
    fill: Highcharts.ColorString;
    stroke: Highcharts.ColorString;
    style: Highcharts.CSSObject;
    // states: Highcharts.CSSObject;
  }
  // }

  interface SVGAttributes {
    states: Highcharts.CSSObject;
  }
}

[![Build Status](https://travis-ci.com/briankpw/pixie-highcharts.svg?branch=master)](https://travis-ci.com/briankpw/pixie-highcharts)
[![npm version](https://badge.fury.io/js/pixie-highcharts.svg)](https://badge.fury.io/js/pixie-highcharts)
[![Downloads](https://img.shields.io/npm/dt/pixie-highcharts.svg)](https://www.npmjs.com/package/pixie-highcharts)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbriankpw%2Fpixie-highcharts.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbriankpw%2Fpixie-highcharts?ref=badge_shield)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/briankpw)

# Pixie Highcharts

`pixie-highcharts` is a wrapper of the `highcharts` and apply two-way data-binding of the option like series, tooltip, color, xAxis, yAxis, navigator, range selector, and etc. `pixie-highcharts` is breaking down the option into data, type, xAxis, colors, navigator, tooltips as Input and events as EventEmitter. Its use to avoid any additional logic and make your life easy just input and visualize. `pixie-highcharts` support for dynamic manipulations, event action and provides developer access to the original chart object.

## Table of Contents

- [Installation](#installation)
- [Environment](#environment)
- [Getting started](#getting-started)
  - [Setup App @NgModule](#setup-app-ngmodule)
- [Options](#options)
- [Events](#events)
  - [Chart Events](#chart-events)
  - [Series Events](#series-events)
  - [Point Events](#point-events)
  - [Axis Events](#axis-events)
  - [ColorAxis Events](#coloraxis-events)
  - [Navigation Events](#navigation-events)
- [Members](#members)
- [Global Variable and Class for Pixie Highcharts](#global-variable-and-class-for-pixie-highcharts)
  - [GlobalPXH](#globalpxh)
  - [Export](#export)
  - [Title](#title)
- [Highstock](#highstock)
- [Highmaps](#highmaps)
- [Highcharts Static API](#highcharts-static-api)
- [Contributing](#contributing)
- [License](#license)

## Installation

NPM

```bash
npm install pixie-highcharts highcharts --save
```

Yarn

```bash
yarn add pixie-highcharts highcharts
```

## Environment

Minimum Software Version Requirement

- node v6.16.0+
- npm 4.6.1+
- @angular/cli 1.7.6+

## Getting started

### Setup App @NgModule

Import PixieHighchartsModule into your @NgModule in app.module.ts

```javascript typescript
// File: app.module.ts
import { PixieHighchartsModule } from 'pixie-highcharts';

@NgModule({
  imports: [PixieHighchartsModule.forRoot(require('highcharts'))]
})
export class AppModule {}
```

Let Start With Basis Hello World's Highcharts Visualization

📈 [Hello World Demo](https://codesandbox.io/s/0xrm47jvw0?codemirror=1&fontsize=14)

HTML

```html
<pixie-highcharts
  [type]="type"
  [zoomType]="zoomType"
  [data]="data"
  [xAxis]="xAxis"
  [yAxis]="yAxis"
  [footer]="footer"
  [colors]="color"
  [tooltip]="tooltip"
  [export]="exporting"
  [config]="config"
  [isStacked]="true"
>
</pixie-highcharts>
```

TypeScript

```ts
export class AppComponent {
  type = 'bar';
  zoomType = 'x';
  data = [
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
  xAxis = { title: { text: 'Sample X-Axis' }, type: 'category' };
  yAxis = { title: { text: 'Sample Y-Axis' } };
  footer = 'Sample Footer';
  color = ['rgb(0, 255, 255)', 'rgb(246, 107, 0)', 'rgb(115, 211, 44)', 'rgb(227, 2, 42)', 'rgb(23,119,25)'];
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
  exporting = { title: 'Volume', filename: 'Volume', scale: 3 };
  config = { legend: { borderWidth: 0, borderRadius: 0, itemMarginTop: 0, padding: 0 } };
}
```

📊 [Live Demo](https://codesandbox.io/s/jv3r0lr6k5?autoresize=1&codemirror=1&fontsize=14)

## Options

| Input           |      Class      | Default Value    | Reference                                                                                        |
| --------------- | :-------------: | ---------------- | ------------------------------------------------------------------------------------------------ |
| id              |     String      |                  | 5 Digit of ID will generated if no Input                                                         |
| type            |     String      |                  | [chart.type](https://api.highcharts.com/highcharts/chart.type)                                   |
| zoomType        |     String      |                  | [chart.zoomType](https://api.highcharts.com/highcharts/chart.zoomType)                           |
| title           |     Object      |                  |                                                                                                  |
| xAxis           |     Object      |                  | [xAxis](https://api.highcharts.com/highcharts/xAxis)                                             |
| yAxis           |     Object      |                  | [yAxis](https://api.highcharts.com/highcharts/yAxis)                                             |
| zAxis           |     Object      |                  | [zAxis](https://api.highcharts.com/highcharts/zAxis)                                             |
| tooltip         |     Object      |                  | [tooltip](https://api.highcharts.com/highcharts/tooltip)                                         |
| export          |     Export      |                  |                                                                                                  |
| colors          | Array`<String>` |                  |                                                                                                  |
| colorAxis       |     Object      |                  | [colorAxis](https://api.highcharts.com/highcharts/colorAxis)                                     |
| footer          |     String      |                  |                                                                                                  |
| data            |  Array`<any>`   |                  | [series](https://api.highcharts.com/highcharts/series)                                           |
| config          |     Object      |                  | Additional Highcharts Option/Object not exist in Pixie Highcharts                                |
| isLegend        |     Boolean     | True             | T-Enable Legend, F-Disable Legend                                                                |
| isUTC           |     Boolean     | False            | T-UTC+[Based on Browser UTC], F-UTC+0                                                            |
| isPolar         |     Boolean     | False            | T-Polar Shape like Radar                                                                         |
| isBoost         |     Boolean     | False            | T-Boost the Chart                                                                                |
| isBoostDebug    |     Boolean     | False            | T-Debug of the boost mode [boost.debug](https://api.highcharts.com/highcharts/boost.debug)       |
| isTooltipMoved  |     Boolean     | True             | T-Tooltip Will Move Based on the Cursor                                                          |
| isAnimation     |     Boolean     | True             | T-Animation will Animate (Load & Update)                                                         |
| isGap           |     Boolean     | True             | T-Gap Size Between Each Point : Display a Gap in the Graph                                       |
| gapSize         |     Number      | 86400000 @ 1 Day | Day-To-Day Disconnected                                                                          |
| gapUnit         |     String      | value            |                                                                                                  |
| isPointRange    |     Boolean     | False            | T-Each Point Wont Have the Hours Based on pointRange Set                                         |
| pointRange      |     Number      | 86400000 @ 1 Day | Day-To-Day Connected                                                                             |
| isAxisPrefix    |     Boolean     | False            | T-Active [Conversation Metric Prefix Table](http://www.nanotech-now.com/metric-prefix-table.htm) |
| axisPrefixFloat |     Number      | 2                |                                                                                                  |
| isStock         |     Boolean     | False            | T-Enable Stock Chart `Highstock is required`                                                     |
| isMap           |     Boolean     | False            | T-Enable Map Chart `Highmaps or map module is required`                                          |
| isStacked       |     Boolean     | False            | T-Enable Stack Chart for Bar, Column, Line, etc                                                  |
| isGroup         |     Boolean     | False            | T-Enable Group Chart for Bar, Column, Line, etc                                                  |
| rangeSelector   |     Object      |                  | [rangeSelector](https://api.highcharts.com/highstock/rangeSelector)                              |
| isRangeSelector |     Boolean     | True             | T-Enable Range Selector, F-Disable Range Selector                                                |
| isRangeInput    |     Boolean     | False            | T-Enable Range Input, F-Disable Range Input                                                      |
| navigator       |     Object      |                  | [navigator](https://api.highcharts.com/highstock/navigator)                                      |
| navigatorData   |     Object      |                  | [navigator.series](https://api.highcharts.com/highstock/navigator.series)                        |
| isXScrollbar    |     Boolean     | False            | T-Enable xAxis Scrollbar, F-Disable xAxis Scrollbar                                              |
| isYScrollbar    |     Boolean     | False            | T-Enable yAxis Scrollbar, F-Disable yAxis Scrollbar                                              |
| referenceUpdate |     Boolean     | False            | T-Enable Options Update, F-New Options Object Created when Update                                |

## Events

Highcharts provides bunch of events, and you can use `option` method to handle those events, but it is not common angular way to handle events. So that pixie-highcharts provides `EventEmitter<ChartEvent>` wrappers for highcharts events.
ChartEvent is an class which simply wraps original Highcharts events (`chartEvent.originalEvent`) and adds event handler context (`chartEvent.context`) since it differs depending on events. Concept of Handling events is learning from [angular2-highcharts](https://www.npmjs.com/package/angular2-highcharts#handling-events) and enhancement made in pixie-highcharts. Thanks for angular2-highcharts founder.

### Chart Events

All the events from the [chart.events](http://api.highcharts.com/highcharts#chart.events) are available as output properties of the `chart` component.

```html
<pixie-highcharts (selection)="onChartSelection($event)"></pixie-highcharts>

<p>Selection area from <b>{{from}}</b> to <b>{{to}}</b></p>
```

```ts
onChartSelection (e) {
  this.from = e.originalEvent.xAxis[0].min.toFixed(2);
  this.to = e.originalEvent.xAxis[0].max.toFixed(2);
}
```

📊 [Live Demo](https://codesandbox.io/s/py25qzv86q?codemirror=1&fontsize=14)

### Series Events

To use series events the same way you need to add the `series` component as a child of your pixie-highcharts.
The only purpose of this auxiliary component is to provide access to [plotOptions.series.events](http://api.highcharts.com/highcharts/plotOptions.series.events) API

```html
<pixie-highcharts>
  <series (legendItemClick)="onLegendClick($event)"></series>
</pixie-highcharts>
<p><b>{{serieName}}</b> is clicked</p>
```

```ts
onLegendClick (e) {
  this.serieName = e.context.name;
}
```

📊 [Live Demo](https://codesandbox.io/s/01plyp30o0?autoresize=1&fontsize=14)

### Point Events

Similary you can use the `point` to access to [plotOptions.series.point.events](http://api.highcharts.com/highcharts#plotOptions.series.point.events) API.

```html
<pixie-highcharts>
  <series>
    <point (click)="onPointClick($event)"></point>
  </series>
</pixie-highcharts>
<p><b>{{point}}</b> is clicked</p>
```

📊 [Live Demo](https://codesandbox.io/s/kk650l0qyv?codemirror=1&fontsize=14)

### Axis Events

Similary you can use the `xAxis` or `yAxis` or `zAxis` to access to [xAxis.events](http://api.highcharts.com/highcharts/xAxis.events) or [yAxis.events](http://api.highcharts.com/highcharts/yAxis.events) or [zAxis.events](http://api.highcharts.com/highcharts/zAxis.events) API.

```html
<pixie-highcharts>
  <xAxis (afterSetExtremes)="onAfterSetExtremesX($event)"></xAxis>
  <yAxis (afterSetExtremes)="onAfterSetExtremesY($event)"></yAxis>
  <zAxis (afterSetExtremes)="onAfterSetExtremesZ($event)"></zAxis>
</pixie-highcharts>
<p>ExtremesX: <b>{{minX}}</b> - <b>{{maxX}}</b></p>
<p>ExtremesY: <b>{{minY}}</b> - <b>{{maxY}}</b></p>
<p>ExtremesZ: <b>{{minZ}}</b> - <b>{{maxZ}}</b></p>
```

```ts
onAfterSetExtremesX (e) {
  this.minX = e.context.min;
  this.maxX = e.context.max;
}

onAfterSetExtremesY (e) {
  this.minY = e.context.min;
  this.maxY = e.context.max;
}

onAfterSetExtremesZ (e) {
  this.minZ = e.context.min;
  this.maxZ = e.context.max;
}
```

📊 [Live Demo](https://codesandbox.io/s/vj91625085?codemirror=1&fontsize=14)

### ColorAxis Events

Similary you can use the `colorAxis` to access to [colorAxis.events](https://api.highcharts.com/highcharts/colorAxis.events) API.

```html
<pixie-highcharts>
  <colorAxis (legendItemClick)="onLegendClick($event)"></colorAxis>
</pixie-highcharts>
<p><b>{{colorLegend}}</b> is clicked</p>
```

📊 [Live Demo](https://codesandbox.io/s/qvoo281qm6?autoresize=1&fontsize=14)

### Navigation Events

Similary you can use the `navigation` to access to [navigation.events](https://api.highcharts.com/highcharts/navigation.events) API.

## Members

Chart instance. You can call load methods to get the instance. [Highcharts.Chart](https://api.highcharts.com/class-reference/Highcharts.Chart)

```html
<pixie-highcharts (load)="onLoad($event)"> </pixie-highcharts>
```

```ts
onLoad (e) {
  this.chartInstance = e;
}
```

📊 [Live Demo](https://codesandbox.io/s/ryqkz1vky4?autoresize=1&fontsize=14)

## Localization

Currently, highcharts doesn't provide localization for the language you wish to display.
Right now, `pixie-highcharts` supporting localization.

```ts
import { LocaleService } from 'pixie-highcharts';

export class Component implements OnInit {
  constructor(private localeService: LocaleService) {
    this.localeService.setLocale('zh');
  }
}
```

Current word support for localization is `resetZoom`, `noDataAvailable`, `months[]`, `shortMonths[]`, `weekdays[]` in [Localization File](https://github.com/briankpw/pixie-highcharts/blob/master/lib/src/pixie-highcharts/lib/locale.service.ts)

## Global Variable and Class for Pixie Highcharts

For normal way to generate highcharts visualization, you required to declare style, tooltips, exporting, datetime format, and url again and again for the options.
For `pixie-highcharts` you no need to declare repeatedly.

```ts
import * as hc from 'highcharts';
// OR
const hc = require('highcharts');
```

```ts
const globalPXH: GlobalPXH = {};
const exportPXH: Export = {};

// Declare Global Variable for Each COnfig
exportPXH.theme = {
  chart: {
    backgroundColor: '#23232A',
    spacingTop: 10,
    style: { fontFamily: 'Arial', color: '##FFF' }
  }
};
exportPXH.filename = 'Pixie Highcharts';
globalPXH.export = exportPXH;

globalPXH.url = 'https://github.com/briankpw/pixie-highcharts';
globalPXH.debug = true;

// Assign globalPXH to Highcharts
hc.globalPXH = globalPXH;
```

### GlobalPXH

| Input                 |  Class  | Default Value           | Reference                                                                                      |
| --------------------- | :-----: | ----------------------- | ---------------------------------------------------------------------------------------------- |
| standardTooltipDesign | Object  | `Below defaultTooltip`  |                                                                                                |
| dateTimeLabelFormats  | Object  | `Below defaultDateTime` | [xAxis.dateTimeLabelFormats](https://api.highcharts.com/highcharts/xAxis.dateTimeLabelFormats) |
| sameLegendSymbol      | Boolean | False                   | T-All legend will fixed column legend symbol                                                   |
| legendPosition        | String  | top                     | [legend.verticalAlign](https://api.highcharts.com/highcharts/legend.verticalAlign)             |
| url                   | String  |                         | Footer URL                                                                                     |
| export                | Export  |                         | [Export](#export)                                                                              |
| debug                 | Boolean | False                   | T-Turn on Debug (View compile options, error, and etc)                                         |
| debugStringify        | Boolean | False                   | T-Turn on Debug with stringify output                                                          |

```ts
const defaultTooltip = {
  headerFormat: '<span style="font-size:10px">{point.key}</span><table style="margin-bottom:unset">',
  pointFormat:
    '<tr><td style="color:{series.color};padding:0">{series.name}</td>' +
    '<td style="padding:0"> : </td>' +
    '<td style="padding:0"><b>{point.y}</b></td></tr>',
  footerFormat: '</table>',
  useHTML: true
};

const defaultDateTime = {
  millisecond: '%H:%M:%S.%L',
  second: '%H:%M:%S',
  minute: '%H:%M',
  hour: '%H:%M',
  day: '%b %e',
  week: '%b %e',
  month: '%b, %y',
  year: '%y'
};
```

### Export

| Input                  |  Class  | Default Value | Reference                                                                              |
| ---------------------- | :-----: | ------------- | -------------------------------------------------------------------------------------- |
| title                  | String  |               | Export title if `null`, default chart title will be consider                           |
| subtitle               | String  |               | Export subtitle if `null`, default chart title will be consider                        |
| filename               | String  |               |                                                                                        |
| width                  | Number  | 600           | [exporting.sourceWidth](https://api.highcharts.com/highcharts/exporting.sourceWidth)   |
| height                 | Number  | 800           | [exporting.sourceHeight](https://api.highcharts.com/highcharts/exporting.sourceHeight) |
| scale                  | Number  |               | Automated adjust export resolution for image and pdf                                   |
| url                    | String  |               | [exporting.url](https://api.highcharts.com/highcharts/exporting.url)                   |
| theme                  | Object  |               | [exporting.chartOptions](https://api.highcharts.com/highcharts/exporting.chartOptions) |
| enabled                | Boolean | True          | T-Turn on exporting button                                                             |
| fallbackToExportServer | Boolean | True          | T-Fallback to export server if offline exporting failure                               |
| customExport           | Boolean | False         | Flag for custom Highcharts event, function, any (Custom Script)                        |
| clearDefaultField      | Boolean | False         | Flag for clear default series rows/columns data (Custom Script)                        |

### Title

| Input    | Class  |
| -------- | :----: |
| title    | String |
| subtitle | String |

## Highstock

```html
<pixie-highcharts [isStock]="true"></pixie-highcharts>
```

Don't forget, You need to update @NgModule in app.module.ts

```javascript typescript
// File: app.module.ts
...
@NgModule({
  imports: [
    PixieHighchartsModule.forRoot(
    require('highcharts'),
    require('highcharts/modules/stock'))
  ]
})
...
```

📊 [Live Demo](https://codesandbox.io/s/k37zjxl7nr?codemirror=1&fontsize=14)

## Highmaps

```html
<pixie-highcharts [isMap]="true"></pixie-highcharts>
```

Don't forget, You need to update @NgModule in app.module.ts

```javascript typescript
// File: app.module.ts
...
@NgModule({
  imports: [
    PixieHighchartsModule.forRoot(
    require('highcharts'),
    require('highcharts/modules/map'))
  ]
})
...
```

## Highcharts Static API

```javascript typescript
import { PixieHighchartsModule, HighchartsStatic } from 'pixie-highcharts';

...
export function highchartsFactory() {
  const hc = require('highcharts');
  const hs = require('highcharts/modules/stock');
  const exp = require('highcharts/modules/exporting');
  const expd = require('highcharts/modules/export-data');

  hs(hc);
  exp(hc);
  expd(hc);

  return hc;
}

...
@NgModule({
  imports: [PixieHighchartsModule],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ]
})
...
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/) @ Brian Koh Ping Weng

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fbriankpw%2Fpixie-highcharts.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fbriankpw%2Fpixie-highcharts?ref=badge_large)

<!--
[![Dependency Status](https://david-dm.org/briankpw/pixie-highcharts.svg)](https://david-dm.org/briankpw/pixie-highcharts)
[![devDependencies Status](https://david-dm.org/briankpw/pixie-highcharts/dev-status.svg)](https://david-dm.org/briankpw/pixie-highcharts?type=dev)
-->

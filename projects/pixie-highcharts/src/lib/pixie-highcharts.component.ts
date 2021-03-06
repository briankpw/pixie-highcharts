import { Component, ElementRef, Input, Output, ContentChild, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

import { Export, GlobalPXH } from './util/chart.model';
import { ChartSeriesComponent } from './util/chart-series.component';
import { ChartXAxisComponent } from './util/chart-xAxis.component';
import { ChartYAxisComponent } from './util/chart-yAxis.component';
import { ChartZAxisComponent } from './util/chart-zAxis.component';
import { ChartColorAxisComponent } from './util/chart-colorAxis.component';
import { ChartNavigationComponent } from './util/chart-navigation.component';
import { ChartEvent, Title } from './util/chart.model';

import { createBaseOpts } from './util/createBaseOpts';
import { deepAssign } from './util/deepAssign';
import { deepClone } from './util/deepClone';
import { prefixConversion } from './util/prefixConversion';
import { event } from './util/event';
import { config, exportConfig } from './util/config';

import { HighchartsService } from './util/highcharts.service';
import { LocaleService } from './util/locale.service';

@Component({
  selector: 'pixie-highcharts',
  templateUrl: './pixie-highcharts.component.html',
  styleUrls: ['./pixie-highcharts.component.scss'],
  providers: [HighchartsService, LocaleService]
})
export class PixieHighchartsComponent implements OnInit, OnChanges {
  @Input() id: string;
  @Input() type: string;
  @Input() zoomType: string;
  @Input() title: Title | object | any;
  @Input() xAxis: object | any;
  @Input() yAxis: object | any;
  @Input() zAxis: object | any;
  @Input() tooltip: object | any;
  @Input() export: Export;
  @Input() colors: Array<string>;
  @Input() colorAxis: object | any;
  @Input() footer: string;
  @Input() data: Array<any>;
  @Input() config: object | any;

  // #Tools
  // T-Show Legend
  @Input() isLegend: boolean = true;
  // T-UTC+[Current Timezone], F= UTC+0
  @Input() isUTC: boolean = false;
  // T-Polar Shape like Radar
  @Input() isPolar: boolean = false;
  // T-Boost the Chart
  @Input() isBoost: boolean = false;
  // T-Debug Boost Mode
  @Input() isBoostDebug: boolean = false;
  // T-Tooltip will be move based on the cursor
  @Input() isTooltipMoved: boolean = true;
  // T-Animation will Animate (Load & Update)
  @Input() isAnimation: boolean = true;
  // T-Disable Inactive State (When Hover on Series Point, Its Won't Disable The Point)
  @Input() isInactive: boolean = true;

  // T-Gap Size Between Each Point, Day2Day Disconnected: Display a gap in the graph
  @Input() isGap: boolean = false;
  @Input() gapSize: number = 1000 * 60 * 60 * 24;
  @Input() gapUnit: String = 'value';

  // T-Each Point Wont Have the Hours, Day2Day Connected: X axis range that each point is valid for
  @Input() isPointRange: boolean = false;
  @Input() pointRange: number = 1000 * 60 * 60 * 24;

  // T-Active the Y-Axis Prefix F-Dont Convert Legend
  @Input() isAxisPrefix: boolean = false;
  @Input() axisPrefixFloat: number = 2;

  // Plot Option
  @Input() isStock: boolean = false;
  @Input() isMap: boolean = false;
  @Input() isStacked: boolean = false;
  @Input() isGroup: boolean = false;

  // Highstock
  @Input() rangeSelector: object | any;
  @Input() isRangeSelector: boolean = true;
  @Input() isRangeInput: boolean = false;
  @Input() navigator: object | any;
  @Input() navigatorData: object;
  @Input() isXScrollbar: boolean = false;
  @Input() isYScrollbar: boolean = false;

  // Util
  @Input() referenceUpdate: boolean = false;

  // Event
  @Output() addSeries = new EventEmitter<ChartEvent>();
  @Output() afterPrint = new EventEmitter<ChartEvent>();
  @Output() beforePrint = new EventEmitter<ChartEvent>();
  @Output() chartClick = new EventEmitter<ChartEvent>();
  @Output() drilldown = new EventEmitter<ChartEvent>();
  @Output() drillup = new EventEmitter<ChartEvent>();
  @Output() drillupall = new EventEmitter<ChartEvent>();
  @Output() load = new EventEmitter<ChartEvent>();
  @Output() redraw = new EventEmitter<ChartEvent>();
  @Output() render = new EventEmitter<ChartEvent>();
  @Output() selection = new EventEmitter<ChartEvent>();

  @ContentChild(ChartSeriesComponent, { static: true }) chartSeriesComponent: ChartSeriesComponent;
  @ContentChild(ChartXAxisComponent, { static: true }) chartXAxisComponent: ChartXAxisComponent;
  @ContentChild(ChartYAxisComponent, { static: true }) chartYAxisComponent: ChartYAxisComponent;
  @ContentChild(ChartZAxisComponent, { static: true }) chartZAxisComponent: ChartZAxisComponent;
  @ContentChild(ChartColorAxisComponent, { static: true }) chartColorAxisComponent: ChartColorAxisComponent;
  @ContentChild(ChartNavigationComponent, { static: true }) chartNavigationComponent: ChartNavigationComponent;

  public Highcharts: any;
  public constructorType = 'chart';
  public options: any;
  public chart: any;
  public updateFlag: boolean = false;

  private element: ElementRef;
  private globalPXH: GlobalPXH;

  constructor(element: ElementRef, highchartsService: HighchartsService, localeService: LocaleService) {
    this.element = element;
    this.Highcharts = highchartsService.getHighchartsStatic();
    this.initConfiguration();
    this.localeInit(localeService.getCurrentLocale());

    localeService.getLocale().subscribe((d) => {
      this.localeInit(d);
    });
  }

  async ngOnInit() {
    this.initCustomHighCharts();
    const opts: any = this.plotOptionConfigure();
    opts.exporting = this.exportingConfigure(this.export);

    if (this.id === undefined) {
      this.id = this.generateID();
    }
    if (this.type !== undefined) {
      // Type : column(Vertical Bar), bar(Horizontal Bar), line, area, pie, scatter and etc.
      opts.chart = {};
      opts.chart.type = this.type;
    } else {
      opts.chart = {};
      opts.chart.type = 'line';
      this.type = 'line';
    }

    if (this.isPolar) {
      opts.chart.polar = true;
    }

    // opts.chart.panning = true;
    opts.chart.panKey = 'ctrl';

    if (this.isStock) {
      this.constructorType = 'stockChart';
      opts.chart.spacingTop = 5;
      // Adjust the title between navigator
      if (this.xAxis !== undefined) {
        if (this.xAxis.hasOwnProperty('title')) {
          opts.chart.marginBottom = 30;
        } else {
          opts.chart.marginBottom = 20;
        }
      } else {
        opts.chart.marginBottom = 20;
      }

      if (this.rangeSelector !== undefined) {
        opts.rangeSelector = this.rangeSelector;
      } else {
        opts.rangeSelector = {};
      }

      if (!this.isRangeSelector) {
        opts.rangeSelector.enabled = false;
      } else {
        // Disable validateSeries due to Highcharts Bug is Reference Out of the Pixie Highcharts Reference.
        opts.rangeSelector.enabled = this.isRangeSelector;
        // if (this.data !== undefined && this.data.length) {
        //   opts.rangeSelector.enabled = true;
        // } else {
        //   opts.rangeSelector.enabled = false;
        // }
      }

      if (!this.isRangeInput) {
        opts.rangeSelector.inputEnabled = false;
      }

      if (this.navigator !== undefined) {
        opts.navigator = this.navigator;
        if (!this.navigator.hasOwnProperty('height')) {
          opts.navigator.height = 20;
        }

        if (this.navigatorData !== undefined) {
          opts.navigator.series = this.navigatorData;
        }
      } else {
        opts.navigator = {};
        opts.navigator.height = 20;

        if (this.navigatorData !== undefined) {
          opts.navigator.series = this.navigatorData;
        }
      }
    }

    if (this.isMap) {
      this.constructorType = 'mapChart';
    }

    if (!this.isAnimation) {
      opts.chart.animation = false;
    }

    if (this.isBoost) {
      opts.chart.animation = false;
      opts.boost = {};
      opts.boost.enabled = true;
      // opts.boost.useGPUTranslations = true;
      // opts.boost.usePreallocated = true;

      if (this.isBoostDebug) {
        opts.boost.debug = {};
        opts.boost.debug.showSkipSummary = true;
        opts.boost.debug.timeBufferCopy = true;
        opts.boost.debug.timeKDTree = true;
        opts.boost.debug.timeRendering = true;
        opts.boost.debug.timeSeriesProcessing = true;
        opts.boost.debug.timeSetup = true;
      }
    } else {
      opts.boost = {};
      opts.boost.enabled = false;
    }

    if (this.title !== undefined) {
      if (this.title.title !== undefined) {
        opts.title = {};
        opts.title.text = this.title.title;
      } else {
        opts.title = {};
        opts.title.text = null;
        opts.title.floating = true;
      }
      if (this.title.subtitle !== undefined) {
        opts.subtitle = {};
        opts.subtitle.text = this.title.subtitle;
      } else {
        opts.subtitle = {};
        opts.subtitle.text = null;
      }
    } else {
      opts.title = {};
      opts.title.text = null;
      opts.subtitle = {};
      opts.subtitle.text = null;
    }

    if (this.zoomType !== undefined) {
      // X Y XY
      opts.chart.zoomType = this.zoomType;
    }

    if (this.data !== undefined) {
      opts.series = this.data;
    }

    if (this.xAxis !== undefined) {
      if (Array.isArray(this.xAxis)) {
        opts.xAxis = [];
        this.xAxis.forEach((d) => {
          if (!d.hasOwnProperty('title')) {
            d.title = {};
            d.title.text = null;
          }

          if (d.hasOwnProperty('type')) {
            if (d.type === 'datetime') {
              if (!d.hasOwnProperty('dateTimeLabelFormats')) {
                d.dateTimeLabelFormats = this.globalPXH.dateTimeLabelFormats;
              }
            }
          }
          opts.xAxis.push(d);
        });
      } else {
        opts.xAxis = this.xAxis;
        if (!this.xAxis.hasOwnProperty('title')) {
          opts.xAxis.title = {};
          opts.xAxis.title.text = null;
        }

        if (this.xAxis.hasOwnProperty('type')) {
          if (this.xAxis.type === 'datetime') {
            if (!this.xAxis.hasOwnProperty('dateTimeLabelFormats')) {
              this.xAxis.dateTimeLabelFormats = this.globalPXH.dateTimeLabelFormats;
            }
          }
        }
      }
    } else {
      opts.xAxis = {};
      opts.xAxis.title = {};
      opts.xAxis.title.text = null;
    }

    const axisFloat = this.axisPrefixFloat;
    if (this.yAxis !== undefined) {
      if (Array.isArray(this.yAxis)) {
        opts.yAxis = [];
        this.yAxis.forEach((d) => {
          if (!d.hasOwnProperty('title')) {
            d.title = {};
            d.title.text = null;
          }

          if (this.isAxisPrefix) {
            if (!d.hasOwnProperty('labels')) {
              d.labels = {};
            }
            d.labels.formatter = function () {
              return prefixConversion(this.value, axisFloat);
            };
          }
          opts.yAxis.push(d);
        });
      } else {
        opts.yAxis = this.yAxis;

        if (this.isAxisPrefix) {
          if (!opts.yAxis.hasOwnProperty('labels')) {
            opts.yAxis.labels = {};
          }

          opts.yAxis.labels.formatter = function () {
            return prefixConversion(this.value, axisFloat);
          };
        }

        if (!this.yAxis.hasOwnProperty('title')) {
          opts.yAxis.title = {};
          opts.yAxis.title.text = null;
        }
      }
    } else {
      opts.yAxis = {};

      if (this.isAxisPrefix) {
        opts.yAxis.labels = {};
        opts.yAxis.labels.formatter = function () {
          return prefixConversion(this.value, axisFloat);
        };
      }

      opts.yAxis.title = {};
      opts.yAxis.title.text = null;
    }

    if (this.zAxis !== undefined) {
      opts.zAxis = this.zAxis;
    }

    opts.time = {};
    opts.time.useUTC = !this.isUTC;

    if (this.colors !== undefined) {
      opts.colors = this.colors;
    }

    if (this.colorAxis !== undefined) {
      opts.colorAxis = this.colorAxis;
    }

    if (this.tooltip !== undefined) {
      opts.tooltip = this.tooltip;
      opts.tooltip.followPointer = true;
    } else {
      opts.tooltip = this.globalPXH.standardTooltipDesign;
      opts.tooltip.followPointer = true;
    }

    if (this.isStock) {
      opts.tooltip.split = false;
    }

    if (this.isTooltipMoved) {
      opts.tooltip.positioner = function (labelWidth, labelHeight, point) {
        const leftHalf = point.plotX < this.chart.plotWidth / 2;
        return {
          x: leftHalf ? this.chart.plotLeft + this.chart.plotWidth - labelWidth : this.chart.plotLeft,
          y: 1
        };
      };
    } else {
      opts.tooltip.positioner = function () {
        return { x: 1, y: 1 };
      };
    }

    if (this.footer !== undefined) {
      opts.credits = {};
      opts.credits.text = this.footer;
      opts.credits.href = this.globalPXH.url;
    } else {
      opts.credits = {};
      opts.credits.enabled = false;
    }

    if (this.isLegend) {
      opts.legend = {};
      opts.legend.verticalAlign = this.globalPXH.legendPosition;
      if (this.globalPXH.legendPosition === 'top') {
        opts.chart.spacingTop = 0;
      }
    } else {
      opts.legend = {};
      opts.legend.enabled = false;
    }

    opts.drilldown = {};
    opts.drilldown.series = [];
    if (!this.isAnimation) {
      opts.drilldown.animation = false;
    }
    opts.drilldown.drillUpButton = {};
    opts.drilldown.drillUpButton.relativeTo = 'chart';

    if (this.config !== undefined) {
      const allKey = Object.keys(this.config);
      for (const key of allKey) {
        opts[key] = deepAssign({}, opts[key], this.config[key]);
      }
    }

    const eventOption = createBaseOpts(
      this,
      this.chartSeriesComponent,
      this.chartSeriesComponent ? this.chartSeriesComponent.point : null,
      this.chartXAxisComponent,
      this.chartYAxisComponent,
      this.chartZAxisComponent,
      this.chartColorAxisComponent,
      this.chartNavigationComponent,
      this.element.nativeElement
    );

    this.options = deepAssign({}, opts, eventOption);

    /**  #Highcharts Bugs-Getting rid of the time section from the initial options resolves the problem
     * default: useUTC:true: UTC+0 else useUTC:false, timezone
     * This solution will double update
     */
    // setTimeout(() => {
    //   this.options.time = {};
    //   this.options.time.useUTC = !this.isUTC;
    //   this.updateFlag = true;
    // }, 100);

    if (this.globalPXH.debug) {
      console.log(`---${this.type}#${this.id}---`);
      console.log('Option: ', this.options);
    }
    if (this.globalPXH.debugStringify) {
      console.log('Option [S]: ', JSON.stringify(this.options));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      if (this.globalPXH.debug) {
        console.log(`---${this.type}#${this.id}---`);
        console.log('Changes: ', changes);
      }
      if (this.globalPXH.debugStringify) {
        console.log('Changes [S]: ', JSON.stringify(changes));
      }

      let redraw: boolean = false;
      const updateOption: any = this.referenceUpdate ? this.options : {};

      if (changes.type !== undefined && !changes.type.firstChange) {
        if (!updateOption.hasOwnProperty('chart')) {
          updateOption.chart = {};
        }
        updateOption.chart.type = changes.type.currentValue;
        redraw = true;
      }

      if (changes.zoomType !== undefined && !changes.zoomType.firstChange) {
        if (!updateOption.hasOwnProperty('chart')) {
          updateOption.chart = {};
        }
        updateOption.chart.zoomType = changes.zoomType.currentValue;
        redraw = true;
      }

      if (changes.data !== undefined && !changes.data.firstChange) {
        updateOption.series = changes.data.currentValue;
        redraw = true;
      }

      if (changes.title !== undefined && !changes.title.firstChange) {
        const title = { title: { text: null }, subtitle: { text: null } };
        if (changes.title.currentValue.hasOwnProperty('title')) {
          title.title.text = changes.title.currentValue.title;
        }

        if (changes.title.currentValue.hasOwnProperty('subtitle')) {
          title.subtitle.text = changes.title.currentValue.subtitle;
        }
        updateOption.title = title.title;
        updateOption.subtitle = title.subtitle;
        redraw = true;
      }

      if (changes.xAxis !== undefined && !changes.xAxis.firstChange) {
        updateOption.xAxis = changes.xAxis.currentValue;
        redraw = true;
      }

      if (changes.yAxis !== undefined && !changes.yAxis.firstChange) {
        updateOption.yAxis = changes.yAxis.currentValue;
        redraw = true;
      }

      if (changes.zAxis !== undefined && !changes.zAxis.firstChange) {
        updateOption.zAxis = changes.zAxis.currentValue;
        redraw = true;
      }

      if (changes.tooltip !== undefined && !changes.tooltip.firstChange) {
        updateOption.tooltip = changes.tooltip.currentValue;
        redraw = true;
      }

      if (changes.footer !== undefined && !changes.footer.firstChange) {
        updateOption.credits = { text: changes.footer.currentValue };
        redraw = true;
      }

      if (changes.colors !== undefined && !changes.colors.firstChange) {
        updateOption.colors = changes.colors.currentValue;
        redraw = true;
      }

      if (changes.colorAxis !== undefined && !changes.colorAxis.firstChange) {
        updateOption.colorAxis = changes.colorAxis.currentValue;
        redraw = true;
      }

      if (changes.navigator !== undefined && !changes.navigator.firstChange) {
        const navigator: any = changes.navigator.currentValue;
        if (!navigator.hasOwnProperty('height')) {
          navigator.height = 20;
        }
        updateOption.navigator = navigator;
        redraw = true;
      }

      if (changes.navigatorData !== undefined && !changes.navigatorData.firstChange) {
        if (!updateOption.hasOwnProperty('navigator')) {
          updateOption.navigator = {};
        }
        updateOption.navigator.series = changes.navigatorData.currentValue;
        redraw = true;
      }

      if (changes.isLegend !== undefined && !changes.isLegend.firstChange) {
        if (!updateOption.hasOwnProperty('chart')) {
          updateOption.chart = {};
        }

        if (changes.isLegend.currentValue) {
          updateOption.chart.spacingTop = 10;
        } else {
          updateOption.chart.spacingTop = 0;
        }

        updateOption.legend = {};
        updateOption.legend.enabled = changes.isLegend.currentValue;
        redraw = true;
      }

      if (changes.isUTC !== undefined && !changes.isUTC.firstChange) {
        updateOption.time = {};
        updateOption.time.useUTC = !changes.isUTC.currentValue;
        redraw = true;
      }

      if (
        (changes.isAxisPrefix !== undefined && !changes.isAxisPrefix.firstChange) ||
        (changes.axisPrefixFloat !== undefined && !changes.axisPrefixFloat.firstChange)
      ) {
        const axisFloat = this.axisPrefixFloat;
        if (this.isAxisPrefix) {
          this.complexOptionAssignment(updateOption, 'yAxis', {
            labels: {
              formatter: function () {
                return prefixConversion(this.value, axisFloat);
              }
            }
          });
        } else {
          this.complexOptionAssignment(updateOption, 'yAxis', { labels: { formatter: undefined } });
        }

        redraw = true;
      }

      // #plotOption - Redraw
      if (
        (changes.isStacked !== undefined && !changes.isStacked.firstChange) ||
        (changes.isGroup !== undefined && !changes.isGroup.firstChange) ||
        (changes.isPointRange !== undefined && !changes.isPointRange.firstChange) ||
        (changes.isGap !== undefined && !changes.isGap.firstChange) ||
        (changes.isBoost !== undefined && !changes.isBoost.firstChange) ||
        (changes.isAnimation !== undefined && !changes.isAnimation.firstChange)
      ) {
        updateOption.plotOptions = this.plotOptionConfigure(true).plotOptions;
        redraw = true;
      }

      if (changes.export !== undefined && !changes.export.firstChange) {
        updateOption.exporting = this.exportingConfigure(changes.export.currentValue, true);
        redraw = true;
      }

      // #Stock
      if (changes.isRangeSelector !== undefined && !changes.isRangeSelector.firstChange) {
        if (!updateOption.hasOwnProperty('rangeSelector')) {
          updateOption.rangeSelector = {};
        }

        updateOption.rangeSelector.enabled = changes.isRangeSelector.currentValue;
        redraw = true;
      }

      if (changes.isRangeInput !== undefined && !changes.isRangeInput.firstChange) {
        if (!updateOption.hasOwnProperty('rangeSelector')) {
          updateOption.rangeSelector = {};
        }

        updateOption.rangeSelector.inputEnabled = changes.isRangeInput.currentValue;
        redraw = true;
      }

      if (changes.config !== undefined && !changes.config.firstChange) {
        const allKey = Object.keys(changes.config.currentValue);
        for (const key of allKey) {
          updateOption[key] = deepAssign({}, updateOption[key], changes.config.currentValue[key]);
        }
        redraw = true;
      }

      if (
        (changes.isXScrollbar !== undefined && !changes.isXScrollbar.firstChange) ||
        (changes.isYScrollbar !== undefined && !changes.isYScrollbar.firstChange)
      ) {
        event.removeMouseWheel(this.chart);

        if (this.isXScrollbar) {
          event.addXScrollMouseWheel(this.chart);
        }

        if (this.isYScrollbar) {
          event.addYScrollMouseWheel(this.chart);
        }
      }

      // # Data Validation
      if (redraw) {
        // Disable validateSeries due to Highcharts Bug is Reference Out of the Pixie Highcharts Reference.
        // this.validateSeries(updateOption);
        // redraw = true;
      }

      if (redraw) {
        this.options = updateOption;
        this.updateFlag = redraw;

        if (this.globalPXH.debug) {
          console.log(`---${this.type}#${this.id}---`);
          console.log('Updated: ', updateOption);
        }
        if (this.globalPXH.debugStringify) {
          console.log('Updated [S]: ', JSON.stringify(updateOption));
        }
      }
    } catch (e) {
      console.log(`---${this.type}#${this.id}---`);
      console.log('Change Error: ', e);
      if (this.globalPXH.debug) {
        console.log(e);
      }
    }
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
    this.load.emit(chartInstance);

    if (this.isXScrollbar) {
      event.addXScrollMouseWheel(this.chart);
    }

    if (this.isYScrollbar) {
      event.addYScrollMouseWheel(this.chart);
    }
  }

  plotOptionConfigure(update = false) {
    let markerSymbol;
    if (this.globalPXH.sameLegendSymbol) {
      markerSymbol = 'circle';
    }

    const standard = {
      plotOptions: {
        series: {},
        bar: { grouping: false, groupPadding: 0, pointPadding: 0.2, borderWidth: 0, turboThreshold: 0 },
        column: { grouping: false, groupPadding: 0, pointPadding: 0.2, borderWidth: 0, turboThreshold: 0 },
        line: { marker: { symbol: markerSymbol }, turboThreshold: 0 },
        spline: { marker: { symbol: markerSymbol }, turboThreshold: 0 },
        area: { marker: { symbol: markerSymbol }, turboThreshold: 0 },
        boxplot: { turboThreshold: 0 },
        pie: { allowPointSelect: true, cursor: 'pointer', dataLabels: { enabled: false }, showInLegend: true },
        scatter: {
          marker: { symbol: markerSymbol, radius: 2, states: { hover: { enabled: true } } },
          states: { hover: { marker: { enabled: false } } },
          turboThreshold: 0,
          stickyTracking: false
        }
      }
    };

    const combination = { plotOptions: { bar: { stacking: 'normal' }, column: { stacking: 'normal' } } };
    const group = { plotOptions: { bar: { grouping: true }, column: { grouping: true } } };

    let plotOption: any = { plotOptions: {} };
    if (!update) {
      plotOption = standard;
    } else {
      plotOption.plotOptions[this.type] = {};
    }

    if (this.isStacked) {
      plotOption = deepAssign({}, plotOption, combination);
    } else {
      if (update) {
        plotOption.plotOptions[this.type].stacking = undefined;
      }
    }

    if (this.isGroup) {
      plotOption = deepAssign({}, plotOption, group);
    } else {
      if (update) {
        plotOption.plotOptions[this.type].grouping = false;
      }
    }

    if (!plotOption.plotOptions.hasOwnProperty('series')) {
      plotOption.plotOptions.series = {};
    }

    if (this.isGap) {
      plotOption.plotOptions[this.type].gapSize = this.gapSize;
      plotOption.plotOptions[this.type].gapUnit = this.gapUnit;

      if (plotOption.plotOptions[this.type].hasOwnProperty('marker')) {
        plotOption.plotOptions[this.type].marker.enabled = true;
        plotOption.plotOptions[this.type].marker.radius = 2;
      }
    } else {
      if (update) {
        plotOption.plotOptions[this.type].gapSize = 0;
        plotOption.plotOptions[this.type].gapUnit = 'relative';
      }
    }

    if (this.isPointRange) {
      plotOption.plotOptions[this.type].pointRange = this.pointRange;
    } else {
      if (update) {
        plotOption.plotOptions[this.type].pointRange = null;
      }
    }

    if (!this.isAnimation) {
      plotOption.plotOptions.series.animation = false;
    } else {
      if (update) {
        // plotOption.chart={}
        // plotOption.chart.animation = this.isAnimation;
        plotOption.plotOptions.series.animation = this.isAnimation;
      }
    }

    if (this.isInactive) {
      if (plotOption.plotOptions.series.hasOwnProperty('states')) {
        plotOption.plotOptions.series.states.inactive = { opacity: 1 };
      } else {
        plotOption.plotOptions.series.states = {};
        plotOption.plotOptions.series.states.inactive = { opacity: 1 };
      }
    }

    if (this.isBoost) {
      plotOption.plotOptions.series.animation = false;
      plotOption.plotOptions.series.turboThreshold = Number.MAX_VALUE;
      // Set the point threshold for when a series should enter boost mode.
      plotOption.plotOptions.series.boostThreshold = 30000;
      // When the series contains less points than the crop threshold, all points are drawn
      plotOption.plotOptions.series.cropThreshold = Infinity;
    }

    return plotOption;
  }

  initConfiguration() {
    const Highchart: any = this.Highcharts;

    try {
      if (Highchart.hasOwnProperty('globalPXH')) {
        this.globalPXH = Highchart.globalPXH;

        if (!this.globalPXH.hasOwnProperty('url')) {
          this.globalPXH.url = config.url;
        }

        if (!this.globalPXH.hasOwnProperty('standardTooltipDesign')) {
          this.globalPXH.standardTooltipDesign = config.standardTooltipDesign;
        }

        if (!this.globalPXH.hasOwnProperty('dateTimeLabelFormats')) {
          this.globalPXH.dateTimeLabelFormats = config.dateTimeLabelFormats;
        }

        if (!this.globalPXH.hasOwnProperty('sameLegendSymbol')) {
          this.globalPXH.sameLegendSymbol = config.sameLegendSymbol;
        }

        if (!this.globalPXH.hasOwnProperty('legendPosition')) {
          this.globalPXH.legendPosition = config.legendPosition;
        }

        if (!this.globalPXH.hasOwnProperty('export')) {
          this.globalPXH.export = config.export;
        } else {
          if (!this.globalPXH.export.hasOwnProperty('theme')) {
            this.globalPXH.export.theme = exportConfig.theme;
          } else {
            this.globalPXH.export.theme = deepAssign({}, this.globalPXH.export.theme, exportConfig.theme);
          }

          if (!this.globalPXH.export.hasOwnProperty('enabled')) {
            this.globalPXH.export.enabled = exportConfig.enabled;
          }

          if (!this.globalPXH.export.hasOwnProperty('filename')) {
            this.globalPXH.export.filename = exportConfig.filename;
          }

          if (!this.globalPXH.export.hasOwnProperty('url')) {
            this.globalPXH.export.url = exportConfig.url;
          }

          if (!this.globalPXH.export.hasOwnProperty('fallbackToExportServer')) {
            this.globalPXH.export.fallbackToExportServer = exportConfig.fallbackToExportServer;
          }

          if (!this.globalPXH.export.hasOwnProperty('height')) {
            this.globalPXH.export.height = exportConfig.height;
          }

          if (!this.globalPXH.export.hasOwnProperty('width')) {
            this.globalPXH.export.width = exportConfig.width;
          }
        }

        if (!this.globalPXH.hasOwnProperty('debug')) {
          this.globalPXH.debug = config.debug;
        }

        if (!this.globalPXH.hasOwnProperty('debugStringify')) {
          this.globalPXH.debugStringify = config.debugStringify;
        }
      } else {
        this.globalPXH = { ...config };
      }
    } catch (e) {
      this.globalPXH = { ...config };

      console.log('Init Error: ', e);
      if (this.globalPXH.debug) {
        console.log(`---${this.type}#${this.id}---`);
        console.log(e);
      }
    }

    Highcharts['SVGRenderer']['prototype']['symbols']['cross'] = function (x, y, w, h) {
      return ['M', x, y, 'L', x + w, y + h, 'M', x + w, y, 'L', x, y + h, 'z'];
    };
  }

  initCustomHighCharts() {
    try {
      if (this.globalPXH.sameLegendSymbol) {
        Highcharts['seriesTypes'][this.type].prototype.drawLegendSymbol = Highcharts['seriesTypes']['column'].prototype.drawLegendSymbol;
      }
    } catch (e) {
      console.log('DrawLegendSymbol Error: ', e);
      if (this.globalPXH.debug) {
        console.log(`---${this.type}#${this.id}---`);
        console.log(e);
      }
    }
  }

  exportingConfigure(exportParam: Export, update = false) {
    // Default Config
    let standard: any = {
      enabled: this.globalPXH.export.enabled,
      customExport: false,
      clearDefaultField: false,
      args: this.globalPXH.export.args,
      fallbackToExportServer: this.globalPXH.export.fallbackToExportServer,
      sourceHeight: this.globalPXH.export.height,
      sourceWidth: this.globalPXH.export.width,
      chartOptions: deepClone(this.globalPXH.export.theme, true),
      filename: this.globalPXH.export.filename,
      url: this.globalPXH.export.url
    };

    if (update) {
      standard = {
        chartOptions: {
          chart: {},
          title: {},
          subtitle: {}
        }
      };
    }

    // Assign User Setting into Export Config
    if (exportParam !== undefined) {
      if (exportParam.title !== undefined) {
        standard.chartOptions.title.text = exportParam.title;
      }

      if (exportParam.subtitle !== undefined) {
        standard.chartOptions.subtitle.text = exportParam.subtitle;
      }

      if (exportParam.filename !== undefined) {
        standard.filename = `${exportParam.filename}`;
      } else {
        standard.filename = `${standard.filename}`;
      }

      if (exportParam.enabled !== undefined) {
        standard.enabled = exportParam.enabled;
      }

      if (exportParam.fallbackToExportServer !== undefined) {
        standard.fallbackToExportServer = exportParam.fallbackToExportServer;
      }

      if (exportParam.url !== undefined) {
        standard.url = exportParam.url;
      }

      if (exportParam.customExport !== undefined) {
        standard.customExport = exportParam.customExport;
      }

      if (exportParam.clearDefaultField !== undefined) {
        standard.clearDefaultField = exportParam.clearDefaultField;
      }

      if (exportParam.args !== undefined) {
        standard.args = exportParam.args;
      }

      if (exportParam.scale !== undefined) {
        /**
         * Min:1, Max:9 Depend on your Requirement
         * scale: 3 - Great for Legend Less than 5
         * scale: 4 - Great for Legend More than 5, Less than 20
         * scale: 5 - Great for Legend More than 5, Less than 20
         **/

        standard.sourceHeight = exportParam.scale * 100 + 200;
        standard.sourceWidth = exportParam.scale * 100 + 300;
      } else if (exportParam.width !== undefined && exportParam.height !== undefined) {
        standard.sourceHeight = exportParam.height;
        standard.sourceWidth = exportParam.width;
      }
    } else {
      standard.filename = `${standard.filename}_${this.getCurrentDate()}`;
    }

    return standard;
  }

  localeInit(d) {
    d.noData = d.noData === '' ? 'No Data Available' : d.noData;
    d.resetZoom = d.resetZoom === '' ? 'Reset Zoom' : d.resetZoom;
    Highcharts.setOptions({ lang: d });
  }

  // Util
  private validateSeries(updateOption) {
    try {
      if (updateOption === undefined) {
        return;
      }

      let xAxis: boolean = false;
      let yAxis: boolean = false;
      let zAxis: boolean = false;
      let rangeSelector: boolean = false;
      let navigator: boolean = false;

      // Declare Empty Object
      if (!updateOption.hasOwnProperty('rangeSelector')) {
        updateOption.rangeSelector = {};
      }

      if (!updateOption.hasOwnProperty('navigator')) {
        updateOption.navigator = {};
      }

      if (this.data !== undefined && this.data.length) {
        xAxis = true;
        yAxis = true;
        zAxis = true;
        rangeSelector = this.isRangeSelector;
        navigator = true;
      }

      if (this.isStock) {
        if (this.rangeSelector !== undefined) {
          if (this.rangeSelector.hasOwnProperty('enabled')) {
            updateOption.rangeSelector.enabled = this.rangeSelector.enabled;
          } else {
            updateOption.rangeSelector.enabled = rangeSelector;
          }
        } else {
          updateOption.rangeSelector.enabled = rangeSelector;
        }

        if (this.navigator !== undefined) {
          if (this.navigator.hasOwnProperty('enabled')) {
            updateOption.navigator.enabled = this.navigator.enabled;
          } else {
            updateOption.navigator.enabled = navigator;
          }
        } else {
          updateOption.navigator.enabled = navigator;
        }
      }

      if (this.xAxis !== undefined) {
        if (this.xAxis.hasOwnProperty('visible')) {
          this.complexOptionAssignment(updateOption, 'xAxis', { visible: this.xAxis.visible });
        } else {
          this.complexOptionAssignment(updateOption, 'xAxis', { visible: xAxis });
        }
      }

      if (this.yAxis !== undefined) {
        if (this.yAxis.hasOwnProperty('visible')) {
          this.complexOptionAssignment(updateOption, 'yAxis', { visible: this.yAxis.visible });
        } else {
          this.complexOptionAssignment(updateOption, 'yAxis', { visible: yAxis });
        }
      }

      if (this.zAxis !== undefined) {
        if (this.zAxis.hasOwnProperty('visible')) {
          this.complexOptionAssignment(updateOption, 'zAxis', { visible: this.zAxis.visible });
        } else {
          this.complexOptionAssignment(updateOption, 'zAxis', { visible: zAxis });
        }
      }
    } catch (e) {
      console.log('Validate Series Error: ', e);
      if (this.globalPXH.debug) {
        console.log(`---${this.type}#${this.id}---`);
        console.log(e);
      }
    }
  }

  private complexOptionAssignment(updateOption, pixieKey, option) {
    let isArray = false;
    let currentArray;

    if (Array.isArray(this[pixieKey])) {
      isArray = true;
      currentArray = this[pixieKey];
    } else {
      currentArray = [this[pixieKey]];
    }

    if (!updateOption.hasOwnProperty(pixieKey)) {
      if (isArray) {
        updateOption[pixieKey] = [];
      } else {
        updateOption[pixieKey] = {};
      }
    }

    currentArray.forEach((d, i) => {
      const obj = {};
      if (isArray) {
        this.arrayObjectAssignment(obj, option);
        updateOption[pixieKey][i] = deepAssign({}, updateOption[pixieKey][i], obj);
      } else {
        this.arrayObjectAssignment(obj, option);
        updateOption[pixieKey] = deepAssign({}, updateOption[pixieKey], obj);
      }
    });
  }

  private arrayObjectAssignment(obj, option) {
    for (const key of Object.keys(option)) {
      const value = option[key];
      if (value === 'object') {
        obj[key] = {};
        this.arrayObjectAssignment(obj[key], value);
      } else {
        obj[key] = value;
      }
    }
  }

  private generateID() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  private getCurrentDate() {
    const date = new Date();
    const year = `0000${date.getFullYear()}`;
    const month = `0${date.getMonth() + 1}`;
    const day = `0${date.getDate()}`;
    const today = `${year.substr(-4)}_${month.substr(-2)}_${day.substr(-2)}`;
    return `_${today}`;
  }
}

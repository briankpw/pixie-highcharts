import * as Highcharts from 'highcharts';

function addXScrollMouseWheel(chart) {
  Highcharts.addEvent(chart.container, document.onwheel === undefined ? 'DOMMouseScroll' : 'mousewheel', e => {
    let delta, newMin, newMax;
    const xAxis = chart.xAxis[0],
      range = xAxis.max - xAxis.min;

    e = chart.pointer.normalize(e);

    // Firefox uses e.detail, WebKit and IE uses wheelDelta
    delta = e.detail || -(e.wheelDelta / 120);

    if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
      newMin = xAxis.min + range * delta;
      newMax = xAxis.max + range * delta;

      if (newMin < xAxis.dataMin) {
        newMin = xAxis.dataMin;
        newMax = newMin + range;
      }

      if (newMax > xAxis.dataMax) {
        newMax = xAxis.dataMax;
        newMin = newMax - range;
      }

      if (newMin < 0) {
        newMin = 0;
      }

      xAxis.setExtremes(newMin, newMax, true, false);
    }
    e.preventDefault();
  });
}

function addYScrollMouseWheel(chart) {
  Highcharts.addEvent(chart.container, document.onwheel === undefined ? 'DOMMouseScroll' : 'mousewheel', e => {
    let delta, newMin, newMax;
    const yAxis = chart.yAxis[0],
      range = yAxis.max - yAxis.min;

    e = chart.pointer.normalize(e);

    // Firefox uses e.detail, WebKit and IE uses wheelDelta
    delta = e.detail || -(e.wheelDelta / 120);

    if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
      newMin = yAxis.min + range * delta;
      newMax = yAxis.max + range * delta;

      if (newMin < yAxis.dataMin) {
        newMin = yAxis.dataMin;
        newMax = newMin + range;
      }

      if (newMax > yAxis.dataMax) {
        newMax = yAxis.dataMax;
        newMin = newMax - range;
      }

      if (newMin < 0) {
        newMin = 0;
      }

      yAxis.setExtremes(newMin, newMax, true, false);
    }
    e.preventDefault();
  });
}

function removeMouseWheel(chart) {
  Highcharts.removeEvent(chart.container, document.onwheel === undefined ? 'DOMMouseScroll' : 'mousewheel');
}

const event = {
  addXScrollMouseWheel: addXScrollMouseWheel,
  addYScrollMouseWheel: addYScrollMouseWheel,
  removeMouseWheel: removeMouseWheel
};

export { event };

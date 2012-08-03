/**
 * @class jqplot.Chart
 * @extends Chart
 * @author pulasthi@wso2.com
 **/

/**
 * the main class for jqplot charts all the other charts extends this
 * @param canvas the div to which the chart will be plotted
 * @param chartTitle the Title of the chart
 * @param chartDesc
  */

Viskit.s.chart.jqplot.Chart = function(canvas, chartTitle, chartDesc) {
    Viskit.s.chart.Chart.call(this, canvas, chartTitle, chartDesc);
    /* @private */
    if(typeof(canvas) != 'string' && typeof(canvas) != 'undefined'){
        this.divEl($(canvas).attr('id'));
		
		
    }
    this.dataField([])
    .dataValue([])
    .dataLabel([])
    .xTitle("")
    .yTitle("")
    .x2Title("")
    .y2Title("")
    .tickNumber(10)
    .isStacked(false)
    .yTicks([])
    .showXAxis(true)
    .showYAxis(true)
    .xAxisType('linear')
    .yAxisType('linear')
	.titleTop(chartTitle);

		
		
	
}

// this makes c.protovis.BarChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.jqplot.Chart, Viskit.s.chart.Chart);

Viskit.s.chart.jqplot.Chart.prototype
    .property("dataField")
    .property("dataValue")
    .property("dataLabel")
    .property("titleTop")
    .property("xTitle")
    .property("yTitle")
    .property("x2Title")
    .property("y2Title")
    .property("tickNumber")
    .property("isStacked")
    .property("yTicks")
    .property("xTicks")
    .property("xMin")
    .property("yMin")
    .property("x2Min")
    .property("y2Min")
    .property("xMax")
    .property("yMax")
    .property("x2Max")
    .property("y2Max")
    .property("showXAxis")
    .property("showYAxis")
    .property("showX2Axis")
    .property("showY2Axis")
    .property("xAxisType")
    .property("yAxisType")
	


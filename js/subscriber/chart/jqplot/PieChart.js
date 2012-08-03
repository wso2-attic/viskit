/**
 * @class jqplot.PieChart
 * @extends jqplot.Chart
 * @author pulasthi@wso2.com
 **/


/**
 * Class jqplot.PieChart : Chart
 * This is the custom wrapper class for jqplot pie charts
 * creates a pie chart with the data provided
 * @param canvas the div to which the chart will be plotted
 * @param chartTitle the Title of the chart
 * @param chartDesc
 */
Viskit.s.chart.jqplot.PieChart = function(canvas, chartTitle, chartDesc) {
    Viskit.s.chart.jqplot.Chart.call(this, canvas, chartTitle, chartDesc);
    this.canvas = canvas;
    this.heightratio = 1;
    this.widthratio = 1;
    this.diameter(null)
    .padding(20)
    .sliceMargin(0)
    .fill(true)
    .shadowOffset(2)
    .shadowAlpha(0.08)
    .shadowDepth(5)
    .highlightMouseOver(true)
    .highlightMouseDown(false)
    .highlightColors([])
    .dataLabels('percent')
    .showDataLabels(true)
    .dataLabelFormatString(null)
    .dataLabelThreshold(3)
    .dataLabelPositionFactor(0.52)
    .dataLabelNudge(2)
    .dataLabelCenterOn(true)
    .startAngle(2)
    .showPointLabels(true)
    .seriesLabels([])
	.titleTop(chartTitle)
    .showLegend(true);

}

// this makes c.protovis.PieChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.jqplot.PieChart, Viskit.s.chart.jqplot.Chart);

Viskit.s.chart.jqplot.PieChart.prototype
    .property("diameter")
    .property("padding")
    .property("sliceMargin")
    .property("fill")
    .property("shadowOffset")
    .property("shadowAlpha")
    .property("shadowDepth")
    .property("highlightMouseOver")
    .property("highlightMouseDown")
    .property("highlightColors")
    .property("dataLabels")
    .property("showDataLabels")
    .property("dataLabelFormatString")
    .property("dataLabelThreshold")
    .property("dataLabelPositionFactor")
    .property("dataLabelNudge")
    .property("dataLabelCenterOn")
    .property("startAngle")
    .property("showPointLabels")
    .property("seriesLabels")
    .property("showLegend")

    
//Public function load
//Loads the chart inside the given HTML element
Viskit.s.chart.jqplot.PieChart.prototype.load = function (w, h) {
    var thisObject = this;
    var chartid = '#' + this.divEl();
    $(chartid).height(this.height());
    $(chartid).width(this.width());
    this.heightratio = $(chartid).height()/$(window).height();
    this.widthratio = $(chartid).width()/$(window).width();
}

Viskit.s.chart.jqplot.PieChart.prototype.setOptions = function(thisObject){

    this.options  =
    {
        stackSeries: thisObject.isStacked(),
	
        title: thisObject.titleTop(),

        seriesDefaults: {
            show: true,
            xaxis: 'xaxis',
            yaxis: 'yaxis',
            shadowAngle: 45,
            shadowOffset: 1.25,
            shadowDepth: 3,
            shadowAlpha: 0.1,
            fillAlpha: undefined,
            renderer:$.jqplot.PieRenderer,
            pointLabels: {
                show:this.showPointLabels(),
                location: 's'
            },
            rendererOptions: {
                diameter: this.diameter(),	
                padding: this.padding(),
                sliceMargin: this.sliceMargin(),
                fill: this.fill(),
                shadowOffset: this.shadowOffset(),
                shadowAlpha: this.shadowAlpha(),
                shadowDepth: this.shadowDepth(),
                highlightMouseOver: this.highlightMouseOver(),
                highlightMouseDown: this.highlightMouseDown(),
                highlightColors: this.highlightColors(),
                dataLabels: this.dataLabels(),
                showDataLabels: this.showDataLabels(),
                dataLabelFormatString: this.dataLabelFormatString(),
                dataLabelThreshold: this.dataLabelThreshold(),
                dataLabelPositionFactor: this.dataLabelPositionFactor(),
                dataLabelNudge: this.dataLabelNudge(),
                dataLabelCenterOn: this.dataLabelCenterOn(),
                startAngle: this.startAngle()
               
            }
        },

        legend: {
            show: true,
            location: 'ne',
            renderer:$.jqplot.EnhancedLegendRenderer
        },
        // Cursor
        // Options are passed to the cursor plugin through the "cursor" object at the top
        // level of the options object.
        cursor: {
            style: '',
            show: true,
            showTooltip: true,
            followMouse: false,
            tooltipLocation: 'se',
            zoom:false,
            tooltipOffset: 6,
            showTooltipGridPosition: false,
            showTooltipUnitPosition: false,
            tooltipFormatString: '%.4P',
            useAxesFormatters: true,
            tooltipAxesGroups: []

        },
        highlighter: {
            lineWidthAdjust: 2.5,
            sizeAdjust: 5,
            showTooltip: true,
            tooltipLocation: 'nw',
            fadeTooltip: true,
            tooltipFadeSpeed: "fast",
            tooltipOffset: 2,
            tooltipAxes: 'both',
            tooltipSeparator: ', ',
            useAxesFormatters: true,
            tooltipFormatString: '%.5P'
        }
    };


};
/**
* @private
*/

Viskit.s.chart.jqplot.PieChart.prototype.titleSpacing = function () {
    if(this.title() === "") {
        return 1;
    }
    else {
        return 0.9;
    }
};
/**
* @private
*/
Viskit.s.chart.jqplot.PieChart.prototype.populateData = function (thisObject) {
    var _dataField = thisObject.traverseToDataField(thisObject.data, thisObject.dataField());
	
    var dataGrpCount = 1;
    if( _dataField instanceof Array ) {
        dataGrpCount = _dataField.length;
		
    }

    thisObject.formattedData = [];
    for(var i=0;i<dataGrpCount;i++){
        thisObject.formattedData.push([this.getDataLabel(i),genDataMap(i)])
    }
  
    function genDataMap(x) {
        var rootObj;
        if( _dataField instanceof Array ) {
            rootObj = _dataField[x];
        }
        else {
            rootObj = _dataField;
        }
        return parseInt(thisObject.traverseToDataField(rootObj, thisObject.dataValue()));
    }
    this.setOptions(thisObject)

};

Viskit.s.chart.jqplot.PieChart.prototype.getData = function (thisObject) {

    return thisObject.formattedData;
};

Viskit.s.chart.jqplot.PieChart.prototype.update = function () {
    this.populateData(this);
    document.getElementById(this.divEl()).innerHTML = ""
    plot2 = $.jqplot(this.canvas,[this.getData(this)],this.options);
    heightratio = this.heightratio;
    widthratio = this.widthratio;
    var chartid = '#' + this.divEl();
    $(function(){
	
        $(window).resize(function(){
	
            var h = $(window).height()*heightratio;
            var w = $(window).width()*widthratio;
		
            if( h > 250 ){
                $(chartid).height(h);
            }else{
                $(chartid).height(250);
            }
		
            if( w > 350 ){
                $(chartid).width(w);
            }else{
                $(chartid).width(350);
            }
		
        
		
            plot2.replot();
        });
    });
    if(this.tooltip() === true) {
        tooltip.init();
    }
};

Viskit.s.chart.jqplot.PieChart.prototype.getDataLabel = function (i) {
    if (this.data !== null){

        var rootObj = this.traverseToDataField(this.data, this.dataField());
        if( rootObj instanceof Array ) {
            return  this.traverseToDataField(rootObj[i], this.dataLabel());
        }
        else {
            return  this.traverseToDataField(rootObj, this.dataLabel());
        }
    }
    
    return i;
};

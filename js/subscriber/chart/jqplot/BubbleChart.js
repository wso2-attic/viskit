/**
 * @class jqplot.BubbleChart
 * @extends jqplot.Chart
 * @author pulasthi@wso2.com
 **/


/**
 * Class jqplot.Bubble : Chart
 * This is the custom wrapper class for jqplot bubble charts
 * creates a bubble chart with the data provided
 * @param canvas the div to which the chart will be plotted
 * @param chartTitle the Title of the chart
 * @param chartDesc
 */
Viskit.s.chart.jqplot.BubbleChart = function(canvas, chartTitle, chartDesc) {
    Viskit.s.chart.jqplot.Chart.call(this, canvas, chartTitle, chartDesc);
    this.canvas = canvas;
    this.heightratio = 1;
    this.widthratio = 1;
    this.varyBubbleColors(true)
    .autoscaleBubbles(true)
    .autoscaleMultiplier(1.0)
    .autoscalePointsFactor(-0.07)
    .escapeHtml(true)
    .highlightMouseOver(true)
    .highlightMouseDown(false)
    .highlightColors([])
    .bubbleAlpha(1.0)
    .highlightAlpha(null)
    .bubbleGradients(false)
    .showLabels(true)
    .showPointLabels(false)
    .seriesLabels([])
    .showLegend(true)
    .dataValue2([])
    .dataValue3([])
	.titleTop(chartTitle);

  
}

// this makes c.protovis.BubbleChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.jqplot.BubbleChart, Viskit.s.chart.jqplot.Chart);

Viskit.s.chart.jqplot.BubbleChart.prototype
    .property("varyBubbleColors")
    .property("autoscaleBubbles")
    .property("autoscaleMultiplier")
    .property("autoscalePointsFactor")
    .property("escapeHtml")
    .property("highlightMouseOver")
    .property("highlightMouseDown")
    .property("highlightColors")
    .property("bubbleAlpha")
    .property("highlightAlpha")
    .property("bubbleGradients")
    .property("showLabels")
    .property("showPointLabels")
    .property("seriesLabels")
    .property("showLegend")
    .property("dataValue2")
    .property("dataValue3")
			

    
//Public function load
//Loads the chart inside the given HTML element
Viskit.s.chart.jqplot.BubbleChart.prototype.load = function (w, h) {
    var thisObject = this;
    var chartid = '#' + this.divEl();
    $(chartid).height(this.height());
    $(chartid).width(this.width());
    this.heightratio = $(chartid).height()/$(window).height();
    this.widthratio = $(chartid).width()/$(window).width();
}

Viskit.s.chart.jqplot.BubbleChart.prototype.setOptions = function(thisObject){

    this.options  =
    {
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
            renderer:$.jqplot.BubbleRenderer,
            pointLabels: {
                show:this.showPointLabels(),
                location: 's'
            },
            rendererOptions: {
                varyBubbleColors: this.varyBubbleColors(),
                autoscaleBubbles: this.autoscaleBubbles(),
                autoscaleMultiplier: this.autoscaleMultiplier(),
                autoscalePointsFactor: this.autoscalePointsFactor(),
                escapeHtml: this.escapeHtml(),
                highlightMouseOver: this.highlightMouseOver(),
                highlightMouseDown: this.highlightMouseDown(),
                highlightColors: this.highlightColors(),
                bubbleAlpha: this.bubbleAlpha(),
                highlightAlpha: this.highlightAlpha(),
                bubbleGradients: this.bubbleGradients(),
                showLabels: this.showLabels()
            }
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

Viskit.s.chart.jqplot.BubbleChart.prototype.titleSpacing = function () {
    if(this.title() === "") {
        return 1;
    }
    else {
        return 	0.9;
    }
};
/**
* @private
*/
Viskit.s.chart.jqplot.BubbleChart.prototype.populateData = function (thisObject) {
    var _dataField = thisObject.traverseToDataField(thisObject.data, thisObject.dataField());
	
    var dataGrpCount = 1;
    if( _dataField instanceof Array ) {
        dataGrpCount = _dataField.length;
		
    }

    thisObject.formattedData = [];
    for(var i=0;i<dataGrpCount;i++){
        thisObject.formattedData.push([genDataMap(1,i),genDataMap(2,i),genDataMap(3,i),this.getDataLabel(i)])
    }
  
    function genDataMap(y,x) {
        var rootObj;
        if( _dataField instanceof Array ) {
            rootObj = _dataField[x];
        }
        else {
            rootObj = _dataField;
        }
        if(y == 1){
            return parseInt(thisObject.traverseToDataField(rootObj, thisObject.dataValue()));
        }else if( y == 2){
            return parseInt(thisObject.traverseToDataField(rootObj, thisObject.dataValue2()));
        }else if(y == 3){
            return parseInt(thisObject.traverseToDataField(rootObj, thisObject.dataValue3()));
        }
    }
    this.setOptions(thisObject)

};

Viskit.s.chart.jqplot.BubbleChart.prototype.getData = function (thisObject) {

    return thisObject.formattedData;
};

Viskit.s.chart.jqplot.BubbleChart.prototype.update = function () {
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

Viskit.s.chart.jqplot.BubbleChart.prototype.getDataLabel = function (i) {
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

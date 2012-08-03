
//Class c.protovis.BarChart : Chart
//This is the custom wrapper class for protovis bar charts
// TODD: implement the changes needed to support horizontal barCharts
//Constructor
Viskit.s.chart.jqplot.BarChart = function(canvas, chartTitle, chartDesc) {
    Viskit.s.chart.jqplot.pluginsType("BarChart");
    Viskit.s.chart.jqplot.Chart.call(this, canvas, chartTitle, chartDesc);
    this.canvas = canvas;
    this.heightratio = 1;
    this.widthratio = 1;
    this.xAxisType('category');
    this.yMin(0);
}

// this makes c.protovis.BarChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.jqplot.BarChart, Viskit.s.chart.jqplot.Chart);

Viskit.s.chart.jqplot.BarChart.prototype
    .property("barPadding")
    .property("barMargin")
    .property("barDirection")
    .property("barWidth")
    .property("shadowOffset")
    .property("shadowDepth")
    .property("shadowAlpha")
    .property("waterfall")
    .property("groups")
    .property("varyBarColor")
    .property("highlightMouseOver")
    .property("highlightMouseDown")
    .property("highlightColors")
    .property("showPointLabels")
    .property("seriesLabels")
    .property("showLegend")

    
//Public function load
//Loads the chart inside the given HTML element
Viskit.s.chart.jqplot.BarChart.prototype.load = function (w, h) {
    var thisObject = this;
    var chartid = '#' + this.divEl();
    $(chartid).height(this.height());
    $(chartid).width(this.width());
    this.heightratio = $(chartid).height()/$(window).height();
    this.widthratio = $(chartid).width()/$(window).width();
}

Viskit.s.chart.jqplot.BarChart.prototype.setOptions = function(thisObject){
	
    this.options  =
    {
        stackSeries: thisObject.isStacked(),
	
        title: thisObject.titleTop(),

        axes:thisObject.setAxisOptions() ,

        seriesDefaults: {
            show: true,
            xaxis: 'xaxis',
            yaxis: 'yaxis',
            shadowAngle: 45,
            shadowOffset: 1.25,
            shadowDepth: 3,
            shadowAlpha: 0.1,
            fillAlpha: undefined,
            renderer:$.jqplot.BarRenderer,
            pointLabels: {
                show:this.showPointLabels(),
                location: 's'
            },
            rendererOptions: {
                barPadding: this.barPadding(),
                barMargin:this.barMargin(),
                barDirection:this.barDirection(),
                barWidth:this.barWidth(),
                shadowOffset:this.shadowOffset(),
                shadowDepth:this.shadowDepth(),
                shadowAlpha:this.shadowAlpha(),
                waterfall:this.waterfall(),
                groups:this.groups(),
                varyBarColor:this.varyBarColor(),
                highlightMouseOver:this.highlightMouseOver(),
                highlightMouseDown:this.highlightMouseDown(),
                highlightColors:this.highlightColors()
               
            }
        },
        grid: {
            drawGridLines: false
       
        },

        series: this.setSeriesLabels(),
        legend:{
            show:true,
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
Viskit.s.chart.jqplot.BarChart.prototype.axisRenderer = function (axis) {
    if(axis === "x"){
        if(this.xAxisType() == "category"){
            return $.jqplot.CategoryAxisRenderer;
        }else if(this.xAxisType() == "date"){
            return $.jqplot.DateAxisRenderer;
        }else{
            return $.jqplot.LinearAxisRenderer;
        }
    }else if(axis === "y"){
        if(this.yAxisType() == "category"){
            return $.jqplot.CategoryAxisRenderer;
        }else if(this.yAxisType() == "date"){
            return $.jqplot.DateAxisRenderer;
        }else{
            return $.jqplot.LinearAxisRenderer;
        }
    }else if(axis === "x2"){
        if(this.x2AxisType() == "category"){
            return $.jqplot.CategoryAxisRenderer;
        }else if(this.x2AxisType() == "date"){
            return $.jqplot.DateAxisRenderer;
        }else{
            return $.jqplot.LinearAxisRenderer;
        }
    }else{
        if(this.y2AxisType() == "category"){
            return $.jqplot.CategoryAxisRenderer;
        }else if(this.y2AxisType() == "date"){
            return $.jqplot.DateAxisRenderer;
        }else{
            return $.jqplot.LinearAxisRenderer;
        }
    }
	
};

/**
* @private
*/

Viskit.s.chart.jqplot.BarChart.prototype.setAxisOptions = function (){
    //TODO: make it possible to change the render for the axis to switch between vertical and horizontal
    var axis = {
        xaxis: {
            show:this.showXAxis(),
            renderer: this.axisRenderer("x"),
            numberTicks: this.tickNumber(),
            tickOptions:{
                mark: 'outside',
                showMark: true,
                showGridline: false,
                markSize: 4,
                show: true,
                showLabel: true,
                formatString: ''
            },
            label:this.xTitle(),
            min:this.xMin(),
            max:this.xMax(),
            ticks: this.getTicks('x'),
            autoscale : false,
            showTicks: true,
            pad: 1.2
        },
        yaxis: {
            show: this.showYAxis(),
            renderer: this.axisRenderer("y"),
            tickOptions:{
                mark: 'outside',
                showMark: true,
                showGridline: false,
                markSize: 4,
                show: true,
                showLabel: true,
                formatString: ''
            },
            label:this.yTitle(),
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            min:this.yMin(),
            max:this.yMax(),
            ticks:this.getTicks('y'),
            showTicks: true,
            showTickMarks: true,
            pad: 1.4
        },
        x2axis: {
            show : this.showX2Axis(),
            renderer: this.axisRenderer("x2"),
            tickOptions:{
                mark: 'outside',
                showMark: true,
                showGridline: true,
                markSize: 4,
                show: true,
                showLabel: true,
                formatString: ''
            },
            label:this.x2Title(),
            min:this.x2Min(),
            max:this.x2Max(),
            ticks: this.x2Ticks(),
            showTicks: true,
            showTickMarks: true,
            pad: 1.2
        },
        y2axis: {
            show : this.showY2Axis(),
            renderer: this.axisRenderer("y2"),
            tickOptions:{
                mark: 'outside',
                showMark: true,
                showGridline: true,
                markSize: 4,
                show: true,
                showLabel: true,
                formatString: ''
            },
            label:this.y2Title(),
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            min:this.y2Min(),
            max:this.y2Max(),
            ticks: this.y2Ticks(),
            showTicks: true,
            showTickMarks: true,
            pad: 1.2
        }
    };
		
		
    return axis;
}

/**
* @private
*/

Viskit.s.chart.jqplot.BarChart.prototype.titleSpacing = function () {
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

Viskit.s.chart.jqplot.BarChart.prototype.setSeriesLabels = function () {
    var serieslabel = [];
    if(!(typeof(this.seriesLabels()) == 'undefined')){
        for(var j = 0 ; j <this.seriesLabels().length; j++){
            serieslabel.push({
                label:  this.seriesLabels()[j]
            })
	
        }
        return serieslabel;
    }else{
		
        serieslabel.push({
            label:   this.dataValue()[this.dataValue().length-1]
        })
        if(typeof(this.dataValue2()) !== 'undefined'){
            serieslabel.push({
                label:   this.dataValue2()[this.dataValue2().length-1]
            })
        }
        if(typeof(this.dataValue3()) !== 'undefined'){
            serieslabel.push({
                label:   this.dataValue3()[this.dataValue3().length-1]
            })
        }
        if(typeof(this.dataValue4()) !== 'undefined'){
            serieslabel.push({
                label:   this.dataValue4()[this.dataValue4().length-1]
            })
        }
        return serieslabel;

    }
};
/**
* @private
*/
Viskit.s.chart.jqplot.BarChart.prototype.populateData = function (thisObject) {
    var _dataField = thisObject.traverseToDataField(thisObject.data, thisObject.dataField());
	
    var dataGrpCount = 1;
    if( _dataField instanceof Array ) {
        dataGrpCount = _dataField.length;
		
    }

    thisObject.formattedData = [];
    thisObject.tempdata = [];
    for(var i=0;i<dataGrpCount;i++){
        thisObject.tempdata.push(genDataMap(i))
    }
    thisObject.formattedData.push(thisObject.tempdata.reverse());
	 	
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
    this.setOptions(thisObject);
};

Viskit.s.chart.jqplot.BarChart.prototype.getData = function (thisObject) {

    return thisObject.formattedData;
};

Viskit.s.chart.jqplot.BarChart.prototype.update = function () {
    this.populateData(this);
    document.getElementById(this.divEl()).innerHTML = ""
    plot2 = $.jqplot(this.canvas,this.getData(this),this.options);
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

Viskit.s.chart.jqplot.BarChart.prototype.getDataLabel = function (i) {
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
Viskit.s.chart.jqplot.BarChart.prototype.getTicks = function(type){
    var ticks = [];
    if(!( this.barDirection() === 'horizontal')){
        if(type === 'x'){
            if(typeof(this.dataLabel()) == 'undefined'){
                return this.xTicks();
            }else{
                var _dataField = this.traverseToDataField(this.data, this.dataField());
		
                var dataGrpCount = 1;
                if( _dataField instanceof Array ) {
                    dataGrpCount = _dataField.length;
					
                }
                for(var j = 0 ; j <dataGrpCount; j++){
                    ticks.push(this.getDataLabel(j));
                };
                return ticks.reverse();
				
            }
			
			
        }else if(type === 'y'){
            return this.yTicks();
        }
    }else{
		
}
}
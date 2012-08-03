/**
 * @class jqplot.LineChart
 * @extends jqplot.Chart
 * @author pulasthi@wso2.com
 **/


/**
 *
 * Class jqplot.LineChart : Chart
 * This is the custom wrapper class for jqplot line charts
 * creates a line chart with the data provided
 * @param canvas the div to which the chart will be plotted
 * @param chartTitle the Title of the chart
 * @param chartDesc
 */
Viskit.s.chart.jqplot.LineChart = function(canvas, chartTitle, chartDesc) {
    Viskit.s.chart.jqplot.Chart.call(this, canvas, chartTitle, chartDesc);
    this.canvas = canvas;
    this.heightratio = 1;
    this.widthratio = 1;
    this.dataHistory = [];
    this.maxX = 0;
    this.maxY = 0;
    this.fillchart(false)
    .showPointLabels(false)
    .seriesLabels([])
    .showMarker(false)
    .showToolTip(true)
    .tooltipFollowMouse(false)
    .enableZoom(false)
    .xAxisType('time')
	.titleTop(chartTitle)
    .yAxisType('linear');
	 
}

// this makes c.protovis.LineChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.jqplot.LineChart, Viskit.s.chart.jqplot.Chart);

Viskit.s.chart.jqplot.LineChart.prototype
    .property("fillchart")
    .property("showPointLabels")
    .property("seriesLabels")
    .property("showMarker")
    .property("showLegend")
    .property("showToolTip")
    .property("tooltipFollowMouse")
    .property("enableZoom")
    
//Public function load
//Loads the chart inside the given HTML element
Viskit.s.chart.jqplot.LineChart.prototype.load = function (w, h) {
    var chartid = '#' + this.divEl();
    $(chartid).height(this.height());
    $(chartid).width(this.width());
    this.heightratio = $(chartid).height()/$(window).height();
    this.widthratio = $(chartid).width()/$(window).width();
    var thisObject = this;
}

Viskit.s.chart.jqplot.LineChart.prototype.setOptions = function(thisObject){
    this.options  =
    {
        stackSeries: thisObject.isStacked(),
        seriesColors:  Viskit.util.generateColors(4,10),
        title: thisObject.titleTop(),

        axes:thisObject.setAxisOptions() ,

        seriesDefaults: {
            show: true,     // wether to render the series.
            xaxis: 'xaxis', // either 'xaxis' or 'x2axis'.
            yaxis: 'yaxis', // either 'yaxis' or 'y2axis'.
            label: '',      // label to use in the legend for this line.
            color: '',      // CSS color spec to use for the line.  Determined automatically.
            lineWidth: 1.5, // Width of the line in pixels.
            shadow: true,   // show shadow or not.
            shadowAngle: 45,    // angle (degrees) of the shadow, clockwise from x axis.
            shadowOffset: 1.25, // offset from the line of the shadow.
            shadowDepth: 3,     // Number of strokes to make when drawing shadow.  Each
            shadowAlpha: 0.1,   // Opacity of the shadow.
            showMarker: true,   // render the data point markers or not.
            fill: this.fillchart(),       // fill under the line,
            fillAndStroke: false,       // *stroke a line at top of fill area.
            renderer:$.jqplot.LineRenderer,
            pointLabels: {
                show:this.showPointLabels(),
                location: 's'
            },    // renderer used to draw the series.
            markerRenderer: $.jqplot.MarkerRenderer,   // renderer to use to draw the data
            markerOptions: {
                show: this.showMarker(),             // wether to show data point markers.
                style: 'circle',  // circle, diamond, square, filledCircle.
                // filledDiamond or filledSquare.
                lineWidth: 2,       // width of the stroke drawing the marker.
                size: 2,            // size (diameter, edge length, etc.) of the marker.
                color: '#666666' ,   // color of marker, set to color of line by default.
                shadow: true,       // wether to draw shadow on marker or not.
                shadowAngle: 45,    // angle of the shadow.  Clockwise from x axis.
                shadowOffset: 1,    // offset from the line of the shadow,
                shadowDepth: 3,     // Number of strokes to make when drawing shadow.  Each stroke
                // offset by shadowOffset from the last.
                shadowAlpha: 0.07   // Opacity of the shadow
            }
        },

        series: this.setSeriesLabels(),

        legend:{
            show:true,
            fontSize: 10,
            rowSpacing: '0.12em',
            renderer:$.jqplot.EnhancedLegendRenderer
			
        },
    

        // Cursor
        // Options are passed to the cursor plugin through the "cursor" object at the top
        // level of the options object.

        cursor: {
            style: '',     // A CSS spec for the cursor type to change the
            // cursor to when over plot.
            show: true,
            showTooltip: this.showToolTip(),      // show a tooltip showing cursor position.
            followMouse: this.tooltipFollowMouse(),     // wether tooltip should follow the mouse or be stationary.
            tooltipLocation: 'se',  // location of the tooltip either relative to the mouse
            zoom:this.x,                         // (followMouse=true) or relative to the plot.  One of
            // the compass directions, n, ne, e, se, etc.
            tooltipOffset: 6,       // pixel offset of the tooltip from the mouse or the axes.
            showTooltipGridPosition: false,     // show the grid pixel coordinates of the mouse
            // in the tooltip.
            showTooltipUnitPosition: true,      // show the coordinates in data units of the mouse
            // in the tooltip.
            tooltipFormatString: '%.4P',    // sprintf style format string for tooltip values.
            useAxesFormatters: true,        // wether to use the same formatter and formatStrings
            // as used by the axes, or to use the formatString
            // specified on the cursor with sprintf.
            tooltipAxesGroups: []  // show only specified axes groups in tooltip.  Would specify like:
        // [['xaxis', 'yaxis'], ['xaxis', 'y2axis']].  By default, all axes
        // combinations with for the series in the plot are shown.

        },
        // Highlighter
        // Highlighter options are specified with the "highlighter" object at the top level
        // of the options object.

        highlighter: {
            lineWidthAdjust: 2.5,   // pixels to add to the size line stroking the data point marker
            // when showing highlight.  Only affects non filled data point markers.
            sizeAdjust: 5,          // pixels to add to the size of filled markers when drawing highlight.
            showTooltip: true,      // show a tooltip with data point values.
            tooltipLocation: 'nw',  // location of tooltip: n, ne, e, se, s, sw, w, nw.
            fadeTooltip: true,      // use fade effect to show/hide tooltip.
            tooltipFadeSpeed: "fast", // slow, def, fast, or a number of milliseconds.
            tooltipOffset: 2,       // pixel offset of tooltip from the highlight.
            tooltipAxes: 'both',    // which axis values to display in the tooltip, x, y or both.
            tooltipSeparator: ', ',  // separator between values in the tooltip.
            useAxesFormatters: true, // use the same format string and formatters as used in the axes to
            bringSeriesToFront: true,                     // display values in the tooltip.
            tooltipFormatString: '%.5P' // sprintf format string for the tooltip.  only used if
        // useAxesFormatters is false.  Will use sprintf formatter with
        // this string, not the axes formatters.
        }

    };


};
/**
* @private
*/

Viskit.s.chart.jqplot.LineChart.prototype.setSeriesLabels = function () {
    var serieslabel = [];
    if(this.dataLabel().length === 0){
        for(var j = 0 ; j <this.seriesLabels().length; j++){
            serieslabel.push({
                label:  this.seriesLabels()[j]
            })
	
        }
        return serieslabel;
    }else {
        var _dataField = this.traverseToDataField(this.data, this.dataField());
	
        var dataGrpCount = 1;
        if( _dataField instanceof Array ) {
            dataGrpCount = _dataField.length;
		
        }
        for(var j = 0 ; j <dataGrpCount; j++){
            serieslabel.push({
                label:  this.getDataLabel(j)
            })
	
        }
		
        return serieslabel;
	
    }
};
/**
* @private
*/
Viskit.s.chart.jqplot.LineChart.prototype.axisRenderer = function (axis) {
    if(axis === "x"){
        if(this.xAxisType() == "category"){
            return $.jqplot.CategoryAxisRenderer;
        }else if(this.xAxisType() == "time"){
            return $.jqplot.DateAxisRenderer;
        }else{
            return $.jqplot.LinearAxisRenderer;
        }
    }else if(axis === "y"){
        if(this.yAxisType() == "category"){
            return $.jqplot.CategoryAxisRenderer;
        }else if(this.yAxisType() == "time"){
            return $.jqplot.DateAxisRenderer;
        }else{
            return $.jqplot.LinearAxisRenderer;
        }
    }/**else if(axis === "x2"){
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
	}**/
	
};

/**
* @private
*/


Viskit.s.chart.jqplot.LineChart.prototype.setAxisOptions = function (){
    var axis = {
        xaxis: {
            show:this.showXAxis(),
            renderer:this.axisRenderer("x"),
            numberTicks: this.tickNumber(),
            tickOptions:{
                mark: 'outside',
                showMark: true,
                showGridline: true,
                markSize: 4,
                show: true,
                showLabel: true,
                formatString: '%H:%M:%S'
            },
            label:this.xTitle(),
            min:this.xMin(),
            max:this.xMax(),
            autoscale : false,
            showTicks: true,
            pad: 1.2
        },
        yaxis: {
            show: this.showYAxis(),
            renderer:this.axisRenderer("y"),
            tickOptions:{
                mark: 'outside',
                showMark: true,
                showGridline: true,
                markSize: 4,
                show: true,
                showLabel: true,
                formatString: ''
            },
            label:this.yTitle(),
            labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
            min:this.yMin(),
            max:this.getMax('y'),
            ticks: this.yTicks(),
            showTicks: true,
            showTickMarks: true,
            pad: 1.4
        }/**,
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
        }**/
    };
		
		
    return axis;
}

/**
* @private
*/

Viskit.s.chart.jqplot.LineChart.prototype.titleSpacing = function () {
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
Viskit.s.chart.jqplot.LineChart.prototype.populateData = function (thisObject) {
	
    var _dataField = thisObject.traverseToDataField(thisObject.data, thisObject.dataField());
    this.x =true;
    var dataGrpCount = 1;
    if( _dataField instanceof Array ) {
        dataGrpCount = _dataField.length;
		
    }

    thisObject.formattedData = [];
    if(thisObject.enableLocalStorage()){
        if(Viskit.util.localStorage.exsists(Viskit.util.genaratekey("jqplot."+thisObject.divEl()))){
		
            Viskit.util.localStorage.manageStore(thisObject.storageTime(),Viskit.util.genaratekey("jqplot."+thisObject.divEl()));
            var jsonString = Viskit.util.localStorage.getItem(Viskit.util.genaratekey("jqplot."+thisObject.divEl()));
            thisObject.dataHistory = JSON.parse(jsonString);
			
        }
    }else if(thisObject.enableSessionStorage()){
        if(Viskit.util.sessionStorage.exsists(Viskit.util.genaratekey("jqplot."+thisObject.divEl()))){
            Viskit.util.sessionStorage.manageStore(thisObject.storageTime(),Viskit.util.genaratekey("jqplot."+thisObject.divEl()));
            var jsonString = Viskit.util.sessionStorage.getItem(Viskit.util.genaratekey("jqplot."+thisObject.divEl()));
            thisObject.dataHistory = JSON.parse(jsonString);
			
        }
		
    }
    for(var i=0;i<dataGrpCount;i++){
		
        thisObject.formattedData.push(genDataMap(i))
    }
    if(thisObject.enableLocalStorage()){
		
        var jsonData = JSON.stringify(thisObject.dataHistory);
        Viskit.util.localStorage.setItem(Viskit.util.genaratekey("jqplot."+thisObject.divEl()),jsonData);
    }else if(thisObject.enableSessionStorage()){
        var jsonData = JSON.stringify(thisObject.dataHistory);
        Viskit.util.sessionStorage.setItem(Viskit.util.genaratekey("jqplot."+thisObject.divEl()),jsonData);
		
    }
  
    function genDataMap(x) {
        var rootObj;
        if( _dataField instanceof Array ) {
            rootObj = _dataField[x];
        }
        else {
            rootObj = _dataField;
        }
        var prevalObj = (thisObject.traverseToDataField(rootObj, thisObject.dataValue()));
        var valObj = [];
        if((typeof(thisObject.xAxisType()) == 'undefined')){
            valObj = prevalObj;
        }else if(thisObject.xAxisType() === 'time'){
            valObj = [new Date().getTime(),prevalObj]
        }
		  
        if( (parseInt(prevalObj) > thisObject.maxY)){
            thisObject.maxY = parseInt(prevalObj);
			
        }
		
        Viskit.util.localStorage.clearAll();
        if(thisObject.dataHistory[x] === undefined){
            thisObject.dataHistory[x] = new Array();
						
        }
        if (thisObject.dirFromLeft()) {
            thisObject.dataHistory[x].unshift(valObj);

            if(thisObject.dataHistory[x].length > thisObject.band()+1){
                thisObject.dataHistory[x].pop();
            }
        }
        else {
            thisObject.dataHistory[x].push(valObj);

            if(thisObject.dataHistory[x].length > thisObject.band()+1){
                thisObject.dataHistory[x].shift();
            }
        }
		
        return thisObject.dataHistory[x];
    }
    this.setOptions(thisObject);

};

Viskit.s.chart.jqplot.LineChart.prototype.getData = function (thisObject) {

    return thisObject.formattedData;
};

Viskit.s.chart.jqplot.LineChart.prototype.update = function () {
    this.populateData(this);
    document.getElementById(this.divEl()).innerHTML = ""
    plot2 = $.jqplot(this.canvas,this.getData(this),this.options);
    plot2.replot();
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

Viskit.s.chart.jqplot.LineChart.prototype.clear = function () {
    this.dataHistory.length = 0;
};
Viskit.s.chart.jqplot.LineChart.prototype.getDataLabel = function (i) {
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
Viskit.s.chart.jqplot.LineChart.prototype.getMax =  function(axis){
    //TODO: check if this implementaion should be extended to others
    if(axis === 'y'){
        if(typeof(this.yMax()) == 'undefined'){
            return this.maxY+5;
        }else{
            return this.yMax();
        }
    }else{
        return 123;
    }
	
	
}
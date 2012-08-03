/**
 * @class sencha.ColumnChart
 * @extends chart.Chart
 * @author pulasthi@wso2.com
 **/


/**
 * Class sencha.ColumnChart : Chart
 * This is the custom wrapper class for sencha-touch ColumnChart charts
 * creates a column chart with the data provided
 * @param canvas the div to which the chart will be plotted
 * @param chartTitle the Title of the chart
 * @param chartDesc
 */
Viskit.s.chart.sencha.ColumnChart = function(canvas, chartTitle, chartDesc) {
    Viskit.s.chart.Chart.call(this, canvas, chartTitle, chartDesc);
    this.canvas = canvas;
    this.heightratio = 1;
    this.widthratio = 1;
    this.xAxisType('category')
     .titleTop(chartTitle);
	this.fields = [];
    this.snchadata = [];
    this.store;
    this.isNew= true;

}

// this makes c.protovis.ColumnChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.sencha.ColumnChart, Viskit.s.chart.Chart);

Viskit.s.chart.sencha.ColumnChart.prototype
    .property("barPadding")
    .property("barMargin")
    .property("barWidth")
    .property("xTitle")
    .property("yTitle")
//Public function load
//Loads the chart inside the given HTML element
Viskit.s.chart.sencha.ColumnChart.prototype.load = function (w, h) {


    }


/**
* @private
*/

Viskit.s.chart.sencha.ColumnChart.prototype.titleSpacing = function () {
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


/**
* @private
*/
Viskit.s.chart.sencha.ColumnChart.prototype.populateData = function (thisObject) {
    var _dataField = thisObject.traverseToDataField(thisObject.data, thisObject.dataField());
    this.fields = [];
    this.snchadata = [];
    this.fields.push("name");
    this.fields.push("data1");
    var dataGrpCount = 1;
    if( _dataField instanceof Array ) {
	dataGrpCount = _dataField.length;

    }

    thisObject.formattedData = [];
    thisObject.tempdata = [];
    var data1 = thisObject.dataValue()[1]
    for(var i=0;i<dataGrpCount;i++){
	this.snchadata.push({
	    'name':this.getDataLabel(i),
	    'data1':genDataMap(i)
	    });
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
};

Viskit.s.chart.sencha.ColumnChart.prototype.update = function () {
    this.populateData(this);
    if(this.isNew){
	this.isNew = false;
	var fieldsdata = this.fields;
	var senchadata = this.snchadata;
	var xtitle = this.xTitle();
	var ytitle = this.yTitle();
    var width =	this.width()
	var height = this.height();
	var title = this.titleTop();
	Ext.setup({

	    onReady: function() {
		window.storecolumnchart = new Ext.data.JsonStore({
		    fields: fieldsdata,
		    data: senchadata
		});

		var chartPanel = new Ext.chart.Panel({
            title: ' <div style="font-size:24px;font-style:bold"><center>'+title+'</center><div>',
		    width: width,
		    height: height,
		    renderTo: document.getElementById("tree-div"),

		    items: {
			width: 900,
			height: 500,
			store: storecolumnchart,
			animate: true,
			title:'titke',
			axes: [{
			    type: 'Category',
			    position: 'bottom',
			    fields: ['name'],
			    title: ytitle
			},{
			    type: 'Numeric',
			    position: 'left',
			    fields: ['data1'],
			    title: xtitle,
			    grid: true,
			    minimum: 0
			}],
			series: [{
			    type: 'column',
			    axis: 'left',
			    highlight: true,

			    label: {
				display: 'insideEnd',
				field: ['data1'],
				orientation: 'horizontal',
				color: '#333',
				'text-anchor': 'middle'
			    },
			    xField: 'name',
			    yField: ['data1']
			}],
			interactions: [{
        type: 'itemhighlight'
    },{
                    type: 'panzoom',
                    axes: {
                        right: {}
                    }
                }]

		    }
		});
	    }
	});
    }else{

	window.storecolumnchart.loadData(this.snchadata);
    }
};

Viskit.s.chart.sencha.ColumnChart.prototype.getDataLabel = function (i) {
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
Viskit.s.chart.sencha.ColumnChart.prototype.getTicks = function(type){
    var ticks = [];

    if(type === 'x'){
	if(this.dataLabel().length == 0){
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

};

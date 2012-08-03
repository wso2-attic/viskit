/**
 * @class sencha.BarChart
 * @extends chart.Chart
 * @author pulasthi@wso2.com
 **/


/**
 * Class sencha.BarChart : Chart
 * This is the custom wrapper class for sencha-touch BarChart charts
 * creates a bar chart with the data provided
 * @param canvas the div to which the chart will be plotted
 * @param chartTitle the Title of the chart
 * @param chartDesc
 */

Viskit.s.chart.sencha.BarChart = function(canvas, chartTitle, chartDesc) {
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

// this makes c.protovis.BarChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.sencha.BarChart, Viskit.s.chart.Chart);

Viskit.s.chart.sencha.BarChart.prototype
    .property("barPadding")
    .property("barMargin")
    .property("barWidth")
    .property("xTitle")
    .property("yTitle")
//Public function load
//Loads the chart inside the given HTML element
Viskit.s.chart.sencha.BarChart.prototype.load = function (w, h) {


    }


/**
* @private
*/

Viskit.s.chart.sencha.BarChart.prototype.titleSpacing = function () {
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
Viskit.s.chart.sencha.BarChart.prototype.populateData = function (thisObject) {
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

Viskit.s.chart.sencha.BarChart.prototype.update = function () {
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
		window.storebarchart = new Ext.data.JsonStore({
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
			store: storebarchart,
			animate: true,
			title:'titke',
			axes: [{
			    type: 'Numeric',
			    position: 'bottom',
			    fields: ['data1'],
			    title: xtitle,
			    grid: true,
			    minimum: 0
			}, {
			    type: 'Category',
			    position: 'left',
			    fields: ['name'],
			    title: ytitle
			}],
			series: [{
			    type: 'bar',
			    axis: 'bottom',
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
			}], interactions: [{
                    type: 'reset'
                },
                {
                    type: 'togglestacked'
                },
                {
                    type: 'iteminfo',
                    gesture: 'taphold',
                    panel: {
                        dockedItems: [{
                            dock: 'top',
                            xtype: 'toolbar',
                            title: 'Details'
                        }],

                        html: 'Testing'
                    },
                    listeners: {
                        'show': function(me, item, panel) {
                            panel.update('<ul><li><b>Month:</b> ' + item.value[0] + '</li><li><b>Value: </b> ' + item.value[1] + '</li></ul>');
                        }
                    }
                },
                {
                    type: 'itemcompare',
                    offset: {
                        x: -10
                    },
                    listeners: {
                        'show': function(interaction) {
                            var val1 = interaction.item1.value,
                                val2 = interaction.item2.value;

                            chartPanel.descriptionPanel.setTitle('Difference: ' + Math.round((val2[1] - val1[1])));
                            chartPanel.headerPanel.setActiveItem(1, {
                                type: 'slide',
                                direction: 'left'
                            });
                        },
                        'hide': function() {
                            chartPanel.headerPanel.setActiveItem(0, {
                                type: 'slide',
                                direction: 'right'
                            });
                        }
                    }
                }]

		    }
		});
	    }
	});
    }else{

	window.storebarchart.loadData(this.snchadata);
    }
};

Viskit.s.chart.sencha.BarChart.prototype.getDataLabel = function (i) {
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
Viskit.s.chart.sencha.BarChart.prototype.getTicks = function(type){
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

}

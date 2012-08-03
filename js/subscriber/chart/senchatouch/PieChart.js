/**
 * @class sencha.PieChart
 * @extends chart.Chart
 * @author pulasthi@wso2.com
 **/


/**
 * Class sencha.PieChart : Chart
 * This is the custom wrapper class for sencha-touch PieChart charts
 * creates a pie chart with the data provided
 * @param canvas the div to which the chart will be plotted
 * @param chartTitle the Title of the chart
 * @param chartDesc
 */
Viskit.s.chart.sencha.PieChart = function(canvas, chartTitle, chartDesc) {
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

// this makes c.protovis.PieChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.sencha.PieChart, Viskit.s.chart.Chart);

Viskit.s.chart.sencha.PieChart.prototype
    .property("barPadding")
    .property("barMargin")
    .property("barWidth")
    .property("xTitle")
    .property("yTitle")
//Public function load
//Loads the chart inside the given HTML element
Viskit.s.chart.sencha.PieChart.prototype.load = function (w, h) {


    }


/**
* @private
*/

Viskit.s.chart.sencha.PieChart.prototype.titleSpacing = function () {
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
Viskit.s.chart.sencha.PieChart.prototype.populateData = function (thisObject) {
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

Viskit.s.chart.sencha.PieChart.prototype.update = function () {
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
		window.storePieChart = new Ext.data.JsonStore({
		    fields: fieldsdata,
		    data: senchadata
		});

		var chartPanel = new Ext.chart.Panel({
            title: 'Chart',
		    width: width,
		    height: height,
		    renderTo: document.getElementById("tree-div"),

		    items: {
				
			store: storePieChart,
			animate: true,
			title:'titke',
			 
				highlight: {
          segment: {
            margin: 20
          }
        }, legend: {
                    position: {
                        portrait: 'bottom',
                        landscape: 'top'
                    },
                    labelFont: '12px Helvetica, Arial, sans-serif' // To be moved to SCSS
                },  interactions: [{
                    type: 'reset',
                    confirm: true
                },{
        type: 'itemhighlight'
    },
                {
                    type: 'pierotate',
                    singleTouch: true
                },
                {
                    type: 'iteminfo',
                    gesture: 'taphold',
                    listeners: {
                        show: function(interaction, item, panel) {
                            var storeItem = item.storeItem;
                            panel.update(['<ul><li><b>Month: </b>' + storeItem.get('name') + '</li>', '<li><b>Value: </b> ' + storeItem.get('data1') + '</li></ul>'].join(''));
                        }
                    }
                },
                {
                    type: 'piegrouping',
                    //snapWhileDragging: true,
                    onSelectionChange: function(me, items) {
                        if (items.length) {
                            var sum = 0,
                                i = items.length;
                            while(i--) {
                                sum += items[i].storeItem.get('data1');
                            }
                            chartPanel.descriptionPanel.setTitle('Total: ' + sum);
                            chartPanel.headerPanel.setActiveItem(1, {
                                type: 'slide',
                                direction: 'left'
                            });
                        }
                        else {
                            chartPanel.headerPanel.setActiveItem(0, {
                                type: 'slide',
                                direction: 'right'
                            });
                        }
                    }
                }],
			series: [{
                    type: 'pie',
                    field: 'data1',
                    showInLegend: true,
                    highlight: false,
// Example to return as soon as styling arrives for callouts
                    // callouts: {
                    //     renderer: function(callout, storeItem) {
                    //         callout.label.setAttributes({
                    //             text: 'value: ' + storeItem.get('data1')
                    //         }, true);
                    //     },
                    //     filter: function() {
                    //         return true;
                    //     },
                    //     box: {
                    //         fill: {
                    //           id: 'box-gradient',
                    //           angle: 0,
                    //           stops: {
                    //             '0': {
                    //               color: '#eee'
                    //             },
                    //             '100': {
                    //               color: '#888'
                    //             }
                    //           }
                    //         }
                    //     },
                    //     lines: {
                    //         'stroke-width': 2,
                    //         offsetFromViz: 20
                    //     },
                    //     label: {
                    //        //no config for this. 
                    //     }
                    // },
                    label: {
            field: 'name',
            display: 'rotate',
            contrast: true,
            font: '18px Arial'
        }
                }]

		    }
		});
	    }
	});
    }else{

	window.storePieChart.loadData(this.snchadata);
    }
};

Viskit.s.chart.sencha.PieChart.prototype.getDataLabel = function (i) {
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
Viskit.s.chart.sencha.PieChart.prototype.getTicks = function(type){
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
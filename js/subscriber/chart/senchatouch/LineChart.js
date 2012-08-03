/**
 * @class sencha.LineChart
 * @extends chart.Chart
 * @author pulasthi@wso2.com
 **/


/**
 * Class sencha.LineChart : Chart
 * This is the custom wrapper class for sencha-touch LineChart charts
 * creates a line chart with the data provided
 * @param canvas the div to which the chart will be plotted
 * @param chartTitle the Title of the chart
 * @param chartDesc
 */
Viskit.s.chart.sencha.LineChart = function(canvas, chartTitle, chartDesc) {
    Viskit.s.chart.Chart.call(this, canvas, chartTitle, chartDesc);
    this.canvas = canvas;
    this.titleTop(chartTitle);
	this.fields = [];
    this.snchadata = [];
    this.store;
    this.isNew= true;
	this.series = [];

}

// this makes c.protovis.LineChart.prototype inherits
// from Chart.prototype
Viskit.extend(Viskit.s.chart.sencha.LineChart, Viskit.s.chart.Chart);

Viskit.s.chart.sencha.LineChart.prototype
    .property("xTitle")
    .property("yTitle")
//Public function load
//Loads the chart inside the given HTML element
Viskit.s.chart.sencha.LineChart.prototype.load = function (w, h) {


    }


/**
* @private
*/

Viskit.s.chart.sencha.LineChart.prototype.titleSpacing = function () {
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
Viskit.s.chart.sencha.LineChart.prototype.populateData = function (thisObject) {
    var _dataField = thisObject.traverseToDataField(thisObject.data, thisObject.dataField());
    this.fields = [
                    {name: "name", type: "date", dateFormat: "time"}
                    
                ];
   
    var dataGrpCount = 1;
    if( _dataField instanceof Array ) {
	dataGrpCount = _dataField.length;
		
    }
	 if(thisObject.enableLocalStorage()){

        if(Viskit.util.localStorage.exsists(Viskit.util.genaratekey("sencha."+thisObject.divEl()))){
            Viskit.util.localStorage.manageStore(thisObject.storageTime(),Viskit.util.genaratekey("sencha."+thisObject.divEl()));
            var jsonString = Viskit.util.localStorage.getItem(Viskit.util.genaratekey("sencha."+thisObject.divEl()));
			 thisObject.snchadata = this.convertFromLocalstorage(jsonString);
		// alert(JSON.stringify(thisObject.snchadata));
			
        }
    }else if(thisObject.enableSessionStorage()){
        if(Viskit.util.sessionStorage.exsists(Viskit.util.genaratekey("sencha."+thisObject.divEl()))){
            Viskit.util.sessionStorage.manageStore(thisObject.storageTime(),Viskit.util.genaratekey("sencha."+thisObject.divEl()));
            var jsonString = Viskit.util.sessionStorage.getItem(Viskit.util.genaratekey("sencha."+thisObject.divEl()));
            thisObject.snchadata = JSON.parse(jsonString);
			
        }
		
    }
	 var cdate = new Date();
 var cdatemili = cdate.getTime();
		var jstring = '{ "name":' + cdatemili ;

	for(var i=0;i<dataGrpCount;i++){
	this.fields.push({
	    'name':this.getDataLabel(i),
	    'type':'float'
	    });
	
	jstring += ', "' + this.getDataLabel(i) + '":' +genDataMap(i) ;
	this.series.push({
                    type: 'line',
                    highlight: {
                        size: 3,
                        radius: 3
                    },
                    fill: true,
                    smooth: true,
                    axis: 'left',
                    xField: 'name',
                    yField:this.getDataLabel(i)
                });
    }
	jstring += '}'
 
	var jobject = JSON.parse(jstring);
	this.snchadata.push(jobject);
 //alert("after    :" + JSON.stringify(this.snchadata));
   if(thisObject.enableLocalStorage()){
		var data = this.convertToLocalstorage(this,dataGrpCount);
        var jsonData = JSON.stringify(data);
        Viskit.util.localStorage.setItem(Viskit.util.genaratekey("sencha."+thisObject.divEl()),jsonData);
    }else if(thisObject.enableSessionStorage()){
		var data = this.convertToLocalstorage(this,dataGrpCount);
        var jsonData = JSON.stringify(data);
        Viskit.util.sessionStorage.setItem(Viskit.util.genaratekey("sencha."+thisObject.divEl()),jsonData);
		
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
};
//asdasd
Viskit.s.chart.sencha.LineChart.prototype.convertToLocalstorage = function (thisObject,count) {
	var data = [];
	
	for( var i = 0; i < count ; i++ ){
		 var tempdata = []
		for(var j = 0 ; j < this.snchadata.length ; j++ ){
			
			var tempdata1 = [];
			tempdata1.push(this.snchadata[j]['name']);
			tempdata1.push(this.snchadata[j][this.getDataLabel(i)]);
			tempdata.push(tempdata1);
		}
		data.push(tempdata);
	}
	
	return data;
};
//asasas
Viskit.s.chart.sencha.LineChart.prototype.convertFromLocalstorage = function (jsonString,count) {
	var data = JSON.parse(jsonString); 
	var jsondata = [];
	var count = data[0].length;
	for( var i = 0 ;i < count ; i++ ){
		 var tempjsonstring = '{ "name":' + data[0][i][0];
		for( var j = 0 ;j < data.length ; j++ ){
			tempjsonstring +=  ',"' + this.getDataLabel(j) + '":' + data[j][i][1] ; 
		}
		tempjsonstring += '}';
		jsondata.push(JSON.parse(tempjsonstring));
		
	}
	return jsondata;
	
}

Viskit.s.chart.sencha.LineChart.prototype.update = function () {
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
	var zseries = this.series;
	var divid = this.divEl();
Ext.setup({
   
    onReady: function() {
       
      window.storelinechart = new Ext.data.JsonStore({
		    fields: fieldsdata,
		    data: senchadata
		});

      
        new Ext.chart.Panel({
             title: title,
		    width: width,
		    height: height,
		    renderTo: document.getElementById(divid),

           
            items: {
                cls: 'line1',
                theme: 'Demo',
                store: storelinechart,
                animate: true,
                shadow: true,
                legend: {
                    position: 'right'
                },
                axes: [{
                    type: 'Numeric',
                    minimum: 0,
                    maximum: 100,
                    position: 'left',
                    fields: ['Series 1','Series 2'],
                    title: ytitle,
                    minorTickSteps: 1
                }, {
					   type: 'Time',
       				 dateFormat: 'd h:i:s',
					 position: 'bottom',
                    fields: ['name'],
					groupBy: 'year,month,day,hour,minute,second',
                   title: xtitle,
				    label: {
						rotate: {
							degrees: 345
						}
					}
                }],
                series: zseries
            }
        });
    }
});
}else{

	window.storelinechart.loadData(this.snchadata);
    }

};

Viskit.s.chart.sencha.LineChart.prototype.getDataLabel = function (i) {
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
Viskit.s.chart.sencha.LineChart.prototype.getTicks = function(type){
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
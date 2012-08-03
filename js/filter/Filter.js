/**
 * Filter
 */
Viskit.f.Filter = function() {
    this.attr = [];
	this.dp = null;
	this.drList = [];
	Viskit.environment.filters.push(this);
    id = Viskit.environment.filters.length - 1;
    this.getID = function() {return id;}
};

Viskit.f.Filter.prototype.property = function(name) {
    /*
    * Define the setter-getter globally
    */
    Viskit.f.Filter.prototype[name] = function(v) {
      if (arguments.length) {
        this.attr[name] = v;
        return this;
      }
      return this.attr[name];
    };

    return this;
};

Viskit.f.Filter.prototype.dataProvider = function(dp) {
	this.dp = dp;
	this.dp.addDataReceiver(this);
	return;
};

Viskit.f.Filter.prototype.addDataReceiver = function(dr) {
	this.drList.push(dr);
};

Viskit.f.Filter.prototype.pushData = function(data) {
	var filteredData = this.filterData(data);
	for (i = 0; i < this.drList.length; i++) {
		(this.drList[i]).pushData(filteredData); 
	}
};

Viskit.f.Filter.prototype.pullData = function() {
	this.dp.pullData();
};

Viskit.f.Filter.prototype.filterData = function(data) {
	return data;
};

Viskit.f.Filter.prototype.traverseToDataField = function (object, dataFieldArray) {
	var a = object;					
	for (var i = 0; i < dataFieldArray.length; i++) {
		a = a[dataFieldArray[i]];
	}
	return a;
};

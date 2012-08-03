/**
 * @class Select
 * @extends Form
 */
Viskit.f.form.Select = function() { //canvas, selectID, onChangeFuncStr, dataField, key, value, defaultText) {
    Viskit.f.BasicFilter.call(this);
    this.defaultText("default");
    this.filterArray([]);
    /* @private */
	this.dirty = true;
};

Viskit.extend(Viskit.f.form.Select, Viskit.f.BasicFilter);

Viskit.f.form.Select.prototype
    .property("canvas")
    .property("dataField")
    .property("dataLabel")
    .property("dataValue")
    .property("defaultText");

Viskit.f.form.Select.prototype.invalidate = function() {
    this.dirty = true;
}

/*Viskit.f.form.Select.prototype.filterData = function(data) {
    if (this.dirty) {
        this.dirty = false;
        
        
        
    }
    this.superclass.filterData(data);
};*/

Viskit.f.form.Select.prototype.create = function() {
    var newElementHTML = '<select id="ViskitSelect_'+this.getID()+'" onchange="Viskit.fn.selectFormChanged('+this.getID()+');">';
    if ((this.filterArray() !== undefined) && (this.filterArray() !== null) && (this.filterArray().length > 0)) {
        newElementHTML += '<option value="' + this.defaultText() + '">' + this.defaultText() + '</option>';
        newElementHTML += '<option value="' + this.filterArray()[0] + '" selected>' + this.filterArray()[0] + '</option>';        
    }
    else {
        newElementHTML += '<option value="' + this.defaultText() + '" selected>' + this.defaultText() + '</option>';
    }    
    if (this.remainingArray !== null && this.remainingArray.length > 0) {
        for (var x = 0; x < this.remainingArray.length; x++) {
            newElementHTML += '<option value="' + this.remainingArray[x] + '">' + this.remainingArray[x] + '</option>'
        }
    }    
    newElementHTML += '</select>';
    return newElementHTML;
};

Viskit.f.form.Select.prototype.load = function() {
    var canvas = document.getElementById(this.canvas());
    canvas.innerHTML = this.create();
};

Viskit.f.form.Select.prototype.unload = function() {
    var canvas = document.getElementById(this.canvas());
    canvas.innerHTML = "";
};

Viskit.f.form.Select.prototype.onChange = function(text) {
};

Viskit.fn.selectFormChanged = function(id) {
    var filter = Viskit.fn.getFilterFromID(id);
    var elem = document.getElementById("ViskitSelect_"+id);
    filter.filterArray([]);
    if (elem[elem.selectedIndex].text != filter.defaultText())
        filter.filterArray().push(elem[elem.selectedIndex].text);   
    filter.onChange(elem[elem.selectedIndex].text);  
};

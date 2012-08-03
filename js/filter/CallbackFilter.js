/**
* Constructs a new CallbackFilter.
* @class Represents a filter which uses a callback function to filter data.
* @augments Viskit.f.Filter
* @param {callback} callback callback function to filter data.
* @constructor
*/
Viskit.f.CallbackFilter = function(callback) {
	Viskit.f.Filter.call(this);
    this.callback(callback);
};

Viskit.extend(Viskit.f.CallbackFilter, Viskit.f.Filter);

/* Define all properties. */
Viskit.f.CallbackFilter.prototype
    .property("callback");

/**
* @private Filters data from the data object.
* @param {data} data the data object.
*/
Viskit.f.CallbackFilter.prototype.filterData = function(data) {
    return this.callback().call(this, data);
};


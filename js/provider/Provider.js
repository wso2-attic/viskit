/**
 * Abstract Class for Providers
 * @class Provider
 * @constructor
 */
Viskit.p.Provider = function() {
    this.drList = [];
    Viskit.environment.providers.push(this);
    id = Viskit.environment.providers.length - 1;
    this.getID = function() {
        return id;
    }
};
/**
 * initialize the provider
 */
Viskit.p.Provider.prototype.initialize = function() {
};

/**
 * add a data receiver. the data receiver add will receive data from the provider
 * @param dataReceiver the data receiver
 */
Viskit.p.Provider.prototype.addDataReceiver = function(dataReceiver) {
    this.drList.push(dataReceiver);
};
/**
 * loops all the data receiver specified for this provider and pumps data into them
 *
 * @param data data to be pushed into the data receivers
 */
Viskit.p.Provider.prototype.pushData = function(data) {
    // loop all data receivers. Pump data to them.
    //console.log(JSON.stringify(data) + this.url);
    if (this.postValidate(this, data)) {
        for (i = 0; i < this.drList.length; i++) {
            (this.drList[i]).pushData(data);
        }
    }
};
/**
 * pre validating function
 * @param that
 */
Viskit.p.Provider.prototype.preValidate = function(that) {
    return true;
};
/**
 * post validating function
 * @param that
 * @param data
 */
Viskit.p.Provider.prototype.postValidate = function(that, data) {
    return true;
};

Viskit.p.Provider.prototype.errorCallback = function(phase, that, type) {
};

Viskit.p.Provider.prototype.flowStart = function(that) {
};

Viskit.p.Provider.prototype.pullData = function() {

};


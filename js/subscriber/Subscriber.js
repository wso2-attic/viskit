/** 
 * DataSubscriber 
 */
Viskit.s.Subscriber = function() {
	this.attr = [];
	this.propertylist = [];
    Viskit.environment.subscribers.push(this);
    id = Viskit.environment.subscribers.length - 1;
    this.getID = function() {
        return id;
    };
};

Viskit.s.Subscriber.prototype.property = function(name) {
    /*
    * Define the setter-getter globally
    */
	

	Viskit.s.Subscriber.prototype[name] = function(v) {
	  

      if (arguments.length) {
		this.propertylist.push(name);
        this.attr[name] = v;
        return this;
      }
      return this.attr[name];
    };
    return this;
};
Viskit.s.Subscriber.prototype.getProperties = function (){

	//	var jsonArray = [];
	//for(var i = 0; i< this.propertylist.length;i++){
	//		jsonArray.push({ key: this.propertylist[i], value: this.attr[this.propertylist[i]]});
	//	}
	return this.propertylist;	
}

/**
 * Set data to the subscriber. Providers use this method to push data to subscribers.
 *
 * @param {object} [data] a JSON object.
 */
Viskit.s.Subscriber.prototype.pushData = function(data) {
	
};


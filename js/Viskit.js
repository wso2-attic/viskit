/**
 * The top-level Viskit namespace. All public methods and fields should be
 * registered on this object. Note that core Viskit source is surrounded by an
 * anonymous function, so any other declared globals will not be visible outside
 * of core methods. This also allows multiple versions of Viskit to coexist,
 * since each version will see their own <tt>Viskit</tt> namespace.
 *
 * @namespace The top-level Viskit namespace, <tt>Viskit</tt>.
 */
var Viskit = {};

/**
 * @namespace Viskit namespace for Providers, <tt>Viskit.p</tt>.
 */
Viskit.p = {};

/**
 * @namespace Viskit namespace for Filters, <tt>Viskit.f</tt>.
 */
Viskit.f = {};

/**
 * @namespace Viskit namespace for Filter Forms, <tt>Viskit.f.form</tt>.
 */
Viskit.f.form = {};

/**
 * @namespace Viskit namespace for Subscribers, <tt>Viskit.s</tt>.
 */
Viskit.s = {};

/**
 * @namespace Viskit namespace for Subscriber Charts, <tt>Viskit.s.chart</tt>.
 */
Viskit.s.chart = {};

/**
 * @namespace Viskit namespace for Subscriber Protovis Charts, <tt>Viskit.s.chart.protovis</tt>.
 */
Viskit.s.chart.protovis = {};

/**
 * @namespace Viskit namespace for Subscriber Raphael Charts, <tt>Viskit.s.chart.raphael</tt>.
 */
Viskit.s.chart.raphael = {};
/**
 * @namespace Viskit namespace for Subscriber Raphael Charts, <tt>Viskit.s.chart.sencha</tt>.
 */
Viskit.s.chart.sencha = {};
/**
 * @namespace Viskit namespace for Subscriber jqplot Charts, <tt>Viskit.s.chart.jqplot</tt>.
 */
Viskit.s.chart.jqplot = {};
/**
 * @namespace Viskit namespace for Subscriber Infovis Charts, <tt>Viskit.s.chart.raphael</tt>.
 */
Viskit.s.chart.infovis = {};

/**
 * @namespace Viskit namespace for Subscriber composite Charts, <tt>Viskit.s.chart.composite</tt>.
 */
Viskit.s.chart.composite = {};

/**
 * @namespace Viskit namespace for Subscriber Forms, <tt>Viskit.s.form</tt>.
 */
Viskit.s.form = {};

/**
 * @namespace Viskit namespace for Subscriber Gauges, <tt>Viskit.s.gauge</tt>.
 */
Viskit.s.gauge = {};

/**
 * @namespace Viskit namespace for Subscriber Raphael Charts, <tt>Viskit.s.chart.raphael</tt>.
 */
Viskit.s.gauge.raphael = {};

/**
 * @namespace Viskit namespace for Utility Components, <tt>Viskit.u</tt>.
 */
Viskit.u = {};

/**
 * @namespace Viskit namespace for utility functions, <tt>Viskit.util</tt>.
 */
Viskit.util = {};

/**
 * @namespace Viskit namespace for utility localStorage functions, <tt>Viskit.util.localStorage</tt>.
 */
 
Viskit.util.localStorage = {};
/**
 * @namespace Viskit namespace for utility sessionStorage functions, <tt>Viskit.util.sessionStorage</tt>.
 */
 
Viskit.util.sessionStorage = {};
/**
 * @namespace Viskit namespace for Adaptors, <tt>Viskit.a</tt>.
 */
Viskit.a = {};

/**
 * @namespace Viskit namespace for controls, <tt>Viskit.c</tt>.
 */
Viskit.c = {};

/**
 * @namespace Viskit namespace for user defined custom functions, <tt>Viskit.fn</tt>.
 */
Viskit.fn = {};

/**
 * Viskit major and minor version numbers.
 *
 * @namespace Viskit major and minor version numbers.
 */
Viskit.version = {
   /**
    * The major version number.
    *
    * @type number
    * @constant
    */
    major: 0,

   /**
    * The minor version number.
    *
    * @type number
    * @constant
    */
    minor: 1
};

/**
 * Viskit environment. All data providers, filters and charts are registred in the environment.
 * @namespace Viskit namespace for environment variables, <tt>Viskit.environment</tt>.
 */ 
Viskit.environment = {
   /** 
    * providers array
    */
    providers: [],

   /** 
    * filters array
    */
    filters: [],
    
   /**
    * charts array
    */
    charts: [],
    
   /** 
    * dialogs array
    */
    dialogs: [],
    
    /**
     * subscribers array
     */
     subscribers: [],
     
    /**
     * adapters array
     */
     adapters: [],

	 /**
	  * controls array
	  */
	 controls: [],
	 
	 /**
	  * gauges array
	  */
	 gauges: []
	
};

Viskit.fn.getProviderFromID = function(id) {
    if ((id >= 0) && (Viskit.environment.providers.length > id)) {
        return Viskit.environment.providers[id];
    }
    return null;
};

Viskit.fn.getFilterFromID = function(id) {
    if ((id >= 0) && (Viskit.environment.filters.length > id)) {
        return Viskit.environment.filters[id];
    }
    return null;    
};

Viskit.fn.getChartFromID = function(id) {
    if ((id >= 0) && (Viskit.environment.charts.length > id)) {
        return Viskit.environment.charts[id];
    }
    return null;
};

Viskit.fn.getDialogFromID = function(id) {
    if ((id >= 0) && (Viskit.environment.dialogs.length > id)) {
        return Viskit.environment.dialogs[id];
    }
    return null;
};

Viskit.fn.getElementFromID = function(id) {
    if ((id >= 0) && (Viskit.environment.elements.length > id)) {
        return Viskit.environment.elements[id];
    }
    return null;
};

Viskit.fn.getAdapterFromID = function(id) {
    if ((id >= 0) && (Viskit.environment.adapters.length > id)) {
        return Viskit.environment.adapters[id];
    }
    return null;
};

Viskit.fn.getControlFromID = function(id) {
    if ((id >= 0) && (Viskit.environment.controls.length > id)) {
        return Viskit.environment.controls[id];
    }
    return null;
};

Viskit.fn.getGaugeFromID = function(id) {
    if ((id >= 0) && (Viskit.environment.gauges.length > id)) {
        return Viskit.environment.gauges[id];
    }
    return null;
};

Viskit.fn.traverseToDataField = function (object, dataFieldArray) {
	var a = object;					
	for (var i = 0; i < dataFieldArray.length; i++) {
		a = a[dataFieldArray[i]];
	}
	return a;
};

Viskit.fn.traverseNKillLeaf = function (object, dataFieldArray) {
	var a = object;
	for (var i = 0; i < dataFieldArray.length; i++) {
		if (i == dataFieldArray.length - 1) {
			delete a[dataFieldArray[i]];
		}
		else {
			a = a[dataFieldArray[i]];
		}
	}
};

/* using "Parasitic Combination Inheritance" */
Viskit.extend = function(subc, superc /*, overrides*/) {
    if (!superc||!subc) {
        throw new Error("extend failed, please check that " +
                        "all dependencies are included.");
    }
    var F = function() {}/*, i*/;
    F.prototype=superc.prototype;
    subc.prototype=new F();
    subc.prototype.constructor=subc;
    subc.superclass=superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor=superc;
    }

    /* Lets worry about the following later
    if (overrides) {
        for (i in overrides) {
            if (L.hasOwnProperty(overrides, i)) {
                subc.prototype[i]=overrides[i];
            }
        }

        L._IEEnumFix(subc.prototype, overrides);
    } */
};

Viskit.initialize = function() {
    Viskit.environment.tooltip = new Viskit.c.Tooltip();
};

Viskit.fn.ArraytoJSON = function(array){
	
	
}

Viskit.fn.JSONtoArray = function(array){
	
	
}



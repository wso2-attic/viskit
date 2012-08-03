/**
 * @class
 * Base class for all gauges
 */
Viskit.s.gauge.Gauge = function (canvas, ttle, desc) {
    Viskit.s.Subscriber.call(this);
    /* @private */
    this.title(ttle)
        .description(desc)
        .divEl(canvas)
        .tooltip(true)
        //.legend(true)
        //.marks(false)
        .width(600)
        .height(500)
        //.titleFont("10px sans-serif")
        //.labelFont("10px sans-serif")
        //.legendX(0)
        //.legendY(0)
        .paddingTop(25)
        .paddingLeft(10)
        .paddingRight(60)
        .paddingBottom(10);

    /* @private */
    this.data = null;
    //this.formattedData = null;

    Viskit.environment.gauges.push(this);
    id = Viskit.environment.gauges.length - 1;
    this.getID = function() {
        return id;
    };
};

Viskit.extend(Viskit.s.gauge.Gauge, Viskit.s.Subscriber);

Viskit.s.gauge.Gauge.prototype
    .property("title")
    .property("description")
    .property("divEl")
    .property("msgDiv")
    .property("tooltip")
    //.property("legend")
    .property("x")
    .property("y")
    .property("width")
    .property("height")
    .property("paddingTop")
    .property("paddingLeft")
    .property("paddingRight")
    .property("paddingBottom")
    .property("anchorTop")
    .property("anchorLeft")
    .property("anchorRight")
    .property("anchorBottom")
    //.property("legendX")
    //.property("legendY")
    .property("titleFont");
    //.property("labelFont")
    //.property("marks");

Viskit.s.gauge.Gauge.prototype.pushData = function (d) {
    if( this.validateData(d) ){
        this.data = d;
        this.update();
    } else {
        this.updateMessageDiv(this.messageInterceptFunction());
    }
};

Viskit.s.gauge.Gauge.prototype.validateData = function (d) {
    //Check whether we have valid data or not.
    if( d === null || d === undefined ) {
        return false;
    }
    else {
        return true;
    }
};

Viskit.s.gauge.Gauge.prototype.update = function () {
};

Viskit.s.gauge.Gauge.prototype.updateMessageDiv = function (s) {
    if( this.msgDiv() !== undefined ) {
        var msgdiv = document.getElementById(this.msgDiv());
        if( msgdiv !== undefined ) {
            msgdiv.innerHTML = s;
            msgdiv.style.display = "block";
        }
    }
};

Viskit.s.gauge.Gauge.prototype.messageInterceptFunction = function () {
    return "Invalid Data";
};

Viskit.s.gauge.Gauge.prototype.onClick = function () {
};

Viskit.s.gauge.Gauge.prototype.onTooltip = function (data) {
    return "";
};

Viskit.s.gauge.Gauge.prototype.onKey = function () {
};

Viskit.s.gauge.Gauge.prototype.traverseToDataField = function (object, dataFieldArray) {
	var a = object;
    try { //Try catch outside the loop TODO
	    for (var i = 0; i < dataFieldArray.length; i++) {
		    a = a[dataFieldArray[i]];
	    }
    }
    catch (e) {
        this.updateMessageDiv(this.messageInterceptFunction());
    }
	return a;
};

Viskit.s.gauge.Gauge.prototype.getDataObject = function (dataObj, i) {
    if( dataObj instanceof Array ) {
        return dataObj[i];
    }
    else {
        return dataObj;
    }
};


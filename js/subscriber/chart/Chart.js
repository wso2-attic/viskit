/**
 * @class
 * Base class for all charts
 */
Viskit.s.chart.Chart = function (canvas, ttle, desc) {
    Viskit.s.Subscriber.call(this);
    /* @private */
    this.title(ttle)
            .description(desc)
            .divEl(canvas)
            .tooltip(true)
            .legend(true)
            .marks(false)
            .width(600)
            .height(500)
            .titleFont("10px sans-serif")
            .labelFont("10px sans-serif")
            .legendX(0)
            .legendY(0)
            .paddingTop(25)
            .paddingLeft(10)
            .paddingRight(60)
            .paddingBottom(10)
			.anchorTop(false)
			.anchorBottom(false)
			.anchorLeft(false)
			.anchorRight(false)
			.enableLocalStorage(false)
			.enableSessionStorage(false)
			.storageTime(0);
    /* @private */
    this.data = null;
    this.formattedData = null;

    Viskit.environment.charts.push(this);
    id = Viskit.environment.charts.length - 1;
    this.getID = function() {
        return id;
    };
	
};

Viskit.extend(Viskit.s.chart.Chart, Viskit.s.Subscriber);

Viskit.s.chart.Chart.prototype
        .property("title")
        .property("description")
        .property("divEl")
        .property("msgDiv")
        .property("tooltip")
        .property("legend")
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
        .property("legendX")
        .property("legendY")
        .property("titleFont")
        .property("labelFont")
        .property("marks")
		.property("enableLocalStorage")
		.property("enableSessionStorage")
		.property("storageTime");
		
Viskit.s.chart.Chart.prototype.pushData = function (d) {
    if (this.validateData(d)) {
        this.data = d;
        this.preUpdate();
        this.update();
        this.postUpdate();
    } else {
        this.updateMessageDiv(this.messageInterceptFunction());
    }
};

Viskit.s.chart.Chart.prototype.validateData = function (d) {
    //Check whether we have valid data or not.
    if (d === null || d === undefined) {
        return false;
    }
    else {
        return true;
    }
};

Viskit.s.chart.Chart.prototype.update = function () {
};

Viskit.s.chart.Chart.prototype.updateMessageDiv = function (s) {

    if (this.msgDiv() !== undefined) {
        var msgdiv = document.getElementById(this.msgDiv());
        if (msgdiv !== undefined) {
            msgdiv.innerHTML = s;
            msgdiv.style.display = "block";
        }
    }
};

Viskit.s.chart.Chart.prototype.showMessageDiv = function () {
    if (this.msgDiv() !== undefined) {
        var msgdiv = document.getElementById(this.msgDiv());
        if (msgdiv !== undefined) {
            msgdiv.style.display = "block";
        }
    }
};

Viskit.s.chart.Chart.prototype.hideMessageDiv = function (s) {
    if (this.msgDiv() !== undefined) {
        var msgdiv = document.getElementById(this.msgDiv());
        if (msgdiv !== undefined) {
            msgdiv.style.display = "none";
        }
    }
};

Viskit.s.chart.Chart.prototype.messageInterceptFunction = function () {

    return "Invalid Data";
};

Viskit.s.chart.Chart.prototype.onClick = function () {
};

Viskit.s.chart.Chart.prototype.onTooltip = function (data) {
    return "";
};

Viskit.s.chart.Chart.prototype.onKey = function () {
};

Viskit.s.chart.Chart.prototype.traverseToDataField = function (object, dataFieldArray) {
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

Viskit.s.chart.Chart.prototype.getDataObject = function (dataObj, i) {
    if (dataObj instanceof Array) {
        return dataObj[i];
    }
    else {
        return dataObj;
    }
};

Viskit.s.chart.Chart.prototype.preUpdate = function () {

};

Viskit.s.chart.Chart.prototype.postUpdate = function () {

};

Viskit.s.chart.Chart.prototype.show = function() {
    var divEl = document.getElementById(this.divEl());
    if (divEl !== undefined) {
        divEl.style.display = "block";
    }
};

Viskit.s.chart.Chart.prototype.hide = function() {
    var divEl = document.getElementById(this.divEl());
    if (divEl !== undefined) {
        divEl.style.display = "none";
    }
};


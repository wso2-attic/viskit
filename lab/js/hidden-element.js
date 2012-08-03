Viskit.ide.hwElement = function (hElement, type, name) { /* type = 0 for provider, 1 for filter, 2 for adaptor */
	this.elem = hElement;
	this.type = type;
	this.name = name;
}

Viskit.ide.hwElement.prototype.pushData = function (d) {
	this.elem.pushData(d);
}

Viskit.ide.hwElement.prototype.pullData = function () {
	this.elem.pullData();
}

Viskit.ide.hwElement.prototype.pullDataSync = function () {
	this.elem.pullDataSync();
}

Viskit.ide.hwElement.prototype.initialize = function () {
	this.elem.initialize();
}

Viskit.ide.hwElement.prototype.addDataReceiver = function (res) {
	this.elem.addDataReceiver(res);
}






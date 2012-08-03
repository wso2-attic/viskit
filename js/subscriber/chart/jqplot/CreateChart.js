/**
 * to report errors related to addScript in gadgets
 * @param errString the error string
 */
Viskit.s.chart.jqplot.reportError =  function (errString) {
    if(!window.__error) window.__error = {};
    if( !window.__error[errString] ) {
        // Suppress multiple
        window.__error[errString] = true;
        alert(errString);
    }
};
/**
 *  @return returns the module base
 */
Viskit.s.chart.jqplot.getModuleBase = function () {
    if( window.__moduleBase ) return window.__moduleBase;
    if( _args ) {
        var moduleBase=_args()['url'];
        moduleBase=moduleBase.substring(0,moduleBase.lastIndexOf('/')+1);
        window.__moduleBase = moduleBase;
        return window.__moduleBase;
    };
    this.reportError('Can not find module base. Gadget may not work properly.');
    return '';
};
/**
 * returns the rebase relative URL
 * @param relativeUrl the relative URL
 * @param cached
 * @return returns the rebase relative URL
 */
Viskit.s.chart.jqplot.rebaseRelativeUrl = function (relativeUrl,cached) {
    var moduleBase = this.getModuleBase();
    var absUrl = moduleBase+relativeUrl;
    if( cached && _IG_GetCachedUrl ) {
        absUrl = _IG_GetCachedUrl(absUrl);
    };
    return absUrl;
};
/**
 * adds the css given by the URL into the gadget css
 * @param cssRelativeUrl the relative URL of the CSS sheet
 */
Viskit.s.chart.jqplot.addStylesheet = function (cssRelativeUrl) {
    var rebasedUrl = this.rebaseRelativeUrl(cssRelativeUrl,true);
    document.write('<link rel="stylesheet" href="'+rebasedUrl+'">')
};

/**
 * adds the script file given by the url into the gadget
 * @param jsRelativeUrl the relative URL of the script file
 */
Viskit.s.chart.jqplot.addScript = function (jsRelativeUrl,callback) {
    var rebasedUrl = this.rebaseRelativeUrl(jsRelativeUrl,true);
    document.write('<script type="text/javascript" src="'+rebasedUrl+'"><\/script>')
    if(callback){
		callback();
	}
};
/**
 * checks whether the script is running in a gadget or otherwise and calls the methods needed accordingly to
 * import the required script files according to the chart type
 * @param type the chart type that is being used
 */
Viskit.s.chart.jqplot.pluginsType = function(type,callback){
	
    if(typeof(_args) !== 'undefined'){
        if(type==="LineChart"){
            this.addScript('plugins/jqplot.categoryAxisRenderer.js');
            this.addScript('plugins/jqplot.dateAxisRenderer.js');
            this.addScript('plugins/jqplot.canvasTextRenderer.js');
            this.addScript('plugins/jqplot.enhancedLegendRenderer.js');
            this.addScript('plugins/jqplot.pointLabels.js');
            this.addScript('plugins/jqplot.json2.js');
            this.addScript('plugins/jqplot.cursor.js');
            this.addScript('plugins/jqplot.canvasAxisLabelRenderer.js');
	
	
			
			
        }else if(type==="PieChart"){
            this.addScript('plugins/jqplot.categoryAxisRenderer.js');
            this.addScript('plugins/jqplot.pointLabels.js');
            this.addScript('plugins/jqplot.dateAxisRenderer.js');
            this.addScript('plugins/jqplot.canvasTextRenderer.js');
            this.addScript('plugins/jqplot.enhancedLegendRenderer.js');
            this.addScript('plugins/jqplot.pieRenderer.js');
            this.addScript('plugins/jqplot.json2.js');
            this.addScript('plugins/jqplot.canvasAxisLabelRenderer.js');
        }else if(type==="BarChart"){
            this.addScript('plugins/jqplot.barRenderer.js');
            this.addScript('plugins/jqplot.categoryAxisRenderer.js');
            this.addScript('plugins/jqplot.pointLabels.js');
            this.addScript('plugins/jqplot.dateAxisRenderer.js');
            this.addScript('plugins/jqplot.canvasTextRenderer.js');
            this.addScript('plugins/jqplot.enhancedLegendRenderer.js');
            this.addScript('plugins/jqplot.json2.js');
            this.addScript('plugins/jqplot.canvasAxisLabelRenderer.js');
			
					
        }else if(type==="BubbleChart"){
            this.addScript('plugins/jqplot.BubbleRenderer.js');
            this.addScript('plugins/jqplot.categoryAxisRenderer.js');
            this.addScript('plugins/jqplot.pointLabels.js');
            this.addScript('plugins/jqplot.dateAxisRenderer.js');
            this.addScript('plugins/jqplot.canvasTextRenderer.js');
            this.addScript('plugins/jqplot.enhancedLegendRenderer.js');
            this.addScript('plugins/jqplot.json2.js');
            this.addScript('plugins/jqplot.canvasAxisLabelRenderer.js');

        }
    }else {
        if(type==="LineChart"){
            $.getScript('plugins/jqplot.categoryAxisRenderer.js');
            $.getScript('plugins/jqplot.dateAxisRenderer.js');
            $.getScript('plugins/jqplot.canvasTextRenderer.js');
            $.getScript('plugins/jqplot.enhancedLegendRenderer.js');
            $.getScript('plugins/jqplot.pointLabels.js');
            $.getScript('plugins/jqplot.json2.js');
            $.getScript('plugins/jqplot.cursor.js');
            $.getScript('plugins/jqplot.canvasAxisLabelRenderer.js');
			
			
        }else if(type==="PieChart"){
            $.getScript('plugins/jqplot.categoryAxisRenderer.js');
            $.getScript('plugins/jqplot.pointLabels.js');
            $.getScript('plugins/jqplot.dateAxisRenderer.js');
            $.getScript('plugins/jqplot.canvasTextRenderer.js');
            $.getScript('plugins/jqplot.enhancedLegendRenderer.js');
            $.getScript('plugins/jqplot.pieRenderer.js');
            $.getScript('plugins/jqplot.json2.js');
            $.getScript('plugins/jqplot.canvasAxisLabelRenderer.js');

        }else if(type==="BarChart"){
            $.getScript('plugins/jqplot.barRenderer.js');
            $.getScript('plugins/jqplot.categoryAxisRenderer.js');
            $.getScript('plugins/jqplot.pointLabels.js');
            $.getScript('plugins/jqplot.dateAxisRenderer.js');
            $.getScript('plugins/jqplot.canvasTextRenderer.js');
            $.getScript('plugins/jqplot.enhancedLegendRenderer.js');
            $.getScript('plugins/jqplot.json2.js');
            $.getScript('plugins/jqplot.canvasAxisLabelRenderer.js');
	
			
        }else if(type==="BubbleChart"){
            $.getScript('plugins/jqplot.BubbleRenderer.js');
            $.getScript('plugins/jqplot.categoryAxisRenderer.js');
            $.getScript('plugins/jqplot.pointLabels.js');
            $.getScript('plugins/jqplot.dateAxisRenderer.js');
            $.getScript('plugins/jqplot.canvasTextRenderer.js');
            $.getScript('plugins/jqplot.highlighter.js');
            $.getScript('plugins/jqplot.json2.js');
            $.getScript('plugins/jqplot.canvasAxisLabelRenderer.js');
			

        }
    }
	
	
}



@ECHO Building Viskit library..
@ECHO ON
SETLOCAL
SET JS_SUBSCRIBER_FILES=js\subscriber\Subscriber.js^
+js\subscriber\chart\Chart.js^
+js\subscriber\chart\protovis\WedgeChart.js^
+js\subscriber\chart\protovis\BarChart.js^
+js\subscriber\chart\protovis\ClusteredBarChart.js^
+js\subscriber\chart\protovis\ColumnChart.js^
+js\subscriber\chart\protovis\ClusteredColumnChart.js^
+js\subscriber\chart\protovis\AreaChart.js^
+js\subscriber\chart\protovis\AreaChart2.js^
+js\subscriber\chart\protovis\LineChart.js^
+js\subscriber\chart\protovis\LineChart2.js^
+js\subscriber\chart\protovis\Sunburst.js^
+js\subscriber\chart\protovis\PieChart.js^
+js\subscriber\chart\raphael\FunnelChart.js^
+js\subscriber\chart\infovis\HyperTree.js^
+js\subscriber\chart\infovis\SpaceTree.js^
+js\subscriber\chart\composite\CompositeChart1.js^
+js\subscriber\form\Dump.js^
+js\subscriber\form\TreeView.js^
+js\subscriber\gauge\Gauge.js^
+js\subscriber\gauge\raphael\Gauge1.js^
+js\subscriber\chart\raphael\PieChart.js^
+js\subscriber\chart\raphael\BarChart.js^
+js\subscriber\chart\jqplot\CreateChart.js^
+js\subscriber\chart\jqplot\jqplotChart.js^
+js\subscriber\chart\jqplot\BarChart.js^
+js\subscriber\chart\jqplot\LineChart.js^
+js\subscriber\chart\jqplot\PieChart.js^
+js\subscriber\chart\jqplot\BubbleChart.js^
+js\subscriber\chart\senchatouch\BarChart.js^
+js\subscriber\chart\senchatouch\ColumnChart.js^
+js\subscriber\chart\senchatouch\PieChart.js^
+js\subscriber\chart\senchatouch\LineChart.js




SET JS_PROVIDER_FILES=js\provider\Provider.js^
+js\provider\ProviderGET.js^
+js\provider\ProviderGETJSON.js^
+js\provider\ProviderGETMakeRequest.js



SET JS_FILTER_FILES=js\filter\Filter.js^
+js\filter\BasicFilter.js^
+js\filter\form\FilterForm.js^
+js\filter\form\Select.js

SET JS_UTIL_FILES=js\Viskit.js^
+js\util\Timer.js^
+js\util\Tooltip.js^
+js\util\Utils.js^
+js\util\LOcalStorage.js

SET JS_3RD_PARTY_DEBUG_FILES=lib\json2.js^
+lib\qtip.js^
+lib\protovis-r3.1.js^
+lib\jquery-1.4.1.min.js^
+lib\raphael-min.js^
+lib\yui\build\yahoo-dom-event\yahoo-dom-event.js^
+lib\yui\build\animation\animation-min.js^
+lib\yui\build\calendar\calendar-min.js^
+lib\yui\build\treeview\treeview-min.js^
+lib\jit-yc.js^
+lib\jqplot\jquery.jqplot.js^
+lib\jqplot\excanvas.js






SET JS_3RD_PARTY_MIN_FILES=lib\json2.js^
+lib\qtip.js^
+lib\protovis-r3.1.js^
+lib\jquery-1.4.1.min.js^
+lib\raphael-min.js^
+lib\yui\build\yahoo-dom-event\yahoo-dom-event.js^
+lib\yui\build\animation\animation-min.js^
+lib\yui\build\calendar\calendar-min.js^
+lib\jit-yc.js

SET JS_ADAPTER_FILES=js\adapter\Adapter.js

SET JS_CONTROL_FILES=js\control\Control.js^
+js\control\Tooltip.js^
+js\control\DateRange.js

SET JS_FILES=%JS_UTIL_FILES%^
+%JS_PROVIDER_FILES%^
+%JS_FILTER_FILES%^
+%JS_SUBSCRIBER_FILES%^
+%JS_ADAPTER_FILES%^
+%JS_CONTROL_FILES%


ECHO Delete existing files..
DEL /F /Q Viskit*.js

ECHO Building Viskitd.js, the debug version of the library..
@COPY /b %JS_FILES% Viskit-pre.js

ECHO Building Viskit.js, the release version of the library using yuicompressor..
JAVA -jar lib/yuicompressor-2.4.2.jar Viskit-pre.js -o Viskit-pre-min.js --charset UTF-8

@COPY /b %JS_3RD_PARTY_DEBUG_FILES%+Viskit-pre.js Viskit.js
@COPY /b %JS_3RD_PARTY_MIN_FILES%+Viskit-pre-min.js Viskit-min.js
@COPY /b %JS_3RD_PARTY_DEBUG_FILES%+Viskit-pre.js Viskit/js/Viskit.js
@COPY /b %JS_3RD_PARTY_MIN_FILES%+Viskit-pre-min.js Viskit/js/Viskit-min.js


RD /S /Q target

MKDIR target
MKDIR target\Viskit
MKDIR target\Viskit\js
MKDIR target\Viskit\css
MKDIR target\Viskit\js\plugins

COPY Viskit.js target\Viskit\js
COPY Viskit-min.js target\Viskit\js
COPY plugins\excanvas.js target\Viskit\js
COPY lib\jqplot\jquery.jqplot.js target\Viskit\js
COPY lib\jqplot\jquery.jqplot.min.js target\Viskit\js
xcopy plugins target\Viskit\js\plugins
xcopy css target\Viskit\css /e /i /h


DEL /F /Q Viskit-pre*.js

REM COPY /b wso2*.js ../*.*

ENDLOCAL
ECHO Build Complete.
@ECHO ON

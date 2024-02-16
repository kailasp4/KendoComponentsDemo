/**
 * Kendo UI v2023.1.314 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.dataviz.chart.js";!function(){window.kendo.dataviz=window.kendo.dataviz||{};var t=kendo.dataviz,i=t.elementStyles,e=t.deepExtend,a=t.toTime,n=t.constants,o=t.Chart,s=kendo.drawing,r=s.Animation.extend({setup:function(){this._initialOpacity=parseFloat(i(this.element,"opacity").opacity)},step:function(e){i(this.element,{opacity:String(t.interpolateValue(this._initialOpacity,0,e))})},abort:function(){s.Animation.fn.abort.call(this),i(this.element,{display:"none",opacity:String(this._initialOpacity)})},cancel:function(){s.Animation.fn.abort.call(this),i(this.element,{opacity:String(this._initialOpacity)})}});function l(t,i){var e=document.createElement("div");return e.className=t,i&&(e.style.cssText=i),e}var h=t.Class.extend({init:function(t,a,n){this.options=e({},this.options,n),this.container=t,this.chartService=a;var o=i(t,["paddingLeft","paddingTop"]);this.chartPadding={top:o.paddingTop,left:o.paddingLeft},this.createElements(),t.appendChild(this.element)},createElements:function(){var t=this.element=l("k-navigator-hint","display: none; position: absolute; top: 1px; left: 1px;"),i=this.tooltip=l("k-tooltip k-chart-tooltip"),e=this.scroll=l("k-scroll");i.innerHTML="&nbsp;",t.appendChild(i),t.appendChild(e)},show:function(e,n,o){var s=this,r=s.element,l=s.options,h=s.scroll,c=s.tooltip,d=t.toDate(a(e)+a(n-e)/2),v=.4*o.width(),u=o.center().x-v,p=(o.center().x-u)/(l.max-l.min),f=d-l.min,g=this.chartService.intl.format(l.format,e,n),m=t.getTemplate(l);this.clearHideTimeout(),this._visible||(i(r,{visibility:"hidden",display:"block"}),this._visible=!0),m&&(g=m({from:e,to:n})),c.innerHTML=g,i(c,{left:o.center().x-c.offsetWidth/2,top:o.y1});var _=i(c,["marginTop","borderTopWidth","height"]);i(h,{width:v,left:u+f*p,top:o.y1+_.marginTop+_.borderTopWidth+_.height/2}),i(r,{visibility:"visible"})},clearHideTimeout:function(){this._hideTimeout&&clearTimeout(this._hideTimeout),this._hideAnimation&&this._hideAnimation.cancel()},hide:function(){var t=this;this.clearHideTimeout(),this._hideTimeout=setTimeout((function(){t._visible=!1,t._hideAnimation=new r(t.element),t._hideAnimation.setup(),t._hideAnimation.play()}),this.options.hideDelay)},destroy:function(){this.clearHideTimeout(),this.container&&this.container.removeChild(this.element),delete this.container,delete this.chartService,delete this.element,delete this.tooltip,delete this.scroll}});t.setDefaultOptions(h,{format:"{0:d} - {1:d}",hideDelay:500});var c="_navigator",d=c,v={NAVIGATOR_AXIS:d,NAVIGATOR_PANE:c},u=t.Class.extend({init:function(i){this.chart=i;var a,o=this.options=e({},this.options,i.options.navigator),s=o.select;s&&(s.from=this.parseDate(s.from),s.to=this.parseDate(s.to)),t.defined(o.hint.visible)||(o.hint.visible=o.visible),this.chartObserver=new t.InstanceObserver(this,((a={})[n.DRAG]="_drag",a[n.DRAG_END]="_dragEnd",a[n.ZOOM]="_zoom",a[n.ZOOM_END]="_zoomEnd",a)),i.addObserver(this.chartObserver)},parseDate:function(i){return t.parseDate(this.chart.chartService.intl,i)},clean:function(){this.selection&&(this.selection.destroy(),this.selection=null),this.hint&&(this.hint.destroy(),this.hint=null)},destroy:function(){this.chart&&(this.chart.removeObserver(this.chartObserver),delete this.chart),this.clean()},redraw:function(){this._redrawSelf(),this.initSelection()},initSelection:function(){var i,e=this.chart,a=this.options,n=this.mainAxis(),o=n.roundedRange(),s=o.min,r=o.max,l=a.select,c=l.from,d=l.to,v=l.mousewheel,u=(i=n,p.prototype=i,new p);0!==n.categoriesCount()&&(this.clean(),u.box=n.box,this.selection=new t.Selection(e,u,{min:s,max:r,from:c||s,to:d||r,mousewheel:t.valueOrDefault(v,{zoom:"left"}),visible:a.visible},new t.InstanceObserver(this,{selectStart:"_selectStart",select:"_select",selectEnd:"_selectEnd"})),a.hint.visible&&(this.hint=new h(e.element,e.chartService,{min:s,max:r,template:t.getTemplate(a.hint),format:a.hint.format})))},setRange:function(){var t=this.chart._createPlotArea(!0).namedCategoryAxes._navigator.roundedRange(),i=t.min,a=t.max,n=this.options.select||{},o=n.from||i;o<i&&(o=i);var s=n.to||a;s>a&&(s=a),this.options.select=e({},n,{from:o,to:s}),this.filterAxes()},_redrawSelf:function(i){var e=this.chart._plotArea;e&&e.redraw(t.last(e.panes),i)},redrawSlaves:function(){var t=this.chart,i=t._plotArea,e=i.panes.slice(0,-1);i.srcSeries=t.options.series,i.options.categoryAxis=t.options.categoryAxis,i.clearSeriesPointsCache(),i.redraw(e)},_drag:function(i){var e,n=this.chart,o=this.selection,s=n._eventCoordinates(i.originalEvent),r=this.mainAxis(),l=r.roundedRange(),h=r.pane.box.containsPoint(s),c=n._plotArea.categoryAxis,d=i.axisRanges[c.options.name],v=this.options.select;if(d&&!h&&o){e=v.from&&v.to?a(v.to)-a(v.from):a(o.options.to)-a(o.options.from);var u=t.toDate(t.limitValue(a(d.min),l.min,a(l.max)-e)),p=t.toDate(t.limitValue(a(u)+e,a(l.min)+e,l.max));this.options.select={from:u,to:p},this.options.liveDrag&&(this.filterAxes(),this.redrawSlaves()),o.set(u,p),this.showHint(u,p)}},_dragEnd:function(){this.filterAxes(),this.filter(),this.redrawSlaves(),this.hint&&this.hint.hide()},readSelection:function(){var t=this.selection.options,i=t.from,e=t.to,a=this.options.select;a.from=i,a.to=e},filterAxes:function(){var t=this.options.select;void 0===t&&(t={});for(var i=this.chart.options.categoryAxis,e=t.from,a=t.to,n=0;n<i.length;n++){var o=i[n];o.pane!==c&&(o.min=e,o.max=a)}},filter:function(){var i=this.chart,a=this.options.select;if(i.requiresHandlers(["navigatorFilter"])){var n=this.mainAxis(),o={from:a.from,to:a.to};if("category"!==n.options.type){var s=new t.DateCategoryAxis(e({baseUnit:"fit"},i.options.categoryAxis[0],{categories:[a.from,a.to]}),i.chartService).options;o.from=t.addDuration(s.min,-s.baseUnitStep,s.baseUnit),o.to=t.addDuration(s.max,s.baseUnitStep,s.baseUnit)}this.chart.trigger("navigatorFilter",o)}},_zoom:function(t){var i=this,e=i.chart._plotArea.categoryAxis,a=i.selection,n=i.options,o=n.select,s=n.liveDrag,r=this.mainAxis(),l=t.delta;if(a){var h=r.categoryIndex(a.options.from),c=r.categoryIndex(a.options.to),d=this.chart._eventCoordinates(t.originalEvent);t.originalEvent.preventDefault(),Math.abs(l)>1&&(l*=3),c-h>1?(a.zoom(l,d),this.readSelection()):(e.options.min=o.from,o.from=e.scaleRange(-t.delta*this.chart._mousewheelZoomRate(),d).min),s&&(this.filterAxes(),this.redrawSlaves()),a.set(o.from,o.to),this.showHint(this.options.select.from,this.options.select.to)}},_zoomEnd:function(t){this._dragEnd(t)},showHint:function(t,i){var e=this.chart._plotArea;this.hint&&this.hint.show(t,i,e.backgroundBox())},_selectStart:function(t){return this.chart._selectStart(t)},_select:function(t){return this.showHint(t.from,t.to),this.chart._select(t)},_selectEnd:function(t){return this.hint&&this.hint.hide(),this.readSelection(),this.filterAxes(),this.filter(),this.redrawSlaves(),this.chart._selectEnd(t)},mainAxis:function(){var t=this.chart._plotArea;if(t)return t.namedCategoryAxes._navigator},select:function(t,i){var e=this.options.select;return t&&i&&(e.from=this.parseDate(t),e.to=this.parseDate(i),this.filterAxes(),this.filter(),this.redrawSlaves(),this.selection.set(t,i)),{from:e.from,to:e.to}}});function p(){}u.setup=function(t,i){if(void 0===t&&(t={}),void 0===i&&(i={}),!t.__navi){t.__navi=!0;var a=e({},i.navigator,t.navigator),n=t.panes=[].concat(t.panes),o=e({},a.pane,{name:c});a.visible||(o.visible=!1,o.height=.1),n.push(o),u.attachAxes(t,a),u.attachSeries(t,a,i)}},u.attachAxes=function(i,a){var o=a.series||[],s=i.categoryAxis=[].concat(i.categoryAxis),r=i.valueAxis=[].concat(i.valueAxis),l=0===t.filterSeriesByType(o,n.EQUALLY_SPACED_SERIES).length,h=e({type:"date",pane:c,roundToBaseUnit:!l,justified:l,_collapse:!1,majorTicks:{visible:!0},tooltip:{visible:!1},labels:{step:1},autoBind:a.autoBindElements,autoBaseUnitSteps:{minutes:[1],hours:[1,2],days:[1,2],weeks:[],months:[1],years:[1]}}),v=a.categoryAxis;s.push(e({},h,{maxDateGroups:200},v,{name:d,title:null,baseUnit:"fit",baseUnitStep:"auto",labels:{visible:!1},majorTicks:{visible:!1}}),e({},h,v,{name:"_navigator_labels",maxDateGroups:20,baseUnitStep:"auto",labels:{position:""},plotBands:[],autoBaseUnitSteps:{minutes:[]},_overlap:!0}),e({},h,v,{name:"_navigator_ticks",maxDateGroups:200,majorTicks:{width:.5},plotBands:[],title:null,labels:{visible:!1,mirror:!0},_overlap:!0})),r.push(e({name:d,pane:c,majorGridLines:{visible:!1},visible:!1},a.valueAxis))},u.attachSeries=function(t,i,a){for(var n=t.series=t.series||[],o=[].concat(i.series||[]),s=a.seriesColors,r=i.seriesDefaults,l=0;l<o.length;l++)n.push(e({color:s[l%s.length],categoryField:i.dateField,visibleInLegend:!1,tooltip:{visible:!1}},r,o[l],{axis:d,categoryAxis:d,autoBind:i.autoBindElements}))};var f=o.extend({applyDefaults:function(i,a){var s=t.elementSize(this.element).width||n.DEFAULT_WIDTH,r=a,l={seriesDefaults:{categoryField:i.dateField},axisDefaults:{categoryAxis:{name:"default",majorGridLines:{visible:!1},labels:{step:2},majorTicks:{visible:!1},maxDateGroups:Math.floor(s/28)}}};r&&(r=e({},r,l)),u.setup(i,r),o.fn.applyDefaults.call(this,i,r)},_setElementClass:function(i){t.addClass(i,"k-chart k-stockchart")},setOptions:function(t){this.destroyNavigator(),o.fn.setOptions.call(this,t)},noTransitionsRedraw:function(){var t=this.options.transitions;this.options.transitions=!1,this._fullRedraw(),this.options.transitions=t},_resize:function(){this.noTransitionsRedraw()},_redraw:function(){var t=this.navigator;!this._dirty()&&t&&t.options.partialRedraw?t.redrawSlaves():this._fullRedraw()},_dirty:function(){var i=this.options,e=[].concat(i.series,i.navigator.series),a=t.grep(e,(function(t){return t&&t.visible})).length,n=this._seriesCount!==a;return this._seriesCount=a,n},_fullRedraw:function(){var t=this.navigator;t||(t=this.navigator=new u(this),this.trigger("navigatorCreated",{navigator:t})),t.clean(),t.setRange(),o.fn._redraw.call(this),t.initSelection()},_trackSharedTooltip:function(t){var i=this._plotArea.paneByPoint(t);i&&i.options.name===c?this._unsetActivePoint():o.fn._trackSharedTooltip.call(this,t)},bindCategories:function(){o.fn.bindCategories.call(this),this.copyNavigatorCategories()},copyNavigatorCategories:function(){for(var t,i=[].concat(this.options.categoryAxis),e=0;e<i.length;e++){var a=i[e];a.name===d?t=a.categories:t&&a.pane===c&&(a.categories=t)}},destroyNavigator:function(){this.navigator&&(this.navigator.destroy(),this.navigator=null)},destroy:function(){this.destroyNavigator(),o.fn.destroy.call(this)},_stopChartHandlers:function(t){var i=this._eventCoordinates(t),e=this._plotArea.paneByPoint(i);return o.fn._stopChartHandlers.call(this,t)||e&&e.options.name===c},_toggleDragZoomEvents:function(){this._dragZoomEnabled||(this.element.style.touchAction="none",this._dragZoomEnabled=!0)}});t.setDefaultOptions(f,{dateField:"date",axisDefaults:{categoryAxis:{type:"date",baseUnit:"fit",justified:!0},valueAxis:{narrowRange:!0,labels:{format:"C"}}},navigator:{select:{},seriesDefaults:{markers:{visible:!1},tooltip:{visible:!0},line:{width:2}},hint:{},visible:!0},tooltip:{visible:!0},legend:{visible:!1}}),kendo.deepExtend(kendo.dataviz,{constants:v,Navigator:u,NavigatorHint:h,StockChart:f})}(),function(t){var i=window.kendo,e=i.dataviz,a=e.ChartInstanceObserver,n=e.ui.Chart,o=e.StockChart,s=e.constants,r=s.NAVIGATOR_AXIS,l=s.NAVIGATOR_PANE,h=i.deepExtend,c=e.defined,d="change",v=a.extend({handlerMap:{navigatorFilter:"_onNavigatorFilter",navigatorCreated:"_onNavigatorCreated"}}),u=n.extend({options:{name:"StockChart",dateField:"date",axisDefaults:{categoryAxis:{type:"date",baseUnit:"fit",justified:!0},valueAxis:{narrowRange:!0,labels:{format:"C"}}},navigator:{select:{},seriesDefaults:{markers:{visible:!1},tooltip:{visible:!0,template:({category:t})=>i.toString(t,"d")},line:{width:2}},hint:{},visible:!0},tooltip:{visible:!0},legend:{visible:!1},persistSeriesVisibility:!0},_createChart:function(t,i){this._initNavigatorOptions(t),this._instance=new o(this.element[0],t,i,{observer:new v(this),sender:this,rtl:this._isRtl()})},_initNavigatorOptions:function(t){var e=t.navigator||{},a=i.support,n=a.touch,o=a.browser.mozilla;h(e,{autoBindElements:!e.dataSource,partialRedraw:e.dataSource,liveDrag:!n&&!o})},_initDataSource:function(t){var a=t||{},o=a.dataSource,s=o&&o.serverFiltering,r=[].concat(a.categoryAxis)[0],l=(a.navigator||{}).select,c=l&&l.from&&l.to;if(s&&c){var d=[].concat(o.filter||[]),v=i.parseDate(l.from),u=i.parseDate(l.to),f=new e.DateCategoryAxis(h({baseUnit:"fit"},r,{categories:[v,u]}),i);o.filter=p(f.range().min,u).concat(d)}n.fn._initDataSource.call(this,t)},_onNavigatorCreated:function(t){this._instance=t.sender,this.options=t.sender.options,this._navigator=this.navigator=t.navigator,this._initNavigatorDataSource()},_initNavigatorDataSource:function(){var t=this.options.navigator,e=t.autoBind,a=t.dataSource;a&&(this._navigatorDataChangedHandler=this._navigatorDataChangedHandler||this._onNavigatorDataChanged.bind(this),this._navigatorDataSource=i.data.DataSource.create(a).bind(d,this._navigatorDataChangedHandler),c(e)||(e=this.options.autoBind),e&&this._navigatorDataSource.fetch())},_bindNavigatorSeries:function(t,i){var e,a,n=t.length;for(e=0;e<n;e++)(a=t[e]).axis==r&&this._isBindable(a)&&(a.data=i)},_onNavigatorDataChanged:function(){var t,i,e,a=this,n=a._instance,o=a.options.categoryAxis,s=o.length,h=a._navigatorDataSource.view();for(this._bindNavigatorSeries(a.options.series,h),a._sourceSeries&&this._bindNavigatorSeries(a._sourceSeries,h),t=0;t<s;t++)(i=o[t]).pane==l&&(i.name==r?(a._bindCategoryAxis(i,h,t),e=i.categories):i.categories=e);if(n._model){var c=this.navigator;c.redraw(),c.setRange(),(!a.options.dataSource||a.options.dataSource&&a._dataBound)&&c.redrawSlaves()}},_bindCategories:function(){n.fn._bindCategories.call(this),this._instance&&this._instance.copyNavigatorCategories()},_onDataChanged:function(){n.fn._onDataChanged.call(this),this._dataBound=!0},setOptions:function(t){this._removeNavigatorDataSource(),this._initNavigatorOptions(t),this._instance.destroyNavigator(),n.fn.setOptions.call(this,t)},_onNavigatorFilter:function(t){this.dataSource.filter(p(t.from,t.to))},requiresHandlers:function(t){if(e.inArray("navigatorFilter",t)){var i=this.dataSource;return i&&i.options.serverFiltering&&this.options.navigator.dataSource}return n.fn.requiresHandlers.call(this,t)},_removeNavigatorDataSource:function(){var t=this._navigatorDataSource;t&&(t.unbind(d,this._navigatorDataChangedHandler),delete this._navigatorDataSource)},destroy:function(){n.fn.destroy.call(this),this._removeNavigatorDataSource()}});function p(t,i){return[{field:"Date",operator:"gte",value:t},{field:"Date",operator:"lt",value:i}]}e.ui.plugin(u)}(window.kendo.jQuery);var __meta__={id:"dataviz.stockchart",name:"StockChart",category:"dataviz",description:"StockChart widget and associated financial series.",depends:["dataviz.chart"]};
//# sourceMappingURL=kendo.dataviz.stock.js.map

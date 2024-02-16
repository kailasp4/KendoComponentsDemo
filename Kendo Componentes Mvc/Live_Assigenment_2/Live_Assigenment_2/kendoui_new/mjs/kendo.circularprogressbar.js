/**
 * Kendo UI v2023.1.314 (http://www.telerik.com/kendo-ui)
 * Copyright 2023 Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.
 *
 * Kendo UI commercial licenses may be obtained at
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete
 * If you do not own a commercial license, this file shall be governed by the trial license terms.
 */
import"./kendo.dataviz.themes.js";var __meta__={id:"circularprogressBar",name:"CircularProgressBar",category:"web",description:"The Circular ProgressBar component represents an SVG loader",depends:["core","dataviz.themes"]};!function(e,t){window.kendo.dataviz=window.kendo.dataviz||{};var i=kendo.dataviz,n=i.interpolateValue,r=kendo.drawing,o=kendo.ui,a=o.Widget,s=r.Surface,l=kendo.geometry,h=r.Animation,c=r.Arc,u=i.limitValue,d=i.round,g=r.Group,m=h.extend({init:function(e,t){h.fn.init.call(this,e,t);var i=this.options,n=t.endColor,r=t.startColor,o=Math.abs(i.newAngle-i.oldAngle)/i.duration*1e3;i.duration=u(o,150,800),this.element=e,r!==n&&(this.startColor=new kendo.Color(r),this.color=new kendo.Color(n))},step:function(e){var t=this,i=t.options,r=t.startColor,o=t.color,a=n(i.oldAngle,i.newAngle,e);if(this.element.geometry().setEndAngle(a),o){var s=d(n(r.r,o.r,e)),l=d(n(r.g,o.g,e)),h=d(n(r.b,o.b,e));this.element.stroke(new kendo.Color(s,l,h).toHex())}}}),p=a.extend({init:function(e,t){a.fn.init.call(this,e,t),this.theme=function(e){var t=i.ui.themes||{},n=e.theme||"",r=n.toLowerCase();if(-1!=i.SASS_THEMES.indexOf(r))return i.autoTheme().gauge;return(t[n]||t[r]||{}).gauge}(this.options),this._value=this.options.value,this.element.addClass("k-gauge"),this.redraw(),this._centerTemplate(),this._aria()},options:{name:"CircularProgressBar",ariaRole:!1,theme:"default",centerTemplate:"",color:"",colors:[],transitions:!0,pointerWidth:5,indeterminate:!1,label:null,labelId:null},events:[],value:function(e){var t=this;if(undefined===e)return t._value;e=t._restrictValue(e),t._centerSvgElements(),t._pointerChange(t._value,e),t._value=e,t._centerTemplate(),t._updateProgress()},redraw:function(){this._initSurface(),this._buildVisual(),this._draw()},resize:function(){var e=this.options.transitions;this.options.transitions=!1,this._initSurface(),this._buildVisual(),this._draw(),this._centerTemplate(),this.options.transitions=e},destroy:function(){var e=this;e.announce&&e.announce.remove(),a.fn.destroy.call(e)},_aria:function(){var t=this,i=t.options,n=t.value()||0,r=t.element;i.ariaRole&&(r.attr({role:"progressbar"}),i.indeterminate||r.attr({"aria-valuemin":0,"aria-valuemax":100}),i.labelId?r.attr("aria-labelledby",i.labelId):i.label&&r.attr("aria-label",i.label),t.announce=e('<span aria-live="polite" class="k-sr-only k-progress-announce"></span>'),t.announce.appendTo(e("body")),i.indeterminate?t.announce.text("Loading..."):(r.attr("aria-valuenow",n),t.announce.text(n+"%")))},_restrictValue:function(e){return e<0?0:e>100?100:e},_updateProgress:function(){var e=this,t=e.options,i=e.value()||0;t.ariaRole&&!t.indeterminate&&(e.element.attr("aria-valuenow",i),e.announce&&e.announce.text(i+"%"))},_centerSvgElements:function(){var e=this._getCenter();this.circle._geometry.center.x===e.x&&this.circle._geometry.center.y===e.y||(this.circle._geometry.center.x=e.x,this.circle._geometry.center.y=e.y,this.arc._geometry.center.x=e.x,this.arc._geometry.center.y=e.y,this.circle.geometryChange(),this.arc.geometryChange())},_centerTemplate:function(){var e,t,i;this.options.centerTemplate?(t=kendo.template(this.options.centerTemplate),(i=this._getCenterElement()).html(t({color:this._getColor(this.value()),value:this.value()})),e=this._centerTemplatePosition(i.width(),i.height()),i.css(e)):this._centerElement&&(this._centerElement.remove(),this._centerElement=null)},_getCenterElement:function(){var t=this._centerElement;return t||(t=this._centerElement=e("<div></div>").addClass("k-arcgauge-label"),this.element.append(t)),t},_pointerChange:function(e,t){this.options.transitions?new m(this.arc,{oldAngle:this._slotAngle(e),startColor:this._getColor(e),newAngle:this._slotAngle(t),endColor:this._getColor(t)}).play():(this.arc.stroke(this._getColor(t)),this.arc.geometry().setEndAngle(this._slotAngle(t)))},_draw:function(){var e,t,i=this.surface;i.clear(),i.draw(this._visuals),this.options.indeterminate?(e=i.element.find("path"),t=this._getCenter(),e[0].innerHTML=kendo.format('<animateTransform attributeName="transform" type="rotate" from="0 {0} {1}" to="360 {0} {1}" dur="1s" repeatCount="indefinite" />',t.x,t.y)):this.options.transitions&&new m(this.arc,{oldAngle:this._slotAngle(0),startColor:this._getColor(0),newAngle:this._slotAngle(this.value()),endColor:this._getColor(this.value())}).play()},_buildVisual:function(){var e=this._visuals=new g,t=this._getCenter(),i=this._getColor(this.value())||this.theme.pointer.color,n=Math.min(t.x,t.y)-5-this.options.pointerWidth,o=new l.Circle([t.x,t.y],n+this.options.pointerWidth/2),a=this.circle=new r.Circle(o,{fill:{color:"none"},stroke:{color:this.theme.scale.rangePlaceholderColor,width:this.options.pointerWidth}});e.append(a),this.options.indeterminate?this.arc=this._createArc(360,n,t,i):this.arc=this._createArc(this._slotAngle(this.value()),n,t,i),e.append(this.arc)},_slotAngle:function(e){return(e-0)/100*360+90+180},_getColor:function(e){var t=this.options,n=t.colors,r=t.color,o=i.isNumber(e)?e:0;if(n)for(var a=0;a<n.length;a++){var s=n[a],l=s.color,h=s.from;void 0===h&&(h=0);var c=s.to;if(void 0===c&&(c=100),h<=o&&o<=c)return l}return r},_createArc:function(e,t,i,n){var r=this.options.pointerWidth,o=new l.Arc([i.x,i.y],{radiusX:t+r/2,radiusY:t+r/2,startAngle:270,endAngle:e});return new c(o,{stroke:{width:r,color:this.options.color||n,opacity:this.options.opacity}})},_centerTemplatePosition:function(e,t){var i,n,r=this._getSize(),o=this._getCenter(),a=o.x-e/2,s=o.y-t/2;return e<r.width&&(i=a+e,a=Math.max(a,0),i>r.width&&(a-=i-r.width)),t<r.height&&(n=s+t)>r.height&&(s-=n-r.height),{left:a,top:s}},_getCenter:function(){var e=this._getSize();return new i.Point(e.width/2,e.height/2)},_getSize:function(){var e=this.element,t=200,i=200,n=e[0].offsetWidth,r=e[0].offsetHeight;return n||(n=t),r||(r=i),{width:n,height:r}},_surfaceElement:function(){return this.surfaceElement||(this.surfaceElement=document.createElement("div"),this.element[0].appendChild(this.surfaceElement)),this.surfaceElement},_initSurface:function(){var e=this.options,t=this.surface,n=this._surfaceElement(),r=this._getSize();i.elementSize(n,r),t?(this.surface.clear(),this.surface.resize()):this.surface=s.create(n,{type:e.renderAs})}});o.plugin(p)}(window.kendo.jQuery);
//# sourceMappingURL=kendo.circularprogressbar.js.map

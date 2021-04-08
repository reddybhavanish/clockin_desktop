/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./VizSliderBasic","sap/ui/core/InvisibleText",'sap/viz/library',"sap/base/Log"],function(q,S,I,l,L){"use strict";var V=S.extend("sap.viz.ui5.controls.VizRangeSlider",{metadata:{library:"sap.viz",properties:{value2:{type:"float",group:"Data",defaultValue:100},range:{type:"float[]",group:"Data",defaultValue:[0,100]},left:{type:"string",group:"Data",defaultValue:"0px"},top:{type:"string",group:"Data",defaultValue:"0px"},height:{type:"string",group:"Data",defaultValue:"0px"},showPercentageLabel:{type:"boolean",group:"Appearance",defaultValue:"true"},showStartEndLabel:{type:"boolean",group:"Appearance",defaultValue:"true"}}}});var _={RANGE_MOVEMENT_THRESHOLD:32,CHARACTER_WIDTH_PX:8,INPUT_STATE_NONE:"None",INPUT_STATE_ERROR:"Error"};V.prototype.init=function(){var s,e;S.prototype.init.call(this,arguments);this._bInitialRangeChecks=true;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._aInitialFocusRange=this.getRange();this._iLongestRangeTextWidth=0;this._fTooltipHalfWidthPercent=0;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle('sap.m');this._ariaUpdateDelay=[];s=new I({text:this._oResourceBundle.getText("RANGE_SLIDER_LEFT_HANDLE")});e=new I({text:this._oResourceBundle.getText("RANGE_SLIDER_RIGHT_HANDLE")});this._mHandleTooltip={start:{handle:null,tooltip:null,label:s},end:{handle:null,tooltip:null,label:e}};};V.prototype.exit=function(){this._oResourceBundle=null;this._aInitialFocusRange=null;this._liveChangeLastValue=null;if(this._oRangeLabel){this._oRangeLabel.destroy();}this._oRangeLabel=null;if(this.getInputsAsTooltips()){if(this._mHandleTooltip.start.tooltip){this._mHandleTooltip.start.tooltip.destroy();}if(this._mHandleTooltip.end.tooltip){this._mHandleTooltip.end.tooltip.destroy();}}if(this._mHandleTooltip.start.label){this._mHandleTooltip.start.label.destroy();}if(this._mHandleTooltip.end.label){this._mHandleTooltip.end.label.destroy();}this._mHandleTooltip.start.handle=null;this._mHandleTooltip.start.tooltip=null;this._mHandleTooltip.start.label=null;this._mHandleTooltip.end.handle=null;this._mHandleTooltip.end.tooltip=null;this._mHandleTooltip.end.label=null;this._ariaUpdateDelay=null;this._iDecimalPrecision=null;};V.prototype.onBeforeRendering=function(){var a=[Math.abs(this.getMin()),Math.abs(this.getMax())],r=a[0]>a[1]?0:1,i=!!this.getInputsAsTooltips(),R=this.getRange();this._bInitialRangeChecks=false;this.setRange(R);if(!this._oRangeLabel){this._oRangeLabel=new I({text:this._oResourceBundle.getText("RANGE_SLIDER_RANGE_HANDLE")});}this._validateProperties();this._iLongestRangeTextWidth=((a[r].toString()).length+this.getDecimalPrecisionOfNumber(this.getStep())+1)*_.CHARACTER_WIDTH_PX;if(!this._mHandleTooltip.start.tooltip){this._mHandleTooltip.start.tooltip=i?this._createInputField("LeftTooltip",this._mHandleTooltip.start.label):null;}if(!this._mHandleTooltip.end.tooltip){this._mHandleTooltip.end.tooltip=i?this._createInputField("RightTooltip",this._mHandleTooltip.end.label):null;}this._mHandleTooltip.bTooltipsSwapped=false;this._iDecimalPrecision=this.getDecimalPrecisionOfNumber(this.getStep());if(this.getEnableTickmarks()&&!this.getAggregation("scale")){this.setAggregation("scale",new sap.m.ResponsiveScale());}};V.prototype.onAfterRendering=function(){S.prototype.onAfterRendering.apply(this,arguments);var r=this.getRange(),m=this.getMin(),M=this.getMax(),R=r.reduce(function(b,v){return b||v<m||v>M;});this._mHandleTooltip.start.handle=this.getDomRef("handle1");this._mHandleTooltip.end.handle=this.getDomRef("handle2");if(!this.getInputsAsTooltips()){this._mHandleTooltip.start.tooltip=this.$("LeftTooltip");this._mHandleTooltip.end.tooltip=this.$("RightTooltip");}this._recalculateStyles();if(R){L.warning("Warning: "+"Property wrong range: ["+r+"] not in the range: ["+m+","+M+"]",this);}this.$("TooltipsContainer").css("min-width",(this._fTooltipHalfWidthPercent*4)+"%");this._updateHandle(this._mHandleTooltip.start.handle,r[0]);this._updateHandle(this._mHandleTooltip.end.handle,r[1]);if(r[0]>r[1]){this._swapTooltips(r);}};V.prototype._recalculateRange=function(){var h,s,e,p,a=this._bRTL?"right":"left";h=[parseFloat(this._mHandleTooltip.start.handle.style[a]),parseFloat(this._mHandleTooltip.end.handle.style[a])];s=Math.min.apply(Math,h)+"%";e=(100-Math.max.apply(Math,h))+"%";p=this.getDomRef("progress");if(this._bRTL){p.style.left=e;p.style.right=s;}else{p.style.left=s;p.style.right=e;}var b=this.getDomRef("leftMock");var r=this.getDomRef("rightMock");var d=this.getDomRef("label");var R=this.getRange();var m=Math.min(R[0],R[1]);var c=Math.max(R[0],R[1]);b.style.right=(this.getMax()-m)/(this.getMax()-this.getMin())*100+"%";r.style.left=(c-this.getMin())/(this.getMax()-this.getMin())*100+"%";d.style.left=(c+m)/(this.getMax()-this.getMin())*50+"%";d.innerHTML=((c-m)/(this.getMax()-this.getMin())*100).toFixed(0)+"%";return this;};V.prototype.getClosestHandleDomRef=function(e){var h=this._mHandleTooltip.start.handle,H=this._mHandleTooltip.end.handle,p=Math.abs(e.pageX-h.offsetLeft-this._fSliderPaddingLeft-this._fSliderOffsetLeft),c=Math.abs(e.clientX-H.offsetLeft-this._fSliderPaddingLeft-this._fSliderOffsetLeft);return p>c?H:h;};V.prototype._getIndexOfHandle=function(h){if(h&&h.getAttribute&&h.getAttribute("data-range-val")==="start"){return 0;}else if(h&&h.getAttribute&&h.getAttribute("data-range-val")==="end"){return 1;}else{return-1;}};V.prototype._updateHandle=function(h,v){var t=(this._mHandleTooltip.start.handle===h)?this._mHandleTooltip.start.tooltip:this._mHandleTooltip.end.tooltip,r=this.getRange(),i=this._getIndexOfHandle(h),p=this._getPercentOfValue(v);r[i]=v;this._updateRangePropertyDependencies(r);this._updateHandleDom(h,r,i,v,p);this._updateTooltipContent(t,v);this._adjustTooltipsContainer(p);this._recalculateRange();};V.prototype._updateHandleDom=function(h,r,i,v,p){var m,c=this.getRenderer().CSS_CLASS,f=this.getDomRef("input");if(!!this.getName()){f.setAttribute(h.getAttribute("data-range-val"),r[i]);f.setAttribute("value",this.getValue());}if(this._bRTL){h.style.right=p+"%";}else{h.style.left=p+"%";}if(this.getShowHandleTooltip()){h.title=v;}m=r[0]===r[1];this.$("handle1").toggleClass(c+"HandleOverlap",m);this.$("handle2").toggleClass(c+"HandleOverlap",m);clearTimeout(this._ariaUpdateDelay[i]);this._ariaUpdateDelay[i]=setTimeout(this["_updateHandleAria"].bind(this,h,v),100);};V.prototype._updateHandleAria=function(h,v){var r=this.getRange(),p=this.getDomRef("progress"),s=this._mHandleTooltip.start,e=this._mHandleTooltip.end,a=this.getShowStartEndLabel(),b=this.getShowPercentageLabel(),c=r[1]-r[0];this._updateHandlesAriaLabels();if(s.tooltip&&e.tooltip){var t=[s.tooltip.getEncodedText(),e.tooltip.getEncodedText()];var d=b?(". Range Width is "+c+"%"):" ";var f=a?t:["",""];var g=a?(this._oResourceBundle.getText("RANGE_SLIDER_RANGE_ANNOUNCEMENT",t)):"";h.setAttribute("aria-valuenow",v);s.handle.setAttribute("aria-valuetext",f[0]+d);e.handle.setAttribute("aria-valuetext",f[1]+d);if(p){p.setAttribute("aria-valuenow",r.join("-"));p.setAttribute("aria-valuetext",g+d);}}};V.prototype._updateHandlesAriaLabels=function(){var r=this.getRange(),t=this._mHandleTooltip.start.label;if((r[0]>r[1]&&!this._mHandleTooltip.bAriaHandlesSwapped)||(r[0]<r[1]&&this._mHandleTooltip.bAriaHandlesSwapped)){this._mHandleTooltip.start.label=this._mHandleTooltip.end.label;this._mHandleTooltip.end.label=t;if(this._mHandleTooltip.start.handle){this._mHandleTooltip.start.handle.setAttribute("aria-labelledby",this._mHandleTooltip.start.label.getId());}if(this._mHandleTooltip.end.handle){this._mHandleTooltip.end.handle.setAttribute("aria-labelledby",this._mHandleTooltip.end.label.getId());}this._mHandleTooltip.bAriaHandlesSwapped=!this._mHandleTooltip.bAriaHandlesSwapped;}};V.CHARACTER_WIDTH_PX=12;V.prototype._updateTooltipContent=function(t,n){var r=this.getRange();var m=Math.max(r[0],r[1]);var a=Math.min(r[0],r[1]);m=(m>this.getMax())?this.getMax():m;a=(a<this.getMin())?this.getMin():a;var s=this._mHandleTooltip.start.tooltip;var p=(t===s)?"start":"end";if(a===m){if(a===0){m++;}if(a===100){a--;}}var c=(t===s?a:m);if(this._parentFrame){c=this._parentFrame._getTooltipContent(a,m,p);}t.text(c);var b=this.getDomRef('LeftTooltip');var d=this.getDomRef('RightTooltip');var e=Math.max(b.innerHTML.length,d.innerHTML.length);e=e*V.CHARACTER_WIDTH_PX;this._iLongestRangeTextWidth=e;b.style.width=this._iLongestRangeTextWidth+"px";d.style.width=this._iLongestRangeTextWidth+"px";this._recalculateStyles();this.$("TooltipsContainer").css("min-width",(this._fTooltipHalfWidthPercent*4)+"%");};V.prototype._swapTooltips=function(r){var t=this._mHandleTooltip.start.tooltip;if((r[0]>=r[1]&&!this._mHandleTooltip.bTooltipsSwapped)||(r[0]<=r[1]&&this._mHandleTooltip.bTooltipsSwapped)){this._mHandleTooltip.start.tooltip=this._mHandleTooltip.end.tooltip;this._mHandleTooltip.end.tooltip=t;this._updateTooltipContent(this._mHandleTooltip.start.tooltip,r[0]);this._updateTooltipContent(this._mHandleTooltip.end.tooltip,r[1]);if(this.getInputsAsTooltips()){this._mHandleTooltip.start.handle.setAttribute("aria-controls",this._mHandleTooltip.start.tooltip.getId());this._mHandleTooltip.end.handle.setAttribute("aria-controls",this._mHandleTooltip.end.tooltip.getId());}this._mHandleTooltip.bTooltipsSwapped=!this._mHandleTooltip.bTooltipsSwapped;}};V.prototype._adjustTooltipsContainer=function(){var c,t=this.getDomRef("TooltipsContainer"),a=this._bRTL?"right":"left",A=this._bRTL?"left":"right",r=this.getRange(),s=this._getPercentOfValue(r[0]>r[1]?r[1]:r[0]),e=this._getPercentOfValue(r[0]>r[1]?r[0]:r[1]),T=this._fHandleWidthPercent/2,f=((e-s)/2>this._fTooltipHalfWidthPercent)?this._fTooltipHalfWidthPercent:(e-s)/2,b=Math.floor(100-2*this._fTooltipHalfWidthPercent-f+this._fHandleWidthPercent),C=parseFloat(t.style[a]),d=parseFloat(t.style[A]);if(s-this._fTooltipHalfWidthPercent<=T){C=-1*this._fHandleWidthPercent;}else if(s>=b){C=100-4*this._fTooltipHalfWidthPercent+this._fHandleWidthPercent;}else if((e-s>this._fTooltipHalfWidthPercent*2)&&(s>-1*this._fTooltipHalfWidthPercent)){C=s-this._fTooltipHalfWidthPercent;}else{c=s-this._fTooltipHalfWidthPercent-(this._fTooltipHalfWidthPercent*2-(e-s))/2;if(c<=-1*this._fHandleWidthPercent){C=-1*this._fHandleWidthPercent;}else{C=c;}}if(e>=(100-T)||(100-e-this._fTooltipHalfWidthPercent)<-this._fHandleWidthPercent){d=-1*this._fHandleWidthPercent;}else{d=100-e-this._fTooltipHalfWidthPercent;}t.style[a]=C+"%";t.style[A]=d+"%";this._swapTooltips(r);};V.prototype._handleInputChange=function(i,e){var h,a,t=this._mHandleTooltip.bTooltipsSwapped,n=Number(e.getParameter("value"));if(e.getParameter("value")===""||isNaN(n)||n<this.getMin()||n>this.getMax()){i.setValueState(_.INPUT_STATE_ERROR);return;}n=this._adjustRangeValue(n);i.setValueState(_.INPUT_STATE_NONE);h=this._mHandleTooltip.start.tooltip===i?this._mHandleTooltip.start.handle:this._mHandleTooltip.end.handle;this._updateHandle(h,n);if(t!==this._mHandleTooltip.bTooltipsSwapped){a=this._mHandleTooltip.start.tooltip!==i?this._mHandleTooltip.start.tooltip:this._mHandleTooltip.end.tooltip;a.focus();}this._fireChangeAndLiveChange({range:this.getRange()});};V.prototype._updateDOMAfterSetters=function(v,r,h){var p,H;if(this.getDomRef()){p=this._getPercentOfValue(v);H=h===1?this._mHandleTooltip.end:this._mHandleTooltip.start;this._updateHandleDom(H.handle,r,h,v,p);this._updateTooltipContent(H.tooltip,v);return true;}return false;};V.prototype.setRange=function(r){r=r.map(this._adjustRangeValue,this);this._updateRangePropertyDependencies(r);if(this._updateDOMAfterSetters(r[0],r,0)&&this._updateDOMAfterSetters(r[1],r,1)){this._recalculateRange();}return this;};V.prototype.setValue=function(v){var r=this.getRange();if(typeof v!=="number"||!isFinite(v)){return this;}v=this._adjustRangeValue(v);r[0]=v;this._updateRangePropertyDependencies(r);if(this._updateDOMAfterSetters(r[0],r,0)){this._recalculateRange();}return this;};V.prototype.setValue2=function(v){var r=this.getRange();v=this._adjustRangeValue(v);r[1]=v;this._updateRangePropertyDependencies(r);if(this._updateDOMAfterSetters(r[1],r,1)){this._recalculateRange();}return this;};V.prototype._updateRangePropertyDependencies=function(r){var R=Array.isArray(r)?r.slice():[];if(this.getProperty("value")!==R[0]){this.setProperty("value",R[0],true);}if(this.getProperty("value2")!==R[1]){this.setProperty("value2",R[1],true);}this.setProperty("range",R,true);};V.prototype._calculateHandlePosition=function(v,h){var m=this.getMax(),M=this.getMin(),a=h||0,n;n=((v-this._fSliderPaddingLeft-this._fSliderOffsetLeft)/this._fSliderWidth)*(m-M)+M;if(this._bRTL){n=this._convertValueToRtlMode(n);}return this._adjustRangeValue(n,a);};V.prototype._adjustRangeValue=function(v,h){var m=this.getMax(),M=this.getMin(),s=this.getStep(),a=h||0,f;if(this._bInitialRangeChecks){return v;}f=Math.abs((v-M)%s);if(f!==0){v=f*2>=s?v+s-f:v-f;}var b=a<0?a:0;var c=a>0?a:0;if(v<M+b){v=M+b;}else if(v>m+c){v=m+c;}return v;};V.prototype.ontouchstart=function(e){var t=e.targetTouches[0],C=this.getRenderer().CSS_CLASS,E="."+C,v,h,r,H,f;if(!this.getEnabled()){return;}e.setMarked();if(e.target.className.indexOf("sapMInput")===-1){e.preventDefault();}this._recalculateStyles();if(["number","text"].indexOf(e.target.type)>-1){return;}v=this._calculateHandlePosition(t.pageX);r=this.getRange();h=[this._mHandleTooltip.start.handle,this._mHandleTooltip.end.handle];H=this._getIndexOfHandle(e.target);var a=0;if(H!==-1){h=[this.getDomRef(H===0?"handle1":"handle2")];a=v-r[H];}else if(v<Math.min.apply(Math,r)||v>Math.max.apply(Math,r)){h=[v<Math.min.apply(Math,r)?this._mHandleTooltip.start.handle:this._mHandleTooltip.end.handle];this._updateHandle(h[0],v);this._fireChangeAndLiveChange({range:this.getRange()});}q(document).on("touchend"+E+" touchcancel"+E+" mouseup"+E,this._ontouchend.bind(this,h)).on("touchmove"+E+(e.originalEvent.type!=="touchstart"?" mousemove"+E:""),this._ontouchmove.bind(this,v,this.getRange(),h,a));h.map(function(o){if(o.className.indexOf(C+"HandlePressed")===-1){o.className+=" "+C+"HandlePressed";}});var p=this.getDomRef("progress");if(h.length===1){f=h[0];if(p.className.indexOf(C+"ProgressResized")===-1){p.className+=" "+C+"ProgressResized";}}else{f=p;}setTimeout(f["focus"].bind(f),0);};V.prototype._ontouchmove=function(f,a,h,b,e){var o,r,R,c,p=e.targetTouches?e.targetTouches[0].pageX:e.pageX,m=this.getMax(),M=this.getMin(),d=[],g=[];e.preventDefault();e.setMarked();if(e.isMarked("delayedMouseEvent")||!this.getEnabled()||e.button){return;}o=this._calculateHandlePosition(p,b)-f;for(var i=0;i<a.length;i++){d[i]=a[i]+o;}g=this._getNormalizedRange(this.getRange(),a,h);r=d.every(function(v,j){return v===g[j];});R=d.every(function(v){return(v>=M&&v<=m);});c=g.indexOf(M)>-1||g.indexOf(m)>-1;if(!r){if((h.length===1)||R||!c){if(h.length===1){this._positionCheck(h,o,a);}else{h.map(function(H){this._updateHandle(H,a[this._getIndexOfHandle(H)]+o);},this);}}this._adjustTooltipsContainer();g=this._getNormalizedRange(this.getRange(),a,h);}this.setRange(g);};V.prototype._positionCheck=function(h,o,a){var b=this._getIndexOfHandle(h[0]);var r=this.getRange();var p=a[b]+o;var t=[];for(var i=0;i<r.length;i++){t[i]=r[i];}t[b]=p;if(t[0]>=t[1]-1){p=r[1-b]+((b===1)?1:-1);}this._updateHandle(h[0],p);};V.prototype._triggerLiveChange=function(){var f,r=this.getRange();this._liveChangeLastValue=this._liveChangeLastValue||[];f=r.some(function(v,i){return v!==this._liveChangeLastValue[i];},this);if(f){this._liveChangeLastValue=r.slice();this.fireLiveChange({range:r});}};V.prototype._getNormalizedRange=function(r,a,h){var m=this.getMax(),M=this.getMin(),s=Math.abs(a[0]-a[1]),R=[],i,o;for(i=0;i<r.length;i++){R[i]=(r[i]<M?M:r[i]);R[i]=(r[i]>m?m:R[i]);if(h.length===2){if(R[0]==M){R[1]=R[0]+s;}else{o=Math.abs(i-1);R[o]=(R[i]<=M?R[i]+s:R[o]);R[o]=(R[i]>=m?R[i]-s:R[o]);}}}return R;};V.prototype._ontouchend=function(h,e){var n=this.getRange(),c=this.getRenderer().CSS_CLASS,p=this.getDomRef("progress");e.setMarked();p.className=p.className.replace(new RegExp(" ?"+c+"ProgressResized","gi"),"");h&&h.map(function(H){H.className=H.className.replace(new RegExp(" ?"+c+"HandlePressed","gi"),"");});q(document).off("."+c);this._recalculateRange();if(this._aInitialFocusRange[0]!==n[0]||this._aInitialFocusRange[1]!==n[1]){this._aInitialFocusRange=Array.prototype.slice.call(n);this.fireChange({range:n});}this._updateTooltipContent(this._mHandleTooltip.start.tooltip,n[0]);this._updateTooltipContent(this._mHandleTooltip.end.tooltip,n[1]);};V.prototype.onfocusin=function(e){var c=this.getRenderer().CSS_CLASS;this.$("progress").addClass("focus");this.$("TooltipsContainer").addClass(c+"HandleTooltipsShow");if(!this._hasFocus()){this._aInitialFocusRange=this.getRange();}};V.prototype._updateSliderValues=function(o,h){var r=this.getRange(),m=this.getMax(),M=this.getMin(),R=Math.max.apply(null,r),f=Math.min.apply(null,r),i=this._getIndexOfHandle(h),O=o<0?-1:1,H=i>-1?[h]:[this._mHandleTooltip.start.handle,this._mHandleTooltip.end.handle];if(H.length===1){var d=Math.abs(R-f);if((d<=Math.abs(o))&&((i===1&&O===-1)||(i===0&&O===1))){o=O*(d-1);}f=R=r[i];}if(R+o>m){o=O*(Math.abs(m)-Math.abs(R));}else if(f+o<M){o=O*(Math.abs(f)-Math.abs(M));}H.map(function(c){this._updateHandle(c,r[this._getIndexOfHandle(c)]+o);},this);};V.prototype.onsapincrease=function(e){if(["number","text"].indexOf(e.target.type)>-1){return;}e.preventDefault();e.setMarked();if(this.getEnabled()){this._updateSliderValues(this.getStep(),e.target);this._fireChangeAndLiveChange({range:this.getRange()});}};V.prototype.onsapplus=V.prototype.onsapincrease;V.prototype.onsapincreasemodifiers=function(e){if(["number","text"].indexOf(e.target.type)>-1||e.altKey){return;}e.preventDefault();e.stopPropagation();e.setMarked();if(this.getEnabled()){this._updateSliderValues(this._getLongStep(),e.target);this._fireChangeAndLiveChange({range:this.getRange()});}};V.prototype.onsappageup=V.prototype.onsapincreasemodifiers;V.prototype.onsapdecrease=function(e){if(["number","text"].indexOf(e.target.type)>-1){return;}e.preventDefault();e.setMarked();if(this.getEnabled()){this._updateSliderValues(-1*this.getStep(),e.target);this._fireChangeAndLiveChange({range:this.getRange()});}};V.prototype.onsapminus=V.prototype.onsapdecrease;V.prototype.onsapdecreasemodifiers=function(e){if(["number","text"].indexOf(e.target.type)>-1||e.altKey){return;}e.preventDefault();e.stopPropagation();e.setMarked();if(this.getEnabled()){this._updateSliderValues(-1*this._getLongStep(),e.target);this._fireChangeAndLiveChange({range:this.getRange()});}};V.prototype.onsappagedown=V.prototype.onsapdecreasemodifiers;V.prototype.onsaphome=function(e){if(["number","text"].indexOf(e.target.type)>-1){return;}e.setMarked();e.preventDefault();if(this.getEnabled()){this._updateSliderValues(-1*this.getMax(),e.target);this._fireChangeAndLiveChange({range:this.getRange()});}};V.prototype.onsapend=function(e){if(["number","text"].indexOf(e.target.type)>-1){return;}e.setMarked();e.preventDefault();if(this.getEnabled()){this._updateSliderValues(this.getMax(),e.target);this._fireChangeAndLiveChange({range:this.getRange()});}};V.prototype.onsapescape=function(){this.setRange(this._aInitialFocusRange);this._fireChangeAndLiveChange({range:this.getRange()});};V.prototype.setParentFrame=function(v){this._parentFrame=v;};return V;});

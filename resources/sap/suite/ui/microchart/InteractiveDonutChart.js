/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/m/library","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/Device","sap/m/FlexBox","sap/base/Log","./InteractiveDonutChartRenderer"],function(q,l,M,C,R,D,F,L){"use strict";var I=C.extend("sap.suite.ui.microchart.InteractiveDonutChart",{metadata:{library:"sap.suite.ui.microchart",properties:{displayedSegments:{type:"int",group:"Appearance",defaultValue:3},selectionEnabled:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"segments",aggregations:{segments:{type:"sap.suite.ui.microchart.InteractiveDonutChartSegment",multiple:true,bindable:"bindable"}},events:{selectionChanged:{parameters:{selectedSegments:{type:"sap.suite.ui.microchart.InteractiveDonutChartSegment[]"},segment:{type:"sap.suite.ui.microchart.InteractiveDonutChartSegment"},selected:{type:"boolean"}}},press:{}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});I.SEGMENT_CSSCLASS_SELECTED="sapSuiteIDCLegendSegmentSelected";I.SEGMENT_CSSCLASS_HIGHLIGHT="sapSuiteIDCLegendSegmentHover";I.CHART_SEGMENT_LABEL_MAXLENGTH=7;I.CHART_SEGMENT={CSSCLASS:"sapSuiteIDCChartSegment",CSSCLASS_HIGHLIGHT:"sapSuiteIDCChartSegmentHighlight",CSSCLASS_SELECTED:"sapSuiteIDCChartSegmentSelected"};I.CHART_SEGMENT_GHOST={CSSCLASS:"sapSuiteIDCChartSegmentGhost",CSSCLASS_HIGHLIGHT:"sapSuiteIDCChartSegmentGhostHighlight",CSSCLASS_SELECTED:"sapSuiteIDCChartSegmentGhostSelected"};I.AREA_HEIGHT_INTERACTIVE_MINVALUE=48;I.AREA_HEIGHT_INTERACTIVE_MINVALUE_COMPACT=32;I.AREA_HEIGHT_SMALLFONT=36;I.AREA_HEIGHT_SMALLFONT_COMPACT=32;I.AREA_HEIGHT_MINVALUE=18;I.LEGEND_HEIGHT_PADDING=6;I.CHART_HEIGHT_MINVALUE=110;I.CHART_WIDTH_MINVALUE=130;I.CHART_WIDTH_HIDEDONUT_MINVALUE=225;I.CHART_WIDTH_LEGENDPADDING_MINVALUE=300;I.CHART_WIDTH_FULLWIDTH_SMALLFONT_MINVALUE=180;I.prototype.onclick=function(e){if(!this.getSelectionEnabled()){return;}if(this._bInteractiveMode){var t=q(e.target),i=t.data("sap-ui-idc-selection-index"),s=this.getAggregation("segments"),f=this.$().find(".sapSuiteIDCLegendSegment"),h;if(!(i>=0)){i=t.closest(".sapSuiteIDCLegendSegment").data("sap-ui-idc-selection-index");}if(isNaN(i)||i<0||i>=s.length){return;}this._toggleSelected(i);h=f.index(this.$().find(".sapSuiteIDCLegendSegment[tabindex='0']"));this._switchTabindex(h,i,f);}else{this.firePress();if(D.browser.msie){this.$().focus();e.preventDefault();}}};I.prototype.onsapup=function(e){var f=this.$().find(".sapSuiteIDCLegendSegment");var i=f.index(e.target);if(f.length>0){this._switchTabindex(i,i-1,f);}e.preventDefault();e.stopImmediatePropagation();};I.prototype.onsapdown=function(e){var f=this.$().find(".sapSuiteIDCLegendSegment");var i=f.index(e.target);if(f.length>0){this._switchTabindex(i,i+1,f);}e.preventDefault();e.stopImmediatePropagation();};I.prototype.onsaphome=function(e){var f=this.$().find(".sapSuiteIDCLegendSegment");var i=f.index(e.target);if(i!==0&&f.length>0){this._switchTabindex(i,0,f);}e.preventDefault();e.stopImmediatePropagation();};I.prototype.onsapend=function(e){var f=this.$().find(".sapSuiteIDCLegendSegment");var i=f.index(e.target);var a=f.length;if(i!==a-1&&a>0){this._switchTabindex(i,a-1,f);}e.preventDefault();e.stopImmediatePropagation();};I.prototype.onsapenter=function(e){if(this._bInteractiveMode){var i=this.$().find(".sapSuiteIDCLegendSegment").index(e.target);if(i!==-1){this._toggleSelected(i);}e.preventDefault();e.stopImmediatePropagation();}else{this.firePress();}};I.prototype.onsapleft=I.prototype.onsapup;I.prototype.onsapright=I.prototype.onsapdown;I.prototype.onsapspace=I.prototype.onsapenter;I.prototype.getTooltip_AsString=function(){var t=this.getTooltip_Text();if(!t){t=this._createTooltipText();}else if(l._isTooltipSuppressed(t)){t=null;}return t;};I.prototype.getSelectedSegments=function(){var s,S;s=this.getAggregation("segments");S=[];for(var i=0;i<s.length;i++){if(s[i].getSelected()){S.push(s[i]);}}return S;};I.prototype.setSelectedSegments=function(s){var S,a,b;S=this.getAggregation("segments");this._deselectAllSelectedSegments();if(!s){return this;}if(s instanceof l.InteractiveDonutChartSegment){s=[s];}if(Array.isArray(s)){b=s.length;for(var i=0;i<b;i++){a=this.indexOfAggregation("segments",s[i]);if(a>=0&&S[a]){S[a].setProperty("selected",true,true);}else{L.warning("Method setSelectedSegments called with invalid InteractiveDonutChartSegment element");}}}this.invalidate();return this;};I.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}};I.prototype.onBeforeRendering=function(){this._bCompact=this._isCompact();this._bInteractiveMode=true;var s=this.getSegments();this._iVisibleSegments=Math.min(this.getDisplayedSegments(),s.length);this._setResponsivenessData();var S=this.$().find(".sapSuiteIDCChartSegment, .sapSuiteIDCLegendSegment, .sapSuiteIDCChartSegmentGhost");S.off();if(!this.data("_parentRenderingContext")&&q.isFunction(this.getParent)){this.data("_parentRenderingContext",this.getParent());}this._deregisterResizeHandler();this._bSemanticTooltip=false;for(var i=0;i<this._iVisibleSegments;i++){if(s[i].getColor()!==M.ValueColor.Neutral){this._bSemanticTooltip=true;break;}}};I.prototype.onAfterRendering=function(){this._adjustToParent(this.$());l._checkControlIsVisible(this,this._onControlIsVisible);};I.prototype._onControlIsVisible=function(){if(this._bInteractiveMode){this._sResizeHandlerId=R.register(this,this._onResize.bind(this));this._onResize();if(this.$().length>0){var c=this._isCompact();if(c!==this._bCompact){this._bCompact=c;this.invalidate();}}if(D.system.desktop){this._attachHoverHandlers();}}};I.prototype.exit=function(){this._deregisterResizeHandler();};I.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);};I.prototype._deselectAllSelectedSegments=function(){var s=this.getAggregation("segments");for(var i=0;i<s.length;i++){if(s[i].getSelected()){s[i].setProperty("selected",false,true);}}};I.prototype._attachHoverHandlers=function(){var t=this,s=this.$().find(".sapSuiteIDCChartSegment, .sapSuiteIDCLegendSegment, .sapSuiteIDCChartSegmentGhost");s.on({mousemove:function(){t._handleHoverSync(q(this).data("sap-ui-idc-selection-index"));},mouseleave:function(){t._handleHoverSync(q(this).data("sap-ui-idc-selection-index"),true);}});};I.prototype._handleHoverSync=function(i,o){if(this._bInteractiveMode){var s=this.getAggregation("segments"),S=s[i].getSelected();this._setSegmentInteractionState(I.CHART_SEGMENT,i,S,o);this._setSegmentInteractionState(I.CHART_SEGMENT_GHOST,i,S,o);this._setLegendEntryInteractionState(i,S,o);}};I.prototype._setSegmentInteractionState=function(s,i,a,o){var S=this.$().find("."+s.CSSCLASS+"[data-sap-ui-idc-selection-index='"+i+"']");S.removeClass(s.CSSCLASS_SELECTED);S.removeClass(s.CSSCLASS_HIGHLIGHT);if(!o){S.addClass(s.CSSCLASS_HIGHLIGHT);}if(a){S.addClass(s.CSSCLASS_SELECTED);}};I.prototype._setLegendEntryInteractionState=function(i,s,o){var e=this.$().find(".sapSuiteIDCLegendSegment[data-sap-ui-idc-selection-index='"+i+"']");e.removeClass(I.SEGMENT_CSSCLASS_SELECTED);e.removeClass(I.SEGMENT_CSSCLASS_HIGHLIGHT);if(!o){e.addClass(I.SEGMENT_CSSCLASS_HIGHLIGHT);}if(s){e.addClass(I.SEGMENT_CSSCLASS_SELECTED);}};I.prototype._switchModeInteractive=function(a){var $=this.$(),s=false;if(a<this._iAreaHeightInteractiveMinValue){s=true;if(this._bInteractiveMode){this._bInteractiveMode=false;$.addClass("sapSuiteIDCNonInteractive");if(this.getSelectionEnabled()){var A=$.find(".sapSuiteIDCLegendSegment[tabindex='0']");this._iActiveElement=$.find(".sapSuiteIDCLegendSegment").index(A);A.removeAttr("tabindex");$.attr("tabindex","0");}$.attr({"role":"button","aria-multiselectable":"false","aria-disabled":!this._isChartEnabled()});}}else if(!this._bInteractiveMode){s=true;this._bInteractiveMode=true;$.removeClass("sapSuiteIDCNonInteractive");if(this.getSelectionEnabled()){$.removeAttr("tabindex");if(!this._iActiveElement||this._iActiveElement<0){this._iActiveElement=0;}$.find(".sapSuiteIDCLegendSegment").eq(this._iActiveElement).attr("tabindex","0");}$.attr({"role":"listbox","aria-multiselectable":"true","aria-disabled":!this._isChartEnabled()});}if(s){if(this._isChartEnabled()){$.removeAttr("title");this._addInteractionAreaTooltip();}else{$.find(".sapSuiteIDCChartSegment title, .sapSuiteIDCChartSegmentGhost title").remove();$.find(".sapSuiteIDCLegendSegment").removeAttr("title");$.attr("title",this.getTooltip_AsString());}}};I.prototype._addInteractionAreaTooltip=function(){var t,e,s,$=this.$(),S=this.getSegments();$.find(".sapSuiteIDCChartSegment, .sapSuiteIDCChartSegmentGhost").each(function(i,a){e=q(a);s=parseInt(e.attr("data-sap-ui-idc-selection-index"));t=q("<div/>").text(S[s].getTooltip_AsString());e.html("<title>"+t.getEncodedText()+"</title>");});$.find(".sapSuiteIDCLegendSegment").each(function(i,a){e=q(a);s=parseInt(e.attr("data-sap-ui-idc-selection-index"));e.attr("title",S[s].getTooltip_AsString());});};I.prototype._onResize=function(){var i,a,$=this.$(),b=$.find(".sapSuiteIDCLegendSegment"),d=$.find(".sapSuiteIDCChart"),c=parseInt(d.css("padding-right"))+parseInt(d.css("padding-left")),e=$.height(),f=$.width();if(this._bInteractiveMode){a=2;}else{a=1;}i=((e-I.LEGEND_HEIGHT_PADDING-(b.length*a))/b.length);b.height(i+"px");if(f<I.CHART_WIDTH_MINVALUE||e<I.CHART_HEIGHT_MINVALUE||i<I.AREA_HEIGHT_MINVALUE){$.css("visibility","hidden");return;}$.css("visibility","");if(f<I.CHART_WIDTH_HIDEDONUT_MINVALUE){$.addClass("sapSuiteIDCFullWidth");if(f<I.CHART_WIDTH_FULLWIDTH_SMALLFONT_MINVALUE){$.addClass("sapSuiteIDCFullWidthSmallFont");}else{$.removeClass("sapSuiteIDCFullWidthSmallFont");}}else{$.removeClass("sapSuiteIDCFullWidth");if(d.innerWidth()<d.innerHeight()){$.find(".sapSuiteIDCChartSVG").css("width","100%").css("height",d.innerWidth()+"px");}else{$.find(".sapSuiteIDCChartSVG").css("height","100%").css("width",(d.innerHeight()-c)+"px");}if(f<I.CHART_WIDTH_LEGENDPADDING_MINVALUE){$.addClass("sapSuiteIDCSmallLegendPadding");}else{$.removeClass("sapSuiteIDCSmallLegendPadding");}}if(i<this._iAreaHeightSmallFontMinValue){$.addClass("sapSuiteIDCSmallFont");}else{$.removeClass("sapSuiteIDCSmallFont");}this._handleLegendEntrySizing();this._switchModeInteractive(i);};I.prototype._handleLegendEntrySizing=function(){var $=this.$().find(".sapSuiteIDCLegend"),a=$.find(".sapSuiteIDCLegendLabel"),v=$.find(".sapSuiteIDCLegendValue"),V=0;v.each(function(){var i=q(this).outerWidth(true);V=Math.max(V,i);});a.css("width","calc(100% - "+V+"px)");v.css("width",V+"px");};I.prototype._isChartEnabled=function(){return this.getSelectionEnabled()&&this._bInteractiveMode;};I.prototype._isCompact=function(){return q("body").hasClass("sapUiSizeCompact")||this.$().is(".sapUiSizeCompact")||this.$().closest(".sapUiSizeCompact").length>0;};I.prototype._toggleSelected=function(i){var s=this.getSegments()[i],S=!s.getSelected(),$=this.$("interactionArea-"+i),a=this.$().find("."+I.CHART_SEGMENT.CSSCLASS+"[data-sap-ui-idc-selection-index='"+i+"']"),g=this.$().find("."+I.CHART_SEGMENT_GHOST.CSSCLASS+"[data-sap-ui-idc-selection-index='"+i+"']");s.setProperty("selected",S,true);$.attr("aria-selected",s.getSelected());if(S){$.addClass(I.SEGMENT_CSSCLASS_SELECTED);a.addClass(I.CHART_SEGMENT.CSSCLASS_SELECTED);g.addClass(I.CHART_SEGMENT_GHOST.CSSCLASS_SELECTED);}else{$.removeClass(I.SEGMENT_CSSCLASS_SELECTED);a.removeClass(I.CHART_SEGMENT.CSSCLASS_SELECTED);g.removeClass(I.CHART_SEGMENT_GHOST.CSSCLASS_SELECTED);}this.fireSelectionChanged({selectedSegments:this.getSelectedSegments(),segment:s,selected:S});};I.prototype._switchTabindex=function(o,n,f){if(o!==n&&o>=0&&o<f.length&&n>=0&&n<f.length){f.eq(o).removeAttr("tabindex");f.eq(n).attr("tabindex","0");f.eq(n).focus();}};I.prototype._adjustToParent=function(c){var p=this.data("_parentRenderingContext");if(p&&p instanceof F){var P=p.$();var i=parseFloat(P.innerWidth());var a=parseFloat(P.innerHeight());c.outerWidth(i);c.outerHeight(a);}};I.prototype._setResponsivenessData=function(){if(this._bCompact){this._iAreaHeightInteractiveMinValue=I.AREA_HEIGHT_INTERACTIVE_MINVALUE_COMPACT;this._iAreaHeightSmallFontMinValue=I.AREA_HEIGHT_SMALLFONT_COMPACT;}else{this._iAreaHeightInteractiveMinValue=I.AREA_HEIGHT_INTERACTIVE_MINVALUE;this._iAreaHeightSmallFontMinValue=I.AREA_HEIGHT_SMALLFONT;}};I.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this._bCompact=this._isCompact();this.invalidate();};I.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){R.deregister(this._sResizeHandlerId);this._sResizeHandlerId=null;}};I.prototype._createTooltipText=function(){var b=true,s,t="",S=this.getSegments();for(var i=0;i<this._iVisibleSegments;i++){if(!S[i]){break;}s=S[i]._getSegmentTooltip();if(s){t+=(b?"":"\n")+s;b=false;}}return t;};return I;});

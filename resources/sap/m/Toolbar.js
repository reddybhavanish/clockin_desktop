/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./BarInPageEnabler','./ToolbarLayoutData','./ToolbarSpacer','./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator',"sap/ui/events/KeyCodes",'./ToolbarRenderer'],function(B,T,a,l,C,E,K,b){"use strict";var c=l.ToolbarDesign,d=l.ToolbarStyle;var e=C.extend("sap.m.Toolbar",{metadata:{interfaces:["sap.ui.core.Toolbar","sap.m.IBar"],library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},active:{type:"boolean",group:"Behavior",defaultValue:false},enabled:{type:"boolean",group:"Behavior",defaultValue:true},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:''},design:{type:"sap.m.ToolbarDesign",group:"Appearance",defaultValue:c.Auto},style:{type:"sap.m.ToolbarStyle",group:"Appearance",defaultValue:d.Standard}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{parameters:{srcControl:{type:"sap.ui.core.Control"}}}},designtime:"sap/m/designtime/Toolbar.designtime"}});E.call(e.prototype);e.shrinkClass="sapMTBShrinkItem";e.isRelativeWidth=function(w){return/^([-+]?\d+%|auto|inherit|)$/i.test(w);};e.getOrigWidth=function(i){var o=sap.ui.getCore().byId(i);if(!o||!o.getWidth){return"";}return o.getWidth();};e.checkShrinkable=function(o,s){if(o instanceof a){return this.isRelativeWidth(o.getWidth());}s=s||this.shrinkClass;o.removeStyleClass(s);var w=this.getOrigWidth(o.getId());if(!this.isRelativeWidth(w)){return;}var L=o.getLayoutData();if(L instanceof T){return L.getShrinkable()&&o.addStyleClass(s);}if(w.indexOf("%")>0||o.getMetadata().isInstanceOf("sap.ui.core.IShrinkable")){return o.addStyleClass(s);}var D=o.getDomRef();if(D&&(D.firstChild||{}).nodeType==3){return o.addStyleClass(s);}};e.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);this._oContentDelegate={onAfterRendering:this._onAfterContentRendering};};e.prototype.onAfterRendering=function(){this._checkContents();};e.prototype.onLayoutDataChange=function(){this.rerender();};e.prototype.addContent=function(o){this.addAggregation("content",o);this._onContentInserted(o);return this;};e.prototype.insertContent=function(o,i){this.insertAggregation("content",o,i);this._onContentInserted(o);return this;};e.prototype.removeContent=function(v){v=this.removeAggregation("content",v);this._onContentRemoved(v);return v;};e.prototype.removeAllContent=function(){var f=this.removeAllAggregation("content")||[];f.forEach(this._onContentRemoved,this);return f;};e.prototype.ontap=function(o){if(this.getActive()&&!o.isMarked()){o.setMarked();this.firePress({srcControl:o.srcControl});}};e.prototype.onsapenter=function(o){if(this.getActive()&&o.srcControl===this&&!o.isMarked()){o.setMarked();this.firePress({srcControl:this});}};e.prototype.onsapspace=function(o){if(o.srcControl===this){o.preventDefault();}};e.prototype.onkeyup=function(o){if(o.which===K.SPACE){this.onsapenter(o);}};e.prototype.ontouchstart=function(o){this.getActive()&&o.setMarked();};e.prototype._checkContents=function(){this.getContent().forEach(function(o){e.checkShrinkable(o);});};e.prototype._onContentInserted=function(o){if(o){o.attachEvent("_change",this._onContentPropertyChanged,this);o.addEventDelegate(this._oContentDelegate,o);}};e.prototype._onContentRemoved=function(o){if(o){o.detachEvent("_change",this._onContentPropertyChanged,this);o.removeEventDelegate(this._oContentDelegate,o);}};e.prototype._onAfterContentRendering=function(){var L=this.getLayoutData();if(L instanceof T){L.applyProperties();}};e.prototype._onContentPropertyChanged=function(o){if(o.getParameter("name")!="width"){return;}var f=o.getSource();var p=f.getWidth().indexOf("%")>0;f.toggleStyleClass(e.shrinkClass,p);};e.prototype._getAccessibilityRole=function(){var r=this._getRootAccessibilityRole();if(this.getActive()){r="button";}return r;};e.prototype.setDesign=function(D,s){if(!s){return this.setProperty("design",D);}this._sAutoDesign=this.validateProperty("design",D);return this;};e.prototype.getActiveDesign=function(){var D=this.getDesign();if(D!=c.Auto){return D;}return this._sAutoDesign||D;};e.prototype.getTitleControl=function(){var f=sap.ui.require("sap/m/Title");if(!f){return;}var g=this.getContent();for(var i=0;i<g.length;i++){var o=g[i];if(o instanceof f&&o.getVisible()){return o;}}};e.prototype.getTitleId=function(){var t=this.getTitleControl();return t?t.getId():"";};e.prototype.isContextSensitive=B.prototype.isContextSensitive;e.prototype.setHTMLTag=B.prototype.setHTMLTag;e.prototype.getHTMLTag=B.prototype.getHTMLTag;e.prototype.applyTagAndContextClassFor=B.prototype.applyTagAndContextClassFor;e.prototype._applyContextClassFor=B.prototype._applyContextClassFor;e.prototype._applyTag=B.prototype._applyTag;e.prototype._getContextOptions=B.prototype._getContextOptions;e.prototype._setRootAccessibilityRole=B.prototype._setRootAccessibilityRole;e.prototype._getRootAccessibilityRole=B.prototype._getRootAccessibilityRole;e.prototype._setRootAriaLevel=B.prototype._setRootAriaLevel;e.prototype._getRootAriaLevel=B.prototype._getRootAriaLevel;return e;});

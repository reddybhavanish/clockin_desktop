/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/LayoutData','./library',"sap/base/Log"],function(L,l,a){"use strict";var G=L.extend("sap.ui.layout.GridData",{metadata:{library:"sap.ui.layout",properties:{span:{type:"sap.ui.layout.GridSpan",group:"Behavior",defaultValue:null},spanXL:{type:"int",group:"Behavior",defaultValue:null},spanL:{type:"int",group:"Behavior",defaultValue:null},spanM:{type:"int",group:"Behavior",defaultValue:null},spanS:{type:"int",group:"Behavior",defaultValue:null},indent:{type:"sap.ui.layout.GridIndent",group:"Behavior",defaultValue:null},indentXL:{type:"int",group:"Behavior",defaultValue:null},indentL:{type:"int",group:"Behavior",defaultValue:null},indentM:{type:"int",group:"Behavior",defaultValue:null},indentS:{type:"int",group:"Behavior",defaultValue:null},visibleXL:{type:"boolean",group:"Behavior",defaultValue:true},visibleL:{type:"boolean",group:"Behavior",defaultValue:true},visibleM:{type:"boolean",group:"Behavior",defaultValue:true},visibleS:{type:"boolean",group:"Behavior",defaultValue:true},moveBackwards:{type:"sap.ui.layout.GridIndent",group:"Misc",defaultValue:null},moveForward:{type:"sap.ui.layout.GridIndent",group:"Misc",defaultValue:null},linebreak:{type:"boolean",group:"Misc",defaultValue:false},linebreakXL:{type:"boolean",group:"Misc",defaultValue:false},linebreakL:{type:"boolean",group:"Misc",defaultValue:false},linebreakM:{type:"boolean",group:"Misc",defaultValue:false},linebreakS:{type:"boolean",group:"Misc",defaultValue:false},spanLarge:{type:"int",group:"Behavior",defaultValue:null,deprecated:true},spanMedium:{type:"int",group:"Behavior",defaultValue:null,deprecated:true},spanSmall:{type:"int",group:"Behavior",defaultValue:null,deprecated:true},indentLarge:{type:"int",group:"Behavior",defaultValue:null,deprecated:true},indentMedium:{type:"int",group:"Behavior",defaultValue:null,deprecated:true},indentSmall:{type:"int",group:"Behavior",defaultValue:null,deprecated:true},visibleOnLarge:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true},visibleOnMedium:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true},visibleOnSmall:{type:"boolean",group:"Behavior",defaultValue:true,deprecated:true}}}});(function(){G.prototype._setStylesInternal=function(s){if(s&&s.length>0){this._sStylesInternal=s;}else{this._sStylesInternal=undefined;}};G.prototype._getEffectiveSpanXLarge=function(){var s=this.getSpanXL();if(s&&(s>0)&&(s<13)){return s;}var S=/XL([1-9]|1[0-2])(?:\s|$)/i;var b=S.exec(this.getSpan());if(b){var c=b[0];if(c){c=c.toUpperCase();if(c.substr(0,2)==="XL"){return parseInt(c.substr(2));}}}return undefined;};G.prototype._getEffectiveSpanLarge=function(){var s=this.getSpanL();if(s&&(s>0)&&(s<13)){return s;}var S=/\bL([1-9]|1[0-2])(?:\s|$)/i;var b=S.exec(this.getSpan());if(b){var c=b[0];if(c){c=c.toUpperCase();if(c.substr(0,1)==="L"){return parseInt(c.substr(1));}}}return undefined;};G.prototype._getEffectiveSpanMedium=function(){var s=this.getSpanM();if(s&&(s>0)&&(s<13)){return s;}var S=/M([1-9]|1[0-2])(?:\s|$)/i;var b=S.exec(this.getSpan());if(b){var c=b[0];if(c){c=c.toUpperCase();if(c.substr(0,1)==="M"){return parseInt(c.substr(1));}}}return undefined;};G.prototype._getEffectiveSpanSmall=function(){var s=this.getSpanS();if(s&&(s>0)&&(s<13)){return s;}var S=/S([1-9]|1[0-2])(?:\s|$)/i;var b=S.exec(this.getSpan());if(b){var c=b[0];if(c){c=c.toUpperCase();if(c.substr(0,1)==="S"){return parseInt(c.substr(1));}}}return undefined;};G.prototype.init=function(){this._bLinebreakXLChanged=false;};G.prototype.setLinebreakXL=function(b){this.setProperty("linebreakXL",b);this._bLinebreakXLChanged=true;return this;};G.prototype._getLinebreakXLChanged=function(){return this._bLinebreakXLChanged;};G.prototype.setSpanLarge=function(s){this.setSpanL(s);a.warning("Deprecated property spanLarge is used, please use spanL instead.");return this;};G.prototype.setSpanMedium=function(s){a.warning("Deprecated property spanMedium is used, please use spanM instead.");return this.setSpanM(s);};G.prototype.setSpanSmall=function(s){a.warning("Deprecated property spanSmall is used, please use spanS instead.");return this.setSpanS(s);};G.prototype.setIndentLarge=function(i){a.warning("Deprecated property indentLarge is used, please use indentL instead.");return this.setIndentL(i);};G.prototype.setIndentMedium=function(i){a.warning("Deprecated property indentMedium is used, please use indentM instead.");return this.setIndentM(i);};G.prototype.setIndentSmall=function(i){a.warning("Deprecated property indentSmall is used, please use indentS instead.");return this.setIndentS(i);};G.prototype.setVisibleOnLarge=function(v){a.warning("Deprecated property visibleOnLarge is used, please use visibleL instead.");return this.setVisibleL(v);};G.prototype.setVisibleOnMedium=function(v){a.warning("Deprecated property visibleOnMedium is used, please use visibleM instead.");return this.setVisibleM(v);};G.prototype.setVisibleOnSmall=function(v){a.warning("Deprecated property visibleOnSmall is used, please use visibleS instead.");return this.setVisibleS(v);};G.prototype.getSpanLarge=function(){a.warning("Deprecated property spanLarge is used, please use spanL instead.");return this.getSpanL();};G.prototype.getSpanMedium=function(){a.warning("Deprecated property spanMedium is used, please use spanM instead.");return this.getSpanM();};G.prototype.getSpanSmall=function(){a.warning("Deprecated property spanSmall is used, please use spanS instead.");return this.getSpanS();};G.prototype.getIndentLarge=function(){a.warning("Deprecated property indentLarge is used, please use indentL instead.");return this.getIndentL();};G.prototype.getIndentMedium=function(){a.warning("Deprecated property indentMedium is used, please use indentM instead.");return this.getIndentM();};G.prototype.getIndentSmall=function(){a.warning("Deprecated property indentSmall is used, please use indentS instead.");return this.getIndentS();};G.prototype.getVisibleOnLarge=function(){a.warning("Deprecated property visibleOnLarge is used, please use visibleL instead.");return this.getVisibleL();};G.prototype.getVisibleOnMedium=function(){a.warning("Deprecated property visibleOnMedium is used, please use visibleM instead.");return this.getVisibleM();};G.prototype.getVisibleOnSmall=function(){a.warning("Deprecated property visibleOnSmall is used, please use visibleS instead.");return this.getVisibleS();};}());return G;});

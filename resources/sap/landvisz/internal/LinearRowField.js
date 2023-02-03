/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2013 SAP AG. All rights reserved
 */
sap.ui.define(["sap/landvisz/library","sap/ui/core/Control","sap/ui/commons/Image","sap/ui/commons/Label","sap/ui/commons/TextView","./LinearRowFieldRenderer"],function(l,C,I,L,T,a){"use strict";var E=l.EntityCSSSize;var b=C.extend("sap.landvisz.internal.LinearRowField",{metadata:{library:"sap.landvisz",properties:{label:{type:"string",group:"Data",defaultValue:null},value:{type:"string",group:"Data",defaultValue:null},renderingSize:{type:"sap.landvisz.EntityCSSSize",group:"Dimension",defaultValue:E.Regular},iconType:{type:"string",group:"Data",defaultValue:null},iconTitle:{type:"string",group:"Data",defaultValue:null},rightIconSrc:{type:"string",group:"Data",defaultValue:null},linkSource:{type:"string",group:"Data",defaultValue:null},rightIconTooltip:{type:"string",group:"Data",defaultValue:null},invalidName:{type:"boolean",group:"Identification",defaultValue:null}}}});b.prototype.init=function(){this.initializationDone=false;this.iconType&&this.iconType.destroy();this.totalWidth=0;};b.prototype.exit=function(){this.oLinearRowFieldLabel&&this.oLinearRowFieldLabel.destroy();this.oLinearRowFieldValue&&this.oLinearRowFieldValue.destroy();this.seperatorLbl&&this.seperatorLbl.destroy();};b.prototype.initControls=function(){var n=this.getId();if(!this.oLinearRowFieldLabel)this.oLinearRowFieldLabel=new L(n+"-CLVConLabel");if(!this.oLinearRowFieldValue)this.oLinearRowFieldValue=new T(n+"-CLVConValue");if(!this.seperatorLbl)this.seperatorLbl=new T(n+"-CLVConSeperator");this.iconType&&this.iconType.destroy();this.iconType=new I(n+"-CLVDataTypeImg");if(!this.rightIcon)this.rightIcon=new I(n+"-rightImg");this.entityMaximized;};b.prototype.onmouseenter=function(e){e.stopImmediatePropagation();};b.prototype.onmouseleave=function(e){e.stopImmediatePropagation();};return b;});

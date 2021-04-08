/*
 * !SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["./Item",'sap/ui/base/SyncPromise',"sap/ui/mdc/library"],function(I,S,M){"use strict";var D,T,H;var _={category:true,category2:true,series:true};var a=I.extend("sap.ui.mdc.chart.DimensionItem",{metadata:{"abstract":true,library:"sap.ui.mdc",properties:{textFormatter:{type:"function"},textProperty:{type:"string"},displayText:{type:"boolean",defaultValue:true},role:{type:"string",defaultValue:"category"},inResult:{type:"boolean",defaultValue:false},level:{type:"int",defaultValue:undefined},timeUnit:{type:"string",defaultValue:undefined},criticality:{type:"object",multiple:"false"}}}});a.prototype.getSettings=function(m){var s={label:this.getLabel()||m.label,role:this.getRole(),name:this.getKey(),textProperty:this.getTextProperty(),displayText:this.getDisplayText()};if(this._isHierarchyDimension()){s.level=this.getLevel();}return s;};a.prototype.toChart=function(c){return new S(function(r){this._oVizItem=c.getDimensionByName(this.getKey());if(this._oVizItem){var o=this._oVizItem.getRole();this._oVizItem.setRole(this.getRole());if(this._observer){this._observer.propertyChange(this,"role",o,this.getRole());}r(this);}else{this.toVizChartItem().then(function(i){this._oVizItem=i;c.addDimension(this._oVizItem,true);if(this._observer){this._observer.propertyChange(this,"role",null,this.getRole());}r(this);}.bind(this));}}.bind(this));};a.prototype.toVizChartItem=function(m){if(!this._pToVizItem){this._pToVizItem=new S(function(r){m=m||{};var b,d,v;if(this._isHierarchyDimension()){b=H;d="sap/chart/data/HierarchyDimension";}else if(this._isTimeDimension()){b=T;d="sap/chart/data/TimeDimension";}else{b=D;d="sap/chart/data/Dimension";}if(b){v=new b(this.getSettings(m));r(v);}else{sap.ui.require([d],function(c){b=c;v=new b(this.getSettings(m));r(v);}.bind(this));}}.bind(this));}return this._pToVizItem;};a.prototype.setRole=function(r){if(!_[r]){jQuery.error("Invalide Measure role: "+r);}this.setProperty("role",r,true);var c=this.getParent();if(c){c.oChartPromise.then(function(v){this.toChart(v);}.bind(this));}return this;};a.prototype.getVizItemType=function(){return M.ChartItemType.Dimension;};a.prototype._isHierarchyDimension=function(){return false;};a.prototype._isTimeDimension=function(){if(this.getVizItemType()=="Measure"){return false;}switch(this.getType()){case"date":case"time":case"datetime":return true;default:return false;}};return a;},true);

/*
 * ! SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/m/Label','sap/ui/core/Element','sap/ui/comp/util/IdentifierUtil'],function(L,E,I){"use strict";var F=E.extend("sap.ui.comp.filterbar.FilterItem",{metadata:{library:"sap.ui.comp",properties:{label:{type:"string",group:"Misc",defaultValue:null},name:{type:"string",group:"Misc",defaultValue:null},mandatory:{type:"boolean",group:"Misc",defaultValue:false},visible:{type:"boolean",group:"Misc",defaultValue:true},labelTooltip:{type:"string",group:"Misc",defaultValue:null},controlTooltip:{type:"string",group:"Misc",defaultValue:null},partOfCurrentVariant:{type:"boolean",group:"Misc",defaultValue:false},visibleInFilterBar:{type:"boolean",group:"Misc",defaultValue:true},hiddenFilter:{type:"boolean",group:"Misc",defaultValue:false},entitySetName:{type:"string",group:"Misc",defaultValue:null},entityTypeName:{type:"string",group:"Misc",defaultValue:null}},aggregations:{control:{type:"sap.ui.core.Control",multiple:false}},events:{change:{parameters:{propertyName:{type:"string"}}}}}});F.prototype.init=function(){this._oLabel=null;this._bIsParameter=false;this._sControlId=null;};F.prototype.setControl=function(c){if(c&&c.getId){this._sControlId=c.getId();}this.setAggregation("control",c);return this;};F.prototype.getControl=function(){var c=this.getAggregation("control");if(c){return c;}if(this._sControlId===null){return null;}return sap.ui.getCore().byId(this._sControlId);};F.prototype._isParameter=function(){return this._bIsParameter;};F.prototype.setVisible=function(v){this.setProperty("visible",v);this.fireChange({propertyName:"visible"});return this;};F.prototype.setVisibleInFilterBar=function(v){this.setProperty("visibleInFilterBar",v);this.fireChange({propertyName:"visibleInFilterBar"});return this;};F.prototype.setPartOfCurrentVariant=function(v){this.setProperty("partOfCurrentVariant",v);this.fireChange({propertyName:"partOfCurrentVariant"});return this;};F.prototype._getGroupName=function(){var n="";if(this.getGroupName){n=I.replace(this.getGroupName());}return n;};F.prototype._getName=function(){var n=I.replace(this.getName());var g=this._getGroupName();if(g){n=g+"-"+n;}return n;};F.prototype._createLabelControl=function(f){var t=this.getLabel();var i="filterItem-"+this._getName();if(f){i=f+"-"+i;}var l=new L({id:i,required:this.getMandatory(),textAlign:"Begin"});l.setText(t);l.setTooltip(this.getLabelTooltip());return l;};F.prototype.setMandatory=function(v){this.setProperty("mandatory",v);if(this._oLabel){this._oLabel.setRequired(v);}this.fireChange({propertyName:"mandatory"});return this;};F.prototype.setLabel=function(v){this.setProperty("label",v);if(this._oLabel){this._oLabel.setText(v);}if(!this.getLabelTooltip()){this.setLabelTooltip(v);}this.fireChange({propertyName:"label"});return this;};F.prototype.setLabelTooltip=function(t){this.setProperty("labelTooltip",t);if(this._oLabel){this._oLabel.setTooltip(t);}this.fireChange({propertyName:"labelTooltip"});return this;};F.prototype.setControlTooltip=function(t){this.setProperty("controlTooltip",t);this.fireChange({propertyName:"controlTooltip"});return this;};F.prototype.getLabelControl=function(f){if(!this._oLabel){this._oLabel=this._createLabelControl(f);}return this._oLabel;};F.prototype.destroy=function(){if(this._oLabel&&!this._oLabel.bDestroyed){this._oLabel.destroy();}E.prototype.destroy.apply(this,arguments);this._oLabel=null;this._sQuickinfo=null;};return F;});

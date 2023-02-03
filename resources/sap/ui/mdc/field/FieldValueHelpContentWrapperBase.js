/*
 * ! SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/Element'],function(E){"use strict";var F=E.extend("sap.ui.mdc.field.FieldValueHelpContentWrapperBase",{metadata:{library:"sap.ui.mdc",properties:{selectedItems:{type:"object[]",defaultValue:[]}},defaultProperty:"selectedItems",events:{navigate:{parameters:{key:{type:"any"},description:{type:"string"}}},selectionChange:{parameters:{selectedItems:{type:"object[]"},itemPress:{type:"boolean"}}},dataUpdate:{parameters:{contentChange:{type:"boolean"}}}}}});F.prototype.init=function(){};F.prototype.exit=function(){};F.prototype.initialize=function(s){return this;};F.prototype.setSelectedItems=function(s){this.setProperty("selectedItems",s,true);return this;};F.prototype.getDialogContent=function(){return undefined;};F.prototype.getSuggestionContent=function(){return undefined;};F.prototype.fieldHelpOpen=function(s){this._bSuggestion=s;return this;};F.prototype.fieldHelpClose=function(){delete this._bSuggestion;return this;};F.prototype.getFilterEnabled=function(){return true;};F.prototype.navigate=function(s){};F.prototype.getTextForKey=function(k,i,o){return"";};F.prototype.getKeyForText=function(t,i){return undefined;};F.prototype.getListBinding=function(){return undefined;};F.prototype.getAsyncKeyText=function(){return false;};F.prototype.applyFilters=function(f,s){};F.prototype.isSuspended=function(){return false;};F.prototype._getFieldHelp=function(){var f=this.getParent();if(!f||!f.isA("sap.ui.mdc.field.FieldValueHelp")){throw new Error(this.getId()+" must be assigned to a sap.ui.mdc.field.FieldValueHelp");}return f;};F.prototype._getKeyPath=function(){var f=this._getFieldHelp();return f._getKeyPath();};F.prototype._getDescriptionPath=function(){var f=this._getFieldHelp();return f.getDescriptionPath();};F.prototype._getInParameters=function(){var f=this._getFieldHelp();var h=[];if(f){h=_(f.getInParameters());}return h;};F.prototype._getOutParameters=function(){var f=this._getFieldHelp();var h=[];if(f){h=_(f.getOutParameters());}return h;};function _(p){var h=[];for(var i=0;i<p.length;i++){var P=p[i];var H=P.getHelpPath();if(H){h.push(H);}}return h;}F.prototype._getMaxConditions=function(){var f=this._getFieldHelp();return f.getMaxConditions();};F.prototype._getDelegate=function(){var f=this._getFieldHelp();var d=f.getDelegate();return{delegate:f.DELEGATE,payload:d.payload};};return F;});

/*
 * ! SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/base/ManagedObject','sap/ui/comp/library','./Util','./ColumnHelper','sap/base/Log'],function(M,C,U,a,L){"use strict";var B=M.extend("sap.ui.comp.personalization.BaseController",{metadata:{"abstract":true,library:"sap.ui.comp",properties:{type:{type:"string",defaultValue:null},itemType:{type:"string",defaultValue:null},ignoreColumnKeys:{type:"object",defaultValue:[]},additionalIgnoreColumnKeys:{type:"object",defaultValue:[]},stableColumnKeys:{type:"string[]",defaultValue:[]},columnHelper:{type:"sap.ui.comp.personalization.ColumnHelper",defaultValue:null},columnKeys:{type:"string[]",defaultValue:[]},tableType:{type:"string",defaultValue:null}},associations:{table:{type:"sap.ui.core.Control",multiple:false}},events:{beforePotentialTableChange:{},afterPotentialTableChange:{},afterPotentialModelChange:{parameters:{json:{type:"object"}}}}}});B.prototype.exit=function(){if(this.getModel()){this.getModel().destroy();}};B.prototype.setModelFunction=function(){var t=this;return function(){if(!this.getModel("$sapmP13nPanel")){this.setModel(t.getInternalModel(),"$sapmP13nPanel");}};};B.prototype.setTable=function(t){this.setAssociation("table",t);this.setTableType(U.getTableType(this.getTable()));return this;};B.prototype.getTable=function(){var t=this.getAssociation("table");if(typeof t==="string"){t=sap.ui.getCore().byId(t);}return t;};B.prototype.getColumnMap=function(){return this.getColumnHelper().getColumnMap();};B.prototype.createControlDataStructure=function(i){i=i||[];var j={};j[this.getType()]={};j[this.getType()][this.getItemType()]=i;return j;};B.prototype.createColumnKeysStructure=function(c){c=c||[];var j={};j[this.getType()]={};j[this.getType()][this.getItemType()]=c.map(function(s){return{columnKey:s};});return j;};B.prototype.checkConsistency=function(){var c=this.getColumnMap();this.getIgnoreColumnKeys().some(function(d){if(c[d]&&c[d].getVisible()){throw"The provided 'ignoreColumnKeys' for '"+this.getType()+"' are inconsistent. No columns specified as ignored is allowed to be visible.";}},this);var b=this.getColumnKeys();Object.keys(c).forEach(function(d){if(b.indexOf(d)<0){throw"The provided 'columnKeys' and columns are inconsistent. For the column '"+d+"' no entry in 'columnKeys' exists.";}});var s=this.getStableColumnKeys();s.forEach(function(S,i){if(c[S].getIndex()!=i){throw"The provided 'stableColumnKeys' are inconsistens. Please provide 'stableColumnKeys' by ascending indices of the columns, starting from index 0.";}});};B.prototype.initializeInternalModel=function(m){["controlDataInitial","controlDataBase","controlData","alreadyKnownRuntimeData","alreadyKnownPersistentData"].forEach(function(p){if(!m.getProperty("/"+p)){m.setProperty("/"+p,{});}m.setProperty("/"+p+"/"+this.getType(),this.createControlDataStructure()[this.getType()]);},this);["ignoreData"].forEach(function(p){if(!m.getProperty("/"+p)){m.setProperty("/"+p,{});}m.setProperty("/"+p+"/"+this.getType(),this.createColumnKeysStructure()[this.getType()]);},this);["persistentDataChangeType","persistentDeltaDataChangeType"].forEach(function(p){if(!m.getProperty("/"+p)){m.setProperty("/"+p,{});}m.setProperty("/"+p+"/"+this.getType(),C.personalization.ChangeType.Unchanged);m.setProperty("/"+p+"/"+this.getType(),C.personalization.ChangeType.Unchanged);},this);["controlDataReduce","transientData","beforeOpenData","variantDataInitial"].forEach(function(p){if(!m.getProperty("/"+p)){m.setProperty("/"+p,undefined);}});this.setModel(m,"$sapuicomppersonalizationBaseController");};B.prototype._extendPropertyWithControlDataStructure=function(p){var m=this.getInternalModel();if(m.getProperty("/"+p)){return;}m.setProperty("/"+p,{});m.setProperty("/"+p+"/"+this.getType(),this.createControlDataStructure()[this.getType()]);};B.prototype.getInternalModel=function(){return this.getModel("$sapuicomppersonalizationBaseController");};B.prototype.calculateIgnoreData=function(){var i=this.getIgnoreColumnKeys().concat(this.getAdditionalIgnoreColumnKeys());i=i.filter(function(c,I){return i.indexOf(c)===I;});var j=this.createColumnKeysStructure(i);this.setIgnoreData2Model(j);};B.prototype.calculateControlData=function(){var j=U.copy(this.getControlDataBase());this._deselectIgnoreDataFromJson(j);this.setControlData2Model(j);};B.prototype.calculateControlDataReduce=function(){var j=U.copy(this.getControlDataBase());this._removeIgnoreDataFromJson(j);this.setControlDataReduce2Model(j);};B.prototype.calculateTransientData=function(j){j=U.copy(j);this._removeIgnoreDataFromJson(j);this.setTransientData2Model(j);};B.prototype.calculatePersistentChangeTypesFromJson=function(j,r){var c=this.getPersistentDeltaDataChangeType();var o=this.getUnionData(this.getControlDataInitial(),j);c[this.getType()]=this.getChangeType(o,this.getAlreadyKnownPersistentData());this.setPersistentDeltaDataChangeType(c);c=this.getPersistentDataChangeType();if(r===C.personalization.ResetType.ResetFull){c[this.getType()]=this.getChangeType(j,this.getControlDataInitial());}else if(r===C.personalization.ResetType.ResetPartial){c[this.getType()]=this.getChangeType(j,this.getVariantDataInitial());}this.setPersistentDataChangeType(c);};B.prototype._removeIgnoreDataFromJson=function(j){if(!this.getIgnoreData()[this.getType()]){return;}this.getIgnoreData()[this.getType()][this.getItemType()].forEach(function(i){var I=U.getIndexByKey("columnKey",i.columnKey,j[this.getType()][this.getItemType()]);if(I>-1){j[this.getType()][this.getItemType()].splice(I,1);}},this);};B.prototype._deselectIgnoreDataFromJson=function(j){if(!this.getIgnoreData()[this.getType()]){return;}this.getIgnoreData()[this.getType()][this.getItemType()].forEach(function(i){var I=U.getIndexByKey("columnKey",i.columnKey,j[this.getType()][this.getItemType()]);if(I>-1){this.handleIgnore(j,I);}},this);};B.prototype.updateControlDataBaseFromJson=function(j){var i=this.getIgnoreData();var b=U.copy(this.getControlDataBase());var o=U.copy(this.getControlDataBase());var J=U.copy(j);b[this.getType()][this.getItemType()]=this.getControlDataBase()[this.getType()][this.getItemType()].filter(function(I){return U.getIndexByKey("columnKey",I.columnKey,i[this.getType()][this.getItemType()])>-1;},this);J[this.getType()][this.getItemType()]=j[this.getType()][this.getItemType()].filter(function(I){return U.getIndexByKey("columnKey",I.columnKey,i[this.getType()][this.getItemType()])<0;},this);o[this.getType()][this.getItemType()]=J[this.getType()][this.getItemType()];if(this.getType()==="columns"){if(o[this.getType()][this.getItemType()].length!==J[this.getType()][this.getItemType()].length){throw"the updated columns are inconsistent with 'controlDataBase'";}o[this.getType()][this.getItemType()].some(function(I){if(U.getIndexByKey("columnKey",I.columnKey,J[this.getType()][this.getItemType()])<0){throw"the columnKey '"+I.columnKey+"' is not contained in 'controlDataBase'";}},this);}var c=U.copy(this.getControlDataBase());c[this.getType()][this.getItemType()]=o[this.getType()][this.getItemType()].concat(b[this.getType()][this.getItemType()]);Object.keys(c[this.getType()]).forEach(function(A){if(!Array.isArray(c[this.getType()][A])){c[this.getType()][A]=j[this.getType()][A];}},this);this.setControlDataBase2Model(c);this.fireAfterPotentialModelChange({json:c});};B.prototype.extendControlDataInitial=function(j){this._extendData("controlDataInitial",j);};B.prototype.extendControlDataBase=function(j){this._extendData("controlDataBase",j);};B.prototype.extendVariantDataInitial=function(j){this._extendData("variantDataInitial",j);};B.prototype.extendAlreadyKnownRuntimeData=function(j){this._extendData("alreadyKnownRuntimeData",j);};B.prototype.extendAlreadyKnownPersistentData=function(j){this._extendData("alreadyKnownPersistentData",j);};B.prototype._extendData=function(p,j){if(!j||!j[this.getType()]||!this._getInternalModelData(p)){return;}var J=U.copy(j);var m=this.getInternalModel();Object.keys(J[this.getType()]).forEach(function(A){if(Array.isArray(J[this.getType()][A])){J[this.getType()][A].forEach(function(i){var I=this._getInternalModelData(p)[this.getType()][A];if(U.getIndexByKey("columnKey",i.columnKey,I)>-1){throw"columnKey '"+i.columnKey+"' does already exist in internal model";}m.setProperty("/"+p+"/"+this.getType()+"/"+A+"/"+I.length+"/",i);},this);return;}m.setProperty("/"+p+"/"+this.getType()+"/"+A+"/",J[this.getType()][A]);},this);};B.prototype.setControlDataInitial2Model=function(j){this._setModelData("controlDataInitial",j);};B.prototype.setControlDataBase2Model=function(j){this._setModelData("controlDataBase",j);};B.prototype.setControlData2Model=function(j){this._setModelData("controlData",j);};B.prototype.setAlreadyKnownRuntimeData2Model=function(j){this._setModelData("alreadyKnownRuntimeData",j);};B.prototype.setAlreadyKnownPersistentData2Model=function(j){this._setModelData("alreadyKnownPersistentData",j);};B.prototype.setVariantDataInitial2Model=function(j){this._extendPropertyWithControlDataStructure("variantDataInitial");this._setModelData("variantDataInitial",j);};B.prototype.setIgnoreData2Model=function(j){this._setModelData("ignoreData",j);};B.prototype.setPersistentDataChangeType=function(j){this._setModelData("persistentDataChangeType",j);};B.prototype.setPersistentDeltaDataChangeType=function(j){this._setModelData("persistentDeltaDataChangeType",j);};B.prototype.setControlDataReduce2Model=function(j){this._extendPropertyWithControlDataStructure("controlDataReduce");this._setModelData("controlDataReduce",j);};B.prototype.setTransientData2Model=function(j){this._extendPropertyWithControlDataStructure("transientData");this._setModelData("transientData",j);};B.prototype.setBeforeOpenData2Model=function(j){this._extendPropertyWithControlDataStructure("beforeOpenData");this._setModelData("beforeOpenData",j);};B.prototype._setModelData=function(p,j){this.getInternalModel().setProperty("/"+p+"/"+this.getType(),(j?U.copy(j)[this.getType()]:undefined));};B.prototype.getControlDataInitial=function(){return this._getInternalModelData("controlDataInitial");};B.prototype.getControlDataBase=function(){return this._getInternalModelData("controlDataBase");};B.prototype.getControlData=function(){return this._getInternalModelData("controlData");};B.prototype.getAlreadyKnownRuntimeData=function(){return this._getInternalModelData("alreadyKnownRuntimeData");};B.prototype.getAlreadyKnownPersistentData=function(){return this._getInternalModelData("alreadyKnownPersistentData");};B.prototype.getVariantDataInitial=function(){return this._getInternalModelData("variantDataInitial");};B.prototype.getIgnoreData=function(){return this._getInternalModelData("ignoreData");};B.prototype.getPersistentDataChangeType=function(){return this._getInternalModelData("persistentDataChangeType");};B.prototype.getPersistentDeltaDataChangeType=function(){return this._getInternalModelData("persistentDeltaDataChangeType");};B.prototype.getControlDataReduce=function(){return this._getInternalModelData("controlDataReduce");};B.prototype.getTransientData=function(){return this._getInternalModelData("transientData");};B.prototype.getBeforeOpenData=function(){return this._getInternalModelData("beforeOpenData");};B.prototype.isEqualAdditionalIgnoreColumnKeys=function(c){var i=this.getAdditionalIgnoreColumnKeys();if(i.length!==c.length){return false;}return!i.some(function(s){return c.indexOf(s)<0;});};B.prototype._getInternalModelData=function(p){return this.getInternalModel().getProperty("/"+p);};B.prototype.determineMissingColumnKeys=function(j){if(!j||!j[this.getType()]||!j[this.getType()][this.getItemType()]){return this.createColumnKeysStructure();}var c=this.getColumnMap();var i=this.getIgnoreData();var m=j[this.getType()][this.getItemType()].filter(function(I){return!c[I.columnKey];}).filter(function(I){return U.getIndexByKey("columnKey",I.columnKey,i[this.getType()][this.getItemType()])<0;},this).map(function(I){return I.columnKey;});return this.createColumnKeysStructure(m);};B.prototype.extractIgnoreDataFromJson=function(j){if(!j||!j[this.getType()]||!j[this.getType()][this.getItemType()]){return null;}var i=this.getIgnoreData();var J=j[this.getType()][this.getItemType()].filter(function(m){return U.getIndexByKey("columnKey",m.columnKey,i[this.getType()][this.getItemType()])>-1;},this);return J.length?this.createControlDataStructure(J):null;};B.prototype.getTable2Json=function(j){var J=this.createControlDataStructure();var c=this.getColumnMap();var b=this.getColumnKeys();j[this.getType()][this.getItemType()].forEach(function(o){var d=c[o.columnKey];if(!d){L.warning("Column with columnKey '"+o.columnKey+"' does not exist.");return;}var m=this.getColumn2Json(d,o.columnKey,b.indexOf(o.columnKey));if(m){J[this.getType()][this.getItemType()].push(m);}},this);this.getAdditionalData2Json(J,this.getTable());return J;};B.prototype.getTable2JsonTransient=function(j){var J=this.createControlDataStructure();var c=this.getColumnMap();var t,T;var v;j[this.getType()][this.getItemType()].forEach(function(o){var i=false;if(this.getType()==="columns"){this.getStableColumnKeys().forEach(function(S){if(S==o.columnKey){i=true;}});}var b=c[o.columnKey];if(!b||i){return;}var s=U.getColumnBaseType(b);if(s===C.personalization.ColumnType.TableColumn){if(!b.getLabel()){throw"The column '"+o.columnKey+"' should have a 'label' aggregation otherwise the column can not be identified in the personalization dialog.";}t=b.getLabel().getText();v=b.getTooltip();T=(v&&typeof v==="object"&&v.isA("sap.ui.core.TooltipBase"))?v.getTooltip_Text():b.getTooltip_Text();}if(s===C.personalization.ColumnType.ResponsiveColumn){if(!b.getHeader()){throw"The column '"+o.columnKey+"' should have a 'header' aggregation otherwise the column can not be identified in the personalization dialog.";}t=b.getHeader().getText();v=b.getHeader().getTooltip();T=(v&&typeof v==="object"&&v.isA("sap.ui.core.TooltipBase"))?v.getTooltip_Text():b.getHeader().getTooltip_Text();}if(s===C.personalization.ColumnType.ColumnWrapper){if(!b.getLabel()){throw"The column '"+o.columnKey+"' should have a 'label' aggregation otherwise the column can not be identified in the personalization dialog.";}t=b.getLabel();v=b.getTooltip();T=(v&&typeof v==="object"&&v.isA("sap.ui.core.TooltipBase"))?v.getTooltip_Text():b.getTooltip_Text();}var m=this.getColumn2JsonTransient(b,o.columnKey,t,T);if(m){J[this.getType()][this.getItemType()].push(m);}},this);U.sortItemsByText(J[this.getType()][this.getItemType()],"text");return J;};B.prototype.getColumn2Json=function(c,s,i){};B.prototype.getAdditionalData2Json=function(j,t){};B.prototype.getColumn2JsonTransient=function(c,s){};B.prototype.handleIgnore=function(j,i){};B.prototype.fixConflictWithIgnore=function(j,J){};B.prototype.syncJson2Table=function(j){};B.prototype.getPanel=function(){};B.prototype.getChangeType=function(c,o){};B.prototype.getChangeData=function(c,o){};B.prototype.getUnionData=function(c,o){};return B;});

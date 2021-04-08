/*
 * ! SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['./BaseController','sap/m/library','sap/ui/comp/library','./Util','sap/m/P13nConditionPanel'],function(B,M,C,U,P){"use strict";var a=M.P13nConditionOperation;var G=B.extend("sap.ui.comp.personalization.GroupController",{constructor:function(i,s){B.apply(this,arguments);this.setType(M.P13nPanelType.group);this.setItemType(M.P13nPanelType.group+"Items");},metadata:{events:{afterGroupModelDataChange:{}}}});G.prototype.setTable=function(t){B.prototype.setTable.apply(this,arguments);if(this.getTableType()===C.personalization.TableType.AnalyticalTable||this.getTableType()===C.personalization.TableType.Table||this.getTableType()===C.personalization.TableType.TreeTable){t.detachGroup(this._onGroup,this);t.attachGroup(this._onGroup,this);}};G.prototype.getColumn2Json=function(c,s,i){if(this.getTableType()!==C.personalization.TableType.AnalyticalTable){return null;}if(!c.getGrouped()){return null;}return{columnKey:s,isGrouped:c.getGrouped(),operation:c.getSortOrder&&c.getSortOrder()==="Ascending"?a.GroupAscending:a.GroupDescending,showIfGrouped:c.getShowIfGrouped?c.getShowIfGrouped():false};};G.prototype.getAdditionalData2Json=function(j,t){if(this.getTableType()!==C.personalization.TableType.AnalyticalTable){return;}if(!j.group.groupItems.length){return;}t.getGroupedColumns().forEach(function(c,i){if(typeof c==="string"){c=sap.ui.getCore().byId(c);}var I=U.getIndexByKey("columnKey",U.getColumnKey(c),j.group.groupItems);if(I>-1&&i===I){return;}var o=j.group.groupItems.splice(I,1);j.group.groupItems.splice(i,0,o);});};G.prototype.getColumn2JsonTransient=function(c,s,t,T){if(!U.isGroupable(c)){return null;}return{columnKey:s,text:t,tooltip:T};};G.prototype.handleIgnore=function(j,i){j.sort.sortItems.splice(i,1);};G.prototype.syncJson2Table=function(j){var c=this.getColumnMap();var t=this.getTable();var o;this.fireBeforePotentialTableChange();if(this.getTableType()===C.personalization.TableType.TreeTable){return;}else if(this.getTableType()===C.personalization.TableType.AnalyticalTable){for(var s in c){o=c[s];if(!o){return;}if(o.getGrouped()){o.setGrouped(false);o.setShowIfGrouped(false);}}j.group.groupItems.forEach(function(m){o=c[m.columnKey];if(!o){return;}o.setGrouped(true);o.setShowIfGrouped(m.showIfGrouped);});}else if(this.getTableType()===C.personalization.TableType.Table||this.getTableType()===C.personalization.TableType.AnalyticalTable||this.getTableType()===C.personalization.TableType.TreeTable){if(j.group.groupItems.length>0){j.group.groupItems.some(function(m){o=c[m.columnKey];if(o){t.setGroupBy(o);return true;}});}else{t.setGroupBy(null);}}this.fireAfterPotentialTableChange();};G.prototype.getDataSuiteFormat2Json=function(d){var j=this.createControlDataStructure();if(!d.GroupBy||!d.GroupBy.length){return j;}j.group.groupItems=d.GroupBy.map(function(g){return{columnKey:g,operation:a.GroupAscending,showIfGrouped:false};});return j;};G.prototype.getDataSuiteFormatSnapshot=function(d){var c=this.getUnionData(this.getControlDataInitial(),this.getControlData());if(!c.group||!c.group.groupItems||!c.group.groupItems.length){return;}d.GroupBy=c.group.groupItems.map(function(m){return m.columnKey;});};G.prototype._onGroup=function(e){this.fireBeforePotentialTableChange();this._updateInternalModel(e.getParameter("groupedColumns"));this.fireAfterPotentialTableChange();this.fireAfterGroupModelDataChange();};G.prototype._updateInternalModel=function(g){this.getInternalModel().setProperty("/controlData/group/groupItems",[]);var c=this.getControlData();g.forEach(function(o){if(typeof o==="string"){o=sap.ui.getCore().byId(o);}var s=U.getColumnKey(o);var i=U.getIndexByKey("columnKey",s,c.group.groupItems);i=(i>-1)?i:c.group.groupItems.length;this.getInternalModel().setProperty("/controlData/group/groupItems/"+i+"/",{columnKey:s,showIfGrouped:o.getShowIfGrouped?o.getShowIfGrouped():false});},this);this.updateControlDataBaseFromJson(c);};G.prototype.getPanel=function(){if(!U.hasGroupableColumns(this.getColumnMap())){return null;}return new Promise(function(r){sap.ui.require(['sap/m/P13nGroupPanel','sap/m/P13nItem','sap/m/P13nGroupItem'],function(b,c,d){return r(new b({maxGroups:this.getTableType()===C.personalization.TableType.AnalyticalTable?"-1":"1",containerQuery:true,items:{path:"$sapmP13nPanel>/transientData/group/groupItems",template:new c({columnKey:"{$sapmP13nPanel>columnKey}",text:"{$sapmP13nPanel>text}",tooltip:"{$sapmP13nPanel>tooltip}"})},groupItems:{path:"$sapmP13nPanel>/controlDataReduce/group/groupItems",template:new d({columnKey:"{$sapmP13nPanel>columnKey}",operation:"{$sapmP13nPanel>operation}",showIfGrouped:"{$sapmP13nPanel>showIfGrouped}"})},beforeNavigationTo:this.setModelFunction(),updateGroupItem:function(){this.fireAfterPotentialModelChange({json:this.getControlDataReduce()});}.bind(this),addGroupItem:function(e){if(!e.getParameter("groupItemData")){return;}var i=e.getParameter("index");var g=e.getParameter("groupItemData");var o={columnKey:g.getColumnKey(),operation:g.getOperation(),showIfGrouped:g.getShowIfGrouped()};var f=this.getControlDataReduce();if(i>-1){f.group.groupItems.splice(i,0,o);}else{f.group.groupItems.push(o);}this.setControlDataReduce2Model(f);this.fireAfterPotentialModelChange({json:f});}.bind(this),removeGroupItem:function(e){var i=e.getParameter("index");if(i<0){return;}var o=this.getControlDataReduce();o.group.groupItems.splice(i,1);this.setControlDataReduce2Model(o);this.fireAfterPotentialModelChange({json:o});}.bind(this)}));}.bind(this));}.bind(this));};G.prototype.getChangeType=function(p,o){if(!o||!o.group||!o.group.groupItems){return C.personalization.ChangeType.Unchanged;}var i=JSON.stringify(p.group.groupItems)!==JSON.stringify(o.group.groupItems);return i?C.personalization.ChangeType.ModelChanged:C.personalization.ChangeType.Unchanged;};G.prototype.getChangeData=function(p,o){if(!p||!p.group||!p.group.groupItems){return this.createControlDataStructure();}if(!o||!o.group||!o.group.groupItems){return{group:U.copy(p.group)};}if(JSON.stringify(p.group.groupItems)!==JSON.stringify(o.group.groupItems)){return{group:U.copy(p.group)};}return null;};G.prototype.getUnionData=function(j,J){if(!J||!J.group||!J.group.groupItems){return{group:U.copy(j.group)};}return{group:U.copy(J.group)};};G.prototype.isGroupSelected=function(c,s){var i=-1;c.groupItems.some(function(m,I){if(m.columnKey===s){i=I;return true;}});return i>-1;};G.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this.getTable()&&(this.getTableType()===C.personalization.TableType.AnalyticalTable||this.getTableType()===C.personalization.TableType.Table||this.getTableType()===C.personalization.TableType.TreeTable)){this.getTable().detachGroup(this._onGroup,this);}};return G;});

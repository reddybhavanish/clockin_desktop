/*
 * ! SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/Core','sap/ui/core/Control','./library','sap/m/library','sap/ui/events/KeyCodes','./ActionToolbar','sap/m/Title','sap/ui/core/format/NumberFormat','sap/ui/model/Sorter','sap/ui/core/dnd/DragDropInfo',"./table/TableSettings","./table/GridTableType","./table/ResponsiveTableType","sap/m/ColumnHeaderPopover","sap/ui/core/Item","sap/m/ColumnPopoverSortItem",'sap/ui/dom/containsOrEquals','sap/base/strings/capitalize'],function(C,a,l,M,K,A,T,N,S,D,b,G,R,c,I,d,e,f){"use strict";var g=l.SelectionMode;var h=l.TableType;var j=l.RowAction;var F="sap.ui.mdc.IFilter";function s(i,v){sap.ui.require(["sap/m/MessageToast"],function(m){var r=C.getLibraryResourceBundle("sap.ui.mdc");m.show(r.getText(i,v));});}var k=a.extend("sap.ui.mdc.Table",{library:"sap.ui.mdc",metadata:{designtime:"sap/ui/mdc/designtime/table/Table.designtime",defaultAggregation:"columns",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null,invalidate:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null,invalidate:true},rowAction:{type:"sap.ui.mdc.RowAction[]"},p13nMode:{type:"sap.ui.mdc.TableP13nMode[]"},delegate:{type:"object",defaultValue:{name:"sap/ui/mdc/TableDelegate",payload:{}}},rowsBindingInfo:{type:"object",defaultValue:null},autoBindOnInit:{type:"boolean",group:"Misc",defaultValue:true},header:{type:"string",group:"Misc",defaultValue:null},headerVisible:{type:"boolean",group:"Misc",defaultValue:true},initiallyVisibleFields:{type:"string[]"},selectionMode:{type:"sap.ui.mdc.SelectionMode",defaultValue:g.None},showRowCount:{type:"boolean",group:"Misc",defaultValue:true},threshold:{type:"int",group:"Appearance",defaultValue:-1},noDataText:{type:"string"},sortConditions:{type:"object"},enableExport:{type:"boolean",defaultValue:false}},aggregations:{_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},type:{type:"sap.ui.mdc.table.TableTypeBase",altTypes:["sap.ui.mdc.TableType"],multiple:false},columns:{type:"sap.ui.mdc.table.Column",multiple:true},creationRow:{type:"sap.ui.mdc.table.CreationRow",multiple:false},actions:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_createToolbar",aggregation:"actions"}},variant:{type:"sap.ui.fl.variants.VariantManagement",multiple:false},quickFilter:{type:"sap.ui.core.Control",multiple:false},rowSettings:{type:"sap.ui.mdc.table.RowSettings",multiple:false}},associations:{filter:{type:F,multiple:false}},events:{rowPress:{parameters:{bindingContext:{type:"sap.ui.model.Context"}}},selectionChange:{parameters:{bindingContext:{type:"sap.ui.model.Context"},selected:{type:"boolean"},selectAll:{type:"boolean"}}},beforeExport:{parameters:{exportSettings:{type:"object"},userExportSettings:{type:"object"}}}}},constructor:function(){this._oTableReady=new Promise(this._resolveTable.bind(this));this._oAdaptationController=null;a.apply(this,arguments);this.bCreated=true;this._doOneTimeOperations();this._initializeContent();},renderer:{apiVersion:2,render:function(r,o){r.openStart("div",o);r.class("sapUiMdcTable");r.style("height",o.getHeight());r.style("width",o.getWidth());r.openEnd();r.renderControl(o.getAggregation("_content"));r.close("div");}}});var t=["variant","quickFilter"];t.forEach(function(i){var m=f(i),p="_o"+m,n="get"+m,o="set"+m,q="destroy"+m;k.prototype[n]=function(){return this[p];};k.prototype[q]=function(){var r=this[p];this[o]();if(r){r.destroy();}return this;};k.prototype[o]=function(r){this.validateAggregation(i,r,false);var u=this._createToolbar(),v=r!==this[p];if(!r||v){u.removeBetween((this[n]()));this[p]=r;}if(v&&r){this._setToolbarBetween(u);}return this;};});k.prototype.init=function(){this.mSkipPropagation={rowSettings:true};};k.prototype._setToolbarBetween=function(o){[this._oVariant,this._oQuickFilter].forEach(function(i){if(i){o.addBetween(i);}});};k.prototype.done=function(){return this._oTableReady;};k.prototype._resolveTable=function(r,i){this._fResolve=r;this._fReject=i;};k.prototype._getStringType=function(o){var i,m=i=o||this.getType();if(!m){i=h.Table;}else if(typeof m==="object"){i=m.isA("sap.ui.mdc.table.ResponsiveTableType")?h.ResponsiveTable:h.Table;}return i;};k.prototype._updateTypeSettings=function(){var o=this.getType();if(o&&typeof o==="object"){o.updateTableSettings();}else{o=o==="ResponsiveTable"?R:G;o.updateDefault(this._oTable);}};k.prototype.scrollToIndex=function(i){if(!this._oTable||(typeof i!=="number")){return;}if(this._getStringType()===h.ResponsiveTable){this._oTable.scrollToIndex(i);}else{if(i===-1){i=this.getRowBinding()?this.getRowBinding().getLength():0;}this._oTable.setFirstVisibleRow(i);}};k.prototype.setType=function(v){var i=this._getStringType(v);var o=this._getStringType();this.setAggregation("type",v,true);if(i===o&&this._oTable){this._updateTypeSettings();return this;}if(this.bCreated){if(this._oTable){if(o==="ResponsiveTable"){this._oTable.setHeaderToolbar();}else{this._oTable.removeExtension(this._oToolbar);}this._oTable.destroy("KeepDom");this._oTable=null;this._bTableExists=false;}else{this._onAfterTableCreated();}if(this._oTemplate){this._oTemplate.destroy();this._oTemplate=null;}this._oTableReady=new Promise(this._resolveTable.bind(this));this._initializeContent();}return this;};k.prototype.setRowSettings=function(r){var i=this._getStringType();this.setAggregation("rowSettings",r,true);if(this._oTable){if(i==="ResponsiveTable"){R.updateRowSettings(this._oTemplate,r);this.checkAndRebindTable();}else{G.updateRowSettings(this._oTable,r);}}return this;};k.prototype.focus=function(o){var i=this.getDomRef();if(this._oTable&&i&&!e(i,document.activeElement)){this._oTable.focus();}};k.prototype.setBusy=function(B){this.setProperty('busy',B,true);if(this._oTable){this._oTable.setBusy(B);}return this;};k.prototype.setSelectionMode=function(m){var o=this.getSelectionMode();this.setProperty("selectionMode",m,true);if(this._oTable&&o!=this.getSelectionMode()){this._updateSelectionBehavior();}return this;};k.prototype.setRowAction=function(i){var o=this.getRowAction();this.setProperty("rowAction",i,true);if(((i&&i.length)!=(o&&o.length))||o[0]!=i[0]){this._updateRowAction();}return this;};k.prototype.setCreationRow=function(o){this.setAggregation("creationRow",o,true);if(o){o.update();}return this;};k.prototype.setP13nMode=function(m){var o=this.getP13nMode();this.setProperty("p13nMode",m,true);this._updatep13nSettings(o,m);return this;};k.prototype.setThreshold=function(i){this.setProperty("threshold",i,true);if(!this._oTable){return this;}i=this.getThreshold()>-1?this.getThreshold():undefined;if(this._bMobileTable){this._oTable.setGrowingThreshold(i);}else{this._oTable.setThreshold(i);}return this;};k.prototype.setNoDataText=function(n){this.setProperty("noDataText",n,true);this._updateInnerTableNoDataText();return this;};k.prototype._updateInnerTableNoDataText=function(){if(!this._oTable){return;}var n=this._getNoDataText();if(this._bMobileTable){this._oTable.setNoDataText(n);}else{this._oTable.setNoData(n);}};k.prototype._getNoDataText=function(){var n=this.getNoDataText();if(n){return n;}var r=C.getLibraryResourceBundle("sap.ui.mdc");if(!this.isTableBound()){if(this.getFilter()){return r.getText("table.NO_DATA_WITH_FILTERBAR");}return r.getText("table.NO_DATA");}return r.getText("table.NO_RESULTS");};k.prototype._updateRowAction=function(){if(!this._oTable){return;}var n=(this.getRowAction()||[]).indexOf(j.Navigation)>-1;var o=this._bMobileTable?R:G;o.updateRowAction(this,n,this._bMobileTable?undefined:this._onRowActionPress);};k.prototype._initializeContent=function(){var i=this._getStringType();var o=i==="ResponsiveTable"?R:G;Promise.all([this.oTableDelegateLoaded,o.loadTableModules()]).then(function(){if(this.bIsDestroyed){return;}if(!this._bTableExists&&i===this._getStringType()){this._bMobileTable=i==="ResponsiveTable";this._createContent();this._bTableExists=true;}}.bind(this));};k.prototype._doOneTimeOperations=function(){if(!this.oTableDelegateLoaded){this.oTableDelegateLoaded=new Promise(function(r,i){var m=this.getDelegate().name;sap.ui.require([m],function(n){this.oTableDelegate=n;r();}.bind(this),function(){i("Faled to load delegate");});}.bind(this));}if(!this.bColumnsOrdered){this.bColumnsOrdered=true;this._orderColumns();}};k.prototype._onAfterTableCreated=function(r){if(r&&this._fResolve){this._fResolve(this);}else if(this._fReject){this._fReject(this);}delete this._fResolve;delete this._fReject;};k.prototype._createContent=function(){this._createToolbar();this._createTable();this._updateRowAction();var o=this.getCreationRow();if(o){o.update();}var m=this.getColumns();m.forEach(this._insertInnerColumn,this);this.setAggregation("_content",this._oTable);if(this.getAutoBindOnInit()){this.checkAndRebindTable();}this._onAfterTableCreated(true);};k.prototype.setHeader=function(i){this.setProperty("header",i,true);this._updateHeaderText();this._updateExportState(true);return this;};k.prototype.setHeaderVisible=function(v){this.setProperty("headerVisible",v,true);if(this._oTitle){this._oTitle.setWidth(this.getHeaderVisible()?undefined:"0px");}return this;};k.prototype.setEnableExport=function(E){if(E!==this.getEnableExport()){this.setProperty("enableExport",E,true);if(E&&!this._oExportButton&&this._oToolbar){this._oToolbar.addEnd(this._getExportButton());}else if(this._oExportButton){this._oExportButton.setVisible(E);}}return this;};k.prototype._createToolbar=function(){if(!this._oToolbar){this._oTitle=new T(this.getId()+"-title",{text:this.getHeader(),width:this.getHeaderVisible()?undefined:"0px"});this._oToolbar=new A(this.getId()+"-toolbar",{design:"Transparent",begin:[this._oTitle],end:[this._getP13nButtons(),this._getExportButton()]});}return this._oToolbar;};k.prototype._getP13nButtons=function(){var p=this.getP13nMode()||[],B=[];if(p.length>0){if(p.indexOf("Sort")>-1){B.push(b.createSortButton(this.getId(),[this._showSort,this]));}if(p.indexOf("Column")>-1){B.push(b.createColumnsButton(this.getId(),[this._showSettings,this]));}}return B;};k.prototype._getExportButton=function(){if(!this.getEnableExport()){return null;}var m={fileName:this.getHeader()};if(!this._cachedExportSettings){this._cachedExportSettings=m;}if(!this._oExportButton){this._oExportButton=b.createExportButton(this.getId(),{"default":[function(){this._onExport(m);},this],"exportAs":[this._onExportAs,this]});}this._updateExportState();return this._oExportButton;};k.prototype._updateExportState=function(u){var r=this._getRowBinding();if(this._oExportButton){this._oExportButton.setEnabled(!!(r&&r.getLength()>0));if(u&&this._cachedExportSettings){this._cachedExportSettings.fileName=this.getHeader();}}};k.prototype._createExportColumnConfiguration=function(m){var i=m&&m.splitCells;var n=this.getColumns();return this.oTableDelegate.fetchProperties(this).then(function(p){var o=[],P,q,r,u,v,L,w,x,y;n.forEach(function(z){P=null;q=null;u=null;L=null;w=null;x=null;y=null;r=z.getDataProperties();u=p.find(function(B){return r[0]===B.name;});if(u){P=u.path||u.name;if(r.length>1){v=p.find(function(B){return r[1]===B.name;});if(v){q=v.path||v.name;}}L=z.getHeader();w=this._getColumnWidthNumber(z.getWidth().toLowerCase());x=u.type;o.push({columnId:z.getId(),property:q?[P,q]:P,type:x,label:L,width:w,textAlign:z.getHAlign(),template:!i&&q?"{0} {1}":null,precision:u.precision,scale:u.scale});if(q&&i){y=v.label;o.push({columnId:z.getId()+"-additionalProperty",property:q,type:v.type,label:y||L+" (2)"});}}}.bind(this));return[o,p];}.bind(this));};k.prototype._getColumnWidthNumber=function(w){if(w.indexOf("em")>0){return Math.round(parseFloat(w));}if(w.indexOf("px")>0){return Math.round(parseInt(w)/16);}return"";};k.prototype._getColumnHeader=function(p){if(!p){return null;}var o=this.getColumns().find(function(i){return i.getDataProperties()[0]===p;});return o?o.getHeader():null;};k.prototype._onExport=function(m){return this._createExportColumnConfiguration(m).then(function(r){var i=r[0];if(!i||!i.length){sap.ui.require(["sap/m/MessageBox"],function(p){p.error(C.getLibraryResourceBundle("sap.ui.mdc").getText("table.NO_COLS_EXPORT"),{styleClass:(this.$()&&this.$().closest(".sapUiSizeCompact").length)?"sapUiSizeCompact":""});}.bind(this));return;}var o=this._getRowBinding();var n=function(p){var P=r[1];var q=P.find(function(u){return u.name===p;});return q.label||q.name||null;};var E={workbook:{columns:i},dataSource:o,fileName:m?m.fileName:this.getHeader()};this._loadExportLibrary().then(function(){sap.ui.require(["sap/ui/export/ExportUtils","sap/ui/export/Spreadsheet"],function(p,q){var P=Promise.resolve();if(m.includeFilterSettings){P=p.parseFilterConfiguration(o,n).then(function(u){if(u){E.workbook.context={metaSheetName:u.name,metainfo:[u]};}});}P.then(function(){var u={splitCells:false,includeFilterSettings:false};if(m){u.splitCells=m.splitCells;u.includeFilterSettings=m.includeFilterSettings;}var v=new q(E);v.attachBeforeExport(function(w){this.fireBeforeExport({exportSettings:w.getParameter("exportSettings"),userExportSettings:u});},this);v.build().finally(function(){v.destroy();});}.bind(this));}.bind(this));}.bind(this));}.bind(this));};k.prototype._onExportAs=function(){var i=this;this._loadExportLibrary().then(function(){sap.ui.require(['sap/ui/export/ExportUtils'],function(E){E.getExportSettingsViaDialog(i._cachedExportSettings,i).then(function(u){i._cachedExportSettings=u;i._onExport(u);});});});};k.prototype._loadExportLibrary=function(){if(!this._oExportLibLoadPromise){this._oExportLibLoadPromise=C.loadLibrary("sap.ui.export",true);}return this._oExportLibLoadPromise;};k.prototype.onkeydown=function(E){if(E.isMarked()){return;}if((E.metaKey||E.ctrlKey)&&E.shiftKey&&E.which===K.E){if(this.getEnableExport()&&this._oExportButton&&this._oExportButton.getEnabled()){this._onExportAs();E.setMarked();E.preventDefault();}}};k.prototype._updatep13nSettings=function(o,m){if(this._oToolbar){this._oToolbar.destroyEnd();var B=this._getP13nButtons();B.forEach(function(n){this._oToolbar.addEnd(n);},this);}if(this._oTable){var i=this._oTable.getDragDropConfig()[0];if(i){i.setEnabled((m||[]).indexOf("Column")>-1);}}};k.prototype._createTable=function(){var i=this.getThreshold()>-1?this.getThreshold():undefined,r=this.getRowSettings()?this.getRowSettings().getAllSettings():{};if(this._bMobileTable){this._oTable=R.createTable(this.getId()+"-innerTable",{autoPopinMode:true,growing:true,sticky:["ColumnHeaders","HeaderToolbar"],itemPress:[this._onItemPress,this],selectionChange:[this._onSelectionChange,this],growingThreshold:i,noDataText:this._getNoDataText(),headerToolbar:this._oToolbar,ariaLabelledBy:[this._oTitle]});this._oTemplate=R.createTemplate(this.getId()+"-innerTableRow",r);this._createColumn=k.prototype._createMobileColumn;this._sAggregation="items";this._oTable.bindRows=this._oTable.bindItems;this._oTable.bActiveHeaders=true;this._oTable.attachEvent("columnPress",this._onResponsiveTableColumnPress,this);}else{this._oTable=G.createTable(this.getId()+"-innerTable",{enableBusyIndicator:true,enableColumnReordering:false,threshold:i,cellClick:[this._onCellClick,this],noData:this._getNoDataText(),extension:[this._oToolbar],ariaLabelledBy:[this._oTitle],plugins:[G.createMultiSelectionPlugin(this,[this._onRowSelectionChange,this])],columnSelect:[this._onGridTableColumnPress,this],rowSettingsTemplate:r});this._createColumn=k.prototype._createColumn;this._sAggregation="rows";}this._updateTypeSettings();this._updateSelectionBehavior();var o=new D({sourceAggregation:"columns",targetAggregation:"columns",dropPosition:"Between",enabled:(this.getP13nMode()||[]).indexOf("Column")>-1,drop:[this._onColumnRearrange,this]});o.bIgnoreMetadataCheck=true;this._oTable.addDragDropConfig(o);};k.prototype._updateSelectionBehavior=function(){var o=this._bMobileTable?R:G;o.updateSelection(this);};k.prototype._onColumnRearrange=function(E){var o=E.getParameter("draggedControl");var i=E.getParameter("droppedControl");if(o===i){return;}var m=E.getParameter("dropPosition");var n=this._oTable.indexOfColumn(o);var p=this._oTable.indexOfColumn(i);var q=p+(m=="Before"?0:1)+(n<p?-1:0);b.moveColumn(this,n,q);};k.prototype._onColumnPress=function(o){var p=this.getP13nMode()||[];if(p.indexOf("Sort")<0){return;}var m;if(o.getParent()){m=o.getParent().indexOfColumn(o);}var n=this.getColumns()[m].getDataProperties(),q;if(!n.length){return;}this.oTableDelegate.fetchProperties(this).then(function(P){q=P.filter(function(v){return n.indexOf(v.name)>=0&&v.sortable;});if(q.length===0){return;}var r,u=[];for(var i=0;i<q.length;i++){r=new I({text:q[i].name,key:q[i].name});u.push(r);}if(u.length>0){if(this._oPopover){this._oPopover.destroy();}this._oPopover=new c({items:[new d({items:u,sort:[this._onCustomSort,this]})]});this._oPopover.openBy(o);o.addDependent(this._oPopover);}}.bind(this));};k.prototype._onCustomSort=function(E){var i=E.getParameter("property");b.createSort(this,i,true);};k.prototype._insertInnerColumn=function(m,i){if(!this._oTable){return;}var o=this._createColumn(m);this._setColumnTemplate(m,o,i);if(i===undefined){this._oTable.addColumn(o);}else{this._oTable.insertColumn(o,i);}};k.prototype._orderColumns=function(){var i,m=[],n=this.getColumns();n.forEach(function(o){i=o.getInitialIndex();if(i>-1){m.push({index:i,column:this.removeColumn(o)});}},this);m.sort(function(o,p){return o-p;});m.forEach(function(o){this.insertColumn(o.column,o.index);},this);};k.prototype._setColumnTemplate=function(m,o,i){var n=m.getTemplate(true),p;if(!this._bMobileTable){p=m.getCreationTemplate(true);[n,p].forEach(function(q){if(!q){return;}if(q.setWrapping){q.setWrapping(false);}if(q.setRenderWhitespace){q.setRenderWhitespace(false);}});o.setTemplate(n);o.setCreationTemplate(p);}else if(i>=0){this._oTemplate.insertCell(n,i);}else{this._oTemplate.addCell(n);}};k.prototype._createColumn=function(m){return G.createColumn(m.getId()+"-innerColumn",{width:m.getWidth(),minWidth:Math.round(m.getMinWidth()*parseFloat(M.BaseFontSize)),hAlign:m.getHAlign(),label:m.getColumnHeaderControl(this._bMobileTable),showSortMenuEntry:false,showFilterMenuEntry:false,sortProperty:m.getDataProperties()[0],filterProperty:m.getDataProperties()[0]});};k.prototype._createMobileColumn=function(m){return R.createColumn(m.getId()+"-innerColumn",{width:m.getWidth(),autoPopinWidth:m.getMinWidth(),hAlign:m.getHAlign(),header:m.getColumnHeaderControl(this._bMobileTable),importance:m.getImportance(),popinDisplay:"Inline"});};k.prototype.moveColumn=function(m,i){var o;this.removeAggregation("columns",m,true);this.insertAggregation("columns",m,i,true);if(this._oTable){o=this._oTable.removeColumn(m.getId()+"-innerColumn");this._oTable.insertColumn(o,i);if(this._bMobileTable){this._updateColumnTemplate(m,i);}}};k.prototype.removeColumn=function(m){m=this.removeAggregation("columns",m,true);if(this._oTable){var o=this._oTable.removeColumn(m.getId()+"-innerColumn");o.destroy();if(this._bMobileTable){this._updateColumnTemplate(m,-1);}}return m;};k.prototype.addColumn=function(m){this.addAggregation("columns",m,true);this._insertInnerColumn(m);return this;};k.prototype.insertColumn=function(m,i){this.insertAggregation("columns",m,i,true);this._insertInnerColumn(m,i);return this;};k.prototype._updateColumnTemplate=function(m,i){var o,n;if(this._oTemplate){o=m.getTemplate(true);n=this._oTemplate.indexOfCell(o);k._removeItemCell(this._oTemplate,n,i);}if(n>-1){this._oTable.getItems().forEach(function(p){if(p.removeCell){k._removeItemCell(p,n,i);}});}};k._removeItemCell=function(i,r,m){var o=i.removeCell(r);if(o){if(m>-1){i.insertCell(o,m);}else{o.destroy();}}};k.prototype._onItemPress=function(E){this.fireRowPress({bindingContext:E.getParameter("listItem").getBindingContext()});};k.prototype._onSelectionChange=function(E){var i=E.getParameter("selectAll");this.fireSelectionChange({bindingContext:E.getParameter("listItem").getBindingContext(),selected:E.getParameter("selected"),selectAll:i});if(i){var r=this.getRowBinding();if(r&&this._oTable){var B=r.getLength();var m=this._oTable.getItems().length;var n=r.isLengthFinal();if(m!=B||!n){s("table.SELECTION_LIMIT_MESSAGE",[m]);}}}};k.prototype._onResponsiveTableColumnPress=function(E){this._onColumnPress(E.getParameter("column"));};k.prototype._onCellClick=function(E){this.fireRowPress({bindingContext:E.getParameter("rowBindingContext")});};k.prototype._onRowActionPress=function(E){var r=E.getParameter("row");this.fireRowPress({bindingContext:r.getBindingContext()});};k.prototype._onRowSelectionChange=function(E){if(!this._bSelectionChangedByAPI){this.fireSelectionChange({bindingContext:E.getParameter("rowContext"),selected:E.getSource().isIndexSelected(E.getParameter("rowIndex")),selectAll:E.getParameter("selectAll")});}};k.prototype._onGridTableColumnPress=function(E){E.preventDefault();this._onColumnPress(E.getParameter("column"));};k.prototype.getSelectedContexts=function(){if(this._oTable){if(this._bMobileTable){return this._oTable.getSelectedContexts();}var i=this._oTable.getPlugins()[0].getSelectedIndices();return i.map(function(m){return this._oTable.getContextByIndex(m);},this);}return[];};k.prototype.clearSelection=function(){if(this._oTable){if(this._bMobileTable){this._oTable.removeSelections(true);}else{this._bSelectionChangedByAPI=true;this._oTable.getPlugins()[0].clearSelection();this._bSelectionChangedByAPI=false;}}};k.prototype.setFilter=function(v){if(this._validateFilter(v)){this._deregisterFilter();this.setAssociation("filter",v,true);this._registerFilter();this._updateInnerTableNoDataText();}return this;};k.prototype._validateFilter=function(v){var o=typeof v==="object"?v:C.byId(v);if(!o||o.isA(F)){return true;}throw new Error("\""+v+"\" is not valid for association \"filter\" of mdc.Table. Please use an object that implements \""+F+"\" interface");};k.prototype._deregisterFilter=function(){var o=C.byId(this.getFilter());if(o){o.detachSearch(this.rebindTable,this);o.detachFiltersChanged(this._onFiltersChanged,this);}};k.prototype._registerFilter=function(){var o=C.byId(this.getFilter());if(o){o.attachSearch(this.rebindTable,this);o.attachFiltersChanged(this._onFiltersChanged,this);}};k.prototype._onFiltersChanged=function(){if(this.isTableBound()){this._oTable.setShowOverlay(true);}};k.prototype._getFilterInfo=function(){var o={};var i=C.byId(this.getFilter());if(i){o.filters=i.getFilters();o.searchText=i.getSearch();}return o;};k.prototype.isTableBound=function(){return this._oTable?this._oTable.isBound(this._bMobileTable?"items":"rows"):false;};k.prototype.bindRows=function(B){var o,i;if(!this.oTableDelegate||!this._oTable){return;}this.oTableDelegate.updateBindingInfo(this.getDelegate().payload,B);if(B.path){this._oTable.setShowOverlay(false);if(this._bMobileTable&&this._oTemplate){B.template=this._oTemplate;}else{delete B.template;}if(!B.parameters){B.parameters={};}B.sorter=this._getSorters();if(this.getFilter()){o=this._getFilterInfo();B.filters=o.filters;i=o.searchText;}if(this.getShowRowCount()){k._addBindingListener(B,"dataReceived",this._onDataReceived.bind(this));k._addBindingListener(B,"change",this._updateHeaderText.bind(this));}this._updateColumnsBeforeBinding(B);this.oTableDelegate.rebindTable(this,B,i);this._updateInnerTableNoDataText();}return this;};k.prototype._onDataReceived=function(E){if(E&&E.getParameter&&E.getParameter("__simulateAsyncAnalyticalBinding")){return;}this._updateHeaderText();this._updateExportState();};k.prototype._updateHeaderText=function(){var H,r;if(this._oTitle&&this.getHeader()){H=this.getHeader();if(this.getShowRowCount()){r=this._getRowCount();if(r){H+=" ("+r+")";}}this._oTitle.setText(H);}};k.prototype._updateColumnsBeforeBinding=function(B){var i=[].concat(B.sorter||[]);var m=this.getColumns();var n=this._bMobileTable;m.forEach(function(o){var p=C.byId(o.getId()+"-innerColumn");if(n){p.setSortIndicator("None");}else{p.setSorted(false);}});i.forEach(function(o){var p=(o.bDescending)?"Descending":"Ascending";m.some(function(q){var r=C.byId(q.getId()+"-innerColumn");if(q.getDataProperties().indexOf(o.sPath)>-1){if(n){r.setSortIndicator(p);}else{r.setSorted(true).setSortOrder(p);}return true;}});});};k.prototype._getRowCount=function(){var r=this.getRowBinding(),i,v="";if(r){i=r.getLength();if(!this._oNumberFormatInstance){this._oNumberFormatInstance=N.getFloatInstance();}if(r.isLengthFinal()){v=this._oNumberFormatInstance.format(i);}}return v;};k.prototype.getRowBinding=function(){return this._getRowBinding();};k.prototype._getRowBinding=function(){if(this._oTable){return this._oTable.getBinding(this._sAggregation);}};k._addBindingListener=function(B,E,H){if(!B.events){B.events={};}if(!B.events[E]){B.events[E]=H;}else{var o=B.events[E];B.events[E]=function(){H.apply(this,arguments);o.apply(this,arguments);};}};k.prototype.rebindTable=function(){this.bindRows(this.getRowsBindingInfo()||{});};k.prototype.checkAndRebindTable=function(){var o=C.byId(this.getFilter());if(o){o.triggerSearch();}else{this.rebindTable();}};k.prototype._showSettings=function(E){b.showPanel(this,"Columns",E.getSource());};k.prototype._showSort=function(E){b.showPanel(this,"Sort",E.getSource());};k.prototype._getSorters=function(){var i=this.getSortConditions()?this.getSortConditions().sorters:[];var m=[];i.forEach(function(o){m.push(new S(o.name,o.descending));});return m;};k.prototype.exit=function(){var i=this;if(this._oTemplate){this._oTemplate.destroy();}if(this._oAdaptationController){this._oAdaptationController.destroy();this._oAdaptationController=null;}this._oTemplate=null;this._oTable=null;this._oToolbar=null;this._oTitle=null;this._oNumberFormatInstance=null;t.forEach(function(m){var n=f(m),p="_o"+n;i[p]=null;});this._oTableReady=null;this.oTableDelegateLoaded=null;this._fReject=null;this._fResolve=null;};return k;});

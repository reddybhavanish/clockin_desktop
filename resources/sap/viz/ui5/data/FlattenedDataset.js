/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(['sap/viz/library',"sap/ui/model/ChangeReason","./Dataset","./CVOMDatasetAdaptor","sap/viz/ui5/controls/common/utils/Constants","sap/base/Log","sap/ui/thirdparty/jquery"],function(l,C,D,a,b,L,q){"use strict";var F=D.extend("sap.viz.ui5.data.FlattenedDataset",{metadata:{library:"sap.viz",designtime:"sap/viz/designtime/FlattenedDataset.designtime",properties:{context:{type:"any",multiple:false,singularName:"context"}},aggregations:{dimensions:{type:"sap.viz.ui5.data.DimensionDefinition",multiple:true,singularName:"dimension"},measures:{type:"sap.viz.ui5.data.MeasureDefinition",multiple:true,singularName:"measure"},data:{type:"sap.ui.core.Element",multiple:true,singularName:"data",bindable:"bindable"}},events:{dataChange:{},dataRefresh:{},dataError:{}}}});F.getMetadata().getAllAggregations()["data"]._doesNotRequireFactory=true;F.prototype.init=function(){this._oCVOMDatasetAdaptor=new a();this._iStartIndex=-1;this._iLength=-1;this._bReady=true;this._bInitializeBinding=true;};F.prototype._bindAggregation=function(){this._bInitializeBinding=true;D.prototype._bindAggregation.apply(this,arguments);this._bInitializeBinding=false;var B=this.getBinding("data");if(B){B.attachDataReceived(this._dataReceivedListener,this);}};F.prototype._dataReceivedListener=function(e){if(e&&e.getParameter&&e.getParameter("__simulateAsyncAnalyticalBinding")){return;}if(e.getParameter('data')===undefined){this._bDataReceiveError=true;this.fireEvent('dataError');}};F.prototype.refreshData=function(r){this._bDataReceiveError=false;this._bReady=false;this.fireEvent("dataRefresh",{reason:r});this._getDataContexts();};F.prototype.updateData=function(r){var V=sap.ui.require("sap/ui/model/odata/v4/ODataModel");var v=V&&this.getBinding("data").getModel()instanceof V;if(!this._bInitializeBinding||!v){this._bDataReceiveError=false;this._bReady=true;this.fireEvent("dataChange",{reason:r});this.invalidate();}};q.each("add get indexOf insert remove removeAll".split(" "),function(i,m){var M="FlattenedDataset manages the 'data' aggregation only via data binding. The method '"+m+"Data' therefore cannot be used programmatically!";F.prototype[m+"Data"]=function(){L.error(M);};});F.prototype.getVIZFlatDataset=function(){return this._getCVOMDataset(b.DATASET_TYPES.FLATTABLEDATASET);};F.prototype.getVIZCrossDataset=function(){return this._getCVOMDataset(b.DATASET_TYPES.CROSSTABLEDATASET);};F.prototype.getVIZDataset=function(){return this._getCVOMDataset(b.DATASET_TYPES.LEGACYCROSSTABLEDATASET);};F.prototype._getCVOMDataset=function(t){return this._oCVOMDatasetAdaptor.getDataset({type:t,dataContexts:this._getDataContexts(),dimensions:this.getDimensions(),measures:this.getMeasures(),additionalInfo:this._info||this._defaultSelectionInfo,contexts:this.getContext(),pagingOption:this._oPagingOption});};F.prototype.invalidate=function(o){if(this._oCVOMDatasetAdaptor){this._oCVOMDatasetAdaptor.invalidate();}sap.ui.core.Element.prototype.invalidate.apply(this,arguments);};F.prototype.setDefaultSelection=function(s){this._defaultSelectionInfo={'type':'defaultSelection','value':s};};F.prototype.info=function(v){if(v instanceof Array){this._info=v;}};F.prototype.findContext=function(c){if(this._oCVOMDatasetAdaptor){return this._oCVOMDatasetAdaptor.findContext(c);}};F.prototype.setPagingOption=function(p){this._oPagingOption=p;};F.prototype.getRenderedPageNo=function(){if(this._oCVOMDatasetAdaptor){return this._oCVOMDatasetAdaptor.getRenderedPageNo();}};F.prototype.setRange=function(s,i){this._iStartIndex=s;this._iLength=i;};F.prototype.getRange=function(s,i){return{iStartIndex:this._iStartIndex,iLength:this._iLength};};F.prototype.isReady=function(){if(this._bDataReceiveError){return true;}return this._bReady;};F.prototype._getDataContexts=function(){var s=this._iStartIndex,c=this._iLength,d=this.getBinding("data"),V=sap.ui.require("sap/ui/model/odata/v4/ODataModel");if(!d){return null;}var e;if(s==-1){e=this.getBindingInfo("data");s=(e&&e.startIndex!==undefined)?e.startIndex:0;}var n=!this._oPagingOption;if(c==-1){e=e||this.getBindingInfo("data");if(e&&e.length!==undefined){c=e.length;n=false;}else{c=d.getTotalSize?d.getTotalSize():d.getLength();}}if(this._bDataReceiveError){return[];}else if(V&&(d.getModel()instanceof V)){return n?d.getContexts(s,c,Infinity):d.getContexts(s,c);}else{return d.getContexts(s,c);}};return F;});

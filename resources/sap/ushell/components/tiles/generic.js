// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/library","sap/ui/core/format/DateFormat","sap/ushell/components/tiles/indicatorTileUtils/cache","sap/ushell/components/tiles/utils","sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/base/Log"],function(C,m,D,c,u,M,J,q,L){"use strict";var a=m.DeviationIndicator;var V=m.ValueColor;var F=m.FrameType;var b=m.LoadState;var g=C.extend("sap.ushell.components.tiles.generic",{getTile:function(){return this.oKpiTileView.oGenericTile;},_updateTileModel:function(n){var d=this.getTile().getModel().getData();q.extend(d,n);this.getTile().getModel().setData(d);},logError:function(e){this._updateTileModel({value:"",scale:"",unit:""});L.error(e);if(this.getView().getViewData().deferredObj){this.getView().getViewData().deferredObj.reject();}else{this.oKpiTileView.oGenericTile.setState(b.Failed);}},getKeyForCallCheck:function(){if(this.oKpiTileView.getViewName()==="sap.ushell.components.tiles.indicatornumeric.NumericTile"){return this.oConfig.TILE_PROPERTIES.id+"left";}return this.oConfig.TILE_PROPERTIES.id+"right";},getRelativeTime:function(){var d=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate(),t;if(q.type(this.cacheTime)==="date"){t=this.cacheTime;}else{t=new Date(parseInt(this.cacheTime.substr(6),10));}var r=sap.ushell.components.tiles.indicatorTileUtils.util.getTimeDifference(d-t),e,o;switch(r.unit){case"minutes":o=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(r.time,"minutes");d=d-o;e=new Date(d);break;case"hours":o=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(r.time,"hours");d=d-o;e=new Date(d);break;case"days":o=sap.ushell.components.tiles.indicatorTileUtils.util.getMillisecond(r.time,"days");d=d-o;e=new Date(d);break;}return e;},setTimeStamp:function(){this.updateTimeStampjobScheduled=false;var f=D.getDateTimeInstance({relative:true,relativeSource:"auto",style:"short"});var t=f.format(this.getRelativeTime());this.oKpiTileView.oNVConfS.setRefreshOption(true);this.oKpiTileView.oNVConfS.setTimestamp(t);this.updateTimeStampjobScheduled=false;var k=this.oConfig.TILE_PROPERTIES.id+"time";var r=sap.ushell.components.tiles.indicatorTileUtils.util.getScheduledJob(k);if(r){clearTimeout(r);r=undefined;}sap.ushell.components.tiles.indicatorTileUtils.util.scheduleTimeStampJob.call(this,this.oTileApi.visible.isVisible());},isACurrencyMeasure:function(d){var e=this.DEFINITION_DATA.EVALUATION.ODATA_ENTITYSET;return sap.ushell.components.tiles.indicatorTileUtils.util.getFormattingMetadata(this.oRunTimeODataModel,e,d)._hasCurrency;},isCurrencyMeasure:function(d){var t=this;var e=c.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);if(e&&e.Data){var k=e.Data&&JSON.parse(e.Data);if(sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){if(t.oKpiTileView.getViewName()==="sap.ushell.components.tiles.indicatornumeric.NumericTile"){k=k.leftData;}else{k=k.rightData;}}if(t.oKpiTileView.getViewName()==="sap.ushell.components.tiles.indicatorcomparison.ComparisonTile"||t.oConfig.TILE_PROPERTIES.tileType==="CM"){if(k&&k.data&&k.data.length){for(var i=0;i<k.data.length;i++){if(k.data[i]&&k.data[i].measure===d){if(q.type(k.data[i].isCurM)==="boolean"){return k.data[i].isCurM;}return t.isACurrencyMeasure(d);}return t.isACurrencyMeasure(d);}}else{return t.isACurrencyMeasure(d);}}if(k&&q.type(k.isCurM)==="boolean"){return k.isCurM;}return t.isACurrencyMeasure(d);}return t.isACurrencyMeasure(d);},formSelectStatement:function(o){var t=Object.keys(o);var f="";for(var i=0;i<t.length;i++){if((o[t[i]]!==undefined)&&(o.fullyFormedMeasure)){f=f+","+o[t[i]];}}return f;},setThresholdValues:function(){var t=this;try{var T={};T.fullyFormedMeasure=this.DEFINITION_DATA.EVALUATION.COLUMN_NAME;if(this.DEFINITION_DATA.EVALUATION.VALUES_SOURCE==="MEASURE"){var d=c.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);switch(this.DEFINITION_DATA.EVALUATION.GOAL_TYPE){case"MI":T.sWarningHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","MEASURE");T.sCriticalHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);if(d&&d.Data&&d.Data.length){d.Data=JSON.parse(d.Data);T.trendValue=Number(d.Data.trend);T.targetValue=Number(d.Data.target);T.criticalHighValue=Number(d.Data.ch);T.warningHighValue=Number(d.Data.wh);d.Data=JSON.stringify(d.Data);}break;case"MA":T.sWarningLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","MEASURE");T.sCriticalLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);if(d&&d.Data&&d.Data.length){d.Data=JSON.parse(d.Data);T.criticalLowValue=Number(d.Data.cl);T.warningLowValue=Number(d.Data.wl);T.trendValue=Number(d.Data.trend);T.targetValue=Number(d.Data.target);d.Data=JSON.stringify(d.Data);}break;case"RA":T.sWarningHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","MEASURE");T.sCriticalHigh=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","MEASURE");T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.sWarningLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","MEASURE");T.sCriticalLow=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);if(d&&d.Data&&d.Data.length){d.Data=JSON.parse(d.Data);T.criticalLowValue=Number(d.Data.cl);T.warningLowValue=Number(d.Data.wl);T.trendValue=Number(d.Data.trend);T.targetValue=Number(d.Data.target);T.criticalHighValue=Number(d.Data.ch);T.warningHighValue=Number(d.Data.wh);d.Data=JSON.stringify(d.Data);}break;}}else if(this.DEFINITION_DATA.EVALUATION.VALUES_SOURCE==="RELATIVE"){T.sTarget=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","MEASURE");T.sTrend=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","MEASURE");T.fullyFormedMeasure+=t.formSelectStatement(T);T.criticalHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","FIXED");T.criticalLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","FIXED");T.warningHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","FIXED");T.warningLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","FIXED");}else{T.criticalHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CH","FIXED");T.criticalLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"CL","FIXED");T.warningHighValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WH","FIXED");T.warningLowValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"WL","FIXED");T.targetValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TA","FIXED");T.trendValue=sap.ushell.components.tiles.indicatorTileUtils.util.getEvalValueMeasureName(t.oConfig,"TC","FIXED");}return T;}catch(e){t.logError(e);}},setNoData:function(){var v=this.getView().getViewData();if(v.parentController){v.parentController.setNoData();if(v.deferredObj){v.deferredObj.resolve();}}else{try{this._updateTileModel({value:"",scale:"",unit:"",footerNum:this.oResourceBundle.getText("sb.noDataAvailable"),footerComp:this.oResourceBundle.getText("sb.noDataAvailable")});this.oKpiTileView.oGenericTile.setState(b.Loaded);}catch(e){}}},getLocalCache:function(c){var l={};l.ChipId=c.ChipId;l.Data=c.Data;l.CacheMaxAge=c.CacheMaxAgeUnit;l.CacheMaxAgeUnit=c.CacheMaxAgeUnit;l.CacheType=c.CacheType;l.CachedTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();return l;},fetchKpiValue:function(d,E,r,A){var t=this;var k=0;try{var s=this.DEFINITION_DATA.EVALUATION.ODATA_ENTITYSET;var T=this.setThresholdValues();var f=T.fullyFormedMeasure;var h=c.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);var i=t.oTileApi.configuration.getParameterValueAsString("timeStamp");var j=sap.ushell.components.tiles.indicatorTileUtils.util.isCacheValid(t.oConfig.TILE_PROPERTIES.id,i,t.chipCacheTime,t.chipCacheTimeUnit,t.tilePressed);var l=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(r);var n=this.getKeyForCallCheck();var o=true;if(sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){o=sap.ushell.components.tiles.indicatorTileUtils.util.isCallInProgress(n);if(o===undefined){o=true;}}if(o){if((!h||(!j&&t.oTileApi.visible.isVisible())||l||(A&&t.oTileApi.visible.isVisible())||t.getView().getViewData().refresh)){sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(n,false);if(t.kpiValueFetchDeferred){t.kpiValueFetchDeferred=false;var v=sap.ushell.components.tiles.indicatorTileUtils.util.prepareFilterStructure(this.DEFINITION_DATA.EVALUATION_FILTERS,this.DEFINITION_DATA.ADDITIONAL_FILTERS);var Q=sap.ushell.components.tiles.indicatorTileUtils.util.prepareQueryServiceUri(t.oRunTimeODataModel,s,f,null,v);if(Q){this.QUERY_SERVICE_MODEL=Q.model;this.queryUriForKpiValue=Q.uri;this.queryServiceUriODataReadRef=this.QUERY_SERVICE_MODEL.read(Q.uri,null,null,true,function(w){t.backEndCallMade=true;t.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(n,true);if(w&&w.results&&w.results.length&&w.results[0][t.DEFINITION_DATA.EVALUATION.COLUMN_NAME]!=null){k=w.results[0][t.DEFINITION_DATA.EVALUATION.COLUMN_NAME];var x={};if(Q.unit[0]){t._updateTileModel({unit:w.results[0][Q.unit[0].name]});x.uom=w.results[0][Q.unit[0].name];}if(t.oConfig.TILE_PROPERTIES.frameType==="TwoByOne"){x.numericValue=k;}else{x.value=k;}if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE==="MEASURE"){T.criticalHighValue=w.results[0][T.sCriticalHigh];T.criticalLowValue=w.results[0][T.sCriticalLow];T.warningHighValue=w.results[0][T.sWarningHigh];T.warningLowValue=w.results[0][T.sWarningLow];T.targetValue=w.results[0][T.sTarget];T.trendValue=w.results[0][T.sTrend];}else if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE==="RELATIVE"){T.targetValue=Number(w.results[0][T.sTarget]);T.criticalHighValue=T.targetValue*T.criticalHighValue/100;T.criticalLowValue=T.targetValue*T.criticalLowValue/100;T.warningHighValue=T.targetValue*T.warningHighValue/100;T.warningLowValue=T.targetValue*T.warningLowValue/100;T.trendValue=Number(w.results[0][T.sTrend]);}x.cl=T.criticalLowValue;x.ch=T.criticalHighValue;x.wl=T.warningLowValue;x.wh=T.warningHighValue;x.trend=T.trendValue;x.target=T.targetValue;x.isCurM=t.isCurrencyMeasure(t.oConfig.EVALUATION.COLUMN_NAME);var y={};y.ChipId=t.oConfig.TILE_PROPERTIES.id;y.Data=JSON.stringify(x);y.CacheMaxAge=Number(t.chipCacheTime);y.CacheMaxAgeUnit=t.chipCacheTimeUnit;y.CacheType=1;var z=t.getLocalCache(y);if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){c.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,z);var U=false;if(h){U=true;}if(t.chipCacheTime){sap.ushell.components.tiles.indicatorTileUtils.util.writeFrontendCacheByChipAndUserId(t.oTileApi,t.oConfig.TILE_PROPERTIES.id,y,U,function(w){if(w){t.cacheTime=w&&w.CachedTime;c.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,w);t.setTimeStamp(t.cacheTime);}if(t.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){q.proxy(t.setTimeStamp(t.cacheTime),t);}});}}else{var B=c.getKpivalueById(t.oConfig.TILE_PROPERTIES.id),G;if(B){if(!B.CachedTime){B.CachedTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();}G=B.Data;if(G){G=JSON.parse(G);if(t.oKpiTileView.getViewName()==="sap.ushell.components.tiles.indicatornumeric.NumericTile"){G.leftData=x;}else{G.rightData=x;}}B.Data=JSON.stringify(G);c.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,B);}else{G={};if(t.oKpiTileView.getViewName()==="sap.ushell.components.tiles.indicatornumeric.NumericTile"){G.leftData=x;}else{G.rightData=x;}z.Data=JSON.stringify(G);c.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,z);}t.cacheWriteData=x;}t.cacheTime=sap.ushell.components.tiles.indicatorTileUtils.util.getUTCDate();t.updateDatajobScheduled=false;var H=t.oConfig.TILE_PROPERTIES.id+"data";var I=sap.ushell.components.tiles.indicatorTileUtils.util.getScheduledJob(H);if(I){clearTimeout(I);I=undefined;}d.call(t,k,T);}else{c.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,{empty:"empty"});t.setNoData();}},function(w){t.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(n,true);if(w&&w.response){L.error(w.message+" : "+w.request.requestUri);E.call(t,w);}});}else{t.kpiValueFetchDeferred=true;sap.ushell.components.tiles.indicatorTileUtils.util.setUnsetCallInProgress(n,true);t.logError("Error Preparing Query Service URI");}}}else if(t.DEFINITION_DATA.TILE_PROPERTIES.frameType===F.OneByOne){var p;if(h&&h.Data){p=h.Data&&JSON.parse(h.Data);k=p.value;if(p.uom){t._updateTileModel({unit:p.uom});}if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE==="MEASURE"){T.criticalHighValue=p.ch;T.criticalLowValue=p.cl;T.warningHighValue=p.wh;T.warningLowValue=p.wl;T.targetValue=p.target;T.trendValue=p.trend;}else if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE==="RELATIVE"){T.targetValue=Number(p.target);T.criticalHighValue=T.targetValue*T.ch/100;T.criticalLowValue=T.targetValue*T.cl/100;T.warningHighValue=T.targetValue*T.wh/100;T.warningLowValue=T.targetValue*T.wl/100;T.trendValue=Number(p.trend);}t.cacheTime=h.CachedTime;if(t.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){q.proxy(t.setTimeStamp(h.CachedTime),t);}d.call(t,k,T);}else{t.setNoData();}}else if(h&&h.Data){p=h.Data&&JSON.parse(h.Data);if(t.oKpiTileView.getViewName()==="sap.ushell.components.tiles.indicatornumeric.NumericTile"){p=p.leftData;}else{p=p.rightData;}k=p.numericValue;if(p.unit){t._updateTileModel({unit:p.unit});}if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE==="MEASURE"){T.criticalHighValue=p.ch;T.criticalLowValue=p.cl;T.warningHighValue=p.wh;T.warningLowValue=p.wl;T.targetValue=p.target;T.trendValue=p.trend;}else if(t.DEFINITION_DATA.EVALUATION.VALUES_SOURCE==="RELATIVE"){T.targetValue=Number(p.target);T.criticalHighValue=T.targetValue*T.criticalHighValue/100;T.criticalLowValue=T.targetValue*T.criticalLowValue/100;T.warningHighValue=T.targetValue*T.warningHighValue/100;T.warningLowValue=T.targetValue*T.warningLowValue/100;T.trendValue=Number(p.trend);}t.cacheTime=h.CachedTime;if(t.chipCacheTime&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){q.proxy(t.setTimeStamp(h.CachedTime),t);}d.call(t,k,T);}else{t.setNoData();}}}catch(e){t.logError(e);}},getRunTimeODataModel:function(U,s){if(window["sap-ushell-config"].cacheBusting){U=sap.ushell.components.tiles.indicatorTileUtils.util.cacheBustingMechanism(U);}if(!this.oRunTimeODataModel){this.oRunTimeODataModel=sap.ushell.components.tiles.indicatorTileUtils.util.getODataModelByServiceUri(U);}if(this.oRunTimeODataModel.getServiceMetadata()){s();}else{this.oRunTimeODataModel.attachMetadataLoaded(s);}},parse_sapclient:function(){var i,S,r,f,d;S="P_SAPClient";r="$$$";f=this.oConfig.EVALUATION_FILTERS;if(f.constructor!==Array){return;}if(f.length<1){return;}for(i in f){d=f[i];if(d.NAME===S&&d.VALUE_1===r){break;}d=null;}if(d){q.when(sap.ushell.components.tiles.indicatorTileUtils.util.getHanaClient()).done(function(e){d.VALUE_1=e;});}},fetchEvaluation:function(d,f,r,i){var t=this;var p=this.oConfig.TILE_PROPERTIES.sb_metadata||"HANA";t.DEFINITION_DATA=d;t._updateTileModel(this.DEFINITION_DATA);var h=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(r);if((t.oTileApi.visible.isVisible()&&!t.firstTimeVisible)||h||i){q.when(sap.ushell.components.tiles.indicatorTileUtils.util.getFrontendCache(d,t.oTileApi)).done(function(j){t.firstTimeVisible=true;j=c.getKpivalueById(t.oConfig.TILE_PROPERTIES.id);if(j||Number(t.oTileApi.configuration.getParameterValueAsString("isSufficient"))){f.call();}else{try{if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)||!t.dataCallInProgress){t.dataCallInProgress=true;var k=c.getEvaluationById(t.oConfig.TILE_PROPERTIES.id);if(k){t.oConfig.EVALUATION_FILTERS=k.EVALUATION_FILTERS;f.call();}else if(t.evaluationFetchDeferred){t.evaluationFetchDeferred=false;sap.ushell.components.tiles.indicatorTileUtils.util.getFilterFromRunTimeService(t.oConfig,t.oTileApi,function(l){t.evaluationFetchDeferred=true;t.oConfig.EVALUATION_FILTERS=l;if(p.toUpperCase()==="HANA"){t.parse_sapclient();}c.setEvaluationById(t.oConfig.TILE_PROPERTIES.id,t.oConfig);f.call();});}}}catch(e){t.evaluationFetchDeferred=true;t.logError("no evaluation data");}}}).fail(function(){t.firstTimeVisible=true;if(Number(t.oTileApi.configuration.getParameterValueAsString("isSufficient"))){f.call();}else{try{var j=c.getEvaluationById(t.oConfig.TILE_PROPERTIES.id);if(j){t.oConfig.EVALUATION_FILTERS=j.EVALUATION_FILTERS;f.call();}else{sap.ushell.components.tiles.indicatorTileUtils.util.getFilterFromRunTimeService(t.oConfig,t.oTileApi,function(k){t.oConfig.EVALUATION_FILTERS=k;if(p.toUpperCase()==="HANA"){t.parse_sapclient();}c.setEvaluationById(t.oConfig.TILE_PROPERTIES.id,t.oConfig);f.call();});}}catch(e){t.logError("no evaluation data");}}});}},refreshHandler:function(r,A){var t=this;var i=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(r);var d=sap.ushell.components.tiles.indicatorTileUtils.util.getBoolValue(A);if(!t.firstTimeVisible||i||d){t.fetchEvaluation(t.oConfig,function(){var U;if(t.oConfig.TILE_PROPERTIES.tileType==="NT"||t.oConfig.TILE_PROPERTIES.tileType==="AT"||t.oKpiTileView.getViewName()==="sap.ushell.components.tiles.indicatornumeric.NumericTile"||t.oKpiTileView.getViewName()==="sap.ushell.components.tiles.indicatordeviation.DeviationTile"){U=t.oTileApi.url.addSystemToServiceUrl(t.oConfig.EVALUATION.ODATA_URL);t.getRunTimeODataModel(U,function(){if(t.KPI_VALUE_REQUIRED){t.fetchKpiValue(function(k,T){this.KPIVALUE=k;t.doProcess(k,T);},t.logError,r,d);}else{t.doProcess();}});}else{U=t.oTileApi.url.addSystemToServiceUrl(t.oConfig.EVALUATION.ODATA_URL);t.getRunTimeODataModel(U,function(){if(t.KPI_VALUE_REQUIRED){t.doProcess(t.KPIVALUE,t.setThresholdValues());}else{t.doProcess(i,d);}});}},r,d);}},visibleHandler:function(i){if(!i){this.firstTimeVisible=false;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.trendChartODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.comparisionChartODataRef);}if(i){this.refreshHandler(this);}},getChipConfiguration:function(d){var t=this;try{sap.ushell.components.tiles.indicatorTileUtils.util.getParsedChip(t.oTileApi.configuration.getParameterValueAsString("tileConfiguration"),t.oTileApi.preview.isEnabled(),function(f){t.oConfig=f;var h=sap.ushell.components.tiles.indicatorTileUtils.util.getChipTitle(t.oConfig);var s=sap.ushell.components.tiles.indicatorTileUtils.util.getChipSubTitle(t.oConfig);if(t.oTileApi.search){t.oTileApi.search.setKeywords([h,s]);}if(t.oTileApi.preview){t.oTileApi.preview.setTargetUrl(sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system));}d.call();});}catch(e){t.logError(e.message);}},onAfterTileRendering:function(){var t=this;this.firstTimeVisible=false;this.oKpiTileView=this.getView();this.updateDatajobScheduled=false;this.updateTimeStampjobScheduled=false;this.oViewData=this.oKpiTileView.getViewData();this.tilePressed=false;this.kpiValueFetchDeferred=true;this.evaluationFetchDeferred=true;this.backEndCallMade=false;if(!sap.ushell.components.tiles.utils){q.sap.require("sap.ushell.components.tiles.utils");}this.oResourceBundle=u.getResourceBundleModel().getResourceBundle();this.oTileApi=this.oViewData.chip;this.system=this.oTileApi.url.getApplicationSystem();this.oKpiTileView.oGenericTile.setState(b.Loading);this.getChipConfiguration(function(){var n;t.chipCacheTime=sap.ushell.components.tiles.indicatorTileUtils.util.getCachingTime(t.oConfig);t.chipCacheTimeUnit=sap.ushell.components.tiles.indicatorTileUtils.util.getCachingTimeUnit(t.oConfig);if(t.oTileApi.preview.isEnabled()){t.doDummyProcess();t.oKpiTileView.oGenericTile.attachPress(function(){M.show(t.oResourceBundle.getText("sb.NavigationHelp"));});}else if(t.oConfig.BLANKTILE||t.oConfig.TILE_PROPERTIES.blankTile){t.doDummyProcess();n=sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system);t.oKpiTileView.oGenericTile.$().wrap("<a href ='"+n+"'/>");t.oKpiTileView.oGenericTile.attachPress(function(){t.tilePressed=true;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(t.queryServiceUriODataReadRef);c.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,null);window.location.hash=n;});}else{if(t.oTileApi.visible&&!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){t.oTileApi.visible.attachVisible(t.visibleHandler.bind(t));}n=sap.ushell.components.tiles.indicatorTileUtils.util.getNavigationTarget(t.oConfig,t.system);t.oKpiTileView.oGenericTile.$().wrap("<a href ='"+n+"' style='display: block;'/>");t.oKpiTileView.oGenericTile.attachPress(function(){t.tilePressed=true;sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(t.queryServiceUriODataReadRef);c.setKpivalueById(t.oConfig.TILE_PROPERTIES.id,null);window.location.hash=n;});if(!sap.ushell.components.tiles.indicatorTileUtils.util.isDualTile(t.oConfig)){t.oKpiTileView.oNVConfS.attachRefresh(function(){t.oKpiTileView.oGenericTile.setState(b.Loading);q.proxy(t.refreshHandler(true),t);});}t.fetchEvaluation(t.oConfig,function(){t.DEFINITION_DATA=t.oConfig;var U=t.oTileApi.url.addSystemToServiceUrl(t.oConfig.EVALUATION.ODATA_URL);var d=t.oTileApi.configuration.getParameterValueAsString("timeStamp");var i=sap.ushell.components.tiles.indicatorTileUtils.util.isCacheValid(t.oConfig.TILE_PROPERTIES.id,d,t.chipCacheTime,t.chipCacheTimeUnit,t.tilePressed);if(!i||t.getView().getViewData().refresh){t.getRunTimeODataModel(U,function(){if(t.KPI_VALUE_REQUIRED){t.fetchKpiValue(function(k,T){this.KPIVALUE=k;t.doProcess(k,T);},t.logError);}else{t.doProcess();}});}else if(t.KPI_VALUE_REQUIRED){t.fetchKpiValue(function(k,T){this.KPIVALUE=k;t.doProcess(k,T);},t.logError);}else{t.doProcess();}});}});},onAfterRendering:function(){this.onAfterTileRendering();},_setLocalModelToTile:function(){if(!this.getTile().getModel()){this.getTile().setModel(new J({}));}},autoFormatter:function(n,i){i=i||false;if(!n){return"";}return sap.ushell.components.tiles.indicatorTileUtils.util.getLocaleFormattedValue(Number(n),this.oConfig.EVALUATION.SCALING,this.oConfig.EVALUATION.DECIMAL_PRECISION,i);},setToolTip:function(d,e,t){var f=this,o,T=this.setThresholdValues(),h=this.oConfig.EVALUATION.COLUMN_NAME,i=this.isCurrencyMeasure(h),v;if(t==="CONT"||t==="COMP"){if(this.oKpiTileView.getContent()[0].getTileContent().length){o=f.oKpiTileView.getContent()[0].getTileContent()[0].getContent();var j,k,l,n,p,r,s,w,x;if(e&&e[0]){j=e[0].title;n=this.autoFormatter(e[0].value,i);s=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(e[0].color);}if(e&&e[1]){k=e[1].title;p=this.autoFormatter(e[1].value,i);w=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(e[1].color);}if(e&&e[2]){l=e[2].title;r=this.autoFormatter(e[2].value,i);x=sap.ushell.components.tiles.indicatorTileUtils.util.getSemanticColorName(e[2].color);}var y={};y["0"]=this.oConfig.EVALUATION.COLUMN_NAME+",asc";y["1"]=this.oConfig.EVALUATION.COLUMN_NAME+",desc";y["2"]=this.oConfig.TILE_PROPERTIES.dimension+",asc";y["3"]=this.oConfig.TILE_PROPERTIES.dimension+",desc";var z=y[this.oConfig.TILE_PROPERTIES.sortOrder||"0"].split(",");v={measure:this.oConfig.EVALUATION.COLUMN_NAME,contributionTile:z,m1:j,v1:n,c1:s,m2:k,v2:p,c2:w,m3:l,v3:r,c3:x};sap.ushell.components.tiles.indicatorTileUtils.util.setTooltipInTile(o,t,v);}}else{var A="";if(d==="Error"){A="sb.error";}if(d==="Neutral"){A="sb.neutral";}if(d==="Critical"){A="sb.critical";}if(d==="Good"){A="sb.good";}v={status:A,actual:this.autoFormatter(e,i),target:this.autoFormatter(T.targetValue,i),cH:this.autoFormatter(T.criticalHighValue,i),wH:this.autoFormatter(T.warningHighValue,i),wL:this.autoFormatter(T.warningLowValue,i),cL:this.autoFormatter(T.criticalLowValue,i)};o=f.oKpiTileView.getContent()[0].getTileContent()[0]&&f.oKpiTileView.getContent()[0].getTileContent()[0].getContent();sap.ushell.components.tiles.indicatorTileUtils.util.setTooltipInTile(o,t,v);}},getTrendColor:function(t){var d=this,w,f,h,i;try{var j=this.DEFINITION_DATA.EVALUATION.GOAL_TYPE;var r=V.Neutral;if(j==="MI"){if(t.criticalHighValue&&t.warningHighValue){i=Number(t.criticalHighValue);h=Number(t.warningHighValue);if(this.CALCULATED_KPI_VALUE<h){r=V.Good;}else if(this.CALCULATED_KPI_VALUE<=i){r=V.Critical;}else{r=V.Error;}}}else if(j==="MA"){if(t.criticalLowValue&&t.warningLowValue){f=Number(t.criticalLowValue);w=Number(t.warningLowValue);if(this.CALCULATED_KPI_VALUE<f){r=V.Error;}else if(this.CALCULATED_KPI_VALUE<=w){r=V.Critical;}else{r=V.Good;}}}else if(t.warningLowValue&&t.warningHighValue&&t.criticalLowValue&&t.criticalHighValue){i=Number(t.criticalHighValue);h=Number(t.warningHighValue);w=Number(t.warningLowValue);f=Number(t.criticalLowValue);if(this.CALCULATED_KPI_VALUE<f||this.CALCULATED_KPI_VALUE>i){r=V.Error;}else if((this.CALCULATED_KPI_VALUE>=f&&this.CALCULATED_KPI_VALUE<=w)||(this.CALCULATED_KPI_VALUE>=h&&this.CALCULATED_KPI_VALUE<=i)){r=V.Critical;}else{r=V.Good;}}return r;}catch(e){d.logError(e);}},getTrendIndicator:function(t){var d=this;t=Number(t);try{var f=a.None;if(t>this.CALCULATED_KPI_VALUE){f=a.Down;}else if(t<this.CALCULATED_KPI_VALUE){f=a.Up;}return f;}catch(e){d.logError(e);}},setTextInTile:function(){var t=this;var d=sap.ushell.components.tiles.indicatorTileUtils.util.getTileTitleSubtitle(this.oTileApi);this._updateTileModel({header:d.title||sap.ushell.components.tiles.indicatorTileUtils.util.getChipTitle(t.oConfig),subheader:d.subTitle||sap.ushell.components.tiles.indicatorTileUtils.util.getChipSubTitle(t.oConfig)});},_getEvaluationThresholdMeasures:function(){var t=[];t.push(this.oConfig.EVALUATION.COLUMN_NAME);if(this.oConfig.EVALUATION.VALUES_SOURCE==="MEASURE"){var d=this.oConfig.EVALUATION_VALUES;if(d&&d.length){for(var i=0;i<d.length;i++){if((d[i]).COLUMN_NAME&&!((d[i]).FIXED)){t.push((d[i]).COLUMN_NAME);}}}}return t;},onExit:function(){sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.queryServiceUriODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.trendChartODataReadRef);sap.ushell.components.tiles.indicatorTileUtils.util.abortPendingODataCalls(this.comparisionChartODataRef);}});return g;});

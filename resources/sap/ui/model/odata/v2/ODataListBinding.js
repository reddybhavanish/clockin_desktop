/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","sap/base/Log","sap/base/util/deepEqual","sap/base/util/isEmptyObject","sap/base/util/uid","sap/ui/model/ChangeReason","sap/ui/model/Context","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/FilterProcessor","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/Sorter","sap/ui/model/SorterProcessor","sap/ui/model/odata/CountMode","sap/ui/model/odata/Filter","sap/ui/model/odata/ODataUtils","sap/ui/model/odata/OperationMode","sap/ui/thirdparty/jquery"],function(a,L,d,b,u,C,c,F,e,f,g,h,S,j,k,O,l,m,q){"use strict";var n=h.extend("sap.ui.model.odata.v2.ODataListBinding",{constructor:function(M,P,i,s,r,t){h.apply(this,arguments);this.sFilterParams=null;this.sSortParams=null;this.sRangeParams=null;this.sCustomParams=this.oModel.createCustomParams(this.mParameters);this.mCustomParams=t&&t.custom;this.iStartIndex=0;this.iLength=0;this.bPendingChange=false;this.aAllKeys=null;this.aKeys=[];this.sCountMode=(t&&t.countMode)||this.oModel.sDefaultCountMode;this.sOperationMode=(t&&t.operationMode)||this.oModel.sDefaultOperationMode;this.bCreatePreliminaryContext=(t&&t.createPreliminaryContext)||M.bPreliminaryContext;this.bUsePreliminaryContext=(t&&t.usePreliminaryContext)||M.bPreliminaryContext;this.bRefresh=false;this.bNeedsUpdate=false;this.bDataAvailable=false;this.bIgnoreSuspend=false;this.bPendingRefresh=false;this.sGroupId=undefined;this.sRefreshGroupId=undefined;this.bLengthRequested=false;this.bUseExtendedChangeDetection=true;this.bFaultTolerant=t&&t.faultTolerant;this.bLengthFinal=false;this.iLastEndIndex=0;this.aLastContexts=null;this.aLastContextData=null;this.bInitial=true;this.mRequestHandles={};this.oCountHandle=null;this.bSkipDataEvents=false;this.bUseExpandedList=false;this.oCombinedFilter=null;this.sDeepPath=M.resolveDeep(P,i);this.bCanonicalRequest=t&&t.bCanonicalRequest;this.mNormalizeCache={};this.bTransitionMessagesOnly=!!(t&&t.transitionMessagesOnly);this.oModel.checkFilterOperation(this.aApplicationFilters);if(t&&(t.batchGroupId||t.groupId)){this.sGroupId=t.groupId||t.batchGroupId;}this.iThreshold=(t&&t.threshold)||0;this.bThresholdRejected=false;if(this.sCountMode==k.None){this.bThresholdRejected=true;}var U=this.checkExpandedList();if(!U){this.resetData();}},metadata:{publicMethods:["getLength"]}});n.prototype.getContexts=function(s,r,t){if(this.bInitial){return[];}if(!this.bLengthFinal&&this.sOperationMode==m.Auto&&(this.sCountMode==k.Request||this.sCountMode==k.Both)){if(!this.bLengthRequested){this._getLength();this.bLengthRequested=true;}return[];}if(!this.bLengthFinal&&!this.bPendingRequest&&!this.bLengthRequested){this._getLength();this.bLengthRequested=true;}this.iLastLength=r;this.iLastStartIndex=s;this.iLastThreshold=t;if(!s){s=0;}if(!r){r=this.oModel.iSizeLimit;if(this.bLengthFinal&&this.iLength<r){r=this.iLength;}}if(!t){t=0;}if(this.sOperationMode==m.Auto){if(this.iThreshold>=0){t=Math.max(this.iThreshold,t);}}var v=true,w=this._getContexts(s,r),x=[],M;if(this.useClientMode()){if(!this.aAllKeys&&!this.bPendingRequest&&this.oModel.getServiceMetadata()){this.loadData();w.dataRequested=true;}}else{M=this.calculateSection(s,r,t,w);v=w.length!==r||M.length>0;if(this.oModel.getServiceMetadata()){if(!this.bPendingRequest&&M.length>0&&v){this.loadData(M.startIndex,M.length);w.dataRequested=true;}}}if(this.bRefresh){this.bRefresh=false;}else{for(var i=0;i<w.length;i++){x.push(this.getContextData(w[i]));}if(this.bUseExtendedChangeDetection){if(this.aLastContexts&&s<this.iLastEndIndex){w.diff=this.diffData(this.aLastContextData,x);}}this.iLastEndIndex=s+r;this.aLastContexts=w.slice(0);this.aLastContextData=x.slice(0);}return w;};n.prototype.getCurrentContexts=function(){return this.aLastContexts||[];};n.prototype.getEntryKey=function(i){return i.getPath();};n.prototype.getEntryData=function(i){return JSON.stringify(i.getObject(this.mParameters));};n.prototype._getContexts=function(s,r){var t=[],v,K;if(!s){s=0;}if(!r){r=this.oModel.iSizeLimit;if(this.bLengthFinal&&this.iLength<r){r=this.iLength;}}for(var i=s;i<s+r;i++){K=this.aKeys[i];if(!K){break;}v=this.oModel.getContext('/'+K,this.oModel.resolveDeep(this.sPath,this.oContext)+K.substr(K.indexOf("(")));t.push(v);}return t;};n.prototype.calculateSection=function(s,i,t){var E=false;if(s>=t){s-=t;i+=t;}else{i+=s;s=0;}i+=t;if(this.bLengthFinal&&s+i>this.iLength){i=this.iLength-s;}while(i&&this.aKeys[s]){s+=1;i-=1;}while(i&&this.aKeys[s+i-1]){i-=1;E=true;}if(i&&!E&&i<t){while(i<t&&!this.aKeys[s+i]){i+=1;}}return{startIndex:s,length:i};};n.prototype.setContext=function(i){var r,s=i&&i.bCreated,t=i&&i.isRefreshForced(),U=i&&i.isUpdated(),P=i&&i.isPreliminary();if(this.bInitial||!this.isRelative()){return;}if(P&&!this.bUsePreliminaryContext){return;}if(U&&this.bUsePreliminaryContext&&this.oContext===i){this._fireChange({reason:C.Context});return;}if(c.hasChanged(this.oContext,i)){this.oContext=i;r=this.oModel.resolve(this.sPath,this.oContext);this.sDeepPath=this.oModel.resolveDeep(this.sPath,this.oContext);if(!this._checkPathType()){L.error("List Binding is not bound against a list for "+r);}this.checkDataState();if(!r||s){if(this.aAllKeys||this.aKeys.length>0||this.iLength>0){this.aAllKeys=null;this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this._fireChange({reason:C.Context});}return;}this._initSortersFilters();if(this.checkExpandedList()&&!t){this.abortPendingRequest();this._fireChange({reason:C.Context});}else{this._refresh();}}};n.prototype.checkExpandedList=function(s){var r=!!this.oModel.resolve(this.sPath,this.oContext),R=this.oModel._getObject(this.sPath,this.oContext);if(!r||R===undefined||this.mCustomParams||(this.sOperationMode===m.Server&&(this.aApplicationFilters.length>0||this.aFilters.length>0||this.aSorters.length>0))){this.bUseExpandedList=false;this.aExpandRefs=undefined;return false;}else{this.bUseExpandedList=true;if(Array.isArray(R)){if(!s&&(this.oModel._isReloadNeeded("/"+R[0],this.mParameters)||this.oModel._isReloadNeeded("/"+R[R.length-1],this.mParameters))){this.bUseExpandedList=false;this.aExpandRefs=undefined;return false;}this.aExpandRefs=R;this.aAllKeys=R;this.iLength=R.length;this.bLengthFinal=true;this.bDataAvailable=true;this._initSortersFilters();this.applyFilter();this.applySort();}else{this.aExpandRefs=undefined;this.aAllKeys=null;this.aKeys=[];this.iLength=0;this.bLengthFinal=true;this.bDataAvailable=true;}return true;}};n.prototype.updateExpandedList=function(K){if(this.aExpandRefs){for(var i=0;i<K.length;i++){this.aExpandRefs[i]=K[i];}this.aExpandRefs.length=K.length;}};n.prototype.useClientMode=function(){return(this.sOperationMode===m.Client||this.sOperationMode===m.Auto&&!this.bThresholdRejected||this.sOperationMode!==m.Server&&this.bUseExpandedList);};n.prototype.loadData=function(s,r){var t=this,I=false,G=u(),v;if(s||r){this.sRangeParams="$skip="+s+"&$top="+r;this.iStartIndex=s;}else{s=this.iStartIndex;}var P=[];if(this.sRangeParams&&!this.useClientMode()){P.push(this.sRangeParams);}if(this.sSortParams){P.push(this.sSortParams);}if(this.sFilterParams&&!this.useClientMode()){P.push(this.sFilterParams);}if(this.sCustomParams){P.push(this.sCustomParams);}if(this.sCountMode==k.InlineRepeat||!this.bLengthFinal&&(this.sCountMode===k.Inline||this.sCountMode===k.Both)){P.push("$inlinecount=allpages");I=true;}function w(D){if(I&&D.__count!==undefined){t.iLength=parseInt(D.__count);t.bLengthFinal=true;if(t.sOperationMode==m.Auto){if(t.iLength<=t.mParameters.threshold){t.bThresholdRejected=false;}else{t.bThresholdRejected=true;delete t.mRequestHandles[G];t.bPendingRequest=false;t.bNeedsUpdate=true;return;}}}if(t.useClientMode()){t.aKeys=[];q.each(D.results,function(i,y){t.aKeys[i]=t.oModel._getKey(y);});t.updateExpandedList(t.aKeys);t.aAllKeys=t.aKeys.slice();t.iLength=t.aKeys.length;t.bLengthFinal=true;t.applyFilter();t.applySort();}else{if(D.results.length>0){q.each(D.results,function(i,y){t.aKeys[s+i]=t.oModel._getKey(y);});if(t.iLength<s+D.results.length){t.iLength=s+D.results.length;t.bLengthFinal=false;}if(!D.__next&&(D.results.length<r||r===undefined)){t.iLength=s+D.results.length;t.bLengthFinal=true;}}else{if(t.bFaultTolerant&&D.__next){t.iLength=s;t.bLengthFinal=true;}if(s===0){t.iLength=0;t.aKeys=[];t.bLengthFinal=true;}if(s===t.iLength){t.bLengthFinal=true;}}}delete t.mRequestHandles[G];t.bPendingRequest=false;t.bNeedsUpdate=true;t.bIgnoreSuspend=true;t.oModel.callAfterUpdate(function(){t.fireDataReceived({data:D});});}function E(i){var A=i.statusCode==0;delete t.mRequestHandles[G];t.bPendingRequest=false;if(t.bFaultTolerant){t.iLength=t.aKeys.length;t.bLengthFinal=true;t.bDataAvailable=true;}else if(!A){t.aKeys=[];t.aAllKeys=[];t.iLength=0;t.bLengthFinal=true;t.bDataAvailable=true;t._fireChange({reason:C.Change});}if(!t.bSkipDataEvents){t.fireDataReceived();}}var x=this.sPath;if(this.isRelative()){x=this.oModel.resolve(this.sPath,this.oContext);}if(x){this.bPendingRequest=true;if(!this.bSkipDataEvents){this.fireDataRequested();}this.bSkipDataEvents=false;v=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.mRequestHandles[G]=this.oModel.read(this.sPath,{headers:this.bTransitionMessagesOnly?{"sap-messages":"transientOnly"}:undefined,context:this.oContext,groupId:v,urlParameters:P,success:w,error:E,canonicalRequest:this.bCanonicalRequest,updateAggregatedMessages:this.bRefresh});}};n.prototype.isLengthFinal=function(){return this.bLengthFinal;};n.prototype.getLength=function(){if(this.bLengthFinal||this.iLength==0){return this.iLength;}else{var A=this.iLastThreshold||this.iLastLength||10;return this.iLength+A;}};n.prototype._getLength=function(){var t=this;var G;if(this.sCountMode!==k.Request&&this.sCountMode!==k.Both){return;}var P=[];if(this.sFilterParams&&this.sOperationMode!=m.Auto){P.push(this.sFilterParams);}if(this.mParameters&&this.mParameters.custom){var i={custom:{}};q.each(this.mParameters.custom,function(v,V){i.custom[v]=V;});P.push(this.oModel.createCustomParams(i));}function _(D){t.iLength=parseInt(D);t.bLengthFinal=true;t.bLengthRequested=true;t.oCountHandle=null;if(t.sOperationMode==m.Auto){if(t.iLength<=t.mParameters.threshold){t.bThresholdRejected=false;}else{t.bThresholdRejected=true;}t._fireChange({reason:C.Change});}}function r(E){delete t.mRequestHandles[s];var v="Request for $count failed: "+E.message;if(E.response){v+=", "+E.response.statusCode+", "+E.response.statusText+", "+E.response.body;}L.warning(v);}var s=this.oModel.resolve(this.sPath,this.oContext);if(s){G=this.sRefreshGroupId?this.sRefreshGroupId:this.sGroupId;this.oCountHandle=this.oModel.read(this.sPath+"/$count",{context:this.oContext,withCredentials:this.oModel.bWithCredentials,groupId:G,urlParameters:P,success:_,error:r,canonicalRequest:this.bCanonicalRequest});}};n.prototype.refresh=function(i,G){if(typeof i==="string"){G=i;i=false;}this.sRefreshGroupId=G;this._refresh(i);this.sRefreshGroupId=undefined;};n.prototype._refresh=function(r,s,E){var t=false,v=this.isRelative()&&this.oContext&&this.oContext.bCreated;if(v){return;}this.bPendingRefresh=false;if(!r){if(E){var R=this.oModel.resolve(this.sPath,this.oContext);if(R){var w=this.oModel.oMetadata._getEntityTypeByPath(R);if(w&&(w.entityType in E)){t=true;}}}if(s&&!t){q.each(this.aKeys,function(i,K){if(K in s){t=true;return false;}});}if(!s&&!E){t=true;}}if(r||t){if(this.bSuspended&&!this.bIgnoreSuspend&&!r){this.bPendingRefresh=true;return;}this.abortPendingRequest(true);this.resetData();this._fireRefresh({reason:C.Refresh});}};n.prototype._fireRefresh=function(P){if(this.oModel.resolve(this.sPath,this.oContext)){this.bRefresh=true;this.fireEvent("refresh",P);}};n.prototype._checkPathType=function(){var P=this.oModel.resolve(this.sPath,this.oContext);if(P){if(!this._mPathType||!this._mPathType[P]){this._mPathType={};var I=P.lastIndexOf("/");var t,E;if(I>1){E=this.oModel.oMetadata._getEntityTypeByPath(P.substring(0,I));if(E){t=this.oModel.oMetadata._getEntityAssociationEnd(E,P.substring(I+1));if(t&&t.multiplicity==="*"){this._mPathType[P]=true;}}}else if(I===0){var M,N=P.substring(1);M=this.oModel.oMetadata._findEntitySetByName(N);if(M){this._mPathType[P]=true;}else{var r=this.oModel.oMetadata._getFunctionImportMetadataByName(N);for(var i=0;i<r.length;i++){var s=r[i];if(s.entitySet){M=this.oModel.oMetadata._findEntitySetByName(s.entitySet);if(M){this._mPathType[P]=true;}}}}}}return!!this._mPathType[P];}return true;};n.prototype.initialize=function(){var i=this.isRelative()&&this.oContext&&this.oContext.bCreated;if(this.oModel.oMetadata&&this.oModel.oMetadata.isLoaded()&&this.bInitial&&!i){if(!this._checkPathType()){L.error("List Binding is not bound against a list for "+this.oModel.resolve(this.sPath,this.oContext));}this.bInitial=false;this._initSortersFilters();if(!this.bSuspended){if(this.bDataAvailable){this._fireChange({reason:C.Change});}else{this._fireRefresh({reason:C.Refresh});}}this.checkDataState();}return this;};n.prototype.checkUpdate=function(i,r){var s=this.sChangeReason?this.sChangeReason:C.Change,t=false,v,w=this,x;if((this.bSuspended&&!this.bIgnoreSuspend&&!i)||this.bPendingRequest){return;}if(this.bInitial){if(this.oContext&&this.oContext.isUpdated()){this.initialize();}return;}this.bIgnoreSuspend=false;if(!i&&!this.bNeedsUpdate){x=this.aExpandRefs;var y=this.aKeys.slice();var E=this.checkExpandedList(true);if(!E&&this.useClientMode()){this.applyFilter();this.applySort();}if(!d(x,this.aExpandRefs)){t=true;}else if(r){if(this.aKeys.length!==y.length){t=true;}else{for(var K in r){if(this.aKeys.indexOf(K)>-1||y.indexOf(K)>-1){t=true;break;}}}}else{t=true;}if(t&&this.aLastContexts){t=false;var z=this._getContexts(this.iLastStartIndex,this.iLastLength,this.iLastThreshold);if(this.aLastContexts.length!==z.length){t=true;}else{q.each(this.aLastContextData,function(I,A){v=w.getContextData(z[I]);if(A!==v){t=true;return false;}});}}}if(i||t||this.bNeedsUpdate){this.bNeedsUpdate=false;this._fireChange({reason:s});}this.sChangeReason=undefined;};n.prototype.resetData=function(){this.aKeys=[];this.aAllKeys=null;this.iLength=0;this.bLengthFinal=false;this.sChangeReason=undefined;this.bDataAvailable=false;this.bLengthRequested=false;this.bThresholdRejected=false;if(this.sCountMode==k.None){this.bThresholdRejected=true;}};n.prototype.abortPendingRequest=function(A){if(!b(this.mRequestHandles)){this.bSkipDataEvents=true;q.each(this.mRequestHandles,function(P,r){r.abort();});if(A&&this.oCountHandle){this.oCountHandle.abort();}this.mRequestHandles={};this.bPendingRequest=false;}};n.prototype.getDownloadUrl=function(s){var P=[],i;if(s){P.push("$format="+encodeURIComponent(s));}if(this.sSortParams){P.push(this.sSortParams);}if(this.sFilterParams){P.push(this.sFilterParams);}if(this.sCustomParams){P.push(this.sCustomParams);}i=this.oModel.resolve(this.sPath,this.oContext);if(i){return this.oModel._createRequestUrl(i,null,P);}};n.prototype.sort=function(s,r){var i=false;this.bIgnoreSuspend=true;if(!s){s=[];}if(s instanceof S){s=[s];}this.aSorters=s;if(!this.useClientMode()){this.createSortParams(s);}if(!this.bInitial){this.addComparators(s,true);if(this.useClientMode()){if(this.aAllKeys){if(s.length==0){this.applyFilter();}else{this.applySort();}this._fireChange({reason:C.Sort});}else{this.sChangeReason=C.Sort;}}else{this.aKeys=[];this.abortPendingRequest(false);this.sChangeReason=C.Sort;this._fireRefresh({reason:this.sChangeReason});}this._fireSort({sorter:s});i=true;}if(r){return i;}else{return this;}};n.prototype.addComparators=function(E,s){var P,t,i=this.oEntityType,r;if(!i){L.warning("Cannot determine sort/filter comparators, as entitytype of the collection is unkown!");return;}E.forEach(function(v){if(v.aFilters){this.addComparators(v.aFilters);}else if(!v.fnCompare){P=this.oModel.oMetadata._getPropertyMetadata(i,v.sPath);t=P&&P.type;a(P,"PropertyType for property "+v.sPath+" of EntityType "+i.name+" not found!");r=l.getComparator(t);if(s){v.fnCompare=o(r);}else{v.fnCompare=r;p(t,v);}}}.bind(this));};function o(i){return function(v,V){if(v===V){return 0;}if(v===null){return-1;}if(V===null){return 1;}return i(v,V);};}function p(t,i){switch(t){case"Edm.Decimal":case"Edm.Int64":if(typeof i.oValue1=="number"){i.oValue1=i.oValue1.toString();}if(typeof i.oValue2=="number"){i.oValue2=i.oValue2.toString();}break;case"Edm.Byte":case"Edm.Int16":case"Edm.Int32":case"Edm.SByte":if(typeof i.oValue1=="string"){i.oValue1=parseInt(i.oValue1);}if(typeof i.oValue2=="string"){i.oValue2=parseInt(i.oValue2);}break;case"Edm.Float":case"Edm.Single":case"Edm.Double":if(typeof i.oValue1=="string"){i.oValue1=parseFloat(i.oValue1);}if(typeof i.oValue2=="string"){i.oValue2=parseFloat(i.oValue2);}break;default:}}n.prototype.applySort=function(){var t=this,i;this.aKeys=j.apply(this.aKeys,this.aSorters,function(r,P){i=t.oModel.getContext('/'+r);return t.oModel.getProperty(P,i);});};n.prototype.createSortParams=function(s){this.sSortParams=l.createSortParams(s);};n.prototype.filter=function(i,s,r){var t=false;this.bIgnoreSuspend=true;if(!i){i=[];}if(i instanceof F){i=[i];}this.oModel.checkFilterOperation(i);if(s===g.Application){this.aApplicationFilters=i;}else{this.aFilters=i;}if(!this.aFilters||!Array.isArray(this.aFilters)){this.aFilters=[];}if(!this.aApplicationFilters||!Array.isArray(this.aApplicationFilters)){this.aApplicationFilters=[];}this.convertFilters();this.oCombinedFilter=f.combineFilters(this.aFilters,this.aApplicationFilters);if(!this.useClientMode()){this.createFilterParams(this.oCombinedFilter);}if(!this.bInitial){this.addComparators(this.aFilters);this.addComparators(this.aApplicationFilters);if(this.useClientMode()){if(this.aAllKeys){this.applyFilter();this.applySort();this._fireChange({reason:C.Filter});}else{this.sChangeReason=C.Filter;}}else{this.resetData();this.abortPendingRequest(true);this.sChangeReason=C.Filter;this._fireRefresh({reason:this.sChangeReason});}if(s===g.Application){this._fireFilter({filters:this.aApplicationFilters});}else{this._fireFilter({filters:this.aFilters});}t=true;}if(r){return t;}else{return this;}};n.prototype.convertFilters=function(){this.aFilters=this.aFilters.map(function(i){return i instanceof O?i.convert():i;});this.aApplicationFilters=this.aApplicationFilters.map(function(i){return i instanceof O?i.convert():i;});};n.prototype.applyFilter=function(){var t=this,i;this.oCombinedFilter=f.combineFilters(this.aFilters,this.aApplicationFilters);this.aKeys=f.apply(this.aAllKeys,this.oCombinedFilter,function(r,P){i=t.oModel.getContext('/'+r);return t.oModel.getProperty(P,i);},this.mNormalizeCache);this.iLength=this.aKeys.length;};n.prototype.createFilterParams=function(i){this.sFilterParams=l.createFilterParams(i,this.oModel.oMetadata,this.oEntityType);};n.prototype._initSortersFilters=function(){var r=this.oModel.resolve(this.sPath,this.oContext);if(!r){return;}this.oEntityType=this._getEntityType();this.addComparators(this.aSorters,true);this.addComparators(this.aFilters);this.addComparators(this.aApplicationFilters);this.convertFilters();this.oCombinedFilter=f.combineFilters(this.aFilters,this.aApplicationFilters);if(!this.useClientMode()){this.createSortParams(this.aSorters);this.createFilterParams(this.oCombinedFilter);}};n.prototype._getEntityType=function(){var r=this.oModel.resolve(this.sPath,this.oContext);if(r){var E=this.oModel.oMetadata._getEntityTypeByPath(r);a(E,"EntityType for path "+r+" could not be found!");return E;}return undefined;};n.prototype.resume=function(){this.bIgnoreSuspend=false;this.bSuspended=false;if(this.bPendingRefresh){this._refresh();}else{this.checkUpdate();}};n.prototype.suspend=function(){if(this.bInitial){this.bPendingRefresh=true;}h.prototype.suspend.apply(this,arguments);};n.prototype._checkDataStateMessages=function(D,r){if(r){D.setModelMessages(this.oModel.getMessagesByPath(this.sDeepPath,true));}};n.prototype._getFilterForPredicate=function(P){var i=[],K=P.slice(1,-1).split(","),t=this;K.forEach(function(s){var r=s.split("="),v=r[0],V=r[1];if(r.length===1){V=v;v=t.oModel.oMetadata.getKeyPropertyNamesByPath(t.sDeepPath)[0];}i.push(new F(v,e.EQ,l.parseValue(V)));});if(i.length===1){return i[0];}return new F({and:true,filters:i});};n.prototype.requestFilterForMessages=function(i){var D=this.sDeepPath,r=null,s=[],R=this.oModel.resolve(this.sPath,this.oContext),t=this;if(!R){return Promise.resolve(null);}this.oModel.getMessagesByPath(D,true).forEach(function(M){var P;if(!i||i(M)){P=M.fullTarget.slice(D.length).split("/")[0];if(P){s.push(t._getFilterForPredicate(P));}}});if(s.length===1){r=s[0];}else if(s.length>1){r=new F({filters:s});}return Promise.resolve(r);};return n;});

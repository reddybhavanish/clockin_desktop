/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataParentBinding","./lib/_AggregationCache","./lib/_AggregationHelper","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","sap/base/Log","sap/base/util/uid","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/FilterOperator","sap/ui/model/FilterProcessor","sap/ui/model/FilterType","sap/ui/model/ListBinding","sap/ui/model/Sorter","sap/ui/model/odata/OperationMode"],function(C,a,_,b,c,d,e,L,u,S,B,f,F,g,h,j,k,O){"use strict";var s="sap.ui.model.odata.v4.ODataListBinding",m={AggregatedDataStateChange:true,change:true,createCompleted:true,createSent:true,dataReceived:true,dataRequested:true,DataStateChange:true,patchCompleted:true,patchSent:true,refresh:true};var l=j.extend("sap.ui.model.odata.v4.ODataListBinding",{constructor:function(M,p,o,v,i,P){j.call(this,M,p);a.call(this);if(p.endsWith("/")){throw new Error("Invalid path: "+p);}P=e.clone(P)||{};this.checkBindingParameters(P,["$$aggregation","$$canonicalPath","$$groupId","$$operationMode","$$ownRequest","$$patchWithoutSideEffects","$$updateGroupId"]);this.aApplicationFilters=e.toArray(i);this.sChangeReason=M.bAutoExpandSelect?"AddVirtualContext":undefined;this.oDiff=undefined;this.aFilters=[];this.sGroupId=P.$$groupId;this.bHasAnalyticalInfo=false;this.oHeaderContext=this.bRelative?null:C.create(M,this,p);this.sOperationMode=P.$$operationMode||M.sOperationMode;this.mPreviousContextsByPath={};this.aPreviousData=[];this.aSorters=e.toArray(v);this.sUpdateGroupId=P.$$updateGroupId;if(!this.sOperationMode&&(this.aSorters.length||this.aApplicationFilters.length)){throw new Error("Unsupported operation mode: "+this.sOperationMode);}this.applyParameters(P);if(!this.bRelative||o&&!o.fetchValue){this.createReadGroupLock(this.getGroupId(),true);}this.setContext(o);M.bindingCreated(this);}});a(l.prototype);l.prototype.attachCreateCompleted=function(i,o){this.attachEvent("createCompleted",i,o);};l.prototype.detachCreateCompleted=function(i,o){this.detachEvent("createCompleted",i,o);};l.prototype.attachCreateSent=function(i,o){this.attachEvent("createSent",i,o);};l.prototype.detachCreateSent=function(i,o){this.detachEvent("createSent",i,o);};l.prototype._delete=function(G,E,o,n){var p=false,t=this;return this.deleteFromCache(G,E,String(o.iIndex),n,function(I,q){var r,i,P,R,v;if(o.created()){t.destroyCreated(o,true);}else{for(i=I;i<t.aContexts.length;i+=1){o=t.aContexts[i];if(o){t.mPreviousContextsByPath[o.getPath()]=o;}}R=t.oModel.resolve(t.sPath,t.oContext);t.aContexts.splice(I,1);for(i=I;i<t.aContexts.length;i+=1){if(t.aContexts[i]){v=i-t.iCreatedContexts;P=e.getPrivateAnnotation(q[i],"predicate");r=R+(P||"/"+v);o=t.mPreviousContextsByPath[r];if(o){delete t.mPreviousContextsByPath[r];if(o.iIndex===v){o.checkUpdate();}else{o.iIndex=v;}}else{o=C.create(t.oModel,t,r,v);}t.aContexts[i]=o;}}t.iMaxLength-=1;}p=true;}).then(function(){if(p){t._fireChange({reason:f.Remove});}});};l.prototype.adjustPredicate=function(t,p,o){var i=this;function n(q,N){var I=i.aPreviousData.indexOf(q);if(I>=0){i.aPreviousData[I]=N;}}if(o){o.adjustPredicate(t,p,n);}else{this.oHeaderContext.adjustPredicate(t,p);this.aContexts.forEach(function(o){o.adjustPredicate(t,p,n);});}};l.prototype.applyParameters=function(p,i){var A,o=this.mParameters&&this.mParameters.$$aggregation,n=this.mQueryOptions&&this.mQueryOptions.$apply;if("$$aggregation"in p){if("$apply"in p){throw new Error("Cannot combine $$aggregation and $apply");}A=b.buildApply(p.$$aggregation).$apply;}this.mQueryOptions=this.oModel.buildQueryOptions(p,true);this.mParameters=p;if(A){this.mQueryOptions.$apply=A;}if(i===""){if(this.mQueryOptions.$apply===n&&(!this.mParameters.$$aggregation||!o||e.deepEqual(this.mParameters.$$aggregation,o))){return;}i=f.Change;}if(this.isRootBindingSuspended()){this.setResumeChangeReason(i);return;}this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(i);};l.prototype.attachEvent=function(E){if(!(E in m)){throw new Error("Unsupported event '"+E+"': v4.ODataListBinding#attachEvent");}return j.prototype.attachEvent.apply(this,arguments);};l.prototype.create=function(i,n,A){var o,p=this.fetchResourcePath(),q,G,r=this.oModel.resolve(this.sPath,this.oContext),t="($uid="+u()+")",T=r+t,v=this;if(!r){throw new Error("Binding is not yet resolved: "+this);}A=!!A;if(A&&!this.mQueryOptions.$count){throw new Error("Must set $count to create at the end");}if(this.bCreatedAtEnd!==undefined&&this.bCreatedAtEnd!==A){throw new Error("Creating entities at the start and at the end is not supported.");}this.bCreatedAtEnd=A;this.checkSuspended();G=this.lockGroup(this.getUpdateGroupId(),true,true,function(){v.destroyCreated(o,true);return Promise.resolve().then(function(){v._fireChange({reason:f.Remove});});});q=this.createInCache(G,p,"",t,i,function(E){v.oModel.reportError("POST on '"+p+"' failed; will be repeated automatically",s,E);v.fireEvent("createCompleted",{context:o,success:false});},function(){v.fireEvent("createSent",{context:o});}).then(function(w){var x,P;if(!(i&&i["@$ui5.keepTransientPath"])){P=e.getPrivateAnnotation(w,"predicate");if(P){v.adjustPredicate(t,P,o);v.oModel.checkMessages();}}v.fireEvent("createCompleted",{context:o,success:true});if(!n){x=v.getGroupId();if(!v.oModel.isDirectGroup(x)&&!v.oModel.isAutoGroup(x)){x="$auto";}return v.refreshSingle(o,v.lockGroup(x));}},function(E){G.unlock(true);throw E;});this.iCreatedContexts+=1;o=C.create(this.oModel,this,T,-this.iCreatedContexts,q);this.aContexts.unshift(o);this._fireChange({reason:f.Add});return o;};l.prototype.createContexts=function(n,o,r){var p=false,q,t,i,v=r.$count,w,x=this.bLengthFinal,M=this.oModel,P=M.resolve(this.sPath,this.oContext),y,z=n>this.aContexts.length,A=this;function D(){var i,N=A.iMaxLength+A.iCreatedContexts;if(N>=A.aContexts.length){return;}for(i=N;i<A.aContexts.length;i+=1){if(A.aContexts[i]){A.aContexts[i].destroy();}}while(N>0&&!A.aContexts[N-1]){N-=1;}A.aContexts.length=N;p=true;}for(i=n;i<n+r.length;i+=1){if(this.aContexts[i]===undefined&&r[i-n]){p=true;w=i-this.iCreatedContexts;y=e.getPrivateAnnotation(r[i-n],"predicate")||e.getPrivateAnnotation(r[i-n],"transientPredicate");t=P+(y||"/"+w);q=this.mPreviousContextsByPath[t];if(q&&(!q.created()||q.isTransient())){delete this.mPreviousContextsByPath[t];q.iIndex=w;q.checkUpdate();}else{q=C.create(M,this,t,w);}this.aContexts[i]=q;}}if(Object.keys(this.mPreviousContextsByPath).length){M.addPrerenderingTask(this.destroyPreviousContexts.bind(this));}if(v!==undefined){this.bLengthFinal=true;this.iMaxLength=v-this.iCreatedContexts;D();}else{if(!r.length){this.iMaxLength=n-this.iCreatedContexts;D();}else if(this.aContexts.length>this.iMaxLength+this.iCreatedContexts){this.iMaxLength=Infinity;}if(!(z&&r.length===0)){this.bLengthFinal=this.aContexts.length===this.iMaxLength+this.iCreatedContexts;}}if(this.bLengthFinal!==x){p=true;}return p;};l.prototype.destroy=function(){if(this.bHasAnalyticalInfo&&this.aContexts===undefined){return;}this.aContexts.forEach(function(o){o.destroy();});this.destroyPreviousContexts();if(this.oHeaderContext){this.oHeaderContext.destroy();}this.oModel.bindingDestroyed(this);this.aApplicationFilters=undefined;this.aContexts=undefined;this.oDiff=undefined;this.aFilters=undefined;this.oHeaderContext=undefined;this.mPreviousContextsByPath=undefined;this.aPreviousData=undefined;this.mQueryOptions=undefined;this.aSorters=undefined;a.prototype.destroy.call(this);j.prototype.destroy.call(this);};l.prototype.destroyCreated=function(o,D){var i,I=o.getModelIndex();this.iCreatedContexts-=1;for(i=0;i<I;i+=1){this.aContexts[i].iIndex+=1;}if(!this.iCreatedContexts){this.bCreatedAtEnd=undefined;}this.aContexts.splice(I,1);if(D&&this.iCurrentEnd){this.mPreviousContextsByPath[o.getPath()]=o;}else{o.destroy();}};l.prototype.destroyPreviousContexts=function(){var p=this.mPreviousContextsByPath;if(p){Object.keys(p).forEach(function(P){p[P].destroy();});this.mPreviousContextsByPath={};}};l.prototype.doCreateCache=function(r,q,o,D){var A=this.mParameters.$$aggregation,i=A&&(A.groupLevels.length||b.hasMinOrMax(A.aggregate)||b.hasGrandTotal(A.aggregate));q=this.inheritQueryOptions(q,o);if(!i&&q.$$filterBeforeAggregate){q.$apply="filter("+q.$$filterBeforeAggregate+")/"+q.$apply;delete q.$$filterBeforeAggregate;}return i?_.create(this.oModel.oRequestor,r,A,q):c.create(this.oModel.oRequestor,r,q,this.oModel.bAutoExpandSelect,D);};l.prototype.doFetchQueryOptions=function(o){var t=this;return this.fetchResolvedQueryOptions(o).then(function(q){return t.fetchFilter(o,q.$filter).then(function(i){return e.mergeQueryOptions(q,t.getOrderby(q.$orderby),i);});});};l.prototype.doSetProperty=function(){};l.prototype.enableExtendedChangeDetection=function(D,K){if(K!==undefined){throw new Error("Unsupported property 'key' with value '"+K+"' in binding info for "+this);}return j.prototype.enableExtendedChangeDetection.apply(this,arguments);};l.prototype.expand=function(o){var D=false,t=this;return this.oCache.expand(this.lockGroup(),e.getRelativePath(o.getPath(),this.oHeaderContext.getPath()),function(){D=true;t.fireDataRequested();}).then(function(n){var p=t.aContexts,M=o.getModelIndex(),q,i;for(i=p.length-1;i>M;i-=1){q=p[i];q.iIndex+=n;p[i+n]=q;p[i]=undefined;}t.iMaxLength+=n;t._fireChange({reason:f.Change});if(D){t.fireDataReceived({});}},function(E){if(D){t.fireDataReceived({error:E});}throw E;});};l.prototype.fetchContexts=function(i,n,M,G,A,D){var p,t=this;if(this.bCreatedAtEnd){i+=this.iCreatedContexts;}G=G||this.lockGroup();p=this.fetchData(i,n,M,G,D);if(A){p=Promise.resolve(p);}return p.then(function(r){return r&&t.createContexts(i,n,r.value);},function(E){G.unlock(true);throw E;});};l.prototype.fetchData=function(i,n,M,G,D){var o=this.oContext,t=this;return this.oCachePromise.then(function(p){if(t.bRelative&&o!==t.oContext){return undefined;}if(p){return p.read(i,n,M,G,D);}G.unlock();return o.fetchValue(t.sReducedPath).then(function(r){var q;r=r||[];q=r.$count;r=r.slice(i,i+n);r.$count=q;return{value:r};});});};l.prototype.fetchDownloadUrl=function(){var M=this.oModel;if(this.isRelative()&&!this.oContext){throw new Error("Binding is unresolved");}return this.withCache(function(o,p){var q=o.mQueryOptions,i=e.getMetaPath(p);if(p){q=e.getQueryOptionsForPath(q,p);q=e.merge({},M.mUriParameters,q);}return M.sServiceUrl+e.buildPath(o.sResourcePath,p)+M.oRequestor.buildQueryString(e.buildPath(o.sMetaPath,i),q);});};l.prototype.fetchFilter=function(o,i){var n,p,M,q;function r(x,E,W){var y,z,T,V;function A(D){return T?"tolower("+D+")":D;}T=E==="Edm.String"&&x.bCaseSensitive===false;z=A(decodeURIComponent(x.sPath));V=A(e.formatLiteral(x.oValue1,E));switch(x.sOperator){case F.BT:y=z+" ge "+V+" and "+z+" le "+A(e.formatLiteral(x.oValue2,E));break;case F.NB:y=w(z+" lt "+V+" or "+z+" gt "+A(e.formatLiteral(x.oValue2,E)),W);break;case F.EQ:case F.GE:case F.GT:case F.LE:case F.LT:case F.NE:y=z+" "+x.sOperator.toLowerCase()+" "+V;break;case F.Contains:case F.EndsWith:case F.NotContains:case F.NotEndsWith:case F.NotStartsWith:case F.StartsWith:y=x.sOperator.toLowerCase().replace("not","not ")+"("+z+","+V+")";break;default:throw new Error("Unsupported operator: "+x.sOperator);}return y;}function t(x,y,W){var R;if(!x){return S.resolve();}if(x.aFilters){return S.all(x.aFilters.map(function(z){return t(z,y,x.bAnd);})).then(function(z){return w(z.join(x.bAnd?" and ":" or "),W&&!x.bAnd);});}R=M.resolve(v(x.sPath,y),q);return M.fetchObject(R).then(function(P){var z,A,D;if(!P){throw new Error("Type cannot be determined, no metadata for path: "+R);}D=x.sOperator;if(D===F.All||D===F.Any){z=x.oCondition;A=x.sVariable;if(D===F.Any&&!z){return x.sPath+"/any()";}y=Object.create(y);y[A]=v(x.sPath,y);return t(z,y).then(function(E){return x.sPath+"/"+x.sOperator.toLowerCase()+"("+A+":"+E+")";});}return r(x,P.$Type,W);});}function v(P,x){var y=P.split("/");y[0]=x[y[0]];return y[0]?y.join("/"):P;}function w(x,W){return W?"("+x+")":x;}n=g.combineFilters(this.aFilters,this.aApplicationFilters);if(!n){return S.resolve([i]);}p=b.splitFilter(n,this.mParameters.$$aggregation);M=this.oModel.getMetaModel();q=M.getMetaContext(this.oModel.resolve(this.sPath,o));return S.all([t(p[0],{},i).then(function(x){return x&&i?x+" and ("+i+")":x||i;}),t(p[1],{})]);};l.prototype.fetchValue=function(p,o,i){var n=i&&this.oCache!==undefined?S.resolve(this.oCache):this.oCachePromise,t=this;return n.then(function(q){var G,r;if(q){G=i?d.$cached:t.lockGroup();r=t.getRelativePath(p);if(r!==undefined){return q.fetchValue(G,r,undefined,o);}}if(t.oContext){return t.oContext.fetchValue(p,o,i);}});};l.prototype.filter=function(v,i){if(this.sOperationMode!==O.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server");}if(this.hasPendingChanges()){throw new Error("Cannot filter due to pending changes");}if(i===h.Control){this.aFilters=e.toArray(v);}else{this.aApplicationFilters=e.toArray(v);}if(this.isRootBindingSuspended()){this.setResumeChangeReason(f.Filter);return this;}this.createReadGroupLock(this.getGroupId(),true);this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(f.Filter);return this;};l.prototype.getContexts=function(i,n,M){var o,p,D=false,q=false,G,P,r=!!this.sChangeReason,v,t=this;L.debug(this+"#getContexts("+i+", "+n+", "+M+")",undefined,s);this.checkSuspended();if(i!==0&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" first parameter must be 0 if extended change detection is enabled, but is "+i);}if(M!==undefined&&this.bUseExtendedChangeDetection){throw new Error("Unsupported operation: v4.ODataListBinding#getContexts,"+" third parameter must not be set if extended change detection is enabled");}if(this.bRelative&&!this.oContext){this.aPreviousData=[];return[];}o=this.sChangeReason||f.Change;this.sChangeReason=undefined;if(o==="AddVirtualContext"){this.oModel.addPrerenderingTask(function(){var w=t.bUseExtendedChangeDetection;if(!t.isRootBindingSuspended()){t.bUseExtendedChangeDetection=false;t.getContexts(i,n,M);t.bUseExtendedChangeDetection=w;}t.oModel.addPrerenderingTask(function(){if(!t.isRootBindingSuspended()){t.sChangeReason="RemoveVirtualContext";t._fireChange({detailedReason:t.sChangeReason,reason:f.Change});t.reset(f.Refresh);}v.destroy();});},true);v=C.create(this.oModel,this,this.oModel.resolve(this.sPath,this.oContext)+"/"+C.VIRTUAL,C.VIRTUAL);return[v];}if(o==="RemoveVirtualContext"){return[];}i=i||0;n=n||this.oModel.iSizeLimit;if(!M||M<0){M=0;}G=this.oReadGroupLock;this.oReadGroupLock=undefined;if(!this.oDiff){P=this.fetchContexts(i,n,M,G,r,function(){D=true;t.fireDataRequested();});this.resolveRefreshPromise(P);P.then(function(w){if(t.bUseExtendedChangeDetection){t.oDiff={aDiff:t.getDiff(n),iLength:n};}if(q){if(w||(t.oDiff&&t.oDiff.aDiff.length)){t._fireChange({reason:o});}else{t.oDiff=undefined;}}if(D){t.fireDataReceived({data:{}});}},function(E){if(D){t.fireDataReceived(E.canceled?{data:{}}:{error:E});}throw E;}).catch(function(E){t.oModel.reportError("Failed to get contexts for "+t.oModel.sServiceUrl+t.oModel.resolve(t.sPath,t.oContext).slice(1)+" with start index "+i+" and length "+n,s,E);});q=true;}this.iCurrentBegin=i;this.iCurrentEnd=i+n;p=this.getContextsInViewOrder(i,n);if(this.bUseExtendedChangeDetection){if(this.oDiff&&n!==this.oDiff.iLength){throw new Error("Extended change detection protocol violation: Expected "+"getContexts(0,"+this.oDiff.iLength+"), but got getContexts(0,"+n+")");}p.dataRequested=!this.oDiff;p.diff=this.oDiff?this.oDiff.aDiff:[];}this.oDiff=undefined;return p;};l.prototype.getContextsInViewOrder=function(n,o){var p,i,q;if(this.bCreatedAtEnd){p=[];q=Math.min(o,this.getLength()-n);for(i=0;i<q;i+=1){p[i]=this.aContexts[this.getModelIndex(n+i)];}}else{p=this.aContexts.slice(n,n+o);}return p;};l.prototype.getCurrentContexts=function(){var i,n=Math.min(this.iCurrentEnd,this.iMaxLength+this.iCreatedContexts)-this.iCurrentBegin;i=this.getContextsInViewOrder(this.iCurrentBegin,n);while(i.length<n){i.push(undefined);}return i;};l.prototype.getDependentBindings=function(){var t=this;return this.oModel.getDependentBindings(this).filter(function(D){return!(D.oContext.getPath()in t.mPreviousContextsByPath);});};l.prototype.getDiff=function(i){var D,n,t=this;n=this.getContextsInViewOrder(0,i).map(function(o){return t.bDetectUpdates?JSON.stringify(o.getValue()):o.getPath();});D=this.diffData(this.aPreviousData,n);this.aPreviousData=n;return D;};l.prototype.getDistinctValues=function(){throw new Error("Unsupported operation: v4.ODataListBinding#getDistinctValues");};l.prototype.getDownloadUrl=e.createGetMethod("fetchDownloadUrl",true);l.prototype.getFilterInfo=function(i){var o=g.combineFilters(this.aFilters,this.aApplicationFilters),r=null,n;if(o){r=o.getAST(i);}if(this.mQueryOptions.$filter){n={expression:this.mQueryOptions.$filter,syntax:"OData "+this.oModel.getODataVersion(),type:"Custom"};if(r){r={left:r,op:"&&",right:n,type:"Logical"};}else{r=n;}}return r;};l.prototype.getHeaderContext=function(){return(this.bRelative&&!this.oContext)?null:this.oHeaderContext;};l.prototype.getModelIndex=function(v){if(!this.bCreatedAtEnd){return v;}return v<this.getLength()-this.iCreatedContexts?v+this.iCreatedContexts:this.getLength()-v-1;};l.prototype.getLength=function(){if(this.bLengthFinal){return this.iMaxLength+this.iCreatedContexts;}return this.aContexts.length?this.aContexts.length+10:0;};l.prototype.getOrderby=function(o){var i=[],t=this;this.aSorters.forEach(function(n){if(n instanceof k){i.push(n.sPath+(n.bDescending?" desc":""));}else{throw new Error("Unsupported sorter: "+n+" - "+t);}});if(o){i.push(o);}return i.join(',');};l.prototype.getQueryOptions=function(w){var r={},t=this;if(w){throw new Error("Unsupported parameter value: bWithSystemQueryOptions: "+w);}Object.keys(this.mQueryOptions).forEach(function(K){if(K[0]!=="$"){r[K]=e.clone(t.mQueryOptions[K]);}});return r;};l.prototype.getQueryOptionsFromParameters=function(){return this.mQueryOptions;};l.prototype.hasPendingChangesForPath=function(p){if(this.oCache===undefined){return this.iCreatedContexts>0;}return a.prototype.hasPendingChangesForPath.apply(this,arguments);};l.prototype.inheritQueryOptions=function(q,o){var i;if(!Object.keys(this.mParameters).length){i=this.getQueryOptionsForPath("",o);if(q.$orderby&&i.$orderby){q.$orderby+=","+i.$orderby;}if(q.$filter&&i.$filter){q.$filter="("+q.$filter+") and ("+i.$filter+")";}q=Object.assign({},i,q);e.aggregateQueryOptions(q,i);}return q;};l.prototype.initialize=function(){if((!this.bRelative||this.oContext)&&!this.getRootBinding().isSuspended()){if(this.oModel.bAutoExpandSelect){this._fireChange({detailedReason:this.sChangeReason,reason:f.Change});}else{this.sChangeReason=f.Refresh;this._fireRefresh({reason:f.Refresh});}}};l.prototype.isLengthFinal=function(){return this.bLengthFinal;};l.prototype.refreshInternal=function(r,G,i,K){var t=this;function n(o){return o.map(function(p){return p.refreshInternal(r,G,false,K);});}if(this.isRootBindingSuspended()){this.refreshSuspended(G);return S.all(n(t.getDependentBindings()));}this.createReadGroupLock(G,this.isRoot());return this.oCachePromise.then(function(o){var D,p=t.oRefreshPromise;if(o&&!p){t.removeCachesAndMessages(r);t.fetchCache(t.oContext);p=t.createRefreshPromise();if(K){p=p.catch(function(E){return t.fetchResourcePath(t.oContext).then(function(R){if(!t.bRelative||o.$resourcePath===R){t.oCache=o;t.oCachePromise=S.resolve(o);o.setActive(true);t._fireChange({reason:f.Change});}throw E;});});}}D=t.getDependentBindings();t.reset(f.Refresh);return S.all(n(D).concat(p));});};l.prototype.refreshSingle=function(o,G,A){var r=o.getPath().slice(1),t=this;if(o===this.oHeaderContext){throw new Error("Unsupported header context: "+o);}return this.withCache(function(n,p,q){var D=false,P=[],R=false;function v(i){if(D){t.fireDataReceived(i);}}function w(){D=true;t.fireDataRequested();}function x(){var i,I;if(o.created()){t.destroyCreated(o);}else{I=o.getModelIndex();t.aContexts.splice(I,1);for(i=I;i<t.aContexts.length;i+=1){if(t.aContexts[i]){t.aContexts[i].iIndex-=1;}}o.destroy();t.iMaxLength-=1;}R=true;t._fireChange({reason:f.Remove});}P.push((A?n.refreshSingleWithRemove(G,p,o.getModelIndex(),w,x):n.refreshSingle(G,p,o.getModelIndex(),w)).then(function(E){var U=[];v({data:{}});if(!R){U.push(o.checkUpdate());if(A){U.push(t.refreshDependentBindings(r,G.getGroupId()));}}return S.all(U).then(function(){return E;});},function(E){v({error:E});throw E;}).catch(function(E){G.unlock(true);t.oModel.reportError("Failed to refresh entity: "+o,s,E);}));if(!A){P.push(t.refreshDependentBindings(r,G.getGroupId()));}return S.all(P).then(function(i){return i[0];});});};l.prototype.requestContexts=function(i,n,G){var t=this;if(this.bRelative&&!this.oContext){throw new Error("Unresolved binding: "+this.sPath);}this.checkSuspended();this.oModel.checkGroupId(G);i=i||0;n=n||this.oModel.iSizeLimit;return Promise.resolve(this.fetchContexts(i,n,0,this.lockGroup(G,true))).then(function(o){if(o){t._fireChange({reason:f.Change});}return t.getContextsInViewOrder(i,n);},function(E){t.oModel.reportError("Failed to get contexts for "+t.oModel.sServiceUrl+t.oModel.resolve(t.sPath,t.oContext).slice(1)+" with start index "+i+" and length "+n,s,E);throw E;});};l.prototype.requestDownloadUrl=e.createRequestMethod("fetchDownloadUrl");l.prototype.requestSideEffects=function(G,p,o){var A,M=this.oModel,n={},P,i,q=o&&o!==this.oHeaderContext;function r(P){return P.catch(function(E){M.reportError("Failed to request side effects",s,E);throw E;});}if(p.indexOf("")<0){P=this.oCache.requestSideEffects(this.lockGroup(G),p,n,q?o.getModelIndex():this.iCurrentBegin,q?undefined:this.iCurrentEnd-this.iCurrentBegin);if(P){i=[P];this.visitSideEffects(G,p,q?o:undefined,n,i);return S.all(i.map(r));}}if(q){return this.refreshSingle(o,this.lockGroup(G),false);}if(this.aContexts.length){A=this.aContexts.every(function(o){return o.isTransient();});if(A){return S.resolve();}}return this.refreshInternal("",G,false,true);};l.prototype.reset=function(i){var E=this.iCurrentEnd===0,t=this;if(this.aContexts){this.aContexts.forEach(function(o){t.mPreviousContextsByPath[o.getPath()]=o;});}this.aContexts=[];this.iCreatedContexts=0;this.bCreatedAtEnd=undefined;this.iCurrentBegin=this.iCurrentEnd=0;this.iMaxLength=Infinity;this.bLengthFinal=false;if(i&&!(E&&i===f.Change)){this.sChangeReason=i;this._fireRefresh({reason:i});}if(this.getHeaderContext()){this.oModel.getDependentBindings(this.oHeaderContext).forEach(function(o){o.checkUpdate();});}};l.prototype.resumeInternal=function(){var i=this.getDependentBindings(),n=this.sResumeChangeReason;this.sResumeChangeReason=f.Change;this.removeCachesAndMessages("");this.reset();this.fetchCache(this.oContext);i.forEach(function(D){D.resumeInternal(false);});if(this.sChangeReason==="AddVirtualContext"){this._fireChange({detailedReason:this.sChangeReason,reason:n});}else{this._fireRefresh({reason:n});}this.oModel.getDependentBindings(this.oHeaderContext).forEach(function(o){o.checkUpdate();});};l.prototype.setAggregation=function(A){var p;if(this.hasPendingChanges()){throw new Error("Cannot set $$aggregation due to pending changes");}p=Object.assign({},this.mParameters);if(A===undefined){delete p.$$aggregation;}else{p.$$aggregation=e.clone(A);}this.applyParameters(p,"");};l.prototype.setContext=function(o){var i,r,t=this;if(this.oContext!==o){if(this.bRelative){for(i=0;i<t.iCreatedContexts;i+=1){if(t.aContexts[i].isTransient()){throw new Error("setContext on relative binding is forbidden if a "+"transient entity exists: "+t);}}this.reset();this.fetchCache(o);if(o){r=this.oModel.resolve(this.sPath,o);if(this.oHeaderContext&&this.oHeaderContext.getPath()!==r){this.oHeaderContext.destroy();this.oHeaderContext=null;}if(!this.oHeaderContext){this.oHeaderContext=C.create(this.oModel,this,r);}}B.prototype.setContext.call(this,o);}else{this.oContext=o;}}};l.prototype.sort=function(v){if(this.sOperationMode!==O.Server){throw new Error("Operation mode has to be sap.ui.model.odata.OperationMode.Server");}if(this.hasPendingChanges()){throw new Error("Cannot sort due to pending changes");}this.aSorters=e.toArray(v);if(this.isRootBindingSuspended()){this.setResumeChangeReason(f.Sort);return this;}this.createReadGroupLock(this.getGroupId(),true);this.removeCachesAndMessages("");this.fetchCache(this.oContext);this.reset(f.Sort);return this;};l.prototype.updateAnalyticalInfo=function(A){var o={aggregate:{},group:{}},H=false,t=this;A.forEach(function(i){var D={};if("total"in i){if("grouped"in i){throw new Error("Both dimension and measure: "+i.name);}if(i.as){D.name=i.name;o.aggregate[i.as]=D;}else{o.aggregate[i.name]=D;}if(i.min){D.min=true;H=true;}if(i.max){D.max=true;H=true;}if(i.with){D.with=i.with;}}else if(!("grouped"in i)||i.inResult||i.visible){o.group[i.name]=D;}});this.setAggregation(o);this.bHasAnalyticalInfo=true;if(H){return{measureRangePromise:Promise.resolve(this.getRootBindingResumePromise().then(function(){return t.oCachePromise;}).then(function(i){return i.getMeasureRangePromise();}))};}};return l;});

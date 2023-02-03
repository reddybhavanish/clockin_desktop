// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ushell/services/_Personalization/utils","sap/ushell/services/_Personalization/constants","sap/ushell/services/_Personalization/ContextContainer","sap/ushell/services/_Personalization/WindowAdapter","sap/ushell/services/_Personalization/TransientPersonalizer","sap/ushell/services/_Personalization/PersonalizationContainer","sap/ushell/services/_Personalization/Personalizer","sap/ushell/services/_Personalization/VariantSetAdapter","sap/ushell/services/_Personalization/Variant","sap/ushell/services/_Personalization/VariantSet","sap/ushell/services/_Personalization/WindowAdapterContainer","sap/ui/base/ManagedObject","sap/ui/thirdparty/jquery"],function(u,p,a,C,W,T,P,b,V,c,d,e,M,q){"use strict";function f(A,o,s,g){this._oConfig=(g&&g.config)||{};this._seed=(g&&g.config&&typeof g.config.seed==="string"&&g.config.seed)||"12345678901AFERANDOMBETTER";while(this._seed.length<40){this._seed=this._seed+this._seed;}this._oAppVariantAdapterWithBackendAdapter=this._configureAppVariantStorage(this._oConfig.appVariantStorage);this._oAdapterWithBackendAdapter={lazy:false,instance:new W(this,A)};this._oAdapterWindowOnly={lazy:false,instance:new W(this,undefined)};this._oContainerMap=new u.Map();this._oPendingOperationsMap=new u.Map();}f.prototype.SAVE_DEFERRED_DROPPED="Deferred save dropped (OK) - Data superseeded by subsequent save";f.prototype.constants=a;f.prototype._configureAppVariantStorage=function(A){var t=this,D="sap.ushell.adapters.AppVariantPersonalizationAdapter";if(!A){A={adapter:{module:D}};}if(Object.keys(A).length===0||A.enabled===false){return;}var s=(A.adapter&&A.adapter.module)||D,g=s.split(".").join("/");var h=function(){t._oAppVariantAdapterLoadPromise=t._oAppVariantAdapterLoadPromise||(function(){var o=new q.Deferred();try{sap.ui.require([g],R);}catch(r){o.reject(r);}function R(i){try{var j=new i();var w=new W(t,j);o.resolve(w);}catch(E){o.reject(E);}}return o.promise();})();return t._oAppVariantAdapterLoadPromise;};return{lazy:true,create:h};};f.prototype.getGeneratedKey=function(){var s="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",g=s.length,r="",t=this;var R=function(i){return(t._seed.charCodeAt(i)+Math.floor(Math.random()*g))%g;};if(window&&window.crypto&&window.crypto.getRandomValues){var h=new Uint32Array(40);window.crypto.getRandomValues(h);R=function(i){return(h[i]+t._seed.charCodeAt(i))%s.length;};}var j=function(i){return s[R(i)];};while(r.length<40){r+=j(r.length);}return r;};f.prototype.getPersonalizer=function(o,s,g){g=g||this._getApplicationComponent();return new b(this,this._oAdapterWithBackendAdapter.instance,o,s,g);};f.prototype._getApplicationComponent=function(){var o;var O=M._sOwnerId;if(O){o=sap.ui.getCore().getComponent(O);if(o instanceof sap.ui.core.UIComponent){return o;}}return undefined;};f.prototype.getTransientPersonalizer=function(){return new T();};f.prototype.getContainer=function(s,S,o){o=o||this._getApplicationComponent();return this._createContainer(s,S,false,o);};f.prototype.createEmptyContainer=function(s,S,o){o=o||this._getApplicationComponent();return this._createContainer(s,S,true,o);};f.prototype._createContainer=function(s,S,g,o){var t=this,l,h,i,j,A,k,U,D=new q.Deferred();if(typeof s!=="string"){throw new u.Error("sContainerKey is not a string: sap.ushell.services.Personalization"," ");}l=p.isLaunchpadReload();U=!!(p.isAppVariant(o)&&(!S||!S.shared)&&this._oAppVariantAdapterWithBackendAdapter);A=p.adjustScope(S,l);k=p.addContainerPrefix(s);if(U){var m=o.getManifestObject();A.component=o;A.appVarId=m.getEntry("/sap.ui5/appVariantId");A.appVersion=m.getEntry("/sap.app/applicationVersion/version");k+="#"+m.getEntry("/sap.ui5/appVariantId");}i=U?this._oAppVariantAdapterWithBackendAdapter:this._oAdapterWithBackendAdapter;h=t._oAdapterWindowOnly;j=p.pickAdapter(S,l,h,i);p.loadAdapter(j).then(function(L){var n,r=new C(t,L,k,A,o);var v=(L&&L.supportsGetWithoutSubsequentLoad===true);if(g&&v){n=new q.Deferred();n.resolve(r);}else{n=r.load();}n.fail(function(){D.reject();}).done(function(){if(g||r._isExpired()){r.clear();}D.resolve(r);});},function(E){D.reject(E);});return D.promise();};f.prototype.delContainer=function(s,S){var D={},o,g="",t=this;S=t._adjustScope(S,false);g=p.addContainerPrefix(s);D=new q.Deferred();o=t._pendingContainerOperations_cancelAddNext(s,null);o.always(function(){t.getContainer(s,S).fail(function(){t._pendingContainerOperations_cancelAddNext(s,D);D.reject();}).done(function(){var A;t._pendingContainerOperations_cancelAddNext(s,D);A=S.validity===0?t._oAdapterWindowOnly:t._oAdapterWithBackendAdapter;p.loadAdapter(A).then(function(l){l.delAdapterContainer(g,S).fail(function(){D.reject();}).done(function(){D.resolve();});},function(){D.reject();});});});return D.promise();};f.prototype._pendingContainerOperations_flushAddNext=function(s,D){var o,S;o=this._oPendingOperationsMap.get(s);if(!o){o=new q.Deferred();o.resolve();}if(D!==null){this._oPendingOperationsMap.put(s,D);}if(!o||o.state()!=="pending"){return o;}clearTimeout(o._sapTimeoutId);o._sapTimeoutId=undefined;if(typeof o._sapFnSave==="function"){S=o._sapFnSave;o._sapFnSave=undefined;S();}return o;};f.prototype._pendingContainerOperations_cancelAddNext=function(s,D){var o;o=this._oPendingOperationsMap.get(s);if(!o){o=new q.Deferred();o.resolve();}if(D!==null){this._oPendingOperationsMap.put(s,D);}if(!o||o.state()!=="pending"){return o;}if(o._sapTimeoutId){clearTimeout(o._sapTimeoutId);o._sapTimeoutId=undefined;o.resolve(f.prototype.SAVE_DEFERRED_DROPPED);}return o;};f.prototype.getPersonalizationContainer=function(s){var g="",o={},D={};if(typeof s!=="string"){throw new u.Error("sContainerKey is not a string: sap.ushell.services.Personalization"," ");}g=p.addContainerPrefix(s);if(this._oContainerMap.containsKey(g)){return this._oContainerMap.get(g).promise();}D=new q.Deferred();o=new P(this._oAdapterWithBackendAdapter.instance,g);o.done(function(h){D.resolve(h);}).fail(function(h){D.reject(h);});this._oContainerMap.put(g,D);return D.promise();};f.prototype.delPersonalizationContainer=function(s){var D={},g="",t=this;g=p.addContainerPrefix(s);D=new q.Deferred();this.getPersonalizationContainer(s).fail(function(){D.reject();}).done(function(){t._oAdapterWithBackendAdapter.instance.delAdapterContainer(g).fail(function(){D.reject();}).done(function(){t._oContainerMap.remove(g);D.resolve();});});return D.promise();};f.prototype._adjustScope=p.adjustScope;f.hasNoAdapter=false;f.ContextContainer=C;f.Variant=c;f.VariantSet=d;f.VariantSetAdapter=V;f.WindowAdapter=W;f.WindowAdapterContainer=e;return f;},true);

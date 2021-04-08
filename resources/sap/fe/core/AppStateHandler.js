/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2020 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/mdc/p13n/StateUtil","sap/fe/navigation/library","sap/fe/core/CommonUtils","sap/ui/fl/apply/api/ControlVariantApplyAPI","sap/fe/navigation/NavigationHelper","sap/ui/core/routing/HashChanger","sap/base/Log","sap/base/util/merge"],function(S,N,C,a,b,H,L,m){"use strict";var A={bIsAppStateReady:false,sNavType:null,bNoRouteChange:false,mInnerAppDataForFCL:{},mInnerAppDataForOP:{},getAppData:Promise.resolve(),init:function(){this.bIsAppStateReady=false;},createAppState:function(c,e){var o=c.getOwnerComponent();this.bNoRouteChange=false;if(o.isA("sap.fe.templates.ListReport.Component")&&this._getIsAppStateReady()){this._fnCreateAppStateForLR(c);}else if(o.isA("sap.fe.templates.ObjectPage.Component")&&this._getIsAppStateReady()){this._fnCreateAppStateForOP(c,e);}},applyAppState:function(c){var t=this;var o=C.getAppComponent(c.getView());t.getAppData=o.getService("navigation").then(function(n){return n.parseNavigation().done(function(d,s,e){t.sNavType=e;if(e){t._applyAppStateToPage(c,d,s,e);}else{t._setIsAppStateReady(true,c);}}).fail(function(){t._setIsAppStateReady(true,c);L.warning("Parse Navigation failed");});});},_applyAppStateToPage:function(c,o,s,n){var t=this,d,f,e=C.getAppComponent(c.getView()),M=e.getMetaModel(),v=c.getView().getViewData(),E=v.entitySet,g=c.getOwnerComponent();if(n!=="iAppState"&&g.isA("sap.fe.templates.ListReport.Component")){d={};f=c.getView().byId(c.getView().getContent()[0].data("filterBarId"));if(o.oSelectionVariant){var h=C.getMandatoryFilterFields(M,E);b.addDefaultDisplayCurrency(h,o);C.addSelectionVariantToConditions(o.oSelectionVariant,d,M,E);var V,i;switch(c.getView().getViewData().variantManagement){case"Page":V=c.getView().byId("fe::PageVariantManagement");if(o.bNavSelVarHasDefaultsOnly){i=V.getDefaultVariantKey();}else{i=V.getStandardVariantKey();}if(i===null){i=V.getId();}a.activateVariant({element:e,variantReference:i}).then(function(){if(!(o.bNavSelVarHasDefaultsOnly&&V.getDefaultVariantKey()!==V.getStandardVariantKey())){t._fnClearFilterAndReplaceWithAppState(d,c,f,V);}else{t._setIsAppStateReady(true,c);}});break;case"Control":V=c.getView().byId(c.getView().getContent()[0].data("filterBarVariantId"));if(o.bNavSelVarHasDefaultsOnly){i=V.getDefaultVariantKey();}else{i=V.getStandardVariantKey();}if(i===null){i=V.getId();}a.activateVariant({element:e,variantReference:i}).then(function(){if(!(o.bNavSelVarHasDefaultsOnly&&V.getDefaultVariantKey()!==V.getStandardVariantKey())){t._fnClearFilterAndReplaceWithAppState(d,c,f,V);}else{t._setIsAppStateReady(true,c);}}).catch(function(){t._setIsAppStateReady(true,c);L.warning("Activate Variant failed");});break;case"None":t._fnClearFilterAndReplaceWithAppState(d,c,f);break;default:t._fnClearFilterAndReplaceWithAppState(d,c,f);L.error("Variant Management not correctly defined, variable wrongly set to: "+c.getView().getViewData().variantManagement);break;}}else{t._setIsAppStateReady(true,c);}}else if(g.isA("sap.fe.templates.ListReport.Component")){this._fnApplyAppStatetoLR(c,o);}else{this._fnApplyAppStatetoOP(c,o);}},createKeyForAppStateData:function(v,e,c){var k="";k=k+v+"_"+e[0]+"/";if(e.length>1){for(var i=1;i<e.length;i++){k=k+e[i]+"/";}}k=k+c;return k;},_setIsAppStateReady:function(i,c){this.bIsAppStateReady=i;if(c&&c.getOwnerComponent().isA("sap.fe.templates.ListReport.Component")){if(this._getNavType()!=="iAppState"){this.createAppState(c);}var f=c.getView().byId(c.getView().getContent()[0].data("filterBarId"));var I=c.getView().getViewData().initialLoad;var l=c.getView().getViewData().liveMode;if((l===true&&Object.keys(f.getFilterConditions()).length===0)||(l===false&&(this._getNavType()==="xAppState"||this._getNavType()==="URLParams"||((this._getNavType()==="initial"||this._getNavType()==="iAppState")&&I===true)))){f.fireSearch();}}},_getIsAppStateReady:function(){return this.bIsAppStateReady;},removeSensitiveDataForIAppState:function(d,M,e){var p;var k="LR_"+e+"/FilterBar";var f=d.appState[k].filter;var K=Object.keys(f);K.map(function(P){if(P!=="$editState"){p=M&&M.getObject("/"+e+"/"+P+"@");if(p){if(b._checkPropertyAnnotationsForSensitiveData(p)){delete f[P];}}}});d.appState[k].filter=f;return d;},_fnCreateAppStateForLR:function(c){var t=this;return new Promise(function(r){var o=C.getAppComponent(c.getView());var v=c.getView().getViewData();var M=c.getView().getModel();var d=M&&M.getMetaModel();var e=v.entitySet;var i=o.getRootViewController().isFclEnabled();var R=o.getRouterProxy();var h=H.getInstance().getHash();var T="LR";var f=t.createKeyForAppStateData(T,[e],"FilterBar");var I={};if(i){t.mInnerAppDataForFCL=t.mInnerAppDataForFCL||{};I=m({},t.mInnerAppDataForFCL);}var V,s,g,j,k;var F=c.getView().byId(c.getView().getContent()[0].data("filterBarId"));S.retrieveExternalState(F).then(function(E){o.getService("navigation").then(function(n){I[f]=E;switch(c.getView().getViewData().variantManagement){case"Page":g=c.getView().byId("fe::PageVariantManagement");V=t.createKeyForAppStateData(T,[e],"Variant");var l=g.getModified()?g.getStandardVariantKey():g.getCurrentVariantKey();l=t.fnCheckForNullVariantId(g,l);I[V]={"variantId":l};break;case"Control":s=t.createKeyForAppStateData(T,[e],"@UI.LineItem");j=c.getView().byId(c.getView().getContent()[0].data("filterBarVariantId"));k=c.getView().byId(c.getView().getContent()[0].data("reportTableId")).getVariant();var p=k.getCurrentVariantKey();p=t.fnCheckForNullVariantId(k,p);var q=j.getModified()?j.getStandardVariantKey():j.getCurrentVariantKey();q=t.fnCheckForNullVariantId(j,q);I[f].variantId=q;I[s]={"variantId":p};break;case"None":break;default:L.error("Variant Management not correctly defined, variable wrongly set to: "+c.getView().getViewData().variantManagement);break;}var u={appState:I};u=t.removeSensitiveDataForIAppState(u,d,e,i);var w=n.storeInnerAppStateWithImmediateReturn(u,true,e,true);var x=w.appStateKey;var y=n.replaceInnerAppStateKey(h,x);R.navToHash(y);if(i){t.mInnerAppDataForFCL=m({},I);}r({appState:I});});}).catch(function(){L.warning("Retrieve External State failed");if(t._getIsAppStateReady()===false){t._setIsAppStateReady(true,c);}});});},_fnCreateAppStateForOP:function(c,e){var t=this;return new Promise(function(r){var o=C.getAppComponent(c.getView());var v=c.getView().getViewData();var E=v.entitySet;var i=o.getRootViewController().isFclEnabled();var R=o.getRouterProxy();var h=H.getInstance().getHash();var s;var n;var T="OP";var d=t.createKeyForAppStateData(T,[E],"Section");var l=m({},e);o.getService("navigation").then(function(f){var I={};if(i){I=m({},t.mInnerAppDataForFCL);}else{I=m({},t.mInnerAppDataForOP);}if(l&&l.getSource().isA("sap.uxap.ObjectPageLayout")){s=l.getParameter("section").getId();I[d]={"selectedSection":s};}if(l&&l.getSource().isA("sap.ui.fl.variants.VariantManagement")){var g=l.getSource().getId().split("::VM")[0];n=c.getView().byId(g).getRowsBindingInfo().path;var q="";if(g.indexOf("LineItem::")>-1){q=g.split("::")[g.split("::").length-1];}var j;if(q){j=t.createKeyForAppStateData(T,[E,n],"@UI.LineItem#"+q);}else{j=t.createKeyForAppStateData(T,[E,n],"@UI.LineItem");}var k=l.getSource().getCurrentVariantKey();k=t.fnCheckForNullVariantId(l.getSource(),k);I[j]={"variantId":k};}var p={appState:I};var u=f.storeInnerAppStateWithImmediateReturn(p,true,E,true);var w=u.appStateKey;var x=f.replaceInnerAppStateKey(h,w);if(x!==h){R.navToHash(x);t.bNoRouteChange=true;}if(i){t.mInnerAppDataForFCL=m({},I);}else{t.mInnerAppDataForOP=m({},I);}r(p);});});},_fnApplyAppStatetoLR:function(c,o){var t=this,T,f,d=C.getAppComponent(c.getView()),v=c.getView().getViewData(),e=v.entitySet,i=d.getRootViewController().isFclEnabled();if(i){if(o&&o.appState){t.mInnerAppDataForFCL=m({},o.appState,t.mInnerAppDataForFCL);}}T="LR";var F=t.createKeyForAppStateData(T,[e],"FilterBar");var V,s;f=c.getView().byId(c.getView().getContent()[0].data("filterBarId"));var g;if(o&&o.appState){switch(c.getView().getViewData().variantManagement){case"Page":g=c.getView().byId("fe::PageVariantManagement");V=t.createKeyForAppStateData(T,[e],"Variant");if(o.appState[V]&&o.appState[V].variantId){a.activateVariant({element:d,variantReference:o.appState[V].variantId}).then(function(){t._fnClearFilterAndReplaceWithAppState(o.appState[F].filter,c,f,g);}).catch(function(){t._fnClearFilterAndReplaceWithAppState(o.appState[F].filter,c,f,g);L.warning("Activate Variant failed");});}else{if(o.appState[F]&&o.appState[F].filter){t._fnClearFilterAndReplaceWithAppState(o.appState[F].filter,c,f,g);}}break;case"Control":g=c.getView().byId(c.getView().getContent()[0].data("filterBarVariantId"));s=t.createKeyForAppStateData(T,[e],"@UI.LineItem");if(o.appState[F]&&o.appState[F].variantId&&o.appState[s]&&o.appState[s].variantId){Promise.all([a.activateVariant({element:d,variantReference:o.appState[F].variantId}),a.activateVariant({element:d,variantReference:o.appState[s].variantId})]).then(function(){t._fnClearFilterAndReplaceWithAppState(o.appState[F].filter,c,f,g);}).catch(function(){t._fnClearFilterAndReplaceWithAppState(o.appState[F].filter,c,f,g);L.warning("Activate Variant failed");});}else{if(o.appState[F]&&o.appState[F].filter){t._fnClearFilterAndReplaceWithAppState(o.appState[F].filter,c,f,g);}}break;case"None":if(o.appState[F]&&o.appState[F].filter){S.applyExternalState(f,{filter:o.appState[F].filter}).then(function(){t._setIsAppStateReady(true,c);}).catch(function(){L.warning("Apply External State Failed");t._setIsAppStateReady(true,c);});}break;default:t._fnClearFilterAndReplaceWithAppState(o.appState[F].filter,c,f);L.error("Variant Management not correctly defined, variable wrongly set to: "+c.getView().getViewData().variantManagement);break;}}},_fnApplyAppStatetoOP:function(c,o){var t=this,T,d=C.getAppComponent(c.getView()),v=c.getView().getViewData(),e=v.entitySet,I=d.getRootViewController().isFclEnabled();T="OP";if(I){if(o&&o.appState){t.mInnerAppDataForFCL=m({},o.appState,t.mInnerAppDataForFCL);}}else if(o&&o.appState){t.mInnerAppDataForOP=m({},o.appState,t.mInnerAppDataForOP);}var f=c._findTables();var s=t.createKeyForAppStateData(T,[e],"Section");var O=c.getView().byId("fe::ObjectPage");var g=(o&&o.appState&&Object.keys(o.appState))||[];var h=[];var q,V,n;var r=function(){for(var j=0;j<f.length;j++){if(f[j].getRowsBindingInfo().path===n){var p=f[j].getId();if(q){if(p.indexOf("LineItem::")>-1&&p.split("::")[p.split("::").length-1]===q){V=f[j];break;}}else if(f[j].getId().indexOf("LineItem::")===-1){V=f[j];break;}}}};var k=function(){if(o&&o.appState&&o.appState[s]){O.setSelectedSection(o.appState[s].selectedSection);t._setIsAppStateReady(true);}else{t._setIsAppStateReady(true);}};for(var i=0;i<g.length;i++){if(g[i].indexOf("OP_"+e)>-1&&g[i].indexOf("@UI.LineItem")>-1){var l=g[i];n=g[i].split("/")[g[i].split("/").length-2];if(l.indexOf("#")>-1){q=l.split("#")[1];r();}else{r();}if(V){h.push(a.activateVariant({element:V,variantReference:o.appState[l].variantId}));}}}if(h.length){Promise.all(h).then(function(){k();}).catch(function(){k();L.warning("Activate Variant failed");});}else{k();}},_fnClearFilterAndReplaceWithAppState:function(c,o,f,v){var d=C.getAppComponent(o.getView()),M=d.getMetaModel(),V=o.getView().getViewData(),e=V.entitySet;var E=M.getObject("/"+e+"/");var t=this;var g={};var O;for(var k in E){O=E[k];if(O){if(O.$kind==="Property"){if(t.sNavType==="iAppState"&&!C.isPropertyFilterable(M,"/"+e,k,false)){continue;}g[k]=[];}}}S.applyExternalState(f,{filter:g}).then(function(){var s={filter:c};if(t.sNavType!=="iAppState"){s.items=Object.keys(c).reduce(function(h,p){if(!M.getObject("/"+e+"/"+p+"@com.sap.vocabularies.UI.v1.HiddenFilter")){h.push({name:p});}return h;},[]);}S.applyExternalState(f,s).then(function(){if(v&&v.getStandardVariantKey()!==v.getCurrentVariantKey()){v.setModified(false);}t._setIsAppStateReady(true,o);}).catch(function(){L.warning("Apply External State failed");t._setIsAppStateReady(true,o);});});},_getNavType:function(){return this.sNavType;},checkIfRouteChangedByIApp:function(){return this.bNoRouteChange;},resetRouteChangedByIApp:function(){if(this.bNoRouteChange){this.bNoRouteChange=false;}},fnCheckForNullVariantId:function(v,V){if(V===null){V=v.getId();}return V;}};return A;},true);

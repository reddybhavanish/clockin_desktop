/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/mdc/TableDelegate","sap/ui/core/XMLTemplateProcessor","sap/ui/core/util/XMLPreprocessor","sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/fe/macros/CommonHelper","sap/fe/core/helpers/StableIdHelper","sap/fe/macros/field/FieldHelper","sap/fe/macros/table/TableHelper","sap/fe/macros/table/Utils","sap/ui/mdc/Table","sap/fe/macros/DelegateUtil","sap/ui/model/Filter"],function(T,X,a,F,J,C,S,b,c,d,M,D,e){"use strict";var f="sap_fe_TableDelegate_propertyInfoMap";var O=Object.assign({},T);function _(p,L,j){var s=L?p.lastIndexOf("/"):p.indexOf("/");if(s===-1){return p;}return j?p.substring(s+1,p.length):p.substring(0,s);}function g(B,N,o){var s=true,o,j=B.getModel(),p=B.getPath(),q=j.createBindingContext(p+"/"+N);if(o&&(o.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"||o.$Type==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation")){s=false;}var L=C.getLabel(q),r=null,P=C.getIdentifyingName(q),G=_(P,true),I=G!=P,t=I?C.getLabel(B,G):null,u=C.isPropertyFilterable(P,{context:q},o),v=q.getProperty("$kind")&&q.getProperty("$Type"),H=v&&q.getProperty("@com.sap.vocabularies.UI.v1.Hidden"),w=v&&v.indexOf("Edm.")!==0;return{name:P,path:P,metadataPath:N,groupLabel:t,group:I?G:null,label:L,description:r||L,maxLength:q.$MaxLength,precision:q.$Precision,scale:q.$Scale,type:q.$Type,filterable:u,sortable:s,visible:!H&&!w};}function h(K){return function(p){return p.name===K;};}function i(B){var s=B.getPath(),o=B.getModel();return o.requestObject(s+"/@com.sap.vocabularies.UI.v1.LineItem").then(function(L){return L.map(function(j,I){switch(j.$Type){case"com.sap.vocabularies.UI.v1.DataFieldForAction":case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":if(j.Inline){return g(B,"@com.sap.vocabularies.UI.v1.LineItem/"+I,j);}break;case"com.sap.vocabularies.UI.v1.DataField":case"com.sap.vocabularies.UI.v1.DataFieldDefault":return g(B,"@com.sap.vocabularies.UI.v1.LineItem/"+I,o);case"com.sap.vocabularies.UI.v1.DataFieldWithUrl":case"com.sap.vocabularies.UI.v1.DataPoint":case"com.sap.vocabularies.UI.v1.DataFieldForAnnotation":default:return null;}}).filter(function(p){return!!p;}).filter(function(p,I,A){return!A.slice(0,I).some(h(p.name));});});}function k(B,o){var j=o.createBindingContext(B);return i(j).then(function(p){return Promise.all([D.fetchPropertiesForEntity(B,o),D.fetchAnnotationsForEntity(B,o)]).then(function(r){if(!r[0]&&!r[1]){return Promise.resolve(p);}var E=r[0],q=r[1],s=q["@Org.OData.Capabilities.V1.SortRestrictions"]||{},N=(s["NonSortableProperties"]||[]).map(function(u){return u["$PropertyPath"];}),t,P;for(var K in E){t=E[K];if(t&&t.$kind==="Property"){P=p.find(h(K));if(!P){P=g(j,K);p.push(P);}P.sortable=P.sortable&&N.indexOf(K)===-1;}}return p;});});}function l(t,j){if(t instanceof window.Element){return;}D.setCustomData(t,f,j);}function m(t){if(t instanceof window.Element){return null;}return D.getCustomData(t,f);}function n(t,E,o){var j=m(t);if(j){return Promise.resolve(j);}return k(E,o).then(function(j){j=j&&j.filter(function(p){return p.visible;});l(t,j);return j;});}O.rebindTable=function(t,B,s){var u;var q=t.data("quickFilterKey");if(t.data("unboundIBNActions")){u=t.data("unboundIBNActions").split(",");}if(!t.getModel("actionsVisibility")&&u){var o=new J();for(var j=0;j<u.length;j++){o.setProperty("/"+u[j],false);}t.setModel(o,"actionsVisibility");c.updateDataFiledForIBNButtonsVisibility(o);}if(q){var p=B.filters&&t.getFilter()?[B.filters]:[],r=d.getFiltersInfoforSV(t,q),v=p.concat(r.filters);B.filters=new e({filters:v,and:true});}if(s){B.parameters.$search=s;}else{delete B.parameters.$search;}var w=t.getModel("localUI");var x=t.getId().split("--")[1];if(w){w.setProperty("/$contexts/"+x+"/deleteEnabled",false);w.setProperty("/$contexts/"+x+"/numberOfSelectedContexts",0);w.setProperty("/$contexts/"+x+"/selectedContexts",[]);w.setProperty("/$contexts/"+x+"/deletableContexts",[]);}T.rebindTable(t,B,s);};O.fetchProperties=function(t){return D.fetchModel(t).then(function(o){if(!o){return[];}return n(t,t.data("targetCollectionName"),o.getMetaModel());});};O.updateBindingInfo=function(o,B){if(B.binding&&!B.binding.isSuspended()){B.suspended=false;}T.updateBindingInfo.call(T,o,B);};O.beforeAddColumnFlex=function(p,t,P){var o=P.appComponent&&P.appComponent.getModel().getMetaModel(),j=P.modifier,I=j.targets==="xmlTree",s=j.getId(t),q=(!I&&P.view&&P.view.getController())||undefined,r,v,u,w,x,y,z;if(!o){return Promise.resolve(null);}r=D.getCustomData(t,"targetCollectionName");u=o.createBindingContext(r);return n(t,r,o).then(function(A){y=A.find(h(p));x=o.createBindingContext(r+"/"+y.metadataPath);z={sPropertyName:p,sBindingPath:r,sVHIdPrefix:"TableValueHelp",oControl:t,oMetaModel:o,oModifier:j};v=Promise.all([D.isValueHelpRequired(z),D.doesValueHelpExist(z)]).then(function(R){var V=R[0],G=R[1];if(V&&!G){return B("sap.fe.macros.table.ValueHelp");}return Promise.resolve();});function B(G){var H=new J({id:s}),K={bindingContexts:{"collection":u,"item":x,"this":H.createBindingContext("/")},models:{"this":H,"collection":o,"item":o}};return D.templateControlFragment(G,K,undefined,j.targets==="xmlTree").then(function(v){if(v){j.insertAggregation(t,"dependents",v,0);}});}function E(G,H){var K=new J({editMode:"{"+D.getCustomData(t,"editModePropertyBinding")+"}",onCallAction:D.getCustomData(t,"onCallAction"),tableType:D.getCustomData(t,"tableType"),onChange:D.getCustomData(t,"onChange"),parentControl:"Table",onDataFieldForIBN:D.getCustomData(t,"onDataFieldForIBN"),id:s,navigationPropertyPath:p}),L={bindingContexts:{"collection":u,"dataField":x,"this":K.createBindingContext("/")},models:{"this":K,"collection":o,"dataField":o}};return D.templateControlFragment(G,L,H,j.targets==="xmlTree");}w=v.then(E.bind(this,"sap.fe.macros.table.ColumnProperty",q));return w;});};return O;},false);

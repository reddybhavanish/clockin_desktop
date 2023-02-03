/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/mdc/TableDelegate","sap/ui/mdc/FilterBarDelegate","sap/ui/core/XMLTemplateProcessor","sap/ui/core/util/XMLPreprocessor","sap/ui/core/Fragment","sap/ui/core/Element","sap/ui/model/json/JSONModel","sap/fe/macros/CommonHelper","sap/fe/core/helpers/StableIdHelper","sap/fe/macros/field/FieldHelper","sap/base/util/ObjectPath","sap/ui/mdc/odata/v4/FieldBaseDelegate","sap/ui/model/odata/type/String","sap/fe/macros/ResourceModel","sap/base/util/merge"],function(T,F,X,a,b,C,J,c,S,d,O,e,f,R,m){"use strict";var D={},N="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1";function _(){this.control.detachModelContextChange(_,this);var M=this.modelName,o=this.control.getModel(M);if(o){this.resolve(o);}else{this.control.attachModelContextChange(_,this);}}D.getCustomData=function(o,p){if(o&&p){if(o instanceof window.Element){return o.getAttributeNS(N,p);}if(o.data instanceof Function){return o.data(p);}}return undefined;};D.setCustomData=function(o,p,v){if(o&&p){if(o instanceof window.Element){return o.setAttributeNS(N,"customData:"+p,v);}if(o.data instanceof Function){return o.data(p,v);}}};D.fetchPropertiesForEntity=function(E,M){return M.requestObject(E+"/");};D.fetchAnnotationsForEntity=function(E,M){return M.requestObject(E+"@");};D.fetchModel=function(o){return new Promise(function(r,g){var M=o.getDelegate().payload&&o.getDelegate().payload.modelName,h={modelName:M,control:o,resolve:r};_.call(h);});};D.templateControlFragment=function(s,p,o,i){return Promise.resolve(a.process(X.loadTemplate(s,"fragment"),{name:s},p)).then(function(g){var h=g.firstElementChild;if(i&&h){return h;}return b.load({definition:g,controller:o});});};D.doesValueHelpExist=function(p){var P=p.sPropertyName||"",v=p.sVHIdPrefix||"",M=p.oMetaModel,o=p.oModifier,s=p.sBindingPath+"/"+P,g=M.createBindingContext(s),V=d.valueHelpProperty(g),G=S.generate([S.generate([o.getId(p.oControl),v]),P]);if(V.indexOf("$Path")>-1){V=M.getObject(V);}if(s!==V){G=S.generate([G,V]);}return Promise.resolve(o.getAggregation(p.oControl,"dependents").some(function(h){return o.getId(h)===G;}));};D.isValueHelpRequired=function(p){var P=p.sPropertyName||"",M=p.oMetaModel,s=p.sBindingPath+"/"+P;return Promise.all([M.requestObject(s+"@com.sap.vocabularies.Common.v1.ValueListReferences"),M.requestObject(s+"@com.sap.vocabularies.Common.v1.ValueListMapping"),M.requestObject(s+"@com.sap.vocabularies.Common.v1.ValueList")]).then(function(r){return r[0]||r[1]||r[2];});};return D;});

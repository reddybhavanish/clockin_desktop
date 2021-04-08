/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare('sap.apf.modeler.core.instance');(function(){'use strict';jQuery.sap.require('sap.ui.thirdparty.datajs');jQuery.sap.require('sap.apf.utils.hashtable');jQuery.sap.require('sap.apf.core.constants');jQuery.sap.require('sap.apf.core.messageHandler');jQuery.sap.require('sap.apf.core.sessionHandler');jQuery.sap.require('sap.apf.core.representationTypes');jQuery.sap.require('sap.apf.core.entityTypeMetadata');jQuery.sap.require('sap.apf.core.configurationFactory');jQuery.sap.require('sap.apf.core.utils.uriGenerator');jQuery.sap.require('sap.apf.core.metadata');jQuery.sap.require('sap.apf.core.metadataFacade');jQuery.sap.require('sap.apf.core.metadataProperty');jQuery.sap.require('sap.apf.core.messageDefinition');jQuery.sap.require('sap.apf.core.metadataFactory');jQuery.sap.require('sap.apf.core.odataProxy');jQuery.sap.require('sap.apf.cloudFoundry.modelerProxy');jQuery.sap.require('sap.apf.cloudFoundry.ajaxHandler');jQuery.sap.require('sap.apf.utils.proxyTextHandlerForLocalTexts');jQuery.sap.require('sap.apf.core.ajax');jQuery.sap.require('sap.apf.core.odataRequest');jQuery.sap.require('sap.apf.modeler.core.messageDefinition');jQuery.sap.require('sap.apf.modeler.core.textHandler');jQuery.sap.require('sap.apf.modeler.core.textPool');jQuery.sap.require('sap.apf.modeler.core.applicationHandler');jQuery.sap.require('sap.apf.modeler.core.configurationHandler');jQuery.sap.require('sap.apf.modeler.core.configurationEditor');jQuery.sap.require('sap.apf.modeler.core.step');jQuery.sap.require('sap.apf.modeler.core.hierarchicalStep');jQuery.sap.require('sap.apf.modeler.core.smartFilterBar');jQuery.sap.require('sap.apf.modeler.core.facetFilter');jQuery.sap.require('sap.apf.modeler.core.navigationTarget');jQuery.sap.require('sap.apf.modeler.core.elementContainer');jQuery.sap.require('sap.apf.modeler.core.representation');jQuery.sap.require('sap.apf.modeler.core.configurationObjects');jQuery.sap.require('sap.apf.modeler.core.elementContainer');jQuery.sap.require('sap.apf.utils.parseTextPropertyFile');jQuery.sap.require('sap.apf.modeler.core.lazyLoader');jQuery.sap.require('sap.apf.modeler.core.registryWrapper');jQuery.sap.require('sap.apf.utils.startParameter');jQuery.sap.require('sap.apf.core.utils.fileExists');jQuery.sap.require('sap.apf.core.utils.annotationHandler');sap.apf.modeler.core.Instance=function(p,a){var t=this;var A,b,C,c,d,e,S,H,f,F,N,R,E,g,h,j,M,k,l,m,n,L,o,q,P,r,s,u,v,w,x,y,z,B,D,O,G,I,J,K,Q,T;var U=[];var V;var W;A=(a&&a.constructors&&a.constructors.ApplicationHandler)||sap.apf.modeler.core.ApplicationHandler;C=(a&&a.constructors&&a.constructors.ConfigurationHandler)||sap.apf.modeler.core.ConfigurationHandler;c=(a&&a.constructors&&a.constructors.ConfigurationEditor)||sap.apf.modeler.core.ConfigurationEditor;d=(a&&a.constructors&&a.constructors.ConfigurationObjects)||sap.apf.modeler.core.ConfigurationObjects;e=(a&&a.constructors&&a.constructors.ConfigurationFactory)||sap.apf.core.ConfigurationFactory;E=(a&&a.constructors&&a.constructors.ElementContainer)||sap.apf.modeler.core.ElementContainer;S=(a&&a.constructors&&a.constructors.Step)||sap.apf.modeler.core.Step;H=(a&&a.constructors&&a.constructors.HierarchicalStep)||sap.apf.modeler.core.HierarchicalStep;f=(a&&a.constructors&&a.constructors.SmartFilterBar)||sap.apf.modeler.core.SmartFilterBar;F=(a&&a.constructors&&a.constructors.FacetFilter)||sap.apf.modeler.core.FacetFilter;N=(a&&a.constructors&&a.constructors.NavigationTarget)||sap.apf.modeler.core.NavigationTarget;R=(a&&a.constructors&&a.constructors.Representation)||sap.apf.modeler.core.Representation;h=(a&&a.constructors&&a.constructors.Hashtable)||sap.apf.utils.Hashtable;j=(a&&a.constructors&&a.constructors.RegistryProbe)||sap.apf.modeler.core.RegistryWrapper;L=(a&&a.constructors&&a.constructors.LazyLoader)||sap.apf.modeler.core.LazyLoader;M=(a&&a.constructors&&a.constructors.Metadata)||sap.apf.core.Metadata;k=(a&&a.constructors&&a.constructors.EntityTypeMetadata)||sap.apf.core.EntityTypeMetadata;l=(a&&a.constructors&&a.constructors.MetadataFacade)||sap.apf.core.MetadataFacade;m=(a&&a.constructors&&a.constructors.MetadataProperty)||sap.apf.core.MetadataProperty;n=(a&&a.constructors&&a.constructors.MetadataFactory)||sap.apf.core.MetadataFactory;o=(a&&a.constructors&&a.constructors.StartParameter)||sap.apf.utils.StartParameter;q=(a&&a.constructors&&a.constructors.AnnotationHandler)||sap.apf.core.utils.AnnotationHandler;g=(a&&a.constructors&&a.constructors.FileExists)||sap.apf.core.utils.FileExists;P=(a&&a.constructors&&a.constructors.ProxyTextHandlerForLocalTexts)||sap.apf.utils.ProxyTextHandlerForLocalTexts;b=(a&&a.constructors&&a.constructors.AjaxHandler||sap.apf.cloudFoundry.AjaxHandler);W=(a&&a.instances&&a.instances.datajs)||OData;if(a&&a.constructors&&a.constructors.TextHandler){r=new a.constructors.TextHandler();}else{r=new sap.apf.modeler.core.TextHandler();}if(a&&a.constructors&&a.constructors.MessageHandler){s=new a.constructors.MessageHandler(true);}else{s=new sap.apf.core.MessageHandler(true);}s.activateOnErrorHandling(true);s.loadConfig(sap.apf.core.messageDefinition);s.loadConfig(sap.apf.modeler.core.messageDefinition);s.setTextResourceHandler(r);if(a&&a.instances&&a.instances.component){T={};T.baseManifest=sap.apf.modeler.Component.prototype.getMetadata().getManifest();T.manifest=jQuery.extend({},true,a.instances.component.getMetadata().getManifest());}v=new o(a&&a.instances&&a.instances.component,T);this.getStartParameterFacade=function(){return v;};this.ajax=function(i){var c1=jQuery.extend(true,{},i);c1.functions=c1.functions||{};c1.functions.getSapSystem=v.getSapSystem;if(a&&a.functions&&a.functions.ajax){c1.functions.ajax=a.functions.ajax;}c1.instances={messageHandler:s};return sap.apf.core.ajax(c1);};var X=new P({instances:{messageHandler:s}});y={manifests:T,instances:{messageHandler:s,coreApi:this,proxyTextHandlerForLocalTexts:X}};var Y=a&&a.functions&&a.functions.isUsingCloudFoundryProxy&&a.functions.isUsingCloudFoundryProxy();if(Y){B={instances:{messageHandler:s},functions:{coreAjax:this.ajax}};y.instances.ajaxHandler=new b(B);}if(a&&a.constructors&&a.constructors.PersistenceProxy){w=new a.constructors.PersistenceProxy(p,y);}else{if(Y){w=new sap.apf.cloudFoundry.modelerProxy.ModelerProxy(p,y);}else if(T&&T.manifest["sap.apf"]&&T.manifest["sap.apf"].activateLrep){w=new sap.apf.core.LayeredRepositoryProxy(p,y);}else{w=new sap.apf.core.OdataProxy(p,y);}}if(a&&a.constructors&&a.constructors.SessionHandler){u=new a.constructors.SessionHandler(y);}else{u=new sap.apf.core.SessionHandler(y);}var Z={functions:{getSapSystem:v.getSapSystem,getComponentNameFromManifest:sap.apf.utils.getComponentNameFromManifest,getODataPath:sap.apf.core.utils.uriGenerator.getODataPath,getBaseURLOfComponent:sap.apf.core.utils.uriGenerator.getBaseURLOfComponent,addRelativeToAbsoluteURL:sap.apf.core.utils.uriGenerator.addRelativeToAbsoluteURL},instances:{fileExists:new g({functions:{ajax:this.ajax,getSapSystem:v.getSapSystem}})}};var $=new q(Z);z={constructors:{EntityTypeMetadata:k,Hashtable:h,Metadata:M,MetadataFacade:l,MetadataProperty:m},functions:{getServiceDocuments:function(){return[p.serviceRoot];},getSapSystem:v.getSapSystem},instances:{messageHandler:s,coreApi:t,annotationHandler:$},deactivateFatalError:true};x=new n(z);D={constructors:{Hashtable:h},instances:{messageHandler:s}};this.getCatalogServiceUri=a&&a.functions&&a.functions.getCatalogServiceUri;O=(a&&a.functions&&a.functions.odataRequestWrapper)||sap.apf.core.odataRequestWrapper;this.odataRequest=function(i,c1,d1,e1){var f1={instances:{datajs:W},functions:{getSapSystem:v.getSapSystem}};O(f1,i,c1,d1,e1);};this.checkForTimeout=function(i){var c1=sap.apf.core.utils.checkForTimeout(i);if(c1){s.putMessage(c1);}return c1;};this.getEntityTypeMetadataAsPromise=function(i,c1){return x.getEntityTypeMetadata(i,c1);};this.getEntityTypeMetadata=this.getEntityTypeMetadataAsPromise;this.getXsrfToken=function(i){return u.getXsrfToken(i);};this.getUriGenerator=function(){return sap.apf.core.utils.uriGenerator;};this.getText=function(i,c1){return r.getText(i,c1);};this.putMessage=function(i){return s.putMessage(i);};this.check=function(i,c1,d1){return s.check(i,c1,d1);};this.createMessageObject=function(i){return s.createMessageObject(i);};this.setCallbackForMessageHandling=function(i){s.setMessageCallback(i);};this.isUsingCloudFoundryProxy=function(){return Y||false;};this.isVendorContentAvailable=function(){if(v.isLrepActive()||(Y&&this.getGenericExit("hasVendorContent")&&this.getGenericExit("hasVendorContent")())){return true;}return false;};this.importConfigurationFromVendorLayer=function(i,c1,d1,e1){if(Y){this.getApplicationHandler(function(f1,g1){if(g1){e1(undefined,undefined,g1);return;}w.importVendorContent(i,c1,d1,e1,f1.registerApplicationCreatedOnServer);});}else{_(i,c1,d1,e1);}};function _(c1,d1,e1,f1){var g1;w.readAllConfigurationsFromVendorLayer().then(function(n1){var o1=c1+'.'+d1;var i;for(i=0;i<n1.length;i++){if(n1[i].value===o1){g1=n1[i].applicationText;break;}}t.getApplicationHandler(h1);});function h1(i,n1){if(n1){f1(undefined,undefined,n1);return;}var o1=false;var p1=i.getApplication(c1);if(!p1){o1=true;}var q1={ApplicationName:g1};i.setAndSave(q1,i1,c1,o1);}function i1(i,n1,o1){if(o1){f1(d1,undefined,o1);return;}j1();}function j1(){var i=new sap.apf.core.utils.Filter(s,'Language','eq',sap.apf.core.constants.developmentLanguage);var n1=new sap.apf.core.utils.Filter(s,'Application','eq',c1);n1.addAnd(i);w.readCollection("texts",k1,undefined,undefined,n1,{layer:"VENDOR"});}function k1(i,n1,o1){if(o1){f1(d1,undefined,o1);return;}a1(i,c1,l1);}function l1(i){if(i){f1(d1,undefined,i);return;}w.readEntity("configuration",m1,[{value:d1}],undefined,c1,{layer:"VENDOR"});}function m1(i,n1,o1){if(o1){f1(undefined,n1,o1);return;}var p1=JSON.parse(i.SerializedAnalyticalConfiguration);b1(p1,e1,f1);}}function a1(i,c1,d1){t.getApplicationHandler(f1);function e1(g1,h1,i1){var j1;var k1;if(i1){d1(i1);}else{j1={instances:{messageHandler:s,persistenceProxy:w},constructors:{Hashtable:h},isUsingCloudFoundryProxy:Y};k1=new sap.apf.modeler.core.TextPool(j1,c1,g1);k1.addTextsAndSave(i,d1,c1);}}function f1(g1,h1){if(h1){d1(h1);return;}var i1;var j1=g1.getApplication(c1);if(!j1){i1=s.createMessageObject({code:11021});d1(i1);return;}if(J&&J.getId()===c1){J.getInstance().getTextPool().addTextsAndSave(i,d1,c1);}else{var k1=new sap.apf.core.utils.Filter(s,'Application','eq',c1);var l1=new sap.apf.core.utils.Filter(s,'Language','eq',sap.apf.core.constants.developmentLanguage);l1.addAnd(k1);w.readCollection("texts",e1,undefined,undefined,l1);}}}this.importTexts=function(c1,d1){var e1;var f1;var i;var g1=sap.apf.utils.parseTextPropertyFile(c1,{instances:{messageHandler:s}});if(g1.Messages.length>0){e1=s.createMessageObject({code:11020});f1=g1.Messages.length;for(i=0;i<f1-1;i++){g1.Messages[i+1].setPrevious(g1.Messages[i]);}e1.setPrevious(g1.Messages[f1-1]);d1(e1);}else{a1(g1.TextElements,g1.Application,d1);}};function b1(i,c1,d1){var e1=i.configHeader;t.getApplicationHandler(f1);function f1(j1,k1){if(k1){d1(undefined,undefined,k1);return;}var l1=false;var m1=j1.getList();m1.forEach(function(o1){if(o1.Application===e1.Application){l1=true;}});if(l1){t.getConfigurationHandler(e1.Application,h1);}else{var n1={ApplicationName:e1.ApplicationName,SemanticObject:e1.SemanticObject};j1.setAndSave(n1,g1,e1.Application,true);}}function g1(j1,k1,l1){if(l1){d1(undefined,undefined,l1);return;}t.getConfigurationHandler(e1.Application,h1);}function h1(j1,k1){if(k1){d1(undefined,undefined,k1);return;}var l1=jQuery.extend({},i,true);delete l1.configHeader;var m1=false;var n1=j1.getList();n1.forEach(function(r1){if(r1.AnalyticalConfiguration===e1.AnalyticalConfiguration){m1=true;}});if(m1){c1(p1,q1,e1.AnalyticalConfigurationName);}else{j1.setConfiguration({AnalyticalConfigurationName:e1.AnalyticalConfigurationName},e1.AnalyticalConfiguration);var o1={id:e1.AnalyticalConfiguration,creationDate:e1.CreationUTCDateTime,lastChangeDate:e1.LastChangeUTCDateTime,content:l1};j1.loadConfiguration(o1,i1);}function p1(){j1.setConfiguration({AnalyticalConfigurationName:e1.AnalyticalConfigurationName},e1.AnalyticalConfiguration);var o1={updateExisting:true,id:e1.AnalyticalConfiguration,creationDate:e1.CreationUTCDateTime,lastChangeDate:e1.LastChangeUTCDateTime,content:l1};j1.loadConfiguration(o1,i1);}function q1(r1){if(r1&&r1!==""){e1.AnalyticalConfigurationName=r1;}var s1=j1.setConfiguration({AnalyticalConfigurationName:e1.AnalyticalConfigurationName});var t1={id:s1,content:l1};j1.loadConfiguration(t1,i1);}}function i1(j1,k1){if(k1){d1(undefined,undefined,k1);return;}j1.save(d1);}}this.importConfiguration=function(i,c1,d1){var e1=JSON.parse(i);if(!f1(e1,d1)){return;}b1(e1,c1,d1);function f1(e1,d1){var g1=[],h1=true,i1;if(!sap.apf.utils.isValidGuid(e1.configHeader.Application)){g1.push(s.createMessageObject({code:11037,aParameters:[e1.configHeader.Application]}));h1=false;}if(!sap.apf.utils.isValidGuid(e1.configHeader.AnalyticalConfiguration)){g1.push(s.createMessageObject({code:11038,aParameters:[e1.configHeader.AnalyticalConfiguration]}));h1=false;}i1=sap.apf.modeler.core.ConfigurationObjects.getTextKeysFromConfiguration(e1);i1.forEach(function(j1){var k1=new h(s);if(!k1.hasItem(j1)){k1.setItem(j1,j1);if(!sap.apf.utils.isValidGuid(j1)){g1.push(s.createMessageObject({code:11039,aParameters:[j1]}));h1=false;}}});if(h1){return h1;}g1.forEach(function(j1,k1,g1){if(k1){j1.setPrevious(g1[k1-1]);}});d1(i,undefined,g1[g1.length-1]);return h1;}};this.getApplicationHandler=function(i){if(!I){var c1=(a&&a.functions&&a.functions.loadApplicationHandler)||d1;I=new L(D,c1);}I.asyncGetInstance("ApplicationHandlerId",i);function d1(id,e1){new A({instances:{messageHandler:s,persistenceProxy:w},constructors:{Hashtable:h},functions:{resetConfigurationHandler:g1}},f1);function f1(h1,i1){e1(id,h1,i1);}function g1(h1){if(J&&J.getId()===h1){J.getInstance().removeAllConfigurations();J.reset();}}}};this.getConfigurationHandler=function(i,c1){if(!J){G=(a&&a.functions&&a.functions.loadConfigurationHandler)||d1;J=new L(D,G);}J.asyncGetInstance(i,c1);function d1(i,e1,f1){var g1=new sap.apf.core.utils.Filter(s,'Application','eq',i);var h1=new sap.apf.core.utils.Filter(s,'Language','eq',sap.apf.core.constants.developmentLanguage);h1.addAnd(g1);var i1=[];var j1=["AnalyticalConfiguration","AnalyticalConfigurationName","Application","CreatedByUser","CreationUTCDateTime","LastChangeUTCDateTime","LastChangedByUser"];i1.push({entitySetName:"configuration",filter:g1,selectList:j1});i1.push({entitySetName:'texts',filter:h1});w.readCollectionsInBatch(i1,k1);function k1(l1,m1){var n1,o1;var p1;var q1;var r1=f1;if(m1){e1(i,undefined,m1);}else{p1=l1[0];q1=l1[1];o1={instances:{messageHandler:s,persistenceProxy:w},constructors:{Hashtable:h},isUsingCloudFoundryProxy:Y};n1=new sap.apf.modeler.core.TextPool(o1,i,q1);if(!r1){r1=new C({instances:{messageHandler:s,persistenceProxy:w,coreApi:t,metadataFactory:x},constructors:{ConfigurationEditor:c,ConfigurationFactory:e,ConfigurationObjects:d,ElementContainer:E,EntityTypeMetadata:k,SmartFilterBar:f,FacetFilter:F,NavigationTarget:N,Hashtable:h,Representation:R,RegistryProbe:j,Step:S,HierarchicalStep:H,LazyLoader:L},functions:{getApplication:I.getInstance().getApplication}});}r1.setApplicationIdAndContext(i,p1,n1);e1(i,r1,m1);}}}};this.getUnusedTextKeys=function(i,c1){var d1={instances:{messageHandler:s,persistenceProxy:w},constructors:{Hashtable:h}};var e1=new d(d1);var f1=null,g1=null,h1=null;e1.getTextKeysFromAllConfigurations(i,function(j1,k1){if(g1){return;}f1=j1;g1=k1;if(k1||h1){i1();}});this.getConfigurationHandler(i,function(j1,k1){if(g1){return;}h1=j1;g1=k1;if(k1||f1){i1();}});function i1(){var j1=[];if(g1){c1(undefined,g1);return;}h1.getTextPool().getTextKeys().forEach(function(k1){if(!f1.hasItem(k1)){j1.push(k1);}});c1(j1,undefined);}};this.resetConfigurationHandler=function(){if(J){J.reset();}};this.getRepresentationTypes=function(){var i=sap.apf.core.representationTypes();var c1=[];jQuery.extend(true,c1,i);return c1;};this.getAllAvailableSemanticObjects=function(i){if(Q){i(Q,V);return;}if(V){i([],V);return;}U.push(i);if(U.length===1){var c1={requestUri:"/sap/opu/odata/UI2/INTEROP/SemanticObjects?$format=json&$select=id,text",method:"GET",isSemanticObjectRequest:true};t.odataRequest(c1,d1,e1);}function d1(f1,g1){Q=f1.results;U.forEach(function(h1){h1(f1.results,undefined);});}function e1(f1){var g1;if(f1&&f1.messageObject){g1=f1.messageObject;}else{s.createMessageObject({code:"11041"});Q=[];}V=g1;U.forEach(function(h1){h1([],g1);});}};this.getSemanticActions=function(c1){var d1;var e1=jQuery.Deferred();if(!K){K=new h(s);}d1=K.getItem(c1);if(d1){e1.resolve(d1);return e1.promise();}t.getAllAvailableSemanticObjects(f1);return e1.promise();function f1(g1,h1){if(h1){e1.reject(h1);return;}var i1=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService("CrossApplicationNavigation");var j1={id:c1,text:""};var i;for(i=0;i<g1.length;i++){if(g1[i].id===c1){j1=g1[i];break;}}if(!i1){s.createMessageObject({code:"5038"});var k1={semanticObject:j1,semanticActions:[]};K.setItem(c1,k1);e1.resolve(k1);}else{i1.getLinks({semanticObject:j1.id,ignoreFormFactor:true,ui5Component:a.instances.component}).done(function(l1){var m1=[];l1.forEach(function(n1){var o1=n1.intent.split("-");var p1=o1[1].split("?");p1=p1[0].split("~");m1.push({id:p1[0],text:n1.text});});var k1={semanticObject:j1,semanticActions:m1};K.setItem(c1,k1);e1.resolve(k1);}).fail(function(){e1.reject(s.createMessageObject({code:"11042"}));});}}};this.navigateToGenericRuntime=function(i,c1,d1){var e1;if(a&&a.exits&&a.exits.getRuntimeUrl&&jQuery.isFunction(a.exits.getRuntimeUrl)){e1=a.exits.getRuntimeUrl(i,c1);}else{var f1=sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getService("CrossApplicationNavigation");var g1={};if(t.getStartParameterFacade().isLrepActive()){g1['sap-apf-configuration-id']=i+'.'+c1;}else{g1['sap-apf-configuration-id']=c1;}var h1=f1.hrefForExternal({target:a.functions.getNavigationTargetForGenericRuntime(),params:g1});var i1=jQuery(location).attr('href');var j1=i1.split('#')[0];e1=j1+h1;}d1(e1);};this.readAllConfigurationsFromVendorLayer=function(){return w.readAllConfigurationsFromVendorLayer();};this.showSemanticObject=function(){if(v.isLrepActive()||Y){return false;}return true;};this.getGenericExit=function(i){if(a&&a.exits&&a.exits[i]&&typeof a.exits[i]==='function'){return a.exits[i];}return undefined;};this.getComponent=function(){return a&&a.instances&&a.instances.component;};if(a&&a.probe&&typeof a.probe==='function'){a.probe({constructors:{ApplicationHandler:A,ConfigurationHandler:C,ConfigurationEditor:c,ConfigurationObjects:d,ConfigurationFactory:e,MetadataFactory:n,Metadata:M,EntityTypeMetadata:k,MetadataFacade:l,MetadataProperty:m,Step:S,HierarchicalStep:H,SmartFilterBar:f,FacetFilter:F,NavigationTarget:N,Representation:R,ElementContainer:E,Hashtable:h,LazyLoader:L,AnnotationHandler:q,ProxyTextHandlerForLocalTexts:P,RegistryProbe:j},textHandler:r,messageHandler:s,sessionHandler:u,persistenceProxy:w,metadataFactory:x,injectForFollowUp:y,injectMetadataFactory:z,fnOdataRequestWrapper:O,proxyTextHandlerForLocalTexts:X,ajax:this.ajax,odataRequestWrapper:O,annotationHandler:$});}};}());

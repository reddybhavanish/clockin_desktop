//@ui5-bundle sap/ushell/plugins/appwarmup/Component-preload.js
// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.predefine('sap/ushell/plugins/appwarmup/Component',["sap/ui/core/Component","sap/ui/core/mvc/Controller","sap/ui/core/service/ServiceFactory","sap/ui/core/service/ServiceFactoryRegistry","./ShellUIService","sap/base/Log"],function(C,a,S,b,c,L){"use strict";var g=sap.ui.require.toUrl("sap/ushell/plugins/ghostapp");var p={"name":"sap.ushell.plugins.ghostapp","manifest":true,"asyncHints":{"libs":[{"name":"sap.m"},{"name":"sap.ui.core"},{"name":"sap.f"},{"name":"sap.suite.ui.generic.template"},{"name":"sap.ui.comp"},{"name":"sap.ui.fl"},{"name":"sap.ui.generic.app"},{"name":"sap.ui.generic.template"},{"name":"sap.ui.table"},{"name":"sap.ui.unified"},{"name":"sap.uxap"},{"name":"sap.ui.layout"}],"cacheTokens":{"dataSources":{"/ghostapp-c9f1f0bd-ff78-4660-9a1f-295814f00fe0/":"20180613155243"}},"requests":[{"name":"sap.ui.fl.changes","reference":"sap.ushell.plugins.ghostapp.Component"}],"waitFor":{}},"id":"sap.ushell.plugins.ghostapp","componentData":{"startupParameters":{},"technicalParameters":{}},"async":true};var s="sap.ushell.plugins.appwarmup.Component";return C.extend(s,{metadata:{version:"1.78.0",library:"sap.ushell"},doWarmUp:function(){var P=[];P.push(new Promise(function(r,d){sap.ui.require(["sap/ui/model/odata/ODataMetadata"],function(O){var o=O.prototype._loadMetadata;O.prototype._loadMetadata=function(u,e){if(this.sUrl&&this.sUrl.startsWith("/ghostapp-c9f1f0bd-ff78-4660-9a1f-295814f00fe0/$metadata")){this.sUrl=g+"/metadata.xml";O.prototype._loadMetadata=o;}return o.call(this,u,e);};r();},d);}));Promise.all(P).then(function(){b.register("sap.ushell.plugins.appwarmup.ShellUIService",new S(c));return C.create(p);}).then(function(d){var h=document.createElement("div");h.style.visibility="hidden";document.body.appendChild(h);sap.ui.require(["sap/ui/core/ComponentContainer"],function(e){var f=new e();f.setComponent(d);f.placeAt(h);f.addEventDelegate({onAfterRendering:function(){setTimeout(function(){f.destroy();},5000);}});});}).catch(function(){L.error("GhostApp component could not be created",null,this);});},init:function(){this.doWarmUp();}});});
/* the subsequent text seems not to contain a copyright or license statement */
sap.ui.predefine('sap/ushell/plugins/appwarmup/ShellUIService',['sap/ui/core/service/Service'],function(S){"use strict";return S.extend("sap.ushell.plugins.appwarmup.ShellUIService",{setTitle:function(){return;},setHierarchy:function(){return;},setBackNavigation:function(){return;},getTitle:function(){return;},setRelatedApps:function(){return;},getUxdVersion:function(){return 1;}});});
sap.ui.require.preload({
	"sap/ushell/plugins/appwarmup/manifest.json":'{"_version":"1.1.0","sap.app":{"_version":"1.1.0","id":"sap.ushell.plugins.appwarmup","type":"component","applicationVersion":{"version":"1.0.0"}},"sap.ui":{"_version":"1.1.0","technology":"UI5","supportedThemes":["sap_hcb","sap_bluecrystal"],"deviceTypes":{"desktop":true,"tablet":false,"phone":false}},"sap.ui5":{"_version":"1.1.0","contentDensities":{"compact":true,"cozy":false},"dependencies":{"minUI5Version":"1.54.0","libs":{"sap.ui.core":{"minVersion":"1.54.0"}}}},"sap.flp":{"type":"plugin"}}'
},"sap/ushell/plugins/appwarmup/Component-preload"
);
//# sourceMappingURL=Component-preload.js.map
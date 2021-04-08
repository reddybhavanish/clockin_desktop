//@ui5-bundle sap/ushell/plugins/rta-personalize/Component-h2-preload.js
// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.predefine('sap/ushell/plugins/rta-personalize/Component',["sap/base/util/UriParameters","sap/m/MessageBox","sap/m/MessageToast","sap/ui/core/Component","sap/ui/fl/Utils","sap/ui/fl/EventHistory","sap/ushell/plugins/BaseRTAPlugin"],function(U,M,a,C,F,E,B){"use strict";var b="PERSONALIZE_Plugin_ActionButton";var R=B.extend("sap.ushell.plugins.rta-personalize.Component",{sType:"rta-personalize",metadata:{manifest:"json",library:"sap.ushell"},init:function(){var c={sComponentName:"sap.ushell.plugins.rta-personalize",layer:"USER",developerMode:false,id:b,text:"PERSONALIZE_BUTTON_TEXT",icon:"sap-icon://edit",visible:false};B.prototype.init.call(this,c);this._checkForEnabledControls();},removePersonalizableControl:function(c){var i=this._aPersonalizableControls.indexOf(c);this._aPersonalizableControls.splice(i,1);this._aOriginalFooterVisibility.splice(i,1);if(this._aPersonalizableControls.length===0){this._oObserver.disconnect();delete this._oObserver;this._adaptButtonVisibility(b,false);}},_checkForEnabledControls:function(){this._aPersonalizableControls=[];this._aOriginalFooterVisibility=[];function c(d){if(this._aPersonalizableControls.indexOf(d)===-1){this._aPersonalizableControls.push(d);this._adaptButtonVisibility(b,this._checkUI5App());}}function o(s,d,v){if(F.checkControlId(v)){var f=this._getControlInstance(v);c.call(this,f);if(!this._oObserver){this._oObserver=new MutationObserver(function(m){this._aPersonalizableControls.forEach(function(p){if(!p.getDomRef()){this.removePersonalizableControl(p);}}.bind(this));}.bind(this));var O={attributes:true,childList:true,characterData:false,subtree:true,attributeFilter:["style","class"]};this._oObserver.observe(window.document,O);}}}sap.ui.getCore().getEventBus().subscribe("sap.ui","ControlForPersonalizationRendered",o,this);var e=E.getHistoryAndStop("ControlForPersonalizationRendered");e.forEach(function(d){o.call(this,d.channelId,d.eventId,d.parameters);}.bind(this));},_getControlInstance:function(e){if(typeof e==="string"){var o=sap.ui.getCore().byId(e);return o||C.get(e);}return e;},_onAppLoaded:function(){var l=this._aPersonalizableControls.length;for(var i=l;i>0;i--){this.removePersonalizableControl(this._aPersonalizableControls[i-1]);}},_onStartHandler:function(e){var i=e.getParameter("editablePluginsCount");if(i!==undefined&&i<=0){M.information(this.i18n.getText("MSG_STARTUP_NO_OVERLAYS"),{onClose:function(){this._stopRta(true,true);}.bind(this)});}},_loadPlugins:function(r){var p=new Promise(function(c){sap.ui.require(["sap/ui/rta/plugin/EasyAdd","sap/ui/rta/plugin/EasyRemove"],function(d,e){var P=r.getDefaultPlugins(),o=P.remove;P.remove=new e({commandFactory:o.getCommandFactory()});var A=P.additionalElements;P.additionalElements=new d({commandFactory:A.getCommandFactory(),analyzer:A.getAnalyzer(),dialog:A.getDialog()});P.contextMenu.setOpenOnClick(false);r.setPlugins(P);c();});});return p;},_onAdapt:function(e){if(!this._checkFlexEnabledOnStart()){this._handleFlexDisabledOnStart();}else if(e.getSource().getText()===this.i18n.getText("PERSONALIZE_BUTTON_TEXT")){var u=U.fromURL(window.location.href),s=u.mParams["sap-ui-layer"]&&u.mParams["sap-ui-layer"][0];if(!s||s==="USER"){e.getSource().setText(this.i18n.getText("END_PERSONALIZE_BUTTON_TEXT"));this._adaptButtonVisibility("RTA_Plugin_ActionButton",false);this._aPersonalizableControls.forEach(function(c){if(c.setShowFooter){this._aOriginalFooterVisibility.push(c.getShowFooter());}else{this._aOriginalFooterVisibility.push(undefined);}}.bind(this));this._adaptFooterVisibility(false);var S=this._getFlpSearchButton();this._bOriginalSearchButtonVisibility=S&&S.getVisible();if(this._bOriginalSearchButtonVisibility){this._adaptButtonVisibility(S,false);}B.prototype._onAdapt.call(this,e);}else{M.information(this.i18n.getText("MSG_STARTUP_WRONG_LAYER"));}}else{this._stopRta(false,true);}},_switchToDefaultMode:function(){sap.ui.getCore().byId(b).setText(this.i18n.getText("PERSONALIZE_BUTTON_TEXT"));this._adaptButtonVisibility("RTA_Plugin_ActionButton",true);this._adaptFooterVisibility(true);if(this._bOriginalSearchButtonVisibility!==undefined){this._adaptButtonVisibility(this._getFlpSearchButton(),this._bOriginalSearchButtonVisibility);delete this._bOriginalSearchButtonVisibility;}a.show(this.i18n.getText("SAVE_SUCCESSFUL"),{duration:4000,offset:"0 -50"});B.prototype._switchToDefaultMode.call(this);},_checkRestartRTA:function(){},_adaptFooterVisibility:function(v){this._aPersonalizableControls.forEach(function(c,i){if(this._aOriginalFooterVisibility[i]){c.setShowFooter(v);}}.bind(this));},_getFlpSearchButton:function(){return this.oRenderer.getRootControl().getOUnifiedShell().getHeader().getHeadEndItems()[0];},_getFLPViewPort:function(){return sap.ui.getCore().byId("viewPortContainer");}});return R;});
sap.ui.require.preload({
	"sap/ushell/plugins/rta-personalize/manifest.json":'{"_version":"1.1.0","sap.app":{"_version":"1.1.0","i18n":"i18n/i18n.properties","id":"sap.ushell.plugins.rta-personalize","title":"{{APP_TITLE}}","type":"component","applicationVersion":{"version":"1.0.0"},"ach":"CA-UI5-FL-RTA","embeddedBy":"../../","resources":"resources.json"},"sap.ui":{"_version":"1.1.0","technology":"UI5","supportedThemes":["sap_hcb","sap_bluecrystal"],"deviceTypes":{"desktop":true,"tablet":false,"phone":false}},"sap.ui5":{"_version":"1.1.0","contentDensities":{"compact":true,"cozy":false},"dependencies":{"minUI5Version":"1.30.1","libs":{"sap.ui.core":{"minVersion":"1.30.1"},"sap.m":{"minVersion":"1.30.1"},"sap.ui.dt":{"minVersion":"1.30.1","lazy":true},"sap.ui.rta":{"minVersion":"1.30.1","lazy":true}}},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}}},"sap.flp":{"type":"plugin"}}'
},"sap/ushell/plugins/rta-personalize/Component-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ushell/plugins/rta-personalize/Component.js":["sap/base/util/UriParameters.js","sap/m/MessageBox.js","sap/m/MessageToast.js","sap/ui/core/Component.js","sap/ui/fl/EventHistory.js","sap/ui/fl/Utils.js","sap/ushell/plugins/BaseRTAPlugin.js"]
}});
//# sourceMappingURL=Component-h2-preload.js.map
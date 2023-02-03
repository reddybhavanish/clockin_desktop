// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/PluginManager","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/ushell/appRuntime/ui5/AppRuntime"],function(P,A,a){"use strict";function b(c,p,s){P.call(this,c,p,s);var o=this.registerPlugins,d=this._handlePluginCreation;this.isPluginAgentSupported=function(S){var e=a.getStartupPlugins();return!!e[S];};this._handlePluginCreation=function(e,f,g){var h=this._oPluginCollection[e][f],i=h.config["sap-plugin-agent-id"];d.call(this,e,f,g);A.sendMessageToOuterShell("sap.ushell.services.pluginManager.status",{name:i,status:"loading"});g.then(function(l){var I=l.componentHandle.getInstance(),j=I.exit;A.sendMessageToOuterShell("sap.ushell.services.pluginManager.status",{name:i,status:"started"});I.exit=function(){j(arguments);A.sendMessageToOuterShell("sap.ushell.services.pluginManager.status",{name:i,status:"exit"});};}).fail(function(E){A.sendMessageToOuterShell("sap.ushell.services.pluginManager.status",{name:i,status:"failed"});});};this.registerPlugins=function(e){o.call(this,e);};}b.prototype=Object.create(P.prototype);b.hasNoAdapter=P.hasNoAdapter;return b;},true);

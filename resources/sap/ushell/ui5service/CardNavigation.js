// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/service/Service","sap/ushell/Config","sap/ushell/services/AppType","sap/base/Log"],function(S,C,A,U){"use strict";var a=S.extend("sap.ushell.ui5service.CardNavigation",{constructor:function(){this.oCrossAppNav=sap.ushell.Container.getService("CrossApplicationNavigation");}});a.prototype.navigate=function(c){var p=c.parameters;if(p.openUI){if(p.openUI==="RecentActivities"||p.openUI==="FrequentActivities"){sap.ui.require(["sap/ushell/ui/QuickAccess"],function(Q){var t=p.openUI==="RecentActivities"?"recentActivityFilter":"frequentlyUsedFilter";Q.openQuickAccessDialog(t);});}else{U.error("Request to open unknown User Interface: '"+p.openUI+"'");}}else if(p.url&&p.url!==""){var l=C.last("/core/shell/enableRecentActivity")&&C.last("/core/shell/enableRecentActivityLogging");if(l){var r={title:p.title,url:p.url,appType:A.URL,appId:p.url};sap.ushell.Container.getRenderer("fiori2").logRecentActivity(r);}window.open(p.url,"_blank");}else{this.oCrossAppNav.toExternal({target:{semanticObject:p.intentSemanticObject,action:p.intentAction},params:p.intentParameters,appSpecificRoute:p.intentAppRoute});}};a.prototype.enabled=function(c){var p=c.parameters;if(p.openUI){if(["RecentActivities","FrequentActivities"].indexOf(p.openUI)>-1){return Promise.resolve(true);}return Promise.resolve(false);}var n={target:{semanticObject:p.intentSemanticObject,action:p.intentAction},params:p.intentParameters};return new Promise(function(r){this.oCrossAppNav.isNavigationSupported([n]).done(function(R){r(R[0].supported);}).fail(function(){r(false);});}.bind(this));};return a;});

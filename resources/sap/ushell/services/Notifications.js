// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/datajs","sap/ui/core/ws/SapPcpWebSocket","sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/model/json/JSONModel","sap/ushell/utils"],function(O,S,q,L,J,u){"use strict";function N(c,p,s){var m=new J(),t=new Date(),o=s&&s.config,r={getNotifications:{},getNotificationsByType:{},getNotificationsInGroup:{},getBadgeNumber:{},resetBadgeNumber:{},getNotificationTypesSettings:{},getNotificationsGroupHeaders:{},getMobileSupportSettings:{},getEmailSupportSettings:{},getWebSocketValidity:{},getNotificationCount:{}},w,W=o.webSocketUrl||"/sap/bc/apc/iwngw/notification_push_apc",P=o.pollingIntervalInSeconds||60,i,a,b,U=[],d=[],f=[],I=false,C=[],g=false,h=false,E=true,H,D,j=5000,k=6000,l=false,n={NOTIFICATIONS:0,NOTIFICATIONS_BY_TYPE:1,GET_BADGE_NUMBER:2,RESET_BADGE_NUMBER:3,GET_SETTINGS:4,GET_MOBILE_SUPPORT_SETTINGS:5,NOTIFICATIONS_GROUP_HEADERS:6,NOTIFICATIONS_IN_GROUP:7,GET_NOTIFICATIONS_COUNT:8,VALIDATE_WEBSOCKET_CHANNEL:9,GET_EMAIL_SUPPORT_SETTINGS:10,NOTIFICATIONS_BY_DATE_DESCENDING:"notificationsByDateDescending",NOTIFICATIONS_BY_DATE_ASCENDING:"notificationsByDateAscending",NOTIFICATIONS_BY_PRIORITY_DESCENDING:"notificationsByPriorityDescending",NOTIFICATIONS_BY_TYPE_DESCENDING:"notificationsByTypeDescending"},M={PACKAGED_APP:0,FIORI_CLIENT:1,WEB_SOCKET:2,POLLING:3},v,F=false,z,A=true,B=false,G=new q.Deferred(),K=new q.Deferred(),Q,R,T=G.promise(),V=false,X={},Y=10,Z=false,$=false,_=[];this.isEnabled=function(){if(!o.enabled||!o.serviceUrl){E=false;if(o.enabled&&!o.serviceUrl){L.warning("No serviceUrl was found in the service configuration");}}else{E=true;}return E;};this.init=function(){if((!g)&&(this.isEnabled())){sap.ui.getCore().getEventBus().subscribe("launchpad","sessionTimeout",this.destroy,this);this.lastNotificationDate=new Date();this._setWorkingMode();g=true;this.bUpdateDependencyInitiatorExists=false;this._userSettingInitialization();}sap.ui.getCore().getEventBus().subscribe("launchpad","setConnectionToServer",this._onSetConnectionToServer,this);};this._onSetConnectionToServer=function(e,x,y){if(y.active){this._resumeConnection();}else{this._closeConnection();}};this.getUnseenNotificationsCount=function(){var e=new q.Deferred();e.resolve(m.getProperty("/UnseenCount"));return e.promise();};this.getNotificationsCount=function(){return m.getProperty("/NotificationsCount")?m.getProperty("/NotificationsCount"):"0";};this.getNotificationsByTypeWithGroupHeaders=function(){var e,x,y=new q.Deferred(),a1=this._getRequestURI(n.NOTIFICATIONS_BY_TYPE);x={requestUri:a1};if(!this._getHeaderXcsrfToken()){e={};e["X-CSRF-Token"]="fetch";x.headers=e;}O.request(x,function(b1){y.resolve(b1);},function(b1){if(b1.response&&b1.response.statusCode===200&&b1.response.body){y.resolve(b1.response.body);}else{y.reject(b1);L.error("Notification service - oData executeAction failed: ",b1,"sap.ushell.services.Notifications");}});return y.promise();};this.getNotificationsGroupHeaders=function(){var e,x,y=new q.Deferred(),a1=this._getRequestURI(n.NOTIFICATIONS_GROUP_HEADERS);x={requestUri:a1};if(!this._getHeaderXcsrfToken()){e={};e["X-CSRF-Token"]="fetch";x.headers=e;}O.request(x,function(b1){y.resolve(b1);},function(b1){if(b1.response&&b1.response.statusCode===200&&b1.response.body){y.resolve(b1.response.body);}else{y.reject();L.error("Notification service - oData executeAction failed: ",b1,"sap.ushell.services.Notifications");}});return y.promise();};this.getNotificationsBufferInGroup=function(e,x,y){var a1=this,b1,c1,d1=new q.Deferred(),e1={group:e,skip:x,top:y},f1,g1,h1=this._getRequestURI(n.NOTIFICATIONS_IN_GROUP,e1);if(V===true){f1=X[n.NOTIFICATIONS_IN_GROUP].slice(x,x+y);g1=JSON.stringify({"@odata.context":"$metadata#Notifications","value":f1});setTimeout(function(){d1.resolve(g1);},1000);}else{c1={requestUri:h1};if(!this._getHeaderXcsrfToken()){b1={};b1["X-CSRF-Token"]="fetch";c1.headers=b1;}O.request(c1,function(i1){a1._updateCSRF(i1.response);d1.resolve(i1.value);},function(i1){if(i1.response&&i1.response.statusCode===200&&i1.response.body){a1._updateCSRF(i1.response);d1.resolve(JSON.parse(i1.response.body).value);}else{d1.reject();L.error("Notification service - oData executeAction failed: ",i1,"sap.ushell.services.Notifications");}});}return d1.promise();};this.getNotificationsBufferBySortingType=function(e,x,y){var a1=this,b1,c1,d1=new q.Deferred(),e1={skip:x,top:y},f1,g1,h1=this._getRequestURI(e,e1);if(V===true){f1=X[e].slice(x,x+y);g1=JSON.stringify({"@odata.context":"$metadata#Notifications","value":f1});setTimeout(function(){d1.resolve(g1);},1000);}else{c1={requestUri:h1};if(!this._getHeaderXcsrfToken()){b1={};b1["X-CSRF-Token"]="fetch";c1.headers=b1;}O.request(c1,function(i1){a1._updateCSRF(i1.response);d1.resolve(i1.value);},function(i1){if(i1.response&&i1.response.statusCode===200&&i1.response.body){a1._updateCSRF(i1.response);d1.resolve(JSON.parse(i1.response.body).value);}else{d1.reject();L.error("Notification service - oData executeAction failed: ",i1,"sap.ushell.services.Notifications");}});}return d1.promise();};this.getNotifications=function(){var e,x=new q.Deferred();if((v===M.FIORI_CLIENT)||(v===M.PACKAGED_APP)){e=this._readNotificationsData(false);e.done(function(){x.resolve(m.getProperty("/Notifications"));}).fail(function(){x.reject();});}else{x.resolve(m.getProperty("/Notifications"));}return x.promise();};this.executeBulkAction=function(e,x){var y=new q.Deferred(),a1=[],b1=[],c1={succededNotifications:a1,failedNotifications:b1},d1=this;d1.sendBulkAction(e,x).done(function(e1){e1.forEach(function(f1,g1){var h1=f1.NotificationId,i1=f1.Success;if(i1){a1.push(h1);}else{b1.push(h1);}});if(b1.length){y.reject(c1);}else{y.resolve(c1);}}).fail(function(){y.reject(c1);});return y.promise();};this.dismissBulkNotifications=function(e){var x=new q.Deferred(),y=this;y.sendBulkDismiss(e).done(function(){x.resolve();}).fail(function(){x.reject();});return x.promise();};this.executeAction=function(e,x){var y=this,a1=o.serviceUrl+"/ExecuteAction",b1={NotificationId:e,ActionId:x},c1={requestUri:a1,method:"POST",data:b1,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},d1=new q.Deferred();O.request(c1,function(e1){var f1,g1={isSucessfull:true,message:""};if(e1&&e1.response&&e1.response.statusCode===200&&e1.response.body){f1=JSON.parse(e1.response.body);g1.isSucessfull=f1.Success;g1.message=f1.MessageText;}d1.resolve(g1);},function(e1){var f1,g1={isSucessfull:false,message:""};if(e1.response&&e1.response.statusCode===200&&e1.response.body){f1=JSON.parse(e1.response.body);g1.isSucessfull=f1.Success;g1.message=f1.MessageText;d1.resolve(g1);}else if(y._csrfTokenInvalid(e1)&&(Z===false)){y._invalidCsrfTokenRecovery(d1,y.executeAction,[e,x]);}else{d1.reject(e1);L.error("Notification service - oData executeAction failed: ",e1,"sap.ushell.services.Notifications");}});return d1.promise();};this.sendBulkAction=function(e,x){var y=this,a1=o.serviceUrl+"/BulkActionByHeader",b1={ParentId:e,ActionId:x},c1={requestUri:a1,method:"POST",data:b1,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},d1=new q.Deferred();O.request(c1,function(e1){var f1,g1;if(e1&&e1.response&&e1.response.statusCode===200&&e1.response.body){f1=JSON.parse(e1.response.body);g1=f1.value;}d1.resolve(g1);},function(e1){var f1,g1;if(e1.response&&e1.response.statusCode===200&&e1.response.body){f1=JSON.parse(e1.response.body);g1=f1.value;d1.resolve(g1);}else if(y._csrfTokenInvalid(e1)&&(Z===false)){y._invalidCsrfTokenRecovery(d1,y.sendBulkAction,[e,x]);}else{d1.reject();L.error("Notification service - oData executeBulkAction failed: ",e1.message,"sap.ushell.services.Notifications");}});return d1.promise();};this.sendBulkDismiss=function(e){var x=this,y=o.serviceUrl+"/DismissAll",a1={ParentId:e},b1={requestUri:y,method:"POST",data:a1,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},c1=new q.Deferred();O.request(b1,function(){c1.resolve();},function(d1){if(d1.response&&d1.response.statusCode===200){c1.resolve();}else if(x._csrfTokenInvalid(d1)&&(Z===false)){x._invalidCsrfTokenRecovery(c1,x.sendBulkDismiss,[e]);}else{c1.reject();var e1=d1?d1.message:"";L.error("Notification service - oData executeBulkAction failed: ",e1,"sap.ushell.services.Notifications");}});return c1.promise();};this.markRead=function(e){var x=this,y=o.serviceUrl+"/MarkRead",a1={NotificationId:e},b1={requestUri:y,method:"POST",data:a1,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},c1=new q.Deferred();O.request(b1,function(){c1.resolve();},function(d1){if(x._csrfTokenInvalid(d1)&&(Z===false)){x._invalidCsrfTokenRecovery(c1,x.markRead,[e]);}else{L.error("Notification service - oData reset badge number failed: ",d1,"sap.ushell.services.Notifications");c1.reject(d1);}});return c1.promise();};this.dismissNotification=function(e){var x=o.serviceUrl+"/Dismiss",y=this,a1={NotificationId:e},b1={requestUri:x,method:"POST",data:a1,headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}},c1=new q.Deferred();O.request(b1,function(){y._addDismissNotifications(e);c1.resolve();},function(d1){if(y._csrfTokenInvalid(d1)&&(Z===false)){y._invalidCsrfTokenRecovery(c1,y.dismissNotification,[e]);}else{c1.reject(d1);L.error("Notification service - oData dismiss notification failed: ",d1,"sap.ushell.services.Notifications");}});return c1.promise();};this.registerNotificationsUpdateCallback=function(e){U.push(e);};this.registerDependencyNotificationsUpdateCallback=function(e,x){if(x===false){this.bUpdateDependencyInitiatorExists=true;}d.push({callback:e,dependent:x});};this.registerNotificationCountUpdateCallback=function(e){f.push(e);};this.notificationsSeen=function(){this._setNotificationsAsSeen();};this.isFirstDataLoaded=function(){return F;};this.readSettings=function(){var e;e=this._readSettingsFromServer();return e;};this.saveSettingsEntry=function(e){var x=this._writeSettingsEntryToServer(e);return x;};this.getUserSettingsFlags=function(){var e=new q.Deferred();if(B===true){e.resolve({highPriorityBannerEnabled:A});}else{T.done(function(){e.resolve({highPriorityBannerEnabled:A});});}return e.promise();};this.setUserSettingsFlags=function(e){A=e.highPriorityBannerEnabled;this._writeUserSettingsFlagsToPersonalization(e);};this._getNotificationSettingsMobileSupport=function(){return Q;};this._getDismissNotifications=function(){return _;};this.filterDismisssedItems=function(e,_){return e.filter(function(x){return!_.some(function(y){return y===x.originalItemId;});});};this._addDismissNotifications=function(e){if(_.indexOf(e)===-1){_.push(e);}};this._initializeDismissNotifications=function(){_=[];};this._getNotificationSettingsEmailSupport=function(){return R;};this.destroy=function(){h=true;if(i){clearTimeout(i);}else if(a){clearTimeout(a);}else if(b){clearTimeout(b);}if((v===M.WEB_SOCKET)&&w){w.close();}sap.ui.getCore().getEventBus().unsubscribe("launchpad","sessionTimeout",this.destroy,this);sap.ui.getCore().getEventBus().unsubscribe("launchpad","setConnectionToServer",this._onSetConnectionToServer,this);};this._readUnseenNotificationsCount=function(e){var x=this,y=new q.Deferred(),a1=this._getRequestURI(n.GET_BADGE_NUMBER),b1={requestUri:a1};O.read(b1,function(c1,d1){m.setProperty("/UnseenCount",d1.data.GetBadgeNumber.Number);x._setNativeIconBadge(d1.data.GetBadgeNumber.Number);y.resolve(d1.data.GetBadgeNumber.Number);},function(c1){if(c1.response&&c1.response.statusCode===200&&c1.response.body){var d1=JSON.parse(c1.response.body);m.setProperty("/UnseenCount",d1.value);x._setNativeIconBadge(d1.value);y.resolve(d1.value);}else{L.error("Notification service - oData read unseen notifications count failed: ",c1.message,"sap.ushell.services.Notifications");y.reject(c1);}});return y.promise();};this.readNotificationsCount=function(){var e=new q.Deferred(),x=this._getRequestURI(n.GET_NOTIFICATIONS_COUNT),y={requestUri:x};O.read(y,function(a1,b1){e.resolve(b1.data);},function(a1){if(a1.response&&a1.response.statusCode===200&&a1.response.body){var b1=JSON.parse(a1.response.body);e.resolve(b1.value);}else{L.error("Notification service - oData read notifications count failed: ",a1.message,"sap.ushell.services.Notifications");e.reject(a1);}});return e.promise();};this._getNotificationSettingsAvalability=function(){return K.promise();};this._setNotificationsAsSeen=function(){var e=this,x=new q.Deferred(),y=this._getRequestURI(n.RESET_BADGE_NUMBER),a1={requestUri:y,method:"POST",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}};if(this._isFioriClientMode()===true||this._isPackagedMode()===true){this._setNativeIconBadge(0);}O.request(a1,function(){x.resolve();},function(b1){if(e._csrfTokenInvalid(b1)&&(Z===false)){e._invalidCsrfTokenRecovery(x,e._setNotificationsAsSeen);}else{L.error("Notification service - oData reset badge number failed: ",b1,"sap.ushell.services.Notifications");x.reject(b1);}});return x.promise();};this._readNotificationsData=function(e){var x=this,y,a1,b1,c1=new q.Deferred(),d1=[];y=this._readUnseenNotificationsCount(e);d1.push(y);b1=this.readNotificationsCount();b1.done(function(e1){m.setProperty("/NotificationsCount",e1);});a1=this.getNotificationsBufferBySortingType(n.NOTIFICATIONS_BY_DATE_DESCENDING,0,Y);d1.push(a1);q.when.apply(q,d1).then(function(){d1[0].done(function(){if(e===true){x._updateNotificationsCountConsumers();}});d1[1].done(function(e1){q.sap.flpmeasure.start(0,"Notifications (services + rendering)",7);m.setProperty("/Notifications",e1);x._notificationAlert(e1);if(e===true){x._updateNotificationsConsumers();x._updateDependentNotificationsConsumers();}c1.resolve();});});return c1.promise();};this._getHeaderXcsrfToken=function(){return H;};this._getDataServiceVersion=function(){return D;};this._getRequestURI=function(e,x){var y,a1=encodeURI(this._getConsumedIntents(e));switch(e){case n.NOTIFICATIONS:if(r.getNotifications.basic===undefined){r.getNotifications.basic=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$filter=IsGroupHeader%20eq%20false";}if(this._isIntentBasedConsumption()){if(r.getNotifications.byIntents===undefined){r.getNotifications.byIntents=r.getNotifications.basic.concat("&intents%20eq%20"+a1);}return r.getNotifications.byIntents;}return r.getNotifications.basic;case n.NOTIFICATIONS_BY_TYPE:if(r.getNotificationsByType.basic===undefined){r.getNotificationsByType.basic=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams";}if(this._isIntentBasedConsumption()){if(r.getNotificationsByType.byIntents===undefined){r.getNotificationsByType.byIntents=r.getNotificationsByType.basic.concat("&$filter=intents%20eq%20"+a1);}return r.getNotificationsByType.byIntents;}return r.getNotificationsByType.basic;case n.NOTIFICATIONS_GROUP_HEADERS:if(r.getNotificationsGroupHeaders.basic===undefined){r.getNotificationsGroupHeaders.basic=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$filter=IsGroupHeader%20eq%20true";}if(this._isIntentBasedConsumption()){if(r.getNotificationsGroupHeaders.byIntents===undefined){r.getNotificationsGroupHeaders.byIntents=r.getNotificationsGroupHeaders.basic.concat("&intents%20eq%20"+a1);}return r.getNotificationsGroupHeaders.byIntents;}return r.getNotificationsGroupHeaders.basic;case n.NOTIFICATIONS_IN_GROUP:y=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$orderby=CreatedAt desc&$filter=IsGroupHeader eq false and ParentId eq "+x.group+"&$skip="+x.skip+"&$top="+x.top;if(this._isIntentBasedConsumption()===true){y=y.concat("&intents%20eq%20"+a1);}break;case n.GET_BADGE_NUMBER:if(r.getBadgeNumber.basic===undefined){r.getBadgeNumber.basic=o.serviceUrl+"/GetBadgeNumber()";}if(this._isIntentBasedConsumption()){if(r.getBadgeNumber.byIntents===undefined){r.getBadgeNumber.byIntents=o.serviceUrl+"/GetBadgeCountByIntent("+a1+")";}return r.getBadgeNumber.byIntents;}return r.getBadgeNumber.basic;case n.GET_NOTIFICATIONS_COUNT:if(r.getNotificationCount.basic===undefined){r.getNotificationCount.basic=o.serviceUrl+"/Notifications/$count";}return r.getNotificationCount.basic;case n.RESET_BADGE_NUMBER:if(r.resetBadgeNumber.basic===undefined){r.resetBadgeNumber.basic=o.serviceUrl+"/ResetBadgeNumber";}return r.resetBadgeNumber.basic;case n.GET_SETTINGS:if(r.getNotificationTypesSettings.basic===undefined){r.getNotificationTypesSettings.basic=o.serviceUrl+"/NotificationTypePersonalizationSet";}return r.getNotificationTypesSettings.basic;case n.GET_MOBILE_SUPPORT_SETTINGS:if(r.getMobileSupportSettings.basic===undefined){r.getMobileSupportSettings.basic=o.serviceUrl+"/Channels(ChannelId='SAP_SMP')";}return r.getMobileSupportSettings.basic;case n.GET_EMAIL_SUPPORT_SETTINGS:if(r.getEmailSupportSettings.basic===undefined){r.getEmailSupportSettings.basic=o.serviceUrl+"/Channels(ChannelId='SAP_EMAIL')";}return r.getEmailSupportSettings.basic;case n.VALIDATE_WEBSOCKET_CHANNEL:if(r.getWebSocketValidity.basic===undefined){r.getWebSocketValidity.basic=o.serviceUrl+"/Channels('SAP_WEBSOCKET')";}return r.getWebSocketValidity.basic;case n.NOTIFICATIONS_BY_DATE_DESCENDING:y=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$orderby=CreatedAt%20desc&$filter=IsGroupHeader%20eq%20false&$skip="+x.skip+"&$top="+x.top;if(this._isIntentBasedConsumption()===true){y=y.concat("&intents%20eq%20"+a1);}break;case n.NOTIFICATIONS_BY_DATE_ASCENDING:y=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$orderby=CreatedAt%20asc&$filter=IsGroupHeader%20eq%20false&$skip="+x.skip+"&$top="+x.top;if(this._isIntentBasedConsumption()===true){y=y.concat("&intents%20eq%20"+a1);}break;case n.NOTIFICATIONS_BY_PRIORITY_DESCENDING:y=o.serviceUrl+"/Notifications?$expand=Actions,NavigationTargetParams&$orderby=Priority%20desc&$filter=IsGroupHeader%20eq%20false&$skip="+x.skip+"&$top="+x.top;if(this._isIntentBasedConsumption()===true){y=y.concat("&intents%20eq%20"+a1);}break;default:y="";}return y;};this._readSettingsFromServer_noConnection=function(){var e=new q.Deferred(),x=[{NotificationTypeId:"type1",NotificationTypeDesc:"aaaaabbbbb-cccccddddd",PriorityDefault:"40-HIGH",DoNotDeliver:false,DoNotDeliverMob:true},{NotificationTypeId:"type2",NotificationTypeDesc:"cccccdddddccc-aaaaabbbbb",PriorityDefault:"10-LOW",DoNotDeliver:true,DoNotDeliverMob:true}];e.resolve(JSON.stringify({"@odata.context":"$metadata#NotificationTypePersonalizationSet","value":x}));return e.promise();};this._readSettingsFromServer_noData=function(){var e=new q.Deferred();e.resolve(JSON.stringify({"@odata.context":"$metadata#NotificationTypePersonalizationSet","value":{}}));return e.promise();};this._readSettingsFromServer=function(){var e=this._getRequestURI(n.GET_SETTINGS),x={requestUri:e},y=new q.Deferred();O.request(x,function(a1){y.resolve(a1.results);},function(a1){if(a1.response&&a1.response.statusCode===200&&a1.response.body){y.resolve(a1.response.body);}else{y.reject(a1);L.error("Notification service - oData get settings failed: ",a1,"sap.ushell.services.Notifications");}});return y.promise();};this._readMobileSettingsFromServer=function(){return this._readChannelSettingsFromServer(n.GET_MOBILE_SUPPORT_SETTINGS);};this._readEmailSettingsFromServer=function(){return this._readChannelSettingsFromServer(n.GET_EMAIL_SUPPORT_SETTINGS);};this._readChannelSettingsFromServer=function(e){var x=this._getRequestURI(e),y={requestUri:x},a1=new q.Deferred(),b1,c1;O.request(y,function(d1){if(typeof(d1.results)==="string"){b1=JSON.parse(d1.results);b1.successStatus=true;c1=JSON.stringify(b1);a1.resolve(c1);}else{d1.results.successStatus=true;a1.resolve(d1.results);}},function(d1){if(d1.response&&d1.response.statusCode===200&&d1.response.body){b1=JSON.parse(d1.response.body);b1.successStatus=true;c1=JSON.stringify(b1);a1.resolve(c1);}else{a1.resolve(JSON.stringify({successStatus:false}));L.error("Notification service - oData get settings failed: ",d1,"sap.ushell.services.Notifications");}});return a1.promise();};this._checkWebSocketActivity=function(){var e=this._getRequestURI(n.VALIDATE_WEBSOCKET_CHANNEL),x={requestUri:e},y=new q.Deferred(),a1;O.request(x,function(b1){if(typeof(b1.results)==="string"){a1=JSON.parse(b1.results);y.resolve(a1.IsActive);}else{y.resolve(false);}},function(b1){if(b1.response&&b1.response.statusCode===200&&b1.response.body){a1=JSON.parse(b1.response.body);y.resolve(a1.IsActive);}else{y.resolve(false);L.error("Notification service - oData get settings failed: ",b1,"sap.ushell.services.Notifications");}});return y.promise();};this._writeSettingsEntryToServer=function(e){var x=this,y,a1=this._getRequestURI(n.GET_SETTINGS)+"(NotificationTypeId="+e.NotificationTypeId+")",b1={requestUri:a1,method:"PUT",headers:{"X-Requested-With":"XMLHttpRequest","Content-Type":"application/json","DataServiceVersion":D,"X-CSRF-Token":H}};b1.data=JSON.parse(JSON.stringify(e));b1.data["@odata.context"]="$metadata#NotificationTypePersonalizationSet/$entity";y=new q.Deferred();O.request(b1,function(c1){y.resolve(c1);},function(c1){if(c1.response&&c1.response.statusCode===200&&c1.response.body){y.resolve(c1.response.body);}else if(x._csrfTokenInvalid(c1)&&(Z===false)){x._invalidCsrfTokenRecovery(y,x._writeSettingsEntryToServer,[e]);}else{y.reject(c1);L.error("Notification service - oData set settings entry failed: ",c1,"sap.ushell.services.Notifications");}});return y.promise();};this._updateNotificationsConsumers=function(){U.forEach(function(e){e();});};this._updateDependentNotificationsConsumers=function(){var e=this,x=new q.Deferred();d.forEach(function(y){if(e.bUpdateDependencyInitiatorExists===false){y.callback();}else if(y.dependent===true){y.callback(x.promise());}else{y.callback(x);}});};this._updateNotificationsCountConsumers=function(){f.forEach(function(e){e();});};this._updateAllConsumers=function(){this._updateNotificationsConsumers();this._updateNotificationsCountConsumers();this._updateDependentNotificationsConsumers();};this._getModel=function(){return m;};this._getMode=function(){return v;};this._setWorkingMode=function(){var e;if(o.intentBasedConsumption===true){C=this._getIntentsFromConfiguration(o.consumedIntents);if(C.length>0){I=true;}}if(this._isPackagedMode()){v=M.PACKAGED_APP;e=this._getIntentsFromConfiguration(window.fiori_client_appConfig.applications);if(e.length>0){C=e;}if(C.length>0){I=true;}this._registerForPush();this._readNotificationsData(true);this._setNativeIconBadgeWithDelay();return;}this._performFirstRead();};this._performFirstRead=function(){var e=this,x,y=this._readNotificationsData(true);y.done(function(){x=e._getFioriClientRemainingDelay();if(x<=0){e._fioriClientStep();}else{i=setTimeout(function(){e._fioriClientStep();},x);}F=true;}).fail(function(a1){L.error("Notifications oData read failed. Error: "+a1);return;});};this._fioriClientStep=function(){var e=this,x;if(this._isFioriClientMode()){v=M.FIORI_CLIENT;this._addPushNotificationHandler();x=this.getUnseenNotificationsCount();x.done(function(y){e._setNativeIconBadge(y,function(){});}).fail(function(){});}else{this._webSocketStep();}};this._webSocketStep=function(){v=M.WEB_SOCKET;this._establishWebSocketConnection();};this._webSocketRecoveryStep=function(){if(l===false){l=true;a=setTimeout(function(){this._webSocketStep();}.bind(this),j);}else{this._activatePollingAfterInterval();}};this._activatePollingAfterInterval=function(){var e=this;b=setTimeout(function(){e._activatePolling();},P*1000);};this._activatePolling=function(){var e=this;v=M.POLLING;this._readNotificationsData(true);b=setTimeout(e._activatePolling.bind(e,P,false),(P*1000));};this._formatAsDate=function(e){return new Date(e);};this._notificationAlert=function(e){if(A===false){return;}var x,y=[],a1=0;for(x in e){if(this.lastNotificationDate&&this._formatAsDate(e[x].CreatedAt)>this.lastNotificationDate){if(e[x].Priority==="HIGH"){y.push(e[x]);}}if(a1<this._formatAsDate(e[x].CreatedAt)){a1=this._formatAsDate(e[x].CreatedAt);}}if(this.lastNotificationDate&&y&&y.length>0){sap.ui.getCore().getEventBus().publish("sap.ushell.services.Notifications","onNewNotifications",y);}this.lastNotificationDate=a1;};this._getFioriClientRemainingDelay=function(){return k-(new Date()-t);};this._establishWebSocketConnection=function(){var x=this,y=false,a1;try{w=this._getWebSocketObjectObject(W,[S.SUPPORTED_PROTOCOLS.v10]);w.attachMessage(this,function(b1){a1=b1.getParameter("pcpFields");if((a1)&&(a1.Command)&&(a1.Command==="Notification")){x._readNotificationsData(true);}});w.attachOpen(this,function(){x._checkWebSocketActivity().done(function(b1){if(!b1){y=true;w.close();x._activatePollingAfterInterval();}});L.info("Notifications UShell service WebSocket: webSocket connection opened");});w.attachClose(this,function(b1){L.warning("Notifications UShell service WebSocket: attachClose called with code: "+b1.mParameters.code+" and reason: "+b1.mParameters.reason);if((!h)&&(!y)){x._webSocketRecoveryStep();}});w.attachError(this,function(){L.warning("Notifications UShell service WebSocket: attachError called!");});}catch(e){L.error("Exception occurred while creating new sap.ui.core.ws.SapPcpWebSocket. Message: "+e.message);}};this._isFioriClientMode=function(){return!(sap.FioriClient===undefined);};this._isPackagedMode=function(){return(window.fiori_client_appConfig&&window.fiori_client_appConfig.prepackaged===true);};this._setNativeIconBadge=function(e){if((sap.Push!==undefined)&&(sap.Push.setBadgeNumber!==undefined)){sap.Push.setBadgeNumber(e,function(){});}};this._setNativeIconBadgeWithDelay=function(){var e=this,x;setTimeout(function(){x=e.getUnseenNotificationsCount();x.done(function(y){e._setNativeIconBadge(y);}).fail(function(){});},4000);};this._getIntentsFromConfiguration=function(e){var x=[],y,a1;if(e&&e.length>0){for(a1=0;a1<e.length;a1++){y=e[a1].intent;x.push(y);}}return x;};this._handlePushedNotification=function(e){var x,y,a1,b1,c1=[],d1;if(e!==undefined){if((e.additionalData===undefined)||(e.additionalData.foreground===true)){this._readNotificationsData(true);}else{if(e.additionalData&&e.additionalData.NavigationTargetObject){y=e.additionalData.NavigationTargetObject;}else{y=e.NavigationTargetObject;}if(e.additionalData&&e.additionalData.NavigationTargetAction){a1=e.additionalData.NavigationTargetAction;}else{a1=e.NavigationTargetAction;}if(e.additionalData&&e.additionalData.NavigationTargetParam){b1=e.additionalData.NavigationTargetParam;}else{b1=e.NavigationTargetParam;}if(b1){if(typeof b1==="string"||b1 instanceof String){c1[0]=b1;}else if(Array.isArray(b1)===true){c1=b1;}}x=e.NotificationId;if((typeof hasher!=="undefined")&&(hasher.getHash()===y+"-"+a1)){d1=sap.ui.getCore().byId("viewPortContainer");if(d1){d1.switchState("Center");}}u.toExternalWithParameters(y,a1,c1);this.markRead(x);this._readNotificationsData(true);}}};this._registerForPush=function(){sap.Push.initPush(this._handlePushedNotification.bind(this));};this._addPushNotificationHandler=function(){document.addEventListener("deviceready",this._registerForPush.bind(this),false);};this._isIntentBasedConsumption=function(){return I;};this._getConsumedIntents=function(e){var x="",y;if(!this._isIntentBasedConsumption()){return x;}if(C.length>0){if(e!==n.GET_BADGE_NUMBER){x="&";}for(y=0;y<C.length;y++){if(e===n.GET_BADGE_NUMBER){if(y===0){x=C[y];}else{x=x+","+C[y];}}else{x=x+"NavigationIntent%20eq%20%27"+C[y]+"%27";}}}return x;};this._revalidateCsrfToken=function(){var e;H=undefined;$=false;e=this.getNotificationsBufferBySortingType(n.NOTIFICATIONS_BY_DATE_DESCENDING,0,1);return e.promise();};this._csrfTokenInvalid=function(e){return(e.response&&(e.response.statusCode===403)&&(e.response.headers["x-csrf-token"]==="Required"));};this._invalidCsrfTokenRecovery=function(x,y,a1){var b1=this,c1=this._revalidateCsrfToken(),d1;Z=true;c1.done(function(){d1=y.apply(b1,a1);d1.done(function(e){Z=false;x.resolve(e);});d1.fail(function(e){Z=false;if(e.response&&e.response.statusCode===200&&e.response.body){x.resolve(e.response.body);}else{x.reject(e);}});});c1.fail(function(e){Z=false;x.reject(e);L.error("Notification service - oData markRead failed: ",e.message,"sap.ushell.services.Notifications");});};this._notificationsAscendingSortBy=function(e,a1){e.sort(function(x,y){var b1=x[a1],c1=y[a1];if(b1===c1){b1=x.id;c1=y.id;}return c1>b1?-1:1;});return e;};this._getWebSocketObjectObject=function(W,e){return new S(W,e);};this._notificationsDescendingSortBy=function(e,a1){e.sort(function(x,y){var b1=x[a1],c1=y[a1];if(b1===c1){b1=x.id;c1=y.id;return b1>c1?-1:1;}if(a1==="Priority"){if(b1==="HIGH"){return-1;}if(c1==="HIGH"){return 1;}if(b1==="MEDIUM"){return-1;}return 1;}return b1>c1?-1:1;});return e;};this.getOperationEnum=function(){return n;};this._readUserSettingsFlagsFromPersonalization=function(){var e=this,x,y;try{y=this._getUserSettingsPersonalizer().getPersData();}catch(a1){L.error("Personalization service does not work:");L.error(a1.name+": "+a1.message);x=new q.Deferred();x.reject(a1);y=x.promise();}y.done(function(b1){if(b1===undefined){e._writeUserSettingsFlagsToPersonalization({highPriorityBannerEnabled:A});}else{A=b1.highPriorityBannerEnabled;}B=true;G.resolve();});y.fail(function(){L.error("Reading User Settings flags from Personalization service failed");});};this._writeUserSettingsFlagsToPersonalization=function(e){var x,y;try{y=this._getUserSettingsPersonalizer().setPersData(e);}catch(a1){L.error("Personalization service does not work:");L.error(a1.name+": "+a1.message);x=new q.Deferred();x.reject(a1);y=x.promise();}return y;};this._getUserSettingsPersonalizer=function(){if(z===undefined){z=this._createUserSettingsPersonalizer();}return z;};this._createUserSettingsPersonalizer=function(){var e=sap.ushell.Container.getService("Personalization"),x,y={keyCategory:e.constants.keyCategory.FIXED_KEY,writeFrequency:e.constants.writeFrequency.LOW,clientStorageAllowed:true},a1={container:"sap.ushell.services.Notifications",item:"userSettingsData"},b1=e.getPersonalizer(a1,y,x);return b1;};this._updateCSRF=function(e){if(($===true)||(e.headers===undefined)){return;}if(!this._getHeaderXcsrfToken()){H=e.headers["x-csrf-token"]||e.headers["X-CSRF-Token"]||e.headers["X-Csrf-Token"];}if(!this._getDataServiceVersion()){D=e.headers.DataServiceVersion||e.headers["odata-version"];}$=true;};this._userSettingInitialization=function(){var e,x,y,a1={settingsAvailable:false,mobileAvailable:false,emailAvailable:false},b1,c1,d1,e1;this._readUserSettingsFlagsFromPersonalization();e=this._readSettingsFromServer();x=this._readMobileSettingsFromServer();y=this._readEmailSettingsFromServer();b1=[e,x,y];e.done(function(){a1.settingsAvailable=true;});x.done(function(f1){c1=JSON.parse(f1);d1=c1.successStatus;if(d1){Q=f1?c1.IsActive:false;a1.mobileAvailable=Q;}else{Q=false;a1.mobileAvailable=false;}});y.done(function(f1){c1=JSON.parse(f1);e1=c1.successStatus;if(e1){R=f1?c1.IsActive:false;a1.emailAvailable=R;}else{R=false;a1.emailAvailable=false;}});q.when.apply(q,b1).then(function(){K.resolve(a1);});};this._closeConnection=function(){if(!h){if(v===M.WEB_SOCKET&&w){w.close();h=true;}if(v===M.POLLING&&b){clearTimeout(b);h=true;}}};this._resumeConnection=function(){if(h){h=false;this._webSocketStep();}};}N.hasNoAdapter=true;return N;},true);

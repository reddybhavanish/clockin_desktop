// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/UserInfo","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/base/Log"],function(U,A,L){"use strict";function a(o,c){U.call(this,o,c);this.getUser=function(){L.warning("'UserInfo.getUser' is private API and should not be called");};this.getThemeList=function(){L.warning("'UserInfo.getThemeList' is private API and should not be called");};this.updateUserPreferences=function(){L.warning("'UserInfo.updateUserPreferences' is private API and should not be called");};this.getLanguageList=function(){L.warning("'UserInfo.getLanguageList' is private API and should not be called");};}a.prototype=Object.create(U.prototype);a.hasNoAdapter=U.hasNoAdapter;return a;},true);

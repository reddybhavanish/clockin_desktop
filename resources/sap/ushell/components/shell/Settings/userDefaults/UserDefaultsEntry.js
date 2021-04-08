// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ui/core/mvc/JSView","sap/ushell/resources"],function(L,J,r){"use strict";return{getEntry:function(){var v;return{id:"userDefaultEntry",entryHelpID:"defaultParameters",title:r.i18n.getText("defaultsValuesEntry"),valueArgument:function(){return sap.ushell.Container.getServiceAsync("UserDefaultParameters").then(function(u){return new Promise(function(a,b){u.hasRelevantMaintainableParameters().done(function(h){a({value:h});}).fail(function(e){b(e);});});});},contentFunc:function(){return sap.ui.getCore().loadLibrary("sap.ui.comp",{async:true}).then(function(){return J.create({id:"defaultParametersSelector",viewName:"sap.ushell.components.shell.Settings.userDefaults.UserDefaultsSetting"});}).then(function(V){return new Promise(function(a,b){V.getController().getContent().done(function(c){v=c;a(c);});});});},onSave:function(){if(v){return v.getController().onSave();}L.warning("Save operation for user account settings was not executed, because the user default view was not initialized");return Promise.resolve();},onCancel:function(){if(v){v.getController().onCancel();return;}L.warning("Cancel operation for user account settings was not executed, because the user default view was not initialized");},defaultVisibility:false};}};});

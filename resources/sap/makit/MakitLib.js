/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.loader.config({shim:{"sap/makit/js/SybaseMA":{exports:"$MA"},"sap/makit/localization/jQueryGlobalization":{deps:["sap/ui/thirdparty/jquery"],exports:"jQuery"},"sap/makit/localization/jQueryCoreLang":{deps:["sap/makit/localization/jQueryGlobalization"],exports:"jQuery"}}});sap.ui.define(["./library","./js/SybaseMA","./localization/jQueryGlobalization","./localization/jQueryCoreLang","sap/ui/core/Element","sap/base/Log"],function(m,S,q,Q,E,L){"use strict";var M=E.extend("sap.makit.MakitLib",{metadata:{deprecated:true,library:"sap.makit"}});M._onThemeChanged=function(e){window.$MA.Chart.getStyles();};M._libraryInit=(function(){var r=sap.ui.getCore().getLibraryResourceBundle("sap.makit");var c=sap.ui.getCore().getConfiguration().getLanguage();window.$MA.GlobalizedResource={};window.$MA.GlobalizedResource[c]={"Others":r.getText("CHART_OTHERS"),"Total":r.getText("CHART_TOTAL"),"Thousand_ShortForm":r.getText("Thousand_ShortForm"),"Million_ShortForm":r.getText("Million_ShortForm"),"Billion_ShortForm":r.getText("Billion_ShortForm"),"Trillion_ShortForm":r.getText("Trillion_ShortForm")};window.$MA.setLocale(c);var i="popup_tt_left.png";var p=sap.ui.resource("sap.makit","themes/base/images/"+i);p=p.substring(0,p.length-i.length);window.$MA.setImagesFolder(p);sap.ui.getCore().attachThemeChanged(M._onThemeChanged);window.$MA.Chart.getStyles();if(L.getLogger().getLevel()==L.Level.TRACE){window.$MA.setTrace(3);}}());return M;});

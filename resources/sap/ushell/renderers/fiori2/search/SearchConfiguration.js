// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
(function(g){"use strict";sap.ui.define(['sap/ushell/renderers/fiori2/search/controls/SearchResultListSelectionHandler','sap/base/Log'],function(D,L){var a=D.getMetadata().getName();jQuery.sap.declare('sap.ushell.renderers.fiori2.search.SearchConfiguration');var u={multiSelect:{type:'bool'},sinaProvider:{type:'string'},odataProvider:{type:'bool'},searchBusinessObjects:{type:'bool'},charts:{type:'bool'},maps:{type:'bool'},mapProdiver:{type:'object'},newpie:{type:'bool'},personalizationStorage:{type:'string'},boSuggestions:{type:'bool'},_tweetAttribute:{type:'string'},_eshClickableObjectType:{type:'bool'},defaultSearchScopeApps:{type:'bool'},searchScopeWithoutAll:{type:'bool'},suggestionKeyboardRelaxationTime:{type:'int'},suggestionStartingCharacters:{type:'int'}};var S=sap.ushell.renderers.fiori2.search.SearchConfiguration=function(){this.init.apply(this,arguments);};S.prototype={init:function(p){try{var c=g['sap-ushell-config'].renderers.fiori2.componentData.config.esearch;jQuery.extend(true,this,c);}catch(e){}this.handleOutdatedConfigurationParameters();this.setDefaults();this.readUrlParameters();this.setModulePaths();this.createDefaultDataSourceConfig();},setModulePaths:function(){if(!this.modulePaths){return;}for(var i=0;i<this.modulePaths.length;++i){var m=this.modulePaths[i];jQuery.sap.registerModulePath(m.moduleName,m.urlPrefix);}},handleOutdatedConfigurationParameters:function(){try{var c=g['sap-ushell-config'].renderers.fiori2.componentData.config;if(c.searchBusinessObjects!==undefined&&this.searchBusinessObjects===undefined){if(c.searchBusinessObjects==='hidden'||c.searchBusinessObjects===false){this.searchBusinessObjects=false;}else{this.searchBusinessObjects=true;}}if(c.enableSearch!==undefined&&this.enableSearch===undefined){this.enableSearch=c.enableSearch;}}catch(e){}},setDefaults:function(){if(this.searchBusinessObjects===undefined){this.searchBusinessObjects=true;}if(this.odataProvider===undefined){this.odataProvider=false;}if(this.multiSelect===undefined){this.multiSelect=true;}if(this.charts===undefined){this.charts=true;}if(this.maps===undefined){this.maps=undefined;}if(this.mapProvider===undefined){this.mapProvider=undefined;}if(this.newpie===undefined){this.newpie=false;}if(this.dataSources===undefined){this.dataSources={};}if(this.enableSearch===undefined){this.enableSearch=true;}if(this.personalizationStorage===undefined){this.personalizationStorage='auto';}if(this.boSuggestions===undefined){this.boSuggestions=false;}if(this._eshClickableObjectType===undefined){this._eshClickableObjectType=true;}if(this.defaultSearchScopeApps===undefined){this.defaultSearchScopeApps=false;}if(this.searchScopeWithoutAll===undefined){this.searchScopeWithoutAll=false;}if(this.suggestionKeyboardRelaxationTime===undefined){this.suggestionKeyboardRelaxationTime=400;}if(this.suggestionStartingCharacters===undefined){this.suggestionStartingCharacters=3;}this.dataSourceConfigurations={};this.dataSourceConfigurations_Regexes=[];if(this.dataSources){for(var i=0;i<this.dataSources.length;i++){var d=this.dataSources[i];if(d.id){this.dataSourceConfigurations[d.id]=d;}else if(d.regex){var f=d.regexFlags||undefined;var r=new RegExp(d.regex,f);if(r){d.regex=r;this.dataSourceConfigurations_Regexes.push(d);}}else{var m="Following datasource configuration does neither include a valid id nor a regular expression, therefore it is ignored:\n"+JSON.stringify(d);L.warning(m,'sap.ushell.renderers.fiori2.search.SearchConfiguration');}}}this.dataSources=undefined;this.documentDataSource={searchResultListItem:'sap.ushell.renderers.fiori2.search.controls.SearchResultListItemDocument'};this.dataSourceConfigurations.noteprocessorurl=this.dataSourceConfigurations.noteprocessorurl||{};this.dataSourceConfigurations.noteprocessorurl.searchResultListItem=this.dataSourceConfigurations.noteprocessorurl.searchResultListItem||'sap.ushell.renderers.fiori2.search.controls.SearchResultListItemNote';this.dataSourceConfigurations.noteprocessorurl.searchResultListSelectionHandler=this.dataSourceConfigurations.noteprocessorurl.searchResultListSelectionHandler||'sap.ushell.renderers.fiori2.search.controls.SearchResultListSelectionHandlerNote';},createDefaultDataSourceConfig:function(){this.defaultDataSourceConfig={searchResultListItem:undefined,searchResultListItemControl:undefined,searchResultListItemContent:undefined,searchResultListItemContentControl:undefined,searchResultListSelectionHandler:a,searchResultListSelectionHandlerControl:D};},readUrlParameters:function(){var p=this.parseUrlParameters();for(var b in p){if(b==='demoMode'){this.searchBusinessObjects=true;this.enableSearch=true;continue;}var c=u[b];if(!c){continue;}var v=p[b];switch(c.type){case'bool':v=(v==='true'||v==='');break;default:}this[b]=v;}},parseUrlParameters:function(){var U=sap.ushell.Container.getService("URLParsing");var p=U.parseParameters(g.location.search);var n={};for(var k in p){var v=p[k];if(v.length!==1){continue;}v=v[0];if(typeof v!=='string'){continue;}n[k]=v;}return n;},loadCustomModulesAsync:function(){var t=this;if(t._loadCustomModulesProm){return t._loadCustomModulesProm;}var d,b=[];for(var c in t.dataSourceConfigurations){d=t.loadCustomModulesForDataSourceIdAsync(c);b.push(d);}t._loadCustomModulesProm=Promise.all(b);return t._loadCustomModulesProm;},loadCustomModulesForDataSourcesAsync:function(d,b){var c=[];for(var i=0;i<d.length;i++){var e=Array.isArray(b)&&b.length>i&&b[i]||{};var f=this.loadCustomModulesForDataSourceAsync(d[i],e);c.push(f);}return Promise.all(c);},loadCustomModulesForDataSourceAsync:function(d,b){b=b||{};return this.loadCustomModulesForDataSourceIdAsync(d.id,b);},loadCustomModulesForDataSourceIdAsync:function(d,b){if(!d){return Promise.resolve();}this._dataSourceLoadingProms=this._dataSourceLoadingProms||{};var c=this._dataSourceLoadingProms[d];if(!c){var e=[{moduleAttrName:"searchResultListItem",controlAttrName:"searchResultListItemControl"},{moduleAttrName:"searchResultListItemContent",controlAttrName:"searchResultListItemContentControl"},{moduleAttrName:"searchResultListSelectionHandler",controlAttrName:"searchResultListSelectionHandlerControl"}];var f=this._prepareDataSourceConfigurationForDataSource(d,b);var h,j=[];for(var i=0;i<e.length;i++){h=this._doLoadCustomModulesAsync(d,f,e[i].moduleAttrName,e[i].controlAttrName);j.push(h);}c=Promise.all(j);c._resolvedOrFailed=false;c.then(function(){c._resolvedOrFailed=true;});this._dataSourceLoadingProms[d]=c;}return c;},_doLoadCustomModulesAsync:function(d,b,m,c,f,h){var t=this;return new Promise(function(r,i){if(b[m]&&(!b[c]||b[c]==t.defaultDataSourceConfig[c])){try{sap.ui.require([b[m].replace(/[.]/g,'/')],function(k){b[c]=k;r();});}catch(e){var j="Could not load custom module '"+b[m]+"' for data source with id '"+d+"'. ";j+="Falling back to default data source configuration.";L.warning(j,'sap.ushell.renderers.fiori2.search.SearchConfiguration');b[m]=f||t.defaultDataSourceConfig[m];b[c]=h||t.defaultDataSourceConfig[c];r();}}else{if(!b[c]){b[m]=f||t.defaultDataSourceConfig[m];b[c]=h||t.defaultDataSourceConfig[c];}r();}});},getDataSourceConfig:function(d){if(this._dataSourceLoadingProms&&this._dataSourceLoadingProms[d.id]&&!this._dataSourceLoadingProms[d.id]._resolvedOrFailed){return this.defaultDataSourceConfig;}var c=this.dataSourceConfigurations[d.id];if(!c){c=this.defaultDataSourceConfig;this.dataSourceConfigurations[d.id]=c;}return c;},_prepareDataSourceConfigurationForDataSource:function(d,b){var c={};if(this.dataSourceConfigurations[d]){c=this.dataSourceConfigurations[d];}else{for(var i=0;i<this.dataSourceConfigurations_Regexes.length;i++){if(this.dataSourceConfigurations_Regexes[i].regex.test(d)){c=this.dataSourceConfigurations_Regexes[i];break;}}}if(b&&b.isDocumentConnector){if(!c.searchResultListItem){c.searchResultListItem=this.documentDataSource.searchResultListItem;}else{var m="Will attempt to load '"+c.searchResultListItem+"' instead of '"+this.documentDataSource.searchResultListItem+"' for data source '"+d+"'";L.warning(m,'sap.ushell.renderers.fiori2.search.SearchConfiguration');}}this.dataSourceConfigurations[d]=c;return c;},isLaunchpad:function(){try{return!!sap.ushell.Container.getService("CrossApplicationNavigation");}catch(e){return false;}},getSina:function(){return{};}};var s;S.getInstance=function(){if(s){return s;}s=new S();return s;};return S;});})(window);

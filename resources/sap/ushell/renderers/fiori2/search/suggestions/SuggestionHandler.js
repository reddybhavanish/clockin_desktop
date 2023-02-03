// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchHelper','sap/ushell/renderers/fiori2/search/suggestions/SinaSuggestionProvider','sap/ushell/renderers/fiori2/search/suggestions/AppSuggestionProvider','sap/ushell/renderers/fiori2/search/suggestions/TimeMerger','sap/ushell/renderers/fiori2/search/suggestions/SuggestionType'],function(S,a,A,T,b){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.suggestions.SuggestionHandler');var s=sap.ushell.renderers.fiori2.search.suggestions;s.SuggestionHandler=function(){this.init.apply(this,arguments);};s.SuggestionHandler.prototype={init:function(p){var t=this;t.model=p.model;t.suggestionProviders=[];t.keyboardRelaxationTime=t.model.config.suggestionKeyboardRelaxationTime;t.uiUpdateInterval=500;t.uiClearOldSuggestionsTimeOut=1000;t.appSuggestionProvider=new A({model:t.model,suggestionHandler:this});t.doSuggestionInternal=S.delayedExecution(t.doSuggestionInternal,t.keyboardRelaxationTime);t.timeMerger=new T();},abortSuggestions:function(c){if(c===undefined||c===true){this.model.setProperty("/suggestions",[]);}if(this.clearSuggestionTimer){clearTimeout(this.clearSuggestionTimer);this.clearSuggestionTimer=null;}this.doSuggestionInternal.abort();this.getSuggestionProviders().done(function(d){for(var i=0;i<d.length;++i){var e=d[i];e.abortSuggestions();}});this.timeMerger.abort();},getSuggestionProviders:function(){var t=this;if(t.suggestionProvidersDeferred){return t.suggestionProvidersDeferred;}t.suggestionProvidersDeferred=t.model.initBusinessObjSearch().then(function(){t.sinaNext=t.model.sinaNext;var c=[t.appSuggestionProvider];if(!t.model.config.searchBusinessObjects){return jQuery.when(c);}c.push.apply(c,t.createSinaSuggestionProviders());return jQuery.when(c);});return t.suggestionProvidersDeferred;},createSinaSuggestionProviders:function(){var p=[{suggestionTypes:[b.SearchTermHistory]},{suggestionTypes:[b.SearchTermData]},{suggestionTypes:[b.DataSource]}];if(this.model.config.boSuggestions){p.push({suggestionTypes:[b.Object]});}var c=[];for(var k=0;k<p.length;++k){var d=p[k];c.push(new a({model:this.model,sinaNext:this.sinaNext,suggestionTypes:d.suggestionTypes,suggestionHandler:this}));}return c;},isSuggestionPopupVisible:function(){return jQuery('.searchSuggestion').filter(':visible').length>0;},doSuggestion:function(f){this.abortSuggestions(false);this.doSuggestionInternal(f);},autoSelectAppSuggestion:function(f){return this.appSuggestionProvider.getSuggestions(f).then(function(s){return s[0];});},doSuggestionInternal:function(f){var t=this;t.firstInsertion=true;t.busyIndicator=false;var c=t.model.getProperty("/uiFilter/searchTerm");if(c.length===0){t.insertSuggestions([],0);return;}if(c.trim()==='*'){t.insertSuggestions([],0);return;}t.model.eventLogger.logEvent({type:t.model.eventLogger.SUGGESTION_REQUEST,suggestionTerm:t.model.getProperty('/uiFilter/searchTerm'),dataSourceKey:t.model.getProperty('/uiFilter/dataSource').id});t.getSuggestionProviders().done(function(d){var p=[];var e=d.length;for(var i=0;i<d.length;++i){var g=d[i];p.push(g.getSuggestions(f));}if(t.isSuggestionPopupVisible()){if(t.clearSuggestionTimer){clearTimeout(t.clearSuggestionTimer);}t.clearSuggestionTimer=setTimeout(function(){t.clearSuggestionTimer=null;t.insertSuggestions([],e);},t.uiClearOldSuggestionsTimeOut);}else{t.insertSuggestions([],e);}t.timeMerger.abort();t.timeMerger=new T(p,t.uiUpdateInterval);t.timeMerger.process(function(r){e-=r.length;var s=[];for(var j=0;j<r.length;++j){var h=r[j];s.push.apply(s,h);}if(e>0&&s.length===0){return;}if(t.clearSuggestionTimer){clearTimeout(t.clearSuggestionTimer);t.clearSuggestionTimer=null;}t.insertSuggestions(s,e);});});},generateSuggestionHeader:function(i){var h={};switch(i.uiSuggestionType){case b.App:h.label=sap.ushell.resources.i18n.getText('label_apps');break;case b.DataSource:h.label=sap.ushell.resources.i18n.getText('searchIn');break;case b.SearchTermData:case b.SearchTermHistory:h.label=sap.ushell.resources.i18n.getText('searchFor');break;case b.Object:h.label=i.dataSource.labelPlural;h.dataSource=i.dataSource;break;}h.position=b.properties[i.uiSuggestionType].position;h.suggestionResultSetCounter=this.suggestionResultSetCounter;h.uiSuggestionType=b.Header;return h;},enableBusyIndicator:function(s,e){if(e){s.push({position:b.properties[b.BusyIndicator].position,uiSuggestionType:b.BusyIndicator});return;}for(var i=0;i<s.length;++i){var c=s[i];if(c.uiSuggestionType===b.BusyIndicator){s.splice(i,1);return;}}},checkDuplicate:function(s,c){var d=function(e){return c.uiSuggestionType===b.SearchTermHistory||(c.uiSuggestionType===b.SearchTermData&&!c.dataSource);};if(!d(c)){return{action:'append'};}for(var i=0;i<s.length;++i){var e=s[i];if(!d(e)){continue;}if(c.searchTerm===e.searchTerm){if(c.grouped&&c.uiSuggestionType===b.SearchTermData&&e.uiSuggestionType===b.SearchTermHistory){return{action:'replace',index:i};}return{action:'skip'};}}return{action:'append'};},insertSuggestions:function(i,p){var s=this.model.getProperty('/suggestions').slice();s=this.insertIntoSuggestionList(i,s);if(!this.busyIndicator&&p>0){this.enableBusyIndicator(s,true);this.busyIndicator=true;}if(this.busyIndicator&&p===0){this.enableBusyIndicator(s,false);this.busyIndicator=false;}this.sortSuggestions(s);this.limitSuggestions(s);this.updateSuggestions(s);},insertIntoSuggestionList:function(c,s){var f=false;if(this.firstInsertion){this.firstInsertion=false;f=true;}if(f){s=[];this.suggestionHeaders={};this.suggestionResultSetCounter=0;this.generatedPositions={maxPosition:b.properties[b.Object].position,position:{}};}this.suggestionResultSetCounter+=1;for(var i=0;i<c.length;++i){var d=c[i];if(d.uiSuggestionType===b.Object){var p=this.generatedPositions.position[d.dataSource.id];if(!p){this.generatedPositions.maxPosition+=1;p=this.generatedPositions.maxPosition;this.generatedPositions.position[d.dataSource.id]=p;}d.position=p;}d.suggestionResultSetCounter=this.suggestionResultSetCounter;d.resultSetPosition=i;var e=this.checkDuplicate(s,d);switch(e.action){case'append':s.push(d);break;case'skip':continue;case'replace':s.splice(e.index,1,d);break;}if(this.isHeaderGenerationEnabled()&&!this.suggestionHeaders[d.position]){s.push(this.generateSuggestionHeader(d));this.suggestionHeaders[d.position]=true;}}return s;},isHeaderGenerationEnabled:function(){if(this.model.getDataSource()===this.model.appDataSource){return false;}if(!this.model.config.boSuggestions&&this.model.getDataSource().type===this.sinaNext.DataSourceType.BusinessObject){return false;}return true;},sortSuggestions:function(s){s.sort(function(c,d){var e=c.position-d.position;if(e!==0){return e;}if(c.uiSuggestionType===b.Header){return-1;}if(d.uiSuggestionType===b.Header){return 1;}if(c.grouped&&!d.grouped){return-1;}if(!c.grouped&&d.grouped){return 1;}e=c.suggestionResultSetCounter-d.suggestionResultSetCounter;if(e!==0){return e;}e=c.resultSetPosition-d.resultSetPosition;return e;});},getSuggestionLimit:function(u){var c=b.properties[u];if(typeof c==='undefined'){return Infinity;}var l;if(this.model.getDataSource()===this.model.sinaNext.allDataSource){l=c.limitDsAll;}else{l=c.limit;}return l;},limitSuggestions:function(s){var n={};for(var i=0;i<s.length;++i){var c=s[i];var d=c.uiSuggestionType;if(d===b.SearchTermHistory){d=b.SearchTermData;}var l=this.getSuggestionLimit(d);var e=n[d];if(typeof e==='undefined'){e=0;n[d]=e;}if(e>=l){s.splice(i,1);--i;continue;}n[d]=e+1;}},updateSuggestions:function(s){var c=sap.ui.getCore().byId('searchFieldInShell-input');var d=c.getSuggestionRows();var e;for(var i=0;i<d.length;++i){var f=d[i];var g=f.getBindingContext().getObject();if(f.getSelected()){e=g.key;}}this.model.setProperty('/suggestions',s);if(!e){return;}window.setTimeout(function(){var d=c.getSuggestionRows();for(var j=0;j<d.length;++j){var f=d[j];var g=f.getBindingContext().getObject();if(g.key===e){c._oSuggPopover._iPopupListSelectedIndex=j;f.setSelected(true);f.rerender();}}},100);}};return s.SuggestionHandler;});

// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(['sap/base/Log','sap/ushell/renderers/fiori2/search/SearchFacetDialogModel','sap/ushell/renderers/fiori2/search/controls/SearchFacetDialog','sap/m/GroupHeaderListItemRenderer','sap/m/ButtonRenderer'],function(L){"use strict";sap.m.Button.extend('sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDown',{renderer:'sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDownRenderer'});sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDownRenderer=jQuery.extend(true,{},sap.m.ButtonRenderer);sap.m.GroupHeaderListItemRenderer.extend('sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItemRenderer');sap.m.GroupHeaderListItem.extend('sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItem',{renderer:'sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItemRenderer',metadata:{properties:{upperCase:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{button:{type:'sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDown',multiple:false}}}});sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItemRenderer.renderCounter=function(r,l){var b=l.getButton();if(typeof b==='object'){this.renderCounterContent(r,l,b);}};sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItemRenderer.renderCounterContent=function(r,l,b){r.write('<div>');r.renderControl(b);r.write('</div>');};sap.m.SegmentedButtonItem.extend('my.SegmentedButtonItem',{aggregations:{"content1":{type:"sap.ui.core.Control",multiple:false}}});sap.ui.core.Control.extend('sap.ushell.renderers.fiori2.search.controls.SearchFacetTabBar',{metadata:{properties:{"eshRole":"string","headerText":"string","selectedButtonParameters":{type:"object",defaultValue:null}},aggregations:{items:{type:"sap.m.IconTabFilter",multiple:true}}},getSearchFacetTabBarAndDimensionById:function(b){var r={};r.index=0;var a=document.getElementById(b);var v=a.dataset.facetView;var c=a.dataset.facetViewIndex;var d=$("#"+b).parent()[0];var e=d.dataset.facetDimension;var f=$(".sapUshellSearchFacetTabBar");for(var i=0;i<f.length;i++){var g=$(".sapUshellSearchFacetTabBar .sapUshellSearchFacetTabBarHeader")[i];var h=g.dataset.facetDimension;if(h===e){r.index=i;r.control=sap.ui.getCore().byId(f[i].id);r.view=v;r.buttonIndex=c;r.dimension=e;break;}}return r;},storeClickedTabInformation:function(e){var s,a,b,d,c;var t=e.getSource().sId;var f=this.getSearchFacetTabBarAndDimensionById(t);var p=f.control.getModel().getPersonalizationStorageInstance().getItem("search-facet-panel-chart-state");s=f.dimension;a=f.control;b=f.view;c=f.buttonIndex;d=a.getBindingContext().getObject().dimension;var g=e.getParameters().id;var h=[];var o={};o.tabId=t;o.searchFacetTabBarIndex=f.searchFacetTabBarIndex;o.buttonId=g;o.buttonIndex=c;o.dimension=d;o.view=b;h.push(o);if(p&&Object.prototype.toString.call(p)==='[object Array]'){for(var i=0;i<p.length;i++){var j=p[i];if(j.dimension!==s){h.push(j);}}}f.control.getModel().getPersonalizationStorageInstance().setItem("search-facet-panel-chart-state",h);a.getBindingContext().getObject().chartIndex=c;},renderer:function(r,c){var a=function(y,T){return function(z){var d;var E=$(this.getDomRef()).closest(".sapUshellSearchFacetTabBar")[0];var J=sap.ui.getCore().byId($(E).attr("id"));var K=new sap.ushell.renderers.fiori2.search.SearchFacetDialogModel(c.getModel());K.initBusinessObjSearch().then(function(){K.setData(c.getModel().getData());K.sinaNext=c.getModel().sinaNext;K.prepareFacetList();if(J&&J.getBindingContext()&&J.getBindingContext().getObject()&&J.getBindingContext().getObject().dimension){d=J.getBindingContext().getObject().dimension;}var M=new sap.ushell.renderers.fiori2.search.controls.SearchFacetDialog({selectedAttribute:d,selectedTabBarIndex:y,tabBarItems:T});M.setModel(K);M.setModel(c.getModel(),'searchModel');M.open();var P=c.getParent().getParent().getParent().getParent();P.oFacetDialog=M;c.getModel().eventLogger.logEvent({type:c.getModel().eventLogger.FACET_SHOW_MORE,referencedAttribute:d});});};};r.write('<div tabindex="0"');r.writeControlData(c);r.addClass("sapUshellSearchFacetTabBar");r.writeClasses();r.write('>');var d=c.getBindingContext().getObject().dimension;var b=c.getBindingContext().getObject().dataType;var t=c.getBindingContext().getObject().title;var e;var s;e=c.getModel().getPersonalizationStorageInstance().getItem("search-facet-panel-chart-state");if(e&&Object.prototype.toString.call(e)==='[object Array]'){for(var k=0;k<e.length;k++){if(e[k].dimension===d){s=e[k];break;}}}var f=[];var g=[];var C=null;var B=null;var h=0;if(s&&s.buttonIndex){h=s.buttonIndex;h=parseInt(h,10);}if(b!=c.getModel().sinaNext.AttributeType.String){h=0;}c.getBindingContext().getObject().chartIndex=h;var j=c.getItems();var D=new sap.ushell.renderers.fiori2.search.controls.SearchFacetDisplayModeDropDown({icon:j[h].getIcon(),type:'Transparent'});for(var i=0;i<j.length;i++){C=j[i].getContent()[0];B=new sap.m.Button({text:j[i].getText(),icon:j[i].getIcon(),press:function(E){c.storeClickedTabInformation(E);c.setSelectedButtonParameters(E.getParameters());}});B.data("facet-view",j[i].getText(),true);B.data("facet-view-index",""+i,true);B.data("dimension",d,true);f.push(B);g.push(C);}var A=new sap.m.ActionSheet({showCancelButton:false,buttons:f,placement:sap.m.PlacementType.Bottom,cancelButtonPress:function(y){L.info("sap.m.ActionSheet: cancelButton is pressed");},afterClose:function(y){var z=this;window.setTimeout(function(){var d=z.getFocusDomRef().getAttribute('data-facet-dimension');var E=$(".sapUshellSearchFacetTabBarButton");for(var i=0;i<E.length;i++){var J=E[i];var K=J.parentNode.parentNode.getAttribute('data-facet-dimension');if(K===d){J.focus();break;}}},100);L.info("=====================");L.info("sap.m.ActionSheet: closed");}});A.data("facet-dimension",d,true);D.addStyleClass("sapUshellSearchFacetTabBarButton");var l=j[h].getText();var m=sap.ushell.resources.i18n.getText('displayAs',[l]);D.setTooltip(m);D.attachPress(function(E){A.openBy(this);});D.onAfterRendering=function(){$(this.getDomRef()).attr("aria-label",sap.ushell.resources.i18n.getText('dropDown'));};if(c.getHeaderText()){var H=new sap.m.List({});H.setShowNoData(false);H.setShowSeparators(sap.m.ListSeparators.None);H.data("sap-ui-fastnavgroup","false",true);var F=false;var n=c.getModel().getProperty("/uiFilter/rootCondition");if(n.hasFilters()){F=true;}else{F=false;}var R=new sap.m.Button({icon:"sap-icon://clear-filter",tooltip:sap.ushell.resources.i18n.getText("resetFilterButton_tooltip"),type:'Transparent',enabled:F,press:function(E){var y=c.getModel();y.eventLogger.logEvent({type:y.eventLogger.CLEAR_ALL_FILTERS});y.resetFilterConditions(true);}});R.addStyleClass("sapUshellSearchFilterByResetButton");R.onAfterRendering=function(){$(this.getDomRef()).attr("aria-label",sap.ushell.resources.i18n.getText('resetFilterButton_tooltip'));};var o=new sap.m.Title({text:c.getHeaderText()});o.addStyleClass("sapUshellSearchFilterByResetButtonLabel");var S=new sap.m.ToolbarSpacer();var p=new sap.m.Toolbar({content:[o,S,R]});p.data("sap-ui-fastnavgroup","false",true);H.setHeaderToolbar(p);H.addStyleClass('sapUshellSearchFilterByHeaderList');H.onAfterRendering=function(){$(".sapUshellSearchFilterByHeaderList").find("ul").attr("tabindex","-1");$(".sapUshellSearchFilterByHeaderList").find("div").attr("tabindex","-1");};r.renderControl(H);}var q=new sap.m.CustomListItem({content:g[h]});q.setModel(c.getModel(),'facets');q.addStyleClass("sapUshellSearchFacetList");var G;if(b===c.getModel().sinaNext.AttributeType.String){G=new sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItem({title:t,button:D});}else{G=new sap.ushell.renderers.fiori2.search.controls.SearchGroupHeaderListItem({title:t});}G.data("facet-dimension",d,true);G.addStyleClass("sapUshellSearchFacetTabBarHeader");var u=new sap.m.Link({text:sap.ushell.resources.i18n.getText("showMore"),press:a(h,j)});u.setModel(c.getModel("i18n"));u.addStyleClass('sapUshellSearchFacetShowMoreLink');var I=new sap.m.Label({text:""});I.addStyleClass('sapUshellSearchFacetInfoZeile');var v=new sap.m.VBox({items:[I,u]});var w=new sap.m.CustomListItem({content:v,visible:{parts:[{path:'/uiFilter/dataSource'}],formatter:function(y){return y.type!==this.getModel().sinaNext.DataSourceType.Category;}}});w.addStyleClass('sapUshellSearchFacetShowMoreItem');var x=new sap.m.List({showSeparators:sap.m.ListSeparators.None,items:[G,q,w]});x.data("sap-ui-fastnavgroup","false",true);x.setModel(c.getModel());r.renderControl(x);c.getItems()[h].addContent(g[h]);r.write("</div>");},onAfterRendering:function(){jQuery(this.getDomRef()).removeAttr("tabindex");}});});

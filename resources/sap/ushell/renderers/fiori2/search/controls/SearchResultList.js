// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchHelper'],function(S){"use strict";return sap.m.List.extend('sap.ushell.renderers.fiori2.search.controls.SearchResultList',{init:function(){if(sap.m.List.prototype.init){sap.m.List.prototype.init.apply(this,arguments);}this.addStyleClass("searchResultList");},renderer:'sap.m.ListRenderer',onAfterRendering:function(){var t=this;sap.m.List.prototype.onAfterRendering.apply(t,arguments);var m=sap.ushell.renderers.fiori2.search.getModelSingleton();var a=m.getProperty("/multiSelectionEnabled");if(a){t.enableSelectionMode(false);}t._prepareResizeHandler();t.collectListItemsForNavigation();},collectListItemsForNavigation:function(){var t=this;var m=t.getItems();if(m.length===0){return;}var d=function(){t._doCollectListItemsForNavigation();};for(var i=0;i<m.length;i++){var M=m[i];if(M.hasStyleClass("sapUshellSearchResultListItemApps")){var c=M.getContent();if(c.length>0){c[0].addEventDelegate({onAfterRendering:d});}}}t._doCollectListItemsForNavigation();},_doCollectListItemsForNavigation:function(){var t=this;var i,j;var f=t.getDomRef();if(!f){return;}var I=t.getItemNavigation();if(!I){t._startItemNavigation();I=t.getItemNavigation();}if(!I){return;}t._bItemNavigationInvalidated=false;var r=f.getElementsByTagName("li");var d=[];var T=[];for(i=0;i<r.length;i++){var R=r[i];if($(R).hasClass("sapUshellSearchResultListItemApps")){var a=R.getElementsByClassName("sapUshellSearchTileWrapper");for(j=0;j<a.length;j++){var b=S.getFocusableTileDomRef(a[j]);if(!b||$(b).is(":hidden")){continue;}d.push(b);T.push(b);}$(R).removeAttr("tabindex");$(R).removeAttr("role");$(R).attr("aria-hidden","true");}else if($(R).hasClass("sapUshellSearchResultListFooter")){var s=R.getElementsByClassName("sapUshellResultListMoreFooter");for(j=0;j<s.length;j++){d.push(s[j]);T.push(s[j]);}}else if($(R).hasClass("sapUshellSearchResultListItem")){d.push(R);T.push(R);}}if(d.length>0){var c=$(d[0]).closest("ul");var e=c.length>0?c[0]:d[0].parentElement;I.setRootDomRef(e);}I.setItemDomRefs(d);I.setCycling(false);I.setPageSize(10);if(T.length>0){var g=$(T[0]).attr("id");for(i=1;i<T.length;i++){g+=" "+$(T[i]).attr("id");}$(t.getDomRef()).children("[role='listbox']").attr("aria-owns",g);}},_prepareResizeHandler:function(){var t=this;var r=[768,1151];var w=function(){var b=window.innerWidth;if(b<r[0]){return 0;}for(var i=0;i<r.length-1;i++){if(b>=r[i]&&b<r[i+1]){return i+1;}}return r.length;};var l=w();var a=function(e){var c=w();if(c!=l){l=c;var m=t.getItems();for(var i=0;i<m.length;i++){var M=m[i];if(M.getContent()&&M.getContent().length>0&&M.getContent()[0].resizeEventHappened){M.getContent()[0].resizeEventHappened();}}}};$(window).on("resize",a);},enableSelectionMode:function(a){var t=this;var d=jQuery.Deferred();a=a===undefined?true:a;var s=$(t.getDomRef());if(!a){s.addClass("sapUshellSearchResultList-ShowMultiSelection");d.resolve();return d.promise();}var b=200;var c=s.find(".sapUshellSearchResultListItem-CheckboxExpandContainer");var e=s.find(".sapUshellSearchResultListItem-Attributes");var f=parseFloat(e.css("padding-left"));var g=c.find(".sapUshellSearchResultListItem-CheckboxContainer");var h=g.width();if(!s.hasClass("sapUshellSearchResultList-ShowMultiSelection")){c.css("width","0");c.css("opacity","0");e.css("padding-left",f);s.addClass("sapUshellSearchResultList-ShowMultiSelection");var n=f+h;var i=c.animate({"width":h,"opacity":1},b,function(){$(this).css("width","");$(this).css("opacity","");});var j=e.animate({"padding-left":n},b,function(){$(this).css("padding-left","");});jQuery.when(i,j).done(function(){d.resolve();});}else{d.resolve();}return d.promise();},disableSelectionMode:function(a){var t=this;var d=jQuery.Deferred();a=a===undefined?true:a;var s=$(t.getDomRef());if(!a){s.removeClass("sapUshellSearchResultList-ShowMultiSelection");d.resolve();return d.promise();}var b=200;var c=s.find(".sapUshellSearchResultListItem-CheckboxExpandContainer");var e=s.find(".sapUshellSearchResultListItem-Attributes");var f=parseFloat(e.css("padding-left"));var g=c.find(".sapUshellSearchResultListItem-CheckboxContainer");var h=g.width();if(s.hasClass("sapUshellSearchResultList-ShowMultiSelection")){var n=f-h;var i=c.animate({"width":0,"opacity":0},b).promise();var j=e.animate({"padding-left":n},b).promise();jQuery.when(i,j).done(function(){s.removeClass("sapUshellSearchResultList-ShowMultiSelection");c.css("width","");c.css("opacity","");e.css("padding-left","");d.resolve();});}else{d.resolve();}return d.promise();}});});

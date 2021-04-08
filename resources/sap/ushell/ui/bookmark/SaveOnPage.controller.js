// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ushell/services/AppConfiguration","sap/ui/thirdparty/datajs","sap/base/util/isEmptyObject","sap/base/Log","sap/ui/model/json/JSONModel","sap/ushell/resources","sap/ui/thirdparty/hasher"],function(C,A,O,a,L,J,r,h){"use strict";return C.extend("sap.ushell.ui.bookmark.SaveOnPage",{onInit:function(){this.oView=this.getView();this.oViewData=this.oView.getViewData();this.oAppData=this.oViewData.appData||{};this.oView.setModel(r.i18nModel,"i18n");if(!a(this.oAppData)){this.oModel=new J({showPageSelection:this.oAppData.showPageSelection!==false,showInfo:this.oAppData.showInfo!==false,showIcon:this.oAppData.showIcon!==false,showPreview:this.oAppData.showPreview!==false,title:this.oAppData.title?this.oAppData.title.substring(0,256):"",subtitle:this.oAppData.subtitle?this.oAppData.subtitle.substring(0,256):"",numberValue:"",info:this.oAppData.info?this.oAppData.info.substring(0,256):"",icon:this.oAppData.icon||A.getMetadata().icon,numberUnit:this.oAppData.numberUnit,keywords:this.oAppData.keywords||""});this.oView.setModel(this.oModel);}if(this.oViewData.serviceUrl){var s=typeof(this.oViewData.serviceUrl)==="function"?this.oViewData.serviceUrl():this.oViewData.serviceUrl;this.oView.getModel().setProperty("serviceUrl",s);this.loadTileDataFromServiceUrl(s);}},loadTileDataFromServiceUrl:function(s){var t=this;O.read({requestUri:s},function(R){if(typeof R==="string"){R={number:R};}t.oModel.setProperty("/numberValue",R.number);var k=["infoState","stateArrow","numberState","numberDigits","numberFactor","numberUnit"];for(var i=0;i<k.length;i++){var b=k[i];if(R[b]){t.oModel.setProperty("/"+b,R[b]);}}},function(e){L.error("sap.ushell.ui.footerbar.SaveAsTile",e);},{read:function(b){b.data=JSON.parse(b.body).d;}});},loadPagesIntoModel:function(s,p){if(s&&!p){return Promise.all([sap.ushell.Container.getServiceAsync("Menu"),sap.ushell.Container.getServiceAsync("CommonDataModel")]).then(function(S){return Promise.all([S[0].getSpacesPagesHierarchy(),S[1].getAllPages()]);}).then(function(R){var S=R[0].spaces;var b=R[1];var P={};b.forEach(function(o){P[o.identification.id]=o.identification.title;});return S.reduce(function(t,o){o.pages.map(function(c){if(P[c.id]){t.push({id:c.id,title:P[c.id],spaceTitle:o.title});}});return t;},[]);}).then(function(t){if(t.length<1){return Promise.reject();}this.getView().getModel().setProperty("/pages",t);}.bind(this)).catch(function(){this.getView().getModel().setProperty("/pages",[]);this.getView().getModel().setProperty("/cannotLoadPages",true);L.error("SaveOnPage controller: Unable to determine or use targets for bookmark placement.");}.bind(this));}},removeFocusFromTile:function(){this.getView().getDomRef().querySelector(".sapMGT").removeAttribute("tabindex");},getBookmarkTileData:function(){var m=this.getView().getModel();var v=this.getView().getViewData();var u;if(v.customUrl){if(typeof(v.customUrl)==="function"){u=v.customUrl();}else{u=v.customUrl;}}else{u=h.getHash()?("#"+h.getHash()):window.location.href;}return{title:m.getProperty("/title")?m.getProperty("/title").substring(0,256).trim():"",subtitle:m.getProperty("/subtitle")?m.getProperty("/subtitle").substring(0,256).trim():"",url:u,icon:m.getProperty("/icon"),info:m.getProperty("/info")?m.getProperty("/info").substring(0,256).trim():"",numberUnit:v.numberUnit,serviceUrl:typeof(v.serviceUrl)==="function"?v.serviceUrl():v.serviceUrl,serviceRefreshInterval:v.serviceRefreshInterval,pages:this.byId("pageSelect")?this.byId("pageSelect").getSelectedKeys():[],keywords:v.keywords};}});});

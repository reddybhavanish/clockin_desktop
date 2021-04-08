// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/AppConfiguration","sap/ushell/Config","sap/ui/thirdparty/datajs","sap/base/util/isEmptyObject","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/model/json/JSONModel","sap/ushell/resources"],function(A,C,O,a,L,q,J,r){"use strict";sap.ui.controller("sap.ushell.ui.footerbar.SaveAsTile",{onExit:function(){var v=this.getView();var t=v.getTileView();t.destroy();},onInit:function(){var b=A.getMetadata();this.oView=this.getView();this.appData=this.oView.viewData.appData||{};if(!a(this.appData)){this.oModel=new J({sizeBehavior:C.last("/core/home/sizeBehavior"),showGroupSelection:this.appData.showGroupSelection!==false,showInfo:this.appData.showInfo!==false,showIcon:this.appData.showIcon!==false,showPreview:this.appData.showPreview!==false,title:this.appData.title?this.appData.title.substring(0,256):"",subtitle:this.appData.subtitle?this.appData.subtitle.substring(0,256):"",numberValue:"",info:this.appData.info?this.appData.info.substring(0,256):"",icon:this.appData.icon||b.icon,numberUnit:this.appData.numberUnit,keywords:this.appData.keywords||"",groups:[]});this.oView.setModel(this.oModel);}},calcTileDataFromServiceUrl:function(s){var t=this;O.read({requestUri:s},function(R){if(typeof R==="string"){R={number:R};}t.oModel.setProperty("/numberValue",R.number);var k=["infoState","stateArrow","numberState","numberDigits","numberFactor","numberUnit"];for(var i=0;i<k.length;i++){var b=k[i];if(R[b]){t.oModel.setProperty("/"+b,R[b]);}}},function(e){L.error("sap.ushell.ui.footerbar.SaveAsTile",e);},{read:function(b){b.data=JSON.parse(b.body).d;}});},loadPersonalizedGroups:function(){var b=new Promise(function(c,d){if(C.last("/core/spaces/enabled")){sap.ushell.Container.getServiceAsync("Menu").then(function(m){return m.getSpacesPagesHierarchy();}).then(function(s){c(s.spaces);}).catch(function(){d();});}else{this.oPageBuilderService=sap.ushell.Container.getService("LaunchPage");c(this.oPageBuilderService.getGroupsForBookmarks());}}.bind(this));return b.then(function(B){var m=this.oView.getModel();m.setProperty("/groups",B);m.setProperty("/groups/length",B.length);}.bind(this)).catch(function(){L.error("SaveAsTile controller: Unable to determine targets for bookmark placement.");});},getLocalizedText:function(m,p){return p?r.i18n.getText(m,p):r.i18n.getText(m);}});});

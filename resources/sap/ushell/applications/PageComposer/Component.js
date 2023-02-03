// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/UIComponent","./controller/ErrorDialog","sap/ui/model/json/JSONModel","./util/PagePersistence"],function(U,E,J,P){"use strict";return U.extend("sap.ushell.applications.PageComposer.Component",{metadata:{"manifest":"json"},_oTransportPromise:null,init:function(){U.prototype.init.apply(this,arguments);this.getRouter().initialize();var c=this.getComponentData();var s=c&&c.startupParameters;this._handleStartupParams(s||{});this.getModel("PageRepository").setHeaders({"sap-language":sap.ushell.Container.getUser().getLanguage(),"sap-client":sap.ushell.Container.getLogonSystem().getClient()});this.getModel("PageRepository").getMetaModel().loaded().then(this.setMetaModelData.bind(this));this.getModel("PageRepository").attachMetadataFailed(function(e){this.getRouter().navTo("ODataError",e,true);}.bind(this));this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"message");},getPageRepository:function(){if(!this.oPagePersistenceInstance){this.oPagePersistenceInstance=new P(this.getModel("PageRepository"),this.getModel("i18n").getResourceBundle(),this.getModel("message"));}return this.oPagePersistenceInstance;},isTransportSupported:function(){return true;},_handleStartupParams:function(s){var p=s.pageId&&s.pageId[0];var m=s.mode&&s.mode[0];if(p){m=["edit","view"].indexOf(m)>-1?m:"view";this.getRouter().navTo(m,{pageId:encodeURIComponent(p)},true);}},showErrorDialog:function(e){E.open(e,this.getModel("i18n"));},createTransportComponent:function(p){if(this.isTransportSupported()){if(!this._oTransportPromise){this._oTransportPromise=this.createComponent({async:true,usage:"transportInformation"});}return this._oTransportPromise.then(function(t){t.reset({"package":p});return t;});}return Promise.reject();},setMetaModelData:function(){var m=this.getModel("PageRepository").getMetaModel(),M={copySupported:!!m.getODataFunctionImport("copyPage"),deleteSupported:!!m.getODataFunctionImport("deletePage"),createSupported:this.getMetadata().getConfig().enableCreate};this.setModel(new J(M),"SupportedOperationModel");},castBoolean:function(f){return JSON.parse(f||"true");},setMetaModelDataSapDelivered:function(){var m=this.getModel("PageRepository").getMetaModel(),M={copySupported:this.castBoolean(m.getODataEntitySet("pagesMasterSet")["sap:creatable"])||!!m.getODataFunctionImport("copyPage"),deleteSupported:this.castBoolean(m.getODataEntitySet("pagesMasterSet")["sap:deletable"]),createSupported:this.castBoolean(m.getODataEntitySet("pagesMasterSet")["sap:creatable"]),updateSupported:this.castBoolean(m.getODataEntitySet("pagesMasterSet")["sap:updatable"])};this.setModel(new J(M),"SupportedOperationModel");}});});

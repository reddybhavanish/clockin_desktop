// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/ui/Device","sap/ui/core/UIComponent","sap/ui/model/json/JSONModel","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/resources","sap/ushell/utils/WindowUtils"],function(L,D,U,J,C,E,r,W){"use strict";function g(){return sap.ui.getCore().byId("productSwitchBtn");}function a(){return sap.ui.getCore().byId("sapUshellProductSwitchPopover");}function b(){sap.ushell.Container.getRenderer("fiori2").hideHeaderEndItem("productSwitchBtn");}return U.extend("sap.ushell.components.shell.ProductSwitch.Component",{metadata:{version:"1.78.0",library:"sap.ushell.components.shell.ProductSwitch",dependencies:{libs:["sap.m","sap.f"]}},createContent:function(){this.oModel=this._getModel();this.aDoables=[];},_getModel:function(){var t=this,m=new J();m.loadData(C.last("/core/productSwitch/url")).then(function(){var p=m.getData();if(p.length===0){L.debug("There are no other profucts configured for your user. ProductSwitch button will be hidden.");b();}else{g().setVisible(true);t.aDoables.push(E.on("showProductSwitch").do(t._openProductSwitch.bind(t)));}}).catch(function(e){L.debug(e);b();});return m;},_openProductSwitch:function(){var p=a();if(!p){p=sap.ui.xmlfragment("sap.ushell.components.shell.ProductSwitch.ProductSwitch",this);p.setModel(this.oModel);p.setModel(r.i18nModel,"i18n");if(D.system.phone){p.setShowHeader(true);}}var s=g();if(!s||!s.$().width()){s=sap.ui.getCore().byId("endItemsOverflowBtn");}p.openBy(s);},onProductItemPress:function(e){var t=e.getParameter("itemPressed").getTargetSrc();a().close();W.openURL(t,"_blank");},exit:function(){var p=a();if(!p){p.destroy();}this.aDoables.forEach(function(d){d.off();});}});});
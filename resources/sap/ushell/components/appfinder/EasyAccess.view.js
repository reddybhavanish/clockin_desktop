// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/SplitApp","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/ui/core/library","sap/ushell/resources"],function(S,A,c,r){"use strict";var V=c.mvc.ViewType;sap.ui.jsview("sap.ushell.components.appfinder.EasyAccess",{BUSY_INDICATOR_DELAY:1000,createContent:function(C){this.oResourceBundle=r.i18n;this.setModel(this.getViewData().easyAccessSystemsModel,"easyAccessSystemsModel");this.setModel(this.getViewData().subHeaderModel,"subHeaderModel");this.setModel(this.getViewData().parentComponent.getModel());this.hierarchyFolders=sap.ui.view({type:V.JS,viewName:"sap.ushell.components.appfinder.HierarchyFolders",height:"100%",viewData:{navigateHierarchy:this.oController.navigateHierarchy.bind(C),easyAccessSystemsModel:this.getModel("easyAccessSystemsModel"),subHeaderModel:this.getModel("subHeaderModel")}});this.hierarchyFolders.setBusyIndicatorDelay(this.BUSY_INDICATOR_DELAY);this.hierarchyFolders.addStyleClass("sapUshellHierarchyFolders");this.hierarchyFolders.addCustomData(new A({key:"role",value:"navigation",writeToDom:true}));this.hierarchyFolders.addCustomData(new A({key:"aria-label",value:this.oResourceBundle.getText("easyAccessListNavigationContainer"),writeToDom:true}));this.hierarchyApps=new sap.ui.view(this.getId()+"hierarchyApps",{type:V.JS,viewName:"sap.ushell.components.appfinder.HierarchyApps",height:"100%",viewData:{navigateHierarchy:this.oController.navigateHierarchy.bind(C)}});this.hierarchyApps.setBusyIndicatorDelay(this.BUSY_INDICATOR_DELAY);this.hierarchyApps.addStyleClass(" sapUshellAppsView sapMShellGlobalInnerBackground");this.hierarchyApps.addCustomData(new A({key:"role",value:"region",writeToDom:true}));this.hierarchyApps.addCustomData(new A({key:"aria-label",value:this.oResourceBundle.getText("easyAccessTileContainer"),writeToDom:true}));this.splitApp=new S({masterPages:this.hierarchyFolders,detailPages:this.hierarchyApps});this.splitApp.setInitialMaster(this.hierarchyFolders);this.splitApp.setInitialDetail(this.hierarchyApps);return this.splitApp;},getControllerName:function(){return"sap.ushell.components.appfinder.EasyAccess";}});});

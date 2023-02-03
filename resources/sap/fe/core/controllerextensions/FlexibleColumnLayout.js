/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2020 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/ui/model/json/JSONModel","sap/f/FlexibleColumnLayoutSemanticHelper","sap/fe/core/CommonUtils","sap/ui/core/Component"],function(C,J,F,a,b){"use strict";var E=C.extend("sap.fe.core.controllerextensions.ContextManager",{oTargetsAggregation:{},mTargetsFromRoutePattern:{},FCLLevel:0,getFCLLevel:function(){return this.FCLLevel;},setFCLLevel:function(l){this.FCLLevel=l;},_getOwnerComponent:function(){return a.getAppComponent(this.base.getView());},handleFullScreen:function(e){var A=this._getOwnerComponent();var f=A.getRootViewController();var r=A.getRouterProxy();var n=e.getSource().getModel("fclhelper").getProperty("/actionButtonsInfo/fullScreen");if(!f.getCurrentArgument()[f.SQUERYKEYNAME]){f.getCurrentArgument()[f.SQUERYKEYNAME]={};}f.getCurrentArgument()[f.SQUERYKEYNAME].layout=n;r.navTo(f.getCurrentRouteName(),f.getCurrentArgument());},handleExitFullScreen:function(e){var A=this._getOwnerComponent();var f=A.getRootViewController();var r=A.getRouterProxy();var n=e.getSource().getModel("fclhelper").getProperty("/actionButtonsInfo/exitFullScreen");if(!f.getCurrentArgument()[f.SQUERYKEYNAME]){f.getCurrentArgument()[f.SQUERYKEYNAME]={};}f.getCurrentArgument()[f.SQUERYKEYNAME].layout=n;r.navTo(f.getCurrentRouteName(),f.getCurrentArgument());},handleClose:function(e){var c=e.getSource().getBindingContext();this.base.routing.navigateBackFromContext(c);}});return E;});

//Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/m/GenericTile","sap/ushell/resources","sap/ui/model/json/JSONModel","sap/ushell/Config","sap/ushell/components/pages/formatter/PageRuntimeFormatter","sap/m/library","sap/m/MessageToast","sap/ushell/components/pages/StateManager","sap/base/util/ObjectPath","sap/ushell/EventHub","sap/ushell/utils"],function(C,G,r,J,a,P,l,M,s,O,E,u){"use strict";return C.extend("sap.ushell.components.pages.controller.Pages",{formatter:P,onInit:function(){var p=a.last("/core/shell/enablePersonalization");if(a.last("/core/spaces/vizInstantiation/enabled")){this._oVisualizationInstantiationServicePromise=sap.ushell.Container.getServiceAsync("VisualizationInstantiation");}else{this._oVisualizationInstantiationServicePromise=sap.ushell.Container.getServiceAsync("VisualizationLoading");}this._oURLParsingService=sap.ushell.Container.getServiceAsync("URLParsing");this._oViewSettingsModel=new J({sizeBehavior:a.last("/core/home/sizeBehavior"),actionModeActive:false,showHideButton:a.last("/core/catalog/enableHideGroups"),enableVisualizationReordering:p,showPageTitle:false});this.getView().setModel(this._oViewSettingsModel,"viewSettings");this._aConfigListeners=a.on("/core/home/sizeBehavior").do(function(S){this._oViewSettingsModel.setProperty("/sizeBehavior",S);}.bind(this));this._oErrorPageModel=new J({icon:"sap-icon://documents",text:"",description:"",details:""});this.getView().setModel(this._oErrorPageModel,"errorPage");Promise.all([this._oVisualizationInstantiationServicePromise,this.getOwnerComponent().getPagesService()]).then(function(S){this._oVisualizationInstantiationService=S[0];this.getView().setModel(S[1].getModel());}.bind(this));this.sCurrentTargetPageId="";this._openFLPPage();this.oContainerRouter=sap.ushell.Container.getRenderer().getRouter();this.oContainerRouter.getRoute("home").attachMatched(this._openFLPPage,this);this.oContainerRouter.getRoute("openFLPPage").attachMatched(this._openFLPPage,this);this.oErrorPage=this.byId("errorPage");this.oPagesNavContainer=this.byId("pagesNavContainer");this.oPagesRuntimeNavContainer=this.byId("pagesRuntimeNavContainer");s.init(this.oPagesRuntimeNavContainer,this.oPagesNavContainer);this.oEventHubListener=E.once("PagesRuntimeRendered").do(function(){if(p){this._createActionModeButton();}}.bind(this));this._oEventBus=sap.ui.getCore().getEventBus();this._oEventBus.subscribe("launchpad","shellFloatingContainerIsDocked",this._handleUshellContainerDocked,this);this._oEventBus.subscribe("launchpad","shellFloatingContainerIsUnDocked",this._handleUshellContainerDocked,this);this.oVisualizationLoadingListener=E.on("VizInstanceLoaded").do(function(){this._setPerformanceMark();if(!this.oVisualizationLoadingListenerTimeout){this.oVisualizationLoadingListenerTimeout=setTimeout(function(){this.oVisualizationLoadingListener.off();}.bind(this),5000);}}.bind(this));},_setPerformanceMark:function(){u.setPerformanceMark("FLP-TTI-Homepage",{bUseUniqueMark:true,bUseLastMark:true});},_getPageAndSpaceId:function(){return this._oURLParsingService.then(function(b){var h=b.parseShellHash(window.hasher.getHash());var i={semanticObject:h.semanticObject||"",action:h.action||""};var H=h.params||{};var p=H.pageId||[];var S=H.spaceId||[];return this._parsePageAndSpaceId(p,S,i);}.bind(this));},_parsePageAndSpaceId:function(p,b,i){if(p.length<1&&b.length<1){if(i.semanticObject==="Shell"&&i.action==="home"){return this._getAssignedPage();}return Promise.reject(r.i18n.getText("PageRuntime.NoPageIdAndSpaceIdProvided"));}if(p.length===1&&b.length===0){return Promise.reject(r.i18n.getText("PageRuntime.OnlyPageIdProvided"));}if(p.length===0&&b.length===1){return Promise.reject(r.i18n.getText("PageRuntime.OnlySpaceIdProvided"));}if(p.length>1||b.length>1){return Promise.reject(r.i18n.getText("PageRuntime.MultiplePageOrSpaceIdProvided"));}if(p[0]===""){return Promise.reject(r.i18n.getText("PageRuntime.InvalidPageId"));}if(b[0]===""){return Promise.reject(r.i18n.getText("PageRuntime.InvalidSpaceId"));}return Promise.resolve({pageId:p[0],spaceId:b[0]});},_getAssignedPage:function(){return sap.ushell.Container.getServiceAsync("Menu").then(function(m){return m.getMenuEntries();}).then(function(m){if(m.length===0){return Promise.reject(r.i18n.getText("PageRuntime.NoAssignedPage"));}var p={};if(O.get("target.parameters",m[0])){m[0].target.parameters.forEach(function(o){if(o.name&&o.value){p[o.name]=o.value;}});}if(!p.spaceId||!p.pageId){return Promise.reject(r.i18n.getText("PageRuntime.CannotFindADefaultPage"));}return{spaceId:p.spaceId,pageId:p.pageId};});},_openFLPPage:function(){var p,S;return this._getPageAndSpaceId().then(function(i){p=i.pageId;S=i.spaceId;this.sCurrentTargetPageId=p;return this.getOwnerComponent().getPagesService().then(function(b){return b.loadPage(p);}).then(function(){E.emit("PagesRuntimeRendered");if(this.sCurrentTargetPageId===p){this._navigate(p,S);}}.bind(this)).catch(function(e){E.emit("PagesRuntimeRendered");if(e instanceof Error){this._oErrorPageModel.setProperty("/text",r.i18n.getText("PageRuntime.GeneralError.Text"));}else{var d=r.i18n.getText("PageRuntime.CannotLoadPage.Description")+JSON.stringify(e);this._oErrorPageModel.setProperty("/icon","sap-icon://documents");this._oErrorPageModel.setProperty("/text",r.i18n.getText("PageRuntime.CannotLoadPage.Text",[p,S]));this._oErrorPageModel.setProperty("/description","");this._oErrorPageModel.setProperty("/details",d);}this.oPagesRuntimeNavContainer.to(this.oErrorPage);}.bind(this));}.bind(this)).catch(function(e){E.emit("PagesRuntimeRendered");this._oErrorPageModel.setProperty("/icon","sap-icon://documents");this._oErrorPageModel.setProperty("/text",e||"");this._oErrorPageModel.setProperty("/description","");this._oErrorPageModel.setProperty("/details","");this.oPagesRuntimeNavContainer.to(this.oErrorPage);}.bind(this));},_navigate:function(t,b){var p=this.oPagesNavContainer.getPages().find(function(c){return t===c.data("pageId");});if(!p){return Promise.reject();}return sap.ushell.Container.getServiceAsync("Menu").then(function(m){return m.hasMultiplePages(b);}).then(function(h){this._oViewSettingsModel.setProperty("/showPageTitle",h);this.oPagesNavContainer.to(p);this.oPagesRuntimeNavContainer.to(this.oPagesNavContainer);}.bind(this));},_pressViewDetailsButton:function(){var e=this._oErrorPageModel.getProperty("/details")||"";this._oErrorPageModel.setProperty("/description",e);},_copyToClipboard:function(){var t=document.createElement("textarea");try{t.contentEditable=true;t.readonly=false;t.textContent=this._oErrorPageModel.getProperty("/description");document.documentElement.appendChild(t);t.select();document.execCommand("copy");M.show(r.i18n.getText("PageRuntime.CannotLoadPage.CopySuccess"),{closeOnBrowserNavigation:false});}catch(e){M.show(r.i18n.getText("PageRuntime.CannotLoadPage.CopyFail"),{closeOnBrowserNavigation:false});}finally{t.parentNode.removeChild(t);}},_visualizationFactory:function(i,c){if(this._oVisualizationInstantiationService){var d=c.getObject();var v=this._oVisualizationInstantiationService.instantiateVisualization(d);v.attachPress(this.onVisualizationPress,this);v.bindEditable("viewSettings>/actionModeActive");return v;}return new G({state:l.LoadState.Failed});},onVisualizationPress:function(e){var S=e.getParameter("scope");var A=e.getParameter("action");var c=e.getSource().getBindingContext();var p=c.getPath();var b=p.split("/");if(S==="Actions"&&A==="Remove"){return this.getOwnerComponent().getPagesService().then(function(o){o.deleteVisualization(b[2],b[4],b[6]);M.show(r.i18n.getText("PageRuntime.MessageToast.TileDeleted"));});}return Promise.resolve();},onExit:function(){this.oContainerRouter.getRoute("home").detachMatched(this._openFLPPage,this);this.oContainerRouter.getRoute("openFLPPage").detachMatched(this._openFLPPage,this);this._aConfigListeners.off();this.oEventHubListener.off();this._oEventBus.unsubscribe("launchpad","shellFloatingContainerIsDocked",this._handleUshellContainerDocked,this);this._oEventBus.unsubscribe("launchpad","shellFloatingContainerIsUnDocked",this._handleUshellContainerDocked,this);s.exit();},_createActionModeButton:function(){var A={id:"ActionModeBtn",text:r.i18n.getText("PageRuntime.EditMode.Activate"),icon:"sap-icon://edit",press:[this.pressActionModeButton,this]};var t=sap.ui.getCore().byId(A.id);if(t){t.setTooltip(A.text);t.setText(A.text);t.attachPress(A.press);}else{var o={controlType:"sap.ushell.ui.launchpad.ActionItem",oControlProperties:A,bIsVisible:true,aStates:["home"]};var R=sap.ushell.Container.getRenderer("fiori2");R.addUserAction(o).done(function(b){t=b;if(a.last("/core/extension/enableHelp")){t.addStyleClass("help-id-ActionModeBtn");}});}},pressActionModeButton:function(){var A=this.getView().getModel("viewSettings").getProperty("/actionModeActive");sap.ui.require(["sap/ushell/components/pages/ActionMode"],function(b){if(A){b.cancel();}else{b.start(this);}}.bind(this));},handleEditModeAction:function(h,e,S,p){sap.ui.require(["sap/ushell/components/pages/ActionMode"],function(A){A[h](e,S,p);});},_getAncestorSection:function(c){if(c.isA("sap.ushell.ui.launchpad.Section")){return c;}else if(c.getParent){return this._getAncestorSection(c.getParent());}return null;},_getAncestorPage:function(c){if(c.isA("sap.ushell.ui.launchpad.Page")){return c;}else if(c.getParent){return this._getAncestorPage(c.getParent());}return null;},_setPromiseInSection:function(R,p){var v=new Promise(function(b,c){R.setVizMoveResolve(b);});p.setVizMovePromise(v);},moveVisualization:function(e,S,p){var b=p.draggedControl.getBindingContext().getPath();var t=p.droppedControl.getBindingContext().getPath();var d=p.dropPosition;var T=t.split("/");var i=-1;if(T.length>5){i=parseInt(T[6],10);}var c=b.split("/");var f=parseInt(c[2],10);var g=parseInt(c[4],10);var h=parseInt(c[6],10);var j=parseInt(T[4],10);if(g===j&&(h===i-1&&d==="Before"||h===i+1&&d==="After"||h===i)){return Promise.resolve();}if(d==="After"){i+=1;}var o=this._getAncestorSection(p.draggedControl);var k=this._getAncestorSection(p.droppedControl);p.draggedControl.invalidate();this._setPromiseInSection(o,k);return this.getOwnerComponent().getPagesService().then(function(m){m.moveVisualization(f,g,h,j,i);});},onDragEnter:function(e){var t=e.getParameter("dragSession").getDropControl();if(t.getDefault()){e.preventDefault();}},_handleUshellContainerDocked:function(c,e){this._oViewSettingsModel.setProperty("/ushellContainerDocked",e==="shellFloatingContainerIsDocked");}});});

sap.ui.define(["sap/ui/base/Object","sap/ui/generic/app/navigation/service/SelectionVariant","sap/ui/Device","sap/ui/comp/state/UIState","sap/ui/core/mvc/ControllerExtension","sap/base/Log","sap/base/util/deepEqual","sap/base/util/extend","sap/base/util/deepExtend"],function(B,S,D,U,C,L,d,e,a){"use strict";function g(s,c,n){var b="sap.suite.ui.generic.template.customData";var f="sap.suite.ui.generic.template.genericData";var h="sap.suite.ui.generic.template.extensionData";var F="visual";var j="compact";var p;var I=false,k=false,_=null,l;var o=null;var A=null;var r={appStateKey:"",urlParams:{}};var m={};function q(){return p.then(function(){if(r.appStateKey){return{"sap-iapp-state":[r.appStateKey]};}return r.urlParams;});}function R(i){if(i&&i.editStateFilter!==undefined){var e1=c.byId("editStateFilter");if(e1){e1.setSelectedKey((i.editStateFilter===null)?0:i.editStateFilter);}}var f1=s.oController.getOwnerComponent().getModel("_templPriv");if(i.chartVariantId&&s.oSmartChart){s.oSmartChart.setCurrentVariantId(i.chartVariantId);}if(i.filterMode){f1.setProperty('/alp/filterMode',i.filterMode);s.filterBarController.handleFilterSwitch(i.filterMode);}else{w();}if(i.contentView){var g1=f1.getProperty('/alp/enableHybridMode');if(g1===false&&i.contentView==='charttable'){f1.setProperty('/alp/contentView','chart');}else{((D.system.phone||D.system.tablet&&!D.system.desktop)&&i.contentView==="charttable")?f1.setProperty('/alp/contentView',"chart"):f1.setProperty('/alp/contentView',i.contentView);}}if(i.autoHide){f1.setProperty('/alp/autoHide',i.autoHide);}}function t(i){if(!i){return;}var e1=true;var f1=function(g1){if(!(g1 instanceof C)){throw new Error("State must always be retrieved with respect to a ControllerExtension");}var h1=g1.getMetadata().getNamespace();if(!e1){throw new Error("State must always be restored synchronously");}return i[h1];};c.templateBaseExtension.restoreExtensionAppStateData(f1);e1=false;}function u(i){i=i||{};if(i.hasOwnProperty(b)&&i.hasOwnProperty(f)){R(i[f]);M(i[b]);t(i[h]);}else{if(i._editStateFilter!==undefined){R({editStateFilter:i._editStateFilter});delete i._editStateFilter;}w();M(i);}}function v(i){if(s.oSmartFilterbar.isPending()){var e1=function(f1){var g1=f1.getParameters();if(!g1.pendingValue){s.oSmartFilterbar.detachPendingChange(e1);u(i);}};s.oSmartFilterbar.attachPendingChange(e1);}else{u(i);}}function w(){var i=s.oController.getOwnerComponent().getModel("_templPriv"),e1=s.oSmartFilterbar.isCurrentVariantStandard()?s.oController.getOwnerComponent().getDefaultFilterMode():i.getProperty('/alp/filterMode');if(!(e1===F||e1===j)){L.error("Defaulting to Visual filter due to incorrect value of defaultFilterMode in App descriptor");e1=F;}if(e1===F&&s.hideVisualFilter){L.error("Visual filter is hidden defaulting to compact");e1=j;}s.filterBarController.setDefaultFilter(e1);}function x(i){var e1=s.oController.getOwnerComponent().getProperty('smartVariantManagement');if(e1){var f1=i['sap-ui-fe-variant-id'];if(f1&&f1[0]){s.oSmartFilterbar.getSmartVariant().setCurrentVariantId(f1[0]);}}else{var g1=i['sap-ui-fe-variant-id'],h1=i['sap-ui-fe-filterbar-variant-id'],i1=i['sap-ui-fe-chart-variant-id'],j1=i['sap-ui-fe-table-variant-id'];y(h1&&h1[0],i1&&i1[0],j1&&j1[0],g1&&g1[0]);}}function y(i,e1,f1,g1){if(i||g1){s.oSmartFilterbar.getSmartVariant().setCurrentVariantId(i||g1);}if(s.oSmartChart&&(e1||g1)){s.oSmartChart.attachAfterVariantInitialise(function(h1){s.oSmartChart.setCurrentVariantId(e1||g1);});s.oSmartChart.setCurrentVariantId(e1||g1);}if(s.oSmartTable&&(f1||g1)){s.oSmartTable.attachAfterVariantInitialise(function(h1){s.oSmartTable.setCurrentVariantId(f1||g1);});s.oSmartTable.setCurrentVariantId(f1||g1);}}function z(i,e1,f1){s.oSmartFilterbar.setSuppressSelection(false);var g1=i.appStateKey||"";if(I){return;}A=g1;I=true;s.sNavType=f1;var h1=(!g1&&e1)||{};if(h1){x(h1);}if(f1!==sap.ui.generic.app.navigation.service.NavType.initial){var i1=i&&i.bNavSelVarHasDefaultsOnly;var j1=new S(i.selectionVariant);m=JSON.parse(i.selectionVariant);if((j1.getSelectOptionsPropertyNames().indexOf("DisplayCurrency")===-1)&&(j1.getSelectOptionsPropertyNames().indexOf("P_DisplayCurrency")===-1)&&(j1.getParameterNames().indexOf("P_DisplayCurrency")===-1)){G(j1,i);}if((!i1||s.oSmartFilterbar.isCurrentVariantStandard())){var k1={selectionVariant:j1};if(f1!==sap.ui.generic.app.navigation.service.NavType.iAppState){s.oController.modifyStartupExtension(k1);}P(k1.selectionVariant);O(k1.selectionVariant);}else{var l1=new S(JSON.stringify(s.oSmartFilterbar.getUiState().getSelectionVariant())),m1=l1.getSelectOption("sap.suite.ui.generic.template.customData"),n1=l1.getSelectOption("sap.suite.ui.generic.template.genericData");E(l1,m1,n1,true);var k1={selectionVariant:l1};s.oController.modifyStartupExtension(k1);E(k1.selectionVariant,m1,n1,false);if(!d(k1.selectionVariant,new S(JSON.stringify(s.oSmartFilterbar.getUiState().getSelectionVariant())))){P(k1.selectionVariant);O(k1.selectionVariant);}}if(i.tableVariantId&&s.oSmartTable){s.oSmartTable.setCurrentVariantId(i.tableVariantId);}var o1=s.oController.getOwnerComponent().getModel("_templPriv");if(f1===sap.ui.generic.app.navigation.service.NavType.xAppState&&o1.getProperty('/alp/filterMode')===F){N();}if(i.customData){v(i.customData);}else{w();}if(!i1){s.oSmartFilterbar.checkSearchAllowed(s);if(s.oController.getView().getModel("_templPriv").getProperty("/alp/searchable")){k=true;s.oSmartFilterbar.search();}}r={appStateKey:g1,urlParams:h1};}else{var j1=new S(JSON.stringify(s.oSmartFilterbar.getUiState().getSelectionVariant())),m1=j1.getSelectOption("sap.suite.ui.generic.template.customData"),n1=j1.getSelectOption("sap.suite.ui.generic.template.genericData");E(j1,m1,n1,true);var k1={selectionVariant:j1};s.oController.modifyStartupExtension(k1);E(k1.selectionVariant,m1,n1,false);if(!d(k1.selectionVariant,new S(JSON.stringify(s.oSmartFilterbar.getUiState().getSelectionVariant())))){P(k1.selectionVariant);O(k1.selectionVariant);}if(s.oSmartFilterbar.isLiveMode()||s.oSmartFilterbar.isCurrentVariantExecuteOnSelectEnabled()){s.oSmartFilterbar.checkSearchAllowed(s);if(s.oController.getView().getModel("_templPriv").getProperty("/alp/searchable")){k=true;}}w();}W();o=null;if(!s.oSmartFilterbar.isLiveMode()){d1();}if(!k){$();}else{I=false;}}function E(i,e1,f1,g1){if(g1){if(e1){i.removeSelectOption("sap.suite.ui.generic.template.customData");}if(f1){i.removeSelectOption("sap.suite.ui.generic.template.genericData");}}else{if(e1){i.massAddSelectOption("sap.suite.ui.generic.template.customData",e1);}if(f1){i.massAddSelectOption("sap.suite.ui.generic.template.genericData",f1);}}}function G(i,e1){var f1=s.oSmartFilterbar.determineMandatoryFilterItems(),g1;for(var h1=0;h1<f1.length;h1++){if(f1[h1].getName().indexOf("P_DisplayCurrency")!==-1){if(e1.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")&&e1.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")[0].Low){g1=e1.oDefaultedSelectionVariant.getSelectOption("DisplayCurrency")[0].Low;}if(g1){i.addParameter("P_DisplayCurrency",g1);}if(s.alr_visualFilterBar&&g1){s.alr_visualFilterBar.setDisplayCurrency(g1);}break;}}}function H(){var i={};i[b]={};var e1=s.oController.getOwnerComponent().getModel("_templPriv");var f1=s.chartController&&e({},s.chartController._chartInfo);if(f1&&f1.chartSelection){delete f1.chartSelection;}i[f]={chartVariantId:s.oSmartChart&&s.oSmartChart.getCurrentVariantId(),filterMode:e1.getProperty('/alp/filterMode'),contentView:e1.getProperty('/alp/contentView'),autoHide:e1.getProperty('/alp/autoHide'),chartInfo:f1};var g1=c.byId("editStateFilter");if(g1){i[f].editStateFilter=g1.getSelectedKey();}c.getCustomAppStateDataExtension(i[b]);var h1;var i1=true;var j1=function(k1,l1){if(!(k1 instanceof C)){throw new Error("State must always be set with respect to a ControllerExtension");}if(!i1){throw new Error("State must always be provided synchronously");}if(l1){h1=h1||Object.create(null);var m1=k1.getMetadata().getNamespace();h1[m1]=l1;}};c.templateBaseExtension.provideExtensionAppStateData(j1);i1=false;if(h1){i[h]=h1;}return i;}function J(){return m;}function K(){var e1=s.oSmartFilterbar.getUiState({allFilters:false}).getSelectionVariant();var f1=c.getVisibleSelectionsWithDefaults();for(var i=0;i<f1.length;i++){if(!e1.getValue(f1[i])){e1.addSelectOption(f1[i],"I","EQ","");}}if(s.oController.byId('template::PageVariant').currentVariantGetModified()&&e1.SelectionVariantID){e1.SelectionVariantID="";}return{selectionVariant:JSON.stringify(e1),tableVariantId:s.oSmartTable&&s.oSmartTable.getCurrentVariantId(),customData:H()};}function M(i){c.restoreCustomAppStateDataExtension(i||{});}function N(){var i=a({},s.oSmartFilterbar.getFilterData(true)),e1=s.oController.getOwnerComponent().getModel("_filter");e1.setData(i);s.filterBarController._updateFilterLink();}function O(i){s.oSmartFilterbar.clearVariantSelection();s.oSmartFilterbar.clear();l=i;X(i.toJSONObject(),true,false);}function P(e1){var f1=e1.getParameterNames().concat(e1.getSelectOptionsPropertyNames());for(var i=0;i<f1.length;i++){s.oSmartFilterbar.addFieldToAdvancedArea(f1[i]);}if(s.alr_visualFilterBar&&s.bVisualFilterInitialised){s.alr_visualFilterBar.addVisualFiltersToBasicArea(f1);}}function Q(){if(s._bIsStartingUp){return;}if(I){return;}var i=K();try{o=n.storeInnerAppStateWithImmediateReturn(i);}catch(e1){L.error("AnalyticalListPage.fnStoreCurrentAppStateAndAdjustURL: "+e1);}if(o instanceof sap.ui.generic.app.navigation.service.NavError){o=null;return;}if(o&&A!==o.appStateKey){r.appStateKey=o.appStateKey;}}function T(){var i=s.oController.getOwnerComponent().getModel("_templPriv");if(i.getProperty('/alp/filterMode')===F){if(s.alr_visualFilterBar&&s.alr_visualFilterBar.bIsInitialised&&i.getProperty("/alp/searchable")===false){s.oSmartFilterbar.showFilterDialog();}}}function V(){if(s.oSmartFilterbar.isInitialised()){s.oSmartFilterbar.checkSearchAllowed(s);}}function W(){var i=s.oController.getOwnerComponent().getModel("_filter");i.setData(a({},s.oSmartFilterbar.getFilterData(true)));s.filterBarController._updateFilterLink();}function X(i,e1,f1){var g1=new U({selectionVariant:i});s.oSmartFilterbar.setUiState(g1,{replace:e1,strictMode:f1});}function Y(i){p=n.parseNavigation();}function Z(){try{var i=new Promise(function(f1,g1){_=f1;p.done(z);p.fail(g1);});return i;}catch(e1){c1();}}function $(){I=false;_();}function a1(){return l;}function b1(i){if(!i){var e1=s.oIappStateHandler.fnGetStartUpSelectionVariant();if(e1){var f1=e1.getParameterNames().concat(e1.getSelectOptionsPropertyNames());s.alr_visualFilterBar.addVisualFiltersToBasicArea(f1);}}s.alr_visualFilterBar.updateVisualFilterBindings(true);if(s.oSmartFilterbar.isCurrentVariantStandard()){s.oIappStateHandler.fnCheckMandatory();s.oIappStateHandler.fnCheckToLaunchDialog();}}function c1(){w();W();if(s.alr_visualFilterBar&&s.alr_visualFilterBar.bIsInitialised){s.oIappStateHandler.fnUpdateVisualFilterBar(true);}}function d1(){var i=false;if(s.oSmartFilterbar.isCurrentVariantStandard()){var e1=s.oSmartFilterbar.getSmartVariant().bExecuteOnSelectForStandardByUser;if(e1!==null){return false;}s.oSmartFilterbar.checkSearchAllowed(s);if(s.oController.getView().getModel("_templPriv").getProperty("/alp/searchable")){var f1=s.oController.getOwnerComponent();var g1=f1.getDataLoadSettings();var h1=g1?g1.loadDataOnAppLaunch:"ifAnyFilterExist";if(h1==="ifAnyFilterExist"){var i1=s.oSmartFilterbar.getFiltersWithValues();i=i1.length?true:false;}else if(h1==="always"){i=true;}else if(h1==="never"){i=false;}if(i){s.oSmartFilterbar.getSmartVariant().bExecuteOnSelectForStandardViaXML=true;}}}return i;}return{getFilterState:H,fnCheckMandatory:V,fnCheckToLaunchDialog:T,getCurrentAppState:K,fnUpdateSVFB:W,fnSetDefaultFilter:w,fnRestoreFilterState:v,getUrlParameterInfo:q,onSmartFilterBarInitialise:Y,onSmartFilterBarInitialized:Z,fnStoreCurrentAppStateAndAdjustURL:Q,fnSetFiltersUsingUIState:X,fnResolveStartUpPromise:$,fnGetStartUpSelectionVariant:a1,fnUpdateVisualFilterBar:b1,fnOnError:c1,getInitialNavigationContext:J};}return B.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.IappStateHandler",{constructor:function(s,c,n){e(this,g(s,c,n));}});});

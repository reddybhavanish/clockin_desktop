sap.ui.define(["sap/ui/base/Object","sap/base/util/extend"],function(B,e){"use strict";function g(t){function r(c,C){var m=t.oAppComponent.getModel();if(m.hasPendingChanges()){var v=c.getView();v.setBindingContext(null);m.resetChanges();v.setBindingContext();}var u=c.getOwnerComponent().getModel("ui");u.setProperty("/editable",false);C.fire(c,"AfterCancel",{});}var o;var O;function d(a,b,A,c,m,i){var D,f;o=a;O=b;var F=i?"sap.suite.ui.generic.template.fragments.DataLossTechnicalError":"sap.suite.ui.generic.template.fragments.DataLoss";A.getDialogFragmentForViewAsync(c.getView(),F,{onDataLossOK:function(){f.close();o();},onDataLossCancel:function(){f.close();O();}},"dataLoss").then(function(h){f=h;m=m||"LeavePage";D=f.getModel("dataLoss");D.setProperty("/mode",m);f.open();});}function p(f,c,m,n){if(!n&&t.oBusyHelper.isBusy()){return;}var a=t.oNavigationControllerProxy.getActiveComponents();var F,b,h;a.forEach(function(C){var i=t.componentRegistry[C];if(i.utils.isDraftEnabled()){return;}h=h||i;var u=i.oComponent.getModel("ui");if(u.getProperty("/editable")){F=F||i;}if(i.aUnsavedDataCheckFunctions&&i.aUnsavedDataCheckFunctions.some(function(U){return U();})){b=b||i;}});var R=b||F||h;if(R){var M=t.oAppComponent.getModel();if(b||M.hasPendingChanges()){d(function(){r(R.oController,R.utils);f();},function(){c();},R.oApplication,R.oController,m,false);return;}var u=R.oController.getOwnerComponent().getModel("ui");if(u.getProperty("/editable")){u.setProperty("/editable",false);R.utils.fire(R.oController,"AfterCancel",{});}}f();}function P(f,c,m,n){var s=t.oAppComponent.suppressDataLossPopup();if(s){return n?f():t.oApplicationProxy.performAfterSideEffectExecution(f);}else if(n){return p(f,c,m,true);}return t.oApplicationProxy.performAfterSideEffectExecution(p.bind(null,f,c,m,false));}return{performIfNoDataLoss:P};}return B.extend("sap.suite.ui.generic.template.lib.DataLossHandler",{constructor:function(t){e(this,g(t));}});});

sap.ui.define(["sap/ui/core/library"],function(c){"use strict";var M=c.MessageType;var l="msg";function h(t,e){var b=e.getParameter("bindingParams");b.events=b.events||{};b.events.aggregatedDataStateChange=function(C){var B=t.oServices.oApplication.getBusyHelper();if(B.isBusy()||C.getSource().getLength()){return;}var d=C.getParameter("dataState");var E=d.getMessages().filter(function(a){return a.target===C.getSource().getPath()&&a.getType()===M.Error;});if(E.length){var m=sap.ui.getCore().getMessageManager();m.removeMessages(E);var p,L,o;t.oCommonUtils.getDialogFragmentAsync("sap.suite.ui.generic.template.listTemplates.fragments.MessagesOnRetrieval",{itemSelected:function(){L.setProperty("/backbtnvisibility",true);},onBackButtonPress:function(){o.navigateBack();L.setProperty("/backbtnvisibility",false);},onReject:function(){o.navigateBack();p.close();}},l,function(f){o=f.getContent()[0];}).then(function(D){p=D;L=p.getModel(l);L.setProperty("/messages",E);L.setProperty("/backbtnvisibility",false);p.open();});}};}return{handleErrorsOnTableOrChart:h};});

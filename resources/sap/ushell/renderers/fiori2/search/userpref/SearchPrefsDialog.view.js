// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/MessageBox"],function(){"use strict";return sap.ui.jsview("sap.ushell.renderers.fiori2.search.userpref.SearchPrefsDialog",{createContent:function(c){this.firstTimeBeforeRendering=true;var u=new sap.m.Label({text:sap.ushell.resources.i18n.getText("sp.userProfilingField")+':'});var s=new sap.m.Switch({state:{path:"/personalizedSearch",mode:sap.ui.model.BindingMode.TwoWay},ariaLabelledBy:u,enabled:'{/searchPrefsActive}'});this.resetButton=new sap.m.Button({text:sap.ushell.resources.i18n.getText("sp.clearCollectedData"),press:this.resetHistory.bind(this),enabled:{parts:['/searchPrefsActive','/resetButtonWasClicked'],formatter:function(b,r){return b&&!r;}}});var l=new sap.ui.layout.VerticalLayout({content:[new sap.m.Text({text:sap.ushell.resources.i18n.getText('sp.disclaimer')})]});var a=[u,s,l,this.resetButton];return a;},onBeforeRendering:function(){if(this.firstTimeBeforeRendering){this.firstTimeBeforeRendering=false;return;}this.getModel().reload();},resetHistory:function(){this.getModel().resetProfile().then(function(){},function(r){var e=sap.ushell.resources.i18n.getText('sp.resetFailed');e+='\n'+r;sap.m.MessageBox.show(e,{title:sap.ushell.resources.i18n.getText("sp.resetFailedTitle"),icon:sap.m.MessageBox.Icon.ERROR,actions:[sap.m.MessageBox.Action.OK]});});},formatErrorResponse:function(r){var p;try{p=JSON.parse(r);}catch(e){return r;}if(!p.ErrorDetails){return r;}var a=[];for(var i=0;i<p.ErrorDetails.length;++i){var b=p.ErrorDetails[i];a.push(b.Message+' ('+b.Code+')');}return a.join('\n');},switchChangeHandler:function(e){var s=e.getSource();if(s.getState()){return;}var i=sap.ushell.resources.i18n;var d=i.getText("sp.disable");sap.m.MessageBox.confirm(i.getText('sp.disablingUserProfilingMsg'),{title:sap.ushell.resources.i18n.getText("sp.disableUserProfiling"),icon:sap.m.MessageBox.Icon.QUESTION,actions:[d,sap.m.MessageBox.Action.CANCEL],onClose:function(a){if(a==sap.m.MessageBox.Action.CANCEL){s.setState(true);}}});},openMessageBox:function(){var t=this;var i=sap.ushell.resources.i18n;var c=i.getText("sp.clear");sap.m.MessageBox.confirm(i.getText('sp.profileWillBeReset'),{title:sap.ushell.resources.i18n.getText("sp.clearCollectedData"),icon:sap.m.MessageBox.Icon.QUESTION,actions:[c,sap.m.MessageBox.Action.CANCEL],onClose:function(a){if(a==c){t.getModel().resetProfile();}}});}});});

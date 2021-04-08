/*!
 * Copyright (c) 2009-2020 SAP SE, All Rights Reserved
 */
sap.ui.define(["sap/ushell/resources","sap/m/library","sap/ui/core/UIComponent","sap/m/Dialog","sap/m/Button","sap/m/Text","sap/m/Link","sap/ui/layout/VerticalLayout","sap/m/FlexBox","sap/ui/core/IconPool","sap/ui/Device","sap/base/Log","sap/base/util/isEmptyObject","sap/ui/thirdparty/jquery"],function(r,m,U,D,B,T,L,V,F,I,a,l,i,q){"use strict";var s;var b=m.ButtonType;return U.extend("sap.ushell.components.shell.UserImage.Component",{metadata:{version:"1.78.0",library:"sap.ushell.components.shell.UserImage",dependencies:{libs:["sap.m","sap.ui.layout"]}},createContent:function(){var S;s=sap.ushell.Container.getRenderer("fiori2")._oShellView;S=(s.getViewData()?s.getViewData().config:{})||{};this.loadUserImage();var u=sap.ushell.Container.getUser();if(S.enableUserImgConsent===true&&u.getImageConsent()===undefined){this._showUserConsentPopup();}},_showUserConsentPopup:function(){var t=this;var c=sap.ui.getCore().getConfiguration().getRTL()?"Right":"Left";var d,f,e,g;var y=new B("yesButton",{text:r.i18n.getText("DisplayImg"),type:b.Emphasized,press:function(){t.updateUserImage(true);d.close();}});var n=new B("noButton",{text:r.i18n.getText("DontDisplayImg"),press:function(){t.updateUserImage(false);d.close();}});d=new D("userConsentDialog",{title:r.i18n.getText("userImageConsentDialogTitle"),modal:true,stretch:a.system.phone,buttons:[y,n],afterClose:function(){d.destroy();}}).addStyleClass("sapUshellUserConsentDialog").addStyleClass("sapContrastPlus");var u=new T({text:r.i18n.getText("userImageConsentDialogTermsOfUse")}).addStyleClass("sapUshellUserConsentDialogTerms");var h=new T({text:r.i18n.getText("userImageConsentText"),textAlign:c}).addStyleClass("sapUshellUserConsentDialogText");var j=new L({text:r.i18n.getText("userImageConsentDialogShowTermsOfUse"),textAlign:c,press:function(){var o=g.getVisible();if(o){g.setVisible(false);j.setText(r.i18n.getText("userImageConsentDialogShowTermsOfUse"));}else{j.setText(r.i18n.getText("userImageConsentDialogHideTermsOfUse"));g.setVisible(true);}}}).addAriaLabelledBy(h);f=new F({alignItems:"Center",direction:"Row",items:[h]}).addStyleClass("sapUshellUserConsentDialogBox");e=new F({alignItems:"Center",direction:"Row",items:[j]}).addStyleClass("sapUshellUserConsentDialogBox").addStyleClass("sapUshellUserConsentDialogLink");g=new F({alignItems:"Center",direction:"Row",items:[u]}).addStyleClass("ushellUserImgConsentTermsOfUseFlexBox");g.setVisible(false);var k=new V("userConsentDialogLayout",{content:[f,e,g]});d.addContent(k);d.open();},loadUserImage:function(){var u=sap.ushell.Container.getUser(),c=u.getImage();if(c){this._setUserImage(c);}u.attachOnSetImage(this._setUserImage.bind(this));},_setUserImage:function(p){var u=typeof p==="string"?p:p.mParameters,c=true;if(u&&typeof u==="string"){c=false;}else if(!i(u)){c=false;}var d=I.getIconURI("person-placeholder"),e=I.getIconURI("account");var h={"Cache-Control":"no-cache, no-store, must-revalidate","Pragma":"no-cache","Expires":"0"};if(!c){q.ajax({url:u,headers:h,success:function(){s.getModel().setProperty("/userImage/personPlaceHolder",u);s.getModel().setProperty("/userImage/account",u);},error:function(){l.error("Could not load user image from: "+u,"","sap.ushell.renderers.fiori2.Shell.view");var o=sap.ushell.Container.getUser();o.setImage("");}});}else{s.getModel().setProperty("/userImage/personPlaceHolder",d);s.getModel().setProperty("/userImage/account",e);}},updateUserImage:function(c){var u=sap.ushell.Container.getUser(),d=new q.Deferred(),o;this.userInfoService=sap.ushell.Container.getService("UserInfo");if(c!==undefined){u.setImageConsent(c);o=this.userInfoService.updateUserPreferences(u);o.done(function(){u.resetChangedProperty("isImageConsent");d.resolve();});}else{d.reject(c+"is undefined");}},exit:function(){}});});

/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/core/InvisibleText"],function(l,I){"use strict";var B=l.ButtonType;var S={apiVersion:2};S.CSS_CLASS="sapMSB";S.render=function(r,b){var w=b.getWidth(),t=b.getType(),e=b.getEnabled(),T=b.getTitleAttributeValue(),s;r.openStart("div",b).class(S.CSS_CLASS);if(b.getIcon()){r.class(S.CSS_CLASS+"HasIcon");}if(t===B.Accept||t===B.Reject||t===B.Emphasized||t===B.Transparent||t===B.Attention){r.class(S.CSS_CLASS+t);}this.writeAriaAttributes(r,b);r.attr("tabindex",e?"0":"-1");if(T){r.attr("title",T);}if(w!=""||w.toLowerCase()==="auto"){r.style("width",w);}r.openEnd();r.openStart("div").class("sapMSBInner");if(!e){r.class("sapMSBInnerDisabled");}r.openEnd();r.renderControl(b._getTextButton());r.renderControl(b._getArrowButton());r.close("div");if(T){s=b.getId()+"-tooltip";r.openStart("span");r.attr("id",s);r.class("sapUiInvisibleText");r.openEnd();r.text(T);r.close("span");}r.close("div");};S.writeAriaAttributes=function(r,b){var a={};this.writeAriaRole(b,a);this.writeAriaLabelledBy(b,a);r.accessibilityState(b,a);};S.writeAriaRole=function(b,a){a["role"]="group";};S.writeAriaLabelledBy=function(b,a){var A="",o=b.getButtonTypeAriaLabelId(),t=b.getTitleAttributeValue(),T;if(b.getText()){A+=b._getTextButton().getId()+"-content";A+=" ";}if(o){A+=o;A+=" ";}if(t){T=b.getId()+"-tooltip";A+=T+" ";}A+=I.getStaticId("sap.m","SPLIT_BUTTON_DESCRIPTION")+" ";A+=I.getStaticId("sap.m","SPLIT_BUTTON_KEYBOARD_HINT");a["labelledby"]={value:A,append:true};};return S;},true);

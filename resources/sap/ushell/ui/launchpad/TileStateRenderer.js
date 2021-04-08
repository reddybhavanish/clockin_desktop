/*!
 * Copyright (c) 2009-2020 SAP SE, All Rights Reserved
 */
sap.ui.define(['sap/ui/core/HTML'],function(H){"use strict";var T={};T.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapUshellGT");r.writeClasses();r.write(">");var s=c.getState();r.write("<div");r.addClass("sapUshellOverlay");r.writeClasses();r.writeAttribute("id",c.getId()+"-overlay");if(s==="Failed"){r.writeAttribute("title",c._sFailedToLoad);}r.write(">");switch(s){case"Loading":var b=new H({content:"<div class='sapUshellTileStateLoading'><div>"});b.setBusyIndicatorDelay(0);b.setBusy(true);r.renderControl(b);break;case"Failed":r.write("<div");r.writeAttribute("id",c.getId()+"-failed-ftr");r.addClass("sapUshellTileStateFtrFld");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-failed-icon");r.addClass("sapUshellTileStateFtrFldIcn");r.writeClasses();r.write(">");r.renderControl(c._oWarningIcon);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-failed-text");r.addClass("sapUshellTileStateFtrFldTxt");r.writeClasses();r.write(">");r.writeEscaped(c._sFailedToLoad);r.write("</div>");r.write("</div>");break;default:}r.write("</div>");r.write("</div>");};return T;},true);

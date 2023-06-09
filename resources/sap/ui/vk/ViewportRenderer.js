/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define([],function(){"use strict";var V={};V.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapVizKitViewport");r.writeClasses();if(c._implementation){r.writeAttribute("tabindex",-1);}else{r.writeAttribute("tabindex",0);}r.writeAttribute("aria-label","Image");var a=false;var w=c.getWidth();if(w){r.addStyle("width",w);a=true;}var h=c.getHeight();if(h){r.addStyle("height",h);a=true;}if(a){r.writeStyles();}r.write(">");if(c._implementation){r.renderControl(c._implementation);}else if(c.getContent()){var C=c.getContent();for(var i=0,l=C.length;i<l;i++){r.renderControl(C[i]);}}r.write("</div>");};return V;},true);

// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/Control","sap/ui/core/IconPool"],function(C,I){"use strict";var N=C.extend("sap.ushell.ui.shell.NavigationMiniTile",{metadata:{properties:{title:{type:"string",group:"Misc",defaultValue:null},subtitle:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},intent:{type:"string",group:"Misc",defaultValue:null}},aggregations:{},events:{press:{}}},renderer:{render:function(r,c){var t=c.getTitle();var s=c.getSubtitle();var i=c.getIcon();var o=I.createControlByURI(i);r.write("<div tabindex=\"-1\" class=\"sapUshellNavMiniTile\" ");r.writeControlData(c);r.writeAttributeEscaped("role","option");r.writeAttributeEscaped("aria-label",s?t+" "+s:t);r.write(">");r.write("<div>");r.write("<span class=\"sapUshellNavMiniTileTitle\" >");if(t){r.writeEscaped(t);}r.write("</span>");r.write("</div>");if(o){r.write("<div>");r.write("<span class=\"sapUshellNavMiniTileIcon\">");r.renderControl(o);r.write("</span>");r.write("</div>");}else{r.write("<div>");r.write("<span class=\"sapUshellNavMiniTileSubtitle\" >");if(s){r.writeEscaped(s);}r.write("</span>");r.write("</div>");}r.write("</div>");}}});N.prototype.ontap=function(){this.firePress({});};N.prototype.onsapenter=function(){this.firePress({});};N.prototype.onsapspace=function(){this.firePress({});};return N;});

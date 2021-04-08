// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/Button","sap/m/library","sap/ui/core/Control","sap/ushell/library"],function(B,m,C){"use strict";var a=m.ButtonType;var P=m.PlacementType;var G=C.extend("sap.ushell.ui.launchpad.GroupHeaderActions",{metadata:{library:"sap.ushell",properties:{isOverflow:{type:"boolean",group:"Misc",defaultValue:false},tileActionModeActive:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}},renderer:{apiVersion:2,render:function(r,g){r.openStart("div",g);r.openEnd();var c=g.getContent();if(g.getTileActionModeActive()){if(g.getIsOverflow()){var h=c.some(function(o){return o.getVisible();});if(h){r.renderControl(g._getOverflowButton());}}else{c.forEach(function(o){r.renderControl(o);});}}r.close("div");}}});G.prototype.exit=function(){if(this._oOverflowButton){this._oOverflowButton.destroy();}if(this._oActionSheet){this._oActionSheet.destroy();}};G.prototype._getOverflowButton=function(){if(!this._oOverflowButton){this._oOverflowButton=new B({icon:"sap-icon://overflow",type:a.Transparent,enabled:{parts:["/editTitle"],formatter:function(i){return!i;}},press:function(){sap.ui.require(["sap/m/ActionSheet"],function(A){if(!this._oActionSheet){this._oActionSheet=new A({placement:P.Auto});}this._oActionSheet.destroyButtons();this.getContent().forEach(function(b){var c=b.clone();c.setModel(b.getModel());c.setBindingContext(b.getBindingContext());this._oActionSheet.addButton(c);}.bind(this));this._oActionSheet.openBy(this._oOverflowButton);}.bind(this));}.bind(this)}).addStyleClass("sapUshellHeaderActionButton");this._oOverflowButton.setParent(this);}return this._oOverflowButton;};return G;});

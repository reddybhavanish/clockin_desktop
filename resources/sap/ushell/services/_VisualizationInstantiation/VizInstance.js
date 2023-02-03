// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/library","sap/ui/core/XMLComposite","sap/ui/core/Icon","sap/m/VBox","sap/ui/events/PseudoEvents"],function(m,X,I,V,P){"use strict";var L=m.LoadState;var T=m.TileSizeBehavior;var a=X.extend("sap.ushell.ui.launchpad.VizInstance",{metadata:{library:"sap.ushell",properties:{title:{type:"string",defaultValue:"",bindable:true},subtitle:{type:"string",defaultValue:"",bindable:true},height:{type:"int",defaultValue:2},width:{type:"int",defaultValue:2},info:{type:"string",defaultValue:"",bindable:true},icon:{type:"sap.ui.core.URI",defaultValue:"",bindable:true},state:{type:"sap.m.LoadState",defaultValue:L.Loaded,bindable:true},sizeBehavior:{type:"sap.m.TileSizeBehavior",defaultValue:T.Responsive,bindable:true},editable:{type:"boolean",defaultValue:false,bindable:true},active:{type:"boolean",defaultValue:false},targetURL:{type:"string"},indicatorDataSource:{type:"object",defaultValue:undefined},keywords:{type:"string[]",defaultValue:[]},instantiationData:{type:"object",defaultValue:{}}},events:{press:{parameters:{scope:{type:"sap.m.GenericTileScope"},action:{type:"string"}}}}},fragment:"sap.ushell.services._VisualizationInstantiation.VizInstance"});a.prototype.getLayout=function(){return{columns:this.getWidth(),rows:this.getHeight()};};a.prototype._setContent=function(c){var g=this.getLayoutData();if(g&&g.isA("sap.f.GridContainerItemLayoutData")){g.setRows(this.getHeight());g.setColumns(this.getWidth());this.getParent().invalidate();}this.setAggregation("_content",c);};a.prototype.setEditable=function(e){var c=this.getAggregation("_content");if(e){if(!this.oRemoveIconVBox){var r=new I({src:"sap-icon://decline",press:[this._onRemoveIconPressed,this],noTabStop:true});r.addStyleClass("sapMPointer");r.addStyleClass("sapUshellTileDeleteIconInnerClass");this.oRemoveIconVBox=new V({items:[r]});this.oRemoveIconVBox.addStyleClass("sapUshellTileDeleteIconOuterClass");this.oRemoveIconVBox.addStyleClass("sapUshellTileDeleteClickArea");this.oRemoveIconVBox.addStyleClass("sapMPointer");}var E=new V({items:[this.oRemoveIconVBox,c]});E.addStyleClass("sapUshellVizInstance");this.setAggregation("_content",E);}else if(c.getItems){this.setAggregation("_content",c.getItems()[1]);}return this.setProperty("editable",e);};a.prototype._onRemoveIconPressed=function(){this.firePress({scope:"Actions",action:"Remove"});};a.prototype.onclick=function(e){this._preventDefault(e);};a.prototype.onBeforeRendering=function(e){var d=this.getDomRef();if(d){d.removeEventListener("keyup",this._fnKeyupHandler);d.removeEventListener("touchend",this._fnTouchendHandler);}};a.prototype.onAfterRendering=function(e){var d=this.getDomRef();this._fnKeyupHandler=this.onkeyup.bind(this);this._fnTouchendHandler=this.onclick.bind(this);d.addEventListener("keyup",this._fnKeyupHandler,true);d.addEventListener("touchend",this._fnTouchendHandler,true);};a.prototype.onkeyup=function(e){if(this.getEditable()){if((P.events.sapdelete.fnCheck(e)||P.events.sapbackspace.fnCheck(e))){this.firePress({scope:"Actions",action:"Remove"});}if(P.events.sapspace.fnCheck(e)||P.events.sapenter.fnCheck(e)){this._preventDefault(e);}}};a.prototype._preventDefault=function(e){if(this.getEditable()){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();return false;}return true;};a.prototype.load=function(){return Promise.resolve();};return a;});

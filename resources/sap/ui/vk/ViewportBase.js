/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/Control","./tools/Tool","./library","./SelectionMode","./SelectionDisplayMode","./RenderMode","./SafeArea"],function(C,T,v,S,a,R,b){"use strict";var V=C.extend("sap.ui.vk.ViewportBase",{metadata:{library:"sap.ui.vk","abstract":true,properties:{showDebugInfo:{type:"boolean",defaultValue:false},backgroundColorTop:{type:"sap.ui.core.CSSColor",defaultValue:"rgba(50, 50, 50, 1)"},backgroundColorBottom:{type:"sap.ui.core.CSSColor",defaultValue:"rgba(255, 255, 255, 1)"},width:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},selectionMode:{type:"sap.ui.vk.SelectionMode",defaultValue:S.Sticky},selectionDisplayMode:{type:"sap.ui.vk.SelectionDisplayMode",defaultValue:a.Highlight},freezeCamera:{type:"boolean",defaultValue:false},renderMode:{type:"sap.ui.vk.RenderMode",defaultValue:R.Default},showSafeArea:{type:"boolean",defaultValue:false}},associations:{contentConnector:{type:"sap.ui.vk.ContentConnector",multiple:false},viewStateManager:{type:"sap.ui.vk.ViewStateManager",multiple:false},tools:{type:"sap.ui.vk.tools.Tool",multiple:true}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true},safeArea:{type:"sap.ui.vk.SafeArea",multiple:false},annotations:{type:"sap.ui.vk.Annotation",multiple:true}},events:{urlClicked:{parameters:{nodeRef:"any",url:"string"},enableEventBubbling:true},nodeClicked:{parameters:{nodeRef:"any",x:"int",y:"int"},enableEventBubbling:true},resize:{parameters:{size:"object"},enableEventBubbling:true},nodesPicked:{parameters:{picked:{type:"any[]"}},enableEventBubbling:true},nodeZoomed:{parameters:{zoomed:{type:"any"},isZoomIn:{type:"boolean"}},enableEventBubbling:true},viewActivated:{parameters:{viewIndex:"int",view:"sap.ui.vk.View",type:{type:"string"}},enableEventBubbling:true},procedureFinished:{enableEventBubbling:true},viewFinished:{parameters:{viewIndex:"int"},enableEventBubbling:true}}}});var c=V.getMetadata().getParent().getClass().prototype;V.prototype.init=function(){if(c.init){c.init.call(this);}if(this.getSafeArea()==null){this.setSafeArea(new b());}this._camera=null;};V.prototype.exit=function(){if(this._camera){if(this._contentConnector){var d=this._contentConnector.getContentManager();if(d){d.destroyCamera(this._camera);}this._camera=null;}}if(c.exit){c.exit.call(this);}};V.prototype.addTool=function(t){this.addAssociation("tools",t);t=t instanceof T?t:sap.ui.getCore().byId(t);t.setViewport(this);};V.prototype.getImage=function(w,h){return null;};V.prototype.stickySelectionHandler=function(n){if(this._viewStateManager==null){return;}if(n.length===0){var d=[];if(this.getSelectionDisplayMode()===a.Outline){this._viewStateManager.enumerateOutlinedNodes(function(g){d.push(g);});if(d.length>0){this._viewStateManager.setOutliningStates([],d);}}else{this._viewStateManager.enumerateSelection(function(g){d.push(g);});if(d.length>0){this._viewStateManager.setSelectionStates([],d);}}}else{var s=[];var e=[];var i,f;if(this.getSelectionDisplayMode()===a.Outline){i=this._viewStateManager.getOutliningState(n);for(f=0;f<i.length;f++){if(i[f]){e.push(n[f]);}else{s.push(n[f]);}}this._viewStateManager.setOutliningStates(s,e);}else{i=this._viewStateManager.getSelectionState(n);for(f=0;f<i.length;f++){if(i[f]){e.push(n[f]);}else{s.push(n[f]);}}this._viewStateManager.setSelectionStates(s,e);}}};V.prototype.exclusiveSelectionHandler=function(n){if(this._viewStateManager==null){return;}var d=true;if(n.length===1){d=!this._viewStateManager.getSelectionState(n[0]);}else if(n.length>1){var i;if(this.getSelectionDisplayMode()===a.Outline){i=this._viewStateManager.getOutliningState(n);}else{i=this._viewStateManager.getSelectionState(n);}for(var e=0;e<i.length;e++){if(i[e]){d=false;break;}}}var u=[];if(n.length===0||d){if(this.getSelectionDisplayMode()===a.Outline){this._viewStateManager.enumerateOutlinedNodes(function(s){u.push(s);});}else{this._viewStateManager.enumerateSelection(function(s){u.push(s);});}}if(this.getSelectionDisplayMode()===a.Outline){this._viewStateManager.setOutliningStates(n,u);}else{this._viewStateManager.setSelectionStates(n,u);}};V.prototype.setCamera=function(d){if(d!==this._camera){if(this._camera&&this._contentConnector){var e=this._contentConnector.getContentManager();if(e){e.destroyCamera(this._camera);}}}this._camera=d;return this;};V.prototype.getCamera=function(){return this._camera;};V.prototype._onBeforeClearContentConnector=function(){this.setCamera(null);};V.prototype.activateView=function(d,p,n){return this;};V.prototype.pan=function(d,e){return this;};V.prototype.rotate=function(d,e){return this;};V.prototype.zoom=function(d){return this;};V.prototype.projectToScreen=function(x,y,z,d){return{x:0,y:0,depth:0};};V.prototype.normalizeRectangle=function(x,y,w,h){return{x:0,y:0,width:0,height:0};};V.prototype.deNormalizeRectangle=function(x,y,w,h){return{x:0,y:0,width:0,height:0};};return V;});

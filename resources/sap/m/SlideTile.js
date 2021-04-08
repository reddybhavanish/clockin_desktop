/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/m/GenericTile','sap/ui/Device','sap/ui/core/Icon','./SlideTileRenderer',"sap/ui/events/KeyCodes","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery"],function(l,C,G,D,I,S,K,P,q){"use strict";var T=l.TileSizeBehavior;var a=C.extend("sap.m.SlideTile",{metadata:{library:"sap.m",properties:{displayTime:{type:"int",group:"Appearance",defaultValue:5000},transitionTime:{type:"int",group:"Appearance",defaultValue:500},scope:{type:"sap.m.GenericTileScope",group:"Misc",defaultValue:"Display"},sizeBehavior:{type:"sap.m.TileSizeBehavior",defaultValue:T.Responsive},width:{type:"sap.ui.core.CSSSize",group:"Appearance"}},defaultAggregation:"tiles",aggregations:{tiles:{type:"sap.m.GenericTile",multiple:true,singularName:"tile",bindable:"bindable"},_pausePlayIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{press:{parameters:{scope:{type:"sap.m.GenericTileScope"},action:{type:"string"},domRef:{type:"any"}}}}}});a.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setAggregation("_pausePlayIcon",new I({id:this.getId()+"-pause-play-icon",src:"sap-icon://media-pause",color:"#ffffff",size:"1rem",noTabStop:true}),true);};a.prototype.onBeforeRendering=function(){G.prototype._initScopeContent.call(this,"sapMST");var A=this.getScope()===l.GenericTileScope.Actions;for(var i=0;i<this.getTiles().length;i++){this.getTiles()[i].showActionsView(A);}if(this._iCurrentTile>=0){this._iLastTile=this._iCurrentTile;}this._bNeedInvalidate=false;this._stopAnimation();this._sWidth=this._sHeight=undefined;this._iCurrentTile=this._iPreviousTile=undefined;};a.prototype.onAfterRendering=function(){this._setupResizeClassHandler();var c=this.getTiles().length,s=this.getScope();this._removeGTFocus();this._iCurrAnimationTime=0;this._bAnimationPause=false;if(this._iLastTile>=0&&c>1){this._scrollToTile(this._iLastTile);}else{this._scrollToNextTile();}if(c>1&&s===l.GenericTileScope.Display){this._startAnimation();}if(s===l.GenericTileScope.Actions&&this._iCurrentTile>=0&&this._hasNewsContent(this._iCurrentTile)){this.addStyleClass("sapMSTDarkBackground");}};a.prototype.exit=function(){this._stopAnimation();if(this._oMoreIcon){this._oMoreIcon.destroy();}if(this._oRemoveButton){this._oRemoveButton.destroy();}};a.prototype.ontap=function(e){var s=this.getScope();this.$().trigger("focus");if(s===l.GenericTileScope.Actions){var p=this._getEventParams(e);this.firePress(p);e.preventDefault();}};a.prototype.ontouchstart=function(e){if(this.getScope()===l.GenericTileScope.Display){if(q(e.target).hasClass("sapMSTIconClickTapArea")){this.addStyleClass("sapMSTIconPressed");}else{this.addStyleClass("sapMSTHvr");}}};a.prototype.ontouchend=function(e){this.removeStyleClass("sapMSTHvr");};a.prototype.ontouchcancel=function(e){if(this.hasStyleClass("sapMSTIconPressed")){this.removeStyleClass("sapMSTIconPressed");}else{this.removeStyleClass("sapMSTHvr");}};a.prototype.onkeydown=function(e){if(this.getScope()===l.GenericTileScope.Display){if(P.events.sapenter.fnCheck(e)){var g=this.getTiles()[this._iCurrentTile];g.onkeydown(e);}}};a.prototype.onkeyup=function(e){var p;if(this.getScope()===l.GenericTileScope.Display){if(P.events.sapenter.fnCheck(e)){var g=this.getTiles()[this._iCurrentTile];g.onkeyup(e);return;}if(P.events.sapspace.fnCheck(e)){this._toggleAnimation();}if(e.which===K.B&&this._bAnimationPause){this._scrollToNextTile(true,true);}if(e.which===K.F&&this._bAnimationPause){this._scrollToNextTile(true,false);}}else if(this.getScope()===l.GenericTileScope.Actions){if(P.events.sapselect.fnCheck(e)){this.firePress(this._getEventParams(e));e.preventDefault();}else if(P.events.sapdelete.fnCheck(e)||P.events.sapbackspace.fnCheck(e)){p={scope:this.getScope(),action:G._Action.Remove,domRef:this._oRemoveButton.getPopupAnchorDomRef()};this.firePress(p);e.preventDefault();}}};a.prototype.onsapspace=function(e){e.preventDefault();};a.prototype.onmouseup=function(e){if(this.getScope()===l.GenericTileScope.Display){if(this.hasStyleClass("sapMSTIconPressed")){this._toggleAnimation();this.removeStyleClass("sapMSTIconPressed");}}};a.prototype.onmousedown=function(e){if(q(e.target).hasClass("sapMSTIconClickTapArea")){this.addStyleClass("sapMSTIconPressed");}};a.prototype.setScope=function(v){if(this.getScope()!==v){if(v===l.GenericTileScope.Actions){this.setProperty("scope",v,true);this._bNeedInvalidate=true;this._stopAnimation(this._bNeedInvalidate);}else{this.setProperty("scope",v);}this._setTilePressState();}return this;};a.prototype._setupResizeClassHandler=function(){var c=function(){if(this.getSizeBehavior()===T.Small||window.matchMedia("(max-width: 374px)").matches){this.$().addClass("sapMTileSmallPhone");}else{this.$().removeClass("sapMTileSmallPhone");}}.bind(this);q(window).on("resize",c);c();};a.prototype._isFocusInsideST=function(){return this.$()[0]===document.activeElement||this.$().find(document.activeElement).length;};a.prototype._removeGTFocus=function(){for(var i=0;i<this.getTiles().length;i++){this.getTiles()[i].$().removeAttr("tabindex");}};a.prototype._toggleAnimation=function(){if(this.getTiles().length>1){if(this._bAnimationPause){this._startAnimation();}else{this._stopAnimation();}}this._updatePausePlayIcon();};a.prototype._stopAnimation=function(n){this._iCurrAnimationTime+=Date.now()-this._iStartTime;clearTimeout(this._sTimerId);if(this._iCurrentTile!=undefined){var w=this.$("wrapper-"+this._iCurrentTile);w.stop();}if(this._iPreviousTile!=undefined){var W=this.$("wrapper-"+this._iPreviousTile);W.stop();}this._bAnimationPause=true;if(this._iCurrAnimationTime>this.getDisplayTime()){this._scrollToNextTile(true);}else{if(this.getTiles()[this._iCurrentTile]){this._setAriaDescriptor();}if(n){this.invalidate();}}};a.prototype._startAnimation=function(){var d=this.getDisplayTime()-this._iCurrAnimationTime;clearTimeout(this._sTimerId);this._sTimerId=setTimeout(function(){this._scrollToNextTile();}.bind(this),d);this._iStartTime=Date.now();this._bAnimationPause=false;};a.prototype._scrollToTile=function(t){if(t>=0){var w=this.$("wrapper-"+t);var d=sap.ui.getCore().getConfiguration().getRTL()?"right":"left";this._changeSizeTo(t);w.css(d,"0rem");this._iCurrentTile=t;if(this.getTiles()[t]){this._setAriaDescriptor();}this._updateTilesIndicator();}};a.prototype._scrollToNextTile=function(p,b){var t=this._iCurrAnimationTime-this.getDisplayTime(),f,n,w,W,s,c,d,e,g,o;t=this.getTransitionTime()-(t>0?t:0);f=t===this.getTransitionTime();if(f){if(b){n=this._getPreviousTileIndex(this._iCurrentTile);}else{n=this._getNextTileIndex(this._iCurrentTile);}this._iPreviousTile=this._iCurrentTile;this._iCurrentTile=n;}W=this.$("wrapper-"+this._iCurrentTile);g=sap.ui.getCore().getConfiguration().getRTL()?"right":"left";if(q.isNumeric(this._iPreviousTile)){w=this.$("wrapper-"+this._iPreviousTile);s=w.css("width");c=parseFloat(W.css("width"));d=parseFloat(s);e=d<c;if(e){this._changeSizeTo(this._iCurrentTile);}if(f){W.css(g,s);}o={};if(b){o[g]=s;}else{o[g]="-"+s;}w.animate(o,{duration:t,done:function(){if(!e){this._changeSizeTo(this._iCurrentTile);}w.css(g,"");}.bind(this)});if(b){o[g]="-"+s;W.animate(o,0);}o[g]="0rem";W.animate(o,{duration:t,done:function(){this._iCurrAnimationTime=0;if(this._bNeedInvalidate){this.invalidate();}if(!p){this._startAnimation();}}.bind(this)});}else{this._changeSizeTo(this._iCurrentTile);W.css(g,"0rem");}if(this.getTiles()[this._iCurrentTile]){this._setAriaDescriptor();}this._updateTilesIndicator();};a.prototype._setAriaDescriptor=function(){var t,s,b,c;s=this.getScope();b=this.getTiles();c=b[this._iCurrentTile];t=c._getAriaText().replace(/\s/g," ");if(s===l.GenericTileScope.Actions){t=this._oRb.getText("GENERICTILE_ACTIONS_ARIA_TEXT")+"\n"+t;}else if(b.length>1&&s===l.GenericTileScope.Display){t+="\n"+this._oRb.getText("SLIDETILE_MULTIPLE_CONTENT")+"\n"+this._oRb.getText("SLIDETILE_TOGGLE_SLIDING");if(this._bAnimationPause){t+="\n"+this._oRb.getText("SLIDETILE_SCROLL_BACK")+"\n"+this._oRb.getText("SLIDETILE_SCROLL_FORWARD");}}t+="\n"+this._oRb.getText("SLIDETILE_ACTIVATE");this.$().attr("aria-label",t);};a.prototype._changeSizeTo=function(t){var o=this.getTiles()[t];if(!o){return;}if(this._sFrameType){this.$().removeClass(this._sFrameType);}if(this._sSize){this.$().removeClass(this._sSize);}this.$().addClass(o.getFrameType()).addClass(o.getSize());this._sFrameType=o.getFrameType();this._sSize=o.getSize();};a.prototype._getPreviousTileIndex=function(t){if(t>0){return t-1;}else{return this.getTiles().length-1;}};a.prototype._getNextTileIndex=function(t){if(t+1<this.getTiles().length){return t+1;}else{return 0;}};a.prototype._updateTilesIndicator=function(){var $;for(var i=0;i<this.getTiles().length;i++){$=this.$("tileIndicator-"+i);if(i===this._iCurrentTile){$.addClass("sapMSTActive");}else{$.removeClass("sapMSTActive");}}};a.prototype._updatePausePlayIcon=function(){if(this._bAnimationPause){this.getAggregation("_pausePlayIcon").setSrc("sap-icon://media-play");this.$().removeClass("sapMSTPauseIcon");}else{this.getAggregation("_pausePlayIcon").setSrc("sap-icon://media-pause");this.$().addClass("sapMSTPauseIcon");}};a.prototype._setTilePressState=function(){var t=this.getTiles(),b=this.getScope()===l.GenericTileScope.Display;for(var i=0;i<t.length;i++){t[i].setPressEnabled(b);}};a.prototype._hasNewsContent=function(t){var b=this.getTiles()[t].getTileContent();for(var i=0;i<b.length;i++){if(b[i]._getContentType()==="News"){return true;}}return false;};a.prototype._getEventParams=G.prototype._getEventParams;return a;});

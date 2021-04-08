/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Tool","../helpers/RotateOrbitHelperDvl","../helpers/RotateOrbitHelperThree"],function(T,R,a){"use strict";var b=T.extend("sap.ui.vk.tools.RotateOrbitTool",{metadata:{events:{rotate:{parameters:{dx:"int",dy:"int"}}}},constructor:function(i,s){if(b._instance){return b._instance;}T.apply(this,arguments);this.setToolid("1a1fced1-9b42-d7f3-5fdf-8d338b3591a6");this._viewport=null;this._rotateOrbitHelper=null;b._instance=this;}});b.prototype.init=function(){if(T.prototype.init){T.prototype.init.call(this);}this.setFootprint(["sap.ui.vk.dvl.Viewport","sap.ui.vk.threejs.Viewport"]);};b.prototype.setActive=function(v,c,g){T.prototype.setActive.call(this,v,c,g);if(this._viewport){if(v){if(this._prepare()){this._rotateOrbitHelper.activateOrbitMode();}}else if(this._rotateOrbitHelper){this._rotateOrbitHelper.deactivateOrbitMode();this._rotateOrbitHelper=null;}}return this;};b.prototype._prepare=function(){if(this.isViewportType("sap.ui.vk.dvl.Viewport")&&this._viewport._dvl){if(this._rotateOrbitHelper==null){this._dvlRendererId=this._viewport._dvlRendererId;this._dvl=this._viewport._dvl;this._rotateOrbitHelper=new R(this,this._dvl);}}else if(this.isViewportType("sap.ui.vk.threejs.Viewport")){if(this._rotateOrbitHelper==null){this._rotateOrbitHelper=new a(this);}}else{return false;}return true;};b.prototype.rotate=function(d,c){if(this._prepare()){this._rotateOrbitHelper.rotate(d,c);}};b.prototype.destroy=function(){T.prototype.destroy.call(this);this._viewport=null;this._rotateOrbitHelper=null;};return b;});

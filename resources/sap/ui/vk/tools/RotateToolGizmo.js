/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","../threejs/thirdparty/three","./Gizmo","./RotateToolGizmoRenderer","./RotatableAxis","./CoordinateSystem","./AxisColours","../AnimationTrackType","../AnimationTrackValueType","./GizmoPlacementMode"],function(q,t,G,R,b,C,A,c,d,e){"use strict";var f=G.extend("sap.ui.vk.tools.RotateToolGizmo",{metadata:{library:"sap.ui.vk"}});f.prototype.init=function(){if(G.prototype.init){G.prototype.init.apply(this);}this._createEditingForm(String.fromCharCode(176),84);this._gizmoIndex=-1;this._handleIndex=-1;this._value=new THREE.Vector3();this._rotationDelta=new THREE.Vector3();this._viewport=null;this._tool=null;this._sceneGizmo=new THREE.Scene();this._gizmo=new THREE.Group();this._touchAreas=new THREE.Group();this._sceneGizmo.add(this._gizmo);this._axis=b.All;this._coordinateSystem=C.World;this._nodes=[];this._matViewProj=new THREE.Matrix4();this._gizmoSize=96;function a(k,l,r,s){var m=new THREE.TorusBufferGeometry(r,1/96,4,s);if(k===0){m.rotateY(Math.PI/2);}else if(k===1){m.rotateX(Math.PI/2);}var n=new THREE.Mesh(m,new THREE.MeshBasicMaterial({color:l,transparent:true}));n.matrixAutoUpdate=false;n.userData.color=l;return n;}function h(k,r,s){var l=new THREE.TorusBufferGeometry(r,16/96,4,s);if(k===0){l.rotateY(Math.PI/2);}else if(k===1){l.rotateX(Math.PI/2);}return new THREE.Mesh(l,new THREE.MeshBasicMaterial({opacity:0.2,transparent:true}));}for(var i=0;i<3;i++){this._gizmo.add(a(i,A[["x","y","z"][i]],1,128));this._touchAreas.add(h(i,1,24));}this._gizmo.add(new THREE.AxesHelper(0.75));var j=new THREE.MeshBasicMaterial({color:0x0080FF,opacity:0.5,transparent:true,side:THREE.DoubleSide});this._arcMesh=new THREE.Mesh(new THREE.Geometry(),j);this._arcMesh.drawMode=THREE.TriangleFanDrawMode;this._arcMesh.visible=false;this._gizmo.add(this._arcMesh);this._axisTitles=this._createAxisTitles();this._sceneGizmo.add(this._axisTitles);};f.prototype.hasDomElement=function(){return true;};f.prototype.setAxis=function(v){this._axis=v;var a=[b.All,b.X,b.Y,b.Z];if(this._coordinateSystem!==C.Screen){for(var i=0;i<3;i++){if(v!==b.All&&a[i+1]!==v){this._gizmo.children[i].visible=this._touchAreas.children[i].visible=false;}else{this._gizmo.children[i].visible=this._touchAreas.children[i].visible=true;}}}};f.prototype.resetValues=function(){this._value.setScalar(0);};f.prototype.setCoordinateSystem=function(a){this._coordinateSystem=a;var s=a===C.Screen;if(s){this._gizmo.children[0].visible=this._gizmo.children[1].visible=false;this._touchAreas.children[0].visible=this._touchAreas.children[1].visible=false;this._gizmo.children[2].visible=this._touchAreas.children[2].visible=true;}else{this._gizmo.children[0].visible=this._touchAreas.children[0].visible=this._axis===b.All||this._axis===b.X;this._gizmo.children[1].visible=this._touchAreas.children[1].visible=this._axis===b.All||this._axis===b.Y;this._gizmo.children[2].visible=this._touchAreas.children[2].visible=this._axis===b.All||this._axis===b.Z;}this._axisTitles.visible=!s;this._gizmoIndex=this._handleIndex=-1;};f.prototype.show=function(v,a){this._viewport=v;this._tool=a;this._nodes.length=0;this._updateSelection(v._viewStateManager);var n=this._getNodesProperties();this._tool.fireEvent("rotating",{x:0,y:0,z:0,nodesProperties:n},true);};f.prototype._prepareForCreatingRotationKey=function(a,h,p){this._nodes.forEach(function(n){var j=n.node;var k=[0,0,0];a.setTime(h,p);var l=a.getAnimatedProperty(j,c.Rotate);if(l.offsetToPrevious){k=l.offsetToPrevious;}if(!this._nodeUserDataMap){this._nodeUserDataMap=new Map();}var u=this._nodeUserDataMap.get(j);if(!u){u={};this._nodeUserDataMap.set(j,u);}u.eulerInParentCoors=new THREE.Euler(k[0],k[1],k[2]);u.startEulerInParentCoors=new THREE.Euler(k[0],k[1],k[2]);}.bind(this));var i=a.getCurrentPlayback();if(i){this._prepareForCreatingKey(i.getSequence());}};f.prototype.hide=function(){this._cleanTempData();this._viewport=null;this._tool=null;this._gizmoIndex=this._handleIndex=-1;this._updateEditingForm(false);};f.prototype.getGizmoCount=function(){if(this._coordinateSystem===C.Local||this._coordinateSystem===C.Parent){return this._nodes.length;}else{return this._nodes.length>0?1:0;}};f.prototype.getTouchObject=function(i){if(this._nodes.length===0){return null;}this._updateGizmoObjectTransformation(this._touchAreas,i);return this._touchAreas;};f.prototype.getGizmoObject=function(){return this._nodes.length>0?this._gizmo:null;};f.prototype.highlightHandle=function(a,h){for(var i=0;i<3;i++){var j=this._gizmo.children[i];var k=i===a?0xFFFF00:j.userData.color;j.material.color.setHex(k);j.material.opacity=a===-1||i===a?1:0.35;j.material.visible=h||i===a;var l=this._axisTitles.children[i];l.material.color.setHex(k);l.material.opacity=a===-1||i===a?1:0.35;l.material.visible=h||i===a;}};f.prototype.selectHandle=function(i,a){this._gizmoIndex=a;this._handleIndex=i;if(this._tool.getAutoResetValues()){this.resetValues();}this._viewport.setShouldRenderFrame();};f.prototype.beginGesture=function(){this._beginValue=this._value.clone();this._rotationDelta.setScalar(0);this._matOrigin=this._gizmo.matrixWorld.clone();this._nodes.forEach(function(n){n.node.parent.updateMatrixWorld(true);n.matOrigin=n.node.matrixWorld.clone();n.matLocalOrigin=n.node.matrix.clone();if(n.node.parent){n.matParentInv=new THREE.Matrix4().getInverse(n.node.parent.matrixWorld);}else{n.matParentInv=new THREE.Matrix4();}n.quaternion=n.node.quaternion.clone();});};f.prototype._printEventInfo=function(a,x,y,z,n){q.sap.log.debug(a+" is fired:"+" x = "+x+"; y = "+y+"; z = "+z);n.forEach(function(p){q.sap.log.debug("Node: "+p.node.name);if(p.offsetToRest){q.sap.log.debug("offsetToRest: [ "+p.offsetToRest[0]+", "+p.offsetToRest[1]+", "+p.offsetToRest[2]+", "+p.offsetToRest[3]+" ] ");}else{q.sap.log.debug("offsetToRest: null");}if(p.offsetToRestInCoordinates){q.sap.log.debug("offsetToRestInCoordinates: [ "+p.offsetToRestInCoordinates[0]+", "+p.offsetToRestInCoordinates[1]+", "+p.offsetToRestInCoordinates[2]+" ] ");}else{q.sap.log.debug("offsetToRestInCoordinates: null");}if(p.offsetToPrevious){q.sap.log.debug("offsetToPrevious: [ "+p.offsetToPrevious[0]+", "+p.offsetToPrevious[1]+", "+p.offsetToPrevious[2]+" ] ");}else{q.sap.log.debug("offsetToPrevious: null");}if(p.absolute){q.sap.log.debug("absolute: [ "+p.absolute[0]+", "+p.absolute[1]+", "+p.absolute[2]+", "+p.absolute[3]+" ] ");}else{q.sap.log.debug("absolute: null");}if(p.world){q.sap.log.debug("world: [ "+p.world[0]+", "+p.world[1]+", "+p.world[2]+", "+p.world[3]+" ] ");}else{q.sap.log.debug("world: null");}if(p.restDifference){q.sap.log.debug("restDifference: [ "+p.restDifference[0]+", "+p.restDifference[1]+", "+p.restDifference[2]+", "+p.restDifference[3]+" ] ");}else{q.sap.log.debug("restDifference: null");}if(p.restDifferenceInCoordinates){q.sap.log.debug("restDifference: [ "+p.restDifferenceInCoordinates[0]+", "+p.restDifferenceInCoordinates[1]+", "+p.restDifferenceInCoordinates[2]+", "+p.restDifferenceInCoordinates[3]+" ] ");}else{q.sap.log.debug("restDifference: null");}});};f.prototype._getNodesProperties=function(){var n=[];this._nodes.forEach(function(a){var h=a.node;var p={};p.node=h;var u;if(this._nodeUserDataMap){u=this._nodeUserDataMap.get(h);}if(u&&u.eulerInParentCoors){var o=new THREE.Euler(u.eulerInParentCoors.x,u.eulerInParentCoors.y,u.eulerInParentCoors.z);var i=new THREE.Quaternion().setFromEuler(o);if(this._sequence){var s=this._viewport._viewStateManager._getEndPropertyInPreviousSequence(h,c.Rotate,this._sequence);if(s){var j=new THREE.Quaternion(s[0],s[1],s[2],s[3]);i.multiply(j);}}p.offsetToRest=[i.x,i.y,i.z,i.w];p.offsetToPrevious=[u.eulerInParentCoors.x,u.eulerInParentCoors.y,u.eulerInParentCoors.z];}else{p.offsetToRest=null;p.offsetToPrevious=null;}var k=this._viewport._viewStateManager.getTransformation(h);p.absolute=[k.quaternion[0],k.quaternion[1],k.quaternion[2],k.quaternion[3]];var w=this._viewport._viewStateManager.getTransformationWorld(h);var l=new THREE.Quaternion(w.quaternion[0],w.quaternion[1],w.quaternion[2],w.quaternion[3]);var m=new THREE.Euler().setFromQuaternion(l);p.world=[m.x,m.y,m.z];if(u&&u.quatInitialDiffInv){var r=new THREE.Quaternion(k.quaternion[0],k.quaternion[1],k.quaternion[2],k.quaternion[3]);r.multiply(u.quatInitialDiffInv);p.restDifference=[r.x,r.y,r.z,r.w];}else{p.restDifference=null;}if(u.euler){p.restDifferenceInCoordinates=[u.euler.x,u.euler.y,u.euler.z];}else{p.restDifferenceInCoordinates=null;}p.offsetToRestInCoordinates=null;n.push(p);}.bind(this));return n;};f.prototype.endGesture=function(){this._arcMesh.visible=false;var n=this._getNodesProperties();delete this._beginValue;this._nodes.forEach(function(a){var h=a.node;var u;if(this._nodeUserDataMap){u=this._nodeUserDataMap.get(h);}if(u&&u.euler){u.startEuler.x=u.euler.x;u.startEuler.y=u.euler.y;u.startEuler.z=u.euler.z;u.startEulerInParentCoors.x=u.eulerInParentCoors.x;u.startEulerInParentCoors.y=u.eulerInParentCoors.y;u.startEulerInParentCoors.z=u.eulerInParentCoors.z;}delete h.userData.skipUpdateJointNode;this._viewport._viewStateManager._setJointNodeOffsets(h,c.Rotate);}.bind(this));this._tool.fireRotated({x:this._rotationDelta.x,y:this._rotationDelta.y,z:this._rotationDelta.z,nodesProperties:n});this._printEventInfo("Event 'rotated'",this._rotationDelta.x,this._rotationDelta.y,this._rotationDelta.z,n);};var g=function(o,a){if(Math.abs(o-a)<0.000001){return o;}if(o>a){while(o>a){a+=2*Math.PI;}if(a-o<=Math.PI){return a;}else{return a-2*Math.PI;}}else{while(o<a){a-=2*Math.PI;}if(o-a<=Math.PI){return a;}else{return a+2*Math.PI;}}};f.prototype.rotateFromRestPosition=function(x,y,z){if(this._coordinateSystem!==C.Parent){return;}this.beginGesture();this._nodes.forEach(function(h){var i=h.node;if(!i.userData){i.userData={};}i.userData.skipUpdateJointNode=true;});x=THREE.Math.degToRad(x);y=THREE.Math.degToRad(y);z=THREE.Math.degToRad(z);for(var n=0,a=this._nodes.length;n<a;n++){var h=this._nodes[n];if(!h.ignore){var i=h.node;var u;if(this._nodeUserDataMap){u=this._nodeUserDataMap.get(i);}if(u&&u.euler&&u.eulerInParentCoors){this._rotationDelta.set(THREE.Math.radToDeg(x-u.eulerInParentCoors.x),THREE.Math.radToDeg(y-u.eulerInParentCoors.y),THREE.Math.radToDeg(z-u.eulerInParentCoors.z));u.eulerInParentCoors.x=x;u.eulerInParentCoors.y=y;u.eulerInParentCoors.z=z;var o=new THREE.Euler(u.eulerInParentCoors.x,u.eulerInParentCoors.y,u.eulerInParentCoors.z);var j=new THREE.Quaternion().setFromEuler(o);var r=this._viewport._viewStateManager.getRestTransformationUsingJoint(i);var k=new THREE.Quaternion(r.quaternion[0],r.quaternion[1],r.quaternion[2],r.quaternion[3]);if(this._sequence){var s=this._viewport._viewStateManager._getEndPropertyInPreviousSequence(i,c.Rotate,this._sequence);if(s){var l=new THREE.Quaternion(s[0],s[1],s[2],s[3]);j.multiply(l);}}var p=this._getEffectiveParent(i);if(p!==i.parent){this._viewport._viewStateManager._setJointNodeOffsets(i,c.Rotate);i.userData.offsetQuaternion=[j.x,j.y,j.z,j.w];i.userData.skipUpdateJointNode=false;this._viewport._viewStateManager._setJointNodeMatrix();i.userData.skipUpdateJointNode=true;}else{i.quaternion.copy(j.multiply(k));}i.updateMatrix();u.euler.x=u.eulerInParentCoors.x-u.startEulerInParentCoors.x+u.startEuler.x;u.euler.y=u.eulerInParentCoors.y-u.startEulerInParentCoors.y+u.startEuler.y;u.euler.z=u.eulerInParentCoors.z-u.startEulerInParentCoors.z+u.startEuler.z;}}}this.endGesture();};f.prototype.rotateRestPosition=function(x,y,z){this.beginGesture();this._nodes.forEach(function(h){var i=h.node;if(!i.userData){i.userData={};}i.userData.skipUpdateJointNode=true;});x=THREE.Math.degToRad(x);y=THREE.Math.degToRad(y);z=THREE.Math.degToRad(z);for(var n=0,a=this._nodes.length;n<a;n++){var h=this._nodes[n];if(!h.ignore){var i=h.node;var u;if(this._nodeUserDataMap){u=this._nodeUserDataMap.get(i);}if(u&&u.euler&&u.eulerInParentCoors){this._rotationDelta.set(THREE.Math.radToDeg(x-u.euler.x),THREE.Math.radToDeg(y-u.euler.y),THREE.Math.radToDeg(z-u.euler.z));u.euler.x=x;u.euler.y=y;u.euler.z=z;var o=new THREE.Euler(u.euler.x,u.euler.y,u.euler.z);var j=new THREE.Quaternion().setFromEuler(o);var k=new THREE.Matrix4();var l=new THREE.Matrix4();if(this._coordinateSystem===C.Local){k=i.parent.matrixWorld.clone().multiply(u.matRest);l=u.matRestInv.clone().multiply(h.matParentInv);}else if(this._gizmo&&this._coordinateSystem!==C.Parent){k=this._gizmo.matrixWorld.clone();l=l.getInverse(k);}var m=new THREE.Matrix4().makeRotationFromQuaternion(j);var p=m;if(this._coordinateSystem!==C.Parent){p=h.matParentInv.clone().multiply(k).multiply(m).multiply(l).multiply(i.parent.matrixWorld);}var r=new THREE.Matrix4().makeRotationFromQuaternion(u.quatInitialDiff).multiply(p);var s=new THREE.Euler().setFromRotationMatrix(r);if(Math.abs(s.x)<0.000001){s.x=0;}if(Math.abs(s.y)<0.000001){s.y=0;}if(Math.abs(s.z)<0.000001){s.z=0;}u.eulerInParentCoors.x=g(u.eulerInParentCoors.x,s.x);u.eulerInParentCoors.y=g(u.eulerInParentCoors.y,s.y);u.eulerInParentCoors.z=g(u.eulerInParentCoors.z,s.z);i.matrix=u.matInitialDiff.clone().multiply(p.multiply(u.matRest));i.matrix.decompose(i.position,i.quaternion,i.scale);i.updateMatrix();}}}this.endGesture();};f.prototype._updateEulerForCreatingAnimationKey=function(a){for(var n=0,h=this._nodes.length;n<h;n++){var i=this._nodes[n];if(!i.ignore){var j=i.node;var u;if(this._nodeUserDataMap){u=this._nodeUserDataMap.get(j);}if(u&&u.euler){u.euler.x=u.startEuler.x+a[0];u.euler.y=u.startEuler.y+a[1];u.euler.z=u.startEuler.z+a[2];var k=false;if((Math.abs(u.euler.x)<0.000001&&(Math.abs(u.euler.y)<0.000001||Math.abs(u.euler.z)<0.000001))||(Math.abs(u.euler.y)<0.000001&&Math.abs(u.euler.z)<0.000001)){k=true;}if(k&&this._coordinateSystem===C.Parent){u.eulerInParentCoors.x=u.startEulerInParentCoors.x+a[0];u.eulerInParentCoors.y=u.startEulerInParentCoors.y+a[1];u.eulerInParentCoors.z=u.startEulerInParentCoors.z+a[2];continue;}var r=this._viewport._viewStateManager.getRelativeTransformation(j);var o;var p=this._getEffectiveParent(j);if(p!==j.parent){this._viewport._viewStateManager._setJointNodeOffsets(j,c.Rotate);o=new THREE.Quaternion(j.userData.offsetQuaternion[0],j.userData.offsetQuaternion[1],j.userData.offsetQuaternion[2],j.userData.offsetQuaternion[3]);j.userData.skipUpdateJointNode=false;this._viewport._viewStateManager._setJointNodeMatrix();j.userData.skipUpdateJointNode=true;}else{o=new THREE.Quaternion(r.quaternion[0],r.quaternion[1],r.quaternion[2],r.quaternion[3]);}var l=new THREE.Matrix4().makeRotationFromQuaternion(o);if(this._sequence){var s=this._viewport._viewStateManager._getEndPropertyInPreviousSequence(j,c.Rotate,this._sequence);if(s){var m=new THREE.Quaternion(s[0],s[1],s[2],s[3]);var v=new THREE.Matrix4().makeRotationFromQuaternion(m);l.multiply(new THREE.Matrix4().getInverse(v));}}var w=new THREE.Euler().setFromRotationMatrix(l);if(Math.abs(w.x)<0.00001){w.x=0;}if(Math.abs(w.y)<0.00001){w.y=0;}if(Math.abs(w.z)<0.00001){w.z=0;}u.eulerInParentCoors.x=g(u.eulerInParentCoors.x,w.x);u.eulerInParentCoors.y=g(u.eulerInParentCoors.y,w.y);u.eulerInParentCoors.z=g(u.eulerInParentCoors.z,w.z);if(k){continue;}var x=new THREE.Matrix4();var y=new THREE.Matrix4();if(this._coordinateSystem===C.Local){x=j.parent.matrixWorld.clone().multiply(u.matRest);y=u.matRestInv.clone().multiply(i.matParentInv);}else if(this._gizmo&&this._coordinateSystem!==C.Parent){x=this._gizmo.matrixWorld.clone();y=y.getInverse(x);}var z=new THREE.Quaternion(r.quaternion[0],r.quaternion[1],r.quaternion[2],r.quaternion[3]);z.multiply(u.quatInitialDiffInv);var B=new THREE.Matrix4().makeRotationFromQuaternion(z);var D=B;if(this._coordinateSystem!==C.Parent){D=y.clone().multiply(j.parent.matrixWorld).multiply(B).multiply(i.matParentInv).multiply(x);}w=new THREE.Euler().setFromRotationMatrix(D);if(Math.abs(w.x)<0.000001){w.x=0;}if(Math.abs(w.y)<0.000001){w.y=0;}if(Math.abs(w.z)<0.000001){w.z=0;}u.euler.x=g(u.euler.x,w.x);u.euler.y=g(u.euler.y,w.y);u.euler.z=g(u.euler.z,w.z);}}}};f.prototype._rotate=function(a){this._rotationDelta.set(THREE.Math.radToDeg(a.x),THREE.Math.radToDeg(a.y),THREE.Math.radToDeg(a.z));this._value.addVectors(this._beginValue,this._rotationDelta);this._nodes.forEach(function(r){var s=r.node;if(!s.userData){s.userData={};}s.userData.skipUpdateJointNode=true;});var h=new THREE.Quaternion();if(this._coordinateSystem===C.Local){h.setFromEuler(a);this._nodes.forEach(function(r){var s=r.node;s.quaternion.copy(r.quaternion).multiply(h);s.updateMatrix();});a=a.toArray();this._updateEulerForCreatingAnimationKey(a);}else{a=a.toArray();for(var i=0;i<3;i++){var j=a[i];if(j){var k=a[3].charCodeAt(i)-88;if(k>=0&&k<3){var l=new THREE.Vector3().setFromMatrixColumn(this._matOrigin,k).normalize();var m=new THREE.Matrix4().makeRotationAxis(l,j);var p=new THREE.Vector3().setFromMatrixPosition(this._matOrigin);m.setPosition(p.sub(p.clone().applyMatrix4(m)));for(var n=0,o=this._nodes.length;n<o;n++){var r=this._nodes[n];if(!r.ignore){var s=r.node;if(this._coordinateSystem!==C.Parent){s.position.setFromMatrixPosition(r.matOrigin).applyMatrix4(m).applyMatrix4(r.matParentInv);}var u=new THREE.Vector3().setFromMatrixScale(r.matOrigin);var v=l.clone().transformDirection(new THREE.Matrix4().getInverse(r.matOrigin)).multiply(u).normalize();h.setFromAxisAngle(v,j);s.quaternion.copy(r.quaternion).multiply(h);s.updateMatrix();}}}}}this._updateEulerForCreatingAnimationKey(a);}this._viewport.setShouldRenderFrame();};f.prototype._setRotationAxisAngle=function(h,j,k){var l=(k-j)%(Math.PI*2);var m=new THREE.Euler();m[["x","y","z"][h]]=l;var o=this._getNodesProperties();if(this._tool.fireEvent("rotating",{x:THREE.Math.radToDeg(m.x),y:THREE.Math.radToDeg(m.y),z:THREE.Math.radToDeg(m.z),nodesProperties:o},true)){this._printEventInfo("Event 'rotating'",THREE.Math.radToDeg(m.x),THREE.Math.radToDeg(m.y),THREE.Math.radToDeg(m.z),o);this._rotate(m);var v=[0,0,0];var p=new THREE.Vector3();var r=(h+1)%3,s=(h+2)%3;var n=Math.max(Math.ceil(Math.abs(l)*64/Math.PI),1);l*=this._coordinateSystem===C.Local?-1:1;for(var i=0;i<=n;i++){var a=j+l*(i/n);p.set(0,0,0).setComponent(r,Math.cos(a)).setComponent(s,Math.sin(a));v.push(p.x,p.y,p.z);}this._arcMesh.geometry=new THREE.BufferGeometry().setAttribute("position",new THREE.Float32BufferAttribute(v,3));this._arcMesh.visible=true;}};f.prototype.rotate=function(x,y,z){this.beginGesture();this._rotate(new THREE.Euler(THREE.Math.degToRad(x||0),THREE.Math.degToRad(y||0),THREE.Math.degToRad(z||0)));};f.prototype._getValueLocaleOptions=function(){return{useGrouping:false,minimumFractionDigits:1,maximumFractionDigits:2};};f.prototype.getValue=function(){return(this._gizmoIndex>=0&&this._handleIndex>=0&&this._handleIndex<3)?this._value.getComponent(this._handleIndex):0;};f.prototype.setValue=function(v){if(this._gizmoIndex>=0&&this._handleIndex>=0&&this._handleIndex<3){var a=new THREE.Euler();a[["x","y","z"][this._handleIndex]]=THREE.Math.degToRad(v-this._value.getComponent(this._handleIndex));this.beginGesture();this._rotate(a);this.endGesture();}};f.prototype.expandBoundingBox=function(a){if(this._viewport){this._expandBoundingBox(a,this._viewport.getCamera().getCameraRef(),this._viewport._getLayers());}};f.prototype.handleSelectionChanged=function(a){if(this._viewport){if(this._tool.getEnableSnapping()){this._tool.getDetector().setSource(this._viewport._viewStateManager);}this._updateSelection(this._viewport._viewStateManager);var n=this._getNodesProperties();this._tool.fireEvent("rotating",{x:0,y:0,z:0,nodesProperties:n},true);this._gizmoIndex=this._handleIndex=-1;}};f.prototype._getLevelingQuaternion=function(a,o){a.set(0,0,0,1);switch(this._coordinateSystem){case C.Local:a.setFromRotationMatrix(this._nodes[o].node.parent.matrixWorld);break;case C.Screen:a.copy(this._viewport.getCamera().getCameraRef().quaternion);break;case C.Custom:var h=this._getAnchorPoint();if(h){a.copy(h.quaternion);}break;default:break;}return false;};f.prototype._getObjectSize=function(o){var a=new THREE.Box3();if(this._nodes.length===1){this._nodes[0].node._expandBoundingBox(a,this._viewport._getLayers(),false);}else if(this._coordinateSystem===C.Local){this._nodes[0].node._expandBoundingBox(a,this._viewport._getLayers(),false);}if(a.isEmpty()){return 0;}var s=new THREE.Vector3();a.getSize(s);return s.length();};f.prototype._updateGizmoTransformation=function(i,a){var s=this._updateGizmoObjectTransformation(this._gizmo,i);this._updateAxisTitles(this._axisTitles,this._gizmo,a,this._gizmoSize-12,s);};f.prototype._getEditingFormPosition=function(){var s=this._updateGizmoObjectTransformation(this._gizmo,this._gizmoIndex);var a=new THREE.Vector3().setFromMatrixColumn(this._gizmo.matrixWorld,this._handleIndex).normalize();return a.clone().multiplyScalar((this._gizmoSize-12)*s).add(this._gizmo.position).applyMatrix4(this._matViewProj);};f.prototype.render=function(){if(this._nodes.length>0){var r=this._viewport.getRenderer(),a=this._viewport.getCamera().getCameraRef();this._matViewProj.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse);r.clearDepth();for(var i=0,l=this.getGizmoCount();i<l;i++){this._updateGizmoTransformation(i,a);r.render(this._sceneGizmo,a);}}this._updateEditingForm(this._nodes.length>0&&this._gizmoIndex>=0&&this._handleIndex>=0&&this._handleIndex<3,this._handleIndex);};return f;});

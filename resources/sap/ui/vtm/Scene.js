/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Element","sap/ui/vk/dvl/GraphicsCore","sap/ui/vk/Scene","sap/ui/vk/NodeHierarchy","./ViewableLoadInfo","./SceneNode","./ArrayUtilities"],function(q,S,a,b,c,d,e,f){"use strict";var g=S.extend("sap.ui.vtm.Scene",{metadata:{events:{downloadProgress:{parameters:{viewable:{type:"sap.ui.vtm.Viewable"},downloadedBytes:{type:"int"},totalBytes:{type:"int"}}},downloadStarted:{parameters:{viewableLoadInfos:{type:"sap.ui.vtm.ViewableLoadInfo[]"}}},downloadCompleted:{parameters:{viewableLoadInfos:{type:"sap.ui.vtm.ViewableLoadInfo[]"},downloadedViewables:{type:"sap.ui.vtm.Viewable[]"}}},loadStarted:{parameters:{viewableLoadInfos:{type:"sap.ui.vtm.ViewableLoadInfo[]"}}},loadProgress:{viewable:{type:"sap.ui.vtm.Viewable"},percentage:{type:"float"}},loadCompleted:{parameters:{succeeeded:{type:"boolean"},viewableLoadInfos:{type:"sap.ui.vtm.ViewableLoadInfo[]"},loadedViewables:{type:"sap.ui.vtm.Viewable[]"}}},hierarchyChanged:{}}},init:function(){var v=new a({},{antialias:true,alpha:true,premultipliedAlpha:false});this._viewablesBySource=new Map();this._viewableLoadInfosByViewable=new Map();this._vkGraphicsCore=v;this._rootContentResource=new sap.ui.vk.ContentResource({localMatrix:sap.ui.vtm.MatrixUtilities.toVkMatrix(sap.ui.vtm.MatrixUtilities.createIdentity())});v.attachEvent("sceneLoadingProgress",function(h){var s=h.getParameter("sourceName"),p=h.getParameter("percentage")*100,i=this._viewablesBySource.get(s);this.fireLoadProgress({viewable:i,percentage:p});}.bind(this));},destroy:function(){if(this._vkGraphicsCore!==null){this._vkGraphicsCore.destroy();this._vkGraphicsCore=null;}S.prototype.destroy.apply(this);},_raiseHierarchyChanged:function(){sap.ui.vtm.measure(this,"fireHierarchyChanged",function(){this.fireHierarchyChanged();}.bind(this));},_getViewableLoadInfos:function(v){var h=[];v.forEach(function(i){var j=this._viewableLoadInfosByViewable.get(i);h.push(j);}.bind(this));return h;},_raiseDownloadStarted:function(v){sap.ui.vtm.measure(this,"fireDownloadStarted",function(){var h=this._getViewableLoadInfos(v);this.fireDownloadStarted({viewableLoadInfos:h});}.bind(this));},_raiseDownloadCompleted:function(v){sap.ui.vtm.measure(this,"fireDownloadCompleted",function(){var h=this._getViewableLoadInfos(v);var i=h.filter(function(j){return j.getStatus()===sap.ui.vtm.ViewableLoadStatus.Downloaded;}).map(function(j){return j.getViewable();});this.fireDownloadCompleted({viewableLoadInfos:h,downloadedViewables:i});}.bind(this));},_raiseLoadStarted:function(v){sap.ui.vtm.measure(this,"fireLoadStarted",function(){var h=this._getViewableLoadInfos(v);this.fireLoadStarted({viewableLoadInfos:h});}.bind(this));},_raiseLoadCompleted:function(s,v){sap.ui.vtm.measure(this,"fireLoadCompleted",function(){var h=this._getViewableLoadInfos(v);var l=h.filter(function(i){return i.getStatus()===sap.ui.vtm.ViewableLoadStatus.Loaded;}).map(function(i){return i.getViewable();});this.fireLoadCompleted({succeeded:s,viewableLoadInfos:h,loadedViewables:l});}.bind(this));},getRootIds:function(){if(this._vkNodeHierarchy){var r=this._vkNodeHierarchy.getChildren();this.addCachedIds(r);return r;}return[];},_getSceneNode:function(s){if(!this._vkNodeHierarchy){throw"Scene hierarchy is empty";}var h=new sap.ui.vtm.SceneNode({sceneNodeId:s,scene:this});return h;},_getNodeHierarchy:function(){return this._vkNodeHierarchy;},_traverseBranch:function(s,h,i,j){i.setSceneNodeId(s);if(h(i,j)===false){return;}j.push(s);if(!i.getClosed()){var k=this.getChildIds(s);k.forEach(function(l){this._traverseBranch(l,h,i,j);}.bind(this));}j.pop();},traverseBranch:function(s,h){if(!s){throw"sceneNodeId not defined";}if(!h){throw"callback not defined";}sap.ui.vtm.measure(this,"traverseBranch ("+s+")",function(){var i=this._getSceneNode(s);var j=this.getAncestorIds(s);this._traverseBranch(s,h,i,j);i._destroy();}.bind(this));return this;},traverseTree:function(h){if(!h){throw"callback not defined";}if(!this._vkNodeHierarchy){return this;}sap.ui.vtm.measure(this,"traverseTree",function(){var r=this.getRootIds();var s=this._getSceneNode(null);r.forEach(function(i){this._traverseBranch(i,h,s,[]);}.bind(this));s._destroy();}.bind(this));return this;},traverseNodes:function(s,h){if(!s){throw"sceneNodeIds not defined";}if(!h){throw"callback not defined";}if(!Array.isArray(s)){s=[s];}sap.ui.vtm.measure(this,"traverseNodes ("+s.join(",")+")",function(){var j=this._getSceneNode(null);for(var i=0;i<s.length;i++){j.setSceneNodeId(s[i]);if(h(j,i)===false){break;}}j._destroy();}.bind(this));return this;},_handleLoadContentResourcesAsyncCompleted:function(h,v){v.forEach(function(i){var s=i.getSource();var j=sap.ui.vtm.ArrayUtilities.find(h,function(j){return j.source===s;});var k=this._viewableLoadInfosByViewable.get(i);if(j){k.setStatus(sap.ui.vtm.ViewableLoadStatus.DownloadFailed);k.setErrorCode(j.status);k.setErrorText(j.statusText);}else{k.setStatus(sap.ui.vtm.ViewableLoadStatus.Downloaded);}}.bind(this));this._raiseDownloadCompleted(v);if(this.getDownloadedViewables().length!=0){this._raiseLoadStarted(v);setTimeout(function(){var u=function(){v.forEach(function(n){var o=this._viewableLoadInfosByViewable.get(n);var p=o.getStatus();if(p===sap.ui.vtm.ViewableLoadStatus.Loaded&&!n.getRootNodeIds()){var r=n._getContentResource().getNodeProxy();if(r){var t=r.getNodeId();this.addCachedIds(t);var w=this.getChildIds(t);n.setRootNodeIds(w);}}}.bind(this));}.bind(this);var i=function(n){var o=sap.ui.vtm.ArrayUtilities.find(v,function(o){return o.getSource()===n;});if(o){var p=this._viewableLoadInfosByViewable.get(o);p.setStatus(sap.ui.vtm.ViewableLoadStatus.Loaded);}}.bind(this);var j=function(n){var o=sap.ui.vtm.ArrayUtilities.find(v,function(o){return o.getSource()===n;});if(o){var p=this._viewableLoadInfosByViewable.get(o);p.setStatus(sap.ui.vtm.ViewableLoadStatus.LoadFailed);}}.bind(this);var s=function(n){var o=n.getParameter("source");var p=n.getParameter("sceneId");if(p){i(o);}else{j(o);}};this._vkGraphicsCore.attachSceneLoadingFinished(s);var k=v.filter(function(n){var o=this._viewableLoadInfosByViewable.get(n);switch(o.getStatus()){case sap.ui.vtm.ViewableLoadStatus.Downloading:case sap.ui.vtm.ViewableLoadStatus.DownloadFailed:return false;default:return true;}}.bind(this));k.forEach(function(n){var o=n._getContentResource();if(this._rootContentResource.getContentResources().indexOf(o)<0){this._rootContentResource.addContentResource(o);}}.bind(this));if(!this._sceneCreated){var l=sap.ui.vtm.createMeasureId(this,"Building scene tree");q.sap.measure.start(l,"",["sap.ui.vtm"]);this._vkGraphicsCore.buildSceneTreeAsync([this._rootContentResource]).then(function(n){q.sap.measure.end(l);this._vkGraphicsCore.detachSceneLoadingFinished(s);this._vkScene=n.scene;this._vkNodeHierarchy=this._vkScene.getDefaultNodeHierarchy();var r=this.getRootIds();this.addCachedIds(r);u();this._sceneCreated=true;this.fireEvent("sceneCreated");this._raiseHierarchyChanged();this._raiseLoadCompleted(true,v);}.bind(this)).catch(function(r){q.sap.measure.end(l);this._vkGraphicsCore.detachSceneLoadingFinished(s);this._raiseLoadCompleted(false,v);}.bind(this));}else{var m=sap.ui.vtm.createMeasureId(this,"Updating scene tree");q.sap.measure.start(m,"",["sap.ui.vtm"]);this._vkGraphicsCore.updateSceneTreeAsync(this._vkScene,[this._rootContentResource]).then(function(n){q.sap.measure.end(m);this._vkGraphicsCore.detachSceneLoadingFinished(s);u();this._raiseHierarchyChanged();this._raiseLoadCompleted(true,v);}.bind(this)).catch(function(r){q.sap.measure.end(m);this._vkGraphicsCore.detachSceneLoadingFinished(s);if(r.contentResourcesWithEncryptedVds3){r.contentResourcesWithEncryptedVds3.forEach(function(n){var o=n.getSource();j(o);});}if(r.contentResourcesWithMissingPasswords){r.contentResourcesWithMissingPasswords.forEach(function(n){var o=n.getSource();j(o);});}this._raiseLoadCompleted(false,v);}.bind(this));}}.bind(this),50);}},_handleLoadContentResourcesAsyncProgress:function(p,v){var s=p.getParameter("source");var h=p.getParameter("loaded");var t=p.getParameter("total");var i=sap.ui.vtm.ArrayUtilities.find(v,function(i){return s===i.getSourceString();});sap.ui.vtm.measure(this,"fireDownloadProgress",function(){this.fireDownloadProgress({viewable:i,downloadedBytes:h,totalBytes:t});}.bind(this));},loadViewablesAsync:function(v){if(!v){throw"viewables not specified";}v=sap.ui.vtm.ArrayUtilities.wrap(v);if(!v.length){throw"viewables is empty";}v.forEach(function(h){var s=h.getSourceString();if(!this._viewablesBySource.has(s)){this._viewablesBySource.set(s,h);}var i=new sap.ui.vtm.ViewableLoadInfo({viewable:h,status:sap.ui.vtm.ViewableLoadStatus.Downloading});this._viewableLoadInfosByViewable.set(h,i);}.bind(this));this._raiseDownloadStarted(v);setTimeout(function(){var s=v.map(function(j){return j.getSourceString();});var h=v.map(function(j){return j._getContentResource();});var i=sap.ui.vtm.createMeasureId(this,"Downloading "+s.join(", "));q.sap.measure.start(i,"",["sap.ui.vtm"]);this._vkGraphicsCore.loadContentResourcesAsync(h,function(j){q.sap.measure.end(i);j=j=j||[];this._handleLoadContentResourcesAsyncCompleted(j,v);}.bind(this),function(p){this._handleLoadContentResourcesAsyncProgress(p,v);}.bind(this));}.bind(this),50);return this;},getDownloadedViewables:function(){var h=[];this._viewableLoadInfosByViewable.forEach(function(v,i){switch(v.getStatus()){case sap.ui.vtm.ViewableLoadStatus.Downloading:case sap.ui.vtm.ViewableLoadStatus.DownloadFailed:break;default:h.push(i);break;}});return h;},getLoadedViewables:function(){var l=[];this._viewableLoadInfosByViewable.forEach(function(v,h){if(v.getStatus()===sap.ui.vtm.ViewableLoadStatus.Loaded){l.push(h);}});return l;},getViewableLoadInfos:function(){var v;this._viewableLoadInfosByViewable.forEach(function(h,i){v.push(h);});return v;},getAncestorIds:function(s){if(this._vkNodeHierarchy){var h=this._vkNodeHierarchy.getAncestors(s);this.addCachedIds(h);return h;}return[];},getParentId:function(s){var h=this.getAncestorIds(s);if(h&&h.length){return h[h.length-1];}return null;},getChildIds:function(s){if(this._vkNodeHierarchy){var h=this._vkNodeHierarchy.getChildren(s,true);this.addCachedIds(h);return h;}return[];},getDescendantIds:function(s){var h=[];sap.ui.vtm.measure(this,"getDescendantIds ("+s+")",function(){var i=function(s){var j=this.getChildIds(s);j.forEach(function(k){h.push(k);i(k);});}.bind(this);i(s);}.bind(this));this.addCachedIds(h);return h;},getAllIds:function(){var r=this.getRootIds();var h=[];r.forEach(function(i){h.push(i);var j=this.getDescendantIds(i);h=h.concat(j);}.bind(this));this.setCachedIds(h);return h;},getCachedIds:function(){if(!this._cachedIds||!this._cachedIds.length){this._cachedIds=this.getAllIds();}return this._cachedIds;},setCachedIds:function(s){this._cachedIds=s;return this;},addCachedIds:function(s){if(!this._cachedIds){this._cachedIds=[];}s=sap.ui.vtm.ArrayUtilities.wrap(s);s.forEach(function(h){if(this._cachedIds.indexOf(h)===-1){this._cachedIds.push(h);}}.bind(this));return this;},removeCachedIds:function(s){if(this._cachedIds){s=sap.ui.vtm.ArrayUtilities.wrap(s);this._cachedIds=this._cachedIds.filter(function(h){return s.indexOf(h)===-1;});}return this;},createNode:function(p,i,n){var h=this._vkNodeHierarchy.createNode(p,n,i);this.addCachedIds(h);this._raiseHierarchyChanged();return h;},cloneNode:function(n,p,i,h,r){var j=this._vkNodeHierarchy.createNodeCopy(n,p,h,i);r=r===undefined||r===null?true:r;this.addCachedIds(j);if(!r){var k=this.getChildIds(j);k.forEach(function(l){this.deleteNode(l);}.bind(this));}else{this.addCachedIds(this.getDescendantIds(j));}this._raiseHierarchyChanged();return j;},deleteNode:function(n){this.removeCachedIds(n);this.removeCachedIds(this.getDescendantIds(n));this._vkNodeHierarchy.removeNode(n);this._raiseHierarchyChanged();return this;},getVtm:function(){return this.getParent();}});return g;});

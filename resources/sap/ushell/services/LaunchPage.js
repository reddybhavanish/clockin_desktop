// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/ContentExtensionAdapterFactory","sap/ui/thirdparty/jquery","sap/ushell/resources","sap/ushell/services/_AppState/AppStatePersistencyMethod","sap/ushell/Config"],function(C,q,r,A,a){"use strict";function L(o){var t=this,T=[],b=C.getAdapters();this.oAdapters={"default":o};b.then(function(c){q.extend(this.oAdapters,c);}.bind(this));this.getGroups=function(){if(a.last("/core/spaces/enabled")){return new q.Deferred().resolve([]).promise();}var d=new q.Deferred();b.then(function(){var G=Object.keys(t.oAdapters).map(function(s){return t._getAdapter(s).getGroups();});q.when.apply(q,G).done(function(){var c=[].concat.apply([],arguments);d.resolve(c);}).fail(function(){q.sap.log.error("getGroups failed");});});return d.promise();};this.getGroupsForBookmarks=function(G){var d=q.Deferred();this.getGroups().then(function(c){this.getDefaultGroup().then(function(D){if(c.length>0){c=c.filter(function(e){if(G!==undefined&&G===true){return this.isGroupVisible(e);}return(!this.isGroupLocked(e)&&this.isGroupVisible(e));}.bind(this));c=c.map(function(e){return{title:(e===D&&r.i18n.getText("my_group"))||this.getGroupTitle(e),object:e};}.bind(this));}d.resolve(c);}.bind(this),function(e){q.sap.log.error("getGroupsForBookmarks - getDefaultGroup - failed: "+e.message);});}.bind(this),function(e){q.sap.log.error("getGroupsForBookmarks - getGroups - failed: "+e.message);});return d.promise();};this.getDefaultGroup=function(){var p=this._getAdapter().getDefaultGroup();p.fail(function(){q.sap.log.error("getDefaultGroup failed");});return p;};this.getGroupTitle=function(G){return this._getAdapter(G.contentProvider).getGroupTitle(G);};this.getGroupId=function(G){return this._getAdapter(G.contentProvider).getGroupId(G);};this.getGroupById=function(G){var D=q.Deferred(),t=this;this.getGroups().then(function(c){c=q.grep(c,function(e){return t.getGroupId(e)===G;});D.resolve((c&&c.length>0?c[0]:undefined));});return D.promise();};this.getGroupTiles=function(G){return this._getAdapter(G.contentProvider).getGroupTiles(G);};this.getTilesByGroupId=function(G){var D=q.Deferred(),t=this;this.getGroupById(G).then(function(c){if(c){var d=t._getAdapter(c.contentProvider).getGroupTiles(c);if(d){d=d.map(function(e){return{id:t.getTileId(e),title:t.getTileTitle(e),subtitle:t.getCatalogTilePreviewSubtitle(e),url:t.getCatalogTileTargetURL(e),icon:t.getCatalogTilePreviewIcon(e),groupId:G};});}else{d=[];}D.resolve(d);}else{D.resolve([]);}});return D.promise();};this.getLinkTiles=function(G){return this._getAdapter(G.contentProvider).getLinkTiles(G);};this.addGroupAt=function(s,i){var p,c=i,o=this._getAdapter();if(o.addGroupAt){p=o.addGroupAt(s,i);p.fail(function(){q.sap.log.error("addGroup "+s+" failed");});}else{var d=new q.Deferred();p=o.addGroup(s);p.done(function(n){var m=this.moveGroup(n,c),e=n;m.done(function(){d.resolve(e);});m.fail(function(){d.reject();});}.bind(this));p.fail(function(){q.sap.log.error("addGroup "+s+" failed");d.reject();});return d.promise();}return p;};this.addGroup=function(s){var p=this._getAdapter().addGroup(s);p.fail(function(){q.sap.log.error("addGroup "+s+" failed");});return p;};this.removeGroup=function(G,i){var p=this._getAdapter(G.contentProvider).removeGroup(G,i);p.fail(function(){q.sap.log.error("Fail to removeGroup "+t.getGroupTitle(G));});return p;};this.resetGroup=function(G,i){var p=this._getAdapter(G.contentProvider).resetGroup(G,i);p.fail(function(){q.sap.log.error("Fail to resetGroup "+t.getGroupTitle(G));});return p;};this.isGroupRemovable=function(G){return this._getAdapter(G.contentProvider).isGroupRemovable(G);};this.isGroupLocked=function(G){var o=this._getAdapter(G.contentProvider);if(typeof o.isGroupLocked==="function"){return o.isGroupLocked(G);}return false;};this.isGroupFeatured=function(G){var o=this._getAdapter(G.contentProvider);if(typeof o.isGroupFeatured==="function"){return o.isGroupFeatured(G);}return false;};this.moveGroup=function(G,n){var p=this._getAdapter(G.contentProvider).moveGroup(G,n);p.fail(function(){q.sap.log.error("Fail to moveGroup "+t.getGroupTitle(G));});return p;};this.setGroupTitle=function(G,s){var p=this._getAdapter(G.contentProvider).setGroupTitle(G,s);p.fail(function(){q.sap.log.error("Fail to set Group title: "+t.getGroupTitle(G));});return p;};this.hideGroups=function(h){var d=new q.Deferred(),o=this._getAdapter();if(typeof o.hideGroups!=="function"){d.reject("hideGroups() is not implemented in the Adapter.");}else{o.hideGroups(h).done(function(){d.resolve();}).fail(function(m){q.sap.log.error("Fail to store groups visibility."+m);d.reject();});}return d.promise();};this.isGroupVisible=function(G){var o=this._getAdapter(G.contentProvider);if(typeof o.isGroupVisible==="function"){return o.isGroupVisible(G);}return true;};this.addTile=function(c,G){var p=this._getAdapter(G.contentProvider).addTile(c,G),t=this;p.done(function(){t.changeURLStatesToPersistent(t.getCatalogTileTargetURL(c));});p.fail(function(){q.sap.log.error("Fail to add Tile: "+t.getCatalogTileId(c));});return p;};this.removeTile=function(G,c,i){var p=this._getAdapter(G.contentProvider).removeTile(G,c,i),t=this;p.done(function(){t.deleteURLStatesPersistentData(t.getCatalogTileTargetURL(c));});p.fail(function(){q.sap.log.error("Fail to remove Tile: "+t.getTileId(c));});return p;};this.moveTile=function(c,s,i,S,d,n){var p=this._getAdapter().moveTile(c,s,i,S,d,n);p.fail(function(){q.sap.log.error("Fail to move Tile: "+t.getTileId(c));});return p;};this.isLinkPersonalizationSupported=function(c){var s=c&&c.contentProvider,o=this._getAdapter(s);if(typeof o.isLinkPersonalizationSupported==="function"){return o.isLinkPersonalizationSupported(c);}return false;};this.getTileId=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getTileId(c);};this.getTileTitle=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getTileTitle(c);};this.getTileType=function(c){var s=c&&c.contentProvider,o=this._getAdapter(s);if(o.getTileType){return o.getTileType(c);}return"tile";};this.getTileView=function(c){var s=c&&c.contentProvider,d=this._getAdapter(s).getTileView(c);if(!q.isFunction(d.promise)){d=new q.Deferred().resolve(d).promise();}return d;};this.getCardManifest=function(G){var s=G&&G.contentProvider;return this._getAdapter(s).getCardManifest(G);};this.getAppBoxPressHandler=function(c){var s=c&&c.contentProvider,o=this._getAdapter(s);if(o.getAppBoxPressHandler){return o.getAppBoxPressHandler(c);}return undefined;};this.getTileSize=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getTileSize(c);};this.getTileTarget=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getTileTarget(c);};this.getTileDebugInfo=function(c){var s=c&&c.contentProvider,o=this._getAdapter(s);if(typeof o.getTileDebugInfo==="function"){return o.getTileDebugInfo(c);}return undefined;};this.isTileIntentSupported=function(c){var s=c&&c.contentProvider,o=this._getAdapter(s);if(typeof o.isTileIntentSupported==="function"){return o.isTileIntentSupported(c);}return true;};this.refreshTile=function(c){var s=c&&c.contentProvider;this._getAdapter(s).refreshTile(c);};this.setTileVisible=function(c,n){var s=c&&c.contentProvider;return this._getAdapter(s).setTileVisible(c,n);};this.registerTileActionsProvider=function(p){if(typeof p!=="function"){throw new Error("Tile actions Provider is not a function");}T.push(p);};this.getTileActions=function(c){var d=[],e,s=c&&c.contentProvider,o=this._getAdapter(s);if(typeof o.getTileActions==="function"){e=o.getTileActions(c);if(e&&e.length&&e.length>0){d.push.apply(d,e);}}for(var i=0;i<T.length;i++){e=T[i](c);if(e&&e.length&&e.length>0){d.push.apply(d,e);}}return d;};this.getCatalogs=function(){return this._getAdapter().getCatalogs();};this.isCatalogsValid=function(){return this._getAdapter().isCatalogsValid();};this.getCatalogData=function(c){var l=this._getAdapter();if(typeof l.getCatalogData!=="function"){q.sap.log.warning("getCatalogData not implemented in adapter",null,"sap.ushell.services.LaunchPage");return{id:this.getCatalogId(c)};}return l.getCatalogData(c);};this.getCatalogError=function(c){return this._getAdapter().getCatalogError(c);};this.getCatalogId=function(c){return this._getAdapter().getCatalogId(c);};this.getCatalogTitle=function(c){return this._getAdapter().getCatalogTitle(c);};this.getCatalogTiles=function(c){var p=this._getAdapter().getCatalogTiles(c);p.fail(function(){q.sap.log.error("Fail to get Tiles of Catalog: "+t.getCatalogTitle(c));});return p;};this.getCatalogTileId=function(c){return this._getAdapter(c.contentProvider).getCatalogTileId(c);};this.getCatalogTileTitle=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getCatalogTileTitle(c);};this.getCatalogTileSize=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getCatalogTileSize(c);};this.getCatalogTileViewControl=function(c){var s=c&&c.contentProvider;var l=this._getAdapter(s);if(typeof l.getCatalogTileViewControl==="function"){return l.getCatalogTileViewControl(c);}var d=new q.Deferred(),R=this.getCatalogTileView(c);d.resolve(R);return d.promise();};this.getCatalogTileView=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getCatalogTileView(c);};this.getCatalogTileTargetURL=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getCatalogTileTargetURL(c);};this.getCatalogTileTags=function(c){var s=c&&c.contentProvider;var l=this._getAdapter(s);if(typeof l.getCatalogTileTags==="function"){return l.getCatalogTileTags(c);}return[];};this.getCatalogTileKeywords=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getCatalogTileKeywords(c);};this.getCatalogTilePreviewTitle=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getCatalogTilePreviewTitle(c);};this.getCatalogTilePreviewInfo=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getCatalogTilePreviewInfo(c);};this.getCatalogTilePreviewSubtitle=function(c){var s=c&&c.contentProvider;var l=this._getAdapter(s);if(l.getCatalogTilePreviewSubtitle){return l.getCatalogTilePreviewSubtitle(c);}};this.getCatalogTilePreviewIcon=function(c){var s=c&&c.contentProvider;return this._getAdapter(s).getCatalogTilePreviewIcon(c);};this.addBookmark=function(p,G){var P,d,m,s,t=this;if(!p.title){q.sap.log.error("Add Bookmark - Missing title");throw new Error("Title missing in bookmark configuration");}if(!p.url){q.sap.log.error("Add Bookmark - Missing URL");throw new Error("URL missing in bookmark configuration");}if(G&&this.isGroupLocked(G)){d=new q.Deferred();P=d.promise();m="Tile cannot be added, target group ("+this.getGroupTitle(G)+")is locked!";d.reject(m);q.sap.log.error(m);}else{s=G&&G.contentProvider;P=this._getAdapter(s).addBookmark(p,G);P.done(function(){t.changeURLStatesToPersistent(p.url);});P.fail(function(){q.sap.log.error("Fail to add bookmark for URL: "+p.url+" and Title: "+p.title);});}return P;};this.countBookmarks=function(u){if(!u||typeof u!=="string"){q.sap.log.error("Fail to count bookmarks. No valid URL");throw new Error("Missing URL");}var p=this._getAdapter().countBookmarks(u);p.fail(function(){q.sap.log.error("Fail to count bookmarks");});return p;};this.deleteBookmarks=function(u){var t=this;if(!u||typeof u!=="string"){throw new Error("Missing URL");}var p=this._getAdapter().deleteBookmarks(u);p.done(function(){t.deleteURLStatesPersistentData(u);});p.fail(function(){q.sap.log.error("Fail to delete bookmark for: "+u);});return p;};this.updateBookmarks=function(u,p){if(!u||typeof u!=="string"){q.sap.log.error("Fail to update bookmark. No valid URL");throw new Error("Missing URL");}if(!p||typeof p!=="object"){q.sap.log.error("Fail to update bookmark. No valid parameters, URL is: "+u);throw new Error("Missing parameters");}var P=this._getAdapter().updateBookmarks(u,p);P.fail(function(){q.sap.log.error("Fail to update bookmark for: "+u);});return P;};this.onCatalogTileAdded=function(s){return this._getAdapter().onCatalogTileAdded(s);};this.changeURLStatesToPersistent=function(u){var c=sap.ushell.Container.getService("AppState");if(c.getSupportedPersistencyMethods().length===0){return;}if(u&&u.length>0){try{var x=g(u,"sap-xapp-state"),i=g(u,"sap-iapp-state");if(x!==undefined){c.makeStatePersistent(x,A.PersonalState);}if(i!==undefined){c.makeStatePersistent(i,A.PersonalState);}}catch(e){q.sap.log.error("error in converting transiant state to personal persistent when bookmark is added",e,"sap.ushell.services.LaunchPage");}}};this.deleteURLStatesPersistentData=function(u){var c=sap.ushell.Container.getService("AppState");if(c.getSupportedPersistencyMethods().length===0){return;}if(u&&u.length>0){try{var x=g(u,"sap-xapp-state"),i=g(u,"sap-iapp-state");if(x!==undefined||i!==undefined){this.countBookmarks(u).done(function(d){if(d===0){if(x!==undefined){c.deleteAppState(x);}if(i!==undefined){c.deleteAppState(i);}}});}}catch(e){q.sap.log.error("error in deleting persistent state when bookmark is deleted",e,"sap.ushell.services.LaunchPage");}}};function g(u,p){var R=new RegExp("(?:"+p+"=)([^&/]+)"),s=R.exec(u),v=undefined;if(s&&s.length===2){v=s[1];}return v;}}L.prototype._getAdapter=function(s){return this.oAdapters[s]||this.oAdapters.default;};L.hasNoAdapter=false;return L;},true);

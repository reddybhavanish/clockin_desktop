// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/adapters/cdm/v3/_LaunchPage/readHome","sap/ushell/adapters/cdm/v3/_LaunchPage/readVisualizations","sap/m/GenericTile","sap/ui/core/ComponentContainer","sap/ushell/adapters/cdm/_LaunchPage/uri.transform","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/navigationMode","sap/ushell/resources","sap/ushell/utils","sap/ushell/adapters/cdm/v3/utilsCdm","sap/base/util/Version","sap/ui/thirdparty/jquery","sap/base/util/isPlainObject","sap/base/util/isEmptyObject","sap/base/util/ObjectPath"],function(r,R,G,C,u,a,e,n,o,U,b,V,q,i,c,O){"use strict";var l=q.sap.log.getLogger("sap/ushell/adapters/cdm/LaunchPageAdapter");var L=q.sap.log.Level;var S="sap.ushell.components.tiles.cdm.applauncher";var D="sap.ushell.components.tiles.cdm.applauncherdynamic";function A(d,p,f){this.oAdapterConfiguration=f;this._mResolvedTiles={};this._mCatalogTilePromises={};this._mFailedResolvedCatalogTiles={};this._mFailedResolvedTiles={};this._mContentProviders={};this.TileType={Tile:"tile",Link:"link",Card:"card"};}A.prototype.getGroups=function(){var d=new q.Deferred();this._ensureLoaded().done(function(g){U.setPerformanceMark("FLP - homepage groups processed");d.resolve(g);}).fail(function(){d.resolve([]);});return d.promise();};A.prototype._ensureLoaded=function(){var t=this,d;if(this._ensureLoadedDeferred){return this._ensureLoadedDeferred.promise();}d=new q.Deferred();this._ensureLoadedDeferred=d;this._getSiteData().done(function(s){if(!t.isSiteSupported(s)){throw new Error("Invalid CDM site version: Check the configuration of the launchpage adapter and the version of the FLP site");}var I=[];var g=r.getGroupsArrayFromSite(s);g=t._addDefaultGroup(g,s);g.forEach(function(f){I=t._ensureGroupItemsResolved(f,s).concat(I);});t._allPromisesDone(I).done(function(){t._ensureLoadedDeferred.resolve(g);delete t._ensureLoadedDeferred;t._logTileResolutionFailures(t._mFailedResolvedTiles);});}).fail(function(E){l.error("Delivering hompage groups failed - "+E);t._ensureLoadedDeferred.resolve([]);delete t._ensureLoadedDeferred;});return d.promise();};A.prototype._ensureGroupItemsResolved=function(g,s){var p=[],d,f;if(g.payload&&g.payload.tiles){d=this._ensureGroupTilesResolved(g.payload.tiles,s);Array.prototype.push.apply(p,d);}if(g.payload&&g.payload.links){f=this._ensureGroupLinksResolved(g.payload.links,s);Array.prototype.push.apply(p,f);}return p;};A.prototype._ensureGroupTilesResolved=function(g,s){return(g||[]).map(function(t,I){return this._resolveGroupTile(t,s).then(function(d){d.isLink=false;return d;});},this);};A.prototype._ensureGroupLinksResolved=function(g,s){return(g||[]).map(function(d){return this._resolveGroupTile(d,s).then(function(f){f.isLink=true;return f;});},this);};A.prototype._resolveGroupTile=function(t,s){var m=this._mResolvedTiles;var f=this._mFailedResolvedTiles;var d;function g(j){m[t.id]=j;if(f[t.id]){delete f[t.id];}return j;}function h(t){var T=t.target;return T&&T.semanticObject==="Shell"&&T.action==="launchURL";}if(m[t.id]){return(new q.Deferred()).resolve(m[t.id]).promise();}if(t.target&&t.target.url){d=q.when(this._getTileForUrl(t));}else if(t.isBookmark){d=this._resolveTileByIntent(t,s);}else if(h(t)){d=this._resolveTileByIntent(t,s);}else{d=this._resolveTileByVizId(t,s);}d.done(function(j){g(j);}).fail(function(F){f[t.id]=F;});return d;};A.prototype._resolveTileByVizId=function(t,s){var v,d,f,g,h,j,I,m,N,k,H,p,E;function w(J,M){return new q.Deferred().reject({logLevel:J,message:M}).promise();}if(!i(s)){return w(L.ERROR,"Cannot resolve tile: oSite must be an object");}if(!i(t)){return w(L.ERROR,"Cannot resolve tile: oTile must be an object");}d=t.vizId;if(!d){return w(L.ERROR,"Cannot resolve tile '"+t.id+"': vizId must be specified");}v=R.get(s,d);if(!v){return w(L.ERROR,"Cannot resolve tile '"+t.id+"': no visualization found for vizId '"+d+"'");}g=R.getTypeId(v);f=R.getType(s,g);if(!f){return w(L.ERROR,"Cannot resolve tile '"+t.id+"': no visualization type found for vizTypeId '"+g+"'");}h=R.getAppId(v);if(h){j=R.getAppDescriptor(s,h);if(!j){return w(L.INFO,"Tile '"+t.id+"' filtered from result: no app descriptor found for appId '"+h+"' (dangling app reference)");}I=r.getInbound(j,R.getTarget(v).inboundId);if(!I){return w(L.ERROR,"Cannot resolve tile '"+t.id+"': app '"+h+"' has no navigation inbound");}m=b.mapOne(I.key,I.inbound,j,v,f,s);var x=m.resolutionResult.applicationType,y=m.resolutionResult.additionalInformation,z=a.last("/core/navigation/enableInPlaceForClassicUIs"),B=z?z[x]:false;N=n.computeNavigationModeForHomepageTiles(x,y,B);p=R.getOutbound(v,I.inbound);H=this._toHashFromOutbound(p);}else{var F=R.getConfig(v);if(!F){return w(L.INFO,"Tile '"+t.id+"' filtered from result: Neither target app nor configuration given in visualization '"+d+"'");}m=b.mapOne(undefined,undefined,undefined,v,f,s);if(R.startsExternalUrl(v)){E=U.getMember(F,"sap|flp.target.url");}}k=m.tileResolutionResult;k.navigationMode=N;k.isLink=false;if(!this._isFormFactorSupported(k)){return w(L.INFO,"Tile '"+t.id+"' filtered from result: form factor not supported");}return q.when({tileResolutionResult:k,tileIntent:E||H});};A.prototype._isFormFactorSupported=function(d){var s=U.getFormFactor();return r.supportsFormFactor(d,s);};A.prototype._getFirstInbound=function(d){var f=Object.keys(d["sap.app"].crossNavigation.inbounds).shift(),I=d["sap.app"].crossNavigation.inbounds[f];return{key:f,inbound:I};};A.prototype._resolveTileByIntent=function(t){var h=this._prepareTileHash(t);return this._getTileFromHash(h);};A.prototype._allPromisesDone=function(p){var d=new q.Deferred(),f;if(p.length===0){d.resolve([]);}else{var N=p.map(function(P){f=new q.Deferred();P.always(f.resolve.bind(f));return f.promise();});q.when.apply(this,N).done(function(){var g=Array.prototype.slice.call(arguments);d.resolve(g);});}return d.promise();};A.prototype._logTileResolutionFailures=function(f){var m={};if(!f){return;}Object.keys(L).filter(function(s){var d=L[s];return d>=L.FATAL&&d<=L.ALL;}).forEach(function(s){m[L[s]]="";});Object.keys(f).forEach(function(F){var d=f[F];if(d.logLevel){m[d.logLevel]=m[d.logLevel].concat(d.message).concat("\n");}});if(m[L.FATAL]){l.fatal(m[L.FATAL]);}if(m[L.ERROR]){l.error(m[L.ERROR]);}if(m[L.WARNING]){l.warning(m[L.WARNING]);}if(m[L.INFO]){l.info(m[L.INFO]);}if(m[L.DEBUG]){l.debug(m[L.DEBUG]);}if(m[L.TRACE]){l.trace(m[L.TRACE]);}};A.prototype._isValidTitle=function(t){return typeof t==="string"&&t;};A.prototype._isGroupPreset=function(g){return r.isGroupPreset(g);};A.prototype._isGroupLocked=function(g){return r.isGroupLocked(g);};A.prototype.getGroupTitle=function(g){return r.getGroupTitle(g);};A.prototype.getGroupId=function(g){return r.getGroupId(g);};A.prototype.isGroupVisible=function(g){return r.isGroupVisible(g);};A.prototype.getTileTitle=function(t){return r.getTileTitle(this._mResolvedTiles,t);};A.prototype.getTileSubtitle=function(t){return r.getTileSubtitle(this._mResolvedTiles,t);};A.prototype.getTileIcon=function(t){return r.getTileIcon(this._mResolvedTiles,t);};A.prototype.getTileInfo=function(t){return r.getTileInfo(this._mResolvedTiles,t);};A.prototype.getTileIndicatorDataSource=function(t){var d=this._mResolvedTiles[t.id],f={},g;if(t.indicatorDataSource){f.indicatorDataSource=U.clone(t.indicatorDataSource);if(t.dataSource){f.dataSource=U.clone(t.dataSource);}return f;}if(!d){return f;}g=d.tileResolutionResult;if(g.indicatorDataSource){f.indicatorDataSource=U.clone(g.indicatorDataSource);if(g.indicatorDataSource.hasOwnProperty("dataSource")){var s=g.indicatorDataSource.dataSource,h=g.dataSources;if(h&&h.hasOwnProperty(s)){f.dataSource=U.clone(h[s]);}else{q.sap.log.warning("datasource referenced but not found for tile: "+d.tileIntent);}}if(U.getMember(g,"runtimeInformation.componentProperties.url")){var p=U.getMember(f,"indicatorDataSource.path");var j=U.getMember(f,"dataSource.uri");var k=U.getMember(g,"runtimeInformation.componentProperties.url");var T=u(p,j,k,this.getWindowLocationHref());if(!T.error){if(p){f.indicatorDataSource.path=T.uri;}if(j){f.dataSource.uri=T.uriParent;}}}}return f;};A.prototype.getWindowLocationHref=function(){return window.location.href;};A.prototype.isGroupRemovable=function(g){return!this._isGroupPreset(g);};A.prototype.isGroupLocked=function(g){return this._isGroupLocked(g);};A.prototype.getGroupTiles=function(g){return r.getGroupTiles(g).concat(r.getGroupLinks(g));};A.prototype.getTileType=function(I){if(r.isLink(this._mResolvedTiles,I)){return this.TileType.Link;}if(r.isCard(this._mResolvedTiles,I)){return this.TileType.Card;}return this.TileType.Tile;};A.prototype.getTileId=function(t){return r.getTileId(t);};A.prototype.getTileSize=function(t){return r.getTileSize(this._mResolvedTiles,t)||"1x1";};A.prototype.getTileTarget=function(t){var T=r.getTileId(t),d=this._mResolvedTiles[T];if(t.target&&t.target.url){return t.target.url;}if(d){return d.tileIntent;}q.sap.log.warning("Could not find a target for Tile with id '"+T+"'","sap.ushell.adapters.cdm.LaunchPageAdapter");return"";};A.prototype.isTileIntentSupported=function(t){return(this._mFailedResolvedTiles[t.id]===undefined);};A.prototype.setTileVisible=function(t,N){var d=this._mResolvedTiles[t.id];if(d){if(d.tileComponent){this._notifyTileAboutVisibility(d.tileComponent,N,d.visibility);}d.visibility=N;}};A.prototype.getCardManifest=function(g){var d,f=this._mResolvedTiles[g.id];d=f.tileResolutionResult;return d.tileComponentLoadInfo;};A.prototype._getTileUiComponentContainerSync=function(t,d,I){var f=this,g,T,N,h,j={};if(I===true){T=f._createTileComponentData(t,true,d);}else{T=f._createTileComponentData(t,false,d);}g=d.tileResolutionResult;if(d.isLink){N=g.navigationMode;return f._createLinkInstance(t,I,N,G,o);}if(typeof g.tileComponentLoadInfo==="object"&&g.tileComponentLoadInfo!==null){j=g.tileComponentLoadInfo.componentProperties||{};j.name=g.tileComponentLoadInfo.componentName;}j.componentData=T;if(j.manifest){j.componentData.properties=j.componentData.properties||{};j.componentData.properties.manifest=j.manifest;}if(j.name){j.async=false;var k;try{h=sap.ui.component(j);}catch(E){q.sap.log.error(E.message+"\n-- An error occurred while instantiating "+"the tile component for "+j.name,E.stack?E.stack:"","sap.ushell.adapters.cdm.LaunchPageAdapter");return null;}k=new sap.ui.core.ComponentContainer({component:h,height:"100%"});if(!I){f._mResolvedTiles[t.id].tileComponent=h;}return k;}return null;};A.prototype._getTileUiComponentContainer=function(t,d,I){var f=this,g,T,N,h,j,k,m=new q.Deferred();if(d.tileResolutionResult.isPlatformVisualization){sap.ushell.Container.getService("VisualizationDataProvider").getVisualizationView(t.vizId).then(function(w){m.resolve(w);},function(w){m.reject(w);});return m.promise();}var p=sap.ushell.Container.getService("Ui5ComponentLoader");if(I===true){T=f._createTileComponentData(t,true,d);}else{T=f._createTileComponentData(t,false,d);}g=d.tileResolutionResult;if(d.isLink){N=g.navigationMode;m.resolve(f._createLinkInstance(t,I,N,G,o));return m.promise();}var s=this._createTileComponentProperties(T,g.tileComponentLoadInfo);if(!s.name){return m.reject("Cannot find name of tile component for tile with id: '"+t.id+"'").promise();}if(s.manifest){T.properties=T.properties||{};T.properties.manifest=s.manifest;}k=this._isCustomTileComponent(s.name);var v=function(w){var d;h=w.componentHandle.getInstance();j=new C({component:h,height:"100%"});if(!I){d=f._mResolvedTiles[t.id];d.tileComponent=h;if(typeof d.visibility==="boolean"){f._notifyTileAboutVisibility(h,d.visibility);}}return j;};var _=function(){return p.createComponent({loadCoreExt:k,loadDefaultDependencies:false,componentData:T,url:s.url,applicationConfiguration:{},reservedParameters:{},applicationDependencies:s,ui5ComponentName:s.name},{},[]).then(v);};if(k){e.once("CoreResourcesComplementLoaded").do(function(){_().then(function(j){m.resolve(j);}).fail(function(E){m.reject(E);});});}else{_().then(function(j){m.resolve(j);}).fail(function(E){m.reject(E);});}return m.promise();};A.prototype._createTileComponentProperties=function(t,T){var d={};if(!T){return d;}if(c(T)){if(t.properties.indicatorDataSource&&t.properties.indicatorDataSource.path){d.name=D;}else{d.name=S;}}else{d=T.componentProperties||{};d.name=T.componentName;}return d;};A.prototype.getTileView=function(g){var t=this;return new q.Deferred(function(d){return t._getTileView(g,false).then(function(T){d.resolve(T);},function(s){var E="Tile with ID '"+g.id+"' could not be initialized"+(s?":\n"+s:".");q.sap.log.error(E,null,g.tileType);d.reject(E);});}).promise();};A.prototype._getTileView=function(g){var d,E,f=new q.Deferred();if(typeof g!=="object"||!g.id){E="Invalid input parameter passed to _getTileView: "+g;q.sap.log.error(E);return f.reject(E).promise();}d=this._mResolvedTiles[g.id];if(!d){E="No resolved tile found for tile ID: "+g.id;q.sap.log.error(E);return f.reject(E).promise();}return this._getTileUiComponentContainer(g,d,false);};A.prototype._createTileComponentData=function(t,I,d){var T=I?this.getCatalogTileTitle(t):this.getTileTitle(t),s=I?this.getCatalogTilePreviewSubtitle(t):this.getTileSubtitle(t),f=I?this.getCatalogTilePreviewIcon(t):this.getTileIcon(t),g=I?this.getCatalogTilePreviewInfo(t):this.getTileInfo(t),h=I?this.getCatalogTileTargetURL(t):this.getTileTarget(t),j=this.getTileIndicatorDataSource(t),k={properties:{},startupParameters:{}};if(d.tileResolutionResult.isCustomTile===true&&d.tileResolutionResult.startupParameters){k.startupParameters=d.tileResolutionResult.startupParameters;}if(T){k.properties.title=T;}if(g){k.properties.info=g;}if(s){k.properties.subtitle=s;}if(f){k.properties.icon=f;}if(h){k.properties.targetURL=h;}if(j.indicatorDataSource){k.properties.indicatorDataSource=j.indicatorDataSource;if(j.dataSource){k.properties.dataSource=j.dataSource;}}if(d.tileResolutionResult){k.properties.navigationMode=d.tileResolutionResult.navigationMode;}return k;};A.prototype._isGroupTile=function(t){return r.isGroupTile(t);};A.prototype._isCatalogTile=function(t){return!!(t&&t.isCatalogTile);};A.prototype._isFailedGroupTile=function(t){return!!(t&&this._mFailedResolvedTiles&&this._mFailedResolvedTiles[r.getTileId(t)]);};A.prototype.getCatalogTileId=function(g){if(this._isGroupTile(g)){if(this._isFailedGroupTile(g)){return undefined;}if(g.isBookmark&&O.get("target.url",g)){return g.target.url;}return g.vizId||(g.target&&g.target.url);}if(this._isCatalogTile(g)){return g.id;}return undefined;};A.prototype.getCatalogTilePreviewTitle=function(g){if(this._isGroupTile(g)){return this.getTileTitle(g);}return(g.tileResolutionResult&&g.tileResolutionResult.title)||"";};A.prototype.getCatalogTileTargetURL=function(g){if(!g){throw new Error("The given tile is falsy");}if(this._isCatalogTile(g)){if(g.tileResolutionResult&&g.tileResolutionResult.isCustomTile){if(!g.tileResolutionResult.targetOutbound){return"";}return this._toHashFromOutbound(g.tileResolutionResult.targetOutbound);}return g.tileIntent||"";}return this.getTileTarget(g);};A.prototype.isGroupFeatured=function(g){return!!g.isFeatured;};A.prototype._getMember=function(d,s){return U.getMember(d,s);};A.prototype.getCdmVersionsSupported=function(){return{"min":V("3.0.0"),"max":V("3.1.0")};};A.prototype.isSiteSupported=function(s){if(!s._version||V(s._version).compareTo(this.getCdmVersionsSupported().min)<0||V(s._version).compareTo(this.getCdmVersionsSupported().max)>0){q.sap.log.fatal("Invalid CDM site version: Only version 3.0.0 is supported");return false;}return true;};A.prototype._isCustomTileComponent=function(s){return!(s===S||s===D);};return A;},true);
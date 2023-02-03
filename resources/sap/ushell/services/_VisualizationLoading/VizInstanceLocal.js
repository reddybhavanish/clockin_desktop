// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/_VisualizationLoading/VizInstance","sap/ushell/resources","sap/ui/model/resource/ResourceModel","sap/m/GenericTile","sap/m/ImageContent","sap/m/TileContent","sap/m/NumericContent","sap/m/library","sap/ui/core/ComponentContainer","sap/ui/thirdparty/datajs","sap/ui/core/library","sap/ushell/Config","sap/ushell/services/AppType","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/restricted/_uniq"],function(V,r,R,G,I,T,N,m,C,O,c,a,A,L,b,_){"use strict";this.translationBundle=r.i18n;this.TileType={Tile:"tile",Link:"link",Card:"card"};var v=V.extend("sap.ushell.ui.launchpad.VizInstanceLocal",{metadata:{library:"sap.ushell",properties:{dataSource:{type:"object",defaultValue:{serviceRefreshInterval:10000}}}},renderer:V.getMetadata().getRenderer()});v.prototype.setActive=function(d){if(this.getType()!=="sap.ushell.ui.tile.DynamicTile"||this.getDataSource().serviceUrl){return;}if(this.intervalTimer){window.clearInterval(this.intervalTimer);this.intervalTimer=undefined;}if(d){var s=this.getDataSource().serviceRefreshInterval;if(s){s=s*1000;}else{s=10000;}this.intervalTimer=window.setInterval(function(){O.read(this.getDataSource().serviceUrl+"?id="+this.getId()+"&t="+new Date().getTime(),function(){L.debug("Dynamic tile service call succeed for tile "+this.getId());},function(M){L.debug("Dynamic tile service call failed for tile "+this.getId()+", error message:"+M);});},s).bind(this);}};v.prototype.refresh=function(){};v.prototype._translateTileProperties=function(d){};v.prototype._registerModulePath=function(d){var p={};p[d.namespace.replace(/\./g,"/")]=d.path||".";sap.ui.loader.config({paths:p});};v.prototype._getView=function(d){var E="unknown error",t,s;var i=false;var o=d||this.getCatalogTile();if(o.isLink){i=true;}this._setInitData(o);this._translateTileProperties(o);if(o.namespace&&o.path&&o.moduleType){this._registerModulePath(o);if(o.moduleType==="UIComponent"){t=new C({component:sap.ui.getCore().createComponent({componentData:{properties:o.properties},name:o.moduleName}),height:"100%",width:"100%"});}else{t=sap.ui.view({viewName:o.moduleName,type:c.mvc.ViewType[o.moduleType],viewData:{properties:o.properties},height:"100%"});}return Promise.resolve(t);}else if(o.tileType){s=i?"Link":o.tileType;if(s){var u=this.getTargetURL();try{if(u){this.oInnerControl=this._createTileInstance(o,s);}else{this.oInnerControl=this._createTileInstance(o,s);}this._handleTilePress();this._applyDynamicTileIfoState();return this.oInnerControl;}catch(e){return Promise.resolve(new G({header:e&&(e.name+": "+e.message)||this.translationBundle.getText("failedTileCreationMsg"),frameType:this._parseTileSizeToGenericTileFormat(o)}));}}else{E="TileType: "+this.getType()+" not found!";}}else{E="No TileType defined!";}return Promise.resolve(new G({header:E,frameType:this._parseTileSizeToGenericTileFormat(o)}));};v.prototype._setInitData=function(d){this.setTitle(d.properties.title);this.setSubtitle(d.properties.subtitle);this.setFooter(d.properties.info);this.setIcon(d.properties.icon);if(d.properties.size==="1x2"){this.setHeight(1);this.setWidth(2);}else{this.setHeight(1);this.setWidth(1);}var D={refreshInterval:10000};if(d.properties.serviceRefreshInterval){D.refreshInterval=d.properties.serviceRefreshInterval;}if(d.properties.serviceUrl){D.serviceUrl=d.properties.serviceUrl;}this.setDataSource(D);this.setTargetURL(d.properties.targetURL||d.properties.href);this.setType(d.tileType);var k=_([d.title,d.properties&&d.properties.subtitle,d.properties&&d.properties.info].concat(d.keywords||[]));this.setKeywords(k.filter(function(n){return n!==""&&n;}));};v.prototype._createTileInstance=function(d){var t,o=new I({src:d.properties.icon});o.addStyleClass("sapUshellFullWidth");switch(d.tileType){case"sap.ushell.ui.tile.DynamicTile":t=new G({header:d.properties.title,subheader:d.properties.subtitle,frameType:this._parseTileSizeToGenericTileFormat(d),tileContent:new T({frameType:this._parseTileSizeToGenericTileFormat(d),footer:d.properties.info,unit:d.properties.numberUnit,content:new N({scale:d.properties.numberFactor,value:d.properties.numberValue,truncateValueTo:5,indicator:d.properties.stateArrow,valueColor:this._parseTileValueColor(d.properties.numberState),icon:d.properties.icon,width:"100%"})}),press:this._genericTilePressHandler.bind(this)});break;case"sap.ushell.ui.tile.StaticTile":t=new G({mode:d.mode||(d.properties.icon?m.GenericTileMode.ContentMode:m.GenericTileMode.HeaderMode),header:d.properties.title,subheader:d.properties.subtitle,frameType:this._parseTileSizeToGenericTileFormat(d),tileContent:new T({frameType:this._parseTileSizeToGenericTileFormat(d),footer:d.properties.info,content:o}),press:this._genericTilePressHandler.bind(this)});break;case"Link":t=new G({mode:m.GenericTileMode.LineMode,subheader:d.properties.subtitle,header:d.properties.title,press:function(e){this._genericTilePressHandler(e);}.bind(this)});break;default:var n=d.tileType.replace(/\./g,"/");sap.ui.require([n],function(){var e=b.get(d.tileType);t=new e(d.properties||{});});}return Promise.resolve(t);};v.prototype._parseTileValueColor=function(t){var d=t;switch(t){case"Positive":d="Good";break;case"Negative":d="Critical";break;}return d;};v.prototype._parseTileSizeToGenericTileFormat=function(d){return(d.properties.size==="1x2")?"TwoByOne":"OneByOne";};v.prototype._handleTilePress=function(){if(typeof this.oInnerControl.attachPress==="function"){this.oInnerControl.attachPress(function(){if(typeof this.oInnerControl.getTargetURL==="function"){var t=this.oInnerControl.getTargetURL();if(t){if(t[0]==="#"){hasher.setHash(t);}else{window.open(t,"_blank");}}}}.bind(this));}};v.prototype._applyDynamicTileIfoState=function(){var o=this.oInnerControl.onAfterRendering;this.oInnerControl.onAfterRendering=function(){if(o){o.apply(this,arguments);}var M=this.getModel(),d,e,f;if(!M){return;}d=M.getProperty("/data/display_info_state");e=this.getDomRef();f=e.getElementsByClassName("sapMTileCntFtrTxt")[0];switch(d){case"Negative":f.classList.add("sapUshellTileFooterInfoNegative");break;case"Neutral":f.classList.add("sapUshellTileFooterInfoNeutral");break;case"Positive":f.classList.add("sapUshellTileFooterInfoPositive");break;case"Critical":f.classList.add("sapUshellTileFooterInfoCritical");break;default:return;}};};v.prototype._genericTilePressHandler=function(e){if(e.getSource().getScope&&e.getSource().getScope()==="Display"){var t=this.getTargetURL();if(t){if(t[0]==="#"){hasher.setHash(t);}else{var l=a.last("/core/shell/enableRecentActivity")&&a.last("/core/shell/enableRecentActivityLogging");if(l){var o={title:this.getTitle(),appType:A.URL,url:t,appId:t};sap.ushell.Container.getRenderer("fiori2").logRecentActivity(o);}window.open(t,"_blank");}}}};v.prototype._setVizViewControlPromise=function(d){if(d){this.oControlPromise=this._getView(d);}else{this.oControlPromise=this._getView();}};return v;});

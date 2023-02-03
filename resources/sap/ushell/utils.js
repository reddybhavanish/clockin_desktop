// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/UriParameters","sap/base/util/uid","sap/base/util/ObjectPath","sap/ui/core/theming/Parameters","sap/ui/thirdparty/URI","sap/ushell/utils/clone","sap/ushell/utils/type","sap/ushell/utils/objectOperations","sap/ui/Device"],function(U,u,O,P,b,c,t,o,D){"use strict";var d={};d.isArray=t.isArray;d.isPlainObject=t.isPlainObject;d.isDefined=t.isDefined;d.clone=c;d.getMember=o.getMember;d.updateProperties=o.updateProperties;d.getNestedObjectProperty=o.getNestedObjectProperty;d.removeDuplicatedActions=function(a){if(jQuery.isArray(a)){var f=a.reduce(function(r,i){if(r.indexOf(i)<0){r.push(i);}return r;},[]);return f;}return a;};d.storeSapSystemData=function(s,S){var k,l,a,f=[s.id];if(arguments.length>1){f.unshift(S);}try{a=JSON.stringify(s);}catch(e){jQuery.sap.log.error("Cannot stringify and store expanded system data: "+e);}if(a){l=d.getLocalStorage();k=d.generateLocalStorageKey("sap-system-data",f);l.setItem(k,a);}};d.getLocalSystemInSidFormat=function(){var s=sap.ushell.Container.getLogonSystem(),S=s.getName(),a=s.getClient();return"sid("+S+"."+a+")";};d.matchesLocalSid=function(s){return d.getLocalSystemInSidFormat().toLowerCase()===s.toLowerCase();};d.storeSapSystemToLocalStorage=function(a){var p=(a||{}).params;if(!p||!p.hasOwnProperty("sap-system")){return;}if(d.isPlainObject(p["sap-system"])){var s=p["sap-system"],S=p["sap-system-src"];if(typeof S==="string"){d.storeSapSystemData(s,S);p["sap-system-src"]=S;}else{d.storeSapSystemData(s);}p["sap-system"]=s.id;}else if(d.matchesLocalSid(p["sap-system"])){delete p["sap-system"];}};d.setPerformanceMark=function(m,C){if(performance&&performance.mark){if(!C){C={};}if(C.bUseUniqueMark){if(C.bUseLastMark){performance.clearMarks(m);}else if(performance.getEntriesByName(m,"mark").length!=0){return;}}performance.mark(m);}};d.setPerformanceMeasure=function(m,s,e){if(performance&&performance.measure&&s&&e){performance.measure(m,s,e);}};d.addTime=function(i,I,e){if(!window["sap-ushell-startTime"]){window["sap-ushell-startTime"]=Date.now();}var s=window["sap-ushell-startTime"];e=e||Date.now();if(e<s){e=s+1;}jQuery.sap.measure.add("sap.ushell.fromStart."+i,I,s,e,e-s,e-s);};d.Error=function(m,C){this.name="sap.ushell.utils.Error";this.message=m;jQuery.sap.log.error(m,null,C);};d.Error.prototype=new Error();d.localStorageSetItem=function(k,v,l){var E;try{localStorage.setItem(k,v);if(l){E=document.createEvent("StorageEvent");E.initStorageEvent("storage",false,false,k,"",v,"",localStorage);dispatchEvent(E);}}catch(e){jQuery.sap.log.warning("Error calling localStorage.setItem(): "+e,null,"sap.ushell.utils");}};d.getLocalStorage=function(){return window.localStorage;};d.getLocalStorageItem=function(k){return window.localStorage.getItem(k);};d.generateUniqueId=function(T){var s,e,i;if(jQuery.isArray(T)){e=T;i=function(g){return e.indexOf(g)===-1;};}else{i=T;}do{s=d._getUid();}while(!i(s));return s;};d._getUid=function(){return u();};d.reload=function(){location.reload();};d.calculateOrigin=function(a){var e;if(a.origin){return a.origin;}if(a.protocol&&a.hostname){return a.protocol+"//"+a.hostname+(a.port?":"+a.port:"");}if(a.href){e=new b(a.href);return e.protocol()+"://"+e.hostname()+(e.port()?":"+e.port():"");}};d.getPrivateEpcm=function(){if(window.external&&window.external&&typeof window.external.getPrivateEpcm!=="undefined"){return window.external.getPrivateEpcm();}return undefined;};d.hasNativeNavigationCapability=function(){return d.isFeatureBitEnabled(1);};d.hasNativeLogoutCapability=function(){return d.isFeatureBitEnabled(2);};d.hasNavigationModeCapability=function(){return d.isFeatureBitEnabled(4);};d.hasFLPReadyNotificationCapability=function(){return d.isFeatureBitEnabled(8);};d.hasFLPReady2NotificationCapability=function(){return d.isFeatureBitEnabled(16);};d.isFeatureBitEnabled=function(f){var F="0",p;p=d.getPrivateEpcm();if(p){try{F=p.getNwbcFeatureBits();jQuery.sap.log.debug("Detected epcm getNwbcFeatureBits returned feature bits: "+F);}catch(e){jQuery.sap.log.error("failed to get feature bit vector via call getNwbcFeatureBits on private epcm object",e.stack,"sap.ushell.utils");}}return(parseInt(F,16)&f)>0;};d.isApplicationTypeEmbeddedInIframe=function(a){return a==="NWBC"||a==="TR"||a==="WCF";};d.appendUserIdToUrl=function(p,s){var a=sap.ushell.Container.getService("UserInfo").getUser().getId(),S=s.indexOf("?")>=0?"&":"?";return s+S+p+"="+a;};d.appendSapShellParam=function(s,a){var e=a==="TR"?"":"-NWBC",v=d.getUi5Version();if(v){s+=s.indexOf("?")>=0?"&":"?";s+="sap-shell="+encodeURIComponent("FLP"+v+e);}return s;};d.getUi5Version=function(){var v,m;try{v=sap.ui.getVersionInfo().version;}catch(e){jQuery.sap.log.error("sap ui version could not be determined, using sap.ui.version (core version) as fallback "+e);v=window.sap&&sap.ui&&sap.ui.version;}m=/\d+\.\d+\.\d+/.exec(v);if(m&&m[0]){v=m[0];}else{v=undefined;}return v;};d.isNativeWebGuiNavigation=function(r){var a=O.get("applicationType",r);var n=O.get("appCapabilities.nativeNWBCNavigation",r);if(this.hasNativeNavigationCapability()&&(a==="TR"||n)){return true;}return false;};d.Map=function(){this.entries={};};d.Map.prototype.put=function(k,v){var a=this.get(k);this.entries[k]=v;return a;};d.Map.prototype.containsKey=function(k){if(typeof k!=="string"){throw new d.Error("Not a string key: "+k,"sap.ushell.utils.Map");}return Object.prototype.hasOwnProperty.call(this.entries,k);};d.Map.prototype.get=function(k){if(this.containsKey(k)){return this.entries[k];}};d.Map.prototype.keys=function(){return Object.keys(this.entries);};d.Map.prototype.remove=function(k){delete this.entries[k];};d.Map.prototype.toString=function(){var r=["sap.ushell.utils.Map("];r.push(JSON.stringify(this.entries));r.push(")");return r.join("");};d.getParameterValueBoolean=function(p,s){var a=U.fromQuery(s||window.location.search),A=a.getAll(p),T=["true","x"],f=["false",""],v;if(!A||A.length===0){return undefined;}v=A[0].toLowerCase();if(T.indexOf(v)>=0){return true;}if(f.indexOf(v)>=0){return false;}return undefined;};d.call=function(s,f,a){var m;if(a){setTimeout(function(){d.call(s,f,false);},0);return;}try{s();}catch(e){m=e.message||e.toString();jQuery.sap.log.error("Call to success handler failed: "+m,e.stack,"sap.ushell.utils");if(f){f(m);}}};d.handleTilesVisibility=function(){d.getVisibleTiles();};d.refreshTiles=function(){sap.ui.getCore().getEventBus().publish("launchpad","refreshTiles");};d.setTilesNoVisibility=function(){sap.ui.getCore().getEventBus().publish("launchpad","setTilesNoVisibility");};d.getBasicHash=function(h){if(!d.validHash(h)){jQuery.sap.log.debug("Utils ; getBasicHash ; Got invalid hash");return false;}var a=sap.ushell.Container.getService("URLParsing"),s=a.parseShellHash(h);return s?s.semanticObject+"-"+s.action:h;};d.validHash=function(h){return(h&&h.constructor===String&&jQuery.trim(h)!=="");};d.handleTilesOpacity=function(m){var T,a,e,C=P.get("sapUshellTileBackgroundColor"),r=this.hexToRgb(C),j,f,R,g,s,h,i,p,k,l,n,q=sap.ushell.Container.getService("UserRecents");if(r){R="rgba("+r.r+","+r.g+","+r.b+",{0})";e=q.getAppsUsage();e.done(function(v){T=v.usageMap;j=jQuery(".sapUshellTile").not(".sapUshellTileFooter");var w=m.getProperty("/groups");m.setProperty("/animationRendered",true);for(n=0;n<j.length;n++){g=jQuery(j[n]);s=this.getBasicHash(g.find(".sapUshellTileBase").attr("data-targeturl"));if(s){f=this.convertToRealOpacity(T[s],v.maxUsage);h=R.replace("{0}",f);a=sap.ui.getCore().byId(g.attr("id"));i=a.getBindingContext();p=i.sPath.split("/");k=p[2];l=p[4];w[k].tiles[l].rgba=h;}}m.setProperty("/groups",w);}.bind(this));}};d.convertToRealOpacity=function(a,m){var e=[1,0.95,0.9,0.85,0.8],i=Math.floor(m/e.length),f;if(!a){return e[0];}if(!m){return e[e.length-1];}f=Math.floor((m-a)/i);return f<e.length?e[f]:e[e.length-1];};d.getCurrentHiddenGroupIds=function(m){var l=sap.ushell.Container.getService("LaunchPage"),g=m.getProperty("/groups"),h=[],G,a,e;for(a=0;a<g.length;a++){e=g[a]?g[a].isGroupVisible:true;if(g[a].object){G=l.getGroupId(g[a].object);}if(!e&&G!==undefined){h.push(G);}}return h;};d.hexToRgb=function(h){var i=!h||h[0]!="#"||(h.length!=4&&h.length!=7),r;h=!i&&h.length===4?"#"+h[1]+h[1]+h[2]+h[2]+h[3]+h[3]:h;r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null;};d.getFormFactor=function(){var s=sap.ui.Device.system;if(s.desktop){return s.SYSTEMTYPE.DESKTOP;}if(s.tablet){return s.SYSTEMTYPE.TABLET;}if(s.phone){return s.SYSTEMTYPE.PHONE;}};d.getVisibleTiles=function(){var n=document.body.clientHeight,C=sap.ui.getCore().byId("dashboardGroups"),N=sap.ui.getCore().byId("viewPortContainer"),g,a,e,f,h,i,T,j,k,l,m,s=jQuery("#shell-hdr").height(),p=[],G,I,v=[],E=sap.ui.getCore().getEventBus(),q,r,w,x;if(window.document.hidden){E.publish("launchpad","onHiddenTab");}if(C&&C.getGroups()&&N){G=jQuery(C.getDomRef());I=G?G.is(":visible"):false;q=C.getGroups();for(g=0;g<q.length;g=g+1){f=q[g];h=f.getTiles();i=f.getLinks();r=[h,i];for(e=0;e<r.length;e++){w=r[e];if(w){for(a=0;a<w.length;a++){T=w[a];if(!I||window.document.hidden){p.push(T);}else{j=jQuery(T.getDomRef());k=j.offset();if(k){l=j.offset().top;m=l+j.height();x=f.getVisible()&&(m>s-300)&&(l<n+300);if(x){v.push({oTile:d.getTileModel(T),iGroup:g,bIsExtanded:!(m>s)||!(l<n)});}else if(v.length>0){E.publish("launchpad","visibleTilesChanged",v);return p;}p.push(T);}}}}}}}if(v.length>0){E.publish("launchpad","visibleTilesChanged",v);}return p;};d.getTileModel=function(a){var e=a.getBindingContext();return e.getObject()?e.getObject():null;};d.getTileObject=function(a){var e=a.getBindingContext();return e.getObject()?e.getObject().object:null;};d.recalculateBottomSpace=function(){var j=jQuery("#dashboardGroups").find(".sapUshellTileContainer:visible"),l=j.last(),h=jQuery(".sapUshellShellHead > header").height(),a=l.parent().height(),g=parseInt(l.find(".sapUshellContainerTitle").css("margin-top"),10),e=parseInt(jQuery(".sapUshellDashboardGroupsContainer").css("padding-bottom"),10),n;if(j.length===1){n=0;}else{n=jQuery(window).height()-h-a-g-e;n=(n<0)?0:n;}jQuery(".sapUshellDashboardGroupsContainer").css("margin-bottom",n+"px");};d.calcVisibilityModes=function(g,p){var i=true,I=true,l=g.pendingLinks&&g.pendingLinks.length?g.pendingLinks:g.links,h=d.groupHasVisibleTiles(g.tiles,l);if(!h&&(!p||(g.isGroupLocked)||(g.isDefaultGroup)||D.system.phone||(D.system.tablet&&!D.system.desktop))){i=false;}if(!h&&!p){I=false;}return[i,I];};d.groupHasVisibleTiles=function(g,a){var v=false,e,f,h=!g?[]:g,l=!a?[]:a;h=h.concat(l);if(!h.length){return false;}for(e=0;e<h.length;e=e+1){f=h[e];if(f.isTileIntentSupported){v=true;break;}}return v;};d.invokeUnfoldingArrayArguments=function(f,A){var e=this,g,h,p,r,i;if(!jQuery.isArray(A[0])){return f.apply(this,A);}g=A[0];if(g.length===0){return new jQuery.Deferred().resolve([]).promise();}h=new jQuery.Deferred();p=[];r=[];i=new jQuery.Deferred().resolve();g.forEach(function(n,I){if(!jQuery.isArray(n)){jQuery.sap.log.error("Expected Array as nTh Argument of multivalue invokation: first Argument must be array of array of arguments: single valued f(p1,p2), f(p1_2,p2_2), f(p1_3,p2_3) : multivalued : f([[p1,p2],[p1_2,p2_2],[p1_3,p2_3]]");throw new Error("Expected Array as nTh Argument of multivalue invokation: first Argument must be array of array of arguments: single valued f(p1,p2), f(p1_2,p2_2), f(p1_3,p2_3) : multivalued : f([[p1,p2],[p1_2,p2_2],[p1_3,p2_3]]");}var j=f.apply(e,n),k=new jQuery.Deferred();j.done(function(){var a=Array.prototype.slice.call(arguments);r[I]=a;k.resolve();}).fail(k.reject.bind(k));p.push(k.promise());i=jQuery.when(i,k);});jQuery.when.apply(jQuery,p).done(function(){h.resolve(r);}).fail(function(){h.reject("failure");});return h.promise();};d.isClientSideNavTargetResolutionEnabled=function(){var a=true,l;if(jQuery.sap.storage===undefined){l=window.localStorage.getItem("targetresolution-client");l=!(l===false||l==="false"||l==="");}else{l=jQuery.sap.storage(jQuery.sap.getObject("jQuery.sap.storage.Type.local"),"targetresolution").get("client");}if(l===""||l===false||d.getParameterValueBoolean("sap-ushell-nav-cs")===false){return false;}return a;};d._getCurrentDate=function(){return new Date();};d._convertToUTC=function(a){return Date.UTC(a.getUTCFullYear(),a.getUTCMonth(),a.getUTCDate(),a.getUTCHours(),a.getUTCMinutes(),a.getUTCSeconds(),a.getUTCMilliseconds());};d.formatDate=function(C){var i,n,T,a,h,m;i=d._convertToUTC(new Date(C));n=d._convertToUTC(d._getCurrentDate());T=n-i;a=parseInt(T/(1000*60*60*24),10);if(a>0){if(a===1){return sap.ushell.resources.i18n.getText("time_day",a);}return sap.ushell.resources.i18n.getText("time_days",a);}h=parseInt(T/(1000*60*60),10);if(h>0){if(h===1){return sap.ushell.resources.i18n.getText("time_hour",h);}return sap.ushell.resources.i18n.getText("time_hours",h);}m=parseInt(T/(1000*60),10);if(m>0){if(m===1){return sap.ushell.resources.i18n.getText("time_minute",m);}return sap.ushell.resources.i18n.getText("time_minutes",m);}return sap.ushell.resources.i18n.getText("just_now");};d.toExternalWithParameters=function(s,a,p){var C=sap.ushell.Container.getService("CrossApplicationNavigation"),T={},e={},i,f,g;T.target={semanticObject:s,action:a};if(p&&p.length>0){e={};for(i=0;i<p.length;i++){f=p[i].Key;g=p[i].Value;e[f]=g;}T.params=e;}C.toExternal(T);};d.moveElementInsideOfArray=function(a,n,e){if(!d.isArray(a)||n===undefined||e===undefined){throw"Incorrect input parameters passed";}if(n>=a.length||e>=a.length||e<0||n<0){throw"Index out of bounds";}var E=a.splice(n,1)[0];a.splice(e,0,E);return a;};d.shallowMergeObject=function(T){return Array.prototype.slice.call(arguments,1,arguments.length).map(function(s){return{sourceObject:s,properties:Object.keys(s)};}).reduce(function(r,s){s.properties.forEach(function(p){r[p]=s.sourceObject[p];});return r;},T);};d.getLocationHref=function(){return window.location.href;};d.generateLocalStorageKey=function(p,i){var n=i.length;if(n===0){throw new Error("At least one id should be provided when generating the local storage key");}var s="$";if(n===2){s="#";}else if(n>2){s="@"+n+"@";}return p+s+i.join(":");};d.urlParametersToString=function(p,e,f){var g,a,k,i,l,s="";e=e||"&";f=f||"=";g="";a=null;l=[];for(a in p){if(p.hasOwnProperty(a)){l.push(a);}}l.sort();for(k=0;k<l.length;k=k+1){a=l[k];if(jQuery.isArray(p[a])){for(i=0;i<p[a].length;i=i+1){s+=g+encodeURIComponent(a)+f+encodeURIComponent(p[a][i]);g=e;}}else{s+=g+encodeURIComponent(a)+f+encodeURIComponent(p[a]);g=e;}}return s;};return d;},true);

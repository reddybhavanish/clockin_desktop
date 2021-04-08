// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/AppConfiguration","sap/ushell/utils","sap/ushell/navigationMode","sap/ui/thirdparty/URI","sap/ui/thirdparty/jquery","sap/ui/performance/Measurement","sap/base/util/isPlainObject","sap/base/util/ObjectPath","sap/base/util/UriParameters"],function(b,u,n,U,q,M,c,O,d){"use strict";function N(A,C,p,s){var S=s&&s.config,I=function(){return!!(S&&S.enableClientSideTargetResolution);},r=function(h){var a=I()?this._resolveHashFragmentClientSide(h):A.resolveHashFragment(h);return a;},l,R=[{name:"DefaultAdapter",isApplicable:function(){return true;},resolveHashFragment:r.bind(this)}],o;this._isClientSideTargetResolutionEnabled=I;this._nextResolveHashFragment=function(a,h){var e,f;e=a.pop();if(e.isApplicable(h)){q.sap.log.info("NavTargetResolution: custom resolver "+e.name+" resolves "+h);f=this._nextResolveHashFragment.bind(this,a);return e.resolveHashFragment(h,f);}return this._nextResolveHashFragment(a,h);};this._resolveHashFragmentClientSide=function(h){var H=this._validateHashFragment(h),f;if(!H.success){return new q.Deferred().reject(h+" is not a valid hash fragment").promise();}f=H.hashFragmentWithoutHash;return this._resolveHashFragmentClientSideAndFixApplicationType(f);};this._resolveHashFragmentClientSideAndFixApplicationType=function(f){var D=new q.Deferred();sap.ushell.Container.getService("ClientSideTargetResolution").resolveHashFragment(f).done(function(a){if(a&&a.applicationType==="SAPUI5"){a.applicationType="URL";}D.resolve(a);}).fail(function(){D.reject.apply(D,arguments);});return D.promise();};this._validateHashFragment=function(h){var H="",v={success:false};if(h&&h.charAt(0)!=="#"){throw new u.Error("Hash fragment expected in _validateHashFragment","sap.ushell.services.NavTargetResolution");}H=h.substring(1);if(H){v.success=true;}v.hashFragmentWithoutHash=H;return v;};this.expandCompactHash=function(h){var a=sap.ushell.Container.getService("URLParsing"),P,D=new q.Deferred();P=a.parseShellHash(h);if(P&&P.params&&P.params["sap-intent-param"]){sap.ushell.Container.getService("AppState").getAppState(P.params["sap-intent-param"][0]).done(function(e){var v=e.getData("sap-intent-param"),H=h;if(v){H=sap.ushell.Container.getService("URLShortening").expandParamGivenRetrievalFunction(h,"sap-intent-param",function(){return v;});}D.resolve(H);}).fail(function(){D.resolve(h);});}else{D.resolve(h);}return D.promise();};var w=["NWBC","WDA","TR"];this._adjustResolutionResultForUi5Components=function(a){var m,e;if(typeof a!=="object"){return;}delete a["sap.platform.runtime"];if(a&&a.applicationType&&a.applicationType==="SAPUI5"){a.applicationType="URL";}if(a.applicationType==="URL"){m=/^SAPUI5\.Component=(.*)/.exec(a.additionalInformation);e=m&&m[1];if(e){a.ui5ComponentName=e;}}};this._getSapSystem=function(h,a){var e;if(a&&a["sap-system"]){return a["sap-system"];}if(a&&a.url){e=(new d(a.url)).get("sap-system");if(e){return e;}}if(w.indexOf(a.applicationType)>=0&&h&&h.substring(1)){e=(new d(h.substring(1))).get("sap-system");if(e){return e;}}return undefined;};this.resolveTarget=function(a){var h,e=u.clone(a),D=new q.Deferred();u.addTime("resolveTarget");M.average("sap.ushell.navigation.resolveTarget");u.storeSapSystemToLocalStorage(e);h=sap.ushell.Container.getService("URLParsing").constructShellHash(e);sap.ushell.Container.getService("NavTargetResolution").resolveHashFragment("#"+h).done(function(f){M.end("sap.ushell.navigation.resolveTarget");D.resolve({url:f.url,text:f.text,externalNavigationMode:f.externalNavigationMode});}).fail(function(m){D.reject(m);});return D.promise();};this.resolveHashFragment=function(h){var D=new q.Deferred(),a=/sap-ushell-enc-test=([^&]*)(&.*)?$/,m,e,f,t=this;u.addTime("resolveHashFragment");M.average("sap.ushell.navigation.resolveHashFragment");this.expandCompactHash(h).done(function(H){if(H.indexOf("sap-ushell-enc-test")>=0){m=a.exec(H);if(m){e=m[1];if(e!=="A%20B%2520C"){sap.ushell.Container.getService("Message").error("This navigation is flagged as erroneous because"+" (likely the calling procedure) generated a wrong encoded hash."+" Please track down the encoding error and make sure to use the CrossApplicationNavigation service for navigation.","Navigation encoding wrong");}H=H.replace(/sap-ushell-enc-test=([^&]*)&/,"");H=H.replace(/(&|\?)sap-ushell-enc-test=([^&]*)$/,"");}}var P=t._invokeResolveHashChain(H);if(typeof A.processPostResolution==="function"){P=A.processPostResolution(H,P);}P.done(function(g){t._adjustResolutionResultForUi5Components(g);if(c(g)){if(!g.hasOwnProperty("navigationMode")){g.navigationMode=n.getNavigationMode(g,b.getCurrentApplication());}g.targetNavigationMode=n.getExternalNavigationMode(g.navigationMode);}if(c(g)&&!g.hasOwnProperty("sap-system")){f=t._getSapSystem(h,g);if(f){g["sap-system"]=f;}}M.end("sap.ushell.navigation.resolveHashFragment");D.resolve(g);}).fail(function(g){D.reject(g);});}).fail(function(g){D.reject(g);});return D.promise();};this._invokeResolveHashChain=function(h){var e=R.map(function(a){return a;});return this._nextResolveHashFragment(e,h).done(function(a){o=a;});};this.baseResolveHashFragment=r.bind(this);this._getGetLinksResolver=function(a){var g;if(this._isClientSideTargetResolutionEnabled()){g=this._getLinksClientSide.bind(this);return{resolver:g,warning:undefined,isGetSemanticObjectLinksCall:false};}if(Object.prototype.toString.apply(a.paramsOptions)==="[object Array]"&&a.paramsOptions.length>0){q.sap.log.warning("Parameter options supplied to #getLinks will be ignored because FLP is not configured to use sap.ushell.services.ClientSideTargetResolution for target resolution","provided parameters options: "+JSON.stringify(a.paramsOptions,null,4),"sap.ushell.services.NavTargetResolution");}g=A&&A.getLinks&&A.getLinks.bind(A);if(g){return{resolver:g,warning:undefined,isGetSemanticObjectLinksCall:false};}g=A&&A.getSemanticObjectLinks&&A.getSemanticObjectLinks.bind(A);if(g){return{resolver:g,warning:a.hasOwnProperty("action")?"the action argument was given, however, NavTargetResolutionAdapter does not implement getLinks method. Action will be ignored.":undefined,isGetSemanticObjectLinksCall:true};}return{resolver:undefined,warning:"Cannot determine resolver for getLinks method",isGetSemanticObjectLinksCall:undefined};};this.getLinks=function(a){var t=this,e=a.semanticObject,P=a.params,i=a.ignoreFormFactor,f=a.ui5Component,g=a.appStateKey,h=a.compactIntents,j,H,k=new q.Deferred(),m,v;if(/\?/.test(e)){throw new Error("Parameter must not be part of semantic object");}j=(P===undefined)?undefined:JSON.parse(JSON.stringify(P));if(g){j=j||{};j["sap-xapp-state"]=encodeURIComponent(g);}m=sap.ushell.Container.getService("ShellNavigation");var x=t._getGetLinksResolver(a),y,z;if(x.warning){q.sap.log.warning("A problem occurred while determining the resolver for getLinks",x.warning,"sap.ushell.services.NavTargetResolution");}v=x.resolver;if(v){y=function(E){k.reject(E);};z=function(B){if(h){t._shortenGetSemanticObjectLinksResults(B,f).done(function(D){k.resolve(D);});}else{k.resolve(B);}};if(x.isGetSemanticObjectLinksCall){H={target:{semanticObject:e,action:"dummyAction"},params:j};m.hrefForExternal(H,true,f,true).done(function(B){var D=B.params||j;v(e,D,i).done(z).fail(y);}).fail(function(B){k.reject(B);});}else{v(a).done(z).fail(y);}}else{k.resolve([]);}return k.promise();};this.getDistinctSemanticObjects=function(){if(this._isClientSideTargetResolutionEnabled()){var a=sap.ushell.Container.getService("ClientSideTargetResolution");return a.getDistinctSemanticObjects();}if(A&&A.getDistinctSemanticObjects){return A.getDistinctSemanticObjects.call(A);}q.sap.log.error("Cannot execute getDistinctSemanticObjects method","ClientSideTargetResolution must be enabled or NavTargetResolutionAdapter must implement getDistinctSemanticObjects method","sap.ushell.services.NavTargetResolution");return new q.Deferred().reject("Cannot execute getDistinctSemanticObjects").promise();};this._getLinksClientSide=function(a){var D=new q.Deferred(),e,f=new q.Deferred(),g=sap.ushell.Container.getService("URLParsing");if((a.params||{}).hasOwnProperty("sap-intent-param")){e="#"+a.semanticObject+"-dummyAction?"+g.paramsToString(a.params);this.expandCompactHash(e).done(function(E){f.resolve(g.parseShellHash(E).params);}).fail(D.reject.bind(D));}else{f.resolve(a.params);}f.done(function(){sap.ushell.Container.getService("ClientSideTargetResolution").getLinks(a).done(D.resolve.bind(D)).fail(D.reject.bind(D));});return D.promise();};this._shortenGetSemanticObjectLinksResults=function(g,a){var t=this,e=[],i=0,P=g.length,f=sap.ushell.Container.getService("URLParsing"),h=sap.ushell.Container.getService("ShellNavigation"),D=new q.Deferred();g.forEach(function(j){var k=f.parseShellHash(j.intent),m=h.compactParams(k.params,undefined,a);e.push(m);e[i].done(function(v,x){e[v]={text:j.text,intent:"#"+k.semanticObject+"-"+k.action+"?"+f.paramsToString(x)};}.bind(t,i)).fail(function(v,x){q.sap.log.warning("Cannot shorten GetSemanticObjectLinks result, using expanded form","Failure message: "+x+"; intent had title ''"+j.title+"'' and link ''"+j.intent+"'","sap.ushell.services.NavTargetResolution");e[v]={text:j.text,intent:j.intent};}.bind(t,i)).always(function(){P--;if(P===0){D.resolve(e);}});i++;});return D.promise();};this.isIntentSupported=function(i){var m={},a;if(this._isClientSideTargetResolutionEnabled()){a=sap.ushell.Container.getService("ClientSideTargetResolution");return a.isIntentSupported(i);}if(A.isIntentSupported){return A.isIntentSupported(i);}i.forEach(function(e){m[e]={supported:undefined};});return(new q.Deferred()).resolve(m).promise();};this.isNavigationSupported=function(i){var a=sap.ushell.Container.getService("URLParsing"),D=new q.Deferred(),e=[];e=i.map(function(f){if(typeof f==="string"){return f;}return"#"+a.constructShellHash(f);});this.isIntentSupported(e).done(function(f){var g=e.map(function(h){return f[h]||{supported:false};});D.resolve(g);}).fail(D.reject.bind(D));return D.promise();};this.registerCustomResolver=function(a){if(typeof a.name!=="string"){q.sap.log.error("NavTargetResolution: Custom Resolver must have name {string} member");return false;}if(typeof a.isApplicable!=="function"){q.sap.log.error("NavTargetResolution: Custom Resolver must have isApplicable member");return false;}if(typeof a.resolveHashFragment!=="function"){q.sap.log.error("NavTargetResolution: Custom Resolver must have \"resolveHashFragment\" member");return false;}R.push(a);return true;};if(S&&Array.isArray(S.resolveLocal)){l=S.resolveLocal.map(function(a){return a.linkId;});this.registerCustomResolver({name:"localResolveNavigationResolver",cleanHash:function(h){if(h===""){return"#";}var a=sap.ushell.Container.getService("URLParsing").parseShellHash(h.substring(1));if(!a){return"#";}h="#"+a.semanticObject+"-"+a.action;return h;},_getIndex:function(a){var h=this.cleanHash(a);return l.indexOf(h.substring(1));},isApplicable:function(a){return this._getIndex(a)>=0;},resolveHashFragment:function(h){var D,i=this._getIndex(h),a,e,f,g;D=new q.Deferred();a=JSON.parse(JSON.stringify(S.resolveLocal[i].resolveTo));e=sap.ushell.Container.getService("URLParsing").parseShellHash(h);if(e&&e.params){g=sap.ushell.Container.getService("URLParsing").paramsToString(e.params);if(g){f=a.url.indexOf("?")>=0;a.url=a.url+(f?"&":"?")+g;}}D.resolve(a);return D.promise();}});}this.registerCustomResolver({name:"StandaloneLocalResolver",aElement:undefined,cleanHash:function(h){if(h===""){return undefined;}var a=sap.ushell.Container.getService("URLParsing").parseShellHash(h.substring(1));if(!a){return undefined;}h="#"+a.semanticObject+"-"+a.action;return h;},isRunStandaloneHash:function(h){return typeof h==="string"&&h.indexOf("#Shell-runStandaloneApp")===0;},isApplicable:function(h){h=this.cleanHash(h);if(!h){return false;}return h==="#Test-url"||h==="#Test-local1"||h==="#Test-local2"||h==="#Test-config"||h==="#Test-clear"||this.isRunStandaloneHash(h);},parseUrl:function(a){if(!this.aElement){this.aElement=window.document.createElement("a");}this.aElement.href=a;return this.aElement;},resolveHashFragment:function(h){var D=new q.Deferred(),e=null,t=this,f,P,L,g,i,j,k,m,F=h,v;h=this.cleanHash(h);if(!h){return false;}e={"#Test-config":{applicationType:"URL",url:"/sap/bc/ui5_ui5/ui2/ushell/test-resources/sap/ushell/demoapps/FioriSandboxConfigApp",additionalInformation:"SAPUI5.Component=sap.ushell.demoapps.FioriSandboxConfigApp"},"none":{applicationType:"URL",url:"",additionalInformation:""}};function x(K){if(localStorage){return localStorage[K];}return undefined;}function y(m,K){var f={},a;for(a in m){if(m.hasOwnProperty(a)){if(a!==K){f[a]=m[a];}}}return f;}function z(a){if(u.calculateOrigin(t.parseUrl(a))!==u.calculateOrigin(window.location)){return undefined;}var H=(new U(t.parseUrl(a).href)).normalizePathname().pathname(),J=O.create("runStandaloneAppFolderWhitelist",S),K;if(!J){return undefined;}for(K in J){if(J.hasOwnProperty(K)){if(J[K]){if(K==="*"||H.indexOf((new U(t.parseUrl(K).href)).normalizePathname().pathname())===0){return a;}}}}return undefined;}function B(K){return(new d(window.location.href)).get(K);}function E(a,K){return(a.params&&a.params[K]&&a.params[K][0])||B(K);}function G(K,V){if(localStorage){localStorage[K]=V;}}if(e[h]){f=e[h];}else if(h==="#Test-clear"){G("sap.ushell.#Test-local1",undefined);G("sap.ushell.#Test-local2",undefined);q.sap.log.info("NavTargetResolution: Local storage keys for #Test have been cleared");f=e["#Test-config"];}else if(this.isRunStandaloneHash(h)){L={applicationType:"URL"};P=sap.ushell.Container.getService("URLParsing").parseShellHash(F);g=(E(P,"sap-ushell-SAPUI5.Component")&&"SAPUI5.Component="+E(P,"sap-ushell-SAPUI5.Component"))||(E(P,"sap-ushell-additionalInformation"));v=E(P,"sap-ushell-url")||"";m=y(P.params,"sap-ushell-SAPUI5.Component");m=y(m,"sap-ushell-additionalInformation");m=y(m,"sap-ushell-url");j=sap.ushell.Container.getService("URLParsing").paramsToString(m);k=v.indexOf("?")>=0;if(j){v=v+(k?(((v[v.length-1]!=="&")&&"&")||""):"?")+j;}L.url=z(v);L.additionalInformation=g;f=L;}else if(h==="#Test-local1"||h==="#Test-local2"||h==="#Test-url"){f=x("sap.ushell."+h);if(!f||f==="undefined"){L={applicationType:"URL"};}else{L=JSON.parse(f);}if((window.location.hostname==="localhost")||(S&&S.allowTestUrlComponentConfig)){i="sap-ushell-test-"+h.substring(6);g=B(i+"-additionalInformation");if(g){L.additionalInformation=g;}v=B(i+"-url");if(v){L.url=z(v);}}if(!L.url){q.sap.log.info("NavTargetResolution: No configured app for "+h+" found ( local storage or url params sap-ushell-test-local1-url  sap-ushell-test-local1-additionalInfo  not supplied? ");q.sap.log.info("NavTargetResolution: Defaulting to config app ...\n");D.reject("URL is not resolvable");return D.promise();}L.url=z(L.url);f=L;}if(f.url===undefined){D.reject("URL is not resolvable");return D.promise();}q.sap.log.info("NavTargetResolution: As URL:  http://localhost:8080/sap/bc/ui5_ui5/ui2/ushell/shells/abap/FioriLaunchpad.html?sap-ushell-test-local1-url="+encodeURIComponent((f&&f.url)||"")+"&sap-ushell-test-local1-additionalInformation="+encodeURIComponent((f&&f.additionalInfo)||"")+"#Test-local1");q.sap.log.info("NavTargetResolution: Resolving "+h+" to "+JSON.stringify(f));D.resolve(f);return D.promise();}});this.getCurrentResolution=function(){return o;};}N.hasNoAdapter=false;return N;},true);

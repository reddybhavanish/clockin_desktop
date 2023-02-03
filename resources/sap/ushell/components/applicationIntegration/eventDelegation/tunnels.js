// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery"],function(q){"use strict";function T(){var t=this,r,p={};this.init=function(R){if(!R){throw"1 argument expected, 0 received.";}r=R;};this.createInterface=function(i,c){var R={},s={};R[i]={sInterfaceName:{isActiveOnly:false,distributionType:["URL"]}};s[i]={executeServiceCallFn:function(S){var o=c(S);return new q.Deferred().resolve(o).promise();}};r({"sap.ushell.tunnelRegistry":{oRequestCalls:R,oServiceCalls:s}});};this.createTunnelServiceCallsInfo=function(o){return this.createServiceCallInfo(o);};this.createTunnelServiceCallsInfoForEvents=function(e){return this.createServiceCallInfo(e,this.createEventEntry);};this.createServiceCallInfo=function(R,c){var a={},b,s,P,m,d,e,f,o,E,g;for(var h in R){if(R.hasOwnProperty(h)){s={};P={};o=R[h];if(c){o=c(o);}f=t.createMethodForServiceCall(o);e=t.createServiceCall(f);s[h]=e;a[h]={oServiceCall:s};b=R[h].pair;if(b&&b.sMethod){m=b.sMethod;d=b.sInterface;E=b.fnExtractArguments;e=t.createPairedServiceCall({fnMethod:f,fnExtractArguments:E});P[m]=e;g=[d,m].join('.');p[g]={serviceCall:e,rawMethod:f};}a[h]={oServiceCall:s};}}return a;};this.createServiceCall=function(m){return{executeServiceCallFn:function(s){return new q.Deferred().resolve({endPoint:m}).promise();}};};this.createPairedServiceCall=function(d){var m=d.fnMethod,e=d.fnExtractArguments;return function(s){var a=e(s),b=m.apply(undefined,a);return new q.Deferred().resolve(b).promise();};};this.createMethodForServiceCall=function(o){var i=o.oInterface,f=o.sFuncName,s=o.fnSpy;return function(){if((s&&s.apply(undefined,arguments)||!s)){return i[f].apply(i,arguments);}};};this.createEventEntry=function(e){var o={},i=e.oInterface,f=e.sFuncName,P=e.fnProxy;o[f]=function(){var a=arguments;if(P){a=P.apply(undefined,arguments);}if(arguments&&arguments.length){i[f].apply(i,a);}else{i[f].apply(i);}};return{oInterface:o,sFuncName:f,fnSpy:e.fnSpy};};this.registerTunnels=function(o){if(!r){throw"No 'fnRegisterShellCommunicationHandler'. Use 'init' method.";}var s=t.createTunnelServiceCallsInfo(o);this.createServiceCalls(s);};this.registerEvents=function(e){if(!r){throw"No 'fnRegisterShellCommunicationHandler'. Use 'init' method.";}var s=t.createTunnelServiceCallsInfoForEvents(e);this.createServiceCalls(s);};this.createServiceCalls=function(s){var a="sap.ushell.tunnelRegistry",c={},i,b;c[a]={oServiceCalls:{}};for(i in s){if(s.hasOwnProperty(i)){b=s[i].oServiceCall;q.extend(c[a].oServiceCalls,b);}}r(c);};this.getPairedMethod=function(k){if(p[k]){return p[k].rawMethod;}};this.getPairedServiceCall=function(k){if(p[k]){return p[k].serviceCall;}};}return new T();},true);

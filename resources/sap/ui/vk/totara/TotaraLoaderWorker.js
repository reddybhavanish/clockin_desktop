(function(){"use strict";var m={};["getVersion","initializeConnection","getScene","getMesh","getAnnotation","getMaterial","getGeometry","getImage","getSequence","getTrack","getView","getHighlightStyle"].reverse().forEach(function(n,i){m[n]=i;});var t=new Map();function H(){this._url=null;this._url2=null;this._correlationId=null;this._authorizationToken=null;this._tenantUuidToken=null;this._onResponse=null;this._onError=null;this._requestQueue=[];this._maxActiveRequests=4;this._activeRequestCount=0;}H.prototype.init=function(s,a,b){this._url=s;this._correlationId=b;var d=this;return new Promise(function(e,f){if(a){a(s).then(function(h){d._authorizationToken=h?h.token_type+" "+h.access_token:null;d._tenantUuidToken=h?h.tenant_uuid:null;e({});}).catch(function(h){return f(h);});}else{e({});}});};H.prototype.close=function(){};H.prototype.setCachingURL=function(d){this._url2=d;};H.prototype.send=function(a,b,o){if(!a){return;}this._requestQueue.push({message:(o?this._url2:this._url)+a,context:b,priority:m[b&&b.method]||0,onResponse:o||this._onResponse});if(this._activeRequestCount<this._maxActiveRequests){this._processNextRequest();}};H.prototype._processNextRequest=function(){if(!this._requestQueue.length){return;}this._requestQueue.sort(function(a,b){return a.priority-b.priority;});var d=this._requestQueue.pop();this._activeRequestCount++;var e=this;this._makeRequestPromise(encodeURI(d.message)).then(function(a){if(d.onResponse){d.onResponse(a);}e._activeRequestCount--;e._processNextRequest();}).catch(function(a){if(e._onError){e._onError({errorText:"Could not connect to server: "+e._url,error:a.status,reason:a.message?a.message:a,context:d.context});}e._activeRequestCount--;e._processNextRequest();});};H.prototype._makeRequestPromise=function(a){var b=this;var p=new Promise(function(d,e){var x=new XMLHttpRequest();x.onload=function(){if(this.status>=200&&this.status<300){d(this.response);if(this.getAllResponseHeaders().includes("tile-width")){var f=this.getResponseHeader("tile-width");var h=new RegExp("[^\/]+$");var i=this.responseURL.match(h);t.set(i[0],f);}}else{e({status:this.status,statusText:this.statusText});}};x.onerror=function(){e({status:this.status,statusText:this.statusText});};x.open("GET",a,true);if(b._authorizationToken){x.setRequestHeader("Authorization",b._authorizationToken);}if(b._tenantUuidToken){x.setRequestHeader("X-TenantUuid",b._tenantUuidToken);}x.setRequestHeader("X-CorrelationID",b._correlationId);x.responseType="arraybuffer";x.send();});return p;};function W(){this._url=null;this._webSocket=null;this._onResponse=null;this._onError=null;this._isInitialised=false;this._timerId=0;}W.prototype.init=function(s,a){this._url=s;var b=this;return new Promise(function(d,f){var w=b._webSocket=new WebSocket(s);w.binaryType="arraybuffer";w.onopen=function(){b._isInitialised=true;if(a!=null){a(s).then(function(e){if(e!=null){var h={"token":e.access_token};if(e.tenant_uuid){h.tenantUuid=e.tenant_uuid;}var i=JSON.stringify(h);var j="setStreamingToken"+("["+i.length+"]")+i;w.send(j);}b._keepAlive();d({});}).catch(function(e){return f(e);});}else{b._keepAlive();d({});}};w.onclose=function(){b._cancelKeepAlive();};w.onmessage=function(e){var h=e.data;if(b._onResponse){b._onResponse(h);}};w.onerror=function(e){if(!b._isInitialised){f("error connecting to "+s);}else if(b._onError){b._onError({errorText:e});}};});};W.prototype.close=function(){if(this._webSocket){this._webSocket.close();this._webSocket=null;}};W.prototype._keepAlive=function(){var a=60000;if(this._webSocket===null){this._cancelKeepAlive();return;}if(this._webSocket.readyState===1){this._webSocket.send("");}this._timerId=setTimeout(this._keepAlive,a);};W.prototype._cancelKeepAlive=function(){if(this._timerId){clearTimeout(this._timerId);this._timerId=0;}};W.prototype.send=function(a,b){if(!a){return;}if(this._webSocket&&this._webSocket.readyState===1){try{this._webSocket.send(a);}catch(e){if(this._onError){this._onError({errorText:e,context:b});}}}else if(this._onError){this._onError({errorText:"websocket connection lost",context:b,error:4});}};function g(a){var b=a.split(",");if(b.length<0||b.length>2){throw"invalid content length";}var j=0;var d=0;try{j=parseInt(b[0],10);if(b.length===2){d=parseInt(b[1],10);}}catch(e){throw"invalid content length";}return{jsonContentLength:j,binaryContentLength:d};}function c(a){var b="[".charCodeAt(0);var d="]".charCodeAt(0);var f=[];var s=0;var h=0;var i;var j;var k;var n=new Uint8Array(a);while(h<a.byteLength){h=n.indexOf(b,s);if(h===-1){break;}var o=u(a,s,h).replace(/\n|\r|\s/g,"");s=h+1;h=n.indexOf(d,s);if(h===-1){throw"No matching [] for command length. abort";}i=g(u(a,s,h));s=h+1;h=s+i.jsonContentLength;j=u(a,s,h);try{j=JSON.parse(j);}catch(e){var p=o+": "+e;throw p;}if(i.binaryContentLength){s=h;h=s+i.binaryContentLength;k=a.slice(s,h);}else{k=undefined;}s=h;var q={name:o,jsonContent:j};if(k){q.binaryContent=new Uint8Array(k);}f.push(q);}return f;}function u(a,s,b){var d="";var M=1000;try{while(s<b){var f=Math.min(M,b-s);var h=new Uint8Array(a,s,f);d+=String.fromCharCode.apply(null,h);s+=f;}}catch(e){return"";}return decodeURIComponent(escape(d));}function L(){this.resolveFunctions=[];this.rejectFunctions=[];this.init=function(d,h,e){this._connection=d;this._connectionHTTP=h;this._sceneBuilderId=e;if(!d){throw"no connection provided for loader!";}this._connection._onResponse=function(f){var i=c(f);p(i);};this._connection.send("getVersion[2]{}",{method:"getVersion"});};var a=this;function b(v){a.protocolVersion=v.split(".").map(function(s){return parseInt(s,10);});}function p(d){var e;var s=-1;var v,i;var n=false;var f=false;var h=false;for(i=0;i<d.length;i++){e=d[i];if(e.name==="setView"){if(!e.jsonContent.viewId){n=true;}f=true;}else if(e.name==="setViewNode"){v=e.jsonContent.viewId;}else if(e.name==="setSequence"&&f){h=true;}}if(v&&n){for(i=0;i<d.length;i++){e=d[i];if(e.name==="setView"){e.jsonContent.viewId=v;break;}}}var j=function(e){if(e.binaryContent){self.postMessage({name:e.name,jsonContent:e.jsonContent,binaryContent:e.binaryContent},[e.binaryContent.buffer]);}else{self.postMessage({name:e.name,jsonContent:e.jsonContent});}};for(i=0;i<d.length;i++){e=d[i];if(e.name==="protocol"){b(e.jsonContent.version);}if(e.name==="setPlayback"&&h){s=i;continue;}if(e.name==="setImage"&&t.get(e.jsonContent.id)){e.jsonContent.tileWidth=t.get(e.jsonContent.id);}if(e.name==="setScene"&&d.length>1){continue;}j(e);}if(s!==-1){e=d[s];j(e);}}this.getConnection=function(){return this._connection;};this._sendGetImage=function(d){var e;if(this.protocolVersion&&(this.protocolVersion[0]>1||this.protocolVersion[1]>0)){if(d.materialId){e="scenes/"+d.sceneId+"/materials/"+d.materialId+"/images/"+d.imageId;}else if(d.viewId){e="scenes/"+d.sceneId+"/views/"+d.viewId+"/images/"+d.imageId;}}e=e||("images/"+d.imageId);this._connectionHTTP.send(e,d,function(f){p([{name:"setImage",jsonContent:{sceneId:d.sceneId,id:d.imageId},binaryContent:new Uint8Array(f)}]);});};this._sendGetGeometries=function(d){var e=d.geometryIds;var f="geometry?";for(var i=0;i<e.length;i++){f+=(i>0?"&id=":"id=")+e[i];}this._connectionHTTP.send(f,d,function(h){var j=new DataView(h);var k=j.getUint16(2,true),o=0;var n=[];while(k-->0){var q={sceneId:d.sceneId,id:j.getUint32(o+4,true).toString(),box:[j.getFloat32(o+14,true),j.getFloat32(o+18,true),j.getFloat32(o+22,true),j.getFloat32(o+26,true),j.getFloat32(o+30,true),j.getFloat32(o+34,true)]};var s=j.getUint16(o+12,true);o+=38;if(s!==3){q.flags=j.getUint16(o,true);q.quality=j.getFloat32(o+4,true);q.pointCount=j.getUint16(o+8,true);q.elementCount=j.getUint16(o+10,true);o+=14;}var v=j.getUint32(o,true);var w=new Uint8Array(h,o+4,v);o+=v;n.push({name:"setGeometry",jsonContent:q,binaryContent:w.slice()});}p(n);});};this._sendGetGeomMeshes=function(d){var e="scenes/"+d.sceneId+"/meshes?ids=";var f=d.meshIds;for(var i=0;i<f.length;i++){e+=(i>0?",":"")+f[i];}this._connectionHTTP.send(e,d,function(h){var j=c(h);j.forEach(function(s){s.jsonContent.sceneId=d.sceneId;});p(j);});};this.send=function(d){if(this._connectionHTTP){switch(d.method){case"getImage":this._sendGetImage(d);return;case"getGeometry":this._sendGetGeometries(d);return;case"getMesh":if(d.meshIds){this._sendGetGeomMeshes(d);return;}break;default:break;}}if(this._connection){this._connection.send(d.command,{method:d.method});}};this.setSceneBuilderId=function(i){this._sceneBuilderId=i;};this.getSceneBuilderId=function(){return this._sceneBuilderId;};this.authorizationHandler=function(d){var a=this;return new Promise(function(e,f){var h={name:"getAuthorization",jsonContent:{"url":d},sceneId:a.sceneId};a.resolveFunctions.push(e);a.rejectFunctions.push(f);self.postMessage(h);});}.bind(this);}var l=new L();var r=function(e){self.postMessage({name:"notifyError",jsonContent:e});};self.onmessage=function(e){var d=e.data;switch(d.method){case"initializeConnection":{if(!d.url){break;}if(d.sceneId){l.sceneId=d.sceneId;}var a="";if(d.url[d.url.length-1]!=="/"){d.url+="/";}if(d.url.toLowerCase().startsWith("ws")){a=d.url+"streaming?";}else if(d.url.toLowerCase().startsWith("http")){a=d.url+"streaming-http?request=";}else{a=(d.useSecureConnection?"wss://":"ws://")+d.url+"streaming?";}var b=d.cid;var f=l.getConnection();if(!f||f._url!==a){if(f){f.close();}var h;var i=null;if(d.url.toLowerCase().startsWith("ws")){h=new W();}else if(d.url.toLowerCase().startsWith("http")){h=new H();h.setCachingURL(d.url);}else{h=new W();i=(d.useSecureConnection?"https://":"http://")+d.url;}h._onError=r;h.init(a,l.authorizationHandler,b).then(function(){var n=function(h,o){l.init(h,o,d.sceneBuilderId);if(d.command){l.send(d);}};if(i){var o=new H();o.setCachingURL(i);o.init(i,l.authorizationHandler,b).then(function(){n(h,o);}).catch(function(p){r(p);});}else{n(h,h instanceof H?h:null);}}).catch(function(n){r(n);});}else if(d.command){l.send(d);}break;}case"setAuthorization":{var j=l.resolveFunctions.shift();var k=l.rejectFunctions.shift();if(d.error==null){j(d.authorizationToken);}else{k(d.error);}break;}case"close":{self.close();break;}default:{if(d.command){l.send(d);}break;}}};self.postMessage({ready:true});})();

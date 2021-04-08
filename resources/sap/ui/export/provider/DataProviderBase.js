/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
(function(c){'use strict';if(typeof sap!=="undefined"&&typeof sap.ui.define==='function'){sap.ui.define([],c,true);}else{var C;if(typeof window!=="undefined"){C=window;}else if(typeof self!=="undefined"){C=self;}else{C=this;}C.DataProviderBase=c();}})(function(){'use strict';var D=function(s){this.mSettings=s;this.bCanceled=false;this.iAvailableRows=0;this.mRequest=null;this.iTotalRows=Math.min(s.dataSource.count||D.MAX_ROWS,D.MAX_ROWS);this.iBatchSize=Math.min(s.dataSource.sizeLimit||D.MAX_ROWS,this.iTotalRows);this._prepareDataUrl();};D.MAX_ROWS=1048575;D.HTTP_ERROR_MSG='HTTP connection error';D.HTTP_WRONG_RESPONSE_MSG='Unexpected server response:\n';D._createGuid=function(){return'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c==='x'?r:((r&0x3)|0x8);return v.toString(16);});};D.getColumnsToConvert=function(s){return s.workbook.columns.reduce(function(r,c){var p;p=c.property instanceof Array?c.property:[c.property];if(c.unitProperty){p.push(c.unitProperty);}p.forEach(function(a){var k=a.split('/');if(k.length>1){r.push({property:a,keys:k,type:c.type});}});return r;},[]);};D.getDataConverter=function(s){var c=this.getColumnsToConvert(s);return function(r){return D._convertData(r,c);};};D._convertData=function(r,c){c.forEach(function(a){r.forEach(function(b){b[a.property]=D._getValue(b,a);});});return r;};D._getValue=function(r,c){var v=c.keys.reduce(function(o,k){return o&&o[k];},r);return v;};D.prototype.requestData=function(p){var d=this.mSettings.dataSource;this.fnConvertData=D.getDataConverter(this.mSettings);this.fnProcessCallback=p;this.mRequest={serviceUrl:this._cleanUrl(d.serviceUrl),dataUrl:this._getUrl(0,this.iBatchSize),method:d.useBatch?'BATCH':'GET',headers:d.headers};this.sendRequest(this.mRequest).then(this.fnOnDataReceived.bind(this)).catch(this.fnOnError.bind(this));return{cancel:function(){this.bCanceled=true;}.bind(this)};};D.prototype.fnOnDataReceived=function(r){var d,n,f,p,R;var c={};if(this.bCanceled){return;}d=(r&&r.value||(r.d&&(r.d.results||r.d)))||r;d=(Array.isArray(d))?d:[];f=d.length;this.iAvailableRows+=f;R=this.iTotalRows-this.iAvailableRows;p=this.iAvailableRows/this.iTotalRows;c.finished=f===0||R<=0;c.progress=Math.round(p*100);c.total=this.iTotalRows;c.fetched=this.iAvailableRows;n=(r&&r['@odata.nextLink']||(r.d&&r.d.__next))||null;if(!c.finished){this.mRequest.dataUrl=this._getUrl(this.iAvailableRows,Math.min(this.iBatchSize,R),n);this.sendRequest(this.mRequest).then(this.fnOnDataReceived.bind(this)).catch(this.fnOnError.bind(this));}c.rows=this.fnConvertData(d);this.fnProcessCallback(c);};D.prototype.fnOnError=function(m){this.fnProcessCallback({error:m});};D.prototype._cleanUrl=function(u){var U;if(!u){return'';}U=URI.parse(u);U.path=U.path||'';if(U.path.slice(-1)!=='/'){U.path=U.path+'/';}delete U.query;delete U.hash;delete U.fragment;return(URI.serialize||URI.build)(U);};D.prototype._prepareDataUrl=function(){var d=this.mSettings.dataSource;var m,r=/\$skip\=[0-9]+/,a=/\$top\=[0-9]+/;if(!d.dataUrl){return'';}m=URI.parse(d.dataUrl);m.query=m.query||'';if(!r.test(m.query)){m.query+=(m.query.length?'&':'')+'$skip='+0;}if(!a.test(m.query)){m.query+='&$top='+0;}this.mSettings.dataSource.dataUrl=(URI.serialize||URI.build)(m);};D.prototype._getUrl=function(s,t,n){var d,N;d=URI.parse(this.mSettings.dataSource.dataUrl);if(n){N=URI.parse(n);d.query=N.query;}else{d.query=(d.query||'').replace(/\$skip\=[0-9]+/g,'$skip='+s).replace(/\$top\=[0-9]+/g,'$top='+t);}return(URI.serialize||URI.build)(d);};D.prototype.sendRequest=function(r){if(typeof r!=='object'||r===null||typeof r.dataUrl!=='string'){throw new Error('Unable to send request - Mandatory parameters missing.');}return(r.method==='BATCH'&&r.serviceUrl?this.sendBatchRequest:this.sendGetRequest)(r);};D.prototype.sendBatchRequest=function(r){return new Promise(function(R,f){var x=new XMLHttpRequest();var b='batch_'+D._createGuid();var g=r.dataUrl.split(r.serviceUrl)[1];var a=[];var k,v;x.onload=function(){var c,l,E,L,s,o;l=this.responseText.split('\r\n');s=0;L=l.length;E=L-1;while(s<L&&l[s].slice(0,1)!=='{'){s++;}while(E>0&&l[E].slice(-1)!=='}'){E--;}l=l.slice(s,E+1);c=l.join('\r\n');try{o=JSON.parse(c);R(o);}catch(e){f(D.HTTP_WRONG_RESPONSE_MSG+c);}};x.onerror=function(){f(D.HTTP_ERROR_MSG);};x.onabort=function(){f(D.HTTP_ERROR_MSG);};x.open('POST',r.serviceUrl+'$batch',true);x.setRequestHeader('Accept','multipart/mixed');x.setRequestHeader('Content-Type','multipart/mixed;boundary='+b);a.push('--'+b);a.push('Content-Type: application/http');a.push('Content-Transfer-Encoding: binary');a.push('');a.push('GET '+g+' HTTP/1.1');for(k in r.headers){v=r.headers[k];if(k.toLowerCase()!='accept'){x.setRequestHeader(k,v);}a.push(k+':'+v);}a.push('');a.push('');a.push('--'+b+'--');a.push('');a=a.join('\r\n');x.send(a);});};D.prototype.sendGetRequest=function(r){return new Promise(function(R,f){var h;var x=new XMLHttpRequest();x.onload=function(){if(this.status>=400){f(this.responseText);return;}try{R(JSON.parse(this.responseText));}catch(e){f(D.HTTP_WRONG_RESPONSE_MSG+this.responseText);}};x.onerror=function(){f(D.HTTP_ERROR_MSG);};x.onabort=function(){f(D.HTTP_ERROR_MSG);};x.open('GET',r.dataUrl,true);x.setRequestHeader('accept','application/json');for(h in r.headers){if(h.toLowerCase()!=='accept'){x.setRequestHeader(h,r.headers[h]);}}x.send();});};return D;});

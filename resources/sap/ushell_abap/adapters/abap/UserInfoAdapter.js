// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui2/srvc/ODataWrapper","sap/ui2/srvc/ODataService","sap/ui/thirdparty/datajs","sap/ui/thirdparty/jquery","sap/base/Log","sap/ushell/resources"],function(O,a,b,q,L,r){"use strict";var d;var D="default";return function(){this._updateODataObjectBasedOnDatatype=function(v,o){if(q.type(v)==="string"){o.value=v.toString();o.dataType="Edm.String";}if(q.type(v)==="boolean"){o.value=v.toString();o.dataType="Edm.Boolean";}return o;};this.getThemeList=function(){var o=new q.Deferred(),u="/sap/opu/odata/UI2/INTEROP/Themes";b.read({requestUri:u},function(c,R){var i,t=[];for(i=0;i<c.results.length;i=i+1){t.push(c.results[i]);}o.resolve({options:t});},function(e){L.error(e.message,null,"sap.ushell_abap.adapters.abap.UserInfoAdapter");o.reject(e.message);});return o.promise();};this.getLanguageList=function(){var o=new q.Deferred(),u=encodeURI("/sap/opu/odata/UI2/INTEROP/UserProfilePropertyValues?$filter=id eq 'PREFERRED_LOGON_LANGUAGE'");b.read({requestUri:u},function(c){var R=[{"text":r.i18n.getText("userSettings.browserLanguage"),"key":D}];var l=c.results.map(function(e){return{"text":e.description,"key":e.value};}).sort(function(e,f){return e.text.localeCompare(f.text);});R=R.concat(l);o.resolve(R);},function(e){L.error(e.message,null,"sap.ushell_abap.adapters.abap.UserInfoAdapter");o.reject(e.message);});return o.promise();};this._createWrapper=function(B){return sap.ui2.srvc.createODataWrapper(B,false,function(e){});};this.updateUserPreferences=function(u){var t=this,o,R,U,i,c,s=function(){i-=1;if(i===0){o.resolve();}},f=function(e){o.reject(e);};d=this._createWrapper("/sap/opu/odata/UI2/INTEROP/");o=new q.Deferred();d.openBatchQueue();U=u.getChangedProperties()||[];i=U.length;U.forEach(function(e){var n=e.name,g=e.newValue;if(n.toUpperCase()==="LANGUAGE"){n="PREFERRED_LOGON_LANGUAGE";g=g===D?undefined:g;}R="UserProfileProperties("+["id='"+n+"'","shellType='FLP')"].join(",");c={id:n,shellType:"FLP",value:g};t._updateODataObjectBasedOnDatatype(g,c);d.put(R,c,s,f);});d.submitBatchQueue(function(){if(i===0){o.resolve();}},f);return o.promise();};};},true);

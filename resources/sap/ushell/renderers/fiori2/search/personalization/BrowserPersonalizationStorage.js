// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/renderers/fiori2/search/personalization/Personalizer'],function(P){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.personalization.BrowserPersonalizationStorage');var m=sap.ushell.renderers.fiori2.search.personalization.BrowserPersonalizationStorage=function(){this.init.apply(this,arguments);};var B=m;m.prototype={init:function(){},getItem:function(k){if(!this._isStorageSupported()){throw'not supported storage';}return this._getStorage(k);},setItem:function(k,d){if(!this._isStorageSupported()){throw'not supported storage';}this._putStorage(k,d);},getPersonalizer:function(k){return new P(k,this);},_isStorageSupported:function(){if(jQuery.sap.storage&&jQuery.sap.storage.isSupported()){return true;}return false;},_getStorage:function(k){return jQuery.sap.storage.get("Search.Personalization."+k);},_putStorage:function(k,s){if(typeof jQuery.sap.storage.setType==='function'){jQuery.sap.storage.setType(jQuery.sap.storage.Type.local);}jQuery.sap.storage.put("Search.Personalization."+k,s);}};m.getInstance=function(){return new jQuery.Deferred().resolve(new B());};return m;});

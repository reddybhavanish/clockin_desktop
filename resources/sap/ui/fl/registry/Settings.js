/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/Storage","sap/ui/fl/Utils","sap/base/util/UriParameters","sap/base/Log"],function(S,U,a,L){"use strict";var b=function(s){if(!s){throw new Error("no flex settings provided");}if(!s.defaultLayerPermissions){s.defaultLayerPermissions={VENDOR:true,CUSTOMER_BASE:true,CUSTOMER:true,USER:false};}if(!s.developerModeLayerPermissions){s.developerModeLayerPermissions={VENDOR:true,CUSTOMER_BASE:true,CUSTOMER:false,USER:false};}if(!(b._IS_VARIANT_SHARING_ENABLED in s)){s.isVariantSharingEnabled=true;}this._oSettings=s;};b._IS_VARIANT_SHARING_ENABLED="isVariantSharingEnabled";b.attachEvent=function(e,c){b._oEventProvider.attachEvent(e,c);};b.detachEvent=function(e,c){b._oEventProvider.detachEvent(e,c);};b.getInstance=function(){if(b._instance){return Promise.resolve(b._instance);}if(b._oLoadSettingsPromise){return b._oLoadSettingsPromise;}return b._loadSettings();};b._loadSettings=function(){var l=S.loadFeatures().then(function(s){if(!s){L.error("The request for flexibility settings failed; A default response is generated and returned to consuming APIs");s={isKeyUser:false,isVariantSharingEnabled:false,isAtoAvailable:false,isAtoEnabled:false,isProductiveSystem:true,versioning:{},_bFlexChangeMode:false,_bFlexibilityAdaptationButtonAllowed:false};}return b._storeInstance(s);});b._oLoadSettingsPromise=l;return l;};b._storeInstance=function(s){if(!b._instance){b._instance=new b(s);}return b._instance;};b.getInstanceOrUndef=function(){var s;if(b._instance){s=b._instance;}return s;};b.prototype._getBooleanProperty=function(p){var v=false;if(this._oSettings[p]){v=this._oSettings[p];}return v;};b.prototype.isKeyUser=function(){return this._getBooleanProperty("isKeyUser");};b.prototype.isVersioningEnabled=function(l){return!!(this._oSettings.versioning[l]||this._oSettings.versioning["ALL"]);};b.prototype.isModelS=function(){return this._getBooleanProperty("isAtoAvailable");};b.prototype.isAtoEnabled=function(){return this._getBooleanProperty("isAtoEnabled");};b.prototype.isAtoAvailable=function(){return this._getBooleanProperty("isAtoAvailable");};b.prototype.isProductiveSystem=function(){return this._getBooleanProperty("isProductiveSystem");};b.prototype.isVariantSharingEnabled=function(){return(this._oSettings.isVariantSharingEnabled===true);};b.prototype.getSystem=function(){return this._oSettings.system;};b.prototype.getClient=function(){return this._oSettings.client;};b.prototype.getDefaultLayerPermissions=function(){return this._oSettings.defaultLayerPermissions;};b.prototype.getDeveloperModeLayerPermissions=function(){return this._oSettings.developerModeLayerPermissions;};return b;},true);
// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/utils","sap/ushell/services/_Personalization/utils","sap/ushell/services/_Personalization/constants.private","sap/ushell/services/_Personalization/PersonalizationContainerVariantSet","sap/ui/thirdparty/jquery"],function(u,p,c,P,q){"use strict";function a(A,C){this._sContainerKey=C;this._oAdapterContainer={};this._aLoadedVariantSetKeys=[];this._aLoadedItemKeys=[];var d={},t=this;this._init();d=new q.Deferred();if(!this._sContainerKey||typeof this._sContainerKey!=="string"){throw new u.Error("Invalid container key: sap.ushell.services.Personalization"," ");}this._oAdapterContainer=A.getAdapterContainer(this._sContainerKey);this.load().fail(function(){d.reject();}).done(function(){d.resolve(t);});return d.promise();}a.prototype._init=function(){this._oVariantSetMap={};this._oItemMap={};this._aLoadedVariantSetKeys=[];this._aLoadedItemKeys=[];this._oVariantSetMap=new u.Map();this._oItemMap=new u.Map();};a.prototype.load=function(){var d={},i=[],v=[],I=[],m=[],t=this;function b(I){var n=[],e=[];n=I.filter(function(s){return s.indexOf(c.S_ITEM_PREFIX)!==0;});if(n.length===0){return I;}e=I.filter(function(s){return s.indexOf(c.S_ITEM_PREFIX)===0;});n.forEach(function(s){var o={},f="";f=c.S_ITEM_PREFIX+s;o=p.clone(t._oAdapterContainer.getItemValue(s));t._oAdapterContainer.setItemValue(f,o);t._oAdapterContainer.delItem(s);if(e&&Array.prototype.indexOf.call(e,f)===-1){e.push(f);}});return e;}d=new q.Deferred();if(!this._sContainerKey){throw new u.Error("Invalid container key: sap.ushell.services.Personalization"," ");}this._init();this._oAdapterContainer.load().fail(function(){d.reject();}).done(function(){i=t._oAdapterContainer.getItemKeys().splice(0);v=i.filter(function(s){return s.indexOf(c.S_VARIANT_PREFIX)===0;});v.forEach(function(V){var o={};o=new P(V,t._oAdapterContainer);t._oVariantSetMap.put(V,o);});I=i.filter(function(s){return s.indexOf(c.S_VARIANT_PREFIX)!==0;});m=b(I);m.forEach(function(s){t._oItemMap.put(s,p.clone(t._oAdapterContainer.getItemValue(s)));});t._aLoadedVariantSetKeys=t._oVariantSetMap.keys().splice(0);t._aLoadedItemKeys=t._oItemMap.keys().splice(0);d.resolve();});return d.promise();};a.prototype.save=function(){var s,i;this._serializeVariantSets();this._serializeItems();s=new q.Deferred();function S(){s.resolve();}function f(){s.reject();}try{i=this._oAdapterContainer.save();i.fail(f);i.done(S);}catch(e){s.reject();}return s.promise();};a.prototype.getItemKeys=function(){return this._oItemMap.keys().map(function(e){return e.replace(c.S_ITEM_PREFIX,"","");});};a.prototype.getItemValue=function(i){if(typeof i!=="string"){return undefined;}return this._oItemMap.get(c.S_ITEM_PREFIX+i);};a.prototype.containsItem=function(i){if(typeof i!=="string"){return undefined;}return this._oItemMap.containsKey(c.S_ITEM_PREFIX+i);};a.prototype.setItemValue=function(i,I){if(typeof i!=="string"){throw new u.Error("Parameter value of sItemKey is not a string: sap.ushell.services.Personalization"," ");}this._oItemMap.put(c.S_ITEM_PREFIX+i,I);};a.prototype.delItem=function(i){if(typeof i!=="string"){return undefined;}if(this.containsItem(i)){this._oItemMap.remove(c.S_ITEM_PREFIX+i);}};a.prototype._serializeItems=function(){var i=[],d=[],t=this;i=this._oItemMap.keys();i.forEach(function(I){t._oAdapterContainer.setItemValue(I,p.clone(t._oItemMap.get(I)));});d=this._aLoadedItemKeys.filter(function(I){return!(i.indexOf(I)>-1);});d.forEach(function(I){t._oAdapterContainer.delItem(I);});};a.prototype.getVariantSetKeys=function(){var v=[],b=[];b=this._oVariantSetMap.keys();v=b.map(function(e){return e.replace(c.S_VARIANT_PREFIX,"","");});return v;};a.prototype.containsVariantSet=function(v){return this._oVariantSetMap.containsKey(c.S_VARIANT_PREFIX+v);};a.prototype.getVariantSet=function(v){var s,V={};s=c.S_VARIANT_PREFIX+v;V=this._oVariantSetMap.get(s);return V;};a.prototype.addVariantSet=function(v){var e={},V={},s="";if(this.containsVariantSet(v)){throw new u.Error("Container already contains a variant set with key '"+v+"': sap.ushell.services.Personalization"," ");}s=c.S_VARIANT_PREFIX+v;e={currentVariant:null,variants:{}};this._oAdapterContainer.setItemValue(s,e);V=new P(s,this._oAdapterContainer);this._oVariantSetMap.put(s,V);return V;};a.prototype._serializeVariantSets=function(){var v=[],d=[],t=this;v=this._oVariantSetMap.keys();v.forEach(function(V){var o={},b={};o=t._oVariantSetMap.get(V);b=o._serialize();t._oAdapterContainer.setItemValue(V,p.clone(b));});d=this._aLoadedVariantSetKeys.filter(function(V){return!(v.indexOf(V)>-1);});d.forEach(function(V){t._oAdapterContainer.delItem(V);});};a.prototype.delVariantSet=function(v){var s="";s=c.S_VARIANT_PREFIX+v;this._oVariantSetMap.remove(s);return this._oAdapterContainer.delItem(s);};return a;});

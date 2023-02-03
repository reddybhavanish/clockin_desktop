sap.ui.define(["sap/fe/test/Utils","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder"],function(U,O,F){"use strict";function _(r,c){var a=r.and;if(c in a){return _(a[c],c);}return a;}var B=function(o,i){this._oBuilder=o;this._vIdentifier=i;};B.prototype.isAction=undefined;B.prototype.getBuilder=function(){return new this._oBuilder.constructor(this.getOpaInstance(),this._oBuilder.build());};B.prototype.getOpaInstance=function(){return this._oBuilder._getOpaInstance();};B.prototype.getIdentifier=function(){return this._vIdentifier;};B.prototype.prepareResult=function(w){var p=_(w,this.isAction?"when":"then");w.and=this;if(!U.isOfType(this.isAction,[null,undefined])){w.and[this.isAction?"when":"then"]=p;}return w;};B.prototype.createActionMatcher=function(a){var m;if(!U.isOfType(a,String)){if(typeof a.service==="string"&&typeof a.action==="string"){a.id=a.service+(a.unbound?"::":".")+a.action;m=F.Matchers.id(new RegExp(U.formatMessage("{0}$",a.id)));}else{throw new Error("not supported service and action parameters for creating a control id: "+a.service+"/"+a.action);}}else{m=O.Matchers.properties({text:a});}return m;};return B;});

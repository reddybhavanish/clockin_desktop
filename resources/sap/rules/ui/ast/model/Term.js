sap.ui.define(function(){"use strict";var T=function(){this._termName;this._bussinessDataType;this._termId;this._vocaId;this._dataObjectType;this._label;this._hasValueSource=false;this._cardinality;this._isDataObjectElement=false;};var _=function(s){if(s===null||s===undefined){}};T.prototype={getTermName:function(){return this._termName;},setTermName:function(t){_(t);this._termName=t;return this;},getBusinessDataType:function(){return this._bussinessDataType;},setBusinessDataType:function(b){_(b);this._bussinessDataType=b;return this;},getTermId:function(){return this._termId;},setTermId:function(t){_(t);this._termId=t;return this;},getVocaId:function(){return this._vocaId;},setVocaId:function(v){_(v);this._vocaId=v;return this;},getDataObjectType:function(){return this._dataObjectType;},setDataObjectType:function(d){_(d);this._dataObjectType=d;return this;},getLabel:function(){return this._label;},setLabel:function(l){_(l);this._label=l;return this;},setHasValueSource:function(h){if(h==undefined){return this;}this._hasValueSource=h;return this;},getHasValueSource:function(){return this._hasValueSource;},getCardinality:function(){return this._cardinality;},setCardinality:function(c){_(c);if(c){this._cardinality=c;}return this;},setIsDataObjectElement:function(v){this._isDataObjectElement=v;},getIsDataObjectElement:function(){return this._isDataObjectElement;}};return T;},true);

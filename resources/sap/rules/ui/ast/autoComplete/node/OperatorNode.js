sap.ui.define(["sap/rules/ui/ast/autoComplete/node/BaseNode","sap/rules/ui/ast/constants/Constants"],function(B,C){"use strict";var O=function(){B.apply(this,arguments);this._probableBusinessDataReturnTypeList=[];this._probableDataObjectReturnTypeList=[];this._operatorMetaData={};};O.prototype=new B();O.prototype.constructor=B;O.prototype.getProbableBusinessDataReturnTypeList=function(){return this._probableBusinessDataReturnTypeList;};O.prototype.setProbableBusinessDataReturnTypeList=function(p){this._probableBusinessDataReturnTypeList=p;return this;};O.prototype.getProbableDataObjectReturnTypeList=function(){return this._probableDataObjectReturnTypeList;};O.prototype.setProbableDataObjectReturnTypeList=function(p){this._probableDataObjectReturnTypeList=p;return this;};O.prototype.getOperatorMetadata=function(){return this._operatorMetaData;};O.prototype.setOperatorMetadata=function(o){this._operatorMetaData=o;return this;};O.prototype.getNodeType=function(){return C.OPERATORNODE;};return O;},true);

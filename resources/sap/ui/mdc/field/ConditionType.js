/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/model/SimpleType','sap/ui/model/FormatException','sap/ui/model/ParseException','sap/ui/model/ValidateException','sap/ui/model/type/String','sap/ui/mdc/library','sap/ui/mdc/condition/FilterOperatorUtil','sap/ui/mdc/condition/Condition','sap/ui/mdc/util/BaseType','sap/ui/mdc/util/ConditionValidated','sap/base/util/merge','sap/ui/base/SyncPromise'],function(S,F,P,V,a,l,b,C,B,c,m,d){"use strict";var e=l.FieldDisplay;var f=S.extend("sap.ui.mdc.field.ConditionType",{constructor:function(D,E){S.apply(this,arguments);this.sName="Condition";this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");}});f.prototype.destroy=function(){S.prototype.destroy.apply(this,arguments);if(this._oDefaultType){this._oDefaultType.destroy();delete this._oDefaultType;}this._bDestroyed=true;};f.prototype.formatValue=function(D,I){if(D==undefined||D==null||this._bDestroyed){return null;}if(typeof D!=="object"||!D.operator||!D.values||!Array.isArray(D.values)){throw new F("No valid condition provided");}if(!I){I="string";}var T=n.call(this);var O=o.call(this);var E=this.oFormatOptions.isUnit;s.call(this,D,O);if(E){D=m({},D);if(D.values[0]&&Array.isArray(D.values[0])){D.values[0]=D.values[0][1];}if(D.operator!=="EQ"){D.operator="EQ";if(D.values[1]){D.values.splice(1,1);}}}s.call(this,D,T);switch(this.getPrimitiveType(I)){case"string":case"any":var G=k.call(this);if(D.operator==="EQ"&&G!==e.Value&&D.validated===c.Validated&&!D.values[1]){var H=this.oFormatOptions.bindingContext;return d.resolve().then(function(){return A.call(this,D.values[0],D.inParameters,D.outParameters,H);}.bind(this)).then(function(J){if(J){D=m({},D);if(typeof J==="object"){D=u.call(this,D,J);}else if(D.values.length===1){D.values.push(J);}else{D.values[1]=J;}}return _.call(this,D);}.bind(this)).catch(function(J){if(J instanceof F&&y.call(this)){return _.call(this,D);}else{throw J;}}.bind(this)).unwrap();}return _.call(this,D);default:if(T&&D.values.length>=1){return T.formatValue(D.values[0],I);}throw new F("Don't know how to format Condition to "+I);}};function _(D){var E=k.call(this);var T=n.call(this);if(this.oFormatOptions.hideOperator&&D.values.length===1){return T.formatValue(D.values[0],"string");}var O=b.getOperator(D.operator);if(!O){throw new F("No valid condition provided, Operator wrong.");}return O.format(D,T,E);}f.prototype.parseValue=function(D,I){if(this._bDestroyed){return null;}if(!I){I="string";}else if(I==="any"&&typeof D==="string"){I="string";}var N=this.oFormatOptions.navigateCondition;if(N){var O=this.formatValue(N,I);if(O===D){return m({},N);}}var E=k.call(this);var G=x.call(this);var T=n.call(this);var H=o.call(this);var J=p.call(this);var K=this.oFormatOptions.isUnit;var L;if(D===null||D===undefined||(D===""&&!G)){if(!r.call(this,T)&&!K){return null;}}t.call(this,T);t.call(this,H);switch(this.getPrimitiveType(I)){case"string":var M;var Q=false;var U=false;if(J.length===1){M=b.getOperator(J[0]);U=true;}else{var R=b.getMatchingOperators(J,D);if(R.length===0){M=b.getDefaultOperator(w.call(this,T));if(M&&J.indexOf(M.name)<0){M=undefined;}if(G&&!r.call(this,T)&&J.indexOf("EQ")>=0){Q=!!M&&M.name!=="EQ";M=b.getEQOperator();}U=true;}else{M=R[0];}}if(M){var W;var X=r.call(this,T);if(!X&&M.validateInput&&G){W=h.call(this,M,D,T,U,Q,J,E,true);if(W instanceof Promise){return v.call(this,W);}else{return W;}}else if(D===""&&!X){return g.call(this,null,T);}else{try{if(D===""&&X&&U){W=C.createCondition(M.name,[T.parseValue(D,"string",T._aCurrentValue)],undefined,undefined,c.NotValidated);}else{W=M.getCondition(D,T,E,U);}}catch(Y){if(Y instanceof P&&H){H.parseValue(D,"string",H._aCurrentValue);}throw Y;}}if(W){return g.call(this,W,T);}}throw new P("Cannot parse value "+D);default:if(T){if(J.length===1){L=J[0];}else{L=b.getDefaultOperator(w.call(this,T)).name;if(L&&J.indexOf(L)<0){L=undefined;}}if(L){return C.createCondition(L,[T.parseValue(D,I)],undefined,undefined,c.NotValidated);}}throw new P("Don't know how to parse Condition from "+I);}};function g(D,T){var I=this.oFormatOptions.isUnit;var O=o.call(this);var U=null;if(I){var M;if(O._aCurrentValue){M=O._aCurrentValue[0];}if(D){if(D.operator!=="EQ"){throw new P("unsupported operator");}U=D.values[0];D.values=[[M,U]];}else{D=C.createCondition("EQ",[[M,null]],undefined,undefined,c.NotValidated);}s.call(this,D,O);}else if(D){var N=T.getMetadata().getName();var E=this.oFormatOptions.delegate;var G=this.oFormatOptions.payload;if(E&&E.getBaseType(G,N)===B.Unit&&!D.values[0][1]&&T._aCurrentValue){U=T._aCurrentValue[1]?T._aCurrentValue[1]:null;D.values[0][1]=U;if(D.operator==="BT"){D.values[1][1]=U;}}s.call(this,D,T);s.call(this,D,O);}return D;}function h(O,D,T,U,E,G,H,I){var K;var J;var L=true;var M=true;var N=false;var Q;var R;var W=this.oFormatOptions.bindingContext;var X;if(D===""){K=D;Q=D;}else{X=O.getValues(D,H,U);K=I?X[0]:X[1];J=I?X[1]:X[0];N=H!==e.Value;M=H===e.Value||H===e.ValueDescription;Q=M?K||J:J||K;}var Y=function($){if($&&!($ instanceof P)&&!($ instanceof F)){throw $;}if(!$._bNotUnique){if(I&&X[0]&&X[1]){return h.call(this,O,D,T,U,E,G,H,false);}if(E){return i.call(this,T,G,D,H);}}if(y.call(this)){return j.call(this,T,G,D,H);}throw new P($.message);};var Z=function(a1){if(a1){return C.createCondition(O.name,[a1.key,a1.description],a1.inParameters,a1.outParameters,c.Validated);}else if(D===""){return null;}else{return Y.call(this,new P(this._oResourceBundle.getText("valuehelp.VALUE_NOT_EXIST",[D])));}};try{R=T.parseValue(Q,"string");T.validateValue(R);}catch($){if($&&!($ instanceof P)&&!($ instanceof V)){throw $;}L=false;M=false;R=undefined;}return d.resolve().then(function(){return z.call(this,Q,R,W,M,L,N);}.bind(this)).then(function(a1){var b1=Z.call(this,a1);return g.call(this,b1,T);}.bind(this)).catch(function($){var a1=Y.call(this,$);return g.call(this,a1,T);}.bind(this)).unwrap();}function i(T,O,D,E){var G=b.getDefaultOperator(w.call(this,T));var H;if(G&&O.indexOf(G.name)>=0){H=G.getCondition(D,T,e.Value,true);H.validated=c.NotValidated;}return H;}function j(T,O,D,E){var G;if(O.length===1){G=b.getOperator(O[0]);}else if(O.indexOf("EQ")>=0){G=b.getOperator("EQ");}if(!G){throw new P("Cannot parse value "+D);}var H=G.getCondition(D,T,e.Value,true);H.validated=c.NotValidated;return H;}f.prototype.validateValue=function(D){var T=n.call(this);var O=o.call(this);var E=p.call(this);var I=this.oFormatOptions.isUnit;if(D===undefined||this._bDestroyed){return null;}else if(D===null){if(b.onlyEQ(E)){try{if(T._sParsedEmptyString===""){T.validateValue("");}else{T.validateValue(null);}}catch(G){if(G instanceof V){throw G;}else{return null;}}}return null;}if(typeof D!=="object"||!D.operator||!D.values||!Array.isArray(D.values)){throw new V(this._oResourceBundle.getText("field.VALUE_NOT_VALID"));}var H=b.getOperator(D.operator,E);if(I){D=m({},D);if(D.values[0]&&Array.isArray(D.values[0])){D.values[0]=D.values[0][1];}H=b.getEQOperator();}if(!H){throw new V("No valid condition provided, Operator wrong.");}try{H.validate(D.values,T);}catch(J){if(J instanceof V&&O){H.validate(D.values,O);}throw J;}};function k(){var D=this.oFormatOptions.display;if(!D){D=e.Value;}return D;}function n(){var T=this.oFormatOptions.valueType;if(!T){if(!this._oDefaultType){this._oDefaultType=new a();}T=this._oDefaultType;}return T;}function o(){return this.oFormatOptions.originalDateType;}function p(){var O=this.oFormatOptions.operators;if(!O||O.length===0){O=b.getOperatorsForType(B.String);}return O;}function q(){var I=this.oFormatOptions.fieldHelpID;if(I){var D=sap.ui.getCore().byId(I);if(D&&D.isUsableForValidation()){return D;}}return null;}function r(T){return T&&T.isA("sap.ui.model.CompositeType");}function s(D,T){if(r.call(this,T)&&D&&D.values[0]){T._aCurrentValue=D.values[0];}}function t(T){if(r.call(this,T)&&!T._aCurrentValue){T._aCurrentValue=[];}}function u(D,R){D.values=[R.key,R.description];if(R.inParameters){D.inParameters=R.inParameters;}if(R.outParameters){D.outParameters=R.outParameters;}return D;}function v(D){if(this.oFormatOptions.asyncParsing){this.oFormatOptions.asyncParsing(D);}return D;}function w(T){var D=T.getMetadata().getName();var E=T.oFormatOptions;var G=T.oConstraints;var H=this.oFormatOptions.delegate;var I=this.oFormatOptions.payload;var J=H?H.getBaseType(I,D,E,G):B.String;if(J===B.Unit){J=B.Numeric;}return J;}function x(){var D=q.call(this);var E=this.oFormatOptions.delegate;var G=this.oFormatOptions.payload;if(E){return E.isInputValidationEnabled(G,D);}else{return!!D;}}function y(){var D=q.call(this);var E=this.oFormatOptions.delegate;var G=this.oFormatOptions.payload;if(E){return E.isInvalidInputAllowed(G,D);}else if(D){return!D.getValidateInput();}else{return true;}}function z(D,E,G,H,I,J){var K=q.call(this);var L=this.oFormatOptions.delegate;var M=this.oFormatOptions.payload;if(L){return L.getItemForValue(M,K,D,E,G,H,I,J);}else if(K){return K.getItemForValue(D,E,undefined,undefined,G,H,I,J);}}function A(K,I,O,D){var E=q.call(this);var G=this.oFormatOptions.delegate;var H=this.oFormatOptions.payload;if(G){return G.getDescription(H,E,K,I,O,D);}else if(E){return E.getTextForKey(K,I,O,D);}}return f;});

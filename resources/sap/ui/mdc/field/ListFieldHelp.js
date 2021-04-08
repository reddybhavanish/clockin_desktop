/*
 * ! SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/mdc/field/FieldHelpBase','sap/ui/mdc/condition/Condition','sap/ui/mdc/util/ConditionValidated','sap/ui/model/FormatException','sap/ui/model/ParseException','sap/ui/model/base/ManagedObjectModel','sap/ui/base/ManagedObjectObserver','sap/ui/mdc/library'],function(F,C,a,b,P,M,c,l){"use strict";var L;var D;var m;var d;var e=F.extend("sap.ui.mdc.field.ListFieldHelp",{metadata:{library:"sap.ui.mdc",aggregations:{items:{type:"sap.ui.core.ListItem",multiple:true,singularName:"item"}},defaultAggregation:"items"}});e._init=function(){F._init.apply(this,arguments);L=undefined;D=undefined;m=undefined;d=undefined;};e.prototype.init=function(){F.prototype.init.apply(this,arguments);this._oManagedObjectModel=new M(this);this._oObserver=new c(g.bind(this));this._oObserver.observe(this,{properties:["filterValue","conditions"],aggregations:["items"]});this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");};e.prototype.exit=function(){F.prototype.exit.apply(this,arguments);this._oManagedObjectModel.destroy();delete this._oManagedObjectModel;this._oObserver.disconnect();this._oObserver=undefined;};e.prototype._createPopover=function(){var i=F.prototype._createPopover.apply(this,arguments);if((!L||!D||!m)&&!this._bListRequested){L=sap.ui.require("sap/m/List");D=sap.ui.require("sap/m/DisplayListItem");m=sap.ui.require("sap/m/library");d=sap.ui.require("sap/ui/model/Filter");if(!L||!D||!m){sap.ui.require(["sap/m/List","sap/m/DisplayListItem","sap/m/library","sap/ui/model/Filter"],f.bind(this));this._bListRequested=true;}}if(i){_.call(this);}return i;};function _(){if(!this._oList&&L&&D&&m&&!this._bListRequested){var i=new D({type:m.ListType.Active,label:"{$field>text}",value:"{$field>additionalText}"});var r=new d("text",n.bind(this));this._oList=new L(this.getId()+"-List",{width:"100%",showNoData:false,mode:m.ListMode.SingleSelectMaster,rememberSelections:false,items:{path:"$field>items",template:i,filters:r},itemPress:h.bind(this)});this._oList.setModel(this._oManagedObjectModel,"$field");this._oList.bindElement({path:"/",model:"$field"});o.call(this);this._setContent(this._oList);if(this._bNavigate){this._bNavigate=false;this.navigate(this._iStep);this._iStep=null;}}}function f(i,r,s,t){L=i;D=r;m=s;d=t;this._bListRequested=false;if(!this._bIsBeingDestroyed){_.call(this);}}e.prototype.open=function(s){return F.prototype.open.apply(this,arguments);};e.prototype._handleAfterClose=function(E){if(this._bUpdateFilterAfterClose){this._bUpdateFilterAfterClose=false;k.call(this);}F.prototype._handleAfterClose.apply(this,arguments);};function g(i){if(i.object===this){if(i.name==="items"){if(i.mutation==="insert"){this._oObserver.observe(i.child,{properties:true});}else{this._oObserver.unobserve(i.child);}this.fireDataUpdate();}if(i.name==="conditions"){if(!this._bConditionUpdate){o.call(this);}}if(i.name==="filterValue"){if(this._oList){if(this._bClosing){this._bUpdateFilterAfterClose=true;}else{k.call(this);}}}}else{this.fireDataUpdate();}}e.prototype.openByTyping=function(){return true;};e.prototype.navigate=function(s){var i=this._getPopover();if(!i||!this._oList){this._bNavigate=true;this._iStep=s;return;}var S=this._oList.getSelectedItem();var I=this._oList.getItems();var r=I.length;var t=0;if(S){t=this._oList.indexOfItem(S);t=t+s;if(t<0){t=0;}else if(t>=r-1){t=r-1;}}else if(s>=0){t=s-1;}else{t=r+s;}var u=I[t];if(u&&u!==S){var O=j.call(this,u);var K=p.call(this,O);u.setSelected(true);var v=q.call(this,K,u.getLabel());if(!i.isOpen()){this.open();}if(u.getDomRef()){u.getDomRef().scrollIntoView();}this.fireNavigate({key:K,value:u.getLabel(),condition:v});}};e.prototype._getTextOrKey=function(v,K,B,I,O){if(v===null||v===undefined){return null;}else if(!v&&!K){return null;}var r=this.getItems();for(var i=0;i<r.length;i++){var s=r[i];if(K){if(p.call(this,s)===v){return s.getText();}}else if(s.getText()===v){return p.call(this,s);}}if(K&&v===""){return null;}var E=this._oResourceBundle.getText("valuehelp.VALUE_NOT_EXIST",[v]);if(K){throw new b(E);}else{throw new P(E);}};function h(E){var i=E.getParameter("listItem");var s=i.getSelected();if(s){var O=j.call(this,i);var K=p.call(this,O);q.call(this,K,i.getLabel());this.close();this.fireSelect({conditions:this.getConditions(),add:true,close:true});}}function j(i){var s=i.getBindingContextPath();return this._oManagedObjectModel.getProperty(s);}function k(){var B=this._oList.getBinding("items");B.update();this._oList.updateItems();this._oList.invalidate();o.call(this);}function n(t){var s=this.getFilterValue();if(!s||(typeof s==="string"&&t.toLowerCase().startsWith(s.toLowerCase()))){return true;}else{return false;}}function o(){if(this._oList){var r=this.getConditions();var s;if(r.length>0&&(r[0].validated===a.Validated||r[0].operator==="EQ")){s=r[0].values[0];}var I=this._oList.getItems();for(var i=0;i<I.length;i++){var t=I[i];var O=j.call(this,t);if(p.call(this,O)===s){t.setSelected(true);}else{t.setSelected(false);}}}}function p(i){var B=i.getBinding("key");if(B){return B.getInternalValue();}else{return i.getKey();}}function q(K,v){this._bConditionUpdate=true;var i=C.createItemCondition(K,v);i.validated=a.Validated;this.setProperty("conditions",[i],true);this._bConditionUpdate=false;return i;}return e;});

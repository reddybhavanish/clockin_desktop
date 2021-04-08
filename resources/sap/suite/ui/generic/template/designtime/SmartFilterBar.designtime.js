sap.ui.define(["sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils","sap/suite/ui/generic/template/designtime/utils/DesigntimeUtils","sap/base/util/deepExtend","sap/suite/ui/generic/template/designtime/library.designtime"],function(U,D,d){"use strict";var _=function(s){var p=D.ignoreAllProperties(s);var P={liveMode:{ignore:false}};return d({},p,P);};var S="com.sap.vocabularies.UI.v1.SelectionFields";var r=sap.ui.getCore().getModel("i18nDesigntime").getResourceBundle();return{'default':{},'strict':{name:{singular:function(){return r.getText("FE_FILTERBAR");}},actions:null,aggregations:{filterItems:{ignore:true},controlConfiguration:{ignore:true},filterGroupItems:{ignore:true},groupConfiguration:{ignore:true},content:{ignore:false,propagateRelevantContainer:true,propagateMetadata:function(e){switch(e.getMetadata().getElementName()){case"sap.m.Panel":case"sap.ui.layout.form.Form":case"sap.m.ToolbarSeparator":case"sap.m.ToolbarSpacer":case"sap.ui.comp.smartfilterbar.ControlConfiguration":return{properties:function(e){return D.ignoreAllProperties(e);},actions:null};case"sap.m.MultiComboBox":case"sap.m.Select":return{properties:function(e){return D.ignoreAllProperties(e);},aggregations:{items:{ignore:true}}};case"sap.m.MultiInput":return{properties:function(e){return D.ignoreAllProperties(e);},aggregations:{suggestionItems:{ignore:true},suggestionColumns:{ignore:true},suggestionRows:{ignore:true},tokens:{ignore:true}}};case"sap.ui.layout.AlignedFlowLayout":return{name:{singular:function(){return r.getText("FE_SELECTIONFIELD");},plural:function(){return r.getText("FE_SELECTIONFIELDS");}},properties:function(e){return D.ignoreAllProperties(e);},aggregations:{content:{domRef:":sap-domref",actions:{move:"moveFilterItems",add:{custom:{getItems:D.getItemsForSmartFilterCustomPopUp}}}}},getStableElements:function(a){var f=function(e){if(e.getMetadata().getName()==="sap.ui.comp.smartfilterbar.SmartFilterBar"){return e;}else{return f(e.getParent());}};return[f(a).getId()];}};case"sap.ui.layout.VerticalLayout":return{getLabel:function(c){return c.getContent()[0].getText();},getCommonInstanceData:function(v){var t,T=U.getTemplatingInfo(U.getSmartFilterBarControlConfiguration(v));if(T){var E=T.target;var m=v.getModel().getMetaModel();var o=m.getODataEntityType(E);var R=U.getRecordIndexForSelectionField(v);if(o&&R){t=o.namespace+"."+o.name+"/"+S+"/"+R;}}return{target:t,annotation:S,qualifier:null};},links:{guidelines:[{href:"/filter-bar/",text:function(){return r.getText("FE_FILTERBAR_GUIDE");}}],developer:[{href:"/topic/609c39a7498541559dbef503c1ffd194.html",text:function(){return r.getText("FE_GUIDE_FILTERBAR");}},{href:"/api/sap.ui.comp.smartfilterbar.SmartFilterBar/annotations/SelectionFields",text:function(){return r.getText("FE_API_SMART_FILTER_ANNOTATIONS");}}]},aggregations:{content:{ignore:true}},actions:{remove:function(e){if(e.getContent()[1].sId.indexOf("listReportFilter")>-1){return{changeType:"removeFilterItem",changeOnRelevantContainer:true};}else{return null;}},reveal:{changeType:"revealFilterItem",changeOnRelevantContainer:true}},properties:function(e){return D.ignoreAllProperties(e);},annotations:{},getStableElements:function(v){var c=U.getSmartFilterBarControlConfiguration(v);if(c&&c.data("sap-ui-custom-settings")&&c.data("sap-ui-custom-settings")["sap.ui.dt"]&&c.data("sap-ui-custom-settings")["sap.ui.dt"].annotation){var C=v.getContent();var i;if(C.some(function(e){if(e.getMetadata().getName()==="sap.m.Select"||e.getMetadata().getName()==="sap.m.MultiComboBox"||e.getMetadata().getName()==="sap.m.MultiInput"){i=e.getId();return true;}})){return[i];}}}};default:return{actions:null};}},childNames:{plural:function(){return r.getText("FE_SELECTIONFIELDS");},singular:function(){return r.getText("FE_SELECTIONFIELD");}},actions:{move:"moveFilterItems"}}},properties:function(e){return _(e);},annotations:{text:{ignore:true},textArrangement:{ignore:true},fieldGroup:{ignore:true},filterFacet:{ignore:true},filterLabelOnLineItem:{ignore:true},filterHidden:{ignore:true},selectionBVariant:{ignore:true},selectionFields:{ignore:true},filterVisible:{ignore:true},filterLabelOnProperty:{ignore:true},filterRestrictions:{ignore:true},valueList:{ignore:true},valueListWithFixedValues:{ignore:true},hidden:{ignore:true},hiddenFilter:{ignore:true},filterExpression:{ignore:true},FilterRestrictions:{ignore:true},FilterDefaultValue:{ignore:true}}}};});

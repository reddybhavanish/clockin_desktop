sap.ui.define(["./BaseAPI","sap/fe/test/Utils","sap/fe/test/builder/HeaderBuilder","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder","sap/fe/test/builder/OverflowToolbarBuilder","sap/fe/core/helpers/StableIdHelper"],function(B,U,H,O,F,a,S){"use strict";var b=function(h,v){if(!U.isOfType(h,H)){throw new Error("oHeaderBuilder parameter must be a HeaderBuilder instance");}return B.call(this,h,v);};b.prototype=Object.create(B.prototype);b.prototype.constructor=b;b.prototype.createOverflowToolbarBuilder=function(o){return a.create(this.getOpaInstance()).hasType("sap.m.OverflowToolbar").check(function(c){return c.some(function(d){return(d.getParent().getMetadata().getName()==="sap.uxap.ObjectPageDynamicHeaderTitle"&&d.getParent().getParent().getMetadata().getName()==="sap.uxap.ObjectPageLayout"&&d.getParent().getParent().getId()===o);});});};b.prototype.getObjectPageDynamicHeaderTitleBuilder=function(o){return O.create(this.getOpaInstance()).hasType("sap.uxap.ObjectPageDynamicHeaderTitle").has(O.Matchers.ancestor(o,true));};b.prototype.getObjectPageDynamicHeaderContentBuilder=function(h){return O.create(this.getOpaInstance()).hasId(h);};b.prototype.getFieldGroupFieldId=function(f,v){var i="fe::HeaderFacet";i+="::Form";i+="::"+S.prepareId(f.fieldGroup);i+="::DataField";i+="::"+f.field;i+="::Field";i=S.prepareId(i);return v?v+"--"+i:i;};b.prototype.createPaginatorBuilder=function(m,A,s){return F.create(this.getOpaInstance()).hasType("sap.uxap.ObjectPageHeaderActionButton").has(m).hasState(s).has(O.Matchers.ancestor(A,false));};return b;});

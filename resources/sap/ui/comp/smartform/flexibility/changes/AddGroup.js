/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/base/Log","sap/ui/fl/changeHandler/Base","sap/ui/core/util/reflection/JsControlTreeModifier"],function(L,B,J){"use strict";var A={};A.applyChange=function(c,f,p){var m=p.modifier;var a=p.appComponent;var v=p.view;var C=c.getDefinition();if(C.texts&&C.texts.groupLabel&&C.texts.groupLabel.value&&C.content&&C.content.group&&(C.content.group.selector||C.content.group.id)){var l=C.texts.groupLabel.value;var i=C.content.group.index;var g=C.content.group.selector;var G=m.createControl("sap.ui.comp.smartform.Group",a,v,C.content.group.selector||C.content.group.id);if(!g){g=m.getSelector(C.content.group.id,a);}c.setRevertData({newGroupSelector:g});m.setProperty(G,"visible",true);m.setProperty(G,"label",l);m.insertAggregation(f,"groups",G,i,v);}else{L.error("Change does not contain sufficient information to be applied: ["+C.layer+"]"+C.namespace+"/"+C.fileName+"."+C.fileType);}};A.completeChangeContent=function(c,s,p){var C=c.getDefinition();var a=p.appComponent;if(s.newLabel){B.setTextInChange(C,"groupLabel",s.newLabel,"XFLD");}else{throw new Error("oSpecificChangeInfo.groupLabel attribute required");}if(!C.content){C.content={};}if(!C.content.group){C.content.group={};}if(s.index===undefined){throw new Error("oSpecificChangeInfo.index attribute required");}else{C.content.group.index=s.index;}if(s.newControlId){C.content.group.selector=J.getSelector(s.newControlId,a);}else{throw new Error("oSpecificChangeInfo.newControlId attribute required");}};A.revertChange=function(c,f,p){var a=p.appComponent;var v=p.view;var m=p.modifier;var g=c.getRevertData().newGroupSelector;var G=m.bySelector(g,a,v);m.removeAggregation(f,"groups",G);m.destroy(G);c.resetRevertData();return true;};return A;},true);

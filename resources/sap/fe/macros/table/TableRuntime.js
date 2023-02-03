/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/model/json/JSONModel","sap/fe/macros/CommonHelper","sap/fe/core/CommonUtils","sap/fe/core/library"],function(J,C,a,F){"use strict";var b=F.CreationMode;var T={onSelectionChange:function(e){var c=e.getSource(),s=c.getId(),t=sap.ui.getCore().byId(s.slice(0,s.lastIndexOf(":")-1));t.data("quickFilterKey",c.getSelectedKey());t.rebindTable();},displayTableSettings:function(e){var p=e.getSource().getParent(),s=sap.ui.getCore().byId(p.getId()+"-settings");C.fireButtonPress(s);},executeConditionalActionShortcut:function(B,s){var p=s.getParent();if(B!==b.CreationRow){var o=p.getActions().find(function(e){return e.getId().endsWith(B);});C.fireButtonPress(o);}else{var c=p.getAggregation("creationRow");if(c&&c.getApplyEnabled()&&c.getVisible()){c.fireApply();}}},setContexts:function(t,m,p,d,D,c,A){var e=A?A.split(","):[];var o=JSON.parse(c);var s=t.getSelectedContexts();var f=false;var g=[];var u=[];var l=[];var L={};var M;var h="/$contexts/"+p;var j=t.getModel(m);if(!j){j=new J();t.setModel(j,"$contexts");}L.aUnsavedContexts=[];L.aLockedContexts=[];j.setProperty("/$contexts",{});j.setProperty(h,{selectedContexts:s,numberOfSelectedContexts:s.length,deleteEnabled:true,deletableContexts:[],unSavedContexts:[],lockedContexts:[]});for(var i=0;i<s.length;i++){var S=s[i];var k=S.getObject();for(var n in k){if(n.indexOf("#")===0){var q=n;q=q.substring(1,q.length);M=j.getProperty(h);M[q]=true;j.setProperty(h,M);}}M=j.getProperty(h);if(d!="undefined"){if(S.getProperty(d)){if(D!=="undefined"&&k.IsActiveEntity===true&&k.HasDraftEntity===true){L=r(k,S);}else{g.push(S);L.isDeletable=true;}}M["deleteEnabled"]=L.isDeletable;}else if(D!=="undefined"&&k.IsActiveEntity===true&&k.HasDraftEntity===true){L=r(k,S);}else{g.push(S);}}function r(k,S){if(k.DraftAdministrativeData.InProcessByUser){l.push(S);}else{u.push(S);f=true;}return{aLockedContexts:l,aUnsavedContexts:u,isDeletable:f};}this.setActionEnablement(j,o,h,s);if(s.length>1){this.disableAction(j,e,h);}M["deletableContexts"]=g;M["unSavedContexts"]=L.aUnsavedContexts;M["lockedContexts"]=L.aLockedContexts;M["controlId"]=t.getId();j.setProperty(h,M);},setActionEnablement:function(c,A,s,S){return a.setActionEnablement(c,A,s,S);},disableAction:function(c,A,s){A.forEach(function(d){c.setProperty(s+"/"+d,false);});}};return T;},true);

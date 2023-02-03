/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2020 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","sap/ui/model/odata/v4/AnnotationHelper","sap/fe/core/CommonUtils","sap/ui/mdc/library"],function(L,O,C,m){"use strict";var F=m.FilterBarP13nMode;var A={getQuickFilterText:function(c,a,e){var q=c.getModel(1).getObject(e+"/@"+a);return q.Text;},getFilterBarP13nMode:function(v){var p=[],P=v.variantManagement&&v.variantManagement!=="None";if(v.controlConfiguration&&v.controlConfiguration["@com.sap.vocabularies.UI.v1.SelectionFields"]&&v.controlConfiguration["@com.sap.vocabularies.UI.v1.SelectionFields"].filterBarSettings&&v.controlConfiguration["@com.sap.vocabularies.UI.v1.SelectionFields"].filterBarSettings.personalization!==undefined){P=v.controlConfiguration["@com.sap.vocabularies.UI.v1.SelectionFields"].filterBarSettings.personalization;}if(typeof P==="object"){if(P.item){p.push(F.Item);}if(P.value){p.push(F.Value);}}else{p=P?[F.Item,F.Value]:[];}return p.length>0?p.join(","):undefined;},getSelectionMode:function(v,a,i,d,V){var s=(v.controlConfiguration&&v.controlConfiguration[a]&&v.controlConfiguration[a]["tableSettings"]&&v.controlConfiguration[a]["tableSettings"]["selectionMode"])||"Multi";if(this.checkForActions(V)){return s;}else if(d){if(i){return"{= ${ui>/editMode} === 'Editable' ? '"+s+"' : 'None'}";}else{return s;}}return"None";},getTargetContext:function(t){var T=t.getObject(t.getPath()),n=O.getNavigationPath(t.getPath());return n+"/"+T;},getFormContext:function(t){var a=t.getObject(),n=O.getNavigationPath(a),s,T;if(n){s=O.getNavigationPath(t.getPath());T=t.getModel().getObject(s+"/"+n+"/@sapui.name");return"/"+T+a.replace(n,"");}return t.getPath();},getNavigationContext:function(c){return O.getNavigationPath(c.getPath());},replaceSpecialCharsInId:function(i){if(i.indexOf(" ")>=0){L.error("Annotation Helper: Spaces are not allowed in ID parts. Please check the annotations, probably something is wrong there.");}return i.replace(/@/g,"").replace(/\//g,"::").replace(/#/g,"::");},createBindingForDraftAdminBlock:function(M,e,f){var p="/"+e+"/DraftAdministrativeData/";return M.requestObject(p).then(function(d){var b="{parts: [{path: 'InProcessByUser'}, "+"{path: 'LastChangedByUser'} ";if(d.InProcessByUserDescription){b+=" ,{path: 'InProcessByUserDescription'}";}if(d.LastChangedByUserDescription){b+=", {path: 'LastChangedByUserDescription'}";}b+="], formatter: '.editFlow."+f+"'}";return b;});},getBindingForDraftAdminBlockInline:function(c,e){return A.createBindingForDraftAdminBlock(c.getModel(),e,"formatDraftOwnerTextInline");},getBindingForDraftAdminBlockInPopover:function(c,e){return A.createBindingForDraftAdminBlock(c.getModel(),e,"formatDraftOwnerTextInPopover");},checkForActions:function(l){var o;for(var i=0;i<l.length;i++){o=l[i];if((o["$Type"]==="com.sap.vocabularies.UI.v1.DataFieldForAction"||(o["$Type"]==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"&&o.RequiresContext&&(o.RequiresContext===true||o.RequiresContext.Bool==="true")))&&!(o.Inline&&o.Inline.Bool!=="true")){return true;}}return false;},hasDeterminingActions:function(e){var d=e["@com.sap.vocabularies.UI.v1.LineItem"];for(var i in d){if(d[i].$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"&&d[i].Determining===true){return true;}}return false;},getNavigationInsertableRestrictions:function(c,s,r,I,b){var i,n,p="";for(i in r){n=r[i];if(n.NavigationProperty.$NavigationPropertyPath===s&&n.InsertRestrictions){if(n.InsertRestrictions.Insertable&&n.InsertRestrictions.Insertable.$Path){if(b){p=c.$Partner+"/";}return("{= ${"+p+n.InsertRestrictions.Insertable.$Path+"}  && ${ui>/editMode} === 'Editable' }");}return n.InsertRestrictions.Insertable?"{= ${ui>/editMode} === 'Editable' }":false;}}if(I&&I.$Path&&I.$Path.indexOf("/")>-1){if(b){s="";}else{s=s+"/";}return"{=  ${ui>/editMode} === 'Editable' && ${"+s+I.$Path+"}}";}return"{= "+(I!==false)+" && ${ui>/editMode} === 'Editable'}";},isNavigationPropertyDeletable:function(c,r,d){var i,n;for(i in r){n=r[i];if(n.NavigationProperty.$NavigationPropertyPath===c&&n.DeleteRestrictions){return n.DeleteRestrictions.Deletable;}}return"{= "+(d!==false)+" && ${ui>/editMode} === 'Editable'}";},showFooter:function(d,c){var h="";var s;var H=[];for(var i in d){var D=d[i];if(D.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"&&D.Determining===true){if(!D["@com.sap.vocabularies.UI.v1.Hidden"]){return true;}else if(D["@com.sap.vocabularies.UI.v1.Hidden"].$Path){if(H.indexOf(D["@com.sap.vocabularies.UI.v1.Hidden"].$Path)===-1){H.push(D["@com.sap.vocabularies.UI.v1.Hidden"].$Path);}}}}if(H.length){for(var a in H){if(H[a]){s="(%{"+H[a]+"} === true ? false : true )";}if(a==H.length-1){h=h+s;}else{h=h+s+"||";}}return("{= "+h+(c?" || ${ui>/editMode} === 'Editable' ":" ")+"|| ${localUI>/showMessageFooter} === true}");}else{return("{= "+(c?"${ui>/editMode} === 'Editable' || ":"")+"${localUI>/showMessageFooter} === true}");}},getChartVisualizationPath:function(v){var i,V,a;var b=v.getObject("");for(i in b){V=b[i];a=V.$AnnotationPath;if(a.indexOf("@com.sap.vocabularies.UI.v1.Chart")>-1){return v.getPath()+"/"+i;}}},getFirstVisualizationPath:function(v){return v.getPath()+"/"+"0";},getPVChartPath:function(a,I){var c=I.context,p=c.getPath();if(c.getObject(p+"/@sapui.name")==="@com.sap.vocabularies.UI.v1.PresentationVariant"){var P=c.getObject(p);if(P&&P.Visualizations){var v=P.Visualizations;for(var i=0;i<v.length;i++){if(v[i].$AnnotationPath.indexOf("@com.sap.vocabularies.UI.v1.Chart")!==-1){return c.getObject(p+"/Visualizations/"+i+"/$AnnotationPath/@sapui.name").replace(RegExp(".*\\."),"");}}}}},getActionContext:function(a){return C.getActionPath(a,true);},getPathToBoundActionOverload:function(a){var p=C.getActionPath(a,true);return p+"/@$ui5.overload/0";}};A.getQuickFilterText.requiresIContext=true;A.getBindingForDraftAdminBlockInline.requiresIContext=true;A.getBindingForDraftAdminBlockInPopover.requiresIContext=true;return A;},true);

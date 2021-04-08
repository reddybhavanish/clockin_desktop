/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2018 SAP SE. All rights reserved
 */
sap.ui.define(['sap/apf/ui/utils/helper','sap/apf/core/constants','sap/ui/core/mvc/Controller','sap/apf/ui/utils/constants','sap/suite/ui/commons/ChartContainerContent','sap/suite/ui/commons/ChartContainerToolbarPlaceholder','sap/ui/core/Icon','sap/ui/core/CustomData','sap/m/Link','sap/m/ToggleButton','sap/m/Label','sap/m/Button','sap/m/ToolbarSpacer','sap/m/List','sap/m/ListMode','sap/m/ListSeparators','sap/m/StandardListItem','sap/m/Popover','sap/m/PlacementType','sap/apf/utils/trace'],function(H,C,B,a,b,c,I,d,L,T,e,f,g,h,k,l,S,P,m,t){"use strict";var o,u,A,r=false;function _(){var R=A.getSelectedRepresentation();return(R.type===a.representationTypes.TABLE_REPRESENTATION);}function n(){var R=A.getSelectedRepresentation();return(R.type===a.representationTypes.TREE_TABLE_REPRESENTATION);}function p(){if(A.getSelectedRepresentation().bIsAlternateView===undefined||A.getSelectedRepresentation().bIsAlternateView===false){return false;}return true;}function q(i){var R=i.getCurrentRepresentation();var j=R.getParameter().requiredFilters;if(j===undefined||j.length===0){return undefined;}return j[0];}function s(i){t.logCall("StepContainer._setChartContainerContent");var j=i.byId("idChartContainer");var R=i.getCurrentRepresentation();var U=A.longTitle&&!o.isInitialTextKey(A.longTitle.key)?A.longTitle:A.title;var V=o.getTextNotHtmlEncoded(U);t.log("_setChartContainerContent"," title=",V);var W=R.getMainContent(V);var X={onBeforeRendering:function(){}};W.addEventDelegate(X);j.removeAllContent();var Y=new b({content:W});j.addContent(Y);t.logReturn("_setChartContainerContent");}function v(i,j){var R=i.byId("idSelectedText");var U=i.getCurrentRepresentation();var V=N(i);var W=U.getSelectionFilterLabel();var X=W+" ("+V+") ";var Y=i.byId("idSelPropertyAndCount");if(!Y){Y=new L({id:i.createId("idSelPropertyAndCount"),press:i.handlePressSelectedPropertyCountLink.bind(i)});Y.addAriaLabelledBy(R.getId());}else{if(Y&&(U.chart!==undefined)&&(U.chart!==null&&U.chart.setFocusOnSelectLink)){U.chart.detachEvent("setFocusOnSelectedLinkEvent",U.chart.setFocusOnSelectLink);}}if(Y&&(U.chart!==undefined)&&(U.chart!==null)){U.chart.setFocusOnSelectLink=function(){Y.focus();};}Y.setVisible(true);Y.setText(X);j.addContent(Y);j.onAfterRendering=function(){if(Y&&(U.chart!==undefined)&&(U.chart!==null)){U.chart.fireEvent("setFocusOnSelectedLinkEvent");U.chart.detachEvent("setFocusOnSelectedLinkEvent",U.chart.setFocusOnSelectLink);}};}function w(i){var j=i.byId("idChartContainer");j.removeAllCustomIcons();x(i);y(i);z(i);}function x(j){var R=j.byId("idChartContainer");var U=A.getSelectedRepresentationInfo();var V;if(U.parameter&&U.parameter.orderby){var W=U.parameter.orderby;new H(o).getRepresentationSortInfo(U).done(function(Z){for(var i=0;i<Z.length;i++){V=W[0].property;}var $=(W[0].ascending==true)?"Sort Order: Ascending":"Sort Order: Descending";var X=o.getTextNotHtmlEncoded(U.label)+"\n"+((V!==undefined)?o.getTextNotHtmlEncoded("sortBy")+": "+V:"")+"\n"+$;var Y=new I({src:U.picture,tooltip:X,press:function(a1){j.handlePressChartIcon(a1);}});R.addCustomIcon(Y);});}else{var X=o.getTextNotHtmlEncoded(U.label)+"\n"+((V!==undefined)?o.getTextNotHtmlEncoded("sortBy")+": "+V:"");var Y=new I({src:U.picture,tooltip:X,press:function(i){j.handlePressChartIcon(i);}});R.addCustomIcon(Y);}}function y(i){var j=i.byId("idChartContainer");var R=o.getTextNotHtmlEncoded("listView");var U=new sap.ui.core.Icon({src:"sap-icon://table-view",tooltip:R,press:i.handlePressAlternateRepIcon.bind(i)});var V=i.getCurrentRepresentation();var W=V.type;if(_()||n()||W=="TableRepresentation"){j.removeCustomIcon(U);return;}j.addCustomIcon(U);}function z(i){if((i.getCurrentRepresentation().topN!==undefined)||(!p()&&!_())||(n())){return;}var j=i.byId("idChartContainer");var R=o.getTextNotHtmlEncoded("view-Settings-Button");var U=new I({src:"sap-icon://drop-down-list",tooltip:R,press:function(){i.getCurrentRepresentation().getViewSettingDialog().open();}});j.addCustomIcon(U);}function D(i,j){var R=i.byId("idSelectedText");if(!R){R=new e({id:i.createId("idSelectedText"),text:o.getTextNotHtmlEncoded("selectedValue")});}R.setVisible(true);j.addContent(R);}function E(i,j){var R=i.byId("idReset");if(!R){R=new f({text:o.getTextNotHtmlEncoded("reset"),id:i.createId("idReset"),type:"Transparent",press:i.handlePressResetButton.bind(i)}).addStyleClass("chartContainerResetStyle");}R.setVisible(true);j.addContent(R);}function F(i,j){var R=N(i);if(R>0&&q(i)!==undefined){D(i,j);v(i,j);E(i,j);}}function G(i,j){var R=i.byId("idPathFilterDisplayButton");if(!R){R=new f({text:o.getTextNotHtmlEncoded("pathFilterDisplayButton"),id:i.createId("idPathFilterDisplayButton"),icon:"sap-icon://message-information",type:"Transparent",press:function(){if(i.byId("idStepLayout").getBusy()===false){o.getPathFilterInformation().then(function(U){var V=new sap.ui.xmlview({viewName:"sap.apf.ui.reuse.view.pathFilterDisplay",viewData:{pathFilterInformation:U,oCoreApi:o,oUiApi:u},id:i.createId("pathFilterDisplay")});V.getContent()[0].open();});}}});}j.addContent(R);}function J(i,j){var R=i.getCurrentRepresentation();var U=R.type;var V=undefined;var W=false;if(U!=="TableRepresentation"&&U!=="listView"&&U!=="TreeTableRepresentation"){if(R.chart!==undefined){if(Object.getOwnPropertyNames(R.chart).length!==0){V=R.chart.vizSelection();W=R.chart.getVizProperties().plotArea.dataLabel.visible;}}if(R!==undefined){if(R.aDataResponse!==0){var X=i.byId("idToggleDisplayButton");if(!X){X=new sap.m.ToggleButton({id:i.createId("idToggleDisplayButton"),pressed:false,text:o.getTextNotHtmlEncoded("values"),tooltip:o.getTextNotHtmlEncoded("displayValues"),press:i.handleToggleDisplay.bind(i)});}else{R=i.getCurrentRepresentation();X.setPressed(W);}if(V!==undefined){i.getCurrentRepresentation().chart.vizSelection(V,{clearSelection:false});}j.addContent(X);}}}}function K(i){var j=i.byId("idChartContainer");var R=j.getToolbar();R.removeAllContent();var U=new e({text:o.getTextNotHtmlEncoded("currentStep")});R.addContent(U);var V=new g();R.addContent(V);J(i,R);F(i,R);G(i,R);R.addContent(new c());j.setToolbar(R);}function M(i,A,j){t.logCall("StepContainer._drawChartContainer",", isActiveStep=",j,", oActiveStep=",A);if(A!==undefined){s(i);w(i);K(i);}t.logReturn("_drawChartContainer");}function N(i){var j=i.getCurrentRepresentation();var R=j.getSelections().length;return R;}function O(R,U){var V=new h({mode:k.SingleSelectMaster,showSeparators:l.None,includeItemInSelection:true,selectionChange:R.handleSelectionChartSwitchIcon.bind(R)});var W;var X;for(var j=0;j<A.getRepresentationInfo().length;j++){X=A.getRepresentationInfo()[j];W=undefined;if(X.parameter&&X.parameter.orderby){new H(o).getRepresentationSortInfo(X).done(function(a1){var b1=[];for(var i=0;i<a1.length;i++){a1[i].done(function(c1){b1.push(c1);});}W=b1.join(", ");var Y=W!==undefined?o.getTextNotHtmlEncoded("sortBy")+": "+W:"";var Z=new S({description:Y,icon:X.picture,title:o.getTextNotHtmlEncoded(X.label),customData:[new d({key:'data',value:{oRepresentationType:X,icon:X.picture}})]});V.addItem(Z);});}else{var Y=W!==undefined?o.getTextNotHtmlEncoded("sortBy")+": "+W:"";var Z=new S({description:Y,icon:X.picture,title:o.getTextNotHtmlEncoded(X.label),customData:[new d({key:'data',value:{oRepresentationType:X,icon:X.picture}})]});V.addItem(Z);}}if(!R.byId("idAllChartPopover")){var $=new P({id:R.createId("idAllChartPopover"),placement:m.Bottom,showHeader:false,content:[V],afterClose:function(){$.destroy();}});}R.byId("idAllChartPopover").openBy(U);}function Q(i,j){i.byId("idReset").setVisible(j);i.byId("idSelPropertyAndCount").setVisible(j);i.byId("idSelectedText").setVisible(j);}return B.extend("sap.apf.ui.reuse.controller.stepContainer",{onInit:function(){var i=this;o=i.getView().getViewData().oCoreApi;u=i.getView().getViewData().uiApi;A=o.getActiveStep();this.initialText=new e({id:this.createId("idInitialText")}).addStyleClass('initialText');this.initialText.setText(o.getTextNotHtmlEncoded('initialText'));},onAfterRendering:function(){jQuery(u.getStepContainer().getDomRef()).hide();if(jQuery("#"+this.initialText.getId()).length===0&&o.getSteps().length===0){jQuery('#'+u.getStepContainer().getId()).parent().append(sap.ui.getCore().getRenderManager().getHTML(this.initialText));}else if(o.getSteps().length>0){jQuery(u.getStepContainer().getDomRef()).show();}if(u.getAnalysisPath().getController().isOpenPath){jQuery(".initialText").remove();}},getCurrentRepresentation:function(){var i=A.getSelectedRepresentation();if(p()){i=A.getSelectedRepresentation().toggleInstance;}return i;},handlePressSelectedPropertyCountLink:function(){var i=this;i.oCoreApi=o;var j=new sap.ui.jsfragment("idSelectionDisplayFragment","sap.apf.ui.reuse.fragment.selectionDisplay",i);j.open();},handleToggleDisplay:function(){var i=this;i.oCoreApi=o;var R=i.getCurrentRepresentation();var j=i.byId("idToggleDisplayButton");if(R.measures!==undefined){var U=R.getFormatStringForMeasure(R.measures[0]);if(R.type==="PieChart"){R.chart.setVizProperties({plotArea:{dataLabel:{visible:j.getPressed(),type:"percentage"}}});}else{R.chart.setVizProperties({plotArea:{dataLabel:{visible:j.getPressed(),formatString:U}}});}return R.chart.getVizProperties().plotArea.dataLabel.visible;}var V=R.chartPlotArea.plotArea.dataLabel.visible;V=j.getPressed();return V;},handlePressResetButton:function(){var i=this;if(p()){i.getCurrentRepresentation().removeAllSelection();}i.getCurrentRepresentation().removeAllSelection();Q(i,false);},createToggleRepresentationInstance:function(R,j){var U={};function V(Z){var $=Z.dimensions;var Y=R.getMetaData();Z.isAlternateRepresentation=true;if(Y===undefined){return Z;}var i,a1;for(i=0;i<$.length;i++){var b1=Y.getPropertyMetadata($[i].fieldName).hasOwnProperty('text');if(b1&&$[i].labelDisplayOption===C.representationMetadata.labelDisplayOptions.KEY_AND_TEXT){a1={};a1.fieldName=Y.getPropertyMetadata($[i].fieldName).text;Z.dimensions.splice(i+1,0,a1);}else if(b1&&$[i].labelDisplayOption===C.representationMetadata.labelDisplayOptions.TEXT){a1={};a1.fieldName=Y.getPropertyMetadata($[i].fieldName).text;Z.dimensions.splice(i,1,a1);}}return Z;}var W=jQuery.extend(true,{},R.getParameter());delete W.alternateRepresentationTypeId;delete W.alternateRepresentationType;W=V(W);if(j){W.orderby=j;}U=o.createRepresentation(R.getParameter().alternateRepresentationType.constructor,W);var X=R.getData(),Y=R.getMetaData();if(X!==undefined&&Y!==undefined){U.setData(X,Y);}return U;},handlePressAlternateRepIcon:function(){var i=this;var j=A.getSelectedRepresentation();j.bIsAlternateView=true;if(p()){j.toggleInstance=i.createToggleRepresentationInstance(j);}r=true;i.getView().getViewData().uiApi.selectionChanged(true);},handlePressChartIcon:function(i){var j=this;var R=A.getSelectedRepresentation();var U=o.getSteps().indexOf(A);var V=null;if(A.getRepresentationInfo().length>1){V=i.getParameter("controlReference");O(j,V);}else{R.bIsAlternateView=false;r=true;j.getView().getViewData().uiApi.selectionChanged(true);R.createDataset();j.drawStepContent();u.getAnalysisPath().getController().updateCustomListView(A,U,false);}},handleSelectionChartSwitchIcon:function(i){this.byId("idAllChartPopover").close();var j=A.getSelectedRepresentation();var R=i.getParameter("listItem").getCustomData()[0].getValue();var U=A.getSelectedRepresentationInfo().representationId;var V=R.oRepresentationType.representationId;if(U===V&&j.bIsAlternateView===false){return;}r=true;j.bIsAlternateView=false;A.setSelectedRepresentation(R.oRepresentationType.representationId);u.getAnalysisPath().getController().refresh(R.nActiveStepIndex);o.updatePath(u.getAnalysisPath().getController().callBackForUpdatePath.bind(u.getAnalysisPath().getController()));j.createDataset();},drawStepContent:function(i,j){t.logCall("StepContainer.drawStepContent"," bStepUpdated="+i);var R=this;var U=false;var V=A;A=o.getActiveStep();if(A===undefined){t.logReturn("drawStepContent",", the active step === undefined");return;}if(V!==A){U=true;}if(i||r||U){M(R,A,j);}else{K(R);}r=false;R.initialText.destroy();R.byId("idStepLayout").setBusy(false);t.logReturn("drawStepContent",", bIsActiveStepChanged",U);}});},true);

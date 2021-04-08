// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(['sap/base/Log'],function(L){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.SearchFacetDialogHelperCharts');var m=sap.ushell.renderers.fiori2.search.SearchFacetDialogHelperCharts={};jQuery.extend(m,{init:function(d){this.dialog=d;},getBarChartPlaceholder:function(){var t=this;var c;c=new sap.suite.ui.microchart.ComparisonMicroChart({height:"90%",width:"100%",colorPalette:"",tooltip:""});c.addStyleClass('largeChart1barchart');var b=new sap.ui.model.Filter("value",sap.ui.model.FilterOperator.GT,0);var B={path:"items",factory:function(i,C){var o=new sap.suite.ui.microchart.ComparisonMicroChartData({title:'{label}',value:'{value}',color:{path:'selected',formatter:function(v){var r=sap.m.ValueColor.Good;if(!v){r=sap.m.ValueColor.Neutral;}return r;}},displayValue:'{valueLabel}',press:function(e){t.dialog.onDetailPageSelectionChangeCharts(e);}});return o;},filters:[b]};c.bindAggregation("data",B);c.setBusyIndicatorDelay(0);return c;},testWhetherPieWedgeOrLabelIsDummy:function(E){var r=false;var l="";var p=0,a=0;try{l=JSON.stringify(E.getParameters().data[0].data).split("\"")[3];p=l.match(/\d+/g)[0];a=l.match(/\d+/g)[1];if(l===sap.ushell.resources.i18n.getText("facetPieChartOverflowText2",[p,a])){r=true;}else if(l===sap.ushell.resources.i18n.getText("facetPieChartOverflowText2",[a,p])){r=true;}}catch(e){}return r;},getPieChartPlaceholder2:function(){var t=this;var c;c=new sap.viz.ui5.controls.VizFrame({width:"100%",vizType:"info/pie",selectData:function(e){if(!t.testWhetherPieWedgeOrLabelIsDummy(e)){t.dialog.onDetailPageSelectionChangeCharts(e);}},deselectData:function(e){if(!t.testWhetherPieWedgeOrLabelIsDummy(e)){t.dialog.onDetailPageSelectionChangeCharts(e);}}});c.attachRenderComplete(function(e){var b=[];var I;var s=this.getBindingContext().getObject().items4pie;if(!s){return c;}for(var i=0;i<s.length;i++){I=s[i];if(I.selected===true){b.push({data:{Label:(I.label)}});}}var g={clearSelection:true};c.vizSelection(b,g);var h,k,l;var n,o,q,r;h=e.getSource().sId;n=$("#"+h+" .v-legend-marker").last();o=$("#"+h+" .v-legend-item").last();if(this.getBindingContext().getObject().items4pie[0].percentageMissingInBigPie>0){q=$("#"+h+" .v-legend-item").length-1;r=$("#"+h+" .v-datapoint-group").children();for(var j=0;j<r.length;j++){l=r[j];k=l.getAttribute("data-id");k=parseInt(k,10);if(k===q){l.remove();break;}}n.attr("fill-opacity","0");n.attr("stroke-opacity","1");n.attr("stroke","black");n.attr("stroke-width","0.5");o.unbind();o.off();}var u=$("#"+h+" .v-background-body");u.unbind();u.off();});c.setVizProperties({legendGroup:{linesOfWrap:0,layout:{maxWidth:0.5}},title:{visible:false},interaction:{selectability:{mode:"multiple"}}});c.addStyleClass('largeChart2piechart');var p=new sap.ui.model.Filter("pieReady",sap.ui.model.FilterOperator.EQ,true);var d=new sap.viz.ui5.data.FlattenedDataset({dimensions:[{name:'Label',value:"{label}"}],measures:[{name:'Value',value:'{valueLabel}'}],data:{path:"items4pie",filters:[p]}});var f=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"size",type:"Measure",values:["Value"]});var a=new sap.viz.ui5.controls.common.feeds.FeedItem({uid:"color",type:"Dimension",values:["Label"]});c.setDataset(d);c.addFeed(f);c.addFeed(a);return c;},getPieChartPlaceholder:function(){var t=this;var c;var p={};p.oSearchFacetDialog=t.dialog;c=new sap.ushell.renderers.fiori2.search.controls.SearchFacetPieChart(p);c.addStyleClass('largeChart2piechart');sap.ui.core.ResizeHandler.register(c,function(e){var s=0;var a=0;if(e.target.firstChild){s=parseInt(window.getComputedStyle(e.target.firstChild,null).getPropertyValue("transform-origin").split(" ")[0],10);a=(e.size.width/2)-s;e.target.firstChild.style.marginLeft=a+"px";}});return c;},getHeaderWithDropDown:function(t){var a=this;var c=a.getDropDownButton();var l=new sap.m.Label({text:t});var h=new sap.m.Bar({translucent:true,design:sap.m.BarDesign.Header,contentMiddle:[l,c]});h.addStyleClass("sapUshellSearchFacetDialogTabBarHeader");return h;},setDummyTabBarItems:function(c){c.tabBarItems=[new sap.m.IconTabFilter({text:sap.ushell.resources.i18n.getText("facetList"),icon:"sap-icon://list",key:'list'+arguments[0]}),new sap.m.IconTabFilter({text:sap.ushell.resources.i18n.getText("facetBarChart"),icon:"sap-icon://horizontal-bar-chart",key:'barChart'+arguments[0]}),new sap.m.IconTabFilter({text:sap.ushell.resources.i18n.getText("facetPieChart"),icon:"sap-icon://pie-chart",key:'pieChart'+arguments[0]})];c.chartOnDisplayIndex=0;},getDropDownButton:function(c){var b=[];var B;var d=new sap.m.Button({icon:c.tabBarItems[c.chartOnDisplayIndex].getIcon()});for(var i=0;i<c.tabBarItems.length;i++){B=new sap.m.Button({text:c.tabBarItems[i].getText(),icon:c.tabBarItems[i].getIcon(),press:function(E){var g,h;h=E.getSource().sId;g=document.getElementById(h).dataset.facetViewIndex;g=parseInt(g,10);c.chartOnDisplayIndex=g;if(c.chartOnDisplayIndex===0){$(".sapUshellSearchFacetDialogSettingsContainer").css('display','block');}else{$(".sapUshellSearchFacetDialogSettingsContainer").css('display','none');}c.chartOnDisplayIndexByFilterArray[c.facetOnDisplayIndex]=g;var j=c.tabBarItems[c.chartOnDisplayIndex].getIcon();d.setIcon(j);var e=c.tabBarItems[c.chartOnDisplayIndex].getText();var f=sap.ushell.resources.i18n.getText('displayAs',[e]);d.setTooltip(f);var k=$(".sapUshellSearchFacetDialogFacetList")[0];if(k){var F=sap.ui.getCore().byId(k.id);if(!F.getSelectedItem()){F.setSelectedItem(F.getItems()[0]);}F.fireSelectionChange({listItem:F.getSelectedItem()});}c.controlChartVisibility(c,g);}});B.data("facet-view-index",""+i,true);b.push(B);}var a=new sap.m.ActionSheet({showCancelButton:true,buttons:b,placement:sap.m.PlacementType.Bottom,cancelButtonPress:function(){L.info("sap.m.ActionSheet: cancelButton is pressed");}});d.addStyleClass("sapUshellSearchFacetDialogTabBarButton");var e=c.tabBarItems[c.chartOnDisplayIndex].getText();var f=sap.ushell.resources.i18n.getText('displayAs',[e]);d.setTooltip(f);d.attachPress(function(E){a.openBy(this);});return d;},getListContainersForDetailPage:function(){var t,b,p;var r=[];var a=0;var c=440;var s=$(".searchFacetLargeChartContainer");for(var i=0;i<s.length;i++){if(s[i].clientHeight>0){c=s[i].offsetParent.offsetParent.offsetParent.clientHeight;a=i;break;}}var d=$(".searchFacetLargeChartContainer")[a];if(d){var l=sap.ui.getCore().byId(d.id);var S,I,P;I=$('.sapUshellSearchFacetDialogSubheaderToolbar .sapMSF');S=$('.sapUshellSearchFacetDialogSortButton');P=d.firstChild.children;for(var j=0;j<P.length;j++){if(P[j].className){if(P[j].className.match(/sapMList/)){t=P[j];}else if(P[j].className.match(/barchart/)){b=P[j];}else if(P[j].className.match(/piechart/)){p=P[j];}}}r.push(d);r.push(l);r.push(c);r.push(t);r.push(b);r.push(p);r.push(S);r.push(I);}return r;}});return m;});

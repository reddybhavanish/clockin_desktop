/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(['sap/viz/library','./core/BaseChart','./BubbleRenderer'],function(l,B){"use strict";var a=B.extend("sap.viz.ui5.Bubble",{metadata:{library:"sap.viz",aggregations:{general:{type:"sap.viz.ui5.types.RootContainer",multiple:false},title:{type:"sap.viz.ui5.types.Title",multiple:false},legendGroup:{type:"sap.viz.ui5.types.Legend",multiple:false},legend:{type:"sap.viz.ui5.types.legend.Common",multiple:false},sizeLegend:{type:"sap.viz.ui5.types.legend.Common",multiple:false},xyContainer:{type:"sap.viz.ui5.types.XYContainer",multiple:false},dataLabel:{type:"sap.viz.ui5.types.Datalabel",multiple:false},xAxis:{type:"sap.viz.ui5.types.Axis",multiple:false},yAxis:{type:"sap.viz.ui5.types.Axis",multiple:false},background:{type:"sap.viz.ui5.types.Background",multiple:false},plotArea:{type:"sap.viz.ui5.types.Bubble",multiple:false},toolTip:{type:"sap.viz.ui5.types.Tooltip",multiple:false},interaction:{type:"sap.viz.ui5.types.controller.Interaction",multiple:false}},events:{selectData:{},deselectData:{},showTooltip:{deprecated:true},hideTooltip:{deprecated:true},initialized:{}},vizChartType:"viz/bubble"}});return a;});

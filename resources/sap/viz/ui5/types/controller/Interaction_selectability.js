/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(['sap/viz/library','sap/viz/ui5/core/BaseStructuredType'],function(l,B){"use strict";var I=B.extend("sap.viz.ui5.types.controller.Interaction_selectability",{metadata:{library:"sap.viz",properties:{mode:{type:"sap.viz.ui5.types.controller.Interaction_selectability_mode",defaultValue:sap.viz.ui5.types.controller.Interaction_selectability_mode.inclusive},axisLabelSelection:{type:"boolean",defaultValue:true},legendSelection:{type:"boolean",defaultValue:true},plotLassoSelection:{type:"boolean",defaultValue:true},plotStdSelection:{type:"boolean",defaultValue:true},lassoWithCtrlKey:{type:"boolean",defaultValue:false,deprecated:true},dataPointsCacheable:{type:"boolean",defaultValue:true,deprecated:true}}}});return I;});

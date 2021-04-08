/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(['sap/viz/library','sap/viz/ui5/core/BaseStructuredType'],function(l,B){"use strict";var I=B.extend("sap.viz.ui5.types.controller.Interaction",{metadata:{library:"sap.viz",properties:{supportedEventNames:{type:"string[]",defaultValue:['mouseup','mousedown','mousemove','mouseout','mouseover','touchstart'],deprecated:true},enableMouseMove:{type:"boolean",defaultValue:true,deprecated:true},enableMouseOver:{type:"boolean",defaultValue:true,deprecated:true},enableMouseOut:{type:"boolean",defaultValue:true,deprecated:true},supportLassoEvent:{type:"boolean",defaultValue:true,deprecated:true},holdSelection:{type:"boolean",defaultValue:false,deprecated:true},preserveSelectionWhenDragging:{type:"boolean",defaultValue:false,deprecated:true},decorations:{type:"any"},triggers:{type:"any",deprecated:true},handlers:{type:"any",deprecated:true}},aggregations:{selectability:{type:"sap.viz.ui5.types.controller.Interaction_selectability",multiple:false},pan:{type:"sap.viz.ui5.types.controller.Interaction_pan",multiple:false,deprecated:true}}}});return I;});

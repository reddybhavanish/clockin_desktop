/*
 * ! SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";return{annotations:{chart:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Chart",target:["EntityType"],defaultValue:null,since:"1.62.0"},chartDefinitionType:{namespace:"com.sap.vocabularies.UI.v1",annotation:"ChartDefinitionType",target:["EntityType"],whiteList:{properties:["Title","Description","ChartType","Measures","MeasureAttributes"]},defaultValue:null,since:"1.62.0"},chartType:{namespace:"com.sap.vocabularies.UI.v1",annotation:"ChartType",target:["Property"],whiteList:{values:["Pie"]},defaultValue:null,since:"1.62.0"},dataPoint:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPoint",target:["EntityType"],defaultValue:null,since:"1.62.0"},dataPointType:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPointType",target:["EntityType"],whiteList:{properties:["Value","MaximumValue","Criticality"]},defaultValue:null,since:"1.62.0"},currency:{namespace:"Org.OData.Measures.V1",annotation:"ISOCurrency",target:["Property"],defaultValue:null,since:"1.62.0"},unit:{namespace:"Org.OData.Measures.V1",annotation:"Unit",target:["Property"],defaultValue:null,since:"1.62.0"}},customData:{chartQualifier:{type:"string",defaultValue:null,group:["Appearance"],since:"1.62.0"}}};});

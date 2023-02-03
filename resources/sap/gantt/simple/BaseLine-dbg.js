/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define([
	"./BaseShape", "./BaseRectangle", "./RenderUtils"
], function (BaseShape, BaseRectangle, RenderUtils) {
	"use strict";

	/**
	 * Creates and initializes a new BaseLine class.
	 *
	 * @param {string} [sId] ID of the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 *
	 * @class
	 * BaseLine is a basic shape used to create a line connecting two points.
	 *
	 * @extends sap.gantt.simple.BaseShape
	 *
	 * @author SAP SE
	 * @version 1.78.0
	 *
	 * @constructor
	 * @public
	 * @alias sap.gantt.simple.BaseLine
	 */
	var BaseLine = BaseShape.extend("sap.gantt.simple.BaseLine", /** @lends sap.gantt.simple.BaseLine.prototype */ {
		metadata: {
			properties: {

				/**
				 * x1 defines the x-axis coordinate of the line starting point
				 */
				x1: {type: "sap.gantt.SVGLength", defaultValue: 0},

				/**
				 * y1 defines the y-axis coordinate of the line starting point
				 */
				y1: {type: "sap.gantt.SVGLength", defaultValue: 0},

				/**
				 * x2 defines the x-axis coordinate of the line ending point
				 */
				x2: {type: "sap.gantt.SVGLength", defaultValue: 0},

				/**
				 * y2 defines the y-axis coordinate of the line ending point
				 */
				y2: {type: "sap.gantt.SVGLength", defaultValue: 0}
			}
		}
	});

	BaseLine.prototype.applySettings = function(mSettings, oScope) {
		BaseShape.prototype.applySettings.apply(this, arguments);
		this.oDelegator = new BaseRectangle({}, oScope);
	};

	var mAttributes = ["x1", "y1", "x2", "y2", "stroke", "stroke-width", "transform", "style"];

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	BaseLine.prototype.getX1 = function() {
		var vValue = this.getProperty("x1");
		if (vValue || vValue === 0) {
			return vValue;
		}
		return this.oDelegator.getX();
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	BaseLine.prototype.getY1 = function() {
		var vValue = this.getProperty("y1");
		if (vValue || vValue === 0) {
			return vValue;
		}
		return this.oDelegator.getRowYCenter();
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	BaseLine.prototype.getX2 = function () {
		var vValue = this.getProperty("x2");
		if (vValue || vValue === 0) {
			return vValue;
		}
		var iWidth = this.oDelegator.getWidth();
		return this.getX1() + iWidth;
	};

	/*
	 * @see JSDoc generated by SAPUI5 control API generator
	 */
	BaseLine.prototype.getY2 = function () {
		var vValue = this.getProperty("y2");
		if (vValue || vValue === 0) {
			return vValue;
		}
		return this.getY1();
	};

	/**
	 * Generate the CSS styles string
	 *
	 * @returns {string} styles of the shape
	 * @private
	 */
	BaseLine.prototype.getStyle = function() {
		var sInheritedStyle = BaseShape.prototype.getStyle.apply(this, arguments);
		var oStyles = {
			"stroke-dasharray": this.getStrokeDasharray(),
			"fill-opacity": this.getFillOpacity(),
			"stroke-opacity": this.getStrokeOpacity()
		};
		return sInheritedStyle + this.getInlineStyle(oStyles);
	};

	BaseLine.prototype.renderElement = function(oRm, oElement) {
		oRm.write("<line");
		this.writeElementData(oRm);
		oRm.writeClasses(this);
		RenderUtils.renderAttributes(oRm, oElement, mAttributes);
		oRm.write(">");
		RenderUtils.renderTooltip(oRm, oElement);
		oRm.write("</line>");

		BaseShape.prototype.renderElement.apply(this, arguments);
	};

	return BaseLine;
}, true);

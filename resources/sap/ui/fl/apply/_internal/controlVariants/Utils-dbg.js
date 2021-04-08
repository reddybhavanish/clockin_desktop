/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/fl/Variant",
	"sap/ui/fl/Utils",
	"sap/ui/core/util/reflection/JsControlTreeModifier"
], function(
	Variant,
	Utils,
	JsControlTreeModifier
) {
	"use strict";

	var VariantsApplyUtil = {
		DEFAULT_AUTHOR: "SAP",

		VARIANT_TECHNICAL_PARAMETER: "sap-ui-fl-control-variant-id",

		compareVariants: function(oVariantData1, oVariantData2) {
			if (oVariantData1.content.content.title.toLowerCase() < oVariantData2.content.content.title.toLowerCase()) {
				return -1;
			} else if (oVariantData1.content.content.title.toLowerCase() > oVariantData2.content.content.title.toLowerCase()) {
				return 1;
			}
			return 0;
		},

		getIndexToSortVariant: function (aVariants, oVariantData) {
			var iSortedIndex = aVariants.length;
			aVariants.some(function (oExistingVariantData, index) {
				if (VariantsApplyUtil.compareVariants(oVariantData, oExistingVariantData) < 0) {
					iSortedIndex = index;
					return true;
				}
			});
			return iSortedIndex;
		},

		/**
		 * Create a variant
		 *
		 * @param {object} mPropertyBag
		 * @param {object} mPropertyBag.variantSpecificData - Property bag (nvp) holding the variant information (see sap.ui.fl.Variant#createInitialFileContentoPropertyBag).
		 * The property "mPropertyBag.variantSpecificData.content.packageName" is set to $TMP internally since flex changes are always local when they are created.
		 * @param {sap.ui.fl.variants.VariantModel} mPropertyBag.model - Variant model
		 * @param {string} mPropertyBag.appVersion - App Version
		 * @returns {sap.ui.fl.Variant} the created variant
		 * @public
		 */
		createVariant: function(mPropertyBag) {
			var oVariant;
			var oVariantFileContent;
			var sVMReference = mPropertyBag.variantSpecificData.content.variantManagementReference;

			if (sVMReference) {
				var bValidId = JsControlTreeModifier.checkControlId(sVMReference, mPropertyBag.model.oAppComponent);
				if (!bValidId) {
					throw new Error("Generated ID attribute found - to offer flexibility a stable VariantManagement ID is needed to assign the changes to, but for this VariantManagement control the ID was generated by SAPUI5 " + sVMReference);
				}
			}

			mPropertyBag.variantSpecificData.content.reference = mPropertyBag.model.sFlexReference; //in this case the component name can also be the value of sap-app-id
			mPropertyBag.variantSpecificData.content.packageName = "$TMP"; // first a flex change is always local, until all changes of a component are made transportable

			// fallback in case no application descriptor is available (e.g. during unit testing)
			mPropertyBag.variantSpecificData.content.validAppVersions = Utils.getValidAppVersions(
				mPropertyBag.appVersion, mPropertyBag.variantSpecificData.developerMode, mPropertyBag.variantSpecificData.scenario
			);

			oVariantFileContent = Variant.createInitialFileContent(mPropertyBag.variantSpecificData);
			oVariant = new Variant(oVariantFileContent);

			return oVariant;
		}
	};
	return VariantsApplyUtil;
});
sap.ui.define(["sap/ui/base/Object", "sap/suite/ui/generic/template/js/AnnotationHelper", "sap/suite/ui/generic/template/lib/testableHelper", "sap/base/util/extend"],
		function(BaseObject, AnnotationHelper, testableHelper, extend) {
	"use strict";

	// Class for dealing with view dependencies
	function getMethods(oTemplateContract) {

		function setAllPagesDirty(aExcludeComponentIds){
			aExcludeComponentIds = aExcludeComponentIds || [];
			for (var sId in oTemplateContract.componentRegistry){
				if (aExcludeComponentIds.indexOf(sId) === -1){
					var oComponentRegistryEntry = oTemplateContract.componentRegistry[sId];
					oComponentRegistryEntry.oComponent.setIsRefreshRequired(true);
				}
			}
		}

		/*
		 * Sets parent page to dirty
		 * @param {Object} oComponent - the component which parent shall be set to dirty
		 * @param {String} sEntitySet - only this entity set is set to dirty
		 * @param {Integer} iLevel - Number of components to be set as dirty
		 */
		function setParentToDirty(oComponent, sEntitySet, iLevel) {
			var sMyId = oComponent.getId();
			var oComponentRegistryEntry = oTemplateContract.componentRegistry[sMyId];
			var oTreeNode = oTemplateContract.mRoutingTree[oComponentRegistryEntry.route];
			for (var i = 0; (!iLevel || i < iLevel) && oTreeNode.level > 0; i++){
				var oParentNode = oTemplateContract.mRoutingTree[oTreeNode.parentRoute];  
				if (oParentNode.componentId){
					var oParentComponent = oTemplateContract.componentRegistry[oParentNode.componentId].oComponent;
					setMeToDirty(oParentComponent, sEntitySet);
				}
				oTreeNode = oParentNode;
			}
		}


		/*
		 * Sets the specified page to dirty
		 * @param {Object} oComponent - the component that shall be set to dirty
		 * @param {String} sEntitySet - only this navigation property is set to dirty
		 */
		function setMeToDirty(oComponent, sEntitySet) {
			if (sEntitySet) {
				var oRegistryEntry = oTemplateContract.componentRegistry[oComponent.getId()];
				var mRefreshInfos = oRegistryEntry.mRefreshInfos;
				mRefreshInfos[sEntitySet] = true;
				if (oRegistryEntry.utils.isComponentActive()){
					oRegistryEntry.utils.refreshBinding();
				}
			} else if (oComponent.setIsRefreshRequired){
				oComponent.setIsRefreshRequired(true);
			}
		}
		
		function addSuccessorComponents(oTreeNode, aSuccessorComponents){
			for (var i = 0; i < oTreeNode.children.length; i++){
				var oChildNode = oTemplateContract.mEntityTree[oTreeNode.children[i]];
				addSuccessorComponents(oChildNode, aSuccessorComponents);
				if (oChildNode.componentId){
					var oChildRegistryEntry = oTemplateContract.componentRegistry[oChildNode.componentId];
					aSuccessorComponents.push(oChildRegistryEntry.oComponent);
				}
			}			
		}

		function getSuccessors(oComponent) {
			var aRet = [];
			var oComponentRegistryEntry = oTemplateContract.componentRegistry[oComponent.getId()];
			var oTreeNode = oTemplateContract.mRoutingTree[oComponentRegistryEntry.route];
			addSuccessorComponents(oTreeNode, aRet);
			return aRet;
		}

		/*
		 * Unbind all children components
		 * @param {Object} oComponent - the component which children should be unbinded
		 * @param {boolean} bAndMe - information whether the provided component itself is also affected
		 */
		function unbindChildren(oComponent, bAndMe) {
			var aSuccessors = getSuccessors(oComponent);
			if (bAndMe){
				aSuccessors.push(oComponent);
			}
			for (var i = 0; i < aSuccessors.length; i++) {
				oTemplateContract.componentRegistry[aSuccessors[i].getId()].utils.unbind();
			}
		}

		/*
		 * Sets the root page to dirty
		 *
		 */
		function setRootPageToDirty() {
			var oRootNode = oTemplateContract.mRoutingTree.root;
			if (oRootNode.componentId){
				var oRegistryEntry = oTemplateContract.componentRegistry[oRootNode.componentId];
				var oInstance = oRegistryEntry.oComponent;
				if (oInstance && typeof oInstance.setIsRefreshRequired === "function") {
						oInstance.setIsRefreshRequired(true);
				}
			}
		}

		// Expose selected private functions to unit tests
		/* eslint-disable */
		var setParentToDirty = testableHelper.testable(setParentToDirty, "setParentToDirty");
		/* eslint-enable */

		return {
			setAllPagesDirty: setAllPagesDirty,
			setParentToDirty: setParentToDirty,
			setMeToDirty: setMeToDirty,
			unbindChildren: unbindChildren,
			setRootPageToDirty: setRootPageToDirty
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.lib.ViewDependencyHelper", {
		constructor: function(oTemplateContract) {
			extend(this, getMethods(oTemplateContract));
		}
	});
});

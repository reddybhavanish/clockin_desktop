sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  /**
   * Get navigation properties related to an annotation
   * @param {string} [annotationPath] Relative or absolute annotation path to analyze
   * @param {Required<EntityType>} [entityType] Entitype related to current context
   * @returns {NavigationProperty} object containing navigation name and prefix
   */
  function getNavigationProperties(annotationPath, entityType) {
    var entityName = entityType.name;
    var navigationProperty = annotationPath.replace("/" + entityName + "/", "").replace(/\/?@.*/, ""); // To be improved -> Can be done with only one operation

    return {
      property: navigationProperty,
      prefix: navigationProperty ? navigationProperty + "/" : ""
    };
  }
  /**
   * Get annotation Name (e.g LineItem, Chart, PresentationVariant) and qualifier
   * @param {string} [relativePath] Relative annotation path to analyze
   * @returns {string} annotation name with qualifier
   */


  _exports.getNavigationProperties = getNavigationProperties;

  function getOnlyAnnotation(relativePath) {
    var lastDot = relativePath.lastIndexOf(".");
    return relativePath.substr(lastDot + 1);
  }
  /**
   * Get human readable annotation Path and compliant with templating
   * @param {string} [absoluePath] Absolute annotation path to analyze
   * @param {Required<EntityType>} [entityType] Entitype related to current context
   * @returns {string} Absolute human readable annotation path
   */


  _exports.getOnlyAnnotation = getOnlyAnnotation;

  function getTemplateAnnotationPath(absoluePath, entityType) {
    var sTarget = absoluePath.substr(0, absoluePath.indexOf("@"));
    var entityFullQualifiedName = entityType.fullyQualifiedName;

    if (sTarget === entityFullQualifiedName) {
      // No navigation property
      return absoluePath.replace(entityFullQualifiedName, "/" + entityType.name + "/");
    } else {
      //Navigation Entity
      var indexNavEntiType = entityType.navigationProperties.findIndex(function (x) {
        return x.targetTypeName === sTarget;
      });
      var navigationProperty = entityType.navigationProperties[indexNavEntiType];
      return "/" + entityType.name + "/" + absoluePath.replace(navigationProperty.targetTypeName, navigationProperty.name + "/");
    }
  }
  /**
   * Get Chart or LineItem P13nMode
   * @param {VisualizationConverterContext} [context] Visualization Context
   * @returns {string} P13nMode (separated by comma)
   */


  _exports.getTemplateAnnotationPath = getTemplateAnnotationPath;

  function getPVisualizationP13nMode(context) {
    var _manifestSettings$con, _manifestSettings$con2, _manifestSettings$con3;

    var visualizationPath = context.visualizationPath,
        manifestSettings = context.manifestSettings;
    var isLineItem = visualizationPath.indexOf("@com.sap.vocabularies.UI.v1.LineItem") > -1;
    var isVariantManagement = !!(manifestSettings.variantManagement && ["Page", "Control"].indexOf(manifestSettings.variantManagement) > -1);
    var personalization = true,
        aPersonalization = [];

    if (((_manifestSettings$con = manifestSettings.controlConfiguration) === null || _manifestSettings$con === void 0 ? void 0 : (_manifestSettings$con2 = _manifestSettings$con[visualizationPath]) === null || _manifestSettings$con2 === void 0 ? void 0 : (_manifestSettings$con3 = _manifestSettings$con2.tableSettings) === null || _manifestSettings$con3 === void 0 ? void 0 : _manifestSettings$con3.personalization) !== undefined) {
      personalization = manifestSettings.controlConfiguration[visualizationPath].tableSettings.personalization;
    }

    if (isVariantManagement && personalization) {
      if (personalization === true) {
        return isLineItem ? "Sort,Column" : "Sort,Type,Item";
      } else if (typeof personalization === "object") {
        if (isLineItem && personalization.column) {
          aPersonalization.push("Column");
        }

        if (!isLineItem && personalization.type) {
          aPersonalization.push("Type");
        }

        if (personalization.sort) {
          aPersonalization.push("Sort");
        }

        return aPersonalization.join(",");
      }
    }

    return undefined;
  }
  /**
   * Get the entity Type related to a navigation property
   * @param {string} [navigationPropertyName] Navigation Property Name
   * @param {Required<EntityType>} [entityType] Entitype related to current context
   * @returns {string} entity Type related to navigation property
   */


  _exports.getPVisualizationP13nMode = getPVisualizationP13nMode;

  function getTargetEntityType(navigationPropertyName, entityType) {
    var targetNavProperty = entityType.resolvePath(navigationPropertyName);

    if (targetNavProperty._type === "NavigationProperty") {
      return targetNavProperty.targetType;
    } else {
      return entityType.navigationProperties[entityType.navigationProperties.findIndex(function (x) {
        return x.name === navigationPropertyName;
      })].targetType;
    }
  }

  _exports.getTargetEntityType = getTargetEntityType;
  return _exports;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbW1vbkNvbnZlcnRlci50cyJdLCJuYW1lcyI6WyJnZXROYXZpZ2F0aW9uUHJvcGVydGllcyIsImFubm90YXRpb25QYXRoIiwiZW50aXR5VHlwZSIsImVudGl0eU5hbWUiLCJuYW1lIiwibmF2aWdhdGlvblByb3BlcnR5IiwicmVwbGFjZSIsInByb3BlcnR5IiwicHJlZml4IiwiZ2V0T25seUFubm90YXRpb24iLCJyZWxhdGl2ZVBhdGgiLCJsYXN0RG90IiwibGFzdEluZGV4T2YiLCJzdWJzdHIiLCJnZXRUZW1wbGF0ZUFubm90YXRpb25QYXRoIiwiYWJzb2x1ZVBhdGgiLCJzVGFyZ2V0IiwiaW5kZXhPZiIsImVudGl0eUZ1bGxRdWFsaWZpZWROYW1lIiwiZnVsbHlRdWFsaWZpZWROYW1lIiwiaW5kZXhOYXZFbnRpVHlwZSIsIm5hdmlnYXRpb25Qcm9wZXJ0aWVzIiwiZmluZEluZGV4IiwieCIsInRhcmdldFR5cGVOYW1lIiwiZ2V0UFZpc3VhbGl6YXRpb25QMTNuTW9kZSIsImNvbnRleHQiLCJ2aXN1YWxpemF0aW9uUGF0aCIsIm1hbmlmZXN0U2V0dGluZ3MiLCJpc0xpbmVJdGVtIiwiaXNWYXJpYW50TWFuYWdlbWVudCIsInZhcmlhbnRNYW5hZ2VtZW50IiwicGVyc29uYWxpemF0aW9uIiwiYVBlcnNvbmFsaXphdGlvbiIsImNvbnRyb2xDb25maWd1cmF0aW9uIiwidGFibGVTZXR0aW5ncyIsInVuZGVmaW5lZCIsImNvbHVtbiIsInB1c2giLCJ0eXBlIiwic29ydCIsImpvaW4iLCJnZXRUYXJnZXRFbnRpdHlUeXBlIiwibmF2aWdhdGlvblByb3BlcnR5TmFtZSIsInRhcmdldE5hdlByb3BlcnR5IiwicmVzb2x2ZVBhdGgiLCJfdHlwZSIsInRhcmdldFR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBTUE7Ozs7OztBQU1PLFdBQVNBLHVCQUFULENBQWlDQyxjQUFqQyxFQUF5REMsVUFBekQsRUFBK0c7QUFDckgsUUFBTUMsVUFBVSxHQUFHRCxVQUFVLENB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dGl0eVR5cGUsIFY0TmF2aWdhdGlvblByb3BlcnR5IH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBWaXN1YWxpemF0aW9uQ29udmVydGVyQ29udGV4dCB9IGZyb20gXCIuLi9NYW5pZmVzdFNldHRpbmdzXCI7XG5leHBvcnQgdHlwZSBOYXZpZ2F0aW9uUHJvcGVydHkgPSB7XG5cdHByZWZpeDogc3RyaW5nO1xuXHRwcm9wZXJ0eTogc3RyaW5nO1xufTtcbi8qKlxuICogR2V0IG5hdmlnYXRpb24gcHJvcGVydGllcyByZWxhdGVkIHRvIGFuIGFubm90YXRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBbYW5ub3RhdGlvblBhdGhdIFJlbGF0aXZlIG9yIGFic29sdXRlIGFubm90YXRpb24gcGF0aCB0byBhbmFseXplXG4gKiBAcGFyYW0ge1JlcXVpcmVkPEVudGl0eVR5cGU+fSBbZW50aXR5VHlwZV0gRW50aXR5cGUgcmVsYXRlZCB0byBjdXJyZW50IGNvbnRleHRcbiAqIEByZXR1cm5zIHtOYXZpZ2F0aW9uUHJvcGVydHl9IG9iamVjdCBjb250YWluaW5nIG5hdmlnYXRpb24gbmFtZSBhbmQgcHJlZml4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXROYXZpZ2F0aW9uUHJvcGVydGllcyhhbm5vdGF0aW9uUGF0aDogc3RyaW5nLCBlbnRpdHlUeXBlOiBSZXF1aXJlZDxFbnRpdHlUeXBlPik6IE5hdmlnYXRpb25Qcm9wZXJ0eSB7XG5cdGNvbnN0IGVudGl0eU5hbWUgPSBlbnRpdHlUeXBlLm5hbWU7XG5cdGNvbnN0IG5hdmlnYXRpb25Qcm9wZXJ0eTogc3RyaW5nID0gYW5ub3RhdGlvblBhdGgucmVwbGFjZShcIi9cIiArIGVudGl0eU5hbWUgKyBcIi9cIiwgXCJcIikucmVwbGFjZSgvXFwvP0AuKi8sIFwiXCIpOyAvLyBUbyBiZSBpbXByb3ZlZCAtPiBDYW4gYmUgZG9uZSB3aXRoIG9ubHkgb25lIG9wZXJhdGlvblxuXHRyZXR1cm4ge1xuXHRcdHByb3BlcnR5OiBuYXZpZ2F0aW9uUHJvcGVydHksXG5cdFx0cHJlZml4OiBuYXZpZ2F0aW9uUHJvcGVydHkgPyBuYXZpZ2F0aW9uUHJvcGVydHkgKyBcIi9cIiA6IFwiXCJcblx0fTtcbn1cblxuLyoqXG4gKiBHZXQgYW5ub3RhdGlvbiBOYW1lIChlLmcgTGluZUl0ZW0sIENoYXJ0LCBQcmVzZW50YXRpb25WYXJpYW50KSBhbmQgcXVhbGlmaWVyXG4gKiBAcGFyYW0ge3N0cmluZ30gW3JlbGF0aXZlUGF0aF0gUmVsYXRpdmUgYW5ub3RhdGlvbiBwYXRoIHRvIGFuYWx5emVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGFubm90YXRpb24gbmFtZSB3aXRoIHF1YWxpZmllclxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0T25seUFubm90YXRpb24ocmVsYXRpdmVQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRjb25zdCBsYXN0RG90ID0gcmVsYXRpdmVQYXRoLmxhc3RJbmRleE9mKFwiLlwiKTtcblx0cmV0dXJuIHJlbGF0aXZlUGF0aC5zdWJzdHIobGFzdERvdCArIDEpO1xufVxuXG4vKipcbiAqIEdldCBodW1hbiByZWFkYWJsZSBhbm5vdGF0aW9uIFBhdGggYW5kIGNvbXBsaWFudCB3aXRoIHRlbXBsYXRpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbYWJzb2x1ZVBhdGhdIEFic29sdXRlIGFubm90YXRpb24gcGF0aCB0byBhbmFseXplXG4gKiBAcGFyYW0ge1JlcXVpcmVkPEVudGl0eVR5cGU+fSBbZW50aXR5VHlwZV0gRW50aXR5cGUgcmVsYXRlZCB0byBjdXJyZW50IGNvbnRleHRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEFic29sdXRlIGh1bWFuIHJlYWRhYmxlIGFubm90YXRpb24gcGF0aFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGVtcGxhdGVBbm5vdGF0aW9uUGF0aChhYnNvbHVlUGF0aDogc3RyaW5nLCBlbnRpdHlUeXBlOiBSZXF1aXJlZDxFbnRpdHlUeXBlPik6IHN0cmluZyB7XG5cdHZhciBzVGFyZ2V0OiBzdHJpbmcgPSBhYnNvbHVlUGF0aC5zdWJzdHIoMCwgYWJzb2x1ZVBhdGguaW5kZXhPZihcIkBcIikpO1xuXHRjb25zdCBlbnRpdHlGdWxsUXVhbGlmaWVkTmFtZSA9IGVudGl0eVR5cGUuZnVsbHlRdWFsaWZpZWROYW1lO1xuXHRpZiAoc1RhcmdldCA9PT0gZW50aXR5RnVsbFF1YWxpZmllZE5hbWUpIHtcblx0XHQvLyBObyBuYXZpZ2F0aW9uIHByb3BlcnR5XG5cdFx0cmV0dXJuIGFic29sdWVQYXRoLnJlcGxhY2UoZW50aXR5RnVsbFF1YWxpZmllZE5hbWUsIFwiL1wiICsgZW50aXR5VHlwZS5uYW1lICsgXCIvXCIpO1xuXHR9IGVsc2Uge1xuXHRcdC8vTmF2aWdhdGlvbiBFbnRpdHlcblx0XHRjb25zdCBpbmRleE5hdkVudGlUeXBlOiBudW1iZXIgPSAoZW50aXR5VHlwZS5uYXZpZ2F0aW9uUHJvcGVydGllcyBhcyBWNE5hdmlnYXRpb25Qcm9wZXJ0eVtdKS5maW5kSW5kZXgoXG5cdFx0XHR4ID0+IHgudGFyZ2V0VHlwZU5hbWUgPT09IHNUYXJnZXRcblx0XHQpO1xuXHRcdGNvbnN0IG5hdmlnYXRpb25Qcm9wZXJ0eTogVjROYXZpZ2F0aW9uUHJvcGVydHkgPSBlbnRpdHlUeXBlLm5hdmlnYXRpb25Qcm9wZXJ0aWVzW2luZGV4TmF2RW50aVR5cGVdIGFzIFY0TmF2aWdhdGlvblByb3BlcnR5O1xuXHRcdHJldHVybiBcIi9cIiArIGVudGl0eVR5cGUubmFtZSArIFwiL1wiICsgYWJzb2x1ZVBhdGgucmVwbGFjZShuYXZpZ2F0aW9uUHJvcGVydHkudGFyZ2V0VHlwZU5hbWUsIG5hdmlnYXRpb25Qcm9wZXJ0eS5uYW1lICsgXCIvXCIpO1xuXHR9XG59XG5cbi8qKlxuICogR2V0IENoYXJ0IG9yIExpbmVJdGVtIFAxM25Nb2RlXG4gKiBAcGFyYW0ge1Zpc3VhbGl6YXRpb25Db252ZXJ0ZXJDb250ZXh0fSBbY29udGV4dF0gVmlzdWFsaXphdGlvbiBDb250ZXh0XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBQMTNuTW9kZSAoc2VwYXJhdGVkIGJ5IGNvbW1hKVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UFZpc3VhbGl6YXRpb25QMTNuTW9kZShjb250ZXh0OiBWaXN1YWxpemF0aW9uQ29udmVydGVyQ29udGV4dCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdGNvbnN0IHsgdmlzdWFsaXphdGlvblBhdGgsIG1hbmlmZXN0U2V0dGluZ3MgfSA9IGNvbnRleHQ7XG5cdGNvbnN0IGlzTGluZUl0ZW06IGJvb2xlYW4gPSB2aXN1YWxpemF0aW9uUGF0aC5pbmRleE9mKFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkxpbmVJdGVtXCIpID4gLTE7XG5cdGNvbnN0IGlzVmFyaWFudE1hbmFnZW1lbnQ6IGJvb2xlYW4gPSAhIShcblx0XHRtYW5pZmVzdFNldHRpbmdzLnZhcmlhbnRNYW5hZ2VtZW50ICYmIFtcIlBhZ2VcIiwgXCJDb250cm9sXCJdLmluZGV4T2YobWFuaWZlc3RTZXR0aW5ncy52YXJpYW50TWFuYWdlbWVudCkgPiAtMVxuXHQpO1xuXHR2YXIgcGVyc29uYWxpemF0aW9uOiBhbnkgPSB0cnVlLFxuXHRcdGFQZXJzb25hbGl6YXRpb246IHN0cmluZ1tdID0gW107XG5cdGlmIChtYW5pZmVzdFNldHRpbmdzLmNvbnRyb2xDb25maWd1cmF0aW9uPy5bdmlzdWFsaXphdGlvblBhdGhdPy50YWJsZVNldHRpbmdzPy5wZXJzb25hbGl6YXRpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdHBlcnNvbmFsaXphdGlvbiA9IG1hbmlmZXN0U2V0dGluZ3MuY29udHJvbENvbmZpZ3VyYXRpb25bdmlzdWFsaXphdGlvblBhdGhdLnRhYmxlU2V0dGluZ3MucGVyc29uYWxpemF0aW9uO1xuXHR9XG5cdGlmIChpc1ZhcmlhbnRNYW5hZ2VtZW50ICYmIHBlcnNvbmFsaXphdGlvbikge1xuXHRcdGlmIChwZXJzb25hbGl6YXRpb24gPT09IHRydWUpIHtcblx0XHRcdHJldHVybiBpc0xpbmVJdGVtID8gXCJTb3J0LENvbHVtblwiIDogXCJTb3J0LFR5cGUsSXRlbVwiO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHBlcnNvbmFsaXphdGlvbiA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0aWYgKGlzTGluZUl0ZW0gJiYgcGVyc29uYWxpemF0aW9uLmNvbHVtbikge1xuXHRcdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJDb2x1bW5cIik7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWlzTGluZUl0ZW0gJiYgcGVyc29uYWxpemF0aW9uLnR5cGUpIHtcblx0XHRcdFx0YVBlcnNvbmFsaXphdGlvbi5wdXNoKFwiVHlwZVwiKTtcblx0XHRcdH1cblx0XHRcdGlmIChwZXJzb25hbGl6YXRpb24uc29ydCkge1xuXHRcdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJTb3J0XCIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGFQZXJzb25hbGl6YXRpb24uam9pbihcIixcIik7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogR2V0IHRoZSBlbnRpdHkgVHlwZSByZWxhdGVkIHRvIGEgbmF2aWdhdGlvbiBwcm9wZXJ0eVxuICogQHBhcmFtIHtzdHJpbmd9IFtuYXZpZ2F0aW9uUHJvcGVydHlOYW1lXSBOYXZpZ2F0aW9uIFByb3BlcnR5IE5hbWVcbiAqIEBwYXJhbSB7UmVxdWlyZWQ8RW50aXR5VHlwZT59IFtlbnRpdHlUeXBlXSBFbnRpdHlwZSByZWxhdGVkIHRvIGN1cnJlbnQgY29udGV4dFxuICogQHJldHVybnMge3N0cmluZ30gZW50aXR5IFR5cGUgcmVsYXRlZCB0byBuYXZpZ2F0aW9uIHByb3BlcnR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXJnZXRFbnRpdHlUeXBlKG5hdmlnYXRpb25Qcm9wZXJ0eU5hbWU6IHN0cmluZywgZW50aXR5VHlwZTogUmVxdWlyZWQ8RW50aXR5VHlwZT4pOiBSZXF1aXJlZDxFbnRpdHlUeXBlPiB7XG5cdGNvbnN0IHRhcmdldE5hdlByb3BlcnR5ID0gZW50aXR5VHlwZS5yZXNvbHZlUGF0aChuYXZpZ2F0aW9uUHJvcGVydHlOYW1lKTtcblx0aWYgKHRhcmdldE5hdlByb3BlcnR5Ll90eXBlID09PSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiKSB7XG5cdFx0cmV0dXJuICh0YXJnZXROYXZQcm9wZXJ0eSBhcyBWNE5hdmlnYXRpb25Qcm9wZXJ0eSkudGFyZ2V0VHlwZSBhcyBSZXF1aXJlZDxFbnRpdHlUeXBlPjtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gKGVudGl0eVR5cGUubmF2aWdhdGlvblByb3BlcnRpZXNbXG5cdFx0XHQoZW50aXR5VHlwZS5uYXZpZ2F0aW9uUHJvcGVydGllcyBhcyBWNE5hdmlnYXRpb25Qcm9wZXJ0eVtdKS5maW5kSW5kZXgoeCA9PiB4Lm5hbWUgPT09IG5hdmlnYXRpb25Qcm9wZXJ0eU5hbWUpXG5cdFx0XSBhcyBSZXF1aXJlZDxWNE5hdmlnYXRpb25Qcm9wZXJ0eT4pLnRhcmdldFR5cGUgYXMgUmVxdWlyZWQ8RW50aXR5VHlwZT47XG5cdH1cbn1cbiJdfQ==
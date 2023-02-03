sap.ui.define([], function () {
  "use strict";

  var _exports = {};
  var VOCABULARY_ALIAS = {
    "Org.OData.Capabilities.V1": "Capabilities",
    "Org.OData.Core.V1": "Core",
    "Org.OData.Measures.V1": "Measures",
    "com.sap.vocabularies.Common.v1": "Common",
    "com.sap.vocabularies.UI.v1": "UI",
    "com.sap.vocabularies.Analytics.v1": "Analytics",
    "com.sap.vocabularies.PersonalData.v1": "PersonalData",
    "com.sap.vocabularies.Communication.v1": "Communication"
  };
  _exports.VOCABULARY_ALIAS = VOCABULARY_ALIAS;

  var getReverseDictionary = function (dictionary) {
    var reverse = {};
    Object.keys(dictionary).forEach(function (key) {
      reverse[dictionary[key]] = key;
    });
    return reverse;
  };

  var VOCABULARY_REVERSE_ALIAS = getReverseDictionary(VOCABULARY_ALIAS);
  _exports.VOCABULARY_REVERSE_ALIAS = VOCABULARY_REVERSE_ALIAS;
  return _exports;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnN0YW50cy50cyJdLCJuYW1lcyI6WyJWT0NBQlVMQVJZX0FMSUFTIiwiZ2V0UmV2ZXJzZURpY3Rpb25hcnkiLCJkaWN0aW9uYXJ5IiwicmV2ZXJzZSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiVk9DQUJVTEFSWV9SRVZFUlNFX0FMSUFTIl0sIm1hcHBpbmdzIjoiOzs7O0FBQU8sTUFBTUEsZ0JBQXFCLEdBQUc7QUFDcEMsaUNBQTZCLGNBRE87QUFFcEMseUJBQXFCLE1BRmU7QUFHcEMsNkJBQXlCLFVBSFc7QUFJcEMsc0NBQWtDLFFBSkU7QUFLcEMsa0NBQThCLElBTE07QUFNcEMseUNBQXFDLFdBTkQ7QUFPcEMsNENBQXdDLGNBUEo7QUFRcEMsNkNBQXlDO0FBUkwsR0FBOUI7OztBQVdQLE1BQU1DLG9CQUFvQixHQUFHLFVBQVNDLFVBQVQsRUFBK0I7QUFDM0QsUUFBTUMsT0FBWSxHQUFHLEVBQXJCO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZSCxVQUFaLEVBQXdCSSxPQUF4QixDQUFnQyxVQUFBQyxHQUFHLEVBQUk7QUFDdENKLE1BQUFBLE9BQU8sQ0FBQ0QsVUFBVSxDQUFDSyxHQUFELENBQVgsQ0FBUCxHQUEyQkEsR0FBM0I7QUFDQSxLQUZEO0FBR0EsV0FBT0osT0FBUDtBQUNBLEdBTkQ7O0FBUU8sTUFBTUssd0JBQTZCLEdBQUdQLG9CQUFvQixDQUFDRCxnQkFBRCxDQUExRCIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFZPQ0FCVUxBUllfQUxJQVM6IGFueSA9IHtcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxXCI6IFwiQ2FwYWJpbGl0aWVzXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjFcIjogXCJDb3JlXCIsXG5cdFwiT3JnLk9EYXRhLk1lYXN1cmVzLlYxXCI6IFwiTWVhc3VyZXNcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjFcIjogXCJDb21tb25cIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MVwiOiBcIlVJXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQW5hbHl0aWNzLnYxXCI6IFwiQW5hbHl0aWNzXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuUGVyc29uYWxEYXRhLnYxXCI6IFwiUGVyc29uYWxEYXRhXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbXVuaWNhdGlvbi52MVwiOiBcIkNvbW11bmljYXRpb25cIlxufTtcblxuY29uc3QgZ2V0UmV2ZXJzZURpY3Rpb25hcnkgPSBmdW5jdGlvbihkaWN0aW9uYXJ5OiBhbnkpOiBhbnkge1xuXHRjb25zdCByZXZlcnNlOiBhbnkgPSB7fTtcblx0T2JqZWN0LmtleXMoZGljdGlvbmFyeSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdHJldmVyc2VbZGljdGlvbmFyeVtrZXldXSA9IGtleTtcblx0fSk7XG5cdHJldHVybiByZXZlcnNlO1xufTtcblxuZXhwb3J0IGNvbnN0IFZPQ0FCVUxBUllfUkVWRVJTRV9BTElBUzogYW55ID0gZ2V0UmV2ZXJzZURpY3Rpb25hcnkoVk9DQUJVTEFSWV9BTElBUyk7XG4iXX0=
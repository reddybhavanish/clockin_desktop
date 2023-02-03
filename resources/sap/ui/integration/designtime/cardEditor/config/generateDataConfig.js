/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 *
 * @function
 * @private
 * @experimental
 */
sap.ui.define(function(){"use strict";return function(t,r,a){var d={"DataRequestUrl":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.REQUEST.URL}","type":"string","defaultValue":"","path":r+"data/request/url"},"DataRequestMode":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.REQUEST.MODE}","type":"enum","enum":["no-cors","same-origin","cors"],"defaultValue":"cors","path":r+"data/request/mode","visible":"{= !!${context>"+r+"data/request/url} }"},"DataRequestMethod":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.REQUEST.METHOD}","type":"enum","enum":["GET","POST"],"defaultValue":"GET","path":r+"data/request/method","visible":"{= !!${context>"+r+"data/request/url} }"},"DataRequestParameters":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.REQUEST.PARAMETERS}","type":"map","path":r+"data/request/parameters","visible":"{= !!${context>"+r+"data/request/url} }"},"DataRequestHeaders":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.REQUEST.HEADERS}","type":"map","path":r+"data/request/headers","visible":"{= !!${context>"+r+"data/request/url} }"},"DataRequestWithCredentials":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.REQUEST.WITHCREDENTIALS}","type":"boolean","defaultValue":false,"path":r+"data/request/withCredentials","visible":"{= !!${context>"+r+"data/request/url} }"},"DataJson":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.JSON}","type":"json","path":r+"data/json","visible":"{= !${context>"+r+"data/request/url} }"},"DataPath":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.PATH}","type":"string","path":r+"data/path"},"DataServiceName":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.SERVICE.NAME}","type":"string","path":r+"data/service/name","visible":false},"DataServiceParameters":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.SERVICE.PARAMETERS}","type":"map","path":r+"data/service/parameters","visible":false},"DataUpdateInterval":{"tags":t.concat(["data"]),"label":"{i18n>CARD_EDITOR.DATA.UPDATEINTERVAL}","type":"number","path":r+"data/updateInterval"}};var g={};Object.keys(d).forEach(function(k){g[a+k]=d[k];});return g;};});

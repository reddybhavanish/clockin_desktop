/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_merge"],function(_){"use strict";return function(c){return _({},{"label":"{i18n>CARD_EDITOR.ACTIONS}","type":"array","itemLabel":"{type}","addItemLabel":"{i18n>CARD_EDITOR.ACTION}","template":{"enabled":{"label":"{i18n>CARD_EDITOR.ACTION.ENABLED}","type":"boolean","defaultValue":true,"path":"enabled"},"type":{"label":"{i18n>CARD_EDITOR.ACTION.TYPE}","type":"enum","enum":["Navigation"],"path":"type","visible":"{= !!${enabled}}"},"service":{"label":"{i18n>CARD_EDITOR.ACTION.SERVICE}","type":"string","path":"service","visible":false},"parameters":{"label":"{i18n>CARD_EDITOR.ACTION.PARAMETERS}","type":"map","allowedTypes":["string","number","boolean"],"path":"parameters","visible":"{= !!${enabled}}"},"url":{"label":"{i18n>CARD_EDITOR.ACTION.URL}","type":"string","path":"url","visible":"{= !!${enabled} && ${type} === 'Navigation'}"},"target":{"label":"{i18n>CARD_EDITOR.ACTION.TARGET}","type":"enum","enum":["_blank","_self"],"defaultValue":"_blank","path":"target","visible":"{= !!${enabled} && ${type} === 'Navigation' && !!${url}}"}}},c);};});

// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define([],function(){"use strict";return c;function c(u){var U=u&&u.services&&u.services.Container&&u.services.Container.adapter&&u.services.Container.adapter.config&&u.services.Container.adapter.config.userProfile;var m="Date Format is incorrectly set for the User";var M="Time Format is incorrectly set for the User";try{var s=U&&U.defaults&&U.defaults.sapDateFormat;sap.ui.getCore().getConfiguration().getFormatSettings().setLegacyDateFormat(s);}catch(e){jQuery.sap.log.error(m,e.stack,"sap/ushell/bootstrap/common/common.configure.ui5datetimeformat");}try{var S=U&&U.defaults&&U.defaults.sapTimeFormat;sap.ui.getCore().getConfiguration().getFormatSettings().setLegacyTimeFormat(S);}catch(e){jQuery.sap.log.error(M,e.stack,"sap/ushell/bootstrap/common/common.configure.ui5datetimeformat");}}},true);

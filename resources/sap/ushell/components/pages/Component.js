//Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/UIComponent","sap/ushell/components/SharedComponentUtils","sap/ushell/resources"],function(U,S,r){"use strict";return U.extend("sap.ushell.components.pages.Component",{metadata:{manifest:"json",library:"sap.ushell"},init:function(){U.prototype.init.apply(this,arguments);S.toggleUserActivityLog();S.getEffectiveHomepageSetting("/core/home/sizeBehavior","/core/home/sizeBehaviorConfigurable");this.setModel(r.i18nModel,"i18n");this._oPagesService=sap.ushell.Container.getServiceAsync("Pages");},getPagesService:function(){return this._oPagesService;},getComponentData:function(){return{};}});});

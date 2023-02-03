// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/Label","sap/ushell/resources","sap/ui/Device","sap/m/Switch","sap/m/library","sap/m/Text","sap/m/HBox","sap/m/FlexItemData","sap/m/VBox"],function(L,r,D,S,m,T,H,F,V){"use strict";var a=m.SwitchType;sap.ui.jsview("sap.ushell.components.shell.UserSettings.UsageAnalyticsSelector",{createContent:function(){var f=D.system.phone?"Start":"Center",s=D.system.phone?"Wrap":"NoWrap",b=D.system.phone?"Column":"Row",t=D.system.phone?"Left":"Right",A=D.system.phone?"Baseline":"Auto",w=D.system.phone?"auto":"11.75rem";this.oLabel=new L({width:w,textAlign:t,text:r.i18n.getText("allowTracking")+":"}).addStyleClass("sapUshellUsageAnalyticsSelectorLabel");this.oSwitchButton=new S("usageAnalyticsSwitchButton",{type:a.Default}).addStyleClass("sapUshellUsageAnalyticsSelectorSwitchButton");this.oMessage=new T({text:sap.ushell.Container.getService("UsageAnalytics").getLegalText()}).addStyleClass("sapUshellUsageAnalyticsSelectorLegalTextMessage");this.fBox=new H({alignItems:f,wrap:s,direction:b,height:"2rem",items:[this.oLabel,this.oSwitchButton],layoutData:new F({alignSelf:A})});this.vBox=new V({items:[this.fBox,this.oMessage]});return this.vBox;},getControllerName:function(){return"sap.ushell.components.shell.UserSettings.UsageAnalyticsSelector";}});},true);

// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/VBox","sap/m/Button","sap/m/FlexBox","sap/m/Switch","sap/m/Label","sap/ui/Device","sap/ushell/resources"],function(V,B,F,S,L,D,r){"use strict";sap.ui.jsview("sap.ushell.components.shell.UserSettings.userActivitiesHandler",{createContent:function(c){var i=r.i18n;var f=D.system.phone?"Column":"Row";var s=D.system.phone?"Stretch":"Center";var t=D.system.phone?"Left":"Right";var C="cleanActivityButton";this.trackingLabel=new L("trackingLabel",{text:i.getText("trackingLabel"),textAlign:t}).addStyleClass("sapUshellCleanActivityLabel");this.trackUserActivitySwitch=new S("trackUserActivitySwitch",{change:function(e){c._handleTrackUserActivitySwitch(e.getParameter("state"));}}).addAriaLabelledBy(this.trackingLabel);var T=new F({alignItems:s,direction:f,items:[this.trackingLabel,this.trackUserActivitySwitch]});this.cleanActivityLabel=new L("cleanActivityLabel",{text:i.getText("cleanActivityLabel"),textAlign:t,labelFor:C}).addStyleClass("sapUshellCleanActivityLabel");this.cleanActivityButton=new B({id:"cleanActivityButton",text:i.getText("cleanActivityButton"),press:c._handleCleanHistory}).addAriaLabelledBy(this.cleanActivityLabel);var a=new F({alignItems:s,direction:f,items:[this.cleanActivityLabel,this.cleanActivityButton]});var v=new V({items:[T,a]});v.addStyleClass("sapUiSmallMargin");return v;},getControllerName:function(){return"sap.ushell.components.shell.UserSettings.userActivitiesHandler";}});});

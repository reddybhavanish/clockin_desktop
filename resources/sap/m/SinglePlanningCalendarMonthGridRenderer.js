/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(['sap/ui/unified/calendar/CalendarDate','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/Month','sap/ui/core/date/UniversalDate','./PlanningCalendarLegend','sap/ui/core/InvisibleText','sap/ui/core/Core','sap/ui/unified/library'],function(C,a,M,U,P,I,b,u){"use strict";var c=u.CalendarDayType;var S={apiVersion:2};S.render=function(r,o){var l=o._getCoreLocaleData();var d=o._getDensitySizes();r.openStart("div",o);r.class("sapMSinglePCGrid");r.class("sapMSPCMonthGrid");r.openEnd();this.renderDayNames(r,o,l);r.openStart("div");r.class("sapMSinglePCGridContent");r.openEnd();this.renderCells(r,o,l,d);r.close("div");r.close("div");};S.renderCells=function(r,o,l,d){var e=o._getCells(),v=o._getVerticalLabels(),f=o._getColumns(),m=[],A=[],g,D,h,p,k=[],n,w,i,j;for(i=0;i<o._getRows();i++){w=0;r.openStart("div");r.attr("role","grid");r.class("sapMSPCMonthWeek");r.openEnd();r.openStart("div");r.class("sapMSPCMonthWeekNumber");r.openEnd();r.text(v[i]);r.close("div");for(j=0;j<f;j++){g=i*f+j;D=e[g];h=o._getAppointmetsForADay(D);p=o._getPreviousAppointmetsForADay(D);k.push(p);n=o._getMoreCountPerCell(g);m.push(n);A.push(h);w=Math.max(w,o._aAppsLevelsPerDay[g].length);}r.openStart("div");r.class("sapMSPCMonthDays");r.class("sapMSPCMonthDaysMax"+w);r.attr("role","row");r.openEnd();for(j=0;j<f;j++){g=i*f+j;D=e[g];this.renderDay(r,o,D,l,m[g],g);}r.openStart("div");r.class("sapMSinglePCBlockers");r.class("sapUiCalendarRowVisFilled");r.attr("role","list");r.openEnd();for(j=0;j<f;j++){g=i*f+j;D=e[g];if(j===0){this.renderAppointments(r,o,k[g],j,m[g],d);}this.renderAppointments(r,o,A[g],j,m[g],d);}r.close("div");r.close("div");r.close("div");}};S.renderDay=function(r,o,d,l,m,i){var s=o.getSpecialDates(),D=M.prototype._getDateTypes.call(o,d),f=o._getDateFormatter(),t,L;r.openStart("div");r.class("sapMSPCMonthDay");r.attr("role","gridcell");if(a._isWeekend(d,l)){r.class("nonWorkingTimeframe");}if(s){if(D&&D[0]){t=D[0];r.class("sapUiCalendarSpecialDay"+t.type);L=P.findLegendItemForItem(b.byId(o._sLegendId),t);}}r.attr("sap-ui-date",d.valueOf().toString());r.attr("tabindex",-1);r.attr("aria-labelledby",f.format(d.toLocalJSDate())+"-Descr");r.openEnd();this.renderDndPlaceholder(r,o.getAggregation("_appsPlaceholders")[i]);r.openStart("div");r.class("specialDateIndicator");r.openEnd();r.close("div");r.openStart("div");r.class("sapMSPCMonthDayNumber");r.openEnd();r.text(d.getDate());r.close("div");if(m){r.openStart("div");r.class("sapMSPCMonthLnkMore");r.openEnd();r.renderControl(o._getMoreLink(m,d,i));r.close("div");}r.openStart("span",f.format(d.toLocalJSDate())+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(o._getCellStartInfo(d.toLocalJSDate()));if(o._sLegendId&&L){r.text(L);}r.close("span");r.close("div");};S.renderAppointments=function(r,o,d,e,m,D){var f=o._getMaxAppointments(),g=m?f-2:f-1;for(var i=0;i<d.length;i++){if(d[i].level<=g){this.renderAppointment(r,o,d[i],e,D);}}};S.renderAppointment=function(r,o,d,i,D){var A=d.data,w=d.width,l=d.level,e=o._getColumns(),t=A.getTooltip_AsString(),T=A.getType(),s=A.getColor(),f=A.getTitle(),g=A.getText(),h=A.getIcon(),j=A.getId(),m={role:"listitem",labelledby:{value:I.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},R=e-i-w,k=b.getConfiguration().getRTL(),n,B=b.getConfiguration().getTheme().indexOf("_hc")?2:1;R=R<0?0:R;if(f){m["labelledby"].value=m["labelledby"].value+" "+j+"-Title";}m["labelledby"].value=m["labelledby"].value+" "+j+"-Descr";if(g){m["labelledby"].value=m["labelledby"].value+" "+j+"-Text";}if(A.getTentative()){m["labelledby"].value=m["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE");}if(A.getSelected()){m["labelledby"].value=m["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");}r.openStart("div",A);r.attr("data-sap-level",l);r.attr("data-sap-width",w);r.attr("tabindex",0);if(t){r.attr("title",t);}r.accessibilityState(A,m);r.class("sapMSinglePCAppointmentWrap");r.class("sapUiCalendarRowApps");if(!s&&T!==c.None){r.class("sapUiCalendarApp"+T);}if(s){if(b.getConfiguration().getRTL()){r.style("border-right-color",s);}else{r.style("border-left-color",s);}}r.style(k?"right":"left","calc("+(i*100)/e+"% + "+B+"px)");r.style(k?"left":"right","calc("+(R*100)/e+"% + "+B+"px)");r.style("top",(l*D.appHeight+D.cellHeaderHeight)+"rem");r.openEnd();r.openStart("div");r.class("sapUiCalendarApp");if(A.getSelected()){r.class("sapUiCalendarAppSel");}if(A.getTentative()){r.class("sapUiCalendarAppTent");}if(h){r.class("sapUiCalendarAppWithIcon");}r.openEnd();r.openStart("div");r.class("sapUiCalendarAppCont");if(s){r.style("background-color",A._getCSSColorForBackground(s));}r.openEnd();if(d.hasPrevious<0){n=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];r.icon("sap-icon://arrow-left",n,{title:null});}if(h){n=["sapUiCalendarAppIcon"];var p={};p["id"]=j+"-Icon";p["title"]=null;r.icon(h,n,p);}if(f){r.openStart("span",j+"-Title");r.class("sapUiCalendarAppTitle");r.openEnd();r.text(f,true);r.close("span");}if(d.hasNext<0){n=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];r.icon("sap-icon://arrow-right",n,{title:null});}r.openStart("span",j+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(o._getAppointmentAnnouncementInfo(A));r.close("span");r.close("div");r.close("div");r.close("div");};S.renderDayNames=function(r,o,l){var f=l.getFirstDayOfWeek(),s=o.getId(),d,e=b.getConfiguration().getCalendarType(),w=l.getDaysStandAlone("abbreviated",e),W=l.getDaysStandAlone("wide",e),D;r.openStart("div",s+"-Names");r.class("sapMSPCMonthDayNames");r.openEnd();for(var i=0;i<7;i++){D=(i+f)%7;d=s+"-WH"+D;r.openStart("div",d);r.class("sapUiCalWH");if(i===0){r.class("sapUiCalFirstWDay");}r.accessibilityState(null,{role:"columnheader",label:W[D]});r.openEnd();r.text(w[D%7]);r.close("div");}r.close("div");};S.renderDndPlaceholder=function(r,p){r.openStart("div");r.class("sapMSinglePCOverlay");r.openEnd();r.renderControl(p);r.close("div");};return S;},true);

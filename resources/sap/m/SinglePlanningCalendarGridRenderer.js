/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(['sap/ui/unified/calendar/CalendarDate','sap/ui/unified/calendar/CalendarUtils','sap/ui/core/date/UniversalDate','sap/ui/core/InvisibleText','./PlanningCalendarLegend','sap/ui/unified/library'],function(C,a,U,I,P,u){"use strict";var v=2;var A=2;var b=1;var c=u.CalendarDayType;var S={apiVersion:2};S.render=function(r,o){r.openStart("div",o);r.class("sapMSinglePCGrid");r.openEnd();r.renderControl(o.getAggregation("_columnHeaders"));this.renderBlockersContainer(r,o);r.openStart("div");r.attr("role","grid");r.class("sapMSinglePCGridContent");r.openEnd();this.renderRowHeaders(r,o);this.renderNowMarker(r,o);this.renderColumns(r,o);r.close("div");r.close("div");};S.renderBlockersContainer=function(r,o){var d=o._getColumns(),m=o._getBlockersToRender().iMaxlevel,s=o.getStartDate(),e=(m+1)*o._getBlockerRowHeight()+3,f=o._getDateFormatter(),g=o.getSpecialDates(),h=C.fromLocalJSDate(s),D=o._getColumnHeaders()._getDateTypes(h),t,l;r.openStart("div");r.attr("role","grid");r.class("sapMSinglePCBlockersRow");r.openEnd();r.openStart("div");r.attr("role","row");r.class("sapMSinglePCBlockersColumns");if(g&&o._getColumns()===1){if(D&&D[0]){t=D[0];r.class("sapUiCalItem"+t.type);l=P.findLegendItemForItem(sap.ui.getCore().byId(o._sLegendId),t);}r.class("sapMSpecialDaysInDayView");}r.style("height",e+"px");r.openEnd();this.renderDndPlaceholders(r,o,o.getAggregation("_blockersPlaceholders"));for(var i=0;i<d;i++){var j=new C(s.getFullYear(),s.getMonth(),s.getDate()+i);r.openStart("div");r.attr("role","gridcell");r.attr("data-sap-start-date",f.format(j.toLocalJSDate()));r.attr("data-sap-end-date",f.format(j.toLocalJSDate()));r.attr("aria-labelledby",I.getStaticId("sap.m","SPC_BLOCKERS")+" "+"fullDay-"+f.format(j.toLocalJSDate())+"-Descr");r.class("sapMSinglePCBlockersColumn");r.attr("tabindex",-1);if(j.isSame(new C())){r.class("sapMSinglePCBlockersColumnToday");}if(a._isWeekend(j,o._getCoreLocaleData())){r.class("sapMSinglePCBlockersColumnWeekend");}r.openEnd();r.openStart("span","fullDay-"+f.format(j.toLocalJSDate())+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(o._getCellStartEndInfo(j.toLocalJSDate()));if(o._sLegendId&&l){r.text(l);}r.close("span");r.close("div");}this.renderBlockers(r,o);r.close("div");r.close("div");};S.renderBlockers=function(r,o){var t=this,B=o._getBlockersToRender().oBlockersList;r.openStart("div");r.attr("role","list");r.attr("aria-labelledby",I.getStaticId("sap.m","SPC_BLOCKERS"));r.class("sapMSinglePCBlockers");r.class("sapUiCalendarRowVisFilled");r.openEnd();B.getIterator().forEach(function(d){t.renderBlockerAppointment(r,o,d);});r.close("div");};S.renderBlockerAppointment=function(r,o,B){var g=C.fromLocalJSDate(o.getStartDate()),d=B.getData(),e=C.fromLocalJSDate(d.getStartDate()),f=C.fromLocalJSDate(d.getEndDate()),s=a._daysBetween(e,g),E=a._daysBetween(f,g),i=o._getColumns(),R=o._getBlockerRowHeight(),h=B.level,j=B.width,t=d.getTooltip_AsString(),T=d.getType(),k=d.getColor(),l=d.getTitle(),m=d.getText(),n=d.getIcon(),p=d.getId(),q={role:"listitem",labelledby:{value:I.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},w=o.getAriaLabelledBy(),L=s*(100/i),x=(i-E-1)*(100/i),y=sap.ui.getCore().getConfiguration().getRTL(),z;if(w.length>0){q["labelledby"].value=q["labelledby"].value+" "+w.join(" ");}if(l){q["labelledby"].value=q["labelledby"].value+" "+p+"-Title";}q["labelledby"].value=q["labelledby"].value+" "+p+"-Descr";if(m){q["labelledby"].value=q["labelledby"].value+" "+p+"-Text";}if(d.getTentative()){q["labelledby"].value=q["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE");}if(d.getSelected()){q["labelledby"].value=q["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");}r.openStart("div",d);r.attr("data-sap-level",h);r.attr("data-sap-width",j);r.attr("tabindex",0);if(t){r.attr("title",t);}r.accessibilityState(d,q);r.class("sapMSinglePCAppointmentWrap");r.class("sapUiCalendarRowApps");if(!k&&T!==c.None){r.class("sapUiCalendarApp"+T);}if(k){if(sap.ui.getCore().getConfiguration().getRTL()){r.style("border-right-color",k);}else{r.style("border-left-color",k);}}r.style("top",R*h+1+"px");r.style(y?"right":"left",Math.max(L,0)+"%");r.style(y?"left":"right",Math.max(x,0)+"%");r.openEnd();r.openStart("div");r.class("sapUiCalendarApp");if(d.getSelected()){r.class("sapUiCalendarAppSel");}if(d.getTentative()){r.class("sapUiCalendarAppTent");}if(n){r.class("sapUiCalendarAppWithIcon");}r.openEnd();r.openStart("div");r.class("sapUiCalendarAppCont");if(k){r.style("background-color",d._getCSSColorForBackground(k));}r.openEnd();if(L<0){z=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];r.icon("sap-icon://arrow-left",z,{title:null});}if(n){z=["sapUiCalendarAppIcon"];var D={};D["id"]=p+"-Icon";D["title"]=null;r.icon(n,z,D);}if(l){r.openStart("span",p+"-Title");r.class("sapUiCalendarAppTitle");r.openEnd();r.text(l,true);r.close("span");}if(x<0){z=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];r.icon("sap-icon://arrow-right",z,{title:null});}r.openStart("span",p+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(o._getAppointmentAnnouncementInfo(d));r.close("span");r.close("div");r.close("div");r.close("div");};S.renderRowHeaders=function(r,o){var s=o._getVisibleStartHour(),e=o._getVisibleEndHour(),d=new Date(),h=o._getHoursFormat(),f=o._getAMPMFormat();r.openStart("div");r.class("sapMSinglePCRowHeaders");r.openEnd();for(var i=s;i<=e;i++){d.setHours(i);r.openStart("span");r.class("sapMSinglePCRowHeader");r.class("sapMSinglePCRowHeader"+i);if(o._shouldHideRowHeader(i)){r.class("sapMSinglePCRowHeaderHidden");}r.openEnd();r.text(h.format(d));if(o._hasAMPM()){r.openStart("span");r.class("sapMSinglePCRowHeaderAMPM");r.openEnd();r.text(" "+f.format(d));r.close("span");}r.close("span");}r.close("div");};S.renderColumns=function(r,o){var d=o._getColumns(),s=o.getStartDate(),e=o._getAppointmentsToRender();r.openStart("div");r.attr("role","grid");r.attr("aria-labelledby",I.getStaticId("sap.m","SPC_APPOINTMENTS"));r.class("sapMSinglePCColumns");r.openEnd();for(var i=0;i<d;i++){var f=new C(s.getFullYear(),s.getMonth(),s.getDate()+i),F=o._getDateFormatter(),D=F.format(f.toLocalJSDate());r.openStart("div");r.attr("role","row");r.attr("data-sap-day",D);r.class("sapMSinglePCColumn");if(f.isSame(new C())){r.class("sapMSinglePCColumnToday");}if(a._isWeekend(f,o._getCoreLocaleData())){r.class("sapMSinglePCColumnWeekend");}r.openEnd();this.renderDndPlaceholders(r,o,o._dndPlaceholdersMap[f]);this.renderRows(r,o,D);this.renderAppointments(r,o,e[D],f);r.close("div");}r.close("div");};S.renderDndPlaceholders=function(r,o,p){r.openStart("div");r.class("sapMSinglePCOverlay");r.openEnd();p.forEach(r.renderControl);r.close("div");};S.renderRows=function(r,o,d){var s=o._getVisibleStartHour(),e=o._getVisibleEndHour(),f=o._getDateFormatter(),g,h;for(var i=s;i<=e;i++){g=o._parseDateStringAndHours(d,i);h=new Date(g.getFullYear(),g.getMonth(),g.getDate(),g.getHours()+1);r.openStart("div");r.attr("role","gridcell");r.class("sapMSinglePCRow");if(!o._isVisibleHour(i)){r.class("sapMSinglePCNonWorkingRow");}r.attr("data-sap-hour",i);r.attr("data-sap-start-date",f.format(g));r.attr("data-sap-end-date",f.format(h));r.attr("aria-labelledby",f.format(g)+"-Descr");r.attr("tabindex",-1);r.openEnd();r.openStart("span",f.format(g)+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(o._getCellStartEndInfo(g,h));r.close("span");r.close("div");}};S.renderAppointments=function(r,o,d,e){var t=this;if(d){r.openStart("div");r.attr("role","list");r.class("sapMSinglePCAppointments");r.class("sapUiCalendarRowVisFilled");r.openEnd();d.oAppointmentsList.getIterator().forEach(function(f){var m=d.iMaxLevel,l=f.level,w=f.width,g=f.getData();t.renderAppointment(r,o,m,l,w,g,e);});r.close("div");}};S.renderAppointment=function(r,o,m,i,d,e,f){var g=C.fromLocalJSDate(o.getStartDate()),G=new C(g),R=o._getRowHeight(),h=new U(f.getYear(),f.getMonth(),f.getDate(),o._getVisibleStartHour()),j=new U(f.getYear(),f.getMonth(),f.getDate(),o._getVisibleEndHour(),59,59),k=e.getStartDate(),l=e.getEndDate(),n=C.fromLocalJSDate(k),p=C.fromLocalJSDate(l),t=e.getTooltip_AsString(),T=e.getType(),s=e.getColor(),q=e.getTitle(),w=e.getText(),x=e.getIcon(),y=e.getId(),L=this._getLineClamp(k,l),z={role:"listitem",labelledby:{value:I.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},B=o.getAriaLabelledBy(),D=h.getTime()>k.getTime(),E=j.getTime()<l.getTime(),F=D?0:o._calculateTopPosition(k),H=E?0:o._calculateBottomPosition(l),J=100/(m+1),K,M,N,O,Q;G.setDate(G.getDate()+o._getColumns()-1);K=a._daysBetween(n,g);M=a._daysBetween(G,p);N=f.isSame(g);O=f.isSame(G);if(B.length>0){z["labelledby"].value=z["labelledby"].value+" "+B.join(" ");}if(q){z["labelledby"].value=z["labelledby"].value+" "+y+"-Title";}z["labelledby"].value=z["labelledby"].value+" "+y+"-Descr";if(w){z["labelledby"].value=z["labelledby"].value+" "+y+"-Text";}if(e.getTentative()){z["labelledby"].value=z["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE");}if(e.getSelected()){z["labelledby"].value=z["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");}r.openStart("div",e);r.attr("data-sap-level",i);r.attr("data-sap-width",d);r.attr("tabindex",0);if(t){r.attr("title",t);}r.accessibilityState(e,z);r.class("sapMSinglePCAppointmentWrap");r.class("sapUiCalendarRowApps");if(!s&&T!==c.None){r.class("sapUiCalendarApp"+T);}if(s){if(sap.ui.getCore().getConfiguration().getRTL()){r.style("border-right-color",s);}else{r.style("border-left-color",s);}}r.style("top",F+"px");r.style("bottom",H+"px");r.style(sap.ui.getCore().getConfiguration().getRTL()?"right":"left",J*i+"%");r.style("width",J*d+"%");r.openEnd();r.openStart("div");r.class("sapUiCalendarApp");r.style("min-height",(R-(v+A+b))/2+"px");if(e.getSelected()){r.class("sapUiCalendarAppSel");}if(e.getTentative()){r.class("sapUiCalendarAppTent");}if(x){r.class("sapUiCalendarAppWithIcon");}r.openEnd();r.openStart("div");r.class("sapUiCalendarAppCont");if(s){r.style("background-color",e._getCSSColorForBackground(s));}r.openEnd();if(N&&K<0){Q=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];r.icon("sap-icon://arrow-left",Q,{title:null});}if(x){Q=["sapUiCalendarAppIcon"];var V={};V["id"]=y+"-Icon";V["title"]=null;r.icon(x,Q,V);}r.openStart("div");r.class("sapUiCalendarAppTitleWrapper");r.class("sapUiSPCAppLineClamp"+L);r.openEnd();if(q){r.openStart("span",y+"-Title");r.class("sapUiCalendarAppTitle");r.openEnd();r.text(q,true);r.close("span");}if(w){r.openStart("span",y+"-Text");r.class("sapUiCalendarAppText");r.openEnd();r.text(w,true);r.close("span");}r.close("div");if(O&&M<0){Q=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];r.icon("sap-icon://arrow-right",Q,{title:null});}r.openStart("span",y+"-Descr");r.class("sapUiInvisibleText");r.openEnd();r.text(o._getAppointmentAnnouncementInfo(e));r.close("span");r.close("div");if(o.getEnableAppointmentsResize()&&!D&&!E){this.renderResizeHandles(r);}r.close("div");r.close("div");};S.renderNowMarker=function(r,o){var d=new Date();r.openStart("div",o.getId()+"-nowMarker");r.style("top",o._calculateTopPosition(d)+"px");r.class("sapMSinglePCNowMarker");if(!o._isVisibleHour(d.getHours())){r.class("sapMSinglePCNowMarkerHidden");}r.openEnd();r.openStart("span",o.getId()+"-nowMarkerText");r.class("sapMSinglePCNowMarkerText");r.openEnd();r.text(o._formatTimeAsString(d));if(o._hasAMPM()){r.openStart("span",o.getId()+"-nowMarkerAMPM");r.class("sapMSinglePCNowMarkerAMPM");r.openEnd();r.text(o._addAMPM(d));r.close("span");}r.close("span");r.close("div");};S.renderResizeHandles=function(r){r.openStart("span");r.class("sapMSinglePCAppResizeHandleBottom");r.openEnd();r.close("span");r.openStart("span");r.class("sapMSinglePCAppResizeHandleTop");r.openEnd();r.close("span");};S._getLineClamp=function(o,d){var m=a._minutesBetween(o,d);if(m>=51&&m<69){return"2";}else if(m>=69&&m<90){return"3";}else if(m>=90&&m<110){return"4";}else if(m>=110&&m<130){return"5";}else if(m>=130&&m<150){return"6";}else if(m>=150&&m<170){return"7";}else if(m>=170&&m<190){return"8";}else if(m>=190){return"9";}else{return"1";}};return S;},true);

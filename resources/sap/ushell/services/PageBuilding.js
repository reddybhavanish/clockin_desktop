// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui2/srvc/factory","sap/ui2/srvc/page","sap/ui/thirdparty/jquery"],function(f,p,q){"use strict";function P(a,c){this.getFactory=function(){return a.getFactory();};this.getPage=function(s){return a.getFactory().createPage(s);};this._appendLanguageParameter=function(){var m=sap.ui2.srvc.getParameterMap(),l=m["sap-language"]&&m["sap-language"][0];if(l){var A=this.getFactory().getPageBuildingService()&&this.getFactory().getPageBuildingService().readPageSet&&this.getFactory().getPageBuildingService().readPageSet.appendedParameters||{};A["sap-language"]=l;this.getFactory().getPageBuildingService().readPageSet.appendedParameters=A;}};this.getPageSet=function(i){this._appendLanguageParameter();var d=new q.Deferred();a.getFactory().createPageSet(i,d.resolve.bind(d),d.reject.bind(d));return d.promise();};}P.hasNoAdapter=false;return P;},true);

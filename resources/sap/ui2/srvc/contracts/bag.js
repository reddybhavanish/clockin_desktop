// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
(function(){"use strict";if(typeof jQuery==="function"&&jQuery.sap){jQuery.sap.declare("sap.ui2.srvc.contracts.bag");jQuery.sap.require("sap.ui2.srvc.chip");jQuery.sap.require("sap.ui2.srvc.utils");}sap.ui2.srvc.Chip.addContract("bag",function(c){var b;this.getBag=function(B){return c.getBag(B);};this.getBagIds=function(){return c.getBagIds();};this.getOriginalLanguage=function(){return c.getPage()&&c.getPage().getOriginalLanguage();};this.attachBagsUpdated=function(h){if(typeof h!=="function"){throw new sap.ui2.srvc.Error("The given handler is not a function","chip.bag");}b=h;};return{fireBagsUpdated:function(u){if(!sap.ui2.srvc.isArray(u)||u.length<1){throw new sap.ui2.srvc.Error("At least one bag ID must be given","contract.bag");}if(b){b(u);}}};});}());

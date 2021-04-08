// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/bootstrap/_SchedulingAgent/FLPScheduler","sap/ushell/bootstrap/_SchedulingAgent/EventProcessor","sap/ushell/bootstrap/_SchedulingAgent/FLPLoader","sap/ushell/bootstrap/_SchedulingAgent/logger","sap/ushell/bootstrap/_SchedulingAgent/state","sap/ushell/EventHub"],function(F,E,a,l,s,b){"use strict";var L={CONTINUE_ON_EVENT:"continueOnEvent",BY_EVENT:"byEvent",BY_COMPONENT_CREATE:"byComponentCreate",BY_REQUIRE:"byRequire",WAIT_IN_MS:"waitInMs"};var S={WAIT:"wait",ERROR:"error",DONE:"done",STEP:"step",BLOCKDONE:"blockDone",SKIPPED:"skip"};var c={oComponentsLoading:{},oPathsLoading:{},_initialize:function(){s.clear();l.clearHistory();s.setForModule(s.id.module.schedulingAgent.id,s.id.module.schedulingAgent.Initializing,"Scheduling Agent starting");var d=F.initializeSchedule();d.then(function(e){if(!e){s.setForModule(s.id.module.schedulingAgent.id,s.id.module.schedulingAgent.FatalError,"Configuration error!");return;}E.initializeStepDoneListener(this);s.setForModule(s.id.module.schedulingAgent.id,s.id.module.schedulingAgent.Initialized,"Scheduling Agent ready");this.eventReceived();}.bind(this));},_processStepConfiguration:function(d){var o={sStepType:"",oData:{},sStepName:"",bConfigOk:false};if(d.oConfig.loadingMode===L.CONTINUE_ON_EVENT){o.sStepType=L.CONTINUE_ON_EVENT;o.sStepName=d.oContent.LoadingStep;o.oData.eventName=d.oConfig.continueOnEvent&&d.oConfig.continueOnEvent.eventName;o.oData.stepName=d.oContent.LoadingStep;o.bConfigOk=!!(o.oData.eventName&&o.oData.stepName);}else if(d.oConfig.loadingMode===L.BY_EVENT){o.sStepType=L.BY_EVENT;o.sStepName=d.oContent.LoadingStep;o.oData.eventName=d.oConfig.byEvent&&d.oConfig.byEvent.eventName;o.oData.eventData={};o.oData.eventData.data=d.oConfig.byEvent.eventData;o.oData.eventData.stepName=d.oContent.LoadingStep;o.bConfigOk=!!(o.oData.eventName);}else if(d.oConfig.loadingMode===L.BY_COMPONENT_CREATE){o.sStepType=L.BY_COMPONENT_CREATE;o.sStepName=d.oContent.LoadingStep;o.oData=d.oConfig.byComponentCreate&&d.oConfig.byComponentCreate.ui5ComponentOptions||{};o.bConfigOk=!!o.oData;}else if(d.oConfig.loadingMode===L.BY_REQUIRE){o.sStepType=L.BY_REQUIRE;o.sStepName=d.oContent.LoadingStep;o.oData={};o.oData.sPath=d.oConfig.byRequire.path;o.oData.sStepName=d.oContent.LoadingStep;o.bConfigOk=!!o.oData.sPath;}else if(d.oConfig.loadingMode===L.WAIT_IN_MS){o.sStepType=L.WAIT_IN_MS;o.sStepName=d.oContent.LoadingStep;o.oData.iWaitingTime=d.oConfig.waitInMs&&d.oConfig.waitInMs.waitingTime;o.oData.sStepName=d.oContent.LoadingStep;o.bConfigOk=!!(o.oData.iWaitingTime&&o.oData.sStepName);}return o;},dumpState:function(){s.dump();},dumpHistory:function(){l.dumpHistory();},dumpSchedule:function(){F.dumpSchedule();},dumpAll:function(){l.dumpHistory();F.dumpSchedule();s.dump();},eventReceived:function(){s.setForModule(s.id.module.schedulingAgent.id,s.id.module.schedulingAgent.Working,"Agent is active");var n;do{n=F.getNextLoadingStep();if(n.sStatus===S.ERROR){s.setForModule(s.id.module.schedulingAgent.id,s.id.module.schedulingAgent.FatalError,"Fatal loading error. Loading aborted.");E.unregisterStepDoneListener();b.emit("FLPLoadingDone");return;}if(n.sStatus===S.DONE){s.setForModule(s.id.module.schedulingAgent.id,s.id.module.schedulingAgent.Done,"Loading finished");E.unregisterStepDoneListener();b.emit("FLPLoadingDone");return;}if(n.sStatus===S.BLOCKDONE){}if(n.sStatus===S.SKIPPED){}if(n.sStatus===S.STEP){var o=this._processStepConfiguration(n);if(!o.bConfigOk){s.setForLoadingStep(o.sStepName,s.id.loadingStep.Abort,"","Step configuration error");s.setForLoadingStep(o.sStepName,s.id.loadingStep.Skipped,"","Step configuration error");s.setForModule(s.id.module.schedulingAgent.id,s.id.module.schedulingAgent.FatalError,o,"Step configuration error!");}else if(o.sStepType===L.CONTINUE_ON_EVENT){E.listenToEvent(o.oData);s.setForLoadingStep(o.sStepName,s.id.loadingStep.InProgress,o.oData.eventName,"continueOnEvent step sent to Event Processor");}else if(o.sStepType===L.BY_EVENT){a.loadComponentByEvent(o.oData);s.setForLoadingStep(o.sStepName,s.id.loadingStep.InProgress,o.oData,"byEvent step sent to FLP Loader");}else if(o.sStepType===L.WAIT_IN_MS){a.waitInMs(o.oData);s.setForLoadingStep(o.sStepName,s.id.loadingStep.InProgress,o.oData.iWaitingTime+"ms","WaitInMs step sent to FLP Loader");}else if(o.sStepType===L.BY_REQUIRE){var p=a.loadComponentByRequire(o.oData.sPath);this.oPathsLoading[o.sStepName]=p;s.setForLoadingStep(o.sStepName,s.id.loadingStep.InProgress,o.oData.sPath,"byRequire step sent to FLP Loader");var d=o.sStepName;p.then(function(){s.setForLoadingStep(d,s.id.loadingStep.InProgress,"","Step's promise has resolved");delete this.oPathsLoading[d];b.emit("StepDone",d);}.bind(this),function(){s.setForLoadingStep(d,s.id.loadingStep.FatalError,"","Step's promise failed");delete this.oPathsLoading[d];b.emit("StepFailed",d);}.bind(this));}else if(o.sStepType===L.BY_COMPONENT_CREATE){var P=a.loadComponentByComponentCreate(o.oData);this.oComponentsLoading[o.sStepName]=P;s.setForLoadingStep(o.sStepName,s.id.loadingStep.InProgress,o.oData,"byComponentCreate step sent to FLP Loader");P.then(function(){s.setForLoadingStep(o.sStepName,s.id.loadingStep.InProgress,"","Step's promise has resolved");delete this.oComponentsLoading[o.sStepName];b.emit("StepDone",o.sStepName);}.bind(this),function(){s.setForLoadingStep(o.sStepName,s.id.loadingStep.FatalError,"","Step's promise failed");delete this.oComponentsLoading[o.sStepName];b.emit("StepFailed",o.sStepName);}.bind(this));}}}while(n.sStatus!==S.WAIT);s.setForModule(s.id.module.schedulingAgent.id,s.id.module.schedulingAgent.Waiting,"Agent waits");}};return c;},false);

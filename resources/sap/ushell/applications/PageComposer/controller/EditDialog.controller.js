// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/strings/formatMessage","./BaseDialog.controller","sap/ui/core/Fragment","sap/ui/model/json/JSONModel"],function(f,B,F,J){"use strict";return B.extend("sap.ushell.applications.PageComposer.controller.EditDialog.controller",{constructor:function(v){this._oView=v;this._oModel=new J({title:"",message:"",validation:{}});this.sViewId="editDialog";this.sId="sap.ushell.applications.PageComposer.view.EditDialog";},onConfirm:function(){this._oView.byId("editDialog").close();B.prototype.onConfirm.apply(this,arguments);}});});

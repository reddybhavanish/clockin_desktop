// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/strings/formatMessage","./BaseDialog.controller","sap/ui/core/Fragment","sap/ui/model/json/JSONModel"],function(f,B,F,J){"use strict";return B.extend("sap.ushell.applications.PageComposer.controller.DeleteDialog.controller",{constructor:function(v){this._oView=v;this._createOrResetModel();this.sViewId="deletePageDialog";this.sId="sap.ushell.applications.PageComposer.view.DeleteDialog";},_createOrResetModel:function(){if(!this._oModel){this._oModel=new J();}this._oModel.setData({title:"",message:"",validation:{}});},destroy:function(){this._createOrResetModel();B.prototype.destroy.apply(this,arguments);}});});

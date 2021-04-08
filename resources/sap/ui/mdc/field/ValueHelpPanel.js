/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/XMLComposite','sap/ui/model/json/JSONModel','sap/ui/model/Filter','sap/ui/base/ManagedObjectObserver','sap/base/strings/formatMessage','sap/ui/model/resource/ResourceModel','sap/m/Tokenizer','sap/ui/mdc/util/ConditionValidated'],function(X,J,F,M,f,R,T,C){"use strict";var V=X.extend("sap.ui.mdc.field.ValueHelpPanel",{metadata:{properties:{showTokenizer:{type:"boolean",group:"Data",defaultValue:true},showFilterbar:{type:"boolean",group:"Data",defaultValue:true},conditions:{type:"object[]",group:"Data",defaultValue:[],byValue:true},filterConditions:{type:"object[]",group:"Data",defaultValue:[]},searchEnabled:{type:"boolean",group:"Data",defaultValue:true},formatOptions:{type:"object",defaultValue:{}},_filterBarVisible:{type:"boolean",group:"Appearance",defaultValue:false,visibility:"hidden"}},events:{search:{}}},fragment:"sap.ui.mdc.field.ValueHelpPanel",init:function(){var m=this._getManagedObjectModel();m.setSizeLimit(1000000);if(!this._oTokenizer){this._oTokenizer=this.byId("VHPTokenizer");this._oTokenizer.updateTokens=function(){T.prototype.updateTokens.apply(this,arguments);this.invalidate();};this._oTokenizer._oScroller.setHorizontal(true);}this._oTokenizerPanel=this.byId("VHPTokenizerPanel");var s=this.byId("SearchField");s.getFieldPath=a.bind(this);this._oAdvButton=this.byId("AdvancedFilter");this._oFilterVBox=this.byId("filterbarVBox");this._oFilterVBox._oValueHelpPanel=this;this._oFilterVBox.getItemsOriginal=this._oFilterVBox.getItems;this._oFilterVBox.getItems=function(){var i=this.getItemsOriginal();if(this._oValueHelpPanel._oFilterbar&&this._oValueHelpPanel.getProperty("_filterBarVisible")){i.push(this._oValueHelpPanel._oFilterbar);}return i;};this._oTablePanel=this.byId("tablePanel");this._oTablePanel._oValueHelpPanel=this;this._oTablePanel.getContentOriginal=this._oTablePanel.getContent;this._oTablePanel.getContent=function(){var c=this.getContentOriginal();if(this._oValueHelpPanel._oTable){c.push(this._oValueHelpPanel._oTable);}return c;};this._oObserver=new M(_.bind(this));this._oObserver.observe(this,{properties:["formatOptions","showFilterbar","showTokenizer","_filterBarVisible"]});this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");},exit:function(){if(!this.getShowTokenizer()){this._oTokenizerPanel.destroy();}if(this._oDefineConditionPanel&&!this._oDefineConditionPanel.getParent()){this._oDefineConditionPanel.destroy();}this._oObserver.disconnect();this._oObserver=undefined;this._oTablePanel=null;this._oFilterVBox=null;this._oAdvButton=null;this._oResourceBundle=null;},onBeforeRendering:function(){if(!this.getModel("$i18n")){this.setModel(new R({bundleName:"sap/ui/mdc/messagebundle",async:false}),"$i18n");}},setFilterbar:function(o){var s=this.getShowFilterbar();if(this._oFilterbar){this._oFilterbar.removeStyleClass("sapMdcValueHelpPanelFilterbar");if(this._bFilterbarParentSet){this._oFilterbar.setParent();delete this._bFilterbarParentSet;}}this._oFilterbar=o;if(o){o.addStyleClass("sapMdcValueHelpPanelFilterbar");if(!o.getParent()){o.setParent(this);this._bFilterbarParentSet=true;}o.getParent().getDirection=this._oFilterVBox.getDirection.bind(this._oFilterVBox);if(o.getLiveMode&&!o.getLiveMode()){o.setShowGoButton(false);}}var i=this.byId("iconTabBar");i.getItems()[0].setVisible(i.getItems()[0].getContent().length>0);i.setSelectedKey("selectFromList");this._updateITBHeaderVisiblity();this.setProperty("_filterBarVisible",s&&!!this._oFilterbar,true);},setTable:function(t){if(this._oTable){if(this._bTableParentSet&&this._oTable.getParent()){this._oTable.setParent();}delete this._bTableParentSet;}this._oTable=t;if(t){if(!t.getParent()){t.setParent(this);this._bTableParentSet=true;}}this._oTablePanel.invalidate();var i=this.byId("iconTabBar");i.getItems()[0].setVisible(i.getItems()[0].getContent().length>0);i.setSelectedKey("selectFromList");this._updateITBHeaderVisiblity();},getTable:function(){if(this._oTable){return this._oTable;}else{return undefined;}},setDefineConditions:function(d){var i=this.byId("iconTabBar");var p=this.byId("defineConditionPanel");if(this._oDefineConditionPanel){p.removeContent(this._oDefineConditionPanel);this._oDefineConditionPanel.destroy();}this._oDefineConditionPanel=d;i.getItems()[1].setVisible(!!this._oDefineConditionPanel);this._updateITBHeaderVisiblity();},_updateITBHeaderVisiblity:function(){var i=this.byId("iconTabBar");if(i.getItems()[0].getVisible()&&i.getItems()[1].getVisible()){i.removeStyleClass("sapMdcNoHeader");}else{i.addStyleClass("sapMdcNoHeader");}if(i.getItems()[1].getVisible()&&i.getSelectedKey()!=="selectFromList"){b.call(this);}},_handleTokenUpdate:function(e){if(e.getParameter("type")==="removed"){var r=e.getParameter("removedTokens");var c=this.getConditions();var i;for(i=0;i<r.length;i++){var o=r[i];var p=o.getBindingContext("$this").sPath;var I=parseInt(p.slice(p.lastIndexOf("/")+1));c[I].delete=true;}for(i=c.length-1;i>=0;i--){if(c[i].delete){c.splice(i,1);}}this.setProperty("conditions",c,true);}},_onToggleAdvancedFilter:function(e){this.setProperty("_filterBarVisible",!this.getProperty("_filterBarVisible"),true);},_onGo:function(e){this._oFilterbar.triggerSearch();},_onRemoveAllConditions:function(e){this.setProperty("conditions",[],true);},iconTabSelect:function(e){var k=e.getParameter("key");if(k==="defineCondition"){b.call(this);}},_formatListTabTitle:function(t,c){var d=0;for(var i=0;i<c.length;i++){var o=c[i];if(o.isEmpty!==true&&o.validated===C.Validated){d++;}}if(d===0){t=this._oResourceBundle.getText("valuehelp.SELECTFROMLISTNONUMBER");}return f(t,d);},_formatDefineTabTitle:function(t,c){var d=0;for(var i=0;i<c.length;i++){var o=c[i];if(o.isEmpty!==true&&o.validated!==C.Validated){d++;}}if(d===0){t=this._oResourceBundle.getText("valuehelp.DEFINECONDITIONSNONUMBER");}return f(t,d);},_formatDefineConditionTitle:function(){var t=this.getParent().getTitle&&this.getParent().getTitle();return t;},_formatTableTitle:function(t){var i=0;t=this._oResourceBundle.getText("valuehelp.TABLETITLENONUMBER");return f(t,i);},_formatTokenizerTitle:function(t,c){var d=0;for(var i=0;i<c.length;i++){var o=c[i];if(o.isEmpty!==true){d++;}}if(d===0){t=this._oResourceBundle.getText("valuehelp.TOKENIZERTITLENONUMBER");}return f(t,d);},_handleSearch:function(e){this.fireSearch();}});function _(c){if(c.name==="formatOptions"){var B=this._oTokenizer.getBindingInfo("tokens");if(B&&B.template){B=B.template.getBindingInfo("text");if(B&&B.type){B.type.setFormatOptions(c.current);}}}if(c.name==="showTokenizer"){var v=this.byId("rootVBox");var l=this._oTokenizer.getBinding("tokens");if(c.current){l.resume();v.insertItem(this._oTokenizerPanel,1);}else{l.suspend();v.removeItem(this._oTokenizerPanel);}}if(c.name==="showFilterbar"){this.setProperty("_filterBarVisible",c.current&&!!this._oFilterbar,true);}if(c.name==="_filterBarVisible"){this._oTablePanel.invalidate();this._oAdvButton.setText(this._oResourceBundle.getText("valuehelp."+(this.getProperty("_filterBarVisible")?"HIDE":"SHOW")+"ADVSEARCH"));}}function a(){var B=this.getBindingPath("filterConditions");if(B&&B.startsWith("/conditions/")){return B.slice(12);}else{return"";}}function b(){if(this._oDefineConditionPanel){if(!this._oDefineConditionPanel.getModel("$VHP")){var m=this._getManagedObjectModel();this._oDefineConditionPanel.setModel(m,"$VHP");var o=this._oDefineConditionPanel.getMetadata();if(o.hasProperty("formatOptions")&&!this._oDefineConditionPanel.getBindingPath("formatOptions")&&this._oDefineConditionPanel.isPropertyInitial("formatOptions")){this._oDefineConditionPanel.bindProperty("formatOptions",{path:"$VHP>/formatOptions"});}if(o.hasProperty("conditions")&&!this._oDefineConditionPanel.getBindingPath("conditions")&&this._oDefineConditionPanel.isPropertyInitial("conditions")){this._oDefineConditionPanel.bindProperty("conditions",{path:"$VHP>/conditions"});}}var p=this.byId("defineConditionPanel");p.addContent(this._oDefineConditionPanel);}}return V;});

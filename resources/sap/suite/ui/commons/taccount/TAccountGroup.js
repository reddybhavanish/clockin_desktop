sap.ui.define(["sap/ui/thirdparty/jquery","sap/suite/ui/commons/library","sap/ui/core/Control","sap/ui/core/theming/Parameters","./TAccountPanel","sap/ui/core/IconPool","sap/ui/core/Icon","sap/m/Button","sap/base/security/encodeXML","sap/ui/core/Configuration","sap/ui/core/delegate/ItemNavigation","./TAccountUtils","sap/ui/core/ResizeHandler",],function(q,l,C,P,T,I,a,B,e,b,c,d,R){"use strict";var r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var f=C.extend("sap.suite.ui.commons.taccount.TAccountGroup",{metadata:{library:"sap.suite.ui.commons",properties:{title:{type:"string",group:"Misc",defaultValue:null},collapsed:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{accounts:{type:"sap.suite.ui.commons.taccount.TAccount",multiple:true,singularName:"account"}},events:{}},renderer:function(o,g){if(!g._bThemeApplied){return;}o.write("<div");o.addClass("sapSuiteUiCommonsAccountGroup");if(g.getCollapsed()){o.addClass("sapSuiteUiCommonsAccountGroupCollapsed");}o.writeClasses(g);o.writeControlData(g);o.writeAttributeEscaped("aria-label",g._getSumText());o.write(">");o.write("<div class=\"sapSuiteUiCommonsGroupHeader\">");o.write("<div class=\"sapSuiteUiCommonsGroupHeaderExpandWrapper\">");o.renderControl(g._getExpandCollapse());o.write("</div>");o.write("<div class=\"sapSuiteUiCommonsGroupHeaderFirst\">");o.write("<span class=\"sapSuiteUiCommonsGroupHeaderTitle\">"+e(g.getTitle())+"</span>");o.write("<span id=\""+g.getId()+"-sum\" class=\"sapSuiteUiCommonsGrouptHeaderSUM\">"+g._getSumText()+"</span>");o.write("<div id=\"\" class=\"sapSuiteUiCommonsGroupInfoIconWrapper sapSuiteUiCommonsTAccountBaseInfoIconWrapper\" title=\""+r.getText("TACCOUNT_SELECTED")+"\">");o.write("<span class=\"sapSuiteUiCommonsInfoIcon\">");o.write("!");o.write("</span>");o.write("</div>");o.write("</div>");o.write("<div class=\"sapSuiteUiCommonsGroupHeaderSecond\">");o.renderControl(g._getExpandAllAccounts());o.renderControl(g._getCollapseAllAccounts());o.write("</div>");o.write("</div>");o.write("<div id=\""+g.getId()+"-content\" class=\"sapSuiteUiCommonsAccountGroupContent\">");g.getAccounts().forEach(function(i){o.renderControl(i);});o.write("</div>");o.write("</div>");}});f.prototype.init=function(){sap.ui.getCore().attachThemeChanged(function(){this._bThemeApplied=true;this.invalidate();},this);this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._sResizeHandlerId){this._sResizeHandlerId=R.register(this,this._adjustUI.bind(this));}};f.prototype.exit=function(){if(this._oIconExpand){this._oIconExpand.destroy();}if(this._oIconCollapse){this._oIconCollapse.destroy();}if(this._sResizeHandlerId){R.deregister(this._sResizeHandlerId);this._sResizeHandlerId="";}};f.prototype.onBeforeRendering=function(){this._bRendered=false;this._oSum=null;this._iColumnCount=-1;};f.prototype.onAfterRendering=function(){this._adjustUI();this._bRendered=true;var p=this.getParent();if(p&&this._hasPanelParent(p)&&p._bRendered){p._recalculate();}if(this.getCollapsed()){this.$("content").hide();}};f.prototype.reset=function(){this._oSum=null;};f.prototype.updateBindingContext=function(){this.reset();return C.prototype.updateBindingContext.apply(this,arguments);};f.prototype._hasPanelParent=function(p){return(p||this.getParent())instanceof T;};f.prototype._getExpandCollapse=function(){var g=this.getCollapsed(),t=this._getExpandAltText(!g);if(!this._oArrowDown){this._oArrowDown=new a({src:g?"sap-icon://navigation-right-arrow":"sap-icon://navigation-down-arrow",alt:t,tooltip:t,press:function(){this._expandCollapse();}.bind(this)});}return this._oArrowDown;};f.prototype._getExpandAltText=function(g){return(g?r.getText("TACCOUNT_COLLAPSE"):r.getText("TACCOUNT_EXPAND"))+" "+r.getText("TACCOUNT_GROUP_TITLE");};f.prototype._expandCollapse=function(){var g=this.getCollapsed(),t=this._getExpandAltText(g);this._getExpandCollapse().$().attr("aria-label",t);this._getExpandCollapse().setTooltip(t);this._getExpandCollapse().setSrc(g?"sap-icon://navigation-down-arrow":"sap-icon://navigation-right-arrow");this.setProperty("collapsed",!g,true);this._bIsExpanding=true;this.$("content")[g?"show":"hide"]("medium",function(){this._bIsExpanding=false;}.bind(this));this.$()[!g?"addClass":"removeClass"]("sapSuiteUiCommonsAccountGroupCollapsed");};f.prototype._expandCollapseAllAccounts=function(E){this.getAccounts().forEach(function(A){A.setCollapsed(!!E);});};f.prototype._getExpandAllAccounts=function(){if(!this._oIconExpand){this._oIconExpand=new B({icon:"sap-icon://expand-all",type:"Transparent",tooltip:r.getText("TACCOUNT_EXPAND"),press:this._expandCollapseAllAccounts.bind(this,false)}).addStyleClass("sapSuiteUiCommonsGroupHeaderIcon");}return this._oIconExpand;};f.prototype._getCollapseAllAccounts=function(){if(!this._oIconCollapse){this._oIconCollapse=new B({icon:"sap-icon://collapse-all",type:"Transparent",tooltip:r.getText("TACCOUNT_COLLAPSE"),press:this._expandCollapseAllAccounts.bind(this,true)}).addStyleClass("sapSuiteUiCommonsGroupHeaderIcon");}return this._oIconCollapse;};f.prototype._getSum=function(F){var A=this.getAccounts(),s=0,m="",g=true;if(!this._oSum||F){for(var i=0;i<A.length;i++){var o=A[i];if(m&&m!==o.getMeasureOfUnit()){g=false;break;}m=o.getMeasureOfUnit();s+=o._getSum();}this._oSum={sum:s,measure:m,correct:g};}return this._oSum;};f.prototype._getSumText=function(){var s=this._getSum();if(s&&s.correct){var v=d.formatCurrency(Math.abs(s.sum),s.measure);return(s.sum>0?r.getText("TACCOUNT_CREDIT"):r.getText("TACCOUNT_DEBIT"))+": "+v+" "+e(s.measure);}return"-";};f.prototype._getAriaText=function(){return"T Account Group "+e(this.getTitle())+" "+this._getSumText();};f.prototype._adjustUI=function(){var g=320,S=16,h=g+S;var $=this.$("content"),w=$.width(),j=Math.max(Math.ceil(w/(h))-1,1);if(j===this._iColumnCount){return;}if(this._bIsExpanding||(this._bRendered&&this.getCollapsed())){return;}var m=q("<div id=\""+this.getId()+"-content\" class=\"sapSuiteUiCommonsAccountGroupContent\"/>"),H=Array.apply(null,Array(j)).map(Number.prototype.valueOf,0);var n=this.$().find(".sapSuiteUiCommonsAccount"),o=0;this._iColumnCount=j;this._iDivs=[];var D="<div class=\"sapSuiteUiCommonsAccountGroupDroppingArea\"><div class=\"sapSuiteUiCommonsAccountGroupDroppingAreaInner\">"+"</div><div class=\"sapSuiteUiCommonsAccountGroupDroppingAreaInnerBall\"></div><div class=\"sapSuiteUiCommonsAccountGroupDroppingAreaInnerText\">"+r.getText("TACCOUNT_DROP_HERE")+"</div></div>";for(var i=0;i<j;i++){var s="<div class=\"sapSuiteUiCommonsAccountGroupColumn\">"+D+"</div>",p=q(s);m.append(p);this._iDivs.push(p);}for(var i=0;i<n.length;i++){var t=q(n[i]),u=t.height(),v=this._iDivs[o];var M=Number.MAX_VALUE,x=0;for(var k=0;k<j;k++){var y=H[k];if(y<M){M=y;x=k;}}var v=this._iDivs[x];t.detach().appendTo(v);q(D).appendTo(v);H[x]+=u;}$.detach();this.$().append(m);this._setupDroppable();};f.prototype._setupDroppable=function(){var g=function(o){var $=q(o);return $.hasClass("sapSuiteUiCommonsTAccountDropZoneTop")?$.parent().prev():$.parent().next();};var D=function($,u){var j=u.draggable,k=j.next();if(k[0]!==$[0]){k.detach().insertAfter($);j.detach().insertAfter($);}else{j.detach().insertBefore($);}$.removeClass("sapSuiteUiCommonsAccountGroupDroppingAreaActiveSide");j.css("left",0);j.css("top",0);};var i=this.$().find(".sapSuiteUiCommonsAccountGroupDroppingArea");i.droppable({scope:this.getId()+"-content",tolerance:"pointer",activeClass:"sapSuiteUiCommonsAccountGroupDroppingAreaActive",hoverClass:"sapSuiteUiCommonsAccountGroupDroppingAreaActive",drop:function(E,u){var $=q(this);D($,u);}});var h=this.$().find(".sapSuiteUiCommonsTAccountDropZoneBottom, .sapSuiteUiCommonsTAccountDropZoneTop");h.droppable({scope:this.getId()+"-content",tolerance:"pointer",drop:function(j,u){var $=q(this);$=$.hasClass("sapSuiteUiCommonsTAccountDropZoneTop")?$.parent().prev():$.parent().next();D($,u);},over:function(j,u){g(this).addClass("sapSuiteUiCommonsAccountGroupDroppingAreaActiveSide");},out:function(j,u){g(this).removeClass("sapSuiteUiCommonsAccountGroupDroppingAreaActiveSide");}});};f.prototype._valueChanged=function(D){if(this._oSum){this._oSum.sum+=D;this.$("sum").text(this._getSumText());var p=this.getParent();if(this._hasPanelParent(p)){p._valueChanged(D);}}};f.prototype._measureChanged=function(m){if(this._oSum){if(this._oSum.measure===m&&!this._oSum.correct){this._recalculate();return;}if(this._oSum.measure!==m&&this._oSum.correct){var p=this.getParent();this._oSum.correct=false;if(this._hasPanelParent(p)){p._setInvalid();}}this.$("sum").text(this._getSumText());}};f.prototype._recalculate=function(){this._oSum=this._getSum(true);this.$("sum").text(this._getSumText());var p=this.getParent();if(this._hasPanelParent(p)){p._recalculate();}};f.prototype._hasPanelParent=function(p){return(p||this.getParent())instanceof T;};f.prototype.invalidate=function(){this._bRendered=false;C.prototype.invalidate.apply(this,arguments);};return f;});
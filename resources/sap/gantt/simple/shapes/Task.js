/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["./Shape","sap/gantt/library","sap/gantt/simple/InnerGanttChartRenderer"],function(S,l,I){"use strict";var T=l.simple.shapes.TaskType;var C=10;function g(s){var o=Object.assign({},s);o.iStartX-=1;o.iEndX+=1;o.iHeight+=2;return o;}var a=S.extend("sap.gantt.simple.shapes.Task",{metadata:{properties:{type:{type:"sap.gantt.simple.shapes.TaskType",defaultValue:T.Normal},utilizationDown:{type:"boolean",defaultValue:true},title:{type:"string",defaultValue:null}}}});a.prototype._generateRectD=function(s){var c=this.getRowYCenter(),d="";d+="M "+s.iStartX+" "+c;var u=s.iHeight/2,L=s.iEndX-s.iStartX,r=this.generateArcRadius(u,L);d+=" l 0 "+(-u+r);d+=" a "+r+" "+r+" 0 0 1 "+r+" "+(-r);L-=r;var R=this.generateArcRadius(L-r,u);L-=R;d+=" l "+L+" 0";d+=" a "+R+" "+R+" 0 0 1 "+R+" "+R;d+=" l 0 "+(2*u-R-r);d+=" a "+R+" "+R+" 0 0 1 "+(-R)+" "+R;d+=" l "+(-L)+" 0";d+=" a "+r+" "+r+" 0 0 1 "+(-r)+" "+(-r);d+=" Z";return d;};a.prototype._renderOverlappingRectangle=function(r,s){var d=this._generateRectD(g(s));r.write("<path class=\"sapGanttShapeOverlappingBorder\" d=\""+d+"\" />");};a.prototype.renderNoramlTask=function(r,s){this._renderOverlappingRectangle(r,s);var d=this._generateRectD(s);r.write("<path d=\""+d+"\" ");if(this.getHoverState()){r.write("fill=\""+this.getHoverBackgroundColor()+"\" stroke-width=\"1\" stroke=\""+this.getHoverColor()+"\"");}else if(this.getSelected()){r.write("fill=\""+this.getSelectedColor()+"\"");}else{r.write("fill=\""+this.getTranslatedColor()+"\"");}r.write(" />");};a.prototype._generateSummaryD=function(s,f){var c=this.getRowYCenter(),d="",L=f?7:5;d+="M "+s.iStartX+" "+c;var u=s.iHeight/2,i=s.iEndX-s.iStartX,r=this.generateArcRadius(u,i);d+=" l 0 "+(-u+r);d+=" a "+r+" "+r+" 0 0 1 "+r+" "+(-r);i-=r;var R=this.generateArcRadius(i-r,u);i-=R;d+=" l "+i+" 0";d+=" a "+R+" "+R+" 0 0 1 "+R+" "+R;d+=" l 0 "+(2*u-R-3);d+=" a 3 5 0 0 1 -"+L+" 0";d+=" l 0 "+(-2*u+R+L);d+=" l "+(-i+2*L-r-R)+" 0";d+=" l 0 "+(2*u-r-L);d+=" a 3 5 0 0 1 -"+L+" 0";d+=" Z";return d;};a.prototype.renderSummaryTaskExpanded=function(r,s){if(Math.abs(s.iEndX-s.iStartX)<=C){this.renderNoramlTask(r,s);}else{var d;if(!s.bFromCollapsed){d=this._generateSummaryD(g(s),true);r.write("<path class=\"sapGanttShapeOverlappingBorder\" d=\""+d+"\" />");}d=this._generateSummaryD(s);r.write("<path d=\""+d+"\"");if(this.getHoverState()){r.write("fill=\""+this.getHoverBackgroundColor()+"\" stroke-width=\"1\" stroke=\""+this.getHoverColor()+"\"");}else if(this.getSelected()){r.write(" fill=\""+this.getSelectedColor()+"\"");if(s.bFromCollapsed){r.write(" stroke-width=\"1.0001\" stroke=\"white\" shape-rendering=\"crispEdges\"");}}else{r.write(" fill=\""+this.getTranslatedColor()+"\"");}r.write(" />");}};a.prototype.renderSummaryTaskCollapsed=function(r,s){if(Math.abs(s.iEndX-s.iStartX)<=C){this.renderNoramlTask(r,s);}else{this._renderOverlappingRectangle(r,s);var d=this._generateRectD(s);r.write("<path d=\""+d+"\"");if(this.getHoverState()){r.write("fill=\""+this.getHoverBackgroundColor()+"\" stroke-width=\"1\" stroke=\""+this.getHoverColor()+"\"");}else if(this.getSelected()){r.write(" fill=\""+this.getSelectedColor()+"\"");}else{r.write(" fill=\""+this.getTranslatedColor()+"\" fill-opacity=\"0.7\"");}r.write(" />");this.renderSummaryTaskExpanded(r,Object.assign({},s,{bFromCollapsed:true}));}};a.prototype.renderErrorTask=function(r,s){this._renderOverlappingRectangle(r,s);var m=this.getId()+"-mask",d=this._generateRectD(s),b,f,p;if(this.getGanttChartBase()){p=this.getGanttChartBase().getId()+"-helperDef-linePattern";}else{I.renderHelperDefs(r,this.getId());p=this.getId()+"-helperDef-linePattern";}if(this.getHoverState()){b=this.getHoverColor();f=this.getHoverBackgroundColor();}else if(this.getSelected()){b=f=this.getSelectedColor();}else{b=f=this.getTranslatedColor();}r.write("<mask id=\""+m+"\">");r.write("<path d=\""+d+"\" stroke=\"white\" stroke-width=\"1\" fill=\"url(#"+p+")\" />");r.write("</mask>");r.write("<path d=\""+d+"\" stroke=\""+b+"\" stroke-width=\"1\" fill=\""+f+"\" mask=\"url(#"+m+")\" />");};a.prototype.renderContent=function(r){var s={iHeight:this.getPixelHeight()-this.getRowPadding(),iStartX:this.getXStart(),iEndX:this.getXEnd()};switch(this.getType()){case T.Normal:this.renderNoramlTask(r,s);break;case T.Error:this.renderErrorTask(r,s);break;case T.SummaryCollapsed:this.renderSummaryTaskCollapsed(r,s);break;case T.SummaryExpanded:this.renderSummaryTaskExpanded(r,s);break;default:throw new Error("Unknown type of Task: "+this.getType());}};a.prototype.renderElement=function(r){r.write("<g");this.writeElementData(r);r.write(" pointer-events=\"bounding-box\">");this.renderContent(r);r.write("</g>");};return a;});

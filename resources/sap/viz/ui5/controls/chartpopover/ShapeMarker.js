/*!
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/core/theming/Parameters','../common/utils/SelectionDetailUtil'],function(C,P,S){"use strict";var a=C.extend('sap.viz.ui5.controls.chartpopover.ShapeMarker',{metadata:{properties:{'type':'string','color':'string','markerSize':'int','showWithLine':'string','lineInfo':'object','stroke':'object','pattern':'string'}},renderer:{render:function(r,c){var m=c.getMarkerSize()?c.getMarkerSize():10;var p=m/2,b=p,w=m,h=m;if(c._isShowWithLine()){p=m;w=m*2;m=6;}var d={rx:m/2,ry:m/2,type:c.getType(),borderWidth:0};r.write('<div');r.writeClasses();r.write('>');r.write('<svg width='+w+'px height='+h+'px '+'focusable = false');r.write('>');if(c._isShowWithLine()){var l=c.getLineInfo(),e=P.get(l.lineColor);if(!e){e=l.lineColor?l.lineColor:c.getColor();}if(l.lineType==='dotted'||l.lineType==='dash'){r.write("<line x1 = '0' y1='"+b+"' x2 = '"+w+"' y2 = '"+b+"' ");r.write("stroke-width = '2' ");r.write(" stroke-dasharray = '5, 3' ");}else if(l.lineType==='dot'){var f=Math.floor(w/2);f=f&1?f:f-1;if(f<3){f=3;}var g=w/f;r.write("<line x1 ='"+(g/2)+"'y1='"+b+"' x2 = '"+w+"' y2 = '"+b+"' ");r.write(" stroke-dasharray = ' 0,"+g*2+"'");r.write("stroke-width = '"+g+"'");r.write("stroke-linecap = 'round'");}else{r.write("<line x1 = '0' y1='"+b+"' x2 = '"+w+"' y2 = '"+b+"' ");r.write("stroke-width = '2' ");}r.write(" stroke = '"+e+"'");r.write("> </line>");}if(d.type){r.write("<path d = '"+S.generateShapePath(d)+"'");var i=c.getPattern();if(!i){r.write(" fill = '"+c.getColor()+"'");}else if(i==='noFill'){var j=P.get('sapUiChartBackgroundColor');if(j==='transparent'){j="white";}r.write(" fill = '"+j+"'");r.write(" stroke = '"+c.getColor()+"' stroke-width= '1px'");}else{r.write(" fill = '"+i+"'");}r.write(" transform = 'translate("+p+","+b+")'");r.write('></path>');}r.write('</svg>');r.write('</div>');r.writeStyles();}}});a.prototype._isShowWithLine=function(){return(this.getShowWithLine()==='line')&&this.getLineInfo();};return a;});

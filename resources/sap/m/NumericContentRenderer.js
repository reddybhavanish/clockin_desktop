/*!
 * @copyright@
 */
sap.ui.define(["sap/m/library"],function(l){"use strict";var N={};N.render=function(r,c){var s=c.getState();var w=c.getWithMargin();var W=w?"":"WithoutMargin";r.write("<div");r.writeControlData(c);var t=c.getTooltip_AsString();if(typeof t!=="string"){t="";}r.writeAttributeEscaped("aria-label",t);r.writeAttribute("role","img");if(s===l.LoadState.Failed||s===l.LoadState.Loading){r.writeAttribute("aria-disabled","true");}if(c.getAnimateTextChange()){r.addClass("sapMNCAnimation");}if(c.getWidth()){r.addStyle("width",c.getWidth());}r.writeStyles();r.addClass("sapMNC");r.addClass(W);if(c.hasListeners("press")){r.writeAttribute("tabindex","0");r.addClass("sapMPointer");}r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMNCInner");r.addClass(W);r.writeClasses();r.write(">");this._renderValue(r,c,W);r.write("</div>");r.write("</div>");};N._prepareAndRenderIcon=function(r,c,i,n){if(i){var s,L=l.LoadState,C=c.getState();for(s in L){if(L.hasOwnProperty(s)&&s!==C){i.removeStyleClass(s);}else if(L.hasOwnProperty(s)&&s===C){i.addStyleClass(s);}}i.addStyleClass("sapMNCIconImage");var S={sapMNCLargeFontSize:false,sapMNCMediumFontSize:false,sapMNCSmallFontSize:false};S[n]=true;Object.keys(S).forEach(function(k){i.toggleStyleClass(k,S[k]);});r.renderControl(i);}};N._renderScaleAndIndicator=function(r,c,w,v,s,n){var i=l.DeviationIndicator.None!==c.getIndicator()&&v!=="";var S=s&&v;if(i||S){var a=c.getState();var C=c.getValueColor();r.write("<div");r.writeAttribute("id",c.getId()+"-indicator");r.addClass("sapMNCIndScale");r.addClass(w);r.addClass(C);r.addClass(a);if(n){r.addClass(n);}r.writeClasses();r.write(">");r.renderControl(c._oIndicatorIcon);if(S){r.write("<div");r.writeAttribute("id",c.getId()+"-scale");r.addClass("sapMNCScale");r.addClass(a);r.addClass(C);r.writeClasses();r.write(">");r.writeEscaped(s);r.write("</div>");}r.write("</div>");}};N._renderValue=function(r,c,w){var v=c.getValue();var s=c.getScale();if(c.getFormatterValue()){var f=c._parseFormattedValue(v);s=f.scale;v=f.value;}var e=c.getNullifyValue()?"0":"";r.write("<div");r.writeAttribute("id",c.getId()+"-value");r.addClass("sapMNCValue");r.addClass(w);r.addClass(c.getValueColor());r.addClass(c.getState());r.writeClasses();r.write(">");var m=c._getMaxDigitsData();this._prepareAndRenderIcon(r,c,c._oIcon,m.fontClass);var C=c.getTruncateValueTo()||m.maxLength;r.write("<span id=\""+c.getId()+"-value-inner\"");if(m.fontClass){r.addClass(m.fontClass);}r.writeClasses();r.write(">");if(v.length>=C&&(v[C-1]==="."||v[C-1]===",")){r.writeEscaped(v.substring(0,C-1));}else{r.writeEscaped(v?v.substring(0,C):e);}r.write("</span>");this._renderScaleAndIndicator(r,c,w,v,s,m.fontClass);r.write("</div>");};return N;},true);

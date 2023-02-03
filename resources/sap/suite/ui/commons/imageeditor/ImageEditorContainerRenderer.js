sap.ui.define(["sap/ui/Device"],function(D){"use strict";var r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var I={};I.render=function(R,c){R.write("<div");R.addClass("sapSuiteUiCommonsImageEditorContainer");R.writeControlData(c);R.writeAttribute("tabindex","0");R.writeAttribute("aria-label",r.getText("IMGEDITOR_ACCESSIBILITY_LABEL"));R.writeClasses();R.write(">");this.renderSvgFilters(R,c);this.renderHeaderToolbar(R,c);this.renderMobileHeaderToolbar(R,c);R.write("<div");R.addClass("sapSuiteUiCommonsImageEditorContainerContent");R.writeClasses();R.write(">");this.renderOptionsPanel(R,c);this.renderImageEditor(R,c);R.write("</div>");this.renderMobileZoomToolbar(R,c);this.renderMobileFooterToolbar(R,c);R.write("</div>");};I.renderSvgFilters=function(R,c){R.write("<svg width='0' height='0' style='position: absolute;'>");R.write("<defs>");this.renderOriginalThumbnail(R,c);this.renderSepiaFilter(R,c);this.renderGrayscaleFilter(R,c);this.renderSaturateFilter(R,c);this.renderInvertFilter(R,c);this.renderBrightnessFilter(R,c);this.renderContrastFilter(R,c);this.renderHueRotateFilter(R,c);R.write("</defs>");R.write("</svg>");};I.renderOriginalThumbnail=function(R,c){var i=c.getImageEditor();if(!i||!i._oCanvas){return;}R.write("<image xmlns:xlink='http://www.w3.org/1999/xlink'");R.writeAttribute("id",c.getId()+"-origThumbnail");R.writeAttribute("preserveAspectRatio","xMidYMid slice");R.writeAttribute("viewBox","0 0 "+c._oThumbnailCanvas.width+" "+c._oThumbnailCanvas.height);R.writeAttribute("href",i._oCanvas.toDataURL());R.writeAttribute("width","100%");R.writeAttribute("height","100%");R.write("/>");};I.renderSepiaFilter=function(R,c){R.write("<filter id='"+c.getId()+"-sepia'>");R.write("<feColorMatrix type='matrix' values='0.393 0.769 0.189 0 0  0.349 0.686 0.168 0 0  0.272 0.534 0.131 0 0  0 0 0 1 0'/>");R.write("</filter>");};I.renderGrayscaleFilter=function(R,c){R.write("<filter id='"+c.getId()+"-grayscale'>");R.write("<feColorMatrix type='matrix' values='0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0  0.2126 0.7152 0.0722 0 0 0 0 0 1 0'/>");R.write("</filter>");};I.renderSaturateFilter=function(R,c){R.write(" <filter id='"+c.getId()+"-saturate'>");R.write("<feColorMatrix type='saturate' values='3'/>");R.write("</filter>");};I.renderInvertFilter=function(R,c){R.write("<filter id='"+c.getId()+"-invert'>");R.write("<feComponentTransfer><feFuncR type='table' tableValues='1 0'/><feFuncG type='table' tableValues='1 0'/><feFuncB type='table' tableValues='1 0'/></feComponentTransfer>");R.write("</filter>");};I.renderBrightnessFilter=function(R,c){R.write("<filter id='"+c.getId()+"-brightness'>");R.write("<feComponentTransfer><feFuncR type='linear' slope='3'/><feFuncG type='linear' slope='3'/><feFuncB type='linear' slope='3'/></feComponentTransfer>");R.write("</filter>");};I.renderContrastFilter=function(R,c){R.write("<filter id='"+c.getId()+"-contrast'>");R.write("<feComponentTransfer>");R.write("<feFuncR type='linear' slope='3' intercept='-0.3'/>");R.write("<feFuncG type='linear' slope='3' intercept='-0.3'/>");R.write("<feFuncB type='linear' slope='3' intercept='-0.3'/>");R.write("</feComponentTransfer>");R.write("</filter>");};I.renderHueRotateFilter=function(R,c){R.write("<filter id='"+c.getId()+"-hueRotate'>");R.write("<feColorMatrix type='hueRotate' values='90' />");R.write("</filter>");};I.renderHeaderToolbar=function(R,c){if(!D.system.phone&&!c._isSmallSize()){var h=c._getHeaderToolbar();R.renderControl(h);}};I.renderMobileHeaderToolbar=function(R,c){if(D.system.phone||c._isSmallSize()){var h=c._getMobileHeaderToolbar();R.renderControl(h);}};I.renderMobileZoomToolbar=function(R,c){var h=c._getMobileZoomToolbar();R.renderControl(h);};I.renderMobileFooterToolbar=function(R,c){var h=c._getMobileFooterToolbar();R.renderControl(h);};I.renderOptionsPanel=function(R,c){var o=c._getOptionsPanel();R.renderControl(o);c._refreshGridListsItems();};I.renderImageEditor=function(R,c){var i=c.getImageEditor();R.write("<div");R.addClass("sapSuiteUiCommonsImageEditorContainerWrapper");R.writeClasses();R.write(">");if(i){R.renderControl(i);}R.write("</div>");};return I;},true);

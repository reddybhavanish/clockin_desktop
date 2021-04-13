ace.define("ace/split",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/lib/event_emitter","ace/editor","ace/virtual_renderer","ace/edit_session"],function(r,e,m){"use strict";var o=r("./lib/oop");var l=r("./lib/lang");var E=r("./lib/event_emitter").EventEmitter;var a=r("./editor").Editor;var R=r("./virtual_renderer").VirtualRenderer;var b=r("./edit_session").EditSession;var S=function(c,t,s){this.BELOW=1;this.BESIDE=0;this.$container=c;this.$theme=t;this.$splits=0;this.$editorCSS="";this.$editors=[];this.$orientation=this.BESIDE;this.setSplits(s||1);this.$cEditor=this.$editors[0];this.on("focus",function(d){this.$cEditor=d;}.bind(this));};(function(){o.implement(this,E);this.$createEditor=function(){var c=document.createElement("div");c.className=this.$editorCSS;c.style.cssText="position: absolute; top:0px; bottom:0px";this.$container.appendChild(c);var d=new a(new R(c,this.$theme));d.on("focus",function(){this._emit("focus",d);}.bind(this));this.$editors.push(d);d.setFontSize(this.$fontSize);return d;};this.setSplits=function(s){var c;if(s<1){throw"The number of splits have to be > 0!";}if(s==this.$splits){return;}else if(s>this.$splits){while(this.$splits<this.$editors.length&&this.$splits<s){c=this.$editors[this.$splits];this.$container.appendChild(c.container);c.setFontSize(this.$fontSize);this.$splits++;}while(this.$splits<s){this.$createEditor();this.$splits++;}}else{while(this.$splits>s){c=this.$editors[this.$splits-1];this.$container.removeChild(c.container);this.$splits--;}}this.resize();};this.getSplits=function(){return this.$splits;};this.getEditor=function(i){return this.$editors[i];};this.getCurrentEditor=function(){return this.$cEditor;};this.focus=function(){this.$cEditor.focus();};this.blur=function(){this.$cEditor.blur();};this.setTheme=function(t){this.$editors.forEach(function(c){c.setTheme(t);});};this.setKeyboardHandler=function(k){this.$editors.forEach(function(c){c.setKeyboardHandler(k);});};this.forEach=function(c,s){this.$editors.forEach(c,s);};this.$fontSize="";this.setFontSize=function(s){this.$fontSize=s;this.forEach(function(c){c.setFontSize(s);});};this.$cloneSession=function(c){var s=new b(c.getDocument(),c.getMode());var u=c.getUndoManager();s.setUndoManager(u);s.setTabSize(c.getTabSize());s.setUseSoftTabs(c.getUseSoftTabs());s.setOverwrite(c.getOverwrite());s.setBreakpoints(c.getBreakpoints());s.setUseWrapMode(c.getUseWrapMode());s.setUseWorker(c.getUseWorker());s.setWrapLimitRange(c.$wrapLimitRange.min,c.$wrapLimitRange.max);s.$foldData=c.$cloneFoldData();return s;};this.setSession=function(s,i){var c;if(i==null){c=this.$cEditor;}else{c=this.$editors[i];}var d=this.$editors.some(function(c){return c.session===s;});if(d){s=this.$cloneSession(s);}c.setSession(s);return s;};this.getOrientation=function(){return this.$orientation;};this.setOrientation=function(c){if(this.$orientation==c){return;}this.$orientation=c;this.resize();};this.resize=function(){var w=this.$container.clientWidth;var h=this.$container.clientHeight;var c;if(this.$orientation==this.BESIDE){var d=w/this.$splits;for(var i=0;i<this.$splits;i++){c=this.$editors[i];c.container.style.width=d+"px";c.container.style.top="0px";c.container.style.left=i*d+"px";c.container.style.height=h+"px";c.resize();}}else{var f=h/this.$splits;for(var i=0;i<this.$splits;i++){c=this.$editors[i];c.container.style.width=w+"px";c.container.style.top=i*f+"px";c.container.style.left="0px";c.container.style.height=f+"px";c.resize();}}};}).call(S.prototype);e.Split=S;});ace.define("ace/ext/split",["require","exports","module","ace/split"],function(r,e,m){"use strict";m.exports=r("../split");});(function(){ace.require(["ace/ext/split"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
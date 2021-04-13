sap.ui.define(["sap/ui/test/OpaBuilder","./FEBuilder","sap/fe/test/Utils","sap/ui/test/matchers/Interactable"],function(O,F,U,I){"use strict";var a=function(){return F.apply(this,arguments);};a.create=function(o){return new a(o);};a.prototype=Object.create(F.prototype);a.prototype.constructor=a;a._toggleOverflow=function(b,o,t){var s="overflowButton";if(t){s=t+"-"+s;}return b.doConditional(O.Matchers.childrenMatcher(O.create().has(F.Matchers.id(new RegExp(s+"$"))).hasProperties({pressed:!o}).has(new I()).mustBeEnabled().mustBeVisible()),O.Actions.press(s));};a.openOverflow=function(b,t){return a._toggleOverflow(b,true,t);};a.closeOverflow=function(b,t){return a._toggleOverflow(b,false,t);};a.prototype.doOpenOverflow=function(){return a.openOverflow(this);};a.prototype.doCloseOverflow=function(){return a.closeOverflow(this);};a.prototype.doOnContent=function(c,C){var s=new a(this._getOpaInstance(),this.build()).doOnAggregation("content",[c,new I()],C||O.Actions.press());return this.doOpenOverflow().success(s);};a.prototype.hasContent=function(c,s){var m=[c];if(s){m.push(F.Matchers.states(s));}var S=new a(this._getOpaInstance(),this.build()).hasAggregation("content",m);return this.doOpenOverflow().success(S);};return a;});
// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/util/now"],function(q,n){"use strict";var P=function(){var p=false,b={};function M(h,a,s,i){this.hash=h;this.name=a;this.start=s;this.end=0;this.duration=0;this.info=i;}function B(h,a,s,c,d){this.hash=h;this.name=a;this.scenario=c;this.sequence=d;this.start=s;this.end=0;this.percent=null;this.duration=0;this.funcs={};}this.start=function(s,a,c){var t=n(),o;if(!p){return;}if(b[s]===undefined||b[s]===null){b[s]={};}if(b[s][a]===undefined){b[s][a]=null;}if(b[s][a]===null){o=new B(this.hash(),a,t,s,c);b[s][o.name]=o;}};this.startFunc=function(s,a,c,f,i){if(!p){return;}var t=n();var d=null;if(b[s]===undefined||b[s]===null){b[s]={};}if(b[s][a]===undefined){b[s][a]=null;}if(b[s][a]===null){d=new B(this.hash(),a,t,s,c);b[s][a]=d;}var e=new M(this.hash(),f,t,i);b[s][a].funcs[e.hash]=e;return e.hash;};this.end=function(s,a){if(!p){return;}var t=n();if(b[s][a]===undefined){b[s][a]=null;}if(b[s][a]!=null){b[s][a].end=t;b[s][a].duration=Math.round(b[s][a].end-b[s][a].start);}};this.endFunc=function(s,a,f){if(!p){return;}var t=n();if(b[s][a]===undefined){b[s][a]=null;}if(b[s][a]!=null){b[s][a].end=t;b[s][a].duration=Math.round(b[s][a].end-b[s][a].start);b[s][a].funcs[f].end=t;b[s][a].funcs[f].duration=Math.round(b[s][a].funcs[f].end-b[s][a].funcs[f].start);}};this.calc=function(){if(!p){return;}return b;};this.hash=function(){if(!p){return;}var v=(new Date()).valueOf().toString()+Math.random().toString();var h=5381;for(var i=0;i<v.length;i++){var c=v.charCodeAt(i);h=((h<<5)+h)+c;}return h;};this.getActive=function(){return p;};this.setActive=function(o,c){if(p===o){return;}p=o;document.addEventListener("keyup",function(e){if(e.shiftKey&&e.ctrlKey&&e.altKey&&e.keyCode==77){window.calc=JSON.stringify(q.sap.flpmeasure.calc());window.open(sap.ui.require.toUrl("sap/ushell/renderers/fiori2/stat")+".html");}},false);return p;};var m=location.href.match(/sap-flp-measure=([^&]*)/);if(m&&m[1]){if(m[1]==="true"||m[1]==="x"||m[1]==="X"){this.setActive(true);}else{this.setActive(true,m[1]);}}};q.sap.flpmeasure=q.sap.flpmeasure||new P();return q.sap.flpmeasure;});

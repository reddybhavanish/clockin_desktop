// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/GroupHeaderListItem","sap/ui/base/ManagedObject","sap/base/util/uid"],function(G,M,g){"use strict";var o={};o.updateAggregation=function(n){if(this.isTreeBinding(n)){M.prototype.updateAggregation.apply(this,arguments);}else{var b=this.mBindingInfos[n],B=b.binding,a=B.getContexts(),f=b.factory,A=this.getMetadata().getJSONKeys()[n],s=A._sMutator+"Group",c=B.isGrouped()&&this[s],i=[],d=function(C){var I=this.getId()+"-"+g(),e=f(I,C);e.setBindingContext(C,b.model);this[A._sMutator](e);}.bind(this);if(c){M.prototype.updateAggregation.apply(this,arguments);}else{i=this[A._sGetter]();o._adaptCurrentGroup(a,i);o._updateCurrentGroup(a,i,b.model,d);i.length=a.length;}}};o._adaptCurrentGroup=function(b,I){var i,a,c;for(i=0;i<b.length;i++){a=!!(I[i]&&I[i].isA("sap.ui.integration.widgets.Card"));c=!!b[i].getProperty(b[i].sPath+"/isCard");if(a||c){var j=i;for(;j<I.length;j++){I[j].destroy();}break;}}};o._updateCurrentGroup=function(b,I,B,a){var i;for(i=0;i<b.length;i++){if(i<I.length&&!I[i].bIsDestroyed){I[i].setBindingContext(b[i],B);}else{a(b[i]);}}for(;i<I.length;++i){I[i].destroy();}};o.updateAggregationGrouped=function(n){var b=this.mBindingInfos[n],B=b.binding,f=b.factory,c,N=null,a=null,s=null,t=this,I=t.getItems(),l=0,L=0,i,d,T=[];a=B.isGrouped()&&this.addItemGroup;jQuery.each(B.getContexts(),function(e,C){if(a&&B.aSorters.length>0){N=B.aSorters[0].fnGroup(C);if(typeof N==="string"){N={key:N};}if(N.key!==s){var h,H;if(b.groupHeaderFactory){h=b.groupHeaderFactory(N);}H=h||new G({title:N.text||N.key}).addStyleClass("sapMListHdr");t.insertAggregation("items",H,L,true);L=L+1;s=N.key;}}I=t.getItems();for(i=L;i<I.length;i=i+1){if(I[i].constructor===G){T.push(t.removeItem(I[i]));I=t.getItems();}}if(L<I.length){I[L].setBindingContext(C,b.model);if(I[L].aDelegates){jQuery.each(I[L].aDelegates,function(i,v){v.vThis=C;});}}else{d=t.getId()+"-"+L;c=f(d,C);c.setBindingContext(C,b.model);t.addItem(c);}L=L+1;l=L;});for(i=I.length-1;i>=l;i=i-1){T.push(t.removeItem(I[i]));}setTimeout(function(){jQuery.each(T,function(i,v){v.destroy();});},1);};o.updateAggregatesFactory=function(n){return function(){o.updateAggregation.bind(this)(n);};};return o;},true);

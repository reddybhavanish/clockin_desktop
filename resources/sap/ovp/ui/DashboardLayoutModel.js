sap.ui.define(["sap/ui/thirdparty/jquery","sap/ovp/cards/CommonUtils"],function(q,C){"use strict";var L=function(u,c,r,i){this.uiModel=u;this.setColCount(c);this.aCards=[];this.oLayoutVars=null;this.iDisplaceRow=null;this.iDummyRow=999;this.iRowHeightPx=r;this.iCardBorderPx=i;};L.prototype.setColCount=function(c){if(!c){this.iColCount=5;}else if(c!==this.iColCount){this.iColCount=c;}};L.prototype.setLayoutVars=function(l){if(Array.isArray(l)&&l.length>0){this.oLayoutVars=l;}this._buildGrid();};L.prototype.updateCardVisibility=function(c){var o,a;function f(b){return b.id===c[i].id;}for(var i=0;i<c.length;i++){o=this.oLayoutVars.filter(f);a=this.aCards.filter(f);if(!c[i].visibility){o[0].dashboardLayout['C'+this.iColCount].row=this._findHighestOccupiedRow();a[0].dashboardLayout.row=o[0].dashboardLayout['C'+this.iColCount].row;}o[0].visibility=c[i].visibility;a[0].dashboardLayout.visible=c[i].visibility;}};L.prototype.getColCount=function(){return this.iColCount;};L.prototype.getCards=function(c){if(this.aCards.length===0||c&&c!==this.iColCount){if(c){this.setColCount(c);}this._buildGrid();}return this.aCards;};L.prototype.getCardById=function(c){var o=null,i=0;for(i=0;i<this.aCards.length;i++){o=this.aCards[i];if(o.id===c){break;}}return o;};L.prototype.getLayoutVariants4Pers=function(){return JSON.parse(JSON.stringify(this.oLayoutVars));};L.prototype._readVariants=function(){var v,i,l=this.uiModel.getProperty('/dashboardLayout');function f(e){return e.id===i;}if(!!l){for(var a in l){if(l.hasOwnProperty(a)&&l[a]){v=l[a];v.id=a;for(i in v){var o=this.oLayoutVars.filter(f);if(o.length>0){var s='C'+ +v.id.replace(/[^0-9\.]/g,"");var c=o[0].dashboardLayout[s];var b=this.aCards.filter(f);if(Array.isArray(b)&&b.length>0){if(c){c.row=v[i].row;c.col=v[i].col;c.colSpan=b[0].template==='sap.ovp.cards.stack'?1:Math.min(v[i].colSpan,this.iColCount);c.maxColSpan=v[i].maxColSpan;c.noOfItems=v[i].rowSpan;}else{o[0].dashboardLayout[s]={row:v[i].row,col:v[i].col,colSpan:b[0].template==='sap.ovp.cards.stack'?1:Math.min(v[i].colSpan,this.iColCount),maxColSpan:v[i].maxColSpan,noOfItems:v[i].rowSpan,autoSpan:b[0].template==='sap.ovp.cards.stack'?false:true};}o[0].visibility=v[i].visible?v[i].visible:true;}}}}}}};L.prototype.resetToManifest=function(){this.oLayoutVars=null;for(var i=0;i<this.aCards.length;i++){this.aCards[i].dashboardLayout={};}this._buildGrid(true);};L.prototype._buildGrid=function(u){if(this.aCards.length===0||u){this.aCards=q.extend(true,[],this.uiModel.getProperty("/cards"));}if(u||!this.oLayoutVars||(this.oLayoutVars[0]&&!this.oLayoutVars[0].dashboardLayout)){this.oLayoutVars=[];this._sliceSequenceSausage();}else{this._sliceSequenceSausage(this.oLayoutVars);}this._readVariants();};L.prototype._displaceCardToEnd=function(c){c.dashboardLayout.column=1;if(!this.iDisplaceRow){this.iDisplaceRow=this._findHighestOccupiedRow();}c.dashboardLayout.row=this.iDisplaceRow;this.iDisplaceRow+=c.dashboardLayout.rowSpan;var l=this.oLayoutVars.filter(function(i){return i.id===c.id;});if(l.length>0){l[0].dashboardLayout["C"+this.iColCount].row=c.dashboardLayout.row;}};L.prototype._setCardSpanFromDefault=function(c){if(!c.dashboardLayout){c.dashboardLayout={};}var o=this._getDefaultCardItemHeightAndCount(c);if(!c.settings.defaultSpan){if(c.template!=='sap.ovp.cards.linklist'){c.dashboardLayout.rowSpan=12;}c.dashboardLayout.colSpan=1;c.dashboardLayout.maxColSpan=1;c.dashboardLayout.noOfItems=o.noOfItems;c.dashboardLayout.autoSpan=c.template==='sap.ovp.cards.stack'?false:true;c.dashboardLayout.showOnlyHeader=false;}else{if(c.settings.defaultSpan.showOnlyHeader){c.dashboardLayout.rowSpan=Math.ceil((o.headerHeight+2*this.iCardBorderPx)/this.iRowHeightPx);c.dashboardLayout.noOfItems=0;c.dashboardLayout.autoSpan=false;c.dashboardLayout.showOnlyHeader=true;}else{if(c.template==='sap.ovp.cards.linklist'){c.dashboardLayout.rowSpan=c.settings.defaultSpan.rows?c.settings.defaultSpan.rows:1;c.dashboardLayout.autoSpan=false;}else{c.dashboardLayout.rowSpan=12;c.dashboardLayout.autoSpan=true;}c.dashboardLayout.noOfItems=c.settings.defaultSpan.rows?c.settings.defaultSpan.rows:o.noOfItems;c.dashboardLayout.showOnlyHeader=false;}if(c.template==="sap.ovp.cards.stack"){c.dashboardLayout.colSpan=1;c.dashboardLayout.autoSpan=false;}else{c.dashboardLayout.colSpan=c.settings.defaultSpan.cols?Math.min(c.settings.defaultSpan.cols,this.iColCount):1;}c.dashboardLayout.maxColSpan=c.settings.defaultSpan.cols?c.settings.defaultSpan.cols:1;}c.dashboardLayout.visible=true;c.dashboardLayout.itemHeight=o.itemHeight;c.dashboardLayout.headerHeight=o.headerHeight;};L.prototype._sliceSequenceSausage=function(u){var i=0,j=0,c=0,a=0,m=0,o={},s=[],b='C'+this.iColCount,p;for(i=0;i<this.iColCount;i++){s.push({col:i+1,rows:0});}function f(r){return r.id===o.id;}function n(b,r){return r!==b;}for(i=0;i<this.aCards.length;i++){o=this.aCards[i];if(!o.dashboardLayout){o.dashboardLayout={};}if(!u){this._setCardSpanFromDefault(o);}else{var l=u.filter(f);if(l.length>0){var d=l[0].dashboardLayout,e=d[b],g=Object.keys(d),O=g.filter(n.bind(this,b));if(O.length>0){p=d[O];if(p){this._mergeLayoutVariants(o.dashboardLayout,p);}}else{this._mergeLayoutVariants(o.dashboardLayout,e);continue;}}else{o.dashboardLayout.row=this.iDummyRow;o.dashboardLayout.column=1;var h={};var k={row:o.dashboardLayout.row,col:o.dashboardLayout.column,rowSpan:o.dashboardLayout.rowSpan,colSpan:o.dashboardLayout.colSpan,maxColSpan:o.dashboardLayout.maxColSpan,noOfItems:o.dashboardLayout.noOfItems,autoSpan:o.dashboardLayout.autoSpan,showOnlyHeader:o.dashboardLayout.showOnlyHeader};h[b]=k;u.push({id:o.id,visibility:o.dashboardLayout.visible,selectedKey:o.settings.selectedKey,dashboardLayout:h});continue;}}o.dashboardLayout.colSpan=o.dashboardLayout.maxColSpan;o.dashboardLayout.colSpan=o.dashboardLayout.colSpan>this.iColCount?this.iColCount:o.dashboardLayout.colSpan;c=a<this.iColCount?a+1:1;if(c+o.dashboardLayout.colSpan-1>this.iColCount){o.dashboardLayout.colSpan=this.iColCount-c+1;}a=c+o.dashboardLayout.colSpan-1;o.dashboardLayout.column=c;m=0;if(Array.isArray(l)&&l.length>0&&!l[0].visibility){o.dashboardLayout.row=this.iDummyRow;}else{for(j=o.dashboardLayout.column;j<o.dashboardLayout.column+o.dashboardLayout.colSpan;j++){if(s[j-1].rows>m){m=s[j-1].rows;}}o.dashboardLayout.row=m+1;for(j=o.dashboardLayout.column;j<o.dashboardLayout.column+o.dashboardLayout.colSpan;j++){s[j-1].rows=m+o.dashboardLayout.rowSpan;}}}this.extractCurrentLayoutVariant();};L.prototype._mergeLayoutVariants=function(s,d){if(d.rowSpan){s.rowSpan=d.rowSpan;}if(d.colSpan){s.colSpan=d.colSpan;}if(d.maxColSpan){s.maxColSpan=d.maxColSpan;}if(d.noOfItems){s.noOfItems=d.noOfItems;}if(d.hasOwnProperty('autoSpan')){s.autoSpan=d.autoSpan;}if(d.row){s.row=d.row;}if(d.col){s.column=d.col;}if(d.hasOwnProperty('showOnlyHeader')){s.showOnlyHeader=d.showOnlyHeader;}};L.prototype._sortCardsByRow=function(c){c.sort(function(a,b){if(!a.dashboardLayout&&b.dashboardLayout){return 1;}else if(a.dashboardLayout&&!b.dashboardLayout){return-1;}if(a.dashboardLayout.column&&a.dashboardLayout.row&&a.dashboardLayout.row===b.dashboardLayout.row){if(a.dashboardLayout.column<b.dashboardLayout.column){return-1;}else if(a.dashboardLayout.column>b.dashboardLayout.column){return 1;}}else if(a.dashboardLayout.row){return a.dashboardLayout.row-b.dashboardLayout.row;}else{return 0;}});};L.prototype.resizeCard=function(c,s,m,d){var r=this.getCardById(c);if(!r){return[];}var a=s.colSpan-r.dashboardLayout.colSpan;var b=s.rowSpan-r.dashboardLayout.rowSpan;r.dashboardLayout.showOnlyHeader=s.showOnlyHeader;if(a===0&&b===0){return{resizeCard:r,affectedCards:[]};}else if(m&&r.dashboardLayout.autoSpan){r.dashboardLayout.autoSpan=false;}if(!m||(b&&a===0)){this._arrangeCards(r,{"row":s.rowSpan,"column":r.dashboardLayout.colSpan},'resize',d);}else{this._arrangeCards(r,{"row":s.rowSpan,"column":s.colSpan},'resize',d);}return{resizeCard:r,affectedCards:this._removeSpaceBeforeCard(d)};};L.prototype._removeSpaceBeforeCard=function(d){this._sortCardsByRow(this.aCards);var a={};for(var i=1;i<=this.iColCount;i++){a[i]=1;}for(var j=0;j<this.aCards.length;j++){var b=this.aCards[j].dashboardLayout.column,u=this.aCards[j].dashboardLayout.column+this.aCards[j].dashboardLayout.colSpan-1;if(this.aCards[j].dashboardLayout.visible){if(u>this.iColCount){u=this.iColCount;var n=this.iColCount-this.aCards[j].dashboardLayout.column+1;if(d){d.push({changeType:"dragOrResize",content:{cardId:this.aCards[j].id,dashboardLayout:{colSpan:n,oldColSpan:this.aCards[j].dashboardLayout.colSpan}},isUserDependent:true});}this.aCards[j].dashboardLayout.colSpan=n;}if(this.aCards[j].dashboardLayout.colSpan>1){var t=[];for(var k=b;k<=u;k++){t.push(a[k]);}var m=Math.max.apply(Math,t);for(var l=b;l<=u;l++){a[l]=m+this.aCards[j].dashboardLayout.rowSpan;}if(d&&m!==this.aCards[j].dashboardLayout.row){d.push({changeType:"dragOrResize",content:{cardId:this.aCards[j].id,dashboardLayout:{row:m,oldRow:this.aCards[j].dashboardLayout.row}},isUserDependent:true});}this.aCards[j].dashboardLayout.row=m;}else{if((this.aCards[j].dashboardLayout.row!==a[b])){if(d){d.push({changeType:"dragOrResize",content:{cardId:this.aCards[j].id,dashboardLayout:{row:a[b],oldRow:this.aCards[j].dashboardLayout.row}},isUserDependent:true});}this.aCards[j].dashboardLayout.row=a[b];}a[b]=this.aCards[j].dashboardLayout.row+this.aCards[j].dashboardLayout.rowSpan;}}}return this.aCards;};L.prototype._arrangeCards=function(c,n,d,D){var o=q.extend(true,{},c);var v=false;if(d==="drag"&&c.dashboardLayout.column===n.column&&n.row!==c.dashboardLayout.row){v=true;}this._sortCardsByRow(this.aCards);var a=[];var f=false;var b;if(d==="drag"){c.dashboardLayout.row=n.row;c.dashboardLayout.column=n.column;}else if(d==="resize"){c.dashboardLayout.rowSpan=n.row;c.dashboardLayout.colSpan=n.column;}a.push(c);for(var i=0;i<a.length;i++){for(var j=0;j<this.aCards.length;j++){if(a[i].id===this.aCards[j].id||!a[i].dashboardLayout.visible){continue;}else{f=this._checkOverlapOfCards(a[i],this.aCards[j]);if(f===true){if(v){if(n.row<o.dashboardLayout.row&&n.row===this.aCards[j].dashboardLayout.row){a[i].dashboardLayout.row=this.aCards[j].dashboardLayout.row;b=this.aCards[j].dashboardLayout.row;this.aCards[j].dashboardLayout.row=a[i].dashboardLayout.row+a[i].dashboardLayout.rowSpan;if(D){D.push({changeType:"dragOrResize",content:{cardId:this.aCards[j].id,dashboardLayout:{row:this.aCards[j].dashboardLayout.row,oldRow:b}},isUserDependent:true});}}else if(n.row>o.dashboardLayout.row+this.aCards[j].dashboardLayout.rowSpan){b=this.aCards[j].dashboardLayout.row;this.aCards[j].dashboardLayout.row=o.dashboardLayout.row;a[i].dashboardLayout.row=this.aCards[j].dashboardLayout.row+this.aCards[j].dashboardLayout.rowSpan;a.push(a[i]);if(D){D.push({changeType:"dragOrResize",content:{cardId:this.aCards[j].id,dashboardLayout:{row:this.aCards[j].dashboardLayout.row,oldRow:b}},isUserDependent:true});}}}else{b=this.aCards[j].dashboardLayout.row;this.aCards[j].dashboardLayout.row=a[i].dashboardLayout.row+a[i].dashboardLayout.rowSpan;a.push(this.aCards[j]);if(D){D.push({changeType:"dragOrResize",content:{cardId:this.aCards[j].id,dashboardLayout:{row:this.aCards[j].dashboardLayout.row,oldRow:b}},isUserDependent:true});}}}}}}};L.prototype._checkOverlapOfCards=function(o,a){var b=o.dashboardLayout.row;var c=o.dashboardLayout.row+o.dashboardLayout.rowSpan;var d=o.dashboardLayout.column;var e=o.dashboardLayout.column+o.dashboardLayout.colSpan;var f=a.dashboardLayout.row;var g=a.dashboardLayout.row+a.dashboardLayout.rowSpan;var h=a.dashboardLayout.column;var i=a.dashboardLayout.column+a.dashboardLayout.colSpan;var j=false,k=false;if((h>=d&&h<e)||(i>d&&i<=e)||(h<=d&&i>=e)){j=true;}if((f>=b&&f<c)||(g>b&&g<=c)||(f<=b&&g>=c)){k=true;}return j&&k;};L.prototype.extractCurrentLayoutVariant=function(){var i=0;var c={};var o=[];function f(b){return b.id===c.id;}for(i=0;i<this.aCards.length;i++){c=this.aCards[i];o=this.oLayoutVars.filter(f);var d={};var a={row:c.dashboardLayout.row,col:c.dashboardLayout.column,rowSpan:c.dashboardLayout.rowSpan,colSpan:c.dashboardLayout.colSpan,maxColSpan:c.dashboardLayout.maxColSpan,noOfItems:c.dashboardLayout.noOfItems,autoSpan:c.dashboardLayout.autoSpan,showOnlyHeader:c.dashboardLayout.showOnlyHeader};d["C"+this.iColCount]=a;if(!(Array.isArray(o)&&o.length!==0)){this.oLayoutVars.push({id:c.id,visibility:c.dashboardLayout.visible,selectedKey:c.settings.selectedKey,dashboardLayout:d});}else{o[0].selectedKey=c.settings.selectedKey||o[0].selectedKey;o[0].dashboardLayout={};o[0].dashboardLayout["C"+this.iColCount]=a;}}};L.prototype._findHighestOccupiedRow=function(){var h=0,m=[];function f(e){return e.dashboardLayout.column===c;}function a(e,i,b){return e.dashboardLayout.row===Math.max.apply(Math,b.map(function(d){return d.dashboardLayout.row;}));}for(var c=1;c<=this.iColCount;c++){var A=this.aCards.filter(f);if(!!A){var o=A.filter(a)[0];if(!!o){m.push(+o.dashboardLayout.row+ +o.dashboardLayout.rowSpan);}}}h=Math.max.apply(Math,m.map(function(e){return e;}));return h;};L.prototype._getDefaultCardItemHeightAndCount=function(c){var d=C._setCardpropertyDensityAttribute();var a={"List_condensed":{itemLength:5,itemHeight:64},"List_condensed_imageSupported_cozy":{itemLength:5,itemHeight:72},"List_condensed_imageSupported_compact":{itemLength:5,itemHeight:60},"List_extended":{itemLength:3,itemHeight:97},"List_condensed_bar":{itemLength:5,itemHeight:65},"List_extended_bar":{itemLength:3,itemHeight:95},"Table":{itemLength:5,itemHeight:48},"Linklist":{itemLength:6,itemHeight:0}};var h={"KPIHeader":{"1":{"1":158,"2":174},"2":{"1":179,"2":195},"3":{"1":201,"2":223}},"NormalHeader":{"1":{"1":82,"2":98},"2":{"1":103,"2":119},"3":{"1":125,"2":141}}};var S=22;var b=21;var H=0;if(c){var e=c.template,l=c.settings.listType,f=c.settings.listFlavor,i=c.settings.imageSupported,n=0,I=0;if(e=="sap.ovp.cards.list"){if(l=="extended"){if(f=="bar"){n=a["List_extended_bar"]["itemLength"];I=a["List_extended_bar"]["itemHeight"];}else{n=a["List_extended"]["itemLength"];I=a["List_extended"]["itemHeight"];}}else{if(f=="bar"){n=a["List_condensed_bar"]["itemLength"];I=a["List_condensed_bar"]["itemHeight"];}else{if(i==='true'){if(d==='cozy'){I=a["List_condensed_imageSupported_cozy"]["itemHeight"];}else{I=a["List_condensed_imageSupported_compact"]["itemHeight"];}}else{I=a["List_condensed"]["itemHeight"];}n=a["List_condensed"]["itemLength"];}}}else if(e=="sap.ovp.cards.table"){n=a["Table"]["itemLength"];I=a["Table"]["itemHeight"];}else if(e==="sap.ovp.cards.linklist"){n=a["Linklist"]["itemLength"];I=a["Linklist"]["itemHeight"];}var t=c.settings.defaultSpan&&c.settings.defaultSpan.minimumTitleRow?c.settings.defaultSpan.minimumTitleRow:1;var s=c.settings.defaultSpan&&c.settings.defaultSpan.minimumSubTitleRow?c.settings.defaultSpan.minimumSubTitleRow:1;var g=(c.settings.dataPointAnnotationPath||(c.settings.tabs&&c.settings.tabs[0].dataPointAnnotationPath))?"KPIHeader":"NormalHeader";H=h[g][t][s];if(g==="KPIHeader"){if(c.settings.showFilterInHeader===true){H+=S;}if(c.settings.showSortingInHeader===true){H+=b;}}return{noOfItems:n,itemHeight:I,headerHeight:H};}};return L;},true);

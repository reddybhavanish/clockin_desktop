// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sinaDefine(['../../core/core','../../core/util','../../core/Log','../../core/lang','../../sina/SinaObject','./ajax','./conditionSerializer','./FacetParser','./ItemParser','./suggestionParser','./suggestionTermSplitter','./MetadataParser'],function(c,u,L,l,S,a,b,F,I,d,s,M){"use strict";return S.derive({id:'hana_odata',_initAsync:function(e){if(e.url){this.requestPrefix=e.url;}else{this.requestPrefix='/sap/es/odata';}this.sina=e.sina;this.ajaxClient=a.createAjaxClient();this.metadataLoadPromises={};this.internalMetadata={};this.metadataParser=new M(this);this.itemParser=new I(this);this.facetParser=new F(this);this.suggestionParser=new d(this);return this.loadServerInfo().then(function(f){this.serverInfo=f;if(!this.supports('Search')){return Promise.reject(new c.Exception('Enterprise Search is not active'));}return this.loadBusinessObjectDataSources();}.bind(this)).then(function(){if(this.sina.dataSources.length===0){return Promise.reject(new c.Exception('Enterprise Search is not active - no datasources'));}return{capabilities:this.sina._createCapabilities({fuzzy:false})};}.bind(this));},supports:function(e,f){var g=this.serverInfo.services;for(var h in g){if(h===e){if(!f){return true;}var i=g[h].Capabilities;for(var j=0;j<i.length;++j){var k=i[j];if(k===f){return true;}}}}return false;},loadServerInfo:function(){var e={rawServerInfo:{Services:[{Service:'Search',Capabilities:[{Capability:'SemanticObjectType'}]},{Service:'Suggestions2',Capabilities:[{Capability:'ScopeTypes'}]}]},services:{Suggestions:{suggestionTypes:['objectdata']},Search:{capabilities:['SemanticObjectType']}}};return Promise.resolve(e);},loadBusinessObjectDataSources:function(){var t=this;var r=this.buildQueryUrl(this.requestPrefix,"/$metadata");return this.ajaxClient.getXML(r).then(function(e){t.metadataParser.parseResponse(e).then(function(f){for(var i=0;i<f.dataSourcesList.length;++i){var g=f.dataSourcesList[i];t.metadataParser.fillMetadataBuffer(g,f.businessObjectMap[g.id]);}});});},assembleOrderBy:function(q){var r=[];for(var i=0;i<q.sortOrder.length;++i){var e=q.sortOrder[i];var f=(e.order===this.sina.SortOrder.Descending)?'desc':'asc';r.push({AttributeId:e.id,SortOrder:f});}return r;},translateOrder:function(o){var r='desc';if(o==='Ascending'){r='asc';}return r;},executeSearchQuery:function(q){var r=q.filter.rootCondition.clone();var f=b.serialize(q.filter.dataSource,r);var e=this._escapeSearchTerm(q.filter.searchTerm);var g=q.filter.dataSource;var t=q.top||10;var h=q.skip||0;var i=q.facetTop||5;var o=q.sortOrder;var k='';var m="Search.search(query='";if(g!==this.sina.getAllDataSource()){m+="SCOPE:"+g.id+" ";}var p='';var n='';if(e){p='(';n=')';}m+=f+" "+p+e+n+"')";var v='filter('+m+')';var w={$count:true,$top:t,$skip:h,$apply:v,whyfound:true};if(Array.isArray(o)){for(var j=0;j<o.length;j++){var x=o[j];if(j===0){k+=x.id+' '+this.translateOrder(x.order);}else{k+=','+x.id+' '+this.translateOrder(x.order);}}}if(k.length>0){w.$orderby=k;}var y=this.buildQueryUrl(this.requestPrefix,'/$all');if(q.calculateFacets){w.facets='all';w.facetlimit=i;}var z,A;var B=new L();return this.ajaxClient.getJson(y,w).then(function(C){A=C;return this.metadataParser.parseDynamicMetadata(A);}.bind(this)).then(function(C){return this.itemParser.parse(q,A.data,B);}.bind(this)).then(function(C){z=C;var D=A.data['@com.sap.vocabularies.Search.v1.SearchStatistics'].ConnectorStatistics;if(q.getDataSource()===this.sina.getAllDataSource()&&D&&Array.isArray(D)&&D.length===1){var E=[{"@com.sap.vocabularies.Search.v1.Facet":{"PropertyName":"scope","isConnectorFacet":true},"Items":[{"scope":D[0].OdataID,"_Count":A.data["@odata.count"]}]}];return this.facetParser.parse(q,E);}return this.facetParser.parse(q,A.data,B);}.bind(this)).then(function(C){return this.sina._createSearchResultSet({title:'Search Result List',query:q,items:z,totalCount:A.data['@odata.count']||0,facets:C,log:B});}.bind(this));},executeChartQuery:function(q){var e=this._escapeSearchTerm(q.filter.searchTerm);var f=q.filter.dataSource;var r=q.filter.rootCondition.clone();var g=new L();var h=15;var i=r.removeAttributeConditions(q.dimension);var j=i.deleted;var k=b.serialize(f,r);var t=q.top||5;var m="Search.search(query='";if(f!==this.sina.getAllDataSource()){m+="SCOPE:"+f.id+" ";}var p='';var n='';if(e){p='(';n=')';}if(j===true){if(!i.value||i.value===''||i.value.match(/^[*\s]+$/g)!==null){i.value='*';m+='('+i.attribute+':"*") '+p+e;}else{m+='('+i.attribute+':EQ:"'+i.value+'*") '+p+e;}}else{m+=k+" "+p+e;}m+=n+"')";var o='filter('+m+')';var v={$count:true,$top:0,$apply:o};var w=this.buildQueryUrl(this.requestPrefix,'/$all');var x='all';v.facetlimit=t;if(q.dimension){x=q.dimension;var y=q.filter.dataSource.getAttributeMetadata(q.dimension);if((y.type==='Double'||y.type==='Integer')&&t>=20){v.facetlimit=h;}}v.facets=x;return this.ajaxClient.getJson(w,v).then(function(z){var A=this.facetParser.parse(q,z.data,g);return A;}.bind(this)).then(function(z){if(z.length>0){return z[0];}return this.sina._createChartResultSet({title:q.filter.dataSource.getAttributeMetadata(q.dimension).label,items:[],query:q,log:g});}.bind(this));},executeSuggestionQuery:function(q){var e={SearchTerm:{Data:'SuggestObjectData',History:'SuggestSearchHistory'},Object:{},DataSource:{Data:'SuggestDataSources'}};var f=q.types;var g=q.calculationModes;var h=c.Promise.resolve({items:[]});for(var i=0;i<f.length;i++){var k=f[i];for(var j=0;j<g.length;j++){var m=g[j];var v=e[k][m];switch(v){case"SuggestObjectData":return this._fireSuggestionQuery(q);default:return h;}}}},_escapeSearchTerm:function(t){if(t){t=t.replace(/[\\]/g,'\\$&');}return t;},_fireSuggestionQuery:function(q){var e=this._escapeSearchTerm(q.filter.searchTerm);var f=q.filter.dataSource;var r=q.filter.rootCondition.clone();var g=b.serialize(q.filter.dataSource,r);var t=q.top||10;var h=q.skip||0;var i="GetSuggestion(term='"+e+"')";var j={$top:t,$skip:h};var k='';if(f!==this.sina.getAllDataSource()){k+="SCOPE:"+f.id;}if(g){k+=" "+g;}if(k){k="filter(Search.search(query='"+k+"'))";j.$apply=k;}var m=this.buildQueryUrl(this.requestPrefix,'/$all/'+i);return this.ajaxClient.getJson(m,j).then(function(n){var o=[];if(n.data.value){o=this.suggestionParser.parse(q,n.data.value);}return this.sina._createSuggestionResultSet({title:'Suggestions',query:q,items:o});}.bind(this));},_fireSuggestionQueryV5:function(q){var e=this._escapeSearchTerm(q.filter.searchTerm);var f=s.split(this,e);var g=q.filter.dataSource;var r=q.filter.rootCondition.clone();var h=b.serialize(q.filter.dataSource,r);var i="GetSuggestion(term='";if(g!==this.sina.getAllDataSource()){i+="SCOPE:"+g.id+" ";}i+=h+" "+e+"')";var j={};var k=this.buildQueryUrl(this.requestPrefix,'/$all/'+i);return this.ajaxClient.getJson(k,j).then(function(m){var n=[];if(m.data.value){n=this.suggestionParser.parse(q,m.data.value);}s.concatenate(this,f,n);return this.sina._createSuggestionResultSet({title:'Suggestions',query:q,items:n});}.bind(this));},getFilterValueFromConditionTree:function(e,f){if(f.ConditionAttribute&&f.ConditionAttribute===e){return f.ConditionValue;}else if(f.SubFilters){var i;var r=null;for(i=0;r===null&&i<f.SubFilters.length;i++){r=this.getFilterValueFromConditionTree(e,f.SubFilters[i]);}return r;}return null;},logUserEvent:function(e){},buildQueryUrl:function(q,e){var r=q+'/v20411'+e;return r;},getDebugInfo:function(){return' SinaProvider :'+this.id;}});});

sap.ui.define(["././TableConverter","././ChartConverter","./CommonConverter"],function(T,C,a){"use strict";var _={};var g=a.getTemplateAnnotationPath;var b=a.getOnlyAnnotation;var c=a.getNavigationProperties;var d=a.getTargetEntityType;var e=C.getChartProperties;var f=T.getTableManifestConfiguration;var h=T.getTableAnnotationConfiguration;var j=T.getTableActionsConfiguration;function o(i,p){var q=Object.keys(i);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(i);if(p)s=s.filter(function(r){return Object.getOwnPropertyDescriptor(i,r).enumerable;});q.push.apply(q,s);}return q;}function k(t){for(var i=1;i<arguments.length;i++){var s=arguments[i]!=null?arguments[i]:{};if(i%2){o(Object(s),true).forEach(function(p){l(t,p,s[p]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(t,Object.getOwnPropertyDescriptors(s));}else{o(Object(s)).forEach(function(p){Object.defineProperty(t,p,Object.getOwnPropertyDescriptor(s,p));});}}return t;}function l(i,p,v){if(p in i){Object.defineProperty(i,p,{value:v,enumerable:true,configurable:true,writable:true});}else{i[p]=v;}return i;}var m=function(i,s){var p,q,r;var t=i.entityType;var u=[];var S={};s===null||s===void 0?void 0:s.forEach(function(v){v.propertyNames.forEach(function(w){if(!S[w]){S[w]=true;}});});(p=t.annotations)===null||p===void 0?void 0:(q=p.UI)===null||q===void 0?void 0:(r=q.SelectionFields)===null||r===void 0?void 0:r.forEach(function(v,w){var x=v.value;if(!S[x]){u.push({readablePath:x,templatingPath:"/"+t.name+"/@com.sap.vocabularies.UI.v1.SelectionFields/"+w+"/$PropertyPath"});}});return u;};function n(p,q){var r;var s=p.entityType,t=p.manifestSettings;var u=q;var v={};var w=c(q,s);var x=w.prefix+"@com.sap.vocabularies.UI.v1.LineItem";var y="",z="";var E=w.property?d(w.property,s):s;var A=[],B=[],D=false;var F=(r=E.annotations)===null||r===void 0?void 0:r.getAnnotation("UI")[b(u)];if(F&&F.$Type==="com.sap.vocabularies.UI.v1.PresentationVariantType"){var G=F.Visualizations;if(G){for(var i=0;i<G.length;i++){var H=G[i].value;var I=w.prefix+H;if(H&&H.indexOf("@com.sap.vocabularies.UI.v1.LineItem")>-1&&!y){A.push(I);D=true;v.annotationPath=g(F.fullyQualifiedName,s);y=I;}else if(H&&H.indexOf("@com.sap.vocabularies.UI.v1.Chart")>-1&&sap.ui.Device&&sap.ui.Device.system.desktop&&!w.property&&!z){A.push(I);z=I;}if(y&&z){i=G.length;}}}if(!D){y=x;A=[x];u=x;}}else{y=u.indexOf("@com.sap.vocabularies.UI.v1.LineItem")>-1?u:x;A=[y];}if(D&&F.MaxItems){v.threshold=F.MaxItems;}else{v.threshold=w.property?10:30;}v.visualizationPaths=[];A.forEach(function(I){var Q;var R=(Q=E.annotations)===null||Q===void 0?void 0:Q.getAnnotation("UI")[b(I)];if(R){var S="/"+s.name+"/"+I;v.visualizationPaths.push(S);}});if(!v.annotationPath){v.annotationPath=v.visualizationPaths[0];}if(t.controlConfiguration){var J,K,L,M;(J=t.controlConfiguration[y])===null||J===void 0?void 0:(K=J.tableSettings)===null||K===void 0?void 0:(L=K.quickVariantSelection)===null||L===void 0?void 0:(M=L.paths)===null||M===void 0?void 0:M.forEach(function(Q){var R;var S=(R=E.annotations)===null||R===void 0?void 0:R.getAnnotation("UI")[b(Q.annotationPath)];if(S){var U;var V=[];(U=S.SelectOptions)===null||U===void 0?void 0:U.forEach(function(W){var X=W.PropertyName;var Y=X.value;if(V.indexOf(Y)===-1){V.push(Y);}});B.push({text:S.Text,key:Q.annotationPath,propertyNames:V});}});}var N=k({},v,{},{selectionFields:w.property?undefined:m(p,B),lineItemPath:y,entityName:s.name,targetEntityName:E.name,quickVariantSelection:B});var O=k({},{visualizationPath:y},{},p);var P={annotation:h(O),control:f(O),actions:j(y,s,t)};N=k({},N,{},{tableConfiguration:P});if(z&&D){O.visualizationPath=z;N.chartConfiguration=e(O);}return N;}_.getPresentation=n;return _;});

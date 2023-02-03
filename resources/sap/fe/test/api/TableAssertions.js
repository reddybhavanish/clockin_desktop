sap.ui.define(["./TableAPI","sap/fe/test/Utils","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder","sap/fe/test/builder/TableBuilder"],function(T,U,O,F,a){"use strict";var b=function(B,t){return T.call(this,B,t);};b.prototype=Object.create(T.prototype);b.prototype.constructor=b;b.prototype.isAction=false;b.prototype.iCheckState=function(t){var o=this.getBuilder();return this.prepareResult(o.hasState(t).description(U.formatMessage("Checking table '{0}' having state='{1}'",this.getIdentifier(),t)).execute());};b.prototype.iCheckRows=function(r,e,R){var A=U.parseArguments([Object,Number,Object],arguments),n=A[1],c=this.createRowMatchers(A[0],A[2]),t=this.getBuilder();if(c.length){t.hasRows(c,true).has(function(d){return U.isOfType(n,Number)?d.length===n:d.length>0;});}else{t.hasNumberOfRows(n).hasRows(null,true);}return this.prepareResult(t.description(U.formatMessage("Checking table '{0}' having {1} rows with values='{2}' and state='{3}'",this.getIdentifier(),n===undefined?"> 0":n,A[0],A[2])).execute());};b.prototype.iCheckQuickFilterItems=function(e){return this.prepareResult(this.getBuilder().hasQuickFilterItems(e).description(U.formatMessage("checking table '{0}' having  '{1}' item(s)",this.getIdentifier(),e)).execute());};b.prototype.iCheckColumns=function(e,c){var A=U.parseArguments([Number,Object],arguments),C=A[1],n=A[0],t=this.getBuilder();if(n!==undefined){t.hasAggregationLength("columns",n);}else{t.hasAggregation("columns");}t.hasColumns(C);return this.prepareResult(t.description(U.formatMessage("Checking table '{0}' having {1} columns and column states='{2}'",this.getIdentifier(),n===undefined?"> 0":n,C)).execute());};b.prototype.iCheckCells=function(r,c){var R=arguments.length>1?arguments[0]:undefined,C=arguments.length>1?arguments[1]:arguments[0],d=this.createRowMatchers(R,a.Row.Matchers.cellProperties(C)),t=this.getBuilder();return this.prepareResult(t.hasRows(d).description(U.formatMessage("Checking table '{0}' having cells properties '{2}' of rows with values '{1}'",this.getIdentifier(),R,C)).execute());};b.prototype.iCheckAction=function(A,s){var c=U.parseArguments([[Object,String],Object],arguments),t=this.getBuilder();return this.prepareResult(t.hasAggregation("actions",[this.createActionMatcher(A),F.Matchers.states(s)]).description(U.formatMessage("Checking table '{0}' having action '{1}' with state='{2}'",this.getIdentifier(),c[0],c[1])).execute());};b.prototype.iCheckDelete=function(s){var t=this.getBuilder(),d="::StandardAction::Delete";return this.prepareResult(t.hasAggregation("actions",[F.Matchers.id(new RegExp(U.formatMessage("{0}$",d))),F.Matchers.states(s)]).description(U.formatMessage("Checking table '{0}' having 'Delete' action with state='{1}'",this.getIdentifier(),s)).execute());};b.prototype.iCheckCreationRow=function(s){var t=this.getBuilder();return this.prepareResult(t.doOnChildren(F.create(this).hasType("sap.ui.table.CreationRow").checkNumberOfMatches(1).hasState(s)).description(U.formatMessage("Checking table '{0}' having a CreationRow with state='{1}'",this.getIdentifier(),s)).execute());};b.prototype.iCheckCreate=function(s){var t=this.getBuilder(),c="::StandardAction::Create";return this.prepareResult(t.hasAggregation("actions",[F.Matchers.id(new RegExp(U.formatMessage("{0}$",c))),F.Matchers.states(s)]).description(U.formatMessage("Checking action '{0}' with state='{1}'",c,s)).execute());};b.prototype.iCheckColumnAdaptation=function(){var A=F.createPopoverBuilder(this.getOpaInstance(),O.Matchers.resourceBundle("title","sap.ui.mdc","table.SETTINGS_COLUMN"));return this.prepareResult(A.description(U.formatMessage("Checking column adaptation dialog for table '{0}'",this.getIdentifier())).execute());};b.prototype.iCheckAdaptationColumn=function(c,A){return this.columnAdaptation(c,A,U.formatMessage("Checking '{1}' on table '{0}' for state='{2}'",this.getIdentifier(),c,A));};return b;});

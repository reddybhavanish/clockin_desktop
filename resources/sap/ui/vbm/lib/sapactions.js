VBI.Actions=
function(){"use strict";var b={};b.m_actions=[];b.clear=function(){for(var n=0;n<b.m_actions.length;++n){b.m_actions[n].clear();}b.m_actions=[];};b.Set=function(d,i,c){if(i){var a;if((a=b.findById(i))){a.load(d,c);}else{a=new VBI.Actions.Action();a.load(d,c);b.m_actions.push(a);}return;}};b.Remove=function(d,i,c){if(i){var a;if((a=b.findById(i))){b.m_actions.splice(a.m_nArrayIndex,1);}return;}};b.load=function(d,c){var n;if(d.Remove){if(jQuery.type(d.Remove)=='array'){for(n=0;n<d.Remove.length;++n){b.Remove(d.Remove[n],d.Remove[n].id,c);}}}if(d.Set){if(jQuery.type(d.Set)=='array'){for(n=0;n<d.Set.length;++n){b.Set(d.Set[n].Action,d.Set[n].id,c);}return;}if(!d.Set.id){b.clear();}if(jQuery.type(d.Set.Action)=='object'){b.Set(d.Set.Action,d.Set.Action.id,c);}else if(jQuery.type(d.Set.Action)=='array'){for(n=0;n<d.Set.Action.length;++n){b.Set(d.Set.Action[n],d.Set.Action[n].id,c);}}}};b.findById=function(i){var A=b.m_actions,l=A.length;for(var n=0;n<l;++n){var a=A[n];if(a&&(a.m_id==i)){a.m_nArrayIndex=n;return a;}}};b.findAction=function(e,s,v,a){var i=null;if(jQuery.type(v)=='object'){i=v.m_ID;}else if(jQuery.type(v)=='string'){i=v;}var t,l=b.m_actions.length;for(var n=0;n<l;++n){t=b.m_actions[n];if((e?(t.m_refEvent==e):true)&&(s?(t.m_refScene==s.m_ID):true)&&(v?(t.m_refVO==i):true)&&(a?(t.m_id==a):true)){return t;}}return null;};VBI.Actions.Action=function(){var a={};a.m_id=0;a.m_name=null;a.m_refScene=null;a.m_refVO=null;a.m_refEvent=null;a.m_additionalProperties=[];a.clear=function(){a.m_addProperties=null;};a.load=function(d,c){a.m_id=d.id;a.m_name=d.name;a.m_refScene=d.refScene;a.m_refVO=d.refVO;a.m_refEvent=d.refEvent;a.m_additionalProperties=[];if(d.AddActionProperty){if(jQuery.type(d.AddActionProperty)=='object'){a.m_additionalProperties.push(d.AddActionProperty.name);}else if(jQuery.type(d.AddActionProperty)=='array'){for(var n=0;n<d.AddActionProperty.length;++n){a.m_additionalProperties.push(d.AddActionProperty[n].name);}}}};return a;};return b;}
;

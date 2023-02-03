// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sinaDefine(['../../core/core','./Configurator'],function(c,C){"use strict";return C.derive({initAsync:function(){if(c.isObject(this.configuration)){this.customFunction=this.configuration.func;this.force=this.configuration.force;return;}this.customFunction=this.configuration;this.force=false;},isSuitable:function(o){if(c.isFunction(o.configuration)){return true;}if(c.isObject(o.configuration)&&o.configuration.hasOwnProperty('func')){return true;}},configure:function(v,a){if(this.isInitialOrForced(v)){return this.customFunction(v,a);}return v;}});});

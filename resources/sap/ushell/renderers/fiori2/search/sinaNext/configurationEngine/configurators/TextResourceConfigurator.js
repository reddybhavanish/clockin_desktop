// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sinaDefine(['../../core/core','./Configurator'],function(c,C){"use strict";return C.derive({initAsync:function(){this.resourceKey=this.configuration.resourceKey;this.force=this.configuration.force;},isSuitable:function(o){if(c.isString(o.type)&&['string'].indexOf(o.type)>=0&&c.isObject(o.configuration)&&o.configuration.resourceKey){return true;}return false;},configure:function(v,a){if(this.isInitialOrForced(v)){var r=this.resourceBundle||this.getResourceBundle(a);return r.getText(this.resourceKey);}return v;}});});

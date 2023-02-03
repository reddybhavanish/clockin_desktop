sap.ui.define(["./thirdparty/GlMatrixUtils","./AnimationTrackValueType"],function(g,A){"use strict";var a={};a.neutralAngleAxisToGlMatrixQuat=function(v){return g.quat.setAxisAngle(g.quat.create(),g.vec3.fromValues(v[0],v[1],v[2]),v[3]);};a.neutralEulerToGlMatrixQuat=function(v){var b=v[3]&3;var c=(v[3]>>2)&3;var d=(v[3]>>4)&3;var h=v[b];var e=v[c];var f=v[d];var i=Math.cos(h/2);var s=Math.sin(h/2);var j=Math.cos(e/2);var k=Math.sin(e/2);var l=Math.cos(f/2);var m=Math.sin(f/2);var x=s*j*l+i*k*m;var y=i*k*l-s*j*m;var z=i*j*m+s*k*l;var w=i*j*l-s*k*m;var n=g.quat.fromValues(x,y,z,w);return n;};a.neutralQuatToNeutralEuler=function(q,o){var b=o&3;var c=(o>>2)&3;var d=(o>>4)&3;var v=[0,0,0,o];var s=2*(q.w*q.x+q.y*q.z);var e=1-2*(q.x*q.x+q.y*q.y);var h=Math.atan2(s,e);var f;var i=2*(q.w*q.y-q.z*q.x);if(Math.abs(i)>=1){if(i>0){f=Math.PI/2.0;}else{f=-Math.PI/2.0;}}else{f=Math.asin(i);}var j=2*(q.w*q.z+q.x*q.y);var k=1-2*(q.y*q.y+q.z*q.z);var l=Math.atan2(j,k);v[b]=h;v[c]=f;v[d]=l;return v;};a.neutralQuatToGlMatrixQuat=function(v){return g.quat.fromValues(v[0],v[1],v[2],v[3]);};a.glMatrixQuatToNeutral=function(v){return[v[0],v[1],v[2],v[3]];};a.interpolate=function(v,b,c,k,t){var d=b.value;var e=c.value;var f={};var h;var i;var q;switch(v){case A.Quaternion:h=a.neutralQuatToGlMatrixQuat(d);i=a.neutralQuatToGlMatrixQuat(e);q=g.quat.lerp(g.quat.create(),h,i,k);f.value=a.glMatrixQuatToNeutral(q);break;case A.Euler:var r=[a.interpolateScalarLinear(d[0],e[0],k),a.interpolateScalarLinear(d[1],e[1],k),a.interpolateScalarLinear(d[2],e[2],k),d[3]];f[A.Euler]=r;q=a.neutralEulerToGlMatrixQuat(r);f.value=a.glMatrixQuatToNeutral(q);break;case A.AngleAxis:var j=new THREE.Matrix4();var l;var m;var n;var x;var y;var z;for(var o=0;o<t.getKeysCount();o++){var p=t.getKey(o);x=p.value[0];y=p.value[1];z=p.value[2];l=p.value[3];m=new THREE.Vector3(x,y,z);n=new THREE.Matrix4();n.makeRotationAxis(m,l);j.premultiply(n);if(p===b){break;}}x=e[0];y=e[1];z=e[2];l=e[3]*k;f[A.AngleAxis]=[x,y,z,r];m=new THREE.Vector3(x,y,z);var s=new THREE.Matrix4();s.makeRotationAxis(m,l);s.multiply(j);var u=new THREE.Quaternion().setFromRotationMatrix(s);f.value=u.toArray();break;case A.Vector3:f.value=[a.interpolateScalarLinear(d[0],e[0],k),a.interpolateScalarLinear(d[1],e[1],k),a.interpolateScalarLinear(d[2],e[2],k)];break;default:f.value=a.interpolateScalarLinear(d,e,k);}return f;};a.interpolateScalarLinear=function(v,b,k){return v+k*(b-v);};return a;});

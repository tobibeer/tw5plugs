/*\
title: $:/plugins/ihm/tidgraph/utils.js
type: application/javascript
module-type: library

Internal utility functions for tidgraph plugin.

\*/
(function(){function u(b){var d=b.getBoundingClientRect(),a=document.body,c=document.documentElement,e=d.top-(b.scrollTop||window.pageYOffset||c.scrollTop||a.scrollTop)-(c.clientTop||a.clientTop||0);b=d.left-(b.scrollLeft||window.pageXOffset||c.scrollLeft||a.scrollLeft)-(c.clientLeft||a.clientLeft||0);return{top:e,left:b,width:d.width,height:d.height,right:b+d.width,bottom:e+d.height}}function y(b,d,a){var c;b=u(b);if("string"===typeof a){if(c=document.querySelector(a),null==c)return null}else a instanceof
HTMLElement&&(c=a);var e=u(c);a=e.bottom-b.top;c=e.left-b.left;var f=e.right-b.left;b=e.top-b.top;e="";switch(d.toUpperCase()){case "L":e=[Math.round(c),Math.round(a/2+b/2)];break;case "R":e=[Math.round(f),Math.round(a/2+b/2)];break;case "T":e=[Math.round(f/2+c/2),Math.round(b)];break;case "B":e=[Math.round(f/2+c/2),Math.round(a)]}return e}function w(b){return'<span style="color:green">vecmap:</span><span style="color:red">'+b+"</span>"}function z(b,d,a){var c;c=u(d);var e=u(a);c=4>e.left+e.width/
2-(c.left+c.width/2)?["R","R"]:["R","L"];e=y(b,c[0],d);b=y(b,c[1],a);var f,g,h=10;if(null==d||null==a)return w("can't connect null element");if(null==e)return w("port not found for "+d.tagName+" - "+d.innerHTML);if(null==b)return w("port not found for "+a.tagName+" - "+a.innerHTML);d=Math.abs(b[1]-e[1]);b[1]>e[1]&&(f=d/2);b[1]<e[1]&&(f=-d/2);5>d&&(f=0);"L"==c[1]&&(g=-10);"R"==c[1]&&(g=10,h=20);return'<path d="M'+e[0]+","+e[1]+" Q"+(e[0]+h)+","+e[1]+"  "+(e[0]+h)+","+(e[1]+f)+" Q"+(e[0]+h)+","+b[1]+
"  "+(b[0]+g)+","+b[1]+'" marker-end="url(#tgr-arrow)"/>'}function x(b,d){var a;switch(d.mode.toLowerCase()){case "tagging":a="[["+b+"]tagging[]]+"+d.filter;a=$tw.wiki.filterTiddlers(a);break;case "linking":a="[["+b+"]links[]!is[missing]]+"+d.filter,a=$tw.wiki.filterTiddlers(a)}return a}function A(b,d){function a(a,n){g=n;h=a;l=escape(g);k=escape(h);e=document.getElementById(d.id+"-"+l);f=document.getElementById(d.id+"-"+k);e&&f&&c.push(z(b,e,f))}var c=[],e,f,g,h,l,k;v(d.root,function(c,b,d){(b=c.parent)&&
a(c.id,b.id)},{},{skipvisited:!1});for(var r=d.outliers.length,m=0;m<r;m++)a(d.outliers[m][0],d.outliers[m][1],!0);return c.join(" ")}function v(b,d,a,c){c=c||{};var e=c.done||[],f=c.getCh||function(a){return a.collapse?[]:a.children},g=c.lvl||0,h=void 0===c.skipvisited?!0:c.skipvisited;c.leave=c.leave||!1;if(h&&-1!==e.indexOf(b))return a;e.push(b);f=f(b);h=f.length;a=a||{};c.lvl=g+1;c.done=e;if(!1===d(b,a,g))return c.leave=!0,a;for(b=0;b<h;b++)if(a=v(f[b],d,a,c),c.leave)return a;c.lvl--;return a}
function B(b,d,a,c){c=c||{};var e=c.getCh||function(a){return a.collapse?[]:a.children},f=c.getId||function(a){return a.id},g=void 0===c.skipvisited?!0:c.skipvisited,h=c.maxdepth||-1;a=a||{};var l=[],k=[],r=[],m=0;l.push(b);r[f(b)]=void 0;do{b=l.length;for(var p=0;p<b;p++){var n=l.shift(),q;q=g?-1===k.indexOf(n)?!1:!0:!1;if(!q&&!1===d(n,r[f(n)],a))return a;k.push(n);q=e(n);l=l.concat(q);q&&q.forEach(function(a){var b=r[f(a)];b?f(b)!==f(n)&&c.outlier&&c.outlier(a,n):r[f(a)]=n})}m++}while(0!==l.length&&
m<=h);return a}function C(b,d){return v(b,function(a,b){b.cnt++;return!0},{cnt:0},{skipvisited:d}).cnt-1}function p(b,d,a){if(!(this instanceof p))throw"Error: call new tnode(id="+d+")";this.parent=b;this.id=d;this.children=[];this.collapse=!1;this.widget=a}exports.buildTable=function(b,d){var a=$tw.utils.domMaker;d.id=(new Date).valueOf();var c=a("table",{"class":"ihm-tgr-table",attributes:{id:d.id+"-table"}});(function(b){var c=$tw.wiki;v(d.root,function(g,h,l){var k=c.getTiddler(g.id);h=1+C(g,
d);var r=escape(g.id),m;if(k){m=$tw.utils.parseStringArray(d.tooltip);for(var p=m.length,n="",q=0;q<p&&!(n=k.getFieldString(m[q]));q++);m=n}else m="";var t;k&&(t=d.nodetitle?k.getFieldString(d.nodetitle):k.hasField("caption")?k.fields.caption:k.fields.title);l>=d.startat&&(l=a("a",{"class":"tc-tiddlylink tc-tiddlylink-resolves",text:t,attributes:{href:"#"+r}}),!1===d.nocollapse&&g.children&&0<g.children.length?(t=a("a",{"class":"ihm-tgr-collapse tc-tiddlylink",text:g.collapse?"\u2295":"\u2296"}),
$tw.utils.addEventListeners(t,[{name:"click",handlerObject:g,handlerMethod:"collapseClickEvent"}]),g=a("div",{"class":"ihm-tgr-node tgr-node",children:[l,t],attributes:{id:d.id+"-"+r,title:m}})):g=a("div",{"class":"ihm-tgr-node tgr-node",children:[l],attributes:{id:d.id+"-"+r,title:m}}),g=a("td",{attributes:{rowspan:h},children:[g]}),g=a("tr",{children:[g]}),b.appendChild(g))},{},{skipvisited:!0})})(c);console.log("table=",c);console.log("outliers=",d.outliers);return c};exports.buildSVG=function(b,
d){var a=document.getElementById(d.id+"-table");if(a){var a=getComputedStyle(a),c=b.offsetHeight,e=b.offsetWidth;console.log("style=",a,"div=",b);return'<svg  xmlns="http://www.w3.org/2000/svg" height="'+c+'px" width="'+e+'px" style="overflow: visible"><defs> <marker id="tgr-arrow" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="strokeWidth" orient="auto" markerWidth="8" markerHeight="6"> <polyline class="ihm-tgr-arrow tgr-arrow" points="0,0 10,5 0,10 0,5" style="opacity:1;" /></marker></defs> <g class="ihm-tgr-link tgr-link" style="overflow: visible"> '+
A(b,d)+"</g> </svg>"}};exports.isDescendant=function(b,d,a){var c;a:switch(a.mode.toLowerCase()){case "tagging":c=(c=$tw.wiki.getTiddler(b))?c.hasTag(d):!1;break a;default:c=x(d,a),c=-1!==c.indexOf(b)}if(c)return!0;d=x(d,a);c=d.length;for(var e=!1,f=0;f<c&&!(e=exports.isDescendant(b,d[f],a));f++);return e};exports.makeTidTree=function(b,d,a){a=a||{};d.outliers=[];var c=new p(void 0,b,a.widget);B(b,function(b,c,d){if(c){a:{for(var h=d.visited,l=h.length,k=0;k<l;k++)if(h[k].id===c){c=h[k];break a}c=
void 0}b=c.addChild(b,a.widget);d.visited.push(b)}return!0},{visited:[c]},{getId:function(a){return a},getCh:function(a){return x(a,d)},maxdepth:d.maxdepth,skipvisited:!0,outlier:function(a,b){d.outliers.push([a,b])}});return c};p.prototype.addChild=function(b,d){var a=new p(this,b,d);this.children.push(a);return a};p.prototype.toString=function(){return"tnode(id="+this.id+")"};p.prototype.collapseClickEvent=function(b){this.collapse=!this.collapse;console.log(this.id+" collapse=",this.collapse,this.widget);
this.widget.paint()}})();

(this.webpackJsonpslpweb=this.webpackJsonpslpweb||[]).push([[0],{22:function(e,n,t){e.exports=t(50)},27:function(e,n,t){},49:function(e,n,t){},50:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(18),c=t.n(o),l=(t(27),t(3)),i=t.n(l),u=t(6),s=t(21),p=t(4),m=t(19),f=t.n(m);var d=function(){var e=Object(a.useState)([]),n=Object(s.a)(e,2),t=n[0],o=n[1],c=function(){var e=Object(u.a)(i.a.mark((function e(n){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o(n.target.files);case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),l=function(){var e=Object(u.a)(i.a.mark((function e(){var n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=new FormData).append("myFile",t,t.name),console.log(t),f.a.post("api/uploadfile",n);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(p.a,null,r.a.createElement(p.a.Group,null,r.a.createElement(p.a.File,{id:"slpfile",accept:".slp",multiple:!0,onChange:c}),r.a.createElement("button",{onClick:l},"Upload"),r.a.createElement(p.a.Text,{id:"slpFileHelp",muted:!0},"Select between 1-5 slp files for upload"),t.length>0&&Object.values(t).map((function(e,n){return r.a.createElement("p",{key:n},"File name: ",e.name)}))))};t(49);var h=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(d,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.866a1211.chunk.js.map
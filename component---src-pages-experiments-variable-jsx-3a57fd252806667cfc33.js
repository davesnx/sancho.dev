(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"0vJV":function(n,t,e){"use strict";e.r(t),e.d(t,"Nothing",(function(){return o})),e.d(t,"toBool",(function(){return r})),e.d(t,"isNothing",(function(){return a})),e.d(t,"isSomething",(function(){return u})),e.d(t,"serialize",(function(){return c})),e.d(t,"deserialize",(function(){return l}));e("DrhF"),e("m210"),e("4DPX"),e("q8oJ"),e("8npG");var i,o=((i=function(){return o}).toString=i.toLocaleString=i[Symbol.toPrimitive]=function(){return""},i.valueOf=function(){return!1},new Proxy(Object.freeze(i),{get:function(n,t){return n.hasOwnProperty(t)?n[t]:o}})),r=function(n){return!(!n||!n.valueOf())},a=function(n){return n===o},u=function(n){return!(n===o||null==n)},c=function(n){return JSON.stringify(n,(function(n,t){return t===o?null:t}))},l=function(n){return JSON.parse(n,(function(n,t){return null===t?o:t}))}},"1uLN":function(n,t,e){"use strict";var i=e("vOnD"),o=e("Kn8V"),r=e("cqnt"),a=Object(i.b)(["font-weight:200;font-size:",";font-family:",";line-height:1.7;color:",";margin:0;"],o.a.fontSize1,o.a.sans,r.a.black);t.a=i.c.p.withConfig({displayName:"text",componentId:"sc-6hltyu-0"})(["",";text-align:","};margin-bottom:",";"],a,(function(n){return"center"===n.align?"center":"left"}),(function(n){return n.raw?"":"24px"}))},"68hM":function(n,t,e){"use strict";e.r(t);e("HQhv");var i=e("q1tI"),o=e.n(i),r=e("vOnD"),a=(e("i8R+"),e("L12J")),u=(e("Q9NP"),e("cqnt")),c=e("Mz3a"),l=e("1uLN"),f=e("m3sw"),s=e("vcDF"),m=e("lKyz"),d=r.c.span.withConfig({displayName:"variable__Character",componentId:"sc-131xxus-0"})(['width:75px;font-size:45px;text-transform:uppercase;font-family:"Inter";font-variation-settings:"wght" ',";display:flex;border:1px dashed white;justify-content:center;align-items:center;color:",";& + &{border-left:none;}"],(function(n){return n.wght}),u.a.white),p=r.c.div.withConfig({displayName:"variable__Row",componentId:"sc-131xxus-1"})(["flex-direction:row;"]),g=function(n){var t=n.children,e=n.weight;return o.a.createElement(d,{wght:e},t)},h=function(n){var t=n.text,e=n.x,i=o.a.useRef(null),r=i.current&&i.current.getBoundingClientRect().left+37.5,a=t.split("");Math.floor(1e3/a.length),a.length;return console.log("---"),console.log("---"),console.log("---"),console.log(r),a.forEach((function(n,t){console.log(n,e,Math.abs(1e3-(e-r+75*t)))})),o.a.createElement(p,{ref:i},a.map((function(n,t){return o.a.createElement(g,{key:t,weight:Math.abs(e-r+75*t)},n)})))},v=r.c.div.withConfig({displayName:"variable__Container",componentId:"sc-131xxus-2"})(["display:flex;justify-content:center;align-items:center;flex-direction:column;width:80vw;max-width:50rem;height:100%;"]);t.default=function(){var n=Object(s.a)(),t=Object(m.a)();return o.a.createElement(a.a,{backgroundColor:u.a.black},o.a.createElement(c.a,null,o.a.createElement(f.a,{top:24},o.a.createElement(v,null,o.a.createElement(l.a,{mouse:n,orientation:t.absolute},o.a.createElement(h,{x:n.x,text:"David Sancho"}),";")))))}},Mz3a:function(n,t,e){"use strict";var i=e("vOnD");t.a=i.c.main.withConfig({displayName:"main",componentId:"sc-1ek2buz-0"})(["width:100%;max-width:900px;padding:0 32px;margin:0 auto;"])},Q9NP:function(n,t,e){"use strict";var i=e("vOnD").c.div.withConfig({displayName:"overlap__Overlap",componentId:"sc-1dv8pn3-0"})(["position:relative;display:flex;justify-content:center;align-items:center;& > *:not(:first-child){position:absolute;}"]);t.a=i},"i8R+":function(n,t,e){"use strict";var i=e("0vJV"),o=i.Nothing,r=i.isNothing,a="undefined"!=typeof window?window:o,u="undefined"!=typeof document?document:o;n.exports.window=a,n.exports.document=u,n.exports.exists=function(n){return!r(n)}},lKyz:function(n,t,e){"use strict";var i=e("q1tI");t.a=function(){var n=Object(i.useState)({absolute:!1,alpha:null,beta:null,gamma:null}),t=n[0],e=n[1],o=function(n){e({absolute:n.absolute,alpha:n.alpha,beta:n.beta,gamma:n.gamma})};return Object(i.useEffect)((function(){return window.addEventListener("deviceorientation",o,!0),function(){window.removeEventListener("deviceorientation",o,!0)}}),[]),t}},m3sw:function(n,t,e){"use strict";e.d(t,"a",(function(){return f}));var i=e("17x9"),o=e.n(i),r=e("vOnD"),a=function(n){return 8*n},u=function(n){return n+"px"},c=function(n){return n+"rem"},l=r.c.div.withConfig({displayName:"spacer__Spacer",componentId:"sc-1ov7p7i-0"})(["",";",";",";",";",";"],(function(n){return n.top&&"margin-top: "+u(a(n.top))}),(function(n){return n.bottom&&"margin-bottom: "+u(a(n.bottom))}),(function(n){return n.left&&"margin-left: "+u(a(n.left))}),(function(n){return n.right&&"margin-right: "+u(a(n.right))}),(function(n){return n.inline&&"display: inline-block"})),f=r.c.div.withConfig({displayName:"spacer__RelativeSpacer",componentId:"sc-1ov7p7i-1"})(["",";",";",";",";",";"],(function(n){return n.top&&"margin-top: "+c(n.top)}),(function(n){return n.bottom&&"margin-bottom: "+c(n.bottom)}),(function(n){return n.left&&"margin-left: "+c(n.left)}),(function(n){return n.right&&"margin-right: "+c(n.right)}),(function(n){return n.inline&&"display: inline-block"}));l.displayName="Spacer",l.propTypes={top:o.a.number,bottom:o.a.number,left:o.a.number,right:o.a.number,inline:o.a.bool};t.b=l},vcDF:function(n,t,e){"use strict";var i=e("q1tI");t.a=function(){var n=Object(i.useState)({x:null,y:null}),t=n[0],e=n[1],o=function(n){e({x:n.pageX,y:n.pageY})};return Object(i.useEffect)((function(){return window.addEventListener("mousemove",o),function(){window.removeEventListener("mousemove",o)}}),[]),t}}}]);
//# sourceMappingURL=component---src-pages-experiments-variable-jsx-3a57fd252806667cfc33.js.map
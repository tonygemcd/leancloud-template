webpackJsonp([1],[function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}var r=o(1),u=n(r),a=o(15),i=n(a),s=o(5),c=n(s);u["default"].config.debug=!1,c["default"].start(i["default"],"#app")},,,,,function(t,e,o){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=o(1),u=n(r),a=o(4),i=n(a);u["default"].use(i["default"]);var s=new i["default"]({history:!0,saveScrollPosition:!0});s.map({"/":{component:o(16),"public":!0}}),s.beforeEach(function(t){var e=t.from,o=t.to,n=t.next;if(o["public"])return n();var r=void 0;r="login"===e.name?e.query.returnUrl||o.path:"login"===o.name?o.query.returnUrl:o.path,console.log("returnUrl: ",r)}),s.afterEach(function(t){var e=t.to,o=e.router.app;o.$dispatch("onRouteChanged",e),o.$broadcast("onRouteChanged",e)}),e["default"]=s},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={data:function(){return{}},computed:{},ready:function(){},attached:function(){},methods:{},components:{}}},function(t,e,o){(function(t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={data:function(){return{}},computed:{},ready:function(){var e=this;t.post("/api/user/register").send({username:"11123"}).set("Accept","application/json").end(function(t,o){return t?(e.$dispatch("show-alert"),console.log(t)):void console.log(o.body)})},attached:function(){},methods:{},components:{}}}).call(e,o(2))},,function(t,e){},9,,,function(t,e){t.exports=" <div class=app-wrap> <router-view transition transition-mode=out-in></router-view> </div> "},function(t,e){t.exports=' <div class=home-wrap> <div class="demo-card-wide mdl-card mdl-shadow--2dp"> <div class=mdl-card__title> <h2 class=mdl-card__title-text>Welcome</h2> </div> <div class=mdl-card__supporting-text> If you can see the picture above, it means everything is fine! Congratulation! </div> </div> </div> '},function(t,e,o){var n,r,u={};o(9),n=o(6),r=o(13),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var a="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;r&&(a.template=r),a.computed||(a.computed={}),Object.keys(u).forEach(function(t){var e=u[t];a.computed[t]=function(){return e}})},function(t,e,o){var n,r,u={};o(10),n=o(7),r=o(14),t.exports=n||{},t.exports.__esModule&&(t.exports=t.exports["default"]);var a="function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports;r&&(a.template=r),a.computed||(a.computed={}),Object.keys(u).forEach(function(t){var e=u[t];a.computed[t]=function(){return e}})}]);
webpackJsonp([0],{177:function(t,e,n){"use strict";function a(t){n(202)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(185),r=n(218),o=n(70),s=a,l=o(i.a,r.a,!1,s,null,null);e.default=l.exports},185:function(t,e,n){"use strict";var a=n(204),i=n(212),r=n(71),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.a={name:"recommend",data:function(){return{firstClick:0,heartShow:!1,arr:[],idx:0}},components:{Aside:a.a,Talk:i.a},computed:o({},Object(r.d)({data:function(t){return t.Index.data}}),{Idx:function(){var t=this;return setInterval(function(){++t.idx>=t.data.length&&(t.idx=0)},3e3),""}}),methods:{heartChange:function(t){var e=this,n=+new Date;if(n-this.firstClick<400){this.heartShow=!0,this.arr.push("❤");var a=this.arr.length-1;this.$nextTick(function(){e.$refs.heart[a].style.left=t.clientX-e.$refs.heart[a].getBoundingClientRect().width/2+"px",e.$refs.heart[a].style.top=t.clientY-45-e.$refs.heart[a].getBoundingClientRect().height/2+"px"})}else this.firstClick=n},ChangeThePosition:function(){this.$refs.Barrage[0].style.top=Math.ceil(200*Math.random()+220)+"px"}},updated:function(){this.ChangeThePosition()}}},186:function(t,e,n){"use strict";var a=n(71),i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.a={name:"Aside",methods:i({},Object(a.c)({updateIsShow:"Index/updateIsShow"}),{isShowChange:function(){this.updateIsShow()}})}},187:function(t,e,n){"use strict";var a=n(71),i=n(215),r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.a={name:"talk",data:function(){return{isSendShow:!1}},computed:r({},Object(a.d)({isShow:function(t){return t.Index.isShow},data:function(t){return t.Index.data}})),methods:r({},Object(a.b)({getData:"Index/getData"}),Object(a.c)({updateIsShow:"Index/updateIsShow",updateNum:"Index/updateNum",updateNewData:"Index/updateNewData"}),{isShowChange:function(){this.updateIsShow()},numChange:function(t){this.updateNum(t)},talkChange:function(){if(!this.$refs.talk.value)return void alert("评论不能为空");var t={name:"无名氏",content:this.$refs.talk.value,num:0,time:this.timestampToTime(+new Date),isNumChange:!1};this.updateNewData(t),this.$refs.talk.value=""},Scroll:function(t){this.$refs.Toscroll.offsetHeight-this.$refs.ul.offsetHeight-20<this.$refs.ul.scrollTop&&this.getData()},newfocus:function(){this.isSendShow=!0},newblur:function(){this.isSendShow=!1},timestampToTime:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+e.getDate()+" "+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()}}),mounted:function(){this.getData();var t=Object(i.a)(this.Scroll,150);this.$refs.ul.addEventListener("scroll",t)}}},202:function(t,e,n){var a=n(203);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(46)("24fe6f80",a,!0,{})},203:function(t,e,n){e=t.exports=n(45)(!1),e.push([t.i,".recommend{width:100%;height:100%;display:flex;justify-content:center;flex-direction:column;position:relative}.recommend .Barrage{font-size:16px;color:#fff;position:absolute;animation:BarrageChange 3s linear;overflow:hidden;height:20px;top:20px;left:100%}.recommend .hidden{display:none}@keyframes BarrageChange{0%{left:100%}to{left:-100%}}.recommend .heart{position:absolute;background-image:-webkit-gradient(linear,left 0,right 0,from(red),to(blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent;top:0;left:0;z-index:0;font-size:48px;opacity:0}.recommend .heart-active{animation:heart 2s forwards;display:block}@keyframes heart{0%{transform:scale(.5) rotate(0);opacity:0}20%{transform:scale(1.5) rotate(30deg);opacity:1}80%{transform:scale(2) rotate(-30deg);opacity:1}to{transform:scale(1.5) rotate(0);opacity:0}}.recommend h6{font-size:28px;text-align:center;letter-spacing:2px;color:#010000;margin:10px 0}.recommend .banner,.recommend .banner img{width:100%}.recommend .box{position:absolute;left:0;bottom:20px;color:#fff;padding-left:10px}.recommend .box span{width:65%;display:flex;margin:10px 0;font-size:16px}.recommend .box div{position:absolute;right:15px;bottom:10px}.recommend .box div img{width:40px;animation:change 4s linear infinite}@keyframes change{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.video{width:100%;height:220px}",""])},204:function(t,e,n){"use strict";function a(t){n(205)}var i=n(186),r=n(207),o=n(70),s=a,l=o(i.a,r.a,!1,s,null,null);e.a=l.exports},205:function(t,e,n){var a=n(206);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(46)("6c4551ca",a,!0,{})},206:function(t,e,n){e=t.exports=n(45)(!1),e.push([t.i,".Aside{position:absolute;right:0;margin-top:30px}.Aside div{text-align:center;margin:10px 0}.Aside div img{width:35px}.Aside div span{width:100%;color:#fff;display:inline-block;text-align:center;font-size:12px}",""])},207:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"Aside"},[t._m(0),t._v(" "),t._m(1),t._v(" "),a("div",{on:{click:t.isShowChange}},[a("img",{attrs:{src:n(208),alt:""}}),a("span",[t._v("851")])]),t._v(" "),t._m(2)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("img",{attrs:{src:n(209),alt:""}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("img",{attrs:{src:n(210),alt:""}}),a("span",[t._v("3.7万")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("img",{attrs:{src:n(211),alt:""}}),a("span",[t._v("1.1万")])])}],r={render:a,staticRenderFns:i};e.a=r},208:function(t,e,n){t.exports=n.p+"8.png?1c6ebbca1841e24e427f900a08a048b7"},209:function(t,e,n){t.exports=n.p+"6.png?be1eda1979c26e9cbdbaf67e9da6bbf2"},210:function(t,e,n){t.exports=n.p+"7.png?0d1917716791d483e0c4fa6f449ffb75"},211:function(t,e,n){t.exports=n.p+"9.png?e9c9a822fcd3ed9ecae0ac4a371c38b4"},212:function(t,e,n){"use strict";function a(t){n(213)}var i=n(187),r=n(216),o=n(70),s=a,l=o(i.a,r.a,!1,s,null,null);e.a=l.exports},213:function(t,e,n){var a=n(214);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n(46)("1383f990",a,!0,{})},214:function(t,e,n){e=t.exports=n(45)(!1),e.push([t.i,".talk{width:100%;background:#2d2a23;position:absolute;bottom:-50px;left:0;border-radius:10px;height:0;overflow:hidden;transition:all 1s}.talk .top{width:100%;height:40px;display:flex;justify-content:space-around;color:#6d6b68;align-items:center}.talk .talk-bottom{width:100%;height:45px;display:flex;background:#000}.talk .talk-bottom span{font-size:28px;color:#505052;margin:0 10px;flex-shrink:0}.talk .talk-bottom .active{color:#fff}.talk .talk-bottom input{flex:1;background:#000;outline:none;border:none;padding-left:20px;color:#999}.talk ul{width:100%;height:360px;overflow-y:auto}.talk ul li{width:100%;display:flex;align-items:center;padding-right:15px}.talk ul li img{width:10%;flex-shrink:0;margin:0 15px}.talk ul li .libox{flex:1;border-bottom:1px solid #505052;display:flex;justify-content:space-between;color:#eae9e9;padding:10px 0}.talk ul li .libox .left h4{color:#979693;line-height:20px}.talk ul li .libox .left span{display:block;line-height:20px}.talk ul li .libox .left span:nth-of-type(2){color:#979693;font-size:12px}.talk ul li .libox .right{width:10%;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#505052}.talk ul li .libox .right span:first-child{font-size:25px}.talkChange{height:78%}.redColor{color:red}",""])},215:function(t,e,n){"use strict";function a(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:150,n=0;return function(){clearTimeout(n),n=setTimeout(function(){t()},e)}}e.a=a},216:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.isShow?"talk talkChange":"talk"},[a("div",{staticClass:"top"},[a("span"),t._v(" "),a("span",[t._v("851条评论")]),t._v(" "),a("span",{on:{click:t.isShowChange}},[t._v("X")])]),t._v(" "),a("ul",{ref:"ul"},[a("div",{ref:"Toscroll"},t._l(t.data,function(e,i){return a("li",{key:i},[a("img",{attrs:{src:n(217),alt:""}}),t._v(" "),a("div",{staticClass:"libox"},[a("div",{staticClass:"left"},[a("h4",[t._v("@"+t._s(e.name))]),t._v(" "),a("span",[t._v(t._s(e.content))]),t._v(" "),a("span",[t._v(t._s(e.time))])]),t._v(" "),a("div",{staticClass:"right"},[a("span",{class:e.isNumChange?"redColor":"",on:{click:function(e){t.numChange(i)}}},[t._v("❤")]),t._v(" "),a("span",[t._v(t._s(e.num))])])])])}))]),t._v(" "),a("div",{staticClass:"talk-bottom"},[a("input",{ref:"talk",attrs:{type:"text",placeholder:"友爱评论，说点儿好听的~"},on:{focus:t.newfocus,blur:t.newblur}}),t._v(" "),a("span",[t._v("@")]),t._v(" "),a("span",[t._v("☺")]),t._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:t.isSendShow,expression:"isSendShow"}],on:{click:t.talkChange}},[t._v("✈")])])])},i=[],r={render:a,staticRenderFns:i};e.a=r},217:function(t,e,n){t.exports=n.p+"10.png?df83d20d07e8806129abecff35fb4941"},218:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recommend",on:{click:t.heartChange}},[t._l(t.arr,function(e,a){return n("div",{ref:"heart",refInFor:!0,class:t.heartShow?"heart heart-active":"heart",attrs:{":key":a}},[t._v("\n    "+t._s(e)+"\n  ")])}),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),n("Aside"),t._v(" "),n("Talk"),t._v(" "),t._l(t.data,function(e,a){return n("span",{key:a,ref:a==t.idx?"Barrage":"",refInFor:!0,class:a==t.idx?"Barrage":"hidden"},[t._v("\n    "+t._s(e.content)+t._s(t.Idx)+"\n  ")])})],2)},i=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h6",[t._v("大多数人都等不到来日方长"),n("br"),t._v("只有乍然离场而已")])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"banner"},[n("iframe",{staticClass:"video",attrs:{frameborder:"0",src:"https://v.qq.com/txp/iframe/player.html?autoPlay=true&vid=w0357ptsfjx",allowFullScreen:"true",allowtransparency:""}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"box"},[a("p",[t._v("@一禅经典语录")]),t._v(" "),a("span",[t._v("在合适的时间遇到合适的人是一种幸福。@抖音小助手#情感语录#一禅小和尚")]),t._v(" "),a("span",[t._v("♪ @一禅经典语录创作")]),t._v(" "),a("div",[a("img",{attrs:{src:n(219),alt:""}})])])}],r={render:a,staticRenderFns:i};e.a=r},219:function(t,e,n){t.exports=n.p+"5.png?529e2358c5cc81382303e594e3cac14c"}});
//# sourceMappingURL=0.build.js.map
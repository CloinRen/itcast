
        //在开发框架时，为了防止变量以及全局对象的污染，要使用沙箱模式
        //沙箱模式：代码自执行，分割作用域
        /*
         * 避免污染全局
         * 将常用的全局对象，通过参数传递到沙箱内
         * 好处：1.在一定的程度上提高变量的搜索性能；2.有利于代码的压缩
         * */
    (function (global) {
        var init,
        itcast= function (selector, context) {
            return new itcast.fn.init(selector,context);
        };

        itcast.fn=itcast.prototype={
            constructor:itcast
        };
        init=itcast.fn.init= function(selector, context){

        }
        init.prototype=itcast.fn;
        //提供可扩展的接口
        itcast.extend=itcast.fn.extend= function (source) {
            //枚举source对象上所有属性
            for(var k in source){
                //添加到调用者身上
                this[k]=source[k];
            }
        };
        itcast.extend({
            each: function (obj,callback) {
                var i= 0,l=obj.length;
                for(;i<l;i++){
                    if(callback.call(obj[i],obj[i],i)===false){
                        break;
                    }
                }
            }
        });
        itcast.fn.extend({
            addClass: function () {
                console.log('addClass');
            }
        });
        //选择器引擎
        //通过select函数，来查询dom元素
        var select=function select(selector,context){
            var ret=[];
            var doms;
            var els=[];
            var i,l;
            //如果context不为undefined,null
            //如果context为单个dom元素
            if(context.nodeType&&context.nodeType===1){
                doms=context.querySelectorAll(selector);
                ret=Array.prototype.slice.call(doms);
            }else if(typeof context=='object'&&(context instanceof Array||'length' in context)){
                //如果context类型为dom数组或伪数组对象

                //遍历context
                for(i=0,l=context.length;i<l;i++){
                    //使用当前遍历到的dom对象，获取dom
                    doms = context[i].querySelectorAll(selector);
                    for(var j = 0, len = doms.length; j < len; j++){
                        ret.push(doms[j]);
                    }
                }
            }else{
                selector = context + ' ' + selector;
                doms = document.querySelectorAll(selector);
                ret = Array.prototype.slice.call(doms);
            }
            return ret;
        };

        global.$=global.itcast=itcast;
    }(window));
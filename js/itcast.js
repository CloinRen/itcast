
        //�ڿ������ʱ��Ϊ�˷�ֹ�����Լ�ȫ�ֶ������Ⱦ��Ҫʹ��ɳ��ģʽ
        //ɳ��ģʽ��������ִ�У��ָ�������
        /*
         * ������Ⱦȫ��
         * �����õ�ȫ�ֶ���ͨ���������ݵ�ɳ����
         * �ô���1.��һ���ĳ̶�����߱������������ܣ�2.�����ڴ����ѹ��
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
        //�ṩ����չ�Ľӿ�
        itcast.extend=itcast.fn.extend= function (source) {
            //ö��source��������������
            for(var k in source){
                //��ӵ�����������
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
        //ѡ��������
        //ͨ��select����������ѯdomԪ��
        var select=function select(selector,context){
            var ret=[];
            var doms;
            var els=[];
            var i,l;
            //���context��Ϊundefined,null
            //���contextΪ����domԪ��
            if(context.nodeType&&context.nodeType===1){
                doms=context.querySelectorAll(selector);
                ret=Array.prototype.slice.call(doms);
            }else if(typeof context=='object'&&(context instanceof Array||'length' in context)){
                //���context����Ϊdom�����α�������

                //����context
                for(i=0,l=context.length;i<l;i++){
                    //ʹ�õ�ǰ��������dom���󣬻�ȡdom
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
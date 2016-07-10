/*TMODJS:{"version":"1.0.0"}*/
!function () {

    function template (filename, content) {
        return (
            /string|function/.test(typeof content)
            ? compile : renderFile
        )(filename, content);
    };


    var cache = template.cache = {};
    var String = this.String;

    function toString (value, type) {

        if (typeof value !== 'string') {

            type = typeof value;
            if (type === 'number') {
                value += '';
            } else if (type === 'function') {
                value = toString(value.call(value));
            } else {
                value = '';
            }
        }

        return value;

    };


    var escapeMap = {
        "<": "&#60;",
        ">": "&#62;",
        '"': "&#34;",
        "'": "&#39;",
        "&": "&#38;"
    };


    function escapeFn (s) {
        return escapeMap[s];
    }


    function escapeHTML (content) {
        return toString(content)
        .replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
    };


    var isArray = Array.isArray || function(obj) {
        return ({}).toString.call(obj) === '[object Array]';
    };


    function each (data, callback) {
        if (isArray(data)) {
            for (var i = 0, len = data.length; i < len; i++) {
                callback.call(data, data[i], i, data);
            }
        } else {
            for (i in data) {
                callback.call(data, data[i], i);
            }
        }
    };


    function resolve (from, to) {
        var DOUBLE_DOT_RE = /(\/)[^/]+\1\.\.\1/;
        var dirname = ('./' + from).replace(/[^/]+$/, "");
        var filename = dirname + to;
        filename = filename.replace(/\/\.\//g, "/");
        while (filename.match(DOUBLE_DOT_RE)) {
            filename = filename.replace(DOUBLE_DOT_RE, "/");
        }
        return filename;
    };


    var utils = template.utils = {

        $helpers: {},

        $include: function (filename, data, from) {
            filename = resolve(from, filename);
            return renderFile(filename, data);
        },

        $string: toString,

        $escape: escapeHTML,

        $each: each
        
    };


    var helpers = template.helpers = utils.$helpers;


    function renderFile (filename, data) {
        var fn = template.get(filename) || showDebugInfo({
            filename: filename,
            name: 'Render Error',
            message: 'Template not found'
        });
        return data ? fn(data) : fn; 
    };


    function compile (filename, fn) {

        if (typeof fn === 'string') {
            var string = fn;
            fn = function () {
                return new String(string);
            };
        }

        var render = cache[filename] = function (data) {
            try {
                return new fn(data, filename) + '';
            } catch (e) {
                return showDebugInfo(e)();
            }
        };

        render.prototype = fn.prototype = utils;
        render.toString = function () {
            return fn + '';
        };

        return render;
    };


    function showDebugInfo (e) {

        var type = "{Template Error}";
        var message = e.stack || '';

        if (message) {
            // 利用报错堆栈信息
            message = message.split('\n').slice(0,2).join('\n');
        } else {
            // 调试版本，直接给出模板语句行
            for (var name in e) {
                message += "<" + name + ">\n" + e[name] + "\n\n";
            }  
        }

        return function () {
            if (typeof console === "object") {
                console.error(type + "\n\n" + message);
            }
            return type;
        };
    };


    template.get = function (filename) {
        return cache[filename.replace(/^\.\//, '')];
    };


    template.helper = function (name, helper) {
        helpers[name] = helper;
    };


    if (typeof define === 'function') {define(function() {return template;});} else if (typeof exports !== 'undefined') {module.exports = template;} else {this.template = template;}
    
    /*v:1*/
template('home',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,num=$data.num,username=$data.username,year=$data.year,country=$data.country,tel=$data.tel,mail=$data.mail,$out='';$out+='<div class="list-block"> <ul> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">护照号码</div> <div class="item-after">';
$out+=$escape(num);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">真实姓名</div> <div class="item-after">';
$out+=$escape(username);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">出生日期</div> <div class="item-after">';
$out+=$escape(year);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">国籍</div> <div class="item-after">';
$out+=$escape(country);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">手机号码</div> <div class="item-after">';
$out+=$escape(tel);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">电子邮件</div> <div class="item-after">';
$out+=$escape(mail);
$out+='</div> </div> </li> </ul> </div>';
return new String($out);
});/*v:1*/
template('index-bar-tab','<nav class="bar bar-tab"> <a class="tab-item active"> <span class="icon icon-home"></span> <span class="tab-label">个人信息</span> </a> <a href="www/page/record.html" class="tab-item"> <span class="icon icon-star"></span> <span class="tab-label">免息记录</span> </a> </nav>');/*v:1*/
template('index-header','<header class="bar bar-nav"> <a class="icon icon-me pull-left open-panel"></a> <h1 class="title">个人信息</h1> </header>');/*v:1*/
template('index-tpl',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';include('./index-header');
$out+=' <div class="content"> <div class="content-inner"> ';
include('./home');
$out+=' </div> </div> <!--';
include('./index-bar-tab');
$out+='--> ';
return new String($out);
});/*v:1*/
template('info',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,shops=$data.shops,username=$data.username,msg=$data.msg,pay=$data.pay,rebate=$data.rebate,proof=$data.proof,$out='';$out+='<div class="list-block"> <ul> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">消费商家</div> <div class="item-after">';
$out+=$escape(shops);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">入境地</div> <div class="item-after">';
$out+=$escape(username);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">入境信息</div> <div class="item-after">';
$out+=$escape(msg);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">消费金额</div> <div class="item-after">';
$out+=$escape(pay);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">退税金额</div> <div class="item-after">';
$out+=$escape(rebate);
$out+='</div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-browser"></i></div> <div class="item-inner"> <div class="item-title label">凭证依据</div> <div class="item-after">';
$out+=$escape(proof);
$out+='</div> </div> </li> </ul> </div>';
return new String($out);
});/*v:1*/
template('panel-left','<div class="panel-overlay"></div> <div class="panel panel-left panel-reveal" id="panel-left"> <div class="bar bar-nav"> <h1 class="title">个人中心</h1> <a class="close-panel icon icon-left pull-left"></a> </div> <div class="content"> <div class="content-block"> <div class="list-block"> <ul> <li class="list-content item-link"> <div class="item-inner"> <div class="item-title"><i class="iconfont icon-fatiezi"></i>我的帖子</div> </div> </li> <li class="list-content item-link"> <div class="item-inner"> <div class="item-title"><i class="iconfont icon-huifu-copy"></i>我的回复</div> </div> </li> <li class="list-content item-link"> <div class="item-inner"> <div class="item-title"><i class="iconfont icon-star"></i>我的收藏</div> </div> </li> </ul> </div> </div> </div> </div>');/*v:1*/
template('popup-add','<ul> <li class="item-content"> <div class="item-media"><i class="icon icon-form-name"></i></div> <div class="item-inner"> <div class="item-title label">入境地</div> <div class="item-input"> <input type="text" placeholder="输入入境地"/> </div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-form-name"></i></div> <div class="item-inner"> <div class="item-title label">入境日期</div> <div class="item-input"> <input type="text" class="data-input" data-toggle="date" placeholder="请选择时间"/> </div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-form-name"></i></div> <div class="item-inner"> <div class="item-title label">消费日期</div> <div class="item-input"> <input type="text" class="data-input" data-toggle="date" placeholder="请选择时间"/> </div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-form-name"></i></div> <div class="item-inner"> <div class="item-title label">消费金额</div> <div class="item-input"> <input type="text" placeholder="输入入境地"/> </div> </div> </li> <li class="item-content"> <div class="item-media"><i class="icon icon-form-name"></i></div> <div class="item-inner"> <div class="item-title label">退款金额</div> <div class="item-input"> <input type="text" placeholder="输入入境地"/> </div> </div> </li> <li class="item-content" style="display: block;"> <div class="card"> <div class="card-header">请上传</div> <div class="card-content"> <div class="card-content-inner"> <div class="row"> <div class="col-33 static"> <input type="file" id="file"/> <div class="add"></div> </div> </div> </div> </div> </div> </li> </ul>');/*v:1*/
template('record-list',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,list=$data.list,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul> ';
$each(list,function($value,$index){
$out+=' <li class="item-content item-link"> <div class="item-inner"> <div class="item-title-row"> <div class="item-title">';
$out+=$escape($value.name);
$out+='</div> <div class="item-after">';
$out+=$escape($value.state);
$out+='</div> </div> <div class="item-subtitle">交易日期:';
$out+=$escape($value.paydate);
$out+='</div> <div class="item-text">交易金额:';
$out+=$escape($value.pay);
$out+='</div> </div> </li> ';
});
$out+=' </ul>';
return new String($out);
});

}()
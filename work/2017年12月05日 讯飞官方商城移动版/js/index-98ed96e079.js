/**
 * Created by kaicui on 17/8/28.
 * 处理前端的一些效果和逻辑
 */
var supportPageOffset = window.pageXOffset !== undefined;
var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

var browserDetector={
    platform:function () {
        var ua = navigator.userAgent.toLowerCase();
        if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
            return 'ios';
        } else if (/(android)/i.test(ua)) {
            return 'android';
        }
    },
    check:function () {
        var ua = navigator.userAgent.toLowerCase();
        if(/micromessenger/.test(ua)){
            return 'wechat';
        }
        else if (/(iphone|ipad|ipod|ios)/i.test(ua)) {
            return 'ios';
        } else if (/(android)/i.test(ua)) {
            return 'android';
        }
        else {
            return 'pc';
        }
    }
};
var browserInfo = browserDetector.check();
var platformInfo = browserDetector.platform();
if(browserInfo==='pc'){
    window.location.href='http://www.xunfei.cn';
}

var eventUtil={
    addHandler: function(element,type,handler){
        if(element.addEventListener){
            element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            element.attachEvent("on" + type, handler);
        }else{
            element["on" + type] = handler;
        }
    },
    getEvent:function(event){
        return event ? event : window.event;
    },
    
    getTarget:function(event){
        return event.target || event.srcElement;
    },
    removeHandler: function(element,type,handler){
        if(element.removeEventListener){
            element.removeEventListener(type,handler,false);
        }else if(element.detachEvent){
            element.detachEvent("on" + type,handler);
        }else{
            element["on" + type] = null;
        }
    }
};

// 转换为数字
function intval(v)
{
    v = parseInt(v);
    return isNaN(v) ? 0 : v;
}

// 获取元素信息
function getPos(e)
{
    var l = 0;
    var t  = 0;
    var w = intval(e.style.width);
    var h = intval(e.style.height);
    var wb = e.offsetWidth;
    var hb = e.offsetHeight;
    while (e.offsetParent){
        l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
        t += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
        e = e.offsetParent;
    }
    l += e.offsetLeft + (e.currentStyle?intval(e.currentStyle.borderLeftWidth):0);
    t  += e.offsetTop  + (e.currentStyle?intval(e.currentStyle.borderTopWidth):0);
    return {x:l, y:t, w:w, h:h, wb:wb, hb:hb};
}

// 获取滚动条信息
function getScroll()
{
    var t, l, w, h;
    
    if (document.documentElement && document.documentElement.scrollTop) {
        t = document.documentElement.scrollTop;
        l = document.documentElement.scrollLeft;
        w = document.documentElement.scrollWidth;
        h = document.documentElement.scrollHeight;
    } else if (document.body) {
        t = document.body.scrollTop;
        l = document.body.scrollLeft;
        w = document.body.scrollWidth;
        h = document.body.scrollHeight;
    }
    return { t: t, l: l, w: w, h: h };
}

// 锚点(Anchor)间平滑跳转
function scroller(el, duration)
{
    if(typeof el != 'object') { el = document.getElementById(el); }
    
    if(!el) return;
    
    var z = this;
    z.el = el;
    z.p = getPos(el);
    z.s = getScroll();
    z.clear = function(){window.clearInterval(z.timer);z.timer=null};
    z.t=(new Date).getTime();
    
    z.step = function(){
        var t = (new Date).getTime();
        var p = (t - z.t) / duration;
        if (t >= duration + z.t) {
            z.clear();
            window.setTimeout(function(){z.scroll(z.p.y, z.p.x)},13);
        } else {
            st = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.y-z.s.t) + z.s.t;
            sl = ((-Math.cos(p*Math.PI)/2) + 0.5) * (z.p.x-z.s.l) + z.s.l;
            z.scroll(st, sl);
        }
    };
    z.scroll = function (t, l){window.scrollTo(l, t)};
    z.timer = window.setInterval(function(){z.step();},13);
}

/*
 下面是核心业务逻辑
 */

//banner配置
var banners=[
    {pid:1,name:"讯飞输入法-banner",android:"https://srf.xunfei.cn/",ios:"https://srf.xunfei.cn/",wechat:"https://srf.xunfei.cn/"},
    {pid:2,name:"晓译翻译机-banner",android:"http://mall.xunfei.cn/wap/goods/index/35285",ios:"http://mall.xunfei.cn/wap/goods/index/35285",wechat:"http://mall.xunfei.cn/wap/goods/index/35285"},
    {pid:3,name:"阿尔法小蛋-banner",android:"http://mall.xunfei.cn/wap/goods/index/35215",ios:"http://mall.xunfei.cn/wap/goods/index/35215",wechat:"http://mall.xunfei.cn/wap/goods/index/35215"},
];

//推荐产品配置
var rec_prod=[
    {pid:1,name:"讯飞输入法-推荐",android:"http://www.xunfei.cn/a",ios:"https://itunes.apple.com/cn/app/id917236063",wechat:"https://srf.xunfei.cn/"},
    {pid:3,name:"阿尔法小蛋-推荐",android:"http://mall.xunfei.cn/wap/goods/index/35215",ios:"http://mall.xunfei.cn/wap/goods/index/35215",wechat:"http://mall.xunfei.cn/wap/goods/index/35215"},
    {pid:6,name:"小飞鱼-推荐",android:"http://mall.xunfei.cn/wap/goods/index/35290",ios:"http://mall.xunfei.cn/wap/goods/index/35290",wechat:"http://mall.xunfei.cn/wap/goods/index/35290"},
];
//硬件产品配置
var hardware_prod=[
    {pid:2,name:"晓译翻译机-智能硬件",android:"http://e22a.com/h.rGmk3Z",ios:"http://e22a.com/h.rGmk3Z",wechat:"https://item.jd.com/3959049.html"},
    // {pid:3,name:"阿尔法小蛋",android:"https://detail.tmall.com/item.htm?spm=a220z.1000880.0.0.ZIbQmF&id=538801879981",ios:"https://detail.tmall.com/item.htm?spm=a220z.1000880.0.0.ZIbQmF&id=538801879981",wechat:"https://item.jd.com/4373840.html"},
    // {pid:3,name:"阿尔法小蛋",android:"http://zmnxbc.com/s/Ei8mg?tm=1e6aa2",ios:"https://detail.tmall.com/item.htm?spm=a220z.1000880.0.0.ZIbQmF&id=538801879981",wechat:"https://item.jd.com/4373840.html"},
    {pid:3,name:"阿尔法小蛋-智能硬件",android:"http://e22a.com/h.rtEmFe",ios:"http://e22a.com/h.rtEmFe",wechat:"https://item.jd.com/4373840.html"},
    {pid:4,name:"阿尔法大蛋-智能硬件",android:"http://e22a.com/h.rGmpJm",ios:"http://e22a.com/h.rGmpJm",wechat:"https://item.jd.com/5275308.html"},
    {pid:5,name:"智能台灯-智能硬件",android:"http://e22a.com/h.rGNlyj",ios:"http://e22a.com/h.rGNlyj",wechat:"https://item.jd.com/4211311.html"},
    {pid:6,name:"小飞鱼-智能硬件",android:"http://e22a.com/h.rGnef9",ios:"http://e22a.com/h.rGnef9",wechat:"https://item.jd.com/4682893.html"},
    {pid:7,name:"叮咚音箱-智能硬件",android:"https://item.m.jd.com/product/2156386.html",ios:"https://item.m.jd.com/product/2156386.html",wechat:"https://item.m.jd.com/product/2156386.html"},
];
//软件产品 下载配置
var software_download=[
    {pid:1,name:"讯飞输入法-精品软件",android:"http://www.xunfei.cn/a",ios:"https://itunes.apple.com/cn/app/id917236063",wechat:{android:"https://srf.xunfei.cn/",ios:"http://a.app.qq.com/o/simple.jsp?pkgname=com.iflytek.inputmethod"}},
    {pid:8,name:"配音阁-精品软件",android:"http://file.peiyinge.com/app_package/Peiyinge-1.6.05.12-WAP_SEM_1.apk",ios:"https://itunes.apple.com/cn/app/%E9%85%8D%E9%9F%B3%E9%98%81-%E5%B9%BF%E5%91%8A%E9%85%8D%E9%9F%B3tts%E8%AF%AD%E9%9F%B3%E5%90%88%E6%88%90%E5%8A%A9%E6%89%8B/id1146370394?mt=8",wechat:{android:"http://file.peiyinge.com/app_package/Peiyinge-1.6.05.12-WAP_SEM_1.apk",ios:"http://a.app.qq.com/o/simple.jsp?pkgname=com.iflytek.uvoice"}},
    {pid:9,name:"咪咕灵犀-精品软件",android:"http://lingxi.voicecloud.cn/a",ios:"https://itunes.apple.com/cn/app/ling-xi-yu-yin-zhu-shou/id615845815",wechat:{android:"http://lingxi.voicecloud.cn/a",ios:"http://a.app.qq.com/o/simple.jsp?pkgname=com.iflytek.cmcc"}},
    {pid:10,name:"讯飞语记-精品软件",android:"http://iss.openspeech.cn/v",ios:"https://itunes.apple.com/app/id931409652",wechat:{android:"http://iss.openspeech.cn/v",ios:"http://a.app.qq.com/o/simple.jsp?pkgname=com.iflytek.vflynote"}},
    {pid:11,name:"录音宝-精品软件",android:"http://luyin.voicecloud.cn/a",ios:"https://itunes.apple.com/cn/app/id954213062",wechat:{android:"http://luyin.voicecloud.cn/a",ios:"http://a.app.qq.com/o/simple.jsp?pkgname=com.iflytek.recinbox"}},
    {pid:12,name:"乐声企宣-精品软件",android:"http://file.adsring.cn/videoResource/vsp/leshengqx/index.html?from=singlemessage&isappinstalled=0",ios:"http://file.adsring.cn/videoResource/vsp/leshengqx/index.html?from=singlemessage&isappinstalled=0",wechat:{android:"http://file.adsring.cn/videoResource/vsp/qupian/index.html",ios:"http://file.adsring.cn/videoResource/vsp/qupian/index.html"}}
    
];

//合作应用 下载配置
var coop_download=[
    {pid:12,name:"酷音铃声-合作应用",android:"http://file.diyring.cc/client/3009/DiyRingClient.apk",ios:"https://itunes.apple.com/cn/app/%E9%85%B7%E9%9F%B3%E9%93%83%E5%A3%B0-%E6%97%A0%E9%9C%80%E7%94%B5%E8%84%91-%E4%B8%80%E9%94%AE%E8%AE%BE%E7%BD%AE%E6%89%8B%E6%9C%BA%E9%93%83%E5%A3%B0/id1211124888?mt=8",wechat:{android:"http://file.diyring.cc/client/3009/DiyRingClient.apk",ios:"http://a.app.qq.com/o/simple.jsp?pkgname=com.iflytek.ringdiyclient"}},
    {pid:13,name:"海豚有声-合作应用",android:"http://s1.haitunvoice.com/langdu/index.html",ios:"http://s1.haitunvoice.com/langdu/index.html",wechat:{android:"http://s1.haitunvoice.com/langdu/index.html",ios:"http://a.app.qq.com/o/simple.jsp?pkgname=com.iflytek.readassistant"}},
    // {pid:14,name:"高德地图-合作应用",android:"http://www.autonavi.com",ios:"http://www.autonavi.com",wechat:{android:"http://www.autonavi.com",ios:"http://www.autonavi.com"}}
    {pid:15,name:"趣片-合作应用",android:"http://file.adsring.cn/videoResource/vsp/qupian/index.html",ios:"http://file.adsring.cn/videoResource/vsp/qupian/index.html",wechat:{android:"http://file.adsring.cn/videoResource/vsp/qupian/index.html",ios:"http://file.adsring.cn/videoResource/vsp/qupian/index.html"}}
    // {pid:14,name:"海绵阅读-合作应用",android:"http://wap.eoemarket.com/apps/show/id/854599",ios:"https://itunes.apple.com/cn/app/%E6%B5%B7%E7%BB%B5%E9%98%85%E8%AF%BB-%E5%8F%AF%E4%BB%A5%E5%90%AC%E4%B9%A6%E7%9A%84%E5%B0%8F%E8%AF%B4%E9%98%85%E8%AF%BB%E5%99%A8/id1134334340?mt=8",wechat:{android:"http://wap.eoemarket.com/apps/show/id/854599",ios:"https://itunes.apple.com/cn/app/%E6%B5%B7%E7%BB%B5%E9%98%85%E8%AF%BB-%E5%8F%AF%E4%BB%A5%E5%90%AC%E4%B9%A6%E7%9A%84%E5%B0%8F%E8%AF%B4%E9%98%85%E8%AF%BB%E5%99%A8/id1134334340?mt=8"}},
];
var state={
    backTopVisible:false,
    menuVisible:false,
    isGoingToTop:false,//是否正在回到顶部
    scrollTimer:undefined,
};
init();

function showWechatTip(){
    document.getElementById("wechat").classList.add("show");
}
function hideWechatTip(){
    document.getElementById("wechat").classList.remove("show");
}
function showMenu() {
    if(state.menuVisible){
        return;
    }
    state.menuVisible = true;
    document.getElementById("drop-down").classList.add("show");
}
function hideMenu() {
    
    if(!state.menuVisible){
        return;
    }
    state.menuVisible = false;
    document.getElementById("drop-down").classList.remove("show");
}
/**
 * 隐藏回到顶部按钮
 */
function hideBackTop() {
    state.backTopVisible = false;
    document.getElementById("back-top").classList.remove("show");
}
function showBackTop() {
    state.backTopVisible = true;
    document.getElementById("back-top").classList.add("show");
}

function gotoTop() {
    if(state.isGoingToTop){
        return;
    }
    state.isGoingToTop = true;
    //todo:动画渐进回到顶部
    //设置定时器
    var timer = setInterval(function(){
        //获取滚动条距离顶部的高度
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;  //同时兼容了ie和Chrome浏览器
        
        //减小的速度
        var isSpeed = Math.floor(-osTop / 3);
        // isSpeed>-120&&(isSpeed=-120)
        document.documentElement.scrollTop = document.body.scrollTop = osTop + isSpeed;
        //console.log( osTop + isSpeed);
        
        //判断，然后清除定时器
        if (osTop < 1) {
            clearInterval(timer);
            state.isGoingToTop = false;
        }
    },30);
}


function resetScrollTimer() {
    if(state.scrollTimer){
        clearTimeout(state.scrollTimer);
    }
    state.scrollTimer = setTimeout(function () {
        hideBackTop();
    },4000);
}

/**
 * 获得用户点击的DOM元素的产品id
 * @param dom
 */
function getClickProdId(dom){
    if(dom) {
        if(dom.getAttribute){
            var pid = dom.getAttribute("pid");
            if(pid!==undefined && pid!==null){
                return pid;
            }else{
                return getClickProdId(dom.parentNode);
            }
        }
    }
}
function getClickName(dom){
    if(dom) {
        if(dom.getAttribute){
            var pid = dom.getAttribute("name");
            if(pid!==undefined && pid!==null){
                return pid;
            }else{
                return getClickName(dom.parentNode);
            }
        }
    }
}


/**
 * 处理跳转点击
 * @param dom
 * @param data
 */
function handleRedirectClick(dom,data) {
    var pid = getClickProdId(dom);
    var config = data.filter(function (item) {
        return item.pid == pid;
    })[0];
    if(config){
        //百度统计
        _hmt.push(['_trackEvent','用户行为', 'click',config.name, 1]);
        //讯飞统计
        _wa("event","send","用户行为","click",config.name,1);
        //友盟统计
        _czc.push(['_trackEvent','用户行为', 'click',config.name, 1]);
        var urlToGo = config[browserInfo];
        if(urlToGo){
            window.open(urlToGo);
        }
    }
    
}


/**
 * 处理下载点击
 * @param dom
 */
function handleDownloadClick(dom,data) {
    var pid = getClickProdId(dom);
    var config = data.filter(function (item) {
        return item.pid == pid;
    })[0];
    if(config) {
        //百度统计
        _hmt.push(['_trackEvent','用户行为-mobile', 'click',config.name, 1]);
        //讯飞统计
        _wa("event","send","用户行为","click",config.name,1);
        //友盟统计
        _czc.push(['_trackEvent','用户行为', 'click',config.name, 1]);
        
        var urlToGo = config[browserInfo];
        //非微信环境，直接跳转
        if (urlToGo && browserInfo !== 'wechat') {
            window.open(urlToGo);
        } else if (browserInfo === 'wechat') {
            //微信环境，进一步读取配置
            var subUrl =urlToGo[platformInfo];
            if(subUrl){
                subUrl = subUrl.toLowerCase();
                //对于下载地址，如果是微信环境，判断是itunes或者a.app 开头，表示是可以直接跳转的，否则就需要弹出提示框
                if(subUrl.indexOf('a.app.qq.com')>0 || subUrl.indexOf('itunes.apple.com')>0){
                    window.open(subUrl);
                }
                else{
                    //否则显示提示
                    showWechatTip();
                }
            }
            
        }
    }
}


function init() {
    
    //初始化swiper
    window.mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        autoplayDisableOnInteraction:false,
        autoplay : 3000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    });
    
    //监听banner点击事件，进行处理
    eventUtil.addHandler(document.getElementById("banner"),'click',function (e) {
        handleRedirectClick(eventUtil.getTarget(e),banners);
    });
    
    //监听 推荐产品 点击事件，进行处理
    eventUtil.addHandler(document.getElementById("recommend-product"),'click',function (e) {
        handleRedirectClick(eventUtil.getTarget(e),rec_prod);
    });
    //监听 硬件产品 点击事件，进行处理
    eventUtil.addHandler(document.getElementById("hardware"),'click',function (e) {
        handleRedirectClick(eventUtil.getTarget(e),hardware_prod);
    });
    //监听 软件产品 点击事件，进行处理
    eventUtil.addHandler(document.getElementById("software"),'click',function (e) {
        handleDownloadClick(eventUtil.getTarget(e),software_download);
    });
    //监听 合作产品 点击事件，进行处理
    eventUtil.addHandler(document.getElementById("cooperative"),'click',function (e) {
        handleDownloadClick(eventUtil.getTarget(e),coop_download);
    });
    
    //监听滚动
    eventUtil.addHandler(document,'scroll',function (e) {
        resetScrollTimer();
        var _scrollTop = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;;
        // console.log('scrollTop='+_scrollTop);
        if(parseInt(_scrollTop)>200 && !state.backTopVisible){
            showBackTop();
        }
        if(parseInt(_scrollTop)<50 && state.backTopVisible){
            hideBackTop();
        }
    });
    eventUtil.addHandler(document.getElementById("back-top"),'touchstart',function (e) {
        gotoTop();
    });
    
    //菜单按钮点击
    eventUtil.addHandler(document.getElementById("menu-btn"),'touchstart',function () {
        if(state.menuVisible){
            hideMenu();
        }else{
            showMenu();
        }
    })
    eventUtil.addHandler(document.getElementById("drop-down"),'click',function (e) {
        hideMenu();
        //jump to anchor
        var name = getClickName(eventUtil.getTarget(e));
        scroller(name,200);
    });
    eventUtil.addHandler(document.getElementById("wechat-mask"),'click',function (e) {
        hideWechatTip();
    });
}

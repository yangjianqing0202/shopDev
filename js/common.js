/*************
 日期：2017/09/29
 作者：杨健青
 说明：公共方法
 */

//根据ID获取相应节点
function getId ( _id ){
    return document.getElementById(_id);
}

//打印方法
function log (n) {
    console.log (n)
}

//Ajax-json公共方法
function ajaxFn( url, type, callback){
    $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        success: function(_d){
            callback(_d);
        }
    });
}

//Ajax-jsonp公共方法
function ajaxJsonpFn (url, type, callback){
    $.ajax({
        url: url,
        type: type,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function(_d){
            callback(_d);
        }
    });
}

// 接收pid，返回产品信息
function getParam (url, _pid, callback){
    $.ajax({
        url: url,
        type: 'get',
        data:'cc=' + _pid,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        success: function(_d){
            callback(_d);
        }
    });
}


// 接收产品数量和价格，返回单项商品的总价：单价 * 数量
function cartFnJsonp (url, _d, callback){
    $.ajax({
        url: url,
        type: 'get',
        data:'cart=' + _d,
        dataType: 'jsonp',
        jsonp: 'jsoncallback',
        success: function(_d){
            callback(_d);
        }
    });
}

// 单个商品复选按钮的接口，计算所有选中的商品的总数和总价
function goodsCheckFnJsonp( _url, _d, callback ){
    $.ajax({
        url: _url,
        type:'get',
        data:'goods=' + _d,
        dataType:'jsonp',
        jsonp:'jsoncallback',
        success:function(d){
            callback(d);
        }
    });
}

//通过当前href.url获取产品pid
function getPid (href){
    var _strInx = href.indexOf('?');
    var _pid    = href.substring(_strInx + 5);
    return  _pid
}





// ===================================================
//全站的hearder头
function headerFn (){
    $.ajax({
        url: LocalHref + 'component/header.html',
        type: 'get',
        dataType: 'html',
        success: function(_d){
            $('body').prepend(_d);

            //进入我的京东界面
            new MyInfoFn($('#myInfo'));

            //进入登录页面
            new Login($('#login'));

            //首页header导航条上的搜索框
            new SearchFn($('#find'));

            // 首页顶部-栏目导航条
            new CreateColumnFn($('#columnNavId'));
        }
    })
}


//进入登录页面
function MyInfoFn(id){
    this.myInfoId = id;
    this.init();
}
MyInfoFn.prototype = {
    init: function(){
        this.openFn()
    },
    openFn: function(){
        this.myInfoId.on('click', function(){
            window.open(LocalHref + 'userInfo.html');
        })
    }
};


//进入我的京东界面
function Login(id){
    this.loginID = id;
    this.init();
}
Login.prototype = {
    init: function(){
        this.openFn()
    },
    openFn: function(){
        this.loginID.on('click', function(){
            window.open(LocalHref + 'userLoginPage.html');
        })
    }
};



// header导航条上的搜索框
//SearchFn是构造函数，首字母要大写
function SearchFn(_obj){
    this.searVal = indexHeaderSearchVal;
    // 构造函数的启动方法
    this.init(_obj)
}
//添加方法到函数
SearchFn.prototype = {
    init: function(_obj){
        var _this = this;

        //通过this将焦点方法传给对象
        _this.onFocus(_obj);
        _this.onBlur(_obj);
        _this.searchVal(_obj);
    },
    //搜索框初始显示内容
    searchVal: function(_obj){
        var _this = this;
        _obj.attr ('value', _this.searVal);
    },

    onFocus: function(_obj){
        _obj.on('focus', function(){
            $(this).attr ('value', '')
        })
    },
    onBlur: function(_obj){
        _obj.on('blur', function(){
            $(this).attr ('value', indexHeaderSearchVal)
        })
    }
};

// 首页顶部-栏目导航条
function CreateColumnFn(_obj){

    this.columnNavUlId = _obj;
    this.init();
}
CreateColumnFn.prototype = {
    init: function(){
        var _self = this;
        _self.getDate()

    },
    getDate: function(){

        var _self = this;
        ajaxJsonpFn(APILIST.columnNavApi, 'get', function(_d){
            _self.createNev(_d)
        })
    },
    createNev: function(_data){
        var _self = this;
        var _navData = _data.navLinks;

        for(var i=0; i<_navData.length; i++){
            $('<li/>',{
                'data-navId': _navData[i].column
            }).appendTo(_self.columnNavUlId)
                .html(_navData[i].name)
        }
    }
};
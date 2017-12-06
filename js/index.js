/*************
 日期：2017/10/10
 作者：杨健青
 说明：index首页的js
 */



// 首页左侧的纵向导航条
function IndexSubNav( n ){
    this.subNavUlId = n;
    this.init();
}
IndexSubNav.prototype = {
    init: function(){
        var _self = this;
        _self.headerDomFn();
        _self.getData();

    },
    headerDomFn: function(){
        headerFn();
    },
    getData: function(){
        var _self = this;
        ajaxJsonpFn(APILIST.subNavApi, 'get', function(_d){
            _self.createDom(_d);

            var _subNavLis = _self.subNavUlId.children();
            _self.onMouseover(_subNavLis);
            _self.onMouseout(_subNavLis);
        })
    },
    createDom:function(_d) {
        var _self = this;
        var _dataArr = _d.productList;
        for (var i=0; i<_dataArr.length; i++) {
            $('<li/>', {})
                .appendTo(_self.subNavUlId)
                .html(function(){
                    var _this = this;
                        $('<p/>', {})
                            .appendTo(_this)
                            .html(_dataArr[i].type);

                        $('<div/>', {
                            'class': 'liPopup'
                        })
                            .appendTo(_this)
                            .html(function(){
                                var _this = this;
                                for (var j=0; j < _dataArr[i].products.length; j++){
                                    $('<li/>', {})
                                        .appendTo(_this)
                                        .html(_dataArr[i].products[j].name)
                                }
                            })
                })
        }

    },
    onMouseover:function(li){
             li.on('mouseover', function(){
                $(this).children('div').show();
             })
         },
    onMouseout:function(li){
             li.on('mouseout', function(){
                $(this).children('div').hide();
             })
         }
};

//首页滚动广告图
function IndexSliderFn(_obj){
    for ( var i in _obj )
    {
        this[i] = _obj[i];
    }

    this.sliderImgNum = 0;
    this.init();
}
IndexSliderFn.prototype = {
    init: function(){
        var _self = this;

        //动态生成图片地址
        _self.createULimgs();

        //轮播图的数量
        var _sliderIlNum = _self.sliderImgId.children().length;
        //每张轮播图的宽度
        var _sliderImgW = _self.sliderImgId.children().width();

        // 轮播图的父容器UL的宽度
        _self.sliderImgId.width(_sliderImgW * _sliderIlNum);

        //将数量和宽度装入对象
        var _imgNumWObj = {};
        _imgNumWObj._sliderImgW = _sliderImgW;
        _imgNumWObj['_sliderIlNum'] = _sliderIlNum;

        //动态生成小圆点
        _self.createPointer(_imgNumWObj);

        //获取小白点的集合
        _self.getPointers();

        //左边按钮方法
        _self.LeftBtnFn(_imgNumWObj);

        //右边按钮方法
        _self.RightBtnFn(_imgNumWObj);

        //小白点点击方法
        _self.pointerBtnFn(_imgNumWObj)
    },
    // 获取图片数据
    getData: function(){
        var _self = this;
        return indexSliderImgUrl;
    },
    // 动态生成图片地址
    createULimgs: function(){
        var _self = this;
        var _data = _self.getData();

        for (var i=0; i<_data.urls.length; i++)
        {
            $('<li/>')
                .appendTo(_self.sliderImgId)
                .html(function(){
                    var _this = $(this);
                    $('<img/>')
                        .appendTo(_this)
                        .attr('src', _data.urls[i])
                })
        }
    },
    // 封装轮播图的动画方法
    sliderAnimate: function(_obj, num, width){
        var _self = this;
        _obj.stop().animate({
            left: -(num * width)
        }, 200)
    },
    //左按钮方法
    LeftBtnFn: function(_imgNumWObj){
        var _self = this;

        //点击左按钮
        _self.toLeftBtn.on('click', function() {
            if (_self.sliderImgNum > 0) {
                _self.sliderImgNum--;
            }
            else {
                _self.sliderImgNum = _imgNumWObj['_sliderIlNum'] - 1;
            }

            //根据大图序号变红当前小圆点
            _self.pointerRed();

            // 执行轮播图动画方法
            _self.sliderAnimate( _self.sliderImgId, _self.sliderImgNum, _imgNumWObj._sliderImgW);

        })
    },
    //右按钮方法
    RightBtnFn: function(_imgNumWObj){
        var _self = this;

        //点击右按钮
        _self.toRightBtn.on('click', function(){
            if(_self.sliderImgNum < _imgNumWObj['_sliderIlNum'] - 1)
            {
                _self.sliderImgNum ++;
            }
            else
            {
                _self.sliderImgNum = 0;
            }

            //根据大图序号变红当前小圆点
            _self.pointerRed();

            //轮播图动画方法执行
            _self.sliderAnimate( _self.sliderImgId, _self.sliderImgNum, _imgNumWObj._sliderImgW);

            })
    },
    //生成小白点Li
    createPointer: function(_imgNumWObj){
        var _self = this;
        if(_imgNumWObj['_sliderIlNum'] > 0){
            for ( var i=0; i<_imgNumWObj['_sliderIlNum']; i++)
            {
                $('<li/>')
                    .appendTo(_self.pointerUl)
            }

            var _pointerLi = _self.getPointers();
            //默认第一个小圆点初始红色
            _pointerLi.eq(0).addClass('red');

            //小白点ul的宽度
            var _marginLeft = _imgNumWObj['_sliderIlNum'] * 30;
            _self.sliderPointId
                .width(_marginLeft)
                .css('marginLeft', -(_marginLeft/2 - 5));

            // 小圆点背景的宽度
            _self.sliderPointBg
                .width(_marginLeft)
                .css('marginLeft', -(_marginLeft/2 + 3));
        }
        else
        {
            return false;
        }

    },
    // 获得小白点的集合
    getPointers: function(){
        var _self = this;
        return _self.pointerUl.children('li');
    },
    //小白点点击方法
    pointerBtnFn: function(_imgNumWObj){
        var _self = this;
        var _pointerLi = _self.getPointers();
        _pointerLi.on('click', function(){
            //当前点的图片序号
            _self.sliderImgNum = $(this).index();

            //切换成对应的大图
            _self.sliderAnimate( _self.sliderImgId, _self.sliderImgNum, _imgNumWObj._sliderImgW);

            //当前的小圆点设置红色样式，其余去除样式
            $(this).addClass('red').siblings().removeClass();

        });


    },
    // 哪个小白点变红,左右箭头用
    pointerRed: function(){
        var _self = this;
        var _pointerLi = _self.getPointers();

        //根据大图序号设置小圆点变红
        _pointerLi
            .eq(_self.sliderImgNum)
            .addClass('red').siblings().removeClass();
    }
};

//  首页享生活
function  ProductBlockFn(_obj){
    this.productUlId = _obj;
    this.init();
}

ProductBlockFn.prototype = {
    init: function(){
        var _self = this;
        _self.getData();
    },
    getData: function(){
        var _self = this;
        ajaxJsonpFn(APILIST.productBlock, 'get', function(_d){
            _self.createDom(_d);
        });

    },
    createDom: function(_d){
        var _self = this;
        var  _pb = _d.pb;

        for (var i=0; i<_pb.length; i++){
            $('<a/>',{
                'target': '_blank'
            })
                .appendTo(_self.productUlId)
                .attr('href',LocalHref +'productDetail.html?pid=' + _pb[i].pid )
                .html(function(){
                    var a_this = this;
                    $('<li/>',{
                       'class':'bg_img'+ (i+1)
                    })
                        .appendTo(a_this)
                        .html(function(){
                            var li_this = this;
                            $('<dl/>', {
                                'class':'bg_color'+ (i+1)
                            })
                                .appendTo(li_this)
                                .html('<dt>'+ _pb[i].name +'</dt><dd>'+ _pb[i].describe +'</dd>')
                        })
                })
        }
    }
};


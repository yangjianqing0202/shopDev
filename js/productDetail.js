/*************
 日期：2017/10/17
 作者：杨健青
 说明：产品详情页的js
 */


// 获取当前页面的产品的pid
// log(getPid(location.href));

// 左侧产品详情大小图片
function ProductImgFn(_obj){
    for (var i in _obj){
        this[i] = _obj[i]
    }
    this.num = 0;
    this.init();
}

ProductImgFn.prototype = {
    init: function(){
        var _self = this;
        _self.headerDomFn();
        _self.getData();
    },
    headerDomFn: function(){
        headerFn();
    },
    //获取图片数据
    getData: function(){
        var _self = this;
        ajaxJsonpFn(APILIST.smallImgData, 'get', function(_data){
            _self.createDom(_data);
            _self.defaultBigImg(_data);
            var smallImgLen = _self.smallImgUlId.children().length;

            _self.leftBtnFn(smallImgLen);
            _self.rightBtnFn(smallImgLen);
            _self.smallClickFn();
            _self.eventMouse();

        })
    },
    //生成小图片DOM
    createDom: function(_data){
        var _self = this;
        var _smallImg = _data.smallImg;
        var _smallImgLen = _smallImg.length;

        //小图Ul的宽度
        _self.smallImgUlId.css('width',_smallImgLen *70);

        for(var i=0; i<_smallImgLen; i++){
            $('<li/>', {})
                .attr('data-bigImg',_smallImg[i].bigImg)
                .appendTo(_self.smallImgUlId)
                .html(function(){
                    var li_this = this;
                    $('<img/>', {})
                        .appendTo(li_this)
                        .attr('src',_smallImg[i].imgurl)
                })
        }

    },
    // 页面加载时，默认加载第一张图片
    defaultBigImg: function(_data){
        var _self = this;
        var _oneImg = _data.smallImg[0].bigImg;
        _self.bigImgUrlId.attr('src', _oneImg);
        _self.localImgDetailId.children('img').attr('src', _oneImg)
    },
    leftBtnFn: function(len){
        var _self = this;
        _self.leftBtnId.on('click', function(){
            if(_self.num > 0){
                _self.num--
            }else
            {
                _self.num = len - 1
            }
            _self.smallImgUlId.css('left', -(_self.num * 10))

        });

    },
    rightBtnFn: function(len){
        var _self = this;
        _self.rightBtnId.on('click', function(){
            if(_self.num < len - 2){
                _self.num++
            }else
            {
                _self.num = 0
            }
            log(_self.num);
            _self.smallImgUlId.css('left', -(_self.num * 10))

        });
    },
    //小图切换大图
    smallClickFn: function(){
        var _self = this;
        var lis = _self.smallImgUlId.children();

        lis.on('click', function(){
            var bigImgUrl = $(this).attr('data-bigImg');
            _self.bigImgUrlId.attr('src', bigImgUrl);
            _self.localImgDetailId.children('img').attr('src', bigImgUrl)
        })

    },
    //大图鼠标移入放大镜
    eventMouse: function(){
        var _self = this;
        _self.goodsBgImgId.on({
            mouseover: function(){
                _self.bigImgMaskId.show();
                _self.localImgDetailId.show();
                _self.eventMouseMove()
            },
            mouseout: function(){
                _self.bigImgMaskId.hide();
                _self.localImgDetailId.hide();
            }
        })
    },
    eventMouseMove: function(){
        var _self = this;
        _self.goodsBgImgId.on('mousemove', function(e){
            var _eL = e.pageX;
            var _eT = e.pageY;

            // 父容器dt，相对于整个网页的xy
            var _dtXy =  _self.goodsBgImgId.offset();
            _eL = _eL - _dtXy.left - 85;
            _eT = _eT - _dtXy.top - 85;

            // 水平移动方向: _eL
            if(_eL < 0){
                _eL = 0
            }
            else if(_eL > ( _self.goodsBgImgId.width() - _self.bigImgMaskId.width() ))
            {
                _eL = (_self.goodsBgImgId.width() - _self.bigImgMaskId.width())
            }

            // 垂直移动方向： _eT
            if (_eT < 0) {
                _eT = 0
            }
            else if (_eT > ( _self.goodsBgImgId.height() - _self.bigImgMaskId.height() ) )
            {
                _eT = ( _self.goodsBgImgId.height() - _self.bigImgMaskId.height() )
            }

            _self.bigImgMaskId.css({
                'left': _eL,
                'top': _eT
            });
            _self.localImgDetailId.children('img').css({
                'left': -(_eL * 3),
                'top': -(_eT * 3)
            })

        })
    }
};


var idObj = {
    smallImgUlId: $('#smallImgUlId'),
    leftBtnId : $('#leftBtnId'),
    rightBtnId : $('#rightBtnId'),
    bigImgUrlId : $('#bigImgUrlId'),
    goodsBgImgId: $('#goodsBgImgId'),
    bigImgMaskId: $('#bigImgMaskId'),
    localImgDetailId: $('#localImgDetailId')
};
new ProductImgFn(idObj);


/*************
 日期：2017/10/20
 作者：杨健青
 说明：产品详情页-加入购物车的商品数量
 */

function GoodsNumFn(_obj){
    for(var i in _obj){
        this[i] = _obj[i];
    }
    this.init();
}

GoodsNumFn.prototype = {
    init: function(){
        var _self = this;
        _self.goodsBtnCutId.css({
            'color': '#DDDADA',
            'cursor': 'not-allowed'
        });
        //点击+号增加商品方法
        _self.goodsBtnPlusFn();

        //点击-号减少商品方法
        _self.goodsBtnCutFn();

        //修改value值增加或减少商品方法
        _self.goodsValueNumFn();

        //跳转到购物车
        _self.addGoodCartFn();
    },

    //点击+号增加商品方法
    goodsBtnPlusFn: function(){
        var _self = this;

        _self.goodsBtnPlusId.on('click', function(){
            _self.btnNum ++;
            _self.goodsNumFn(_self.btnNum);
            _self.goodsBtnCutId.css({
                'color': '#000',
                'cursor': 'pointer'
            });
        })
    },

    //点击-号减少商品方法
    goodsBtnCutFn: function(){
        var _self = this;
        _self.goodsBtnCutId.on('click', function(){
            if(_self.btnNum > 1){
                _self.btnNum --;
            }
            _self.goodsNumFn(_self.btnNum);
            if(_self.btnNum <= 1){
                _self.goodsBtnCutId.css({
                    'color': '#DDDADA',
                    'cursor': 'not-allowed'
                });
            }
        })
    },

    //修改value值增加或减少商品方法
    goodsValueNumFn: function(){
        var _self = this;
        _self.goodsNum.on('keyup', function(){
            _self.btnNum = _self.goodsNum.attr('value');
            if(isNaN(_self.btnNum)||_self.btnNum == '')
            {
                _self.btnNum = 1;
            }
            else{
                if(_self.btnNum > 1){
                    _self.goodsBtnCutId.css({
                        'color': '#000',
                        'cursor': 'pointer'
                    });
                }
                if(_self.btnNum <= 1){
                    _self.goodsBtnCutId.css({
                        'color': '#DDDADA',
                        'cursor': 'not-allowed'
                    });
                    _self.btnNum = 1;
                }
            }
            _self.goodsNumFn(_self.btnNum);
        });
    },

    //根据上面等计算方法，更新value值得公共方法
    goodsNumFn: function(num){
        var _self = this;
        _self.goodsNum.attr('value', num);
    },

    //跳转到购物车
    addGoodCartFn: function(){
        var _self = this;
        _self.addGoodCartBtnId.on('click', function(){
            window.open(LocalHref + 'shoppingCart.html');
            /*
                $.ajax({
                    url: APILIST.province,
                    data: _self.goodsNumFn,
                    success: function(goodsNumFn){
                        if(goodsNumFn.info == true){
                            window.open('http://127.0.0.1:6789/shoppingCart.html')
                        }
                    }
                })
            */
        })
    }
};

new GoodsNumFn({
    goodsNum: $('#goodsNum'),
    goodsBtnPlusId: $('#goodsBtnPlusId'),
    goodsBtnCutId: $('#goodsBtnCutId'),
    btnNum: 1,
    addGoodCartBtnId:$('#addGoodCartBtnId')
});












/*************
 日期：2017/10/24
 作者：杨健青
 说明：购物车的JS
 */
function ShoppingCartFn(_config){
    for(var i in _config){
        this[i] = _config[i];
    }

    /* 作废，替换成插件
    this.isCheck = '';
    */

    this.checkSkinBtn = ''; //复选框插件
    this.init();

}

ShoppingCartFn.prototype = {
    init: function(){
        var _self = this;
        //加载网页头
        _self.headerDomFn();
        _self.getData();
    },
    //加载网页头
    headerDomFn: function(){
        headerFn()
    },

    //获取购物车后端数据方法
    getData:function(){
        var _self = this;
        ajaxJsonpFn(APILIST.cartUlLi, 'get', function(_data){
            if(_data.error.code == 0){

                // 全部商品
                _self.allGoodsId.html(_data.total.num);

                // 生成购物车
                _self.createDom(_data, function(){

                    /*  作废，替换成新的复选框插件
                    //获得所有产品的checkbox的公共方法
                    _self.isCheck = function(){
                        return  _self.shopCartMainId.find('input.checkData');
                    };
                    */

                    //获得所有产品的复选框的插件的公共方法
                    _self.checkSkinBtn = function(){
                        return  _self.shopCartMainId.find('div.checkData');
                    };

                    //购物车+号增加商品方法（获取数量和单价）
                    _self.shopCartPlusBtnFn();

                    //购物车-号减少商品方法（获取数量和单价）
                    _self.shopCartCutBtnFn();

                    //购物车输入value增加、减少商品方法（获取数量和单价）
                    _self.shopCartValueFn();

                    /* 作废，替换成新的复选框插件
                    //选择商品的checkbox事件
                    _self.eventCheckboxGoodsFn();
                    */

                    // 复选框插件
                    _self.eventCheckSkin();

                    // 全选按钮事件
                    _self.eventAllCheckBtn();

                    // 删除商品按钮事件
                    _self.eventDelGoodsBtn();

                    // 删除选中的商品
                    _self.delCheckGoodsFn();



                    /*   作废，替换成插件
                    //初始checked全选
                    _self.isCheck().attr('checked', true);
                    $('input.topAllSelectBtn').attr('checked', true);
                    */

                    // 底部的商品数量和价格
                    _self.selectGoodsNumId.html(_data.total.num);
                    _self.goodsTotalMoneyId.html('￥'+_data.total.totalMoney);
                });

            } else{
                log(_data.error.msg)
            }
        })
    },

    //生成购物车产品列表
    createDom: function(_d, callback){
        var _self = this;
        _self.shopCartMainId.html(cartTplFn(_d));
        callback();
    },

    //购物车+号增加商品方法（获取数量和单价）
    shopCartPlusBtnFn: function(){
        var _self = this;
        var shopCartPlusBtn = _self.shopCartMainId.find('.shopCartPlusBtn');

        shopCartPlusBtn.on('click', function(){
        var _o = _self.GetGoodsInfoFn($(this));
        var plus_this =  $(this);
        //防止快速点击 +号
        plus_this.attr('disabled','disabled');

        //执行从后端获取计算好的数量和小计方法，将数量、小计、单价传入
        _self.cartNumSubtotal(_o.num, _o.unit, _o.subtotal, APILIST.cart, plus_this);

            /*
            var _this = $(this);
            var goodsItem = _this.parents('.goods_item');
            var checkBox = goodsItem.find('input.checkData');
            var subtotal = goodsItem.find('li.subtotal');

            //获取数量和单价
            var num = checkBox.attr('data-goodsNum');
            var unit = checkBox.attr('data-goodsUnit');

            //执行从后端获取计算好的数量和小计方法，将数量、小计、单价传入
            _self.cartNumSubtotal(num, unit, subtotal)
            */

        })
    },

    //购物车-号减少商品方法（获取数量和单价）
    shopCartCutBtnFn: function(){
        var _self = this;
        var shopCartCutBtn = _self.shopCartMainId.find('.shopCartCutBtn');
        shopCartCutBtn.on('click', function(){
            var _o = _self.GetGoodsInfoFn($(this));
            var cut_this = $(this);
            cut_this.attr('disabled', 'disabled');

            // 商品数量大于1执行
            if(_o.num > 1){
                //执行从后端获取计算好的数量和小计方法，将数量、小计、单价传入
                _self.cartNumSubtotal(_o.num, _o.unit, _o.subtotal, APILIST.cart_reduce, cut_this);
            }
        })
    },

    //购物车输入value值增加或减少方法（获取数量和单价）
    shopCartValueFn: function(){
        var _self = this;
        var numVal = _self.shopCartMainId.find('.numVal');
        numVal.on('blur', function(){
            var _o = _self.GetGoodsInfoFn($(this));
            var value_this = $(this);
            _o.num = value_this.val();

            if(_o.num <= 1 || isNaN(_o.num) || _o.num == ''){
                _o.num = 1;
                //value_this.val(1);
            }
            value_this.attr('disabled', 'disabled');

            //执行从后端获取计算好的数量和小计方法，将数量、小计、单价传入
            _self.cartNumSubtotal(_o.num, _o.unit, _o.subtotal, APILIST.enterGoods, value_this)

        })
    },

    //购物车+、-号、value公共方法，获取数量和单价的封装
    GetGoodsInfoFn: function(_this){
        var _self = this;
        var goodsItem = _this.parents('.goods_item');
        var checkBox = goodsItem.find('div.checkData');

        //获取数量、单价和小计的DOM节点
        var num = checkBox.attr('data-goodsNum');
        var unit = checkBox.attr('data-goodsUnit');
        var subtotal = goodsItem.find('li.subtotal');

        //将数量、单价和小计放入对象中
        var _obj = {};
        _obj['num'] = num;
        _obj['unit'] = unit;
        _obj['subtotal'] = subtotal;

        return _obj
    },

    //点击+、-号、value款输入值，从后端获取计算好的数量和小计，公共方法
    cartNumSubtotal: function(n, u, s, url, btn){
        var _self = this;
        var _temp = '[{"num":'+ n +',"price":'+ u +'}]';

        cartFnJsonp( url, _temp, function(_d){
            s.html('￥'+ _d.subtotal);
            var goodsItem = s.parents('.goods_item');
            //更新checkbox中的商品数量属性
            goodsItem
                .find('.checkData')
                .attr('data-goodsNum', _d.num);
            //更新商品数量的value值
            goodsItem
                .find('.numVal')
                .attr('value', _d.num);

            // 获取后台计算的所有checkbox选中的商品的总数和总价，公共方法
            _self.allNumTotalMoneyFn();

            //如果商品数量小于等于1，-号按钮添加变为灰色和不可点击的gray样式
            if(_d.num <= 1){
                goodsItem
                    .find('.shopCartCutBtn')
                    .addClass('gray');
            }else if(_d.num > 1){
                goodsItem
                    .find('.shopCartCutBtn')
                    .removeClass('gray');
            }

            //去除+-号上的disabled属性
            btn.removeAttr('disabled');
        });
    },

    /* 作废，替换成插件
    //选择商品的checkbox事件
    eventCheckboxGoodsFn: function(){
        var _self = this;
        _self.isCheck().on('click', function(){
            _self.allNumTotalMoneyFn();
            _self.updateCheckAllSelectState();
        })
    },
    */

    // 统计“所有商品中，哪些商品处于被选中的状态”
    isCheckBoxGoodsInfo: function(_chk){
        var _self = this;
        var _tempArr = [];
        for(var i=0; i<_chk.length; i++){
            //判断是否选中，如果是选中
            if(_chk.eq(i).attr('data-is') == 1){
                var _temp = {};
                _temp['price'] = _chk.eq(i).attr('data-goodsUnit');
                _temp['num'] = _chk.eq(i).attr('data-goodsNum');
                _tempArr.push(_temp);
            }
        }
            //判断数组中是否有数据，如果没有就将值设为0
            if(_tempArr.length == 0){
                var _temp = {};
                _temp['price'] = 0;
                _temp['num'] = 0;
                _tempArr.push(_temp);
            }

        return _tempArr;
    },

    // 获取后台计算的所有checkbox选中的商品的总数和总价，公共方法
    allNumTotalMoneyFn: function(){
        var _self = this;
        var _data = _self.isCheckBoxGoodsInfo(_self.checkSkinBtn());

        goodsCheckFnJsonp(APILIST.goodsCheck, JSON.stringify(_data), function(_d){
            _self.selectGoodsNumId.html(_d.num);
            _self.goodsTotalMoneyId.html('￥'+_d.total);
        })
    },

    // 更新全选按钮的状态
    updateCheckAllSelectState: function(){
        var _self = this;
        var _topAllSelectBtn = $('input.topAllSelectBtn');
        var _checkLength = _self.checkSkinBtn().length;
        //判断商品数量是否小于等于0，如果是就取消全选并执行商品没有了方法
        if(_checkLength <= 0){
            // 购物车中已经没有商品啦
            _topAllSelectBtn.removeAttr('checked');
            _self.cartEmpty();
        }
        else
        {
            for(var i=0; i<_checkLength; i++){
                if(_self.checkSkinBtn().eq(i).attr('data-is') == 0){
                    _topAllSelectBtn.removeAttr('checked');
                    break;
                }
                _topAllSelectBtn.attr('checked', true);

            }
        }
    },

    // 全选按钮事件
    eventAllCheckBtn: function(){
        var _self = this;
        var _topAllSelectBtn = $('input.topAllSelectBtn');
        var _check = _self.checkSkinBtn();
        _topAllSelectBtn.on('click', function(){
            var _is = $(this).is(':checked');
            if(_is == false){
                //全选按钮未选中
                _topAllSelectBtn.removeAttr('checked');
                _check.attr('data-is', 0);
                _check.children('img').hide();
            }
            else
            {
                //全选按钮已选中
                _topAllSelectBtn.attr('checked', true);
                _check.attr('data-is', 1);
                _check.children('img').show();
            }

            // 获取后台计算的所有checkbox选中的商品的总数和总价，公共方法
            _self.allNumTotalMoneyFn();
        })
    },

    // 删除商品按钮事件
    eventDelGoodsBtn: function(){
        var _self = this;
        var _delBtn = _self.shopCartMainId.find('li.delBtn');
        _delBtn.on('click', function(){
            var goodsItem = $(this).parents('div.goods_item');
            goodsItem.prev().remove();
            goodsItem.remove();

            // 获取后台计算的所有checkbox选中的商品的总数和总价，公共方法
            _self.allNumTotalMoneyFn();

            // 更新全选按钮的状态
            _self.updateCheckAllSelectState();


        })

    },

    // 删除选中的商品
    delCheckGoodsFn: function(){
        var _self = this;
        var delCheckGoods = $('span.del_goods');
        var _check = _self.checkSkinBtn();
        delCheckGoods.on('click', function(){
            for(var i=0; i<_check.length; i++){
                // 判断checked是否为勾选状态
                if(_check.eq(i).attr('data-is') == 1){
                    _check.eq(i).parents('.goods_item').prev().remove();
                    _check.eq(i).parents('.goods_item').remove()
                }
            }

            // 获取后台计算的所有checkbox选中的商品的总数和总价，公共方法
            _self.allNumTotalMoneyFn();

            // 更新全选按钮的状态
            _self.updateCheckAllSelectState();

        });
    },

    // 没有商品啦
    cartEmpty: function(){
        var _self = this;
        _self.shopCartMainId
            .css({
                'text-align': 'center',
                'font-size': 40
            })
            .html('购物中没有商品');
    },

    // 新的复选框皮肤插件
    eventCheckSkin:function(){
        var _self = this;
        _self.checkSkinBtn().checkSkinPlus(function(){
            _self.allNumTotalMoneyFn();
            _self.updateCheckAllSelectState();
        })
    }
};

new ShoppingCartFn({
    shopCartMainId: $('#shopCartMainId'),
    selectGoodsNumId: $('#selectGoodsNumId'),
    goodsTotalMoneyId: $('#goodsTotalMoneyId'),
    allGoodsId: $('#allGoodsId')
});
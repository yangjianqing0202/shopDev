/*************
 日期：2017/10/24
 作者：杨健青
 说明：购物车-产品列表-tpl
 */

function cartTplFn(_d){
    var _html = '';
    for(var i=0; i<_d.cartList.length; i++){
    _html +='<div class="goods_line"></div>';
    _html +='<div class="goods_item">';
        _html += '<ul>';
            /*
            _html += '<input type="checkbox" class="chek_input checkData" data-goodsNum='
                +_d.cartList[i].num +' data-goodsUnit='
                +_d.cartList[i].unit+' />';
            */
            _html += '<div data-goodsNum='+ _d.cartList[i].num
                +' data-goodsUnit='+ _d.cartList[i].unit
                +' class="chek_input checkData" data-is=1>';
            _html += '<img src="img/widget/checkboxskin.png" />';
            _html += '</div>';
            _html += '<li class="col1">';
                _html += '<img src="'+ _d.cartList[i].goodsimg +'" />';
            _html += '</li>';
            _html += '<li class="col2">'+_d.cartList[i].introduce+'</li>';
            _html += '<li class="col3">￥'+_d.cartList[i].unit+'</li>';
            _html += '<li class="col4">';
                _html += '<div class="quantity_form">';
                    if(_d.cartList[i].num > 1){
                        _html += '<input type="button" value="-" class="sign shopCartCutBtn" />';
                    }else if(_d.cartList[i].num <= 1){
                        _html += '<input type="button" value="-" class="sign gray shopCartCutBtn" />';
                    }
                    _html += '<input type="text" value="'+_d.cartList[i].num+'" class="num_input numVal" />';
                    _html += '<input type="button" value="+" class="sign plus shopCartPlusBtn" />';
                _html += '</div>';
            _html += '</li>';
            _html += '<li class="col5 subtotal">￥'+_d.cartList[i].total+'</li>';
            _html += '<li class="col6 delBtn">删除</li>';
         _html += '</ul>';
    _html += '</div>';
    }
    return _html
}



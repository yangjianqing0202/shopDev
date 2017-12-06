/*************
 日期：2017/10/20
 作者：杨健青
 说明：产品详情页的右侧的产品信息描述
 */

function GetGoodsInfo(_id){
    this.goodsInfoId = _id;
    this.init();
}

GetGoodsInfo.prototype = {
    init: function(){
        var _self = this;
        _self.getData();
    },
    getPidFn:function(){
      return getPid(location.href);
    },
    getData: function(){
        var _self = this;
        getParam(APILIST.param,  _self.getPidFn(), function(_d){
            _self.createDom(_d);
        });

    },
    createDom: function(_d){
        var _self = this;
        var _productInfo = _d.productInfo;
        var _arr = [];
        for(var i= 0, l=_productInfo.length; i<l; i++){
            for(var j in _productInfo[i]){  //循环对象获取数据
                _arr.push (_productInfo[i][j]); // 将获取的数据装入数组
            }
        }
        //去掉多余的数据，从倒数第二个开始，2个
        _arr.splice(-2, 2);

        for(var k=0; k<_arr.length; k++){
            $('<p/>', {})
                .appendTo(_self.goodsInfoId)
                .html(_arr[k])
        }
        _self.goodsInfoId.children('p').eq(0).css({
            'fontSize':30,
            'color':"#000"
        })
    }

};

new GetGoodsInfo($('#goodsInfoId'));
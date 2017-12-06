/*************
 日期：2017/10/19
 作者：杨健青
 说明：产品详情页-配送地址切换
 */

function AddressMenuFn(_config){
    for(var i in _config){
        this[i] = _config[i]
    }
    this.init()
}

AddressMenuFn.prototype = {
    init: function(){
        var _self = this;
        _self.addressTitleEvent();
        _self.getData();

        // 重新选择省市区的方法
        _self.provinceTabEvent();
        _self.cityTabEvent();
        _self.areaTabEvent();

    },
    // 地址列表显示隐藏
    addressTitleEvent: function(){
        var _self = this;
        _self.addressTitleId.on('click', function(){
           if(_self.isShow == 0){
               _self.addressListId.hide();
               _self.isShow = 1;
           }else{
               _self.addressListId.show();
               _self.isShow = 0;
           }
        })
    },
    getData: function(){
        var _self = this;
        //获取省份的数据
        ajaxJsonpFn(APILIST.province, 'get', function(_data){
            _self.createDom(_data.province, _self.provinceId);
            _self.provinceEvent();
        });
        ajaxJsonpFn(APILIST.city, 'get', function(_data){
            _self.createDom(_data.city, _self.cityId);
            _self.cityEvent();
        });
        ajaxJsonpFn(APILIST.area, 'get', function(_data){
            _self.createDom(_data.area, _self.areaId);
            _self.areaEvent();
        });
    },
    createDom: function(_data, _wrap){
        var _self = this;
        for(var i= 0,j= _data.length; i<j; i++){
            $('<p/>', {})
                .appendTo(_wrap)
                .html(_data[i].name)
        }

    },
    // 操作省市区的数组
    addressTitle: function(n){
        var _self = this;
        _self.arr.push(n);
        _self.addressUlId.html('');
        for(var i=0; i<_self.arr.length; i++){
            $('<li/>', {})
                .appendTo(_self.addressUlId)
                .html(_self.arr[i])
        }
    },
    //选择省份
    provinceEvent: function(){
        var _self = this;
        var _p = _self.provinceId.children('p');
        _p.on('click', function(){
            var html = $(this).html();

            // 把省份存入数组
            _self.addressTitle(html);

            _self.provinceTab.removeClass('yellow').html(html);
            _self.cityTab.show().addClass('yellow').html('请选择市');

            _self.provinceId.hide();
            _self.cityId.show();
        })
    },
    //选择城市
    cityEvent: function(){
        var _self = this;
        var _p = _self.cityId.children('p');
        _p.on('click', function(){
            var html = $(this).html();

            // 把城市存入数组
            _self.addressTitle(html);

            _self.cityTab.removeClass('yellow').html(html);
            _self.areaTab.show().addClass('yellow').html('请选择区');

            _self.cityId.hide();
            _self.areaId.show();
        })
    },
    //选择区县
    areaEvent: function(){
        var _self = this;
        var _p = _self.areaId.children('p');
        _p.on('click', function(){
            var html = $(this).html();

            // 把区县存入数组
            _self.addressTitle(html);

            _self.areaTab.html(html);
            _self.addressListId.hide();
            _self.isShow = 1;

            // 当你从区开始重新选择地址时，
            // 要删除 this.arr 数组的后一项
            // 放在这里是因为，再次选择地址时，打开直接就是“区”
            _self.arr.splice(2,1)
        })
    },
    // 当点击tab省的时候，市、区的tab和列表，要隐藏
    provinceTabEvent: function(){
        var _self = this;
        _self.provinceTab.on('click', function(){
            _self.provinceTab.show().addClass('yellow');
            _self.cityTab.hide().removeClass('yellow');
            _self.areaTab.hide().removeClass('yellow');

            _self.provinceId.show();
            _self.cityId.hide();
            _self.areaId.hide();

            // 当你从省开始重新选择地址时，
            // 要清空 this.arr 数组
            _self.arr.splice(0,3);
        });
    },
    // 当点击tab市的时候，区的tab和省、区的列表，要隐藏
    cityTabEvent: function(){
        var _self = this;
        _self.cityTab.on('click', function(){
            _self.cityTab.show().addClass('yellow');
            _self.areaTab.hide().removeClass('yellow');
            _self.provinceTab.removeClass('yellow');

            _self.cityId.show();
            _self.provinceId.hide();
            _self.areaId.hide();

            // 当你从省开始重新选择地址时，
            // 要清空 this.arr 数组
            _self.arr.splice(1,2);
        });
    },
    // 当点击tab区的时候，省、市的列表，要隐藏
    areaTabEvent:function(){
        var _self = this;
    },

};

new AddressMenuFn({
    addressTitleId: $('#addressTitleId'),
    addressListId: $('#addressListId'),
    isShow: 0,

    // 省市区列表的id
    provinceId: $('#provinceId'),
    cityId : $('#cityId'),
    areaId : $('#areaId'),

    //  省市区三个tab按钮
    provinceTab: $('#provinceTab'),
    cityTab: $('#cityTab'),
    areaTab: $('#areaTab'),

    // 保存三个tab菜单的选择结果
    arr : [],

    addressUlId: $('#addressUlId'),


});
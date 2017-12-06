/*************
 日期：2017/09/29
 作者：杨健青
 说明：整个项目的资源配置
 */

// 首页header搜索框的默认文字
var indexHeaderSearchVal = '战狼2';

// 首页轮播图图片地址
var indexSliderImgUrl = {
    urls:[
        'img/temp/slider_1.jpg',
        'img/temp/slider_2.jpg',
        'img/temp/slider_3.jpg',
        'img/temp/slider_4.jpg'
    ]
};

// 首页顶部-栏目导航条的临时假数据
var COLUMNNAV_DATA = {
    url: 'js/data/tempData.json'
};

// 首页左侧的纵向导航条
var SITEURL = 'http://www.webfeel.org/zuoye/php/';
var APILIST = {
    oneapi : SITEURL + 'oneapi.php',
    subNavApi : SITEURL + 'subNavApi.php',
    columnNavApi : SITEURL +'titleNavData.php',
    productBlock : SITEURL + 'productBlock.php',
    smallImgData : SITEURL + 'smallImgData.php',

    // 根据不同产品id，获取不同产品的信息
    param : SITEURL + 'param.php',

    // 省市县，三级菜单的json--产品详情页
    province : SITEURL + 'province.php',
    city : SITEURL + 'city.php',
    area : SITEURL + 'area.php',

    // 购物车中的商品信息
    cartUlLi : SITEURL + 'cartUlLi.php',

    // 计算某种商品的总价格：单价 * 数量
    // 返回增加新的商品数量、商品单项总价
    cart : SITEURL + 'cart.php',
    // 减少商品
    cart_reduce : SITEURL + 'cart_reduce.php',
    // 输入商品数量
    enterGoods : SITEURL + 'enterGoods.php',

    // 单个商品复选按钮的接口，计算所有选中的商品的总数和总价
    goodsCheck : SITEURL + 'goodsCheck.php'

};




// 本地地址：
var LocalHref = 'http://127.0.0.1:1212/';
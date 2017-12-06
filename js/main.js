/*************
 日期：2017/09/29
 作者：杨健青
 说明：项目入口
 */

;
$(function(){

    //首页左侧的纵向导航条
    new IndexSubNav($('#subNav'));

    //首页滚动广告图
    var _obj = {
        toLeftBtn: $('#toLeftBtn'), //轮播图的左按钮
        toRightBtn: $('#toRightBtn'),   //轮播图的右按钮
        sliderImgId: $('#sliderImgId'), //轮播图的ul
        pointerUl: $('#pointerUi'), //  小圆点的ul
        sliderPointId: $('#sliderPointId'),  //小圆点的div父容器
        sliderPointBg: $('#sliderPointBg')  //小圆点的背景
    };
    new IndexSliderFn(_obj);

    //  首页享生活
    new ProductBlockFn($('#productUlId'));




});
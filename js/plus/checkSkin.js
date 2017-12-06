/*************
 日期：2017/10/26
 作者：杨健青
 说明：购物车-单选按钮-皮肤
 */
;
(function($, win, undefined){
    $.fn.checkSkinPlus = function(callback){
        $(this).on('click', function(){
            var _this = $(this);
            var _isCheck = _this.attr('data-is');
            //判断是否选中，0未选中，1选中
            if(_isCheck == 1){
                //将图片隐藏，表示变成未选中状态
                _this.children('img').hide();
                _this.attr('data-is', 0);
            }
            else
            {
                //将图片显示，表示变成选中状态
                _this.children('img').show();
                _this.attr('data-is', 1);
            }
            callback()
        });
    }
})(jQuery, window)
;
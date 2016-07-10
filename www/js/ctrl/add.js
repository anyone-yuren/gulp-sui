var template = require('../../build/template');
var loadImg = require('../common/uploadImage');
module.exports = function() { 
	return function addPageEvent() {
			var $page = this;
			$page.find('#form').html(template('popup-add',{}));
			console.log(loadImg);
			var imgload = new loadImg({
				max:3,//最大上传
				handler:$page.find('#file'),//触发获取图片按钮
				showImgContext:$page.find('.card-content-inner .row'),//预览图显示位置
				uploadUrl:'data/success.json',//上传地址
				hasShowIndicator:true,//是否显示上传加载器
				upLoadHandler:$page.find('.upload')//上传按钮
			});
			$page.find('.data-input').calendar();
		}
}(window)

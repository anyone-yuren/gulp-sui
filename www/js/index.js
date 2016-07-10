var template = require('../build/template');
require('../../libs/zepto.min');
require('../../libs/sm.min');
var ctrl = require('./common/cntroller');
$(function(){
	var flat = false;
	$('#index').append(template('panel-left',{}));
	$(document).on('pageInit',function(e,id,$page) {
		//将公共部分载入
		if(id == 'home') {
			require('./ctrl/home').call($page);
			flat = false;
		}
		if(id == 'record'){
			require('./ctrl/record').call($page);
			flat = false;
//			ctrl.tabTaggle(false);
		}
		if(id=='add'){
			require('./ctrl/add').call($page);
		}
		if(id == "info") {
			require('./ctrl/info').call($page);
		}
	}).on('pageAnimationStart',function(e,id,$page) {
		if(id == "info"){
			ctrl.tabTaggle(true);
		};
		
		if(id == "record") {
			ctrl.tabTaggle(false);
		}
	});
	
	/*初始化tab点击事件*/
	$(document).find('.bar-tab').off().on('click','.tab-item',function() {
		var _this = $(this);
		if(flat) return;
		if(_this.hasClass('active'))return;
		flat = true;
		_this.addClass('active').siblings('a').removeClass('active');
		var routerUrl = _this.data('url');
		if(routerUrl=='index'){
			$.router.back();
			return;
		}
		$.router.loadPage(routerUrl);
	});
	 
	$.init();
})

var ctrl = require('../common/cntroller');
var template = require('../../build/template');
require('../../../libs/zepto.cookie.min')
module.exports = function() {
	return function recordPageEvent() {
		var $page = this;
		ctrl.doAjax('../data/record-list.json',function(ret) {
			$page.find('.list-block').html(template('record-list',ret));
			thisbindEvent();
		});
		
		function thisbindEvent () {
			$page.find('.list-block').on('click','li',function() {
				$.fn.cookie('listid',11);
				$.router.loadPage('./info.html');
			});
		}
	}
}(window)

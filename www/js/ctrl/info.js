var template = require('../../build/template');
var ctrl = require('../common/cntroller');
require('../../../libs/zepto.cookie.min');
module.exports = function() {
	return function addPageEvent() {
			var $page = this;
			ctrl.doAjax('../data/info.json',function(ret) {
				$page.find('#form').html(template('info',ret));
				console.log($.fn.cookie('listid'))
			});
	};
}(window)

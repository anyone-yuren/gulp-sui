var ctrl = require('../common/cntroller');
var template = require('../../build/template');
module.exports = function() {
	function homePageEvent() {
		var $page = this;
		var data = {num:'39234X2311120',username:'大雨',year:'2015-12-01',country:'中国',tel:'18301293123',mail:'1003473088@qq.com'};
		$page.html(template('index-tpl',data));
		console.log(ctrl);
	}
	return homePageEvent;
}(window) 

module.exports = function() {
	var CONTROLLER = {};
	CONTROLLER.doAjax = function(url,callback,data) {
		$.ajax({
			type:"get",
			url:url,
			data:data||{},
			success:function(ret) {
				callback(ret);
			}
		});
	};
	
	CONTROLLER.tabTaggle = function(flag) {
		if(flag){
			$(document).find('.bar-tab').animate({
				bottom:-2.5+'rem'
			},200)
		}else{
			$(document).find('.bar-tab').animate({
				bottom:0
			},200)
		}
	}
	return CONTROLLER;
}(window)

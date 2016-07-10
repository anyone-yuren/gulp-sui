var lrz = require('lrz');
	var MAX_IMG = 3;
	var ImageUpload = function(options,callback) {
		var defaults = {
			max:MAX_IMG,//最大预览张数
			handler:'',//触发点
			hasShowIndicator:false,//是否显示加载提示,
			showImgContext:'',//预览图显示的位置
			uploadUrl:''//上传地址
		};
		this.uploadlist = '';
		this.index = 0;
		this.options = $.extend({},defaults, options);
		this.init(this.uploadEvent());
		
	}
	ImageUpload.prototype = {
		constructor:ImageUpload,
		init:function(callback) {
			var _this = this;
			_this.options.handler.on('change',function() {
				if(_this.options.hasShowIndicator)
				$.showIndicator();
				//当大于最大限度值的时候，让点击不可点击
				lrz(this.files[0])
		        .then(function (rst) {
		            // 处理成功会执行
		            console.log(rst);
		            //添加一张图片到集合中
		           	_this.uploadlist+=rst.base64+',';
		            _this._createImgDom(rst,function(dom) {
		            	_this.index++;
		            	if(_this.index>=_this.options.max){
							_this.options.handler.parent('.col-33').css('display','none');
						}
		            	_this.options.showImgContext.find('.static').before(dom);
			            if(_this.options.hasShowIndicator);
			            $.hideIndicator();
		            });
		        })
		        .catch(function (err) {
		            // 处理失败会执行
		            if(_this.options.hasShowIndicator);
		            $.hideIndicator();
		        })
		        .always(function () {
		            // 不管是成功失败，都会执行
		            $.hideIndicator();
		        });
			})
		},
		/**
		 * 根据image对象创建img元素
		 * @param {Object} imgObj img对象
		 */
		_createImgDom:function(imgObj,callback) {
			var imgdom = '<div class="col-33"><img width="100%" src="'+imgObj.base64+'"/>';
			return callback(imgdom);
		},
		/**
		 * 上传事件
		 */ 
		uploadEvent:function() {
			var _this = this;
			this.options.upLoadHandler.on('click',function() {
				if(!_this.uploadlist.length){
					$.toast('请选择图片');
				}else{
				 $.showPreloader('上传中...');
					$.ajax({
						type:"get",
						url:_this.options.uploadUrl,
						data:{
							imgData:_this.uploadlist
						},
						success:function(ret) {
							$.hidePreloader();
							console.log(ret)
						},
						error:function() {
							$.hidePreloader();
							$.toast('上传失败')
						}
					});
				}
			});
		}
	}
module.exports = ImageUpload;

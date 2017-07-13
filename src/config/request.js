import {
	ajax
} from 'util/';

/**
 * 导出所有模块需要用到接口
 * 一级属性：模块名
 * 一级属性中的方法：当前模块需要用的接口
 * @type {Object}
 */
module.exports = {
	common:{
		postNormalAjax(data,fn,opts){
	        		ajax.call(this,'post','/ajax/api',data,fn, opts);
	      	},
	      	postFormAjax(data,fn,opts){	
	      			console.log('this2',this);
	      		opts = Object.assign({},opts,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
	        		ajax.call(this,'post','/ajax/api',data,fn,opts);
	      	},
	},
	//用户模块
	login: {
		/**
		 * 登录
		 * @param {object} data 参数
		 * @param {string} data.username 登陆用户名
		 * @param {string} data.password 登陆密码
		 * @param {function} fn 成功回调
		 */
		login(data, fn, opts) {
			opts = Object.assign({},opts,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
			ajax.call(this, 'post', '/ajax_login', data,fn, opts);
		},
		logout(fn,opts){
			opts = Object.assign({},opts,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
			ajax.call(this, 'post', '/ajax_logout',null,fn, opts);
		}
	}
};

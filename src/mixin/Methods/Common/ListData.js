import {
    common as CommonApi
} from 'config/request.js';

module.exports = {
	

	/**
	 * 获取数据列表通用事件
	 * @Author   liang
	 * @DateTime 2017-05-10
	 * @return   {[type]}   [description]
	 */
	

	/**
	 * 改变分页页数通用事件
	 * @Author   liang
	 * @DateTime 2017-05-10
	 * @param    {string}   page [当前页页数]
	 * @return   null
	 */
	onChangeCurrentPage(page) {
		this.pagination.current_page =Number(page);	
		this.getCurrentPageTable();	
	},
	onChangePageSize(page_size){
		this.pagination.page_size = Number(page_size);
		this.getCurrentPageTable();	
	},
	getCurrentPageTable(kwargs={}){
		var params = {
			func_name: this.page_func_name,
			args: [this.pagination.current_page, this.pagination.page_size],
			kwargs
		};
		CommonApi.postFormAjax.call(this,params, (data) => {
			console.log('6666',data);
		            this.tableData= data[0];
		            this.pagination.total = data[1];
		});	
	},

	/**
	 * 点击删除按钮事件
	 * @param  {object} opts 返回参数
	 */
	onDelete(opts) {
		console.log('on-delete');
		console.log(opts);


		if (opts.index >= 0) {
			var batch = false;
			var id = opts.data.id;
			console.log(id);
			this.$$removeUser({id: id},(res)=>{
				this.list.splice(opts.index, 1);
			});
		} else {
			var batch = true;
			var id = opts.batch_ids.join(',');
			console.log(id);
			this.$$batchRemoveUser({ids:id},(res)=>{
					this.list = this.list.filter((item) => {
					return opts.batch_ids.indexOf(item.id) === -1;
				});
			});
		}
	},

	onSelectionChange(ids, datas) {
		console.log('on-selection-change');
	},

	onSelectionChangeObj({
		ids,
		datas
	}) {
		console.log('on-selection-change-obj');
	},

	getKwargs(){
		var val = {}
		var datetime = [];
		console.log('keywords',this.keywords);
        for (var key in this.keywords){
        	var	keyword = this.keywords[key];
           		switch(keyword.type){
           			case 'list' : 
           					if(keyword.value){
           						val[keyword.name] = keyword.value;
           					};
           					break;
           			case 'int' :
           					var value = parseInt(keyword.value);
           					if(value || value === 0){
           						val[keyword.name] = keyword.value;
           					};
           				break; 
           			case 'float' :
           					var value = parseFloat(keyword.value);
           					if(value || value === 0){
           						val[keyword.name] = keyword.value;
           					};
           				break;
           			case  'datetime' :
           					var value =keyword.value;
           					if(value.length<2||!value){
           						break;
           					};
           					val[keyword.name]  =  this.dateTime_format(value);
           				break;
           };
        };      	
        return val
	}
        
};

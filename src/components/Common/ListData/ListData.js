

module.exports = {
    name: 'list-data',
    data() {
        return {
            batch_flag: true, //符合批量删除为true,否则为false
            batch_datas: [],
            batch_ids: [],
            submit_data: this.DefaultValue || {},
            pickerOptions2: {
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
            daterange_value:'',
            current_page: 1,
            topform: this.TopForm,
            search_input: this.SearchInput,
            ref: this.Ref,
            list: this.List, //列表数组
            fields: this.FieldList, //字段数组
            selection: this.Selection, //是否需要批量选择
            btn_info: this.BtnInfo,

            pagination: this.Pagination ||{},
        }
    },
    methods: {
        onAddDialog(){
          this.$emit('onAddDialog');
        },

        onClickTopBtns(opts){
          // var _this = this;
          // this.$emit('onClickTopFormBtns',{_this,fn_type});
          switch(opts.fn_type) {
                case 'add':
                       this.onAddDialog();
                       break;
                case 'delete':
                        this.onDelete(true);
                        break;
                case 'search':
                    var page = this.current_page;
                    var filter = this.topform.search_data.title
                    this.onSearchKey(page,filter);
                    break;
                case 'submit':
                    break;
                case 'invertselect':
                      this.toggleSelection(this.list);
                    break;
                case 'update':
                      this.onUpdateBtn(opts.path);
                case 'add_row':
                      this.onAddRow(this.list);
                case 'edit_ruler':
                      this.onEditRuler(this.list);
            }
        },
        onAddRow(list){
            list.push(this.rowObj);
        },
        onAddInput(field){
            field.list.push(field.dynamicInputGroup);
        },

        onRemoveInput(list,group){
            var index =list.indexOf(group);
            if (index !== -1) {
            list.splice(index, 1);
            }
        },
        onUpdateBtn(updatepath){
              this.$router.push({
                    path: updatepath
        });
        },
        toggleSelection(rows) {
              if (rows) {
                rows.forEach(row => {
                  this.$refs[this.ref].toggleRowSelection(row);
                });
              } else {
                this.$refs[this.ref].clearSelection();
              }
        },
        /**
         * 表格列表触发CheckBox的事件
         * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
         */
        onSelectionChange(val) {
            this.batch_datas = val;

            this.batch_ids = [];
            if (val.length) {
                this.batch_flag = false;
                for (var i = 0; i < val.length; i++) {
                    this.batch_ids.push(val[i].id);
                }
            } else {
                this.batch_flag = true;
            }

            /**
             * 改变CheckBox事件，第一个参数是ID数组，第二个参数二维数组，每个数组是选中的对象
             */
            this.$emit('onSelectionChange', this.batch_ids, this.batch_datas);
            this.$emit('onSelectionChangeObj', {
                ids: this.batch_ids,
                datas: this.batch_datas
            });
        },



        /**
         * 删除事件
         * @param  {object || boolean} user  当前信息对象或者为布尔值,为布尔值时，代表是批量删除
         * @param  {number} index 当前列表索引
         */
        onDelete(data, index) {
            var opts = {};
            if (data === true) {
                opts.batch_ids = this.batch_ids;
                opts.batch_datas = this.batch_datas;
            } else {
                opts.data = data;
                opts.index = index;
            }

            /**
             * 删除事件，参数为对象
             * 分两种情况，一种是单个删除，一种是批量删除，属性分别如下
             * 1：单个删除
             *     opts.data 当前要删除的数据对象
             *     opts.index 当前要删除的索引
             *     opts.list 当前列表数组
             * 2：批量删除
             *     opts.batch_ids 一维数组，需要删除的ID数组
             *     opts.batch_datas 二维数组，每个元素为对象(需要删除的数据对象)
             */
            this.$emit('onDelete', opts);
        },

        /**
         * 获取行信息事件
         * @param  {object} row   当前行对象
         * @param  {number} index 当前行索引
         * @param  {array} list  当前列表数组
         */
        onGetInfo(row, index, list, type) {
            this.$emit('onGetInfo', {
                row,
                index,
                list,
                type
            });
        },

          onEditDialog(data,index,list){
              this.$emit('onEditDialog',{data});
          },

        /**
         * 内置删除事件执行成功后，更新列表方法
         * 分两种情况，一种是批量删除，一种是单个删除
         * 1：单个删除
         *     row 当前需要删除行的索引
         * 2：批量删除
         *     row 一维数组，需要删除的ID数组
         */
        onUpdateList(row) {
            if (!Array.isArray(row)) {
                this.list.splice(row, 1);
            } else {
                this.list = this.list.filter(function(item, idx) {
                    return row.indexOf(item.id) === -1;
                });
            }
        },

        onChangeCurrentPage(page) {
            this.current_page =page;
            // var filter = this.search_data.title;
            this.$emit('onChangeCurrentPage',page);
        },
        onChangePageSize(page_size) {
            this.$emit('onChangePageSize', page_size);
        },

        onSearchKey(page,filter){
          this.$emit('onGetDataList',{page,filter})
        }
    },
    computed:{
      rowObj(){
            var fields = this.fields;
            var obj={};
            for(var i = 0; i<fields.length; i++){
                var item = fields[i];
                obj[item.key] = '';
            }
            return obj;
      }
    },
    mounted() {
    },

    /**
     * 接收参数
     * @type {Object}
     */
    props: {
        Ref: {
          type:String
        },
        TopForm: {
          type:Object,
          default: function(){
                return {
                  search_data:{
                    title:''
                  }
                };
              }
        },
        SearchInput:{
          type: Boolean,
          default: false
        },
        List: {
            type: Array,
            required: true
        },
        FieldList: {
            type: Array,
            required: true
        },
        BtnInfo: {
            type: Object,
            default: function(){
              return  {};
            }
        },
        Selection: {
            type: Boolean,
            default: false
        },
        Pagination: {
            type: Object,
            default: function(){
              return  {};
            }
        }
    },


    /**
     * 监控参数
     * @type {Object}
     */
    watch: {

        List: {
             deep: true,
             handler: function(val, oldVal) {
                this.list = val;
             }
        },
        FieldList(v) {
            if (v) {
                this.fields = v;
            }
        },
        Selection(v) {
            this.selection = v;
        },
        BtnInfo(v) {
            this.btn_info = v;
        },
        Pagination(v) {
            this.pagination = v;
        }
    }
}

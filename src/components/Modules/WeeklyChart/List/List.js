import {
    ListData,
    FormDialog
} from 'common/';

module.exports = {
    name: 'user-list',
    components: {
        ListData,
        FormDialog
    },
    data(){
        return {
            topform:{
                list: [
                    { type:'button', text:'Add ruler',fn_type:'add'}
                ]
            },
            list: [],
            fields: [
            {
                key: 'name',
                label: 'source',
            },
            {
                key: 'age',
                label: 'MT4 symbol'
            },
            {
                key: 'sex',
                label: 'STD symbol',
                formatter: function(item) {
                    // console.log(2,item);
                    return item.sex == 1 ? '男' : '女';
                }
                // filter_list: [{
                //     text: '启用',
                //     value: 1
                // }, {
                //     text: '禁用',
                //     value: 2
                // }],
                // filter_method: function(value, item) {
                //     return item.status == value;
                // },
                // filter_multiple: false,
            },
            {
                key: 'birth',
                label: 'type'
            },
            {
                key: 'addr',
                label: 'Dights'
            },
            {
                key: 'addr',
                label: 'Bid Delta'
            },{
                key: 'addr',
                label: 'Ofr Delta'
            },{
                key: 'addr',
                label: 'Min Spread'
            },{
                key: 'addr',
                label: 'Adjust'
            },{
                key: 'addr',
                label: 'Aggregator'
            },{
                key: 'addr',
                label: 'attributes'
            }
            ],
            btn_info: {
                show: true,
                label: '操作',
                width: 100,
                // delete: false,
                // select: false,

                //配置点击修改按钮时跳转的路径
                //只有传了path才会自动跳转，否则将执行onGetInfo方法
                //path=>路径
                //query_keys=>跳转时需要携带的字段
                // update: {
                //     path: '/User/edit',
                //     // param_keys: ['id', 'status'],
                //     query_keys: ['id', 'status']
                // },

                // list: [{
                //     text: '设置权限',
                //     fn_type: 'access'
                // }, {
                //     text: '修改状态',
                //     fn_type: 'status'
                // }]
            },

            // pagination: {
            //     current_page: 1,
            //     total: 0,
            //     page_size: 12,
            //     page_sizes: [3, 9, 12, 24],
            //     layout: "total, sizes, prev, pager, next, jumper"
            // },


            apis: {
                method: {
                    get_list: '$$selectArticle',
                    delete_data: '$$deleteArticle'
                },
                route: {
                    update_path: '/adv/article/edit'
                }
            },
            //dialog
            dialog: {
                show: false,
            },
            fieldlist: [
                {
                    key: 'birth',
                    type: 'select',
                    value: {
                        default: 'XAUUSDfm',
                        list: [{
                            value: 'XAUUSDfm',
                            text: 'XAUUSDfm'
                        }, {
                            value: 'disabled',
                            text: 'Disabled'
                        }]
                    },
                    // hidden: true,
                    desc: '请选择',
                    label: 'Source'
                },
                {
                    type:'input',
                    key:'name',
                    value:'',
                    label:'MT4 Symbol'
                },{
                    key: 'id',
                    type: 'select',
                    value: {
                        default: 'XAUUSDfm',
                        list: [{
                            value: 'XAUUSDfm',
                            text: 'XAUUSDfm'
                        }, {
                            value: 'disabled',
                            text: 'Disabled'
                        }]
                    },
                    // hidden: true,
                    desc: '请选择',
                    label: 'STD Symbol'
                },
                {
                    type:'input',
                    key:'password',
                    value:'',
                    label:'digits'
                },
                {
                    type:'input',
                    key:'checkpass',
                    value:'',
                    label:'min spread'
                },{
                    key: 'sex',
                    type: 'select',
                    value: {
                        default: 'median',
                        list: [{
                            value: 'median',
                            text: 'median'
                        }, {
                            value: 'disabled',
                            text: 'Disabled'
                        }]
                    },
                    // hidden: true,
                    desc: '请选择',
                    label: 'aggregator'
                }, {
                    type:'input',
                    key:'addr',
                    value:'',
                    label:'adjust'
                },
                {
                    key: 'sex',
                    type: 'select',
                    value: {
                        default: 'raw',
                        list: [{
                            value: 'raw',
                            text: 'raw'
                        }, {
                            value: 'rulesmanager',
                            text: 'RulesManager'
                        }]
                    },
                    desc: '请选择',
                    label: 'Role'
                }
              ],
            default_value: {},
            rules: {
                name:{}
            }
        }
    },
    methods: {
        onAddDialog(){
                this.dialog.show= true;
                this.dialog.title= 'Add quote rule';
                this.fieldlist[0].disabled=false;
              },

        onEditDialog(row) {
            this.dialog.show= true;
            Object.assign(this.default_value,row.data)
             // console.log(11,this.default_value);
            this.dialog.show= true;
            for(var i = 0;i < 3; i++){
              this.fieldlist[i].type='input';
              this.fieldlist[i].disabled=true;
            }
            this.dialog.title = 'Edit quote rule';
        },
        init() {
                var page = 1;
                var filter = ''
                this.onGetDataList({page,filter});
            }
    },
    mounted() {
        this.init();
    },
    '$route' (to, from) {

    }
}

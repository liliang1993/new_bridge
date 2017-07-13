import {
    FormData,
    DragDialog
} from 'common/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'user_list',
    components: {
        FormData,
        DragDialog
    },
        data () {
      return {
         userDialog:{
              show:false,
              isModal: true,
              title:{
                text:'Add user'
              }
        },
        nowTime: '',
        tableData: [],
        pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
        labelWidth:  '150px',  
        default_value: {},
        rules: {
           
            password: [
                                  {required: true, message: '请填写密码', trigger: 'blur'},
                                  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                              ],
            confirm_password: [
                                  {required: true, message: '密码不能为空', trigger: 'blur'},
                                  {
                                    trigger: 'blur',
                                    validator: (rule, value, callback) => {

                                        if (value === '') {
                                            callback(new Error('请再次输入密码'));
                                        } else if (value !==  this.$refs['user-form']. submit_data.password) {
                                                 callback(new Error('两次输入密码不一致!'));
                                            }else{
                                                callback();
                                            }    
                                        }
                                    }
                                ],
              desc:   {required: true, message: this.$t('请填写相关描述'), trigger: 'blur'}
        },
        page_func_name: 'user.page_user'
      }
    },
    computed: {
      tableConfig: {
        get () {
          return {
            table: {
              attr: {
                data: this.tableData,
                maxHeight: '100%',
                defaultSort:{prop: 'std_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'user_id',
                  label:  this.$t('user_id'),
                  minWidth: 180,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'username',
                  label: this.$t('username'),
                  minWidth: 180,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'role',
                  label: this.$t('role'),
                  minWidth: 180,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'status',
                  label: this.$t('status'),
                  width: 100,
                  align: 'center',
                  scopedSlot: 'status'
                }
              },{
                attr: {
                  prop: 'update_time',
                  label: this.$t('update_time'),
                  width: 180,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'create_time',
                  label: this.$t('create_time'),
                  minWidth: 180,
                  align: 'center'
                }
              },{
                attr: {
                  label: this.$t('edit'),
                  minWidth: 180,
                  scopedSlot: 'handler',
                  align: 'center'
                }
              }
            ]
          }
        }
      },
      fieldlist(){
        return  [
                {
                    type:'input',
                    key:'username',
                    label: 'User',
                    // value:''
                },
                {
                  type:'input',
                    key:'password',
                    // value:'',
                    label: 'Password'
                },
                {
                    type:'input',
                    key:'confirm_password',
                    // value:'',
                    label: 'Confirm Password'
                },
                {
                    key: 'role',
                    type: 'select',
                    value: {
                        default: 'Admin',
                        list: [{
                            value: 'Admin',
                            text: 'Admin'
                        }, {
                            value: 'RulesEditor',
                            text: 'RulesEditor'
                        }]
                    },
                    desc: '请选择',
                    label: 'Role'
                },
                {
                    key: 'status',
                    type: 'select',
                    value: {
                        default: 0,
                        list: [{
                            value: 0,
                            text: 'Enabled'
                        }, {
                            value: 1,
                            text: 'Disabled'
                        }]
                    },
                    hidden: true,
                    desc: '请选择',
                    label: 'Status'
                },
                {
                    type:'input',
                    key:'desc',
                    label: 'Description'
                  }
                ]
      }
    },
    methods: {
          onCloseDialog(){
           this.userDialog.show = false;
         },
        onAddUser(){      
                this.userDialog.title.text = this.$t('Add user'); 
                this.userDialog.show = true;  
                this.fieldlist.forEach(item=>{
                    if(item.key == 'username'){
                        item.disabled = false;
                    }else if(item.key == 'status'){
                          item.hidden = true;
                    }
            });
            this.rules = Object.assign({},this.rules,{ username:{required: true, message: '请输入用户名', trigger: 'blur'}});
            this.default_value  = Object.assign({},{
            username:'',
            password:'',
            confirm_password:'',
            role:'Admin',
            status:0,
            desc:''
            });
        },
        onEditUser(row) {
             this.userDialog.show = true;
             this.userDialog.title.text =this.$t('Edit user') ;
             this.rules = Object.assign({},this.rules,{ username:{}});
            this.fieldlist.forEach(item=>{
                  if(item.key == 'username'){
                      item.disabled = true;
                  }else if(item.key == 'status'){
                        item.hidden = false;
                  }
            });
            this.default_value = Object.assign({},this.default_value,row,{password:''});
        },
        onSubmit(data){
            if( this.userDialog.title.text == 'Add user'){
                var params = {
                    func_name: "user.create_user",
                    args: [data.username, data.password, data.role, data.desc ]
                }; 
            }else{
                var params = {
                    func_name: "user.update_user",
                    args: [data.user_id, data.password, data.role, data.status, data.desc ]
                };
            }
            CommonApi.postFormAjax(params,data=>{
                        this.getCurrentPageTable();
                        this.userDialog.show = false;
                });
        },
        init(){
            this.getCurrentPageTable();
            this.nowTime=(new Date()).toString();
        }
    },
    mounted() {
        this.init();
    }
}

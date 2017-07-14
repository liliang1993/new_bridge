import {
    FormData1,
    DragDialog
} from 'common/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'user_list',
    components: {
        FormData1,
        DragDialog
    },
        data () {
      return {
          add_user_dialog:{
                show:false,
                isModal: true,
                title:{
                  text:'Add user'
                }
          },
          edit_user_dialog:{
                show:false,
                // isModal: true,
                title:{
                  text:'Add User'
                }
          },
        default_value :{},
        nowTime: '',
        tableData: [ ] ,
        pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
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
      add_user_fieldlist(){
        return  [
                {
                    type:'input',
                    key:'username',
                    label: 'User',
                    value:''
                },
                {
                  type:'input',
                    key:'password',
                    value:'',
                    label: 'Password'
                },
                {
                    key: 'role',
                    type: 'select',
                    value: {
                        default: 'Admin',
                        list: (()=>{
                              var i,len,roles,role,result;
                              result = [];
                              roles = this.$store.state.global.roles;
                              console.log('roles',roles);
                              for (i = 0 ,len = roles.length; i<len; i++) {
                                       role = roles[i];
                                       result.push({value: role,text:role});
                              }
                                return result;
                        })()
                    },
                    desc: '请选择',
                    label: 'Role'
                },
                {
                  type:'input',
                    key:'lps',
                    value:'',
                    label: 'LPs'
                },
                {
                  type:'input',
                    key:'groups',
                    value:'',
                    label: 'Groups'
                },
                {
                  type:'input',
                    key:'symbols',
                    value:'',
                    label: 'MT4 Symbols'
                },            
                {
                    type:'input',
                    key:'desc',
                    label: 'Description'
                  }
                ]
      },
      edit_user_fieldist(){
          return [
                  {
                    type:'input',
                    key:'username',
                    label: 'User',
                    disabled: true,
                    value:''
                },
                {
                  type:'input',
                    key:'password',
                    value:'',
                    label: 'Password'
                },
                {
                    key: 'role',
                    type: 'select',
                    value: {
                        default: 'Admin',
                        list: (()=>{
                              var i,len,roles,role,result;
                              result = [];
                              roles = this.$store.state.global.roles;
                              for (i = 0 ,len = roles.length; i<len; i++) {
                                       role = roles[i];
                                       result.push({value: role,text:role});
                              }
                              return result;
                        })()
                  },
                  desc: '请选择',
                  label: 'Role'
                },
                   {
                  type:'input',
                    key:'lps',
                    value:'',
                    label: 'LPs'
                },
                 {
                  type:'input',
                    key:'groups',
                    value:'',
                    label: 'Groups'
                },
                {
                  type:'input',
                    key:'symbols',
                    value:'',
                    label: 'MT4 Symbols'
                }, 
                {
                    key: 'status',
                    type: 'select',
                    value: {
                        default:  0,
                        list: [
                          {value: 0, text : 'Enabled'},
                         {value: 1, text : 'Disabled'}
                        ]
                   },
                   desc: '请选择',
                    label: 'status'
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
          onCloseDialog(type){
           this[type].show = false;
         },
        onAddUser(){      
                this.add_user_dialog.show = true;  
        },

        onEditUser(row) {
            this.edit_user_dialog.show = true; 
            this.$nextTick(() => {
                  Object.assign(this.default_value ,row,{password:''});           
            });
        },
        add_user_submit(data){
                var params = {
                    func_name: "user.create_user",
                    args: [data.username, data.password, data.role, data.desc ],
                    kwargs:{groups:data.groups,  lps: data.lps ,symbols: data.symbols}
                }; 
                CommonApi.postFormAjax.call(this,params,data=>{
                        this.getCurrentPageTable();
                        this.add_user_dialog.show  = false;
                       },{errFn(err){
                            console.log('12345');
                            this.$message({
                              showClose: true,
                              message:  err.response.data,
                              type: 'error'
                            });
                        }});            
        },
    edit_user_submit(data){
       var params = {
                    func_name: "user.update_user",
                    args: [data.user_id, data.password, data.role, data.status, data.desc ],
                    kwargs:{groups:data.groups,  lps: data.lps ,symbols: data.symbols}
                };
               CommonApi.postFormAjax.call(this,params,data=>{
                        this.getCurrentPageTable();
                        this.edit_user_dialog.show  = false;
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

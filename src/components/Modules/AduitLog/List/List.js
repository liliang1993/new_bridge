import {
    FormDialog,
    FormData
} from 'common/';
module.exports = {
    name: 'user-list',
    components: {
        FormDialog,
        FormData
    },
        data () {
      return {
        nowTime: '',
        tableData: [],
        pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
        keyValue: 1,
        form_dialog_show: true,
        dialog: {
                show: false,
                title: ''
            },
         fieldlist: [
                {
                    type:'input',
                    key:'username',
                    value:'',
                    label:'User'
                },
                {
                  type:'input',
                    key:'password',
                    value:'',
                    label:'Password'
                },
                {
                    type:'input',
                    key:'confirm_password',
                    value:'',
                    label:'Confirm Password'
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
                    value:'',
                    label:'Description'
                }
                ],
        default_value: {},
        rules: {
            name:{}
        },
        page_func_name: 'audit_log.page_log'
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
                  prop: 'log_id',
                  label: this.$t('log_id'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'username',
                  label: this.$t('username'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'api',
                  label:  this.$t('api'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'request',
                  label: this.$t('request'),
                  width: 180,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'status',
                  label: this.$t('status'),
                  width: 180,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'status'
                }
              },{
                attr: {
                  prop: 'remote_ip',
                  label: this.$t('ip'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'create_time',
                  label: this.$t('time'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        init(){
            this.getCurrentPageTable();
            this.nowTime=(new Date()).toGMTString();
        }

    },
    mounted() {
        this.init();
    }
}

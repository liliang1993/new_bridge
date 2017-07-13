import UsersDetail from 'modules/QuoteAdjust/RuleDetail/';
import DragDialog from '../DragDialog/';
module.exports = {
    name: 'mt4_users',
     components: {
                DragDialog,
                UsersDetail
        },
    data () {
      return {
        keywords:{
            login: {
                  type: 'int',
                  value: '',
                  name: 'login'
            },
            group: {
                  type: 'list',
                  value: '',
                  name: 'group'
            },
            city: {
                type: 'list',
                value: '',
                name: 'city'
            }
        },
        nowTime: '',
        pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
        users_detail: [ ],
        tableData: [ ],
        page_func_name: 'mt4.page_users',
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
                  prop: 'LOGIN',
                  label: this.$t('Login'),
                  minWidth: 180,
                  align: 'center',
                  scopedSlot: 'login'
                }
              },
              {
                attr: {
                  prop: 'NAME',
                  label: this.$t('Name'),
                  minWidth: 180,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'GROUP',
                  label: this.$t('Group'),
                  minWidth: 180,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'CITY',
                  label: this.$t('City'),
                  width: 180,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'EMAIL',
                  label: this.$t('Email'),
                  width: 180,
                  align: 'center',
                  scopedSlot: 'status'
                }
              },{
                attr: {
                  prop: 'BALANCE',
                  label: this.$t('Blance'),
                  minWidth: 180,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'CREDIT',
                  label: this.$t('Credit'),
                  minWidth: 180,
                  align: 'center'
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        onShowDetail(row){
              var title = {
                  text :'Users Detail',
              }
              var  detail ={
                  id : row.LOGIN,
                  title,
                  show: true,
                  config: row
              };
              if( !this.isDialogExist(this.users_detail,detail) ){
                      this.users_detail.push(detail);
              };
        },
        onCloseUsersDetail(index){
                this.users_detail.splice(index,1);
        },
        onSearch(){
              this.getCurrentPageTable(this.getKwargs());    
        },
        init(){
            this.getCurrentPageTable(this.getKwargs());
            this.nowTime=(new Date()).toGMTString();
        }
    },
    mounted() {
        this.init();
    }
}


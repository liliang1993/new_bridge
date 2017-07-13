import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'user-list',
        data () {
      return {
        keywords: {
          time_range:{
              type: 'datetime',
              value: [],
              name: 'time'
          } ,
          top: {
              type: 'int',
              value: 50,
              name: 'top'
          }
        },
        pickerOptions: {
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
        tableData: [],
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
              // {
              //   attr: {
              //     type: 'selection',
              //     width: 80,
              //     align: 'center'
              //   }
              // },
              {
                attr: {
                  prop: 'login',
                  label: this.$t('Login'),
                  minWidth: 180,
                  sortable: true,
                  // scopedSlot: 'date',
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'name',
                  label: this.$t('Name'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'group',
                  label: this.$t('Group'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'profit',
                  label: this.$t('profit'),
                  width: 180,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'size',
                  label: this.$t('size'),
                  width: 180,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'status'
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        onGetTopTrades(params){
          CommonApi.postFormAjax.call(this,params,data=>{
                this.tableData = data;
            });
        },
        onSearch(){
          var kwargs = this.getKwargs();
          if(  kwargs['time']   == undefined ){
              this.$Message.warning('Please select time first !');
              return;
          };
          var args = kwargs['time'];
          args.push(kwargs['top']);
          var params={
              func_name:  'mt4.get_top_traders',
              args
          };
          this.onGetTopTrades(params);
        }
    },
    mounted() {

    }
}

import TradesDetail from 'modules/QuoteAdjust/RuleDetail/'
import DragDialog from '../DragDialog/';
module.exports = {
    name: 'mt4_trades',
    components:{
         DragDialog,
         TradesDetail
    },
        data () {
      return {
        keywords: {
          login: {
              type: 'int',
              value: '',
              name: 'login'              
          },
          ord_id: {
              type: 'int',
              value: '',
              name: 'ticket'
          },
          symbol: {
              type: 'list',
              value: '',
              name: 'symbol'
          },
          opentime: {
              type: 'datetime',
              value: [],
              name: 'open_time'
          },
          closetime: {
              type: 'datetime',
              value: [],
              name: 'close_time'
          }
        },
        trades_detail: [ ],
        nowTime: '',
        pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
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
              page_func_name: 'mt4.page_trades',
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
                defaultSort:{prop: 'TICKET',order:'descending'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'TICKET',
                  label: this.$t('OrdId'),
                  minWidth: 120,
                  align: 'center',
                  scopedSlot: 'ord_id'
                }
              },
              {
                attr: {
                  prop: 'LOGIN',
                  label: this.$t('Login'),
                  minWidth: 120,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'SYMBOL',
                  label: this.$t('Symbol'),
                  minWidth: 120,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'CMD',
                  label: this.$t('cmd'),
                  width: 120,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'VOLUME',
                  label: this.$t('Volume'),
                  width: 120,
                  align: 'center',
                  formatter(item){
                      return item.VOLUME / 100;
                  }
                }
              },{
                attr: {
                  prop: 'PROFIT',
                  label: this.$t('Profit'),
                  minWidth: 120,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'OPEN_PRICE',
                  label: this.$t('OpenPrice'),
                  minWidth: 120,
                  align: 'center',
              }
            },{
                attr: {
                  prop: 'CLOSE_PRICE',
                  label: this.$t('ClosePrice'),
                  minWidth: 100,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'COMMENT',
                  label: this.$t('Comment'),
                  minWidth: 180,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'OPEN_TIME',
                  label: this.$t('OpenTime'),
                  minWidth: 120,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'CLOSE_TIME',
                  label: this.$t('CloseTime'),
                  minWidth: 120,
                  align: 'center',
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
                  text: 'Trade Detail',
                  className: ''
              };
              var detail = {
                  id : row.TICKET,
                  title,
                  show: true,
                  config:  row 
              };
              if( !this.isDialogExist(this.trades_detail,detail) ){
                    this.trades_detail.push(detail);
              }
        },
        onCloseTradesDetail(index){
                this.trades_detail.splice(index,1);
        },
        onSearch(){
            this.getCurrentPageTable(this.getKwargs());        
        },
        init(){
            this.getCurrentPageTable(this.getKwargs());    
            this.nowTime=(new Date()).toString();
        }
    },
    mounted() {
        this.init();
    }
}

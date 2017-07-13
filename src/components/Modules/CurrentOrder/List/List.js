import {
    FormData,
    DragDialog
} from 'common/';
import LpOrder from '../LPOrder/';
import TradeLog from '../TradeLog/';
import  AddPosition from '../AddPosition/';
import DelPosition from '../DeletePosition/'
import  Mt4Trades from '../MT4Trades/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'current_order',
    components: {
        FormData,
        DragDialog,
        LpOrder,
        TradeLog,
        AddPosition,
        DelPosition,
        Mt4Trades
    },
data () {
      return {
        timer_interval_id : void 0,
        next_fresh_time : void 0,
        refresh_enable: 'true',
        data_loaded : true,
        remain_sec : void 0  ,
        refresh_seconds: 5,

        lp_orders:[],
        trade_logs:[],
        add_position:{
          show: false,
          title:{
            text: 'Add position',
          }
        },
        del_position:{
          show: false,
          title:{
            text: 'Delete position',
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
        keyValue: 1,
        form_dialog_show: true,
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
        page_func_name: 'router_api.page_positions',
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
                defaultSort:{prop: 'order_id',order: 'descending'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'source',
                  label: this.$t('source'),
                  minWidth: 80,
                  // scopedSlot: 'date',
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'order_id',
                  label: this.$t('OrdID'),
                  minWidth: 80,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'trade_log.request.group',
                  label: this.$t('Group'),
                  minWidth: 120,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'trade_log.request.login',
                  label: 'Client',
                  width: 80,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'std_symbol',
                  label: 'Symbol',
                  width: 80,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'status',
                  label: 'status',
                  minWidth: 60,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'side',
                  label: 'side',
                  minWidth: 60,
                  align: 'center',
                  formatter(item){
                    if (item.trade_log.request.settle == 0 ){
                                if(item.trade_log.request.cmd == 0 ){
                                     return 'OB';
                                    }else{
                                        return  'OS';
                                    }
                            }else{
                                if(item.trade_log.request.cmd == 0){
                                    return 'SS';
                                    }else{
                                        return 'SB';
                                    }
                            };
                  }
                }
              },
              {
                attr: {
                  prop: 'order_size',
                  label: this.$t('Order Size'),
                  minWidth: 80,
                  align: 'center',
                  formatter(item){
                    return item.quantity / item.trade_log.request.contract_size;
                  }
                }
              },{
                attr: {
                  prop: 'bbook_size',
                  label: this.$t('B Book Size'),
                  minWidth: 90,
                  align: 'center',
                  formatter(item){
                     return item.bbook_quantity / item.trade_log.request.contract_size;
                  }
                }
              },{
                attr: {
                  prop: 'trade_log.request.contract_size',
                  label: this.$t('Contract Size'),
                  minWidth: 100,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'RSES',
                  // label: this.$t('Req Size/Exec Size'),
                   renderHeader(createElement,{column}){
                        if(this.$store.state.global.locale =='en-US'){
                              return createElement('div',[ 
                                                                    'Req Size/',
                                                                    createElement('br') ,
                                                                    'Exec Size'
                                                                  ]);
                                            }else{
                                            return createElement('div',[ 
                                                                    '请求量/',
                                                                    createElement('br') ,
                                                                    '执行量'
                                                                  ]);
                                      }
                          },
                  minWidth: 80,
                  align: 'center',
                  formatter(item){
                    return item.trade_log.request.size+'/'+item.trade_log.confirm.size;
                  }
                }
              },{
                attr: {
                  prop: 'trade_log.confirm.price',
                  label: this.$t('Exec Price'),
                  minWidth: 80,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'slippage',
                  label: this.$t('slippage'),
                  minWidth: 50,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'trade_log.trade_rule.attributes.coverage',
                  label: this.$t('Coverage'),
                  minWidth: 80,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'lp_exec_orders',
                  label: this.$t('LP exec orders'),
                  minWidth: 80,
                  align: 'center',
                  scopedSlot: 'lp_exec_orders'
                }
              },{
                attr: {
                  prop: 'cost',
                  label: this.$t('cost'),
                  minWidth: 80,
                  align: 'center',
                  formatter(item){
                    return parseInt ((item.trade_log.end_time - item.trade_log.start_time) * 1000) + "ms";
                  }
                }
              },{
                attr: {
                  prop: 'time',
                  label: this.$t('Time'),
                  minWidth: 150,
                  align: 'center',
                  formatter(item){
                    return (new Date((item.trade_log.time + 8*3600) * 1000)).toISOString();
                  }
                }
              },{
                attr: {
                  prop: 'done',
                  label: this.$t('Done'),
                  minWidth: 50,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'operation',
                  label: this.$t('Operation'),
                  minWidth: 80,
                  scopedSlot: 'detail',
                  align: 'center'
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        //refresh controls
            // init_controls(){
            //       this.timer_interval_id = 0;
            //       this.next_fresh_time = void 0;
            //       this.data_loaded = true;
            // },
            interval_check(){
              var remain_mil_sec;
                if (this.refresh_enable=== 'false') {
                  this.remain_sec = "-";
                  return;
                };
                 console.log('888',this.next_fresh_time,this.data_loaded);
                if (this.next_fresh_time && !this.data_loaded) {
                  remain_mil_sec = this.next_fresh_time - (new Date()).getTime();
                  if (remain_mil_sec <= 0) {
                    this.remain_sec ='0';
                    this.load_data();
                     // this.data_loaded = true;
                  } else {
                      this.remain_sec = parseInt(remain_mil_sec * 0.001);
                  }
                }
            },
            schedule_next_request(){
                  this.next_fresh_time = (new Date()).getTime() + this.refresh_seconds * 1000;
                  this.data_loaded = false;
            },
            changeSwitch(val){
                    if(val=== 'true'){
                           this.remain_sec = "0";                   
                    }
                    if(val === 'false'){
                          this.remain_sec = "-";
                    }
            },

      //
      
        onAddPosition(){
              this.add_position.show = true;
        },
        onDeletePosition(){
              this.del_position.show = true;
        },
        onCloseOnlyDialog(type){
              this[type].show = false;
        },
        onCloseTradeLog(index){
            this.trade_logs.splice(index,1);
        },

        onDetail(row){
              var config = row.trade_log;
              var id =row.order_id;
              var title ={
                  text: 'Trade Log'+row.order_id
              };
              var trade_log ={
                  title,
                  config,
                  id
              };
              if(this.isDialogExist(this.trade_logs,row)==false){
                  this.trade_logs.push(trade_log);
               };
            },
        onLPOrdersDetail(row){ 
           var title ={
              text : '#'+row.order_id+ ' LP Orders Settle:'+row.trade_log.request.settle
           }; 
           var id =row.order_id;
           var config = row.trade_log;
           var lp_order = {
              title,
              config,
              id
           };
            if(this.isDialogExist(this.lp_orders,lp_order)==false){
              this.lp_orders.push(lp_order);
            }
        },

        onCloseLpOrder(index){
          this.lp_orders.splice(index,1);
        },

        load_data(){
            this.getCurrentPageTable();
            this.schedule_next_request();
        },
        init(){
            this.timer_interval_id = setInterval(()=>{
                      this.interval_check();
            }, 1000);
            this.load_data();
            this.nowTime=(new Date()).toGMTString();
        }

    },
    mounted() {
        this.init();
    },
    beforeRouteLeave(to,from,next){
      if(this.timer_interval_id){
           clearInterval(this.timer_interval_id);
      }
      next();
    }
}

import {
    common as CommonApi
} from 'config/request.js';
import {
    DragDialog
} from 'common/';
module.exports = {
    name: 'user-list',
      components: {
          DragDialog
      },
    data () {
      return {
        lp_symbols:{},
        orders_value:"",
        search_disabled: false,
        listData: [],
        tableData: [],
        del_reason:'',
        submit_disabled:true,
        apis:{
          func_name:'router_api.page_positions'
        }
      }
    },
    computed: {
      tableConfig: {
        get () {
          return {
            table: {
              attr: {
                data: this.listData,
                maxHeight: '100%',
                defaultSort:{prop: 'std_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'order_id',
                  label: this.$t('OrderID'),
                  minWidth: 80,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'group',
                  label: this.$t('Group'),
                  minWidth: 150,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'client',
                  label: this.$t('Client'),
                  minWidth: 100,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'symbol',
                  label: this.$t('Symbol'),
                  width: 100,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'side',
                  label: this.$t('Side'),
                  width: 100,
                  sortable: true,
                  align: 'center',
                  formatter(item){
                    return  item.side == "buy" ? "OB" : "OS";
                  }
                }
              },{
                attr: {
                  prop: 'abook_qty',
                  label: this.$t('ABook Qty'),
                  minWidth: 100,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'bbook_qty',
                  label: this.$t('BBook Qty'),
                  minWidth: 100,
                  sortable: true,
                  scopedSlot: 'price',
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'lp_positions',
                  label: this.$t('LP Positions'),
                  minWidth: 100,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'lp_positions'
                }
              },{
                attr: {
                  label: this.$t('Delete'),
                  minWidth: 120,
                  sortable: true,
                  scopedSlot: 'delete',
                  align: 'center'
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        onclose(type){
            this[type].show = false;
        },
        load_order_data(orders){
          this.listData = [];
          for (var order of orders){
                var abook_qty = order.quantity-order.bbook_quantity
                var lp_positions=this.get_lp_positions(order.trade_log.orders,order.std_symbol)
                var row = {
                    order_id: order.order_id,
                    group: order.trade_log.request.group,
                    client: order.trade_log.request.login,
                    symbol: order.trade_log.request.symbol,
                    side: order.side,
                    abook_qty: abook_qty,
                    bbook_qty: order.bbook_quantity,
                    lp_positions: lp_positions,
                }  
                this.listData.push(row);  
            }   
        },
        get_lp_positions(lp_orders, std_symbol){
            var lp_filled = {}
            var lp_positions = {}
            var lps = this.lp_symbols[std_symbol]
            if(lps == undefined){
                return lp_positions
            }  
            for(var order of lp_orders){
                if (order.state == "filled" || order.state == "partial"){
                    var filled = lp_filled[order.lp];
                    if (filled == undefined){
                      lp_filled[order.lp] = order.quantity;
                    }else{
                      lp_filled[order.lp] = filled + order.quantity;
                    }         
                }      
            }
            for(var lp of lps){
                var filled = lp_filled[lp]
                if (filled != undefined){
                    lp_positions[lp] = filled;
                }else{
                    lp_positions[lp] = 0;
                }       
            };  
            if (lp_filled["bbook"] != undefined){
                 lp_positions["bbook"] = lp_filled["bbook"]
            };
            return lp_positions
        },
        
       onIconClick(){
                  if(!this.is_number(this.orders_value)){
                          this.$message.warning( 'input value should be number');
                          return;
                  }else{

                        var args = [[Number(this.orders_value)]];
                        var params = {
                            func_name: 'router_api.get_positions',
                            args
                        };
                        CommonApi.postFormAjax.call(this,params,data=>{
                              this.load_order_data(data);
                              console.log('listData',this.listData);
                              if(this.listData.length>0){
                                  this.submit_disabled = false;
                              }else{  
                                  this.submit_disabled = true;
                              }
                        })
                  }              
        },
       onDeleteRow(row){
          var index =this.listData.indexOf(row);
        if (index !== -1) {
          this.listData.splice(index, 1)
        }
        console.log('index',index);
        },
        onSubmit(){
          console.log('del_reason',this.del_reason);
            if(this.del_reason){
                var datas = [];
                for(var order of this.listData){
                  var data = {};
                  var sum = 0;
                  var lp_positions = {};
                  var order_id = parseInt(order.order_id);
                  var abook_qty = parseInt(order.abook_qty);
                  var bbook_qty = parseInt(order.bbook_qty);
                  var total = abook_qty + bbook_qty;
                  for(var key in order.lp_positions){
                      var qty = order.lp_positions[key];
                      sum += qty;
                      if(key != "bbook" && qty!=0){
                          lp_positions[key] = qty;
                      };
                  };
                  if(sum != total){
                    this.$message.warning("order " + order_id + "total positions should be " + total);
                  };
                  data["order_id"] = order_id;
                  if(Object.keys(lp_positions).length>0){
                    data["lp_qtys"] = lp_positions;
                  }else{
                    data["lp_qtys"] = [];
                  }
                  datas.push(data);
                };
                var params = {
                  func_name : 'router_api.delete_positions',
                  args: [datas,this.del_reason],

                }
                CommonApi.postFormAjax.call(this,params,data=>{
                      console.log('result',data);
                      if(data=='ok'){
                          this.$emit('onRestTableDate');
                          this.del_reason = '';
                          this.orders_value= '';
                          this.listData = [];
                          this.$message.success('Delete Positions Success!');
                      }else{
                        this.$message.warning('deleted failed, please retry!');
                      }
                })
            }else{
              this.$message.warning('you should input reason!')
            }
        },
        get_alive_lp_symbols(symbols){
              var lp_symbols = {}
              console.log('symbols',symbols);
              for(var symbol of symbols)
                  if(symbol.trade_enable){
                   var lps = lp_symbols[symbol.std_symbol];
                      if(lps != undefined){
                        lps.push(symbol.lp);
                      }else{
                        lp_symbols[symbol.std_symbol] = [symbol.lp]
                      }      
                  }
              if(Object.keys(lp_symbols).length == 0){
                   this.$message.warning("no lps found! please check.");
                  this.search_disabled = true;
              };      
              this.lp_symbols = lp_symbols
        },
        init(){
          var params ={
            func_name:'router_api.lp_get_all_alive_symbols'
          };
          CommonApi.postFormAjax.call(this,params,data=>{
              this.get_alive_lp_symbols(data);
              console.log('data1',data);
          });
        }          
    },
    mounted() {
      this.init();
    }
}

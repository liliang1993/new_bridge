import {
        DragDialog
} from 'common/';
import DiffOrders from 'modules/QuoteAdjust/RuleDetail/';
import {
        common as CommonApi
} from 'config/request.js';
module.exports = {
        name: 'mt4_positions',
        components: {
                DragDialog
        },
        data() {
                return {
                        trade_rules: '',
                        tableData: [],
                        trade_rule_dict: {},
                        diff_orders:{
                            show:false,
                            title:{
                              text : "MT4 bridge diff orders"
                            },
                            config: [ ]
                        }
                }
        },
        computed: {
                tableConfig: {
                        get() {
                                return {
                                        table: {
                                                attr: {
                                                        data: this.tableData,
                                                        maxHeight: '100%',
                                                        defaultSort: {
                                                                prop: 'std_symbol'
                                                        }
                                                }
                                        },
                                        columns: [{
                                                attr: {
                                                        prop: 'std_symbol',
                                                        label: this.$t('std_symbol'),
                                                        minWidth: 120,
                                                        align: 'center',
                                                        scopedSlot: 'ord_id'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'net_vol',
                                                        label: this.$t('net_vol'),
                                                        minWidth: 120,
                                                        align: 'center'
                                                }
                                        }]
                                }
                        }
                }
        },
        methods: {
                on_trade_rules_loaded(trade_rules) {
                        var i, len, rule;
                        this.trade_rules = trade_rules;
                        for (i = 0, len = trade_rules.length; i < len; i++) {
                                rule = trade_rules[i];
                                this.trade_rule_dict[[rule.mt4_symbol, rule.group]] = rule.std_symbol;
                        }
                        console.log('trade_rule_dict', this.trade_rule_dict);
                        this.request_mt4_positions();
                },
                request_mt4_positions() {
                        var params = {
                                func_name: 'mt4.get_group_positions'
                        }
                        CommonApi.postFormAjax.call(this, params, data => {
                                this.on_mt4_positions_loaded(data);
                        })
                },
                on_mt4_positions_loaded(rows) {
                        var i, len, net_vol, row, std_symbol, std_symbol_vol;
                        this.tableData = [];
                        std_symbol_vol = new Object;
                        for (i = 0, len = rows.length; i < len; i++) {
                                row = rows[i];
                                std_symbol = this.trade_rule_dict[[row.symbol, row.group]];
                                if (std_symbol) {
                                        if (std_symbol_vol[std_symbol] === void 0) {
                                                std_symbol_vol[std_symbol] = 0;
                                        }
                                        std_symbol_vol[std_symbol] += row.net_vol;
                                }
                        }
                        for (std_symbol in std_symbol_vol) {
                                net_vol = std_symbol_vol[std_symbol];
                                this.tableData.push({
                                        std_symbol,
                                        net_vol
                                });
                        };
                },
                reload(){
                    if (this.trade_rules) {
                       this.request_mt4_positions();
                    }
                },
                check_bridge_mt4_diff(){
                            var array_compare, check_times, prev_bridge_orders, request, request_after, result_handle, wait_modal;
                            check_times = 3;
                            array_compare = function(arr1, arr2) {
                              var arr1Str, arr2Str;
                              if (arr1.length !== arr2.length) {
                                return false;
                              }
                              arr1Str = arr1.slice().sort().join(",");
                              arr2Str = arr2.slice().sort().join(",");
                              if (arr1Str !== arr2Str) {
                                return false;
                              }
                              return true;
                            };
                            request =(count)=>{
                              // wait_modal.empty();
                              // wait_modal.append($("<p>comparing positions " + (count + 1) + " times</p>"));
                              // return ajax_api("check.get_mt4_bridge_diff_position_fast", [], {}, ((function(_this) {
                              //   return function(result) {
                              //     return result_handle(count, result);
                              //   };
                              // })(this)), ((function(_this) {
                              //   return function(jqXHR, textStatus) {
                              //     return alert(jqXHR.responseText, "Request error - Code: " + jqXHR.status);
                              //   };
                              // })(this)), 2, true);
                              var params= {
                                  func_name: 'check.get_mt4_bridge_diff_position_fast'
                              };
                              CommonApi.postFormAjax.call(this,params,data=>{
                                      result_handle(count,data);
                              } );
                            };
                            request_after =(count)=>{
                              setTimeout(()=>{
                                  this. request(count);
                              }, 5000);
                            };
                            prev_bridge_orders = [];
                            result_handle = function(count, result) {
                              var last_except_orders, ok, show;
                              // show = function(result) {
                              //   return show_json_table(result, "MT4 bridge diff orders");
                              // };
                              last_except_orders = result.except_bridge_orders;
                              if (last_except_orders.length === 0) {
                                this.diff_orders.show = true;
                                this.diff_orders.config  = result;      
                                return;
                              }
                              ok = array_compare(prev_bridge_orders, last_except_orders);
                              prev_bridge_orders = last_except_orders;
                              if (count === 0) {
                                  request_after(count + 1);
                              } else if (count === check_times - 1) {
                                if (ok) {
                                  this.diff_orders.show = true;
                                this.diff_orders.config  = result;  
                                } else {
                                    request_after(0);
                                }
                              } else {
                                if (ok) {
                                  request_after(count + 1);
                                } else {
                                  request_after(0);
                                }
                              }
                            };
                           request(0);
                },
                reload(){
                    if(this.trade_rules){
                          this.request_mt4_positions();
                    }
                },
                init() {
                        var params = {
                                func_name: 'router_api.trade_get_all_rules'
                        };
                        CommonApi.postFormAjax.call(this, params, data => {
                                this.on_trade_rules_loaded(data);
                        });
                }
        },
        mounted(){
              this.init();
        }
}
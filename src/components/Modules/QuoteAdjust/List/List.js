import {
    DragDialog
} from 'common/';
import RuleDetail from '../RuleDetail/';
import LpQuote from '../LPQuote/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'quote_adjust',
    components: {
        DragDialog,
        RuleDetail,
        LpQuote
    },
    data () {
      return {
        source:'risehills',
        load_desc: '',
        load_desc_color: '',
        ws_status_bgcolor:'',
        quote_rules:{},
        options:[{value:'',label:''}],
        current_source:'',
        ws:null,
        current_time:'',
        mt4_panel_show:false,
        tableData: [],

        lp_quotes:[],

        rule_tables:[]
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
                defaultSort:{prop: 'mt4_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'source',
                  label: this.$t('Source'),
                  minWidth: 80,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'std_symbol',
                  label: this.$t('STD symbol'),
                  minWidth: 120,
                  sortable: true,
                  scopedSlot: 'std_symbol',
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'mt4_symbol',
                  label: this.$t('MT4 symbol'),
                  minWidth: 100,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'bid_change',
                  label: '',
                  width: 50,
                  align: 'center',
                  scopedSlot: 'bid_change'
                }
              },{
                attr: {
                  prop: 'bid',
                  label: this.$t('Bid'),
                  width: 120,
                  sortable: true,
                  align: 'center',
                  className: 'positive'
                }
              },{
                attr: {
                  prop: 'ask',
                  label: this.$t('Ask'),
                  width: 120,
                  sortable: true,
                  align: 'center',
                  className: 'negative'
                }
              },{
                attr: {
                  // prop: 'ask_change',
                  label: '',
                  width: 50,
                  align: 'center',
                   scopedSlot: 'ask_change'
                }
              },{
                attr: {
                  prop: 'spread',
                  label: this.$t('sreapd'),
                  minWidth: 80,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.adjust',
                  label: this.$t('Adjust'),
                  minWidth: 80,
                  sortable: true,
                  scopedSlot:'adjust',
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'edit_adjust',
                  label: this.$t('Edit Adjust'),
                  minWidth: 250,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'edit_adjust'
                }
              },{
                attr: {
                  prop: 'rule',
                  label: this.$t('Rule'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'rule_type'
                }
              },{
                attr: {
                  prop: 'update_at',
                  label: this.$t('Update At'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'adjust_enabled',
                  label: this.$t('Adjust Enabled'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'adjust_enabled'      
                }
              }
            ],
          }
        }
      }
    },
    methods: {
            // WebSocket method
              ws_reconnect(){
                      var req_params, uri;
                        this.ws_close();
                        console.log('source',this.source);
                        req_params = "source=" + this.source;
                        uri = location.hostname + ":9988" ;//location.port
                        this.ws = new WebSocket("ws://" + uri + "/ws/bang_quote?" + req_params);
                        this.ws.onopen = (function(_this) {
                              return function() {
                                return _this.ws_on_open();
                              };
                            })(this);
                        this.ws.onmessage = (function(_this) {
                            return function(e) {
                              var data;
                              data = JSON.parse(e.data);
                              return _this.ws_handle_msg(data);
                            };
                          })(this);
                          this.ws.onerror = (function(_this) {
                            return function(e) {
                              return console.log('onerror', e);
                            };
                          })(this);
                          this.ws.onclose = (function(_this) {
                            return function(e) {
                              console.log('onclose', e);
                              return _this.ws_on_close();
                            };
                          })(this);
              },
              ws_handle_msg(data){
                      this.on_quote_tick(this.source, data);
              },
              ws_on_open(){
                      this.set_quote_status(true);
              },
              ws_on_close(){
                      this.set_quote_status(false);
              },
              ws_start(){
                  this.ws_reconnect();
              },
              ws_close(){
                    if(this.ws !== null){
                        this.ws.onopen = null;
                        this.ws.onclose = null;
                        this.ws.onerror = null;
                        this.ws.onmessage = null;
                        this.ws.close();
                    }
              },
              ws_stop(){
                    this.ws_close();
              },
              //................................................
            
            interval_check(){
                this.current_time = new Date().toISOString();
            },
              load_quote_rules(){
                      var params ={
                        func_name : 'router_api.quote_get_all_rules'
                      }
                      CommonApi.postFormAjax.call(this,params,data=>{
                                this.quote_rules_loaded(data, data.length);
                      })
              },
              set_description(text,color){
                      if(color == null){
                          this.load_desc_color = 'green';
                      }else{
                          this.load_desc_color = color;
                      };
                      this.load_desc = text;
              },
              set_quote_status(connected){
                    if(connected === void 0){
                          this.ws_status_bgcolor = 'white';
                          return;
                    }
                    if(connected){
                          this.ws_status_bgcolor = 'green';
                    }else{
                        this.ws_status_bgcolor = 'red';
                    }
              },
              quote_rules_loaded(quote_rules){
                    var j, len, rule, source_rules;
                    for (j = 0, len = quote_rules.length; j < len; j++) {
                      rule = quote_rules[j];
                      source_rules = this.quote_rules[rule.source];
                      if (source_rules === void 0) {
                        source_rules = new Object;
                        this.quote_rules[rule.source] = source_rules;
                      }
                      rule.prev_ask = void 0;
                      rule.prev_bid = void 0;
                      rule.update_at = "-";
                      rule.bid = "-";
                      rule.ask = "-";
                      rule.spread= '-';
                      rule.adjust_step = 5;
                       rule.adjust_enabled = false;
                      source_rules[rule.mt4_symbol] = rule;
                    }     
                    this.render_quote_sources();  
              },
              render_quote_sources(){
                      var  _,ref,source;
                      this.options = [];
                      ref = this.quote_rules;
                      console.log('quote_rules',this.quote_rules);
                      for(source in ref){
                            this.options.push({
                                value: source,
                                label: source
                            });
                      }  
                      console.log('options',this.options);
                      this.set_description("Load rules success, please select quote source.");         
              },
              changeSelect(data){
                this.select_mt4_source(this.current_source) ;
              },
              select_mt4_source(source){
                        var $quote_table, _, fn, rule, source_rules,mt4_symbol;
                        this.tableData= [];
                        this.mt4_panel_show = true;
                        for(mt4_symbol in  this.quote_rules[source]){
                            this.tableData.push(this.quote_rules[source][mt4_symbol]);
                        }
                        this.set_description("Loaded source: " + source);
                        console.log('source_rules',this.quote_rules[source]);
              },
              on_quote_tick(source, data){
                    var ask, bid, digits, mt4_symbol, rule, time;
                    mt4_symbol = data[0], bid = data[1], ask = data[2], time = data[3];
                    rule = this.quote_rules[source][mt4_symbol];
                    if (!rule || this.current_source !== source) {
                      return;
                    }
                    digits = rule.attributes.digits;
                    if (rule.prev_ask && rule.prev_ask){
                          if(bid - rule.prev_bid > 0){
                                rule.bid_change = '&uarr;';
                          }else if (bid - rule.prev_bid < 0){
                                rule.bid_change = '&darr;';
                          }
                        if (ask - rule.prev_ask > 0){
                                  rule.ask_change = '&uarr;';
                        }else if (ask - rule.prev_ask < 0){
                                  rule.ask_change = '&darr;';
                        }
                    };
                    rule.prev_ask = ask;
                    rule.prev_bid = bid;
                    rule.ask = ask.toFixed(digits)
                    rule.bid = bid.toFixed(digits)
                    rule.spread  = ((ask - bid) * Math.pow(10, digits)).toFixed(0)
                    rule.update_at = (new Date(time * 1000)).toISOString();
                    this.render_ws_quote(rule);
              },
              render_ws_quote(rule){
                  var i ,len,mt4_symbol;
                  for(i =0,len= this.tableData.length;i<len;i++) {
                    mt4_symbol =  this.tableData[i][mt4_symbol];
                    if(rule.mt4_symbol === mt4_symbol){
                        this.$set(this.tableData,i,rule);
                    }
                  }
              },
              controlAdjust(type,row){
                    var adjust,adjust_pips;
                    console.log('adjust_enabled',row.adjust_enabled);
                    if(row.adjust_enabled ==false){
                      this.$message.warning('Please enable adjust.');
                      return;
                    }
                    if(isNaN( parseInt(row.adjust_step) )){
                      this.$message.warning('please input right pips!');
                      return;
                    }
                    adjust = row.attributes.adjust || 0;
                    if(type =='reduce'){
                      adjust_pips=row.attributes.adjust  - row.adjust_step;
                    }else{
                     adjust_pips=row.attributes.adjust  + row.adjust_step;
                    }
                    var params = {
                      func_name : 'router_api.quote_update_adjust_pips',
                      args:[row.source,row.mt4_symbol,adjust_pips]
                    };
                    CommonApi.postFormAjax.call(this,params,data=>{
                      row.attributes.adjust = adjust_pips;
                    });
              },
              changeSwitch(event,row){

              },
              onCloseRowDialog(type,index){
                this[type].splice(index,1);
              },
              showLpQuotes(row){
                var params= {
                  func_name: 'router_api.lp_get_quote',
                  args: [row.std_symbol]
                }
                CommonApi.postNormalAjax.call(this,params,data=>{
                      var lp_quotes = data
                      console.log('lp_quotes',data);
                      var digits = row.attributes.digits;
                      var config ={
                          lp_quotes,
                          digits,
                          std_symbol: row.std_symbol
                      };
                      var id = row.mt4_symbol
                      var title = 'LP Qutoe -'+row.std_symbol;
                      var lp_quote = {
                        title,
                        config,
                        id
                      };
                      if(!this.isDialogExist(this.lp_quotes,lp_quote)){
                        this.lp_quotes.push(lp_quote);
                      };
                      setTimeout(()=>{
                              CommonApi.postNormalAjax.call(this,params,data=>{
                                     var lp_quotes = data
                                      var digits = row.attributes.digits;
                                      var config ={
                                          lp_quotes,
                                          digits
                                      };
                              })
                      },3000);
                 });
              },
              show_json_table(row){
                 var title ={
                    text : row.mt4_symbol
                 } 
                 console.log('attributes',row.attributes);
                 var id = row.mt4_symbol;
                 var config =row.attributes;
                 var rule = {
                    title,
                    config,
                    id
                 };
                 if(!this.isDialogExist(this.rule_tables,rule)){
                    this.rule_tables.push(rule);
                  };
              },
              init(){
                        this.set_description("loading quote rules ...");
                        this.set_quote_status(void 0);
                        this.load_quote_rules();
                 }
    },
    mounted() {
        this.init();
        this.ws_start();
        this.timer_interval_id  = setInterval(()=>{
          this.interval_check();
        },100); 
    }
}
// onCloseRowDialog(type,index){
        //     this[type].splice(index,1);
        // },
        // onRuleDetail(row){
        //    var title ={
        //       text : row.mt4_symbol
        //    } 
        //    console.log('attributes',row.attributes);
        //    var id = row.mt4_symbol;
        //    var config =row.attributes;
        //    var rule = {
        //       title,
        //       config,
        //       id
        //    };
        //    if(!this.isDialogExist(this.rules,rule)){
        //       this.rules.push(rule);
        //     };
        // },
        // controlAdjust(type,row){
        //   var adjust;
        //   if(row.select ==false){
        //     this.$message.warning('Please enable adjust.');
        //     return;
        //   }
        //   if(isNaN(row.adjust_step)){
        //     this.$message.warning('please input right pips!');
        //     return;
        //   }
        //   if(type =='reduce'){
        //     adjust=row.attributes.adjust  - row.adjust_step;
        //   }else{
        //     adjust=row.attributes.adjust  + row.adjust_step;
        //   }
        //   var params = {
        //     func_name : 'router_api.quote_update_adjust_pips',
        //     args:[row.source,row.mt4_symbol,adjust]
        //   };
        //   CommonApi.postFormAjax(params,data=>{
        //     row.attributes.adjust = adjust;
        //   });
        // },
        // handlerAjaxData(data,prop){
        //             var temp =[];
        //             data.forEach(item=>{
        //                 if(temp.length>0){
        //                           var flag = false;
        //                          temp.forEach(arr=>{
        //                               if(arr instanceof Array){
        //                                     if( item[prop]===undefined) return;
        //                                     if(arr[0][prop]== item[prop]){
        //                                         flag = true;
        //                                         arr.push(item);
        //                                         return;
        //                                   }
        //                             }
        //                       });
        //                       if(flag== false){
        //                          temp.push([item]);
        //                       }
        //               }else{
        //                   temp.push([item]);           
        //               }     
        //         });
        //             return temp;
        //     },
        // render_quote_adjust(){
        //   for(var item of this.QutoeRule){
        //     if(item[0].source == this.select_value){
        //         var quote_adjust_dict = item;

        //         for(var row of quote_adjust_dict){
        //             row.bid = '-';
        //             row.ask = '-';
        //             row.sreapd = '-';
        //             row.adjust_step = 5;
        //             row.update_at = '-';
        //             row.select = false;
        //         };
        //         this.tableData = quote_adjust_dict;
        //         console.log('table',this.tableData);
        //     }
        //   }
        // },
        // changeSelect(val){
        //   this.table_show = true;
        //   this.select_value = val;
        //   this.rules =[];
        //   this.render_quote_adjust();
        // },  
        // changeSwitch(event,row){
        //     var opt=Object.assign({},row,{select : event});
        //     this.tableData.forEach((item,index)=>{
        //         if(row.mt4_symbol == item.mt4_symbol){
        //               this.$set(this.tableData,index,opt);
        //         }
        //     })
        // },
        // onGetDataList(){
        //     var params = {
        //       func_name: 'router_api.quote_get_all_rules'
        //     }
        //     CommonApi.postNormalAjax.call(this,params,data=>{
        //         this.QutoeRule = this.handlerAjaxData(data,'source');
        //         console.log('QutoeRule',this.QutoeRule);
        //         this.options = [];
        //         for(var item of this.QutoeRule){
        //             this.options.push({value: item[0].source,label: item[0].source})
        //         };
        //         this.socket('risehills');
        //     })
        // },
        // socket(sourceName){
        //     this.closeWS();
        //     var params = "source=" +sourceName;
        //     var url = "ws://"+location.hostname+":9988/ws/bang_quote?"+params
        //     this.ws = new WebSocket(url);
        //     this.ws.onmessage=(event)=>{
        //       var data =  JSON.parse(event.data);
        //        this.on_quote_tick(sourceName,data);
        //     }
        // },
        // closeWS(){
        //     if(this.ws !=null){
        //         this.ws.onmessage = null;
        //         this.ws.close();
        //     }
        // },
        // check_mt4_symbol_exist(source,mt4_symbol){
        //         for(var item of this.QutoeRule){
        //           if(item[0].source === source){
        //                   for(var rule of item){
        //                         if (rule.mt4_symbol === mt4_symbol){
        //                                     return  rule;
        //                         }
        //                   }
        //           }
        //       };
        //       return null;
        // },
        // render_ws_quote(rule){
        //     this.tableData.forEach((item,index,arr)=>{
        //         if(item.mt4_symbol == rule.mt4_symbol){
        //               this.$set(arr,index,rule);
        //         }
        //     })
        //     console.log('tableData',this.tableData);
        // },
        // on_quote_tick(sourceName,data){
        //       var [mt4_symbol, bid, ask, time] = data;
        //       var rule = this.check_mt4_symbol_exist(sourceName, mt4_symbol);
        //       if(rule ==null|| this.select_value !== sourceName){
        //           return;
        //       };
        //       var digits = rule.attributes.digits;
        //      if (rule.prev_ask && rule.prev_ask){
        //             if(bid - rule.prev_bid > 0){
        //                   rule.bid_change = '&uarr;';
        //             }else if (bid - rule.prev_bid < 0){
        //                   rule.bid_change = '&darr;';
        //             }
        //         if (ask - rule.prev_ask > 0){
        //                   rule.ask_change = '&uarr;';
        //         }else if (ask - rule.prev_ask < 0){
        //                   rule.ask_change = '&darr;';
        //         }
        //      }  
        //       rule.prev_ask = ask;
        //       rule.prev_bid = bid;
        //       rule.ask = ask.toFixed(digits)
        //       rule.bid = bid.toFixed(digits)
        //       rule.sreapd  = ((ask - bid) * Math.pow(10, digits)).toFixed(0)
        //       rule.update_at = (new Date(time * 1000)).toISOString();
        //       this.render_ws_quote(rule);
        // },
        // onCloseLpQuotes(){
        //       this.lpQuotes.dialog.show = false;
        // },
        // openLpQuotes(row){
        //     var params= {
        //       func_name: 'router_api.lp_get_quote',
        //       args: [row.std_symbol]
        //     }
        //     CommonApi.postNormalAjax.call(this,params,data=>{
        //           var lp_quotes = data
        //           console.log('lp_quotes',data);
        //           var digits = row.attributes.digits;
        //           var config ={
        //               lp_quotes,
        //               digits,
        //               std_symbol: row.std_symbol
        //           };
        //           var id = row.mt4_symbol
        //           var title = 'LP Qutoe -'+row.std_symbol;
        //           var lp_quote = {
        //             title,
        //             config,
        //             id
        //           };
        //           if(!this.isDialogExist(this.lp_quotes,lp_quote)){
        //             this.lp_quotes.push(lp_quote);
        //           };
        //           // setTimeout(()=>{
        //           //         CommonApi.postNormalAjax.call(this,params,data=>{
        //           //                var lp_quotes = data
        //           //                 var digits = row.attributes.digits;
        //           //                 var config ={
        //           //                     lp_quotes,
        //           //                     digits
        //           //                 };
        //           //         })
        //           // },3000);
        //      });
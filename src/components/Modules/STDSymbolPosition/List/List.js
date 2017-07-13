import {
        common as CommonApi
} from 'config/request.js';
module.exports = {
        name: 'std_symbol_position_chart',
        data() {
                return {
                        std_symbols:{},
                        load_text_color: 'black',
                        load_status: 'loading...',
                        current_std_symbol: 'NotSelected',
                        current_lp_symbols:{},
                        total_qty: 0,
                        next_fresh_time: 0,
                        remain_sec:'',
                        api_requested: true,
                        timer_interval_id: 0
                }
        },
       methods: {
              interval_check(){
                  var remain_mil_sec;
                  if (this.next_fresh_time && !this.api_requested) {
                      remain_mil_sec = this.next_fresh_time - (new Date()).getTime();
                      if (remain_mil_sec <= 0) {
                        this.remain_sec = 0
                        console.log('remain_sec',this.remain_sec);
                        this.request_symbol_positions();
                      } else {
                        this.remain_sec = parseInt(remain_mil_sec * 0.001);
                        console.log('remain_sec',this.remain_sec);
                      }
                  }
              },
              load_std_symbols(){
                    this.std_symbols={};
                    var params = {
                        func_name: "router_api.lp_get_symbols",
                    }
                    CommonApi.postFormAjax.call(this,params,data=>{
                            var fn, i, j, len, len1, lp, ref, ref1, s, std_symbol;
                            var lp_symbols = data;
                          console.log('lp_symbols',lp_symbols);
                            fn=s=>{
                                    var $std_symbol_li;
                                    if (s.std_symbol in this.std_symbols) {
                                     this.std_symbols[s.std_symbol].push(s);
                                    } else {
                                    this.$set(this.std_symbols,s.std_symbol,[s]);
                                  }
                            };
                            for (i = 0, len = lp_symbols.length; i < len; i++) {
                              s = lp_symbols[i];
                              fn(s);
                            }
                            console.log('std_symbols',this.std_symbols);
                            ref = this.std_symbols;
                            for (std_symbol in ref) {
                              lp_symbols = ref[std_symbol];
                              ref1 = ["bbook", "unexpect_bbook"];
                              for (j = 0, len1 = ref1.length; j < len1; j++) {
                                lp = ref1[j];
                                lp_symbols.push(new Object({
                                  "lp": lp,
                                  "std_symbol": std_symbol,
                                  "weight": 0,
                                  "lp_symbol": "-",
                                  "trade_enable": true,
                                  "quantity": 0
                                }));
                              }
                            }
                            this.load_status='Load symbols success';
                            this.load_text_color = 'green';
                    })
                },   
              select_std_symbol_chart(std_symbol) {
                          var fn, i, len, lp_symbol, lp_symbols, max_weight, weight_width, s, lp_symbol_item, obj;
                          this.current_std_symbol = std_symbol;
                          this.current_lp_symbols={};
                          console.log('current_std_symbol',this.current_std_symbol);
                          lp_symbols = this.std_symbols[std_symbol];
                          max_weight = Math.max.apply(Math, (function() {
                                  var i, len, results;
                                  results = [];
                                  for (i = 0, len = lp_symbols.length; i < len; i++) {
                                          s = lp_symbols[i];
                                          results.push(s.weight);
                                  }
                                  return results;
                          })());
                          fn = lp_symbol => {
                                  weight_width = parseInt(Math.abs(lp_symbol.weight) / (max_weight || 1) * 100),
                                          this.$set(this.current_lp_symbols,[lp_symbol.lp],{
                                                  lp_symbol,
                                                  weight_width,
                                                  position_width:0,
                                                  quantity:'',
                                                  position_bgcolor:'',
                                          });
                          };
                          for (i = 0, len = lp_symbols.length; i < len; i++) {
                                  lp_symbol = lp_symbols[i];
                                  fn(lp_symbol);
                          }
                          this.request_symbol_positions();
               },
              request_symbol_positions() {
                          var params;
                          this.load_status = "Reqesting positions ...";
                          this.load_text_color = 'black';
                          params = {
                                  "func_name": "router_api.get_symbol_positions",
                                  "kwargs": {
                                          "std_symbol": this.current_std_symbol
                                  }
                          }
                          CommonApi.postFormAjax.call(this, params, data => {
                                  this.render_symbol_positions(data);
                                  this.load_status = "Reqested position OK!";
                                  this.load_text_color = 'green';
                                  this.next_fresh_time = (new Date()).getTime() + 2000;
                                  this.api_requested = false;
                          });
                          this.api_requested =true;
               },
              render_symbol_positions(lp_symbol_positions) {
                          var _, color, i, len, lp, lp_positions, lp_symbol, max_quantity, position_width, quantity, ref, s, position_bgcolor,total_qty;
                          lp_positions = {};
                          for (i = 0, len = lp_symbol_positions.length; i < len; i++) {
                                  s = lp_symbol_positions[i];
                                  if (s.lp in this.current_lp_symbols && s.std_symbol === this.current_std_symbol) {
                                          lp_positions[s.lp] = s.quantity;
                                  }
                          }
                          ref = this.current_lp_symbols;
                          for (lp in ref) {
                                  _ = ref[lp];
                                  if (!(lp in lp_positions)) {
                                          lp_positions[lp] = 0;
                                  }
                          }
                          max_quantity = Math.max.apply(Math, (function() {
                                  var results;
                                  results = [];
                                  for (_ in lp_positions) {
                                          quantity = lp_positions[_];
                                          results.push(Math.abs(quantity));
                                  }
                                  return results;
                          })());
                          for (lp in lp_positions) {
                                  quantity = lp_positions[lp];
                                  lp_symbol = this.current_lp_symbols[lp];
                                  if (lp_symbol) {
                                          position_width = parseInt(Math.abs(quantity) / (max_quantity || 1) * 100);
                                          position_bgcolor =  quantity > 0 ? "#b3ff99" : "#ff8080";
                                          Object.assign(lp_symbol, {
                                                  position_width,
                                                  quantity,
                                                  position_bgcolor
                                          });

                                  }
                          }
                          console.log('current_lp_symbols',this.current_lp_symbols);
                          this.total_qty = ((function() {
                                  var results;
                                  results = [];
                                  for (_ in lp_positions) {
                                          quantity = lp_positions[_];
                                          results.push(quantity);
                                  }
                                  return results;
                          })()).reduce((function(a, b) {
                                  return a + b;
                          }), 0);
              }, 
            init() {
                    this.load_std_symbols();    
                    this.timer_interval_id = setInterval(()=>{
                        this.interval_check();
                    }, 100);              
              }
        },
        created() {
                this.init();
        },
        beforeRouteLeave(to,from,next){
          if(this.timer_interval_id){
            clearInterval(this.timer_interval_id);

          }         
           next();
        }
}
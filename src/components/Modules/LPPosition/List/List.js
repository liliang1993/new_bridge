import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
      name: 'lp_position',
      data(){
          return {
              columns: [],
              tableData: [],
              lp_names: [],
              next_fresh_time: 0,
              remain_sec: '',
              load_status: 'loading...',
              load_text_color :'black',
              api_requested: true,
              timer_interval_id: 0,
              std_symbols: {}
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
                columns: this.columns
                }
              }
            }
      },
      methods:{

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
                      }
                  }
              },
          load_symbols(){
            var params = {
              func_name:'router_api.lp_get_symbols'
            }
            CommonApi.postFormAjax.call(this,params,data=>{
                var fn, i, j, len, len1, lp, ref, ref1, s, std_symbol;
                var lp_symbols = data;
                console.log('lp_symbols',lp_symbols);

                fn =(s)=>{
                  var lp, lp_symbol;
                  s.quantity = 0;
                  lp = s.lp;
                  console.log('std_symbols',this.std_symbols);
                  if (s.std_symbol in this.std_symbols) {
                    this.std_symbols[s.std_symbol][s.lp] = s;
                  } else {
                    lp_symbol = new Object();
                    lp_symbol[s.lp] = s;
                    this.std_symbols[s.std_symbol] = lp_symbol;
                  }
                };
                for (i = 0, len = lp_symbols.length; i < len; i++) {
                  s = lp_symbols[i];
                  fn(s);
                }
                ref = this.std_symbols;

                for (std_symbol in ref) {
                  lp_symbols = ref[std_symbol];
                  ref1 = ["bbook", "unexpect_bbook"];
                  for (j = 0, len1 = ref1.length; j < len1; j++) {
                    lp = ref1[j];
                    lp_symbols[lp] = new Object({
                      "lp": lp,
                      "std_symbol": std_symbol,
                      "weight": 0,
                      "lp_symbol": "-",
                      "trade_enable": true,
                      "quantity": 0
                    });
                  }
                }
                this.render_symbols_table();
                this.request_symbol_positions();
            });
          },
          render_symbols_table(){
            var i, j, k, len, len1, len2,row, lp_name, lp_names, lp_symbol, lp_symbols, ref, std_name, std_symbol_name, std_symbol_names;
            this.tableData = [];
            this.columns = [];
            this.lp_names = [];
            std_symbol_names = [];
            ref = this.std_symbols;
            for (std_symbol_name in ref) {
              lp_symbols = ref[std_symbol_name];
              for (lp_name in lp_symbols) {
                lp_symbol = lp_symbols[lp_name];
                console.log('lp_names',this.lp_names,std_symbol_names);
                if (this.lp_names.indexOf(lp_name) < 0) {
                  this.lp_names.push(lp_name);
                }
                // if (std_symbol_names.indexOf(std_symbol_name) < 0) {
                //   std_symbol_names.push(std_symbol_name);
                // }
              }
            }
            this.lp_names.sort(function(a, b) {
              if (a === "bbook" || a === "unexpect_bbook") {
                return -1;
              }
              if (b === "bbook" || b === "unexpect_bbook") {
                return 1;
              }
              return a > b;
            });
            std_symbol_names.sort(function(a, b) {
              return a > b;
            });
            this.columns.push({
                        attr: {
                            prop: 'std_symbol',
                            label: 'STD SYMBOL',
                            sortable: true,
                            minwidth: '220',
                            align: 'center'
                        }
                        });
            this.lp_names.forEach((lp_name,index)=>{
              this.columns.push({
                attr: {
                      prop: lp_name,
                      label: lp_name.toUpperCase(),
                      sortable: true,
                      scopedSlot: lp_name,
                      align: 'center'
                    }    
                });
            });
            this.columns.push({
              attr: {
                      prop: 'total',
                      label: 'Total',
                      sortable: true,
                      scopedSlot: 'total',
                      minwidth: '220',
                      align: 'center'
                  }
            });
            for (j = 0, len1 = std_symbol_names.length; j < len1; j++) {
              std_name = std_symbol_names[j];
              // this.tableData.push({
              //   std_symbol: std_name
              // });
            }
          },
          request_symbol_positions(){
           this.load_status = 'Reqesting positions ...';
           this.load_text_color= 'black';
            var params ={
              func_name: "router_api.get_symbol_positions"
            };
            CommonApi.postFormAjax.call(this,params,data=>{
              console.log('data',data);
              console.log('123',this.std_symbols);
              this.render_symbol_positions(data);
              this.next_fresh_time = (new Date()).getTime() + 2000;
              this.api_requested = false;
              this.load_status = 'Reqested position OK!';
              this.load_text_color = 'green';
            });
            this.api_requested = true;
          },
        render_symbol_positions(lp_symbol_positions){
          var i, len, lp, lp_pos, lp_symbol, lp_symbols, row,ref, std_symbol, total;
          this.tableData = [];
          for (i = 0, len = lp_symbol_positions.length; i < len; i++) {
          lp_pos = lp_symbol_positions[i];
          std_symbol = this.std_symbols[lp_pos.std_symbol];
          if (std_symbol === 0) {
            console.log("Unkown std symbol: " + lp_pos.std_symbol + ", Check lp symbol");
            continue;
          }
          lp_symbol = std_symbol[lp_pos.lp];
            if (!lp_symbol) {
              console.log("Unkown lp_pos: " + lp_pos);
              continue;
            }
            lp_symbol.quantity = lp_pos.quantity;
          }
          ref = this.std_symbols;
          
          console.log('555',this.std_symbols);
          for (std_symbol in ref) {
            lp_symbols = ref[std_symbol];
            // total = this.std_symbol_sum[std_symbol];
            total= 0;
              row={};
             // this.lp_names.forEach(lp_name=>{
             //          row[lp_name] = '';
             // });
   
            row.std_symbol = std_symbol;
            for (lp in lp_symbols) {
              lp_symbol = lp_symbols[lp];
              row[lp] = lp_symbol.quantity;
              total += lp_symbol.quantity;
            }
            row.total = total;
            this.tableData.push(row);   
          }
             console.log('tableData',this.tableData);    
        },
        init(){
            this.timer_interval_id = setInterval(()=>{
                this.interval_check();
            },100);
             this.load_symbols();
        }
      },
      mounted(){
          this.init();
      },
      destroy(){
        if (this.timer_interval_id) {
            return clearInterval(this.timer_interval_id);
          }
      },
      beforeRouteLeave(to,from,next){
          if(this.timer_interval_id){
            clearInterval(this.timer_interval_id);

          }         
           next();
        }
  }
   
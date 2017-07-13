import {
    Default as Statis
} from 'common/Echarts/Bar/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'user-list',
    components: {
        Statis
    },
    data () {
      return {
        config:this.Config,
        tableData: [],
        container_height:400,
        padding: 40,
        settimeout_id:0,
        quote_lines: []
         }
    },
    props:{
        Config: {
            type: Object,
            required: true
        }
    },
    watch:{
      Config(v){
          if(v){
          }
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
                // defaultSort:{prop: 'quote_rule_key'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'lp',
                  label: this.$t('LP'),
                  width: 100,
                  sortable: true,
                  align: 'center',
                }
              },
              {
                attr: {
                  prop: 'bid_time',
                  label: this.$t('Time'),
                  width: 150,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'bid_size',
                  label: this.$t('Size'),
                  width: 100,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'bid',
                  label: this.$t('Bid'),
                  width: 100,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'bid',
                  className: 'positive'
                }
              },{
                attr: {
                  prop: 'price_diff',
                  label: '!',
                  width: 100,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'ofr',
                  label: this.$t('Ofr'),
                  width: 100,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'ofr',
                  className: 'negative'
                }
              },{
                attr: {
                  prop: 'ofr_size',
                  label: this.$t('Size'),
                  width: 100,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'ofr_time',
                  label: this.$t('Time'),
                  width: 150,
                  sortable: true,
                  align: 'center',
                }
              }
            ]
          }
        }
      }

    },
    methods: {
        render_lp_quotes(quotes,digits){
              this.tableData=[]; 
              var lp_quotes = this.get_lp_quote_dict(quotes); 
              console.log('ll',lp_quotes);
              var bid_prices = [];
              var ofr_prices = [];
              for(var k in lp_quotes){
                var lp_quote = lp_quotes[k];
                var opts = {
                    lp :  k,
                    bid_time: this.time_format(lp_quote.bid_time),
                    bid_size: lp_quote.bid_size || '-',
                    bid: this.num_format(lp_quote.bid_price, digits),
                    price_diff: this.num_format(lp_quote.ofr_price - lp_quote.bid_price, digits),
                    ofr: this.num_format(lp_quote.ofr_price, digits),
                    ofr_size: this.num_format(lp_quote.ofr_size, 0),
                    ofr_time: this.time_format(lp_quote.ofr_time)     
                };
                this.tableData.push(opts);
              };
              for(var i of quotes.bid){
                 bid_prices.push(i.price); 
              };
              for(var i of quotes.ofr){
                 ofr_prices.push(i.price);
              };     
              console.log('bid',bid_prices,ofr_prices);
              this.render_price_tr('Best',Math.max(...bid_prices),Math.min(...ofr_prices),digits);
              bid_prices.sort ((a,b)=>{
                return b-a;
              }) 
              ofr_prices.sort ((a, b)=>{
                return a-b;
              })
              this.render_price_tr('Second',bid_prices[1],ofr_prices[1],digits);
              this.render_price_tr('Median',this.get_median(bid_prices),this.get_median(ofr_prices),digits);
              this.update_lp_quotes_viewer(lp_quotes,digits);
        },
        render_price_tr(type,bid,ofr,digits){
          var row = {
              lp: type,
              bid_time: '',
              bid_size: '',
              bid: this.num_format(bid,digits),
              price_diff: this.num_format(ofr - bid, digits), 
              ofr: this.num_format(ofr, digits),
              ofr_size: '',
              ofr_time: '',
          }
          this.tableData.push(row);
        } ,
        update_lp_quotes_viewer(lp_quotes,digits){
                var $bid_div, $ofr_div, all_quotes, bid_text, bid_top, color, colors, div, i, j, len, lp, max_quote, min_quote, multiple, ofr_text, ofr_top, padding_left, px_per_pip, quote, ref, results, side, spread_pips;
                all_quotes = [];
                this.quote_lines=[];
                for (lp in lp_quotes) {
                  quote = lp_quotes[lp];
                  ref = ['bid', 'ofr'];
                  for (j = 0, len = ref.length; j < len; j++) {
                    side = ref[j];
                    if (quote[side + "_price"]) {
                      all_quotes.push(quote[side + "_price"]);
                    }
                  }
                }
                if (all_quotes.length === 0) {
                  return;
                }
                all_quotes.sort();
                min_quote = all_quotes[0];
                max_quote = all_quotes[all_quotes.length - 1];
                multiple = Math.pow(10, digits);
                spread_pips = parseInt((max_quote - min_quote) * multiple);
                px_per_pip = (this.container_height - this.padding * 2) / spread_pips;
                padding_left = 10;
                colors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF"];
                i = 0;
                 results = [];
                 for(lp in lp_quotes){
                        quote = lp_quotes[lp];
                        color = colors[i];
                        i += 1;
                         bid_top = this.padding + (max_quote - quote.bid_price) * px_per_pip * multiple;
                        ofr_top = this.padding + (max_quote - quote.ofr_price) * multiple * px_per_pip;
                        bid_text = lp + " " + (this.num_format(quote.bid_price, digits));
                        ofr_text = lp + " " + (this.num_format(quote.ofr_price, digits));
                        this.quote_lines.push({
                                  color,
                                  top:bid_top,
                                  text: bid_text
                                  });
                        this.quote_lines.push({
                                  color,
                                  top:ofr_top,
                                  text: ofr_text
                                  });

                 }
                 console.log('quote_lines',min_quote,max_quote,quote.bid_price,quote.ofr_price, px_per_pip,spread_pips,multiple,this.quote_lines);
        },
        update_lp_quotes(){
            var params = {
                  func_name: 'router_api.lp_get_quote',
                  args: [this.config.std_symbol]
            }
            CommonApi.postNormalAjax.call(this,params,data=>{
                    this.render_lp_quotes(data,this.config.digits);
                    this.settimeout_id = setTimeout(this.update_lp_quotes,3000);
            });
        },
       init(){
          this.render_lp_quotes(this.config.lp_quotes,this.config.digits);
          setTimeout(this.update_lp_quotes,3000);
    }
},
    mounted() {
        this.init();
    }, 
    destroyed(){
            if(this.settimeout_id){
              clearTimeout(this.settimeout_id);
            }
        },
}

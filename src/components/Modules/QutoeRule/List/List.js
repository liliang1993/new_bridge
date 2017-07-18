import {
    FormData1,
    DragDialog
} from 'common/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'user-list',
    components: {
        FormData1,
        DragDialog
    },
    data () {
      return {
        ruleDialog:{
              labelWidth: '160px',
              show:false,
              isModal: true,
              title:{
                text:'',
              }
        },
        tableData: [],
        default_value: {}
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
                  prop: 'source',
                  label: this.$t('source'),
                  minWidth: 120,
                  sortable: true,
                  // scopedSlot: 'date',
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'mt4_symbol',
                  label: this.$t('MT4 symbol'),
                  minWidth: 120,
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
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'type',
                  label: this.$t('type'),
                  width: 100,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.digits',
                  label: this.$t('Digits'),
                  width: 100,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.bid_delta',
                  label: this.$t('Bid Delta'),
                  minWidth: 80,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.ofr_delta',
                  label: this.$t('Ofr Delta'),
                  minWidth: 80,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.minimal_spread',
                  label: this.$t('Min Spread'),
                  minWidth: 100,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.maximal_spread',
                  label: this.$t('Max Spread'),
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.adjust',
                  label: this.$t('Adjust'),
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.aggregator',
                  label: this.$t('Aggregator'),
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: '',
                  label: this.$t('attributes'),
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              }
              ,{
                attr: {
                  // prop: 'address',
                  label: this.$t('Operation'),
                  minWidth: 120,
                  scopedSlot: 'handler',
                  align: 'center'
                }
              }
            ]
          }
        }
      },
      add_rule_fieldlist(){
        return [
                {
                    key: 'source',
                    type: 'select',
                    value: {
                        default: (() => {
                            if(this.$store.state.global.sources!=={}){
                                return this.$store.state.global.sources[0];
                            }
                            return '';
                        })(),
                        list: (() => {
                            var i, len, sources, source, result;
                            result = [];
                            sources = this.$store.state.global.sources;
                            for (i = 0, len = sources.length; i < len; i++) {
                                source = sources[i];
                                result.push({
                                    value: source,
                                    text: source
                                });
                            }
                            return result;
                        })()
                    },
                    // hidden: true,
                    desc: '请选择',
                    label: 'source'
                },
                {
                    key: 'mt4_symbol',
                    type: 'input',
                    value: '',
                    label: 'MT4 Symbol'
                },
                {
                    key: 'std_symbol',
                    type: 'select',
                    value: {
                        default: 'XAUUSD',
                        list:(() => {
                            var i, len, std_symbols, std_symbol, result;
                            result = [];
                            std_symbols = this.$store.state.global.std_symbols;
                            for (i = 0, len = std_symbols.length; i < len; i++) {
                                std_symbol = std_symbols[i];
                                result.push({
                                    value: std_symbol,
                                    text: std_symbol
                                });
                            }
                            console.log('result1111',result);
                            return result;
                        })()
                    },
                    desc: '请选择',
                    label: 'STD Symbol'
                },
                {
                    type:'input',
                    key:'digits',
                    value:'',
                    label: 'digits'
                },
                {
                    type:'input',
                    key:'minimal_spread',
                    value:'',
                    label: 'min spread'
                },
                {
                    type:'input',
                    key:'maximal_spread',
                    value:'',
                    label:'max spread'
                },{
                    key: 'aggregator',
                    type: 'select',
                    value: {
                        default: 'median',
                        list: [{
                            value: 'median',
                            text: 'median'
                        },{
                            value: 'bestright',
                            text: 'bestright'
                        },{
                            value: 'bestright-option',
                            text: 'bestright-option'
                        }]
                    },
                    desc: '请选择',
                    label: 'aggregator'
                },{
                    type:'input',
                    key:'adjust',
                    value:'',
                    label: 'adjust'
                },
                {
                    type:'input',
                    key:'markup',
                    value:'',
                    label: 'markup'
                },
                {
                    key: 'type',
                    type: 'selectInput',
                    value: {
                        default:  (() => {
                            if(this.$store.state.global.quote_types!=={}){
                                return this.$store.state.global.quote_types[0];
                            }else{
                              return '';
                            }
                        })(),
                        list: (() => {
                            var i, len, quote_types, quote_type, result;
                            result = [];
                           quote_types = this.$store.state.global.quote_types;
                            for (i = 0, len = quote_types.length; i < len; i++) {
                                quote_type = quote_types[i];
                                result.push({
                                    value: quote_type,
                                    text: quote_type
                                });
                            }
                            return result;
                        })()
                    },
                    desc: '请选择',
                    label: 'type'
                },
                {
                    type:'input',
                    key:'bid_delta',
                    hidden:true,
                    value:'',
                    label: 'bid_delta'
                },
                {
                    type:'input',
                    key:'ofr_delta',
                    hidden:true,
                    value:'',
                    label: 'ofr_delta'
                },
                {
                    type:'input',
                    key:'spread',
                    hidden:true,
                    value:'',
                    label: 'spread'
                },
                {
                    type:'input',
                    key:'asian_delta',
                    hidden:true,
                    value:'',
                    label: 'asian_delta'
                },
                {
                    type:'input',
                    key:'random',
                    value:'',
                    hidden:true,
                    label: 'random'
                }
            ]
      },
      edit_rule_fieldlist(){
        return [
                {
                    key: 'source',
                    type: 'input',
                    value: '',
                    label: 'Source'
                },
                {
                    key: 'mt4_symbol',
                    type: 'input',
                    value: '',
                    label: 'MT4 Symbol'
                },
                {
                    key: 'std_symbol',
                    type: 'input',
                    value: '',
                    label: 'STD Symbol'
                },
                {
                    type:'input',
                    key:'digits',
                    value:'',
                    label: 'digits'
                },
                {
                    type:'input',
                    key:'minimal_spread',
                    value:'',
                    label: 'min spread'
                },
                {
                    type:'input',
                    key:'maximal_spread',
                    value:'',
                    label:'max spread'
                },{
                    key: 'aggregator',
                    type: 'select',
                    value: {
                        default: 'median',
                        list: [{
                            value: 'median',
                            text: 'median'
                        },{
                            value: 'bestright',
                            text: 'bestright'
                        },{
                            value: 'bestright-option',
                            text: 'bestright-option'
                        }]
                    },
                    desc: '请选择',
                    label: 'aggregator'
                },{
                    type:'input',
                    key:'adjust',
                    value:'',
                    label: 'adjust'
                },{
                    key: 'type',
                    type: 'selectInput',
                    value: {
                        default:  (() => {
                            if(this.$store.state.global.quote_types!=={}){
                                return this.$store.state.global.quote_types[0];
                            }else{
                              return '';
                            }
                        })(),
                        list: (() => {
                            var i, len, quote_types, quote_type, result;
                            result = [];
                           quote_types = this.$store.state.global.quote_types;
                            for (i = 0, len = quote_types.length; i < len; i++) {
                                quote_type = quote_types[i];
                                result.push({
                                    value: quote_type,
                                    text: quote_type
                                });
                            }
                            return result;
                        })()
                    },
                    desc: '请选择',
                    label: 'type'
                },
                {
                    type:'input',
                    key:'bid_delta',
                    hidden:true,
                    value:'',
                    label: 'bid_delta'
                },
                {
                    type:'input',
                    key:'ofr_delta',
                    hidden:true,
                    value:'',
                    label: 'ofr_delta'
                },
                {
                    type:'input',
                    key:'spread',
                    hidden:true,
                    value:'',
                    label: 'spread'
                },
                {
                    type:'input',
                    key:'asian_delta',
                    hidden:true,
                    value:'',
                    label: 'asian_delta'
                },
                {
                    type:'input',
                    key:'random',
                    value:'',
                    hidden:true,
                    label: 'random'
                }
            ]
      }
    },
    methods: {
          onCloseRuleDialog(){
           this.ruleDialog.show = false;
         },
        onAddRule(){
                this.ruleDialog.title = this.$t('Add rule');
                this.ruleDialog.show= true;

        },
        onEditRule(row) {
          
        },
        get_attributes(data){
            var spec_attrs;
            spec_attrs ={};
            if(data.type = 'delta'){
                  spec_attrs ={
                        bid_delta: data.bid_delta,
                        ofr_delta: data.ofr_delta,
                        random: data.random
                  }
            }else if(data.type = 'asian'){
                  spec_attrs ={
                        asian_delta: data.asian_delta,
                        random: data.random
                  }
            }else if(data.type = 'spread'){
             spec_attrs ={ 
                  spread: data.spread,
                  random: data.random
                }
            }
        },
        onSubmit(data){
           if(this.ruleDialog.title == this.$t('Add rule')){
              var func_name = 'router_api.quote_add_rule';
           }else{
              var func_name = 'router_api.quote_update_rule';
           }
           var attributes = {
                              digits: parseInt(data.digits),
                              minimal_spread: parseInt(data.minimal_spread),
                              maximal_spread: parseInt(data.maximal_spread),
                              aggregator: data.aggregator,
                              adjust: parseInt(data.adjust)
                            }
           var args = [data.source,data.mt4_symbol,data.std_symbol,data.type,attributes];
           var params = {
              func_name,
              args
           }
           CommonApi.postFormAjax(params,data=>{
                this.onCloseRuleDialog();
                this.init();
           })
        },
        onDeleteQutoeRule(row){
                this.$confirm('Are you sure you want to detele this?', 'prompt', {
                    type: 'warning'
                }).then(() => {
                    var params = {
                        func_name: 'router_api.quote_del_rule',
                        args:[row.source,row.mt4_symbol],
                    }
                    CommonApi.postNormalAjax.call(this,params,data=>{
                        console.log(1000,data);
                        this.init();
                    });
                }).catch(() => {

                });
        },
        find_fieldlist(key){
          var i ,len1,field;
          for(i = 0,len1 = this.add_rule_fieldlist.length;i<len1 ; i++){
            field =  this.add_rule_fieldlist[i];
                if(key === field.key){
                    return field;
                }
          }
        },
        make_fields_hidden_or_show(opts,isHidden){
              var opts,field;
               opts.forEach(opt =>{
                          field = this.find_fieldlist(opt);
                          field.hidden = isHidden;
                    })  
        },
        onSelected(val){
              var  opts,all_opts,field;
               all_opts = ['bid_delta','ofr_delta','spread','asian_delta','random'];
               this.make_fields_hidden_or_show(all_opts,true);
              if(val =='delta'){
                  opts = ['bid_delta','ofr_delta','random'];
                  this.make_fields_hidden_or_show(opts,false); 
              }else if(val =='asian'){
                  opts = ['asian_delta','random'];
                  this.make_fields_hidden_or_show(opts,false); 
              }else if(val =='spread'){
                  opts = ['spread','random'];
                  this.make_fields_hidden_or_show(opts,false); 
              }
        },
        load_data(){
            var params = {
              func_name: 'router_api.quote_get_all_rules'
            }
            CommonApi.postNormalAjax.call(this,params,data=>{
                    data.sort(function(a, b) {
                    if (a.source > b.source) {
                        return 1;
                    } else if (a.source < b.source) {
                        return -1;
                    } else {
                        if (a.mt4_symbol > b.mt4_symbol) {
                            return 1;
                        } else if (a.mt4_symbol < b.mt4_symbol) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                });
                    this.tableData = data;
            });
        },
        init(){
            this.load_data();
        }
    },
    mounted() {
        this.init();
    }
}

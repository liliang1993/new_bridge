import {
    FormData,
    DragDialog
} from 'common/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'user-list',
    components: {
        FormData,
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
        
        default_value: {},
        rules: {
              mt4_symbol:{required: true, message: '此处不能为空', trigger: 'blur'},
              digits: [{required: true, message: '此处不能为空', trigger: 'blur'},
                          {
                                    trigger: 'blur',
                                    validator(rule, value, callback){
                                            console.log('coverage',value);
                                              if( !(Number(value) == value &&Number(value)%1 == 0) ){
                                                    callback(new Error('这里请填写整数类型'));
                                              }else if(Number(value)<0 || Number(value)>100){
                                                     callback(new Error('填写数字应该在0到100之间'));
                                              }else{
                                                      callback();
                                            }      
                                        }
                           }],
              minimal_spread:[{required: true, message: '此处不能为空', trigger: 'blur'},
                                       {
                                                trigger: 'blur',
                                                validator(rule, value, callback){
                                                        // console.log('coverage',value);
                                                        // var value = _this.form.attributes.coverage;
                                                        if(!value){
                                                                    callback(new Error('此处不能为空'));
                                                        }else if( !(Number(value) == value) ){
                                                                callback(new Error('这里请填写数字类型'));
                                                        }else if(Number(value)<0 || Number(value)>100){
                                                                 callback(new Error('填写数字应该在0到100之间'));
                                                        } else{
                                                                  callback();
                                                        }      
                                              }
                                       }],
             maximal_spread:  [ {required: true, message: '此处不能为空', trigger: 'blur'},
                                              {
                                                trigger: 'blur',
                                                validator(rule, value, callback){
                                                        console.log('coverage',value);
                                                        // var val = _this.form.attributes.coverage;
                                                        if(!value){
                                                                    callback(new Error('此处不能为空'));
                                                        }else if( !(Number(value) == value) ){
                                                                callback(new Error('这里请填写数字类型'));
                                                        }else if(Number(value)<0 || Number(value)>100){
                                                                 callback(new Error('填写数字应该在0到100之间'));
                                                        } else{
                                                                  callback();
                                                        }      
                                              }
                                       }],
            adjust:  [{required: true, message: '此处不能为空', trigger: 'blur'},
                          {
                                  trigger: 'blur',
                                  validator(rule, value, callback){
                                          console.log('coverage',value);
                                          // var val = _this.form.attributes.coverage;
                                          if(!value){
                                                      callback(new Error('此处不能为空'));
                                          }else if( !(Number(value) == value) ){
                                                  callback(new Error('这里请填写数字类型'));
                                          }else if(Number(value)<0 || Number(value)>100){
                                                   callback(new Error('填写数字应该在0到100之间'));
                                          } else{
                                                    callback();
                                          }      
                                }
                         }]

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
                defaultSort:{prop: 'std_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'source',
                  label: this.$t('source'),
                  minWidth: 180,
                  sortable: true,
                  // scopedSlot: 'date',
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'mt4_symbol',
                  label: this.$t('MT4 symbol'),
                  minWidth: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'std_symbol',
                  label: this.$t('STD symbol'),
                  minWidth: 180,
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
                  prop: 'bid_delta',
                  label: this.$t('Bid Delta'),
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'ofr_delta',
                  label: this.$t('Ofr Delta'),
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.minimal_spread',
                  label: this.$t('Min Spread'),
                  minWidth: 120,
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
              },{
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
      fieldlist(){
        return [
                {
                    key: 'source',
                    type: 'select',
                    value: {
                        default: 'risehills',
                        list: this.option.sources
                    },
                    // hidden: true,
                    desc: '请选择',
                    label: this.$t('source')
                },{
                    key: 'source',
                    type: 'input',
                    value: 'risehills',
                    label: this.$t('source'),
                    hidden: true
                },
                {
                    key: 'mt4_symbol',
                    type: 'input',
                    value: '',
                    label: this.$t('MT4 Symbol')
                },
                {
                    key: 'std_symbol',
                    type: 'select',
                    value: {
                        // default: 'true',
                        list:this.option.std_symbols
                    },

                    desc: '请选择',
                    label: this.$t('STD Symbol')
                },{
                    key: 'std_symbol',
                    type: 'input',
                    value: '',
                    label: 'STD Symbol',
                    hidden: true
                    
                },
                {
                    type:'input',
                    key:'digits',
                    value:'',
                    label: this.$t('digits')
                },
                {
                    type:'number',
                    key:'minimal_spread',
                    value:'',
                    label: this.$t('min spread')
                },
                {
                    type:'number',
                    key:'maximal_spread',
                    value:'',
                    label: this.$t('max spread')

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
                    type:'number',
                    key:'adjust',
                    value:'',
                    label: 'adjust'
                },{
                    key: 'type',
                    type: 'select',
                    value: {
                        default: 'raw',
                        list: this.option.quote_types
                    },
                    desc: '请选择',
                    label: this.$t('type')
                }
            ]
      },
      option(){
         var std_symbols =[];
         var sources =[];
         var quote_types = [];
         for(var std_symbol of this.$store.state.global.std_symbols){
              std_symbols.push({value:std_symbol,label:std_symbol});
            }
          for(var source of this.$store.state.global.sources){
            sources.push({value:source,text:source});
          }
          for(var quote_type of this.$store.state.global.quote_types){
            quote_types.push({value:quote_type,text:quote_type});
          }    
        return {std_symbols,sources,quote_types};
      }
    },
    methods: {
          onCloseRuleDialog(){
           this.ruleDialog.show = false;
         },
        onAddRule(){
                this.ruleDialog.title = this.$t('Add rule');
                this.ruleDialog.show= true;
                this.default_value = Object.assign({},{
                    source: this.$store.state.global.sources[0],
                    mt4_symbol:'',
                    std_symbol:this.$store.state.global.std_symbols[0],
                    digits:'',
                    minimal_spread:'',
                    maximal_spread:'',
                    aggregator:'median',
                    adjust:'',
                    type: this.$store.state.global.quote_types[0]
                });
                console.log('default_value',this.default_value);
                this.fieldlist.forEach(item=>{
                if(item.key == 'source'||item.key == 'std_symbol'){
                    item.hidden = item.type == 'select' ? false : true;
                
                }else if(item.key == 'mt4_symbol'){
                    item.disabled = false;
                }
            });
        },
        onEditRule(row) {
            this.rules.mt4_symbol = null;
            this.ruleDialog.show= true;
            this.ruleDialog.title= this.$t('Edit quote rule');
            this.fieldlist.forEach(item=>{
                if(item.key == 'source'||item.key == 'std_symbol'){
                    item.hidden = item.type == 'input' ? false : true;
                    item.disabled = true;
                }else if(item.key == 'mt4_symbol'){
                    item.disabled = true;
                }
            });
            Object.assign(this.default_value,row.attributes,{
                                                              source: row.source, 
                                                              std_symbol: row.std_symbol,
                                                              mt4_symbol: row.mt4_symbol,
                                                              type: row.type
                                                            });
        },
        onSubmit(data){
           if(this.ruleDialog.title == this.$t('Add rule')){
              var func_name = 'router_api.quote_add_rule';
           }else{
              var func_name = 'router_api.quote_update_rule';
           }
           var attributes = {
                              digits: Number(data.digits),
                              minimal_spread: Number(data.minimal_spread),
                              maximal_spread: Number(data.maximal_spread),
                              aggregator: data.aggregator,
                              adjust: Number(data.adjust)
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
        load_data(){
            var params = {
              func_name: 'router_api.quote_get_all_rules'
            }
            CommonApi.postNormalAjax.call(this,params,data=>{
                  this.tableData = data;
                });
        },
        init(){
            this.load_data();
        }
    },
    mounted() {
        this.init();
        console.log('555555555555555555555555',this.fieldlist)
    }
}

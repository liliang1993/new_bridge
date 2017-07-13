import store from 'store/';
    import {
        common as CommonApi
    } from 'config/request.js';
    module.exports = {
        name: 'addGroup',
        data(){
            return {
                form: this.GroupConfig,
                option:{
                       std_symbol:[],
                       lps: [], 
                       limit_order_types:[
                              {
                                input:{ key: ''},
                                checkbox:{key:'',text:'Instant'}
                              },{
                                 input:{ key:''},
                                checkbox:{key:'',text:'Market'}
                              },{
                                 input:{ key:''},
                                checkbox:{key:'',text:'Pending'}
                              },{
                                 input:{ key:''},
                                checkbox:{key:'',text:'Stopout'}
                              },{
                                  input:{ key:''},
                                checkbox:{key:'',text:'StopLoss'}
                              },{
                                input:{ key:''},
                                checkbox:{key:'',text:' TakeProfit'}
                              }
                            ],
                            slippages:[]
                },
                apis:{
                    func_name: "router_api.trade_add_rule"
                }              
              }
          },
          props:{
                GroupConfig:{
                    type: Object,
                    required: true
                }
          },
          watch:{
                // GroupConfig(v){
                //     if(v){
                //         console.log('daolaile',v);
                //         this.form= v;
                //     }
                // }
                GroupConfig : {
                     deep: true,
                     handler: function(val, oldVal) {
                          this.form = val;
                     }
                }
          },
          computed:{
              rules(){
                  var _this = this ;
                  return {      
                                group:[{required: true, message: '此处不能为空', trigger: 'blur'}],

                                mt4_symbol: [{required: true, message: '此处不能为空', trigger: 'blur'}],
                                route_type:[    
                                                       {
                                                              trigger: 'blur',
                                                              validator(rule, value, callback){    
                                                                          var val = _this.form.attributes.route_type.threshold;
                                                                          console.log('route_type',  _this.form.attributes.route_type.threshold);
                                                                           if(val === ''){
                                                                                  callback(new Error('此处不能为空，请填写不小于0的数字'))
                                                                          }else if(!_this.is_int(val)){
                                                                                  callback(new Error('这里请填写整数类型'));
                                                                          }else if(parseInt(val)<0){
                                                                                   callback(new Error('填写数字不能小于0'));
                                                                          } else{
                                                                                  callback();
                                                                          }   
                                                              }
                                                        }
                                                  ],
                                open_threshold:[  
                                                              {required: true, message: '此处不能为空', trigger: 'blur'},
                                                              {
                                                                  trigger: 'blur',
                                                                  validator(rule, value, callback){
                                                                          
                                                                          var val = _this.form.attributes.open_threshold;
                                                                          if(Number(val) != val){
                                                                                  callback(new Error('这里请填写数字类型'));
                                                                          }else if(Number(val)<0){
                                                                                   callback(new Error('填写数字不能小于0'));
                                                                          } else{
                                                                                  callback();
                                                                          }   
                                                                    }
                                                              }],
                                            
                                close_threshold:[{
                                                                  trigger: 'blur',
                                                                  validator(rule, value, callback){
                                                                          console.log('open_threshold',Number(_this.form.attributes.close_threshold));
                                                                          var val = _this.form.attributes.close_threshold;
                                                                          if(!val){
                                                                                  callback(new Error('此处不能为空，请填写不小于0的数字'))
                                                                          }else if(Number(val) != val){
                                                                                  callback(new Error('这里请填写数字类型'));
                                                                          }else if(Number(val)<0){
                                                                                   callback(new Error('填写数字不能小于0'));
                                                                          }else{
                                                                                    callback();
                                                                          }    
                                                                    }
                                                              }],
                                open_probe:[{
                                                                  trigger: 'blur',
                                                                  validator(rule, value, callback){
                                                                          console.log('open_threshold',Number(_this.form.attributes.open_probe));
                                                                          var val = _this.form.attributes.open_probe;
                                                                          if(!val){
                                                                                  callback(new Error('此处不能为空，请填写不小于0的数字'))
                                                                          }else if(Number(val) != val){
                                                                                  callback(new Error('这里请填写数字类型'));
                                                                          }else if(Number(val)<0){
                                                                                   callback(new Error('填写数字不能小于0'));
                                                                          }else{
                                                                                    callback();
                                                                          }    
                                                                     }
                                                              }],
                               close_probe:[{
                                                                  trigger: 'blur',
                                                                  validator(rule, value, callback){
                                                                          console.log('open_threshold',Number(_this.form.attributes.close_probe));
                                                                          var val = _this.form.attributes.close_probe;
                                                                          if(!val){
                                                                                  callback(new Error('此处不能为空，请填写不小于0的数字'));
                                                                          }else if(Number(val) != val){
                                                                                  callback(new Error('这里请填写数字类型'));
                                                                          }else if(Number(val)<0){
                                                                                   callback(new Error('填写数字不能小于0'));
                                                                          } else{
                                                                                    callback();
                                                                          }   
                                                                        }
                                                              }],
                               better_fill:[
                                      {required: true, message: '此处不能为空', trigger: 'blur'}
                                      

                               ],
                               coverage:[
                                  {required: true, message: '此处不能为空', trigger: 'blur'},
                                  {
                                        trigger: 'blur',
                                        validator(rule, value, callback){
                                                var val = _this.form.attributes.coverage;
                                                if( !_this.is_int(val) ){
                                                        callback(new Error('这里请填写整数类型'));
                                                }else if(Number(val)<0 || Number(val)>100){
                                                         callback(new Error('填写数字应该在0到100之间'));
                                                } else{
                                                          callback();
                                                }      
                                            }
                                  }
                               ],
                               limit_order_types:{
                                                trigger: 'blur',
                                                validator(rule, value, callback){
                                                        var val =  _this.setLimitOrderTypesToArray();
                                                        if(val.length<=0){
                                                            callback(new Error('此处不能为空')) ; 
                                                        }else{
                                                               for(var item of val ){
                                                                   if( !_this.is_int(item.tol) ){
                                                                          callback(new Error('填写的数字应为整数')) ; 
                                                                          break;         
                                                                    } 
                                                              } 
                                                              callback();    
                                                        }    
                                                  }
                                            },
                               slippages:{
                                  trigger: 'submit',
                                          validator(rule, value, callback){
                                                var val = _this.setSlippagesToArray() ;
                                                console.log('slippages_valid',val);
                                                if(val.length <= 0){
                                                            callback();
                                                            return;
                                                }
                                                for(var [min_size, min_slippage, max_slippage]  of val){                                                        
                                                        if(isNaN(min_size)){
                                                                callback( new Error('此处不能为空') ) ;
                                                        }else if( !(  _this.is_int(min_slippage)  &&  _this.is_int(max_slippage) ) ){
                                                                 callback( new Error('Max sllipage and min sllipage should be integer') ) ;
                                                        }else if(min_size < 0 || min_slippage < 0 || max_slippage < 0){
                                                                  callback( new Error('Min size should greater than 0') );
                                                        }else if( min_slippage > max_slippage){
                                                                  callback( new Error('Max size should greater or equal with min size') );
                                                        }else{
                                                                  callback();
                                                        }
                                                  }  
                                            }
                                    }
                        }
                  }
          },
          methods:{
                  removeSlippages(item){
                      var index = this.option.slippages.indexOf(item)
                     if (index !== -1) {
                         this.option.slippages.splice(index, 1)
                        }
                  },
                  addSlippages(){
                      this.option.slippages.push(
                      {
                          min_size: {
                                    value:'',
                                    playholder: '>= size'
                          },
                          min_slippage:{
                                    value:'',
                                    playholder: 'min slsippage'
                          },
                          max_slippage:{
                                    value:'',
                                    playholder: 'max slsippage'
                          }
                      });
                  },
                  
                  setLimitOrderTypesToArray(){
                      var temp =[]; 
                      this.option.limit_order_types.forEach(item=>{
                                  if(item.checkbox.key===true){
                                      var opt ={};
                                      opt.type = this.option.limit_order_types.indexOf(item);
                                      opt.tol = Number(item.input.key);
                                      temp.push(opt);
                                  }
                      });
                        return temp;
                  },
                   setArrayToLimitOrderTypes(){
                      if(this.form.attributes.limit_order_types.length <= 0){
                        return;
                      }
                      for(var item of this.form.attributes.limit_order_types){
                            this.option.limit_order_types[item.type].checkbox.key= true;
                            this.option.limit_order_types[item.type].input.key = item.tol;
                      }
                  },
                  setLPsToArray(){
                      var temp = [];                    
                      this.option.lps.forEach(item=>{
                        if(item.key===true){
                            temp.push(item.label);
                        }
                      });
                      return temp;
                  },
                  setArrayToLPs(){
                      for(var item of this.form.attributes.lps){
                          for(var list of this.option.lps){
                              if(item ==list.label){
                                  list.key = true;
                                  break;
                              }
                          }
                      }
                  },
                  setSlippagesToArray(){
                    var temp = [];
                    for (var group of this.option.slippages){
                        var   list=[];
                        console.log('optionsli',this.option.slippages);
                          for(var key in group){
                                list.push(Number(group[key].value) );
                          }

                          temp.push( list);
                      }
                      return temp;
                  },
                  setArrayToSlippages(){
                      if(this.form.attributes.slippages.length <= 0){
                        return;
                      }
                      for(var group of this.form.attributes.slippages){
                           for(var item of group){
                                var slippage ={
                                    min_size: {
                                              value: item[0],
                                              playholder: '>= size'
                                    },
                                    min_slippage:{
                                              value: item[1],
                                              playholder: 'min slsippage'
                                    },
                                    max_slippage:{
                                              value: item[2],
                                              playholder: 'max slsippage'
                                    }
                                };
                                this.option.slippages.push(slippage);
                          } ;
                      };
                  },
                  getTradeRulesFormToObject(){
                      var trade_rules_form = {};  
                      trade_rules_form.route_type= { 
                          left: this.form.attributes.route_type.left,
                          right: this.form.attributes.route_type.right, 
                          threshold: this.form.attributes.route_type.threshold
                        },
                        trade_rules_form.coverage= Number(this.form.attributes.coverage);
                        trade_rules_form.better_fill= Number(this.form.attributes.better_fill);
                        trade_rules_form.open_partial=Boolean(this.form.attributes.open_partial);
                        trade_rules_form.open_lp_rejected_retry= Boolean(this.form.attributes.open_lp_rejected_retry);
                        trade_rules_form.open_threshold= Number(this.form.attributes.open_threshold);
                        trade_rules_form.open_probe= Number(this.form.attributes.open_probe);
                        trade_rules_form.close_threshold= Number(this.form.attributes.close_threshold);
                        trade_rules_form.close_probe= Number(this.form.attributes.close_probe);
                        trade_rules_form.limit_order_types=  this.setLimitOrderTypesToArray();
                        trade_rules_form.lps =  this.setLPsToArray();
                        trade_rules_form.bbook_exec_type= this.form.attributes.bbook_exec_type;
                        trade_rules_form.slippages = this.setSlippagesToArray();
                        return  trade_rules_form;
                  },
                 onSubmit(ref){
                        // this.check_trade_rule_attrs();
                        this.$refs[ref].validate((valid) => {
                        if (valid) {
                            var attributes = this.getTradeRulesFormToObject();
                            console.log('form',this.form);
                            this.$emit('onSubmit',{
                              source: this.form.source,
                              group:this.form.group,
                              mt4_symbol: this.form.mt4_symbol,
                              std_symbol: this.form.std_symbol,
                              attributes});
                        }
                    });  
                  },
                  init(){
                      for(var std_symbol of store.state.global.std_symbols){    
                          this.option.std_symbol.push({value: std_symbol, label: std_symbol}); 
                      };
                      for(var lp of store.state.global.lps){    
                          this.option.lps.push({key:false, label: lp}); 
                      };
                      if(this.form.std_symbol == ''){
                       this.form.std_symbol = this.option.std_symbol[0].value;
                      };
                       this.setArrayToLimitOrderTypes();
                       this.setArrayToLPs();
                       this.setArrayToSlippages();
                  }
        },
        mounted() {
              this.init();
              console.log('form1',this.form);
        }
}



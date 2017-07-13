import {
    DragDialog
} from 'common/';
import {
    common as CommonApi
} from 'config/request.js';
import ViewGroup from '../Group/';
import Vue from 'vue';
module.exports = {
    name: 'user-list',
     components: {
        DragDialog,
        ViewGroup
    },
    data () {
      return {
        batch_edit_flag:false,
        batch_flag: true,
        batch_datas: [],
        keyword: '',
        tableData: this.ViewRule,
        columns: [
              {
                attr: {
                  type: 'selection',
                  width: 60,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'mt4_sybol',
                  label: this.$t('MT4 symbol'),
                  width: 90,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'std_symbol',
                  label: this.$t('STD symbol'),
                  width:90,
                  sortable: true,
                  align: 'center',
                }
              },
              {
                attr: {
                  prop: 'route',
                  label: this.$t('Route'),
                  width: 120,
                  sortable: true,
                  align: 'center',
                  formatter: function(item){
                  return    ">="+item.attributes.route_type.threshold+' '+item.attributes.route_type.right+'  else  '+item.attributes.route_type.left;
                  }
                }
              },{
                attr: {
                  prop: '',
                  label: this.$t('Limit orders types'),
                  width: 150,
                  sortable: true,
                  align: 'center',
                  scopedSlot: 'limit_order_types_normal'
                }
              },{
                attr: {
                  prop: 'attributes.coverage',
                  label: this.$t('Coverage'),
                  width: 100,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'attributes.better_fill',
                  label: this.$t('BetterFill'),
                  width: 100,
                  sortable: true,
                  align: 'center'
                  // scopedSlot:'123',
                }
              },{
                attr: {
                  prop: 'attributes.slippages',
                  label: this.$t('slippages'),
                  width: 80,
                  sortable: true,
                  align: 'center',
                  formatter: function(item){
                    var res = '';
                    item.attributes.slippages.forEach(group=>{
                      res +=group.join(',')+'\n';
                    });
                    return res;
                  },
                  scopedSlot:'slippages_normal'
                }
              },{
                attr: {
                  prop: 'attributes.open_partial',
                  label: this.$t('Open Partial'),
                  minWidth: 100,
                  sortable: true,
                  align: 'center',
                  formatter: function(item){
                    return String(item.attributes.open_partial);
                  },
                  // scopedSlot:''
                }
              },{
                attr: {
                  prop: 'attributes.open_lp_rejected_retry',
                  label: this.$t('LP Rejected Retry'),
                  width: 120,
                  sortable: true,
                  align: 'center',
                  formatter: function(item){
                    return item.attributes.open_lp_rejected_retry == true ? 'true' : 'false';
                  },
                  scopedSlot:''
                }
              },{
                attr: {
                  prop: 'attributes.bbook_exec_type',
                  label: this.$t('BBook Exec Type'),
                  width: 120,
                  sortable: true,
                  align: 'center',
                  // scopedSlot:''
                }
              },{
                attr: {
                  prop: 'attributes.lps',
                  label: this.$t('LPs'),
                  minWidth: 60,
                  sortable: true,
                  align: 'center',
                  formatter(item){
                    var res ='';
                    if(item.attributes.lps.length!==0){
                      return item.attributes.lps.join(',');
                    }else{
                      return 'ALL'
                    }
                  },
                  // scopedSlot:''
                }
              },{
                attr: {
                  // prop: 'bbook_exec_type',
                  label: this.$t('Operation'),
                  minWidth: 80,
                  // sortable: true,
                  align: 'center',
                  scopedSlot:'handler'
                }
              }
            ] 
        // columns:
      }
    },
    props:{
        ViewRule : {
              type: Array,
              required: true
        }
    },
    watch:{
        ViewRule(v){
            if(v){
            var j,row,limit_order_type,limit_order_type;
            this.tableData =v; 
            }
        }   ,
        columns(v){
            if(v){
            console.log('v1111',v); 
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
                defaultSort:{prop: 'group'}
              }
            },
            columns: this.columns
          }
        }
      }
    },
    methods: {
    	handleIconClick(){

    	},
       combineSourceandGroup(data){
                 var temp =[];
                  for(var rule of data){
                        if(temp.length > 0){
                            var flag = false;
                            for(var item of temp){            
                                      if(item[0].source ==rule.source && item[0].group == rule.group){
                                            flag = true;
                                            item.push(rule);
                                            break;
                                      }
                                }
                                if(flag == false){
                                  temp.push([item])
                                }
                        }else{
                             temp.push([item])
                        }
                   };
                   return temp;
       },
       onAddRule(){
          this.$emit('onAddRules',{source: this.tableData[0].source,group: this.tableData[0].group});
       },
       onEditRowRule(row){
          var config = Object.assign({},this.RuleConfig,row,{type:'edit'});
          this.$emit('onEditRowRules',config);
       },
       onEditRules(){        
          this.batch_edit_flag=true;
          console.log('1234');
          Object.assign(this.columns[3].attr,{scopedSlot:'route_type',prop:''});
          Object.assign(this.columns[4].attr,{scopedSlot:'limit_order_types_edit',prop:''});
          Object.assign(this.columns[5].attr,{scopedSlot:'coverage',prop:''});
          Object.assign(this.columns[6].attr,{scopedSlot:'better_fill',prop:''});
          Object.assign(this.columns[8].attr,{scopedSlot:'open_partial',prop:''});
          Object.assign(this.columns[10].attr,{scopedSlot:'bbook_exec_type',prop:''});
          // this.$set(this.columns,3,{attr:route_type});
          // this.$set(this.columns,4,{attr:limit_order_types});
          // this.$set(this.columns,5,{attr:coverage});
          // this.$set(this.columns,6,{attr:better_fill});
          // this.$set(this.columns,8,{attr:open_partial});
          // this.$set(this.columns,10,{attr:bbook_exec_type});
       },


       onBackNormalRules(){
           Object.assign(this.columns[5].attr,{label:'abc',scopedSlot:void 0,prop:'attributes.coverage'});
           this.$forceUpdate();
           // this.$set(this.columns,5,{
           //      attr: {
           //        prop: 'attributes.coverage',
           //        label: 'abc',
           //        width: 100,
           //        sortable: true,
           //        align: 'center'
           //      }
              // });
           console.log('columns',this.columns);
       },
  
      onSubmitChanges(){
          // var row,item
          // if(!this.batch_edit_flag){
          //   return;
          // }
          // var args = [];
          // for(row of this.tableData){ 
          //   var limit_order_types = [];
          //   for(item of row.convert_limit_order_types){
          //           if(!item.type|| item.tol ===''){
          //             break;
          //           } 
          //          limit_order_types.push({type:item.type,tol:item.tol});;       
          //       };
          //       Object.assign(row.attributes,{limit_order_types});
          //        args.push({source:row.source,
          //                   mt4_symbol:row.mt4_symbol,
          //                   std_symbol:row.std_symbol,
          //                   group:row.group,
          //                   attributes:row.attributes});
          //       };

          //       var params ={
          //         func_name: 'router_api.trade_add_rules',
          //         args:[args]
          //       }
          //       CommonApi.postFormAjax.call(this,params,data=>{
          //                 console.log('12341215');
          //                 this.onBackNormalRules();
          //                 this.$emit('onSubmitChanges',args);
          //       });
                 this.onBackNormalRules();

      },

    	onInvertSelect(){
    	    	this.toggleSelection(this.tableData);
    	    },

    	onSingleDelete(row){
    		this.$confirm('你确定删除吗', 'prompt', {
    	                    type: 'warning'
    	               }).then(() => {
    	               	this.$emit('onSingleDeleteRule',row);	
    	                }).catch(() => {

    	                });
    	},
    	onSingleDeleteRule(row){
              for(var i = o; i<this.tableData.length;i++){
                  var rule = this.tableData[i];
                  if(row.mt4_symbol === rule.mt4_symbol){
                        this.tableData.splice(i,1);
                  };
              }
    	},


    	toggleSelection(rows) {
    	        if (rows) {
                console.log('22222');
    	          rows.forEach(row => {
                  console.log('555', this.$refs.table);
    	            this.$refs.table.toggleRowSelection(row);
    	          });
    	        } else {
    	          this.$refs.table.clearSelection(row)
    	        }
    	      },
    	onSelectionChange(val){
            if (val.length) {
                this.batch_flag = false;
                this.batch_datas = val;
            } else {
                this.batch_flag = true;
            }
    	},
      onBatchDelete(){
        this.$confirm('你确定删除吗', 'prompt', {
                          type: 'warning'
                     }).then(() => {
                      this.$emit('onBatchDeleteRule',this.batch_datas); 
                      }).catch(() => {

                      });
      }
    },
    mounted(){
      
    }
  }

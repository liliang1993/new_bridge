import {
    DragDialog,
    FormData1
} from 'common/';
import Vue from 'vue';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'remark',
    components: {
        DragDialog,
        FormData1
    },
    data(){
      return{
          remark_dialogs : {},
      }
    },
    computed:{
      fieldlist(){
        return[
         {
            key: 'source',
            type: 'select',
            value: {
                default: '',
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
            desc: '请选择',
            label: 'Source'
        },
        {
            type: 'input',
            key: 'group',
            value: '',
            label: 'Group'
        },
        ]
      },
      getRemarkDialog(){
          return this.$store.state.traderule.copy_to_new_group_dialogs;
        }
    },
    methods:{
      closeDialog(key){
            this.$store.dispatch('delete_copy_to_new_group_dialogs',key);  
      },
      onSubmit(data, key) {
                

                  // if (group === "" || group === r.group) {
                    
                  //   return false;
                  // };
                  var new_rules = [];
                  var ref = this.$store.state.traderule.trade_rules;
                  for(var i = 0;i<ref.length; i++ ){
                      var rule = ref[i];
                      var source =  this.$store.state.traderule.copy_to_new_group_dialogs[key].source;
                      var group =  this.$store.state.traderule.copy_to_new_group_dialogs[key].group;
                      if(rule.source === source && rule.group === group ){
                        console.log('this',this,rule);
                          var new_rule = rule;
                          new_rule.source =data.source;
                          new_rule.group = data.group;
                          new_rules.push(new_rule);
                      }
                  }
                  var params = {
                          func_name: "router_api.trade_add_rules",
                          args: [new_rules]
                  }
                  CommonApi.postFormAjax.call(this, params, data => {
                          this.closeDialog(key);
                          this.$store.dispatch('update_traderule_table',true);
                  },{
                    errFn(err){
                      console.log(' chucuole ');
                         this.$message({
                              showClose: true,
                              message:  err.response.data,
                              type: 'error'
                            });
                    }
                  });
      }
    },
    mounted(){
          
        },
    watch:{
        getRemarkDialog:{
          // if(v){
          //    this.remark_dialogs = v; 
          //    console.log('00000000000',v);
          // }
          deep: true,
          handler:function(val,oldval){

               console.log('00000000000',val,this.$store.state);
          }
        }
    }

}

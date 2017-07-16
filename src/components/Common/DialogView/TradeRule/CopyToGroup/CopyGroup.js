import {
    DragDialog,
    FormData1
} from 'common/';
import Vue from 'vue';
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
            label: 'source'
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
                  var source = data.source;
                  var group = data.group;
                  if (group === "" || group === r.group) {
                    alert("Group invalid");
                    return false;
                  };
                  var new_rules = [];
                  var ref = this.$store.state.gloabl.trade_rules;
                  for(var i = 0;i<ref.length; i++ ){
                      rule = ref[i];
                      var source =  this.$store.state.traderule.copy_to_new_goup[key].source;
                      var group =  this.$store.state.traderule.copy_to_new_goup[key].group;
                      if(rule.source === source && rule.group === group ){
                          var new_rule = this.deepCopy(rule);
                          new_rule.source = source;
                          new_rule.group = group;
                          new_rules.push(new_rule);
                      }
                  }
                  var params = {
                          func_name: "router_api.trade_add_rules",
                          args: [data.group, data.remark]
                  }
                  CommonApi.postFormAjax.call(this, params, data => {
                          closeDialog(key);
                          this.$store.dispatch('update_traderule_remark');
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

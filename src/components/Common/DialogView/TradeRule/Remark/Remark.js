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
                type: 'input',
                key: 'remark',
                value: '',
                label: 'Remark'
            },
        ]
      },
      getRemarkDialog(){
          return this.$store.state.traderule.remark_dialogs;
        }
    },
    methods:{
      close_remark_dialog(key){
        var type = typeof key;
          console.log('key',type);
          console.log('66666',this.remark_dialogs);
            this.$store.dispatch('delete_remark_dialogs',key);  
      },
      onRemarkSubmit(data, key) {
                  // var params = {
                  //         func_name: "trade_rule_remark.update_remark",
                  //         args: [data.group, data.remark]
                  // }
                  // CommonApi.postFormAjax.call(this, params, data => {
                  //         close_remark_dialog(key);
                  //         this.$store.dispatch('update_traderule_remark');
                  // });
                  console.log('66666',this.remark_dialogs);
                  this.remark_dialogs =Object.ossign({},this.$store.state.traderule.remark_dialogs);
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

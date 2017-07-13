import {
    FormData,
    DragDialog
} from 'common/';
module.exports = {
    name: 'copy-group',
    components: {
        FormData,
        DragDialog
    },
    data () {
      return {
                    tableData: this.TableData,
                    labelWidth: this.LabelWidth, 
                    fieldlist: [ {
                          key: 'source',
                          type: 'select',
                          label: this.$t('Source'),
                          value: {
                              default: 'risehills',
                              list: [{
                                  value: 'risehills',
                                  text: 'risehills'
                              }, {
                                  value: 'solid',
                                  text: 'solid'
                              }]
                          }
                        },{
                          type:'input',
                          key:'group',
                          value:'',
                          label: this.$t('Group')
                      }],
                    default_value: this.DefaultValue,
                    rules: {
                            group:[ {required: true, message: '此处不能为空', trigger: 'blur'},
                              {
                                  trigger: 'blur',
                                  validator:(rule, value, callback)=>{
                                          console.log('1234',this.$refs['form-data'].submit_data,this.tableData);
                                          if(this.is_exist_group(this.$refs['form-data'].submit_data) ){
                                                   callback(new Error('Group invalid'));
                                          }else{
                                                  callback();
                                          }
                                }
                          }]
                    }
              } 
      },
    computed: {
      },
      props:{
             TableData :{
                    type: Array,
                    required: true
             } ,
             DefaultValue:{
                    type: Object,
                    required: true
             }
      },
      watch:{
             TableData(v) {
                  if (v) {
                      this.tableData= v;
                  }
              },
             DefaultValue(v){
                   if (v) {
                      this.default_value= v;
                  }
             } 
      },
    methods: {       
              is_exist_group(submitData){
                    for(var row of this.tableData){
                          if(submitData.source == row .source && submitData.group == row.group){
                                  return true;
                          }
                    }
                    return false;
              },
              onSubmit(data,index){
                           this.$emit( 'onSubmit' , data);
              },
              init(){
                   // this.rules = Object.assign({},this.rules, this.Rules);
              }
    },
   mounted() {
   console.log('RUles',this.Rules);
            this.init();
            console.log('grouprules',this.rules);
    }
}

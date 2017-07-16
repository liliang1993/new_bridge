module.exports = {
    name: 'list',
    data() {
        return {
            left_options:[
              {
                value: 'best',
                label: 'best'
              },
              {
                value: 'bestright',
                label: 'bestright'
              },
              {
                value: 'second',
                label: 'second'
              },
              {
                value: 'ratio',
                label: 'ratio'
              }
            ],
            right_options:[
              {
                value: 'best',
                label: 'best'
              },
              {
                value: 'bestright',
                label: 'bestright'
              },
              {
                value: 'second',
                label: 'second'
              },
              {
                value: 'ratio',
                label: 'ratio'
              }
            ],
            input_group:[],
            checkall_temp: '_checkall_temp',
            label_width: this.LabelWidth,
            fields: this.FieldList,
            editor: this.Editor ,
            rules: this.Rules ,
            submit_data: this.DefaultValue
        }
    },
    methods: {
        /**
         * 从字段列表中提取出来表单字段
         * @return {object} [表单需要的字段]
         */
        deepObj() {
         var len;
            if (this.fields) {
                var fields = this.fields,
                    k = 0,
                    update = this.submit_data.id ? true : false;
                for (var i = 0;i <fields.length; i++){
                    var field = fields[i];
                    if (field.value && field.value.constructor === Object) {
                        if (field.checkall && typeof field.checkall === 'object') {
                            var temp = {};
                            temp.text = field.checkall.text;
                            temp.value = field.checkall.value;
                            temp.indeterminate = field.checkall.indeterminate;
                            temp.checkbox_list = field.value.list;
                            temp.checkbox_value = field.value.default;
                            this.$set(this.submit_data, field.key , temp);
                        } else {
                            this.$set(this.submit_data, field.key, field.value.default);
                        }
                    } else {
                        this.$set(this.submit_data, field.key, field.value);
                    }
                    var _this = this;
                    if (field.type) {
                        switch (field.type) {
                        case 'editor':
                          k++;
                          this.initEditor(field.id, field.config || {});
                          if (k == 2) {
                            this.wangEditor.many = true;
                          }
                          if (k == 1) {
                            this.wangEditor.has = true;
                          }
                          break;
                          case 'CheckboxAndInputList': 
                                this.$set(this.submit_data,field.key,[]);
                                for(var j = 0;j < field.spec.length;j++){
                                       this.submit_data[field.key].push({
                                            checked : false,
                                            tol: '',
                                            type: j
                                       });
                                };
                                // if(field.default){
                                //         for(var j = 0; j < field.default.length; j++){
                                //               var  checkbox = field.default[j];
                                //               var index = field.spec.indexOf(checkbox);
                                //               if(index!=-1){
                                //                       var obj = {
                                //                             checkbox: true,
                                //                             tol: 
                                //                             type: index
                                //                       }
                                //               }
                                //         }
                                // }
                                break;
                          case 'MultipleInput':
                                 this.$set(this.submit_data,field.key,[]);
                                  for(var m = 0; m< field.spec.length ; m++){
                                            this.input_group[m] = '';
                                  };
                              break;
                          case 'RouteType':
                              this.$set(this.submit_data,field.key,{});
                              this.$set(this.submit_data[field.key],'threshold' , '0');
                              this.$set(this.submit_data[field.key],'right' , '');
                              this.$set(this.submit_data[field.key],'left' , '');
                              if(field.default){
                                  for(var attr in field.default){
                                    this.$set(this.submit_data[field.key],attr,field.default[attr]);
                                  }
                              }
                            break;
                    }
                  }
                }
          }
        },
        onresetFields(){
            this.$refs['form-data'].resetFields();
        },
        /**
         * 表单提交事件
         */
        
        get_checked_list_val(key){
                var list_value, val_type,val_tol,val; 
                list_value= {};
                val = [];
                for(var i =0 ;i<this.submit_data[key].length; i++){
                      var list = this.submit_data[key][i];
                      if(list.checked === true){
                                val_type = i ;
                                val_tol = list.tol ==='' ? "0" :list.tol;
                                val.push({
                                      type:  val_type,
                                      tol: parseInt(val_tol)
                                });
                      };
                }
                return val;
        },
        onSubmit(ref){
            var res={};
            for(var field of this.fields){
                var key = field.key;
                var data = this.submit_data[key];
                switch(field.type){
                  case 'int':
                      res[key] = parseInt(data);
                      break;
                  case 'float':
                      res[key] = parseFloat(data);
                      break;
                  case 'MultipleInput':
                        res[key] = [];
                      for(var i = 0;i<data.length;i++){
                          var input_val,group_values;
                            var input_group = data[i];
                            group_values= [];
                            for(var j = 0; j < input_group.length; j++){
                                      var val = input_group[j] ;
                                      if(field.spec[j].type ==='int'){  
                                         input_val = parseInt(val);
                                      }else if (field.spec[j].type === 'float') {
                                        input_val = parseFloat(val);

                                      } else if (field.spec[j].type === 'string') {
                                         input_val  = val;
                                      }
                                      group_values.push( input_val );
                            }
                            res[key].push(group_values);
                    }  
                     console.log('11111', res[key]);
                    break;  
                    case  'CheckboxAndInputList' :
                       res[key] = this.get_checked_list_val(key);
                        break;
                    default : 
                              res[key] = data;
                              break;
                }
            }
            console.log('submit',res);
              res= Object.assign({},this.submit_data,res);
            if (this.rules) {
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.$emit('onSubmit', res);
                    }
                });
            } else {
                this.$emit('onSubmit', res);
            }
        },
        //MultipleInput  
        //add event
        onAddInputGroup(key){
            var group_value = this.input_group.slice(0);
            this.submit_data[key].push(group_value);
            console.log('this.input_group',this.input_group,key,this.submit_data[key]);
        },

        //del event
        onRemoveInputGroup(key,index){
            this.submit_data[key].splice(index,1);
        },

        onCheckboxChange(key) {
            var checkall_temp = this.submit_data[key];

            if (checkall_temp.checkbox_value.length > 0 && checkall_temp.checkbox_value.length < checkall_temp.checkbox_list.length) {
                checkall_temp.indeterminate = true;
            } else {
                checkall_temp.indeterminate = false;
            }

            checkall_temp.value = checkall_temp.checkbox_value.length === checkall_temp.checkbox_list.length;
        },


        onCheckallChange(key) {
            var checkall_temp = this.submit_data[key];
            checkall_temp.indeterminate = false;

            var value = [];
            if (checkall_temp.value == true) {
                for (var i = 0; i < checkall_temp.checkbox_list.length; i++) {
                    value.push(checkall_temp.checkbox_list[i].value);
                }
            }

            checkall_temp.checkbox_value = value;
        }
    },
    /**
     * ready
     */
    created(){
      console.log('submit_data',this.DefaultValue);
        this.deepObj();
    },
    mounted(){
      // console.log('8888888',this.DefaultValue);
    },

    /**
     * 接收参数
     * @type {Object}
     */
    props: {
        FieldList: {
            type: Array,
            required: true
        },
        Editor: {
            type: Object,
            default: function(){
              return  {};
            }
        },
        Rules: {
            type: Object,
            default: function(){
              return  {};
            }
        },
        DefaultValue: {
            type: Object,
            default: function(){
              return  {};
            }
        },
        LabelWidth: {
            type: String,
            default: ''
        }
    },


    /**
     * 监控参数
     * @type {Object}
     */
    watch: {
        FieldList:{
           deep: true,
           handler: function(val, oldVal){
              this.fields =val;
              console.log('FieldList',val);
           }
        },
        // DefaultValue:{
        //    deep: true,
        //    handler: function(val, oldVal){
        //       console.log('default',val,oldVal);
        //    }
        // },
        DefaultValue(v) {
      if (v) {
        // this.submit_data = v;
        console.log('default55555555555',v);
      }
    },
        // DefaultValue: {
        //      deep: true,
        //      handler: function(val, oldVal) {
        //         console.log('default',val,oldVal);
        //      }
        // },
        Rules: {
             deep: true,
             handler: function(val, oldVal) {
                this.rules = val; 
             }
        },
    }
}

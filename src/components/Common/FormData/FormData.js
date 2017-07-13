module.exports = {
    name: 'list',
    data() {
        return {
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
            if (this.fields) {
                var fields = this.fields,
                    k = 0,
                    update = this.submit_data.id ? true : false;
                for (var i = 0; i < fields.length; i++) {
                    var field = fields[i];

                    if (field.value && field.value.constructor === Object) {
                        if (field.checkall && typeof field.checkall === 'object') {
                            var temp = {};
                            temp.text = field.checkall.text;
                            temp.value = field.checkall.value;
                            temp.indeterminate = field.checkall.indeterminate;
                            temp.checkbox_list = field.value.list;
                            temp.checkbox_value = field.value.default;
                            this.$set(this.submit_data, field.key + this.checkall_temp, temp);
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
        onSubmit(ref) {
            var data = this.submit_data;
            console.log('submit',data);
            if (this.rules) {
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.$emit('onSubmit', data);
                    }
                });
            } else {
                this.$emit('onSubmit', data);
            }
        },


        onCheckboxChange(key) {
            var checkall_temp = this.submit_data[key + this.checkall_temp];

            if (checkall_temp.checkbox_value.length > 0 && checkall_temp.checkbox_value.length < checkall_temp.checkbox_list.length) {
                checkall_temp.indeterminate = true;
            } else {
                checkall_temp.indeterminate = false;
            }

            checkall_temp.value = checkall_temp.checkbox_value.length === checkall_temp.checkbox_list.length;
        },


        onCheckallChange(key) {
            var checkall_temp = this.submit_data[key + this.checkall_temp];
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
    mounted() {
        // this.deepObj();
        console.log('FieldList',this.FieldList);
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
             console.log('val',val);
              this.fields =val;
           }
        },
        'FieldList.label':  (val ,oldVal)=>{
              console.log('label',val,oldVal);
        },
        // FieldList(v) {
        //     if (v) {
        //         this.fields = v;
        //     }
        // },
        //  DefaultValue(v) {
        //     if (v) {
        //         this.submit_data = v;
        //          console.log('2011',this.submit_data); 
        //     }
        // }
        DefaultValue: {
             deep: true,
             handler: function(val, oldVal) {
                console.log('val',val,oldVal);
                this.submit_data = val;
                 console.log('2011',this.submit_data); 
                
             }
        },
        Rules: {
             deep: true,
             handler: function(val, oldVal) {
                console.log('val',val,oldVal);
                this.rules = val;
                 console.log('2011',this.rules); 
                
             }
        },
    }
}

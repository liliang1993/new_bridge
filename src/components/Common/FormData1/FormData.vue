<template>
    <div class="form">
        <el-form 
            :label-width="label_width"
            ref='form-data'
            :rules='rules'
            :model='submit_data'>
            <el-form-item
                class='edit-form'
                v-for='field in fields'
                v-if='field.hidden!==true'
                :label="$t(field.label)"
                :prop='field.key'
                :style="field.item_style">

                <!-- 单选CheckBox -->
                <el-checkbox 
                    v-if='field.type==="checkbox" && field.multiple!==true'
                    v-model="submit_data[field.key]">{{field.label}}</el-checkbox>


                <!-- 复选CheckBox -->
                <!-- 是否全选全不选 -->
                <el-checkbox
                    v-if='field.checkall && typeof field.checkall==="object" && submit_data[field.key+checkall_temp]'
                    :indeterminate="submit_data[field.key+checkall_temp].indeterminate"
                    v-model="submit_data[field.key+checkall_temp].value"
                    @change='onCheckallChange(field.key)'>{{submit_data[field.key+checkall_temp].text}}</el-checkbox>
                <!-- CheckBox选项列表 -->
                <el-checkbox-group
                    v-if='(field.type==="checkbox" && field.multiple===true && !field.checkall) || (field.type==="checkbox" && field.multiple===true && field.checkall && submit_data[field.key+checkall_temp])'
                    v-model="submit_data[field.key+checkall_temp].checkbox_value"
                    @change='onCheckboxChange(field.key)'>
                        <el-checkbox
                            v-for='item in submit_data[field.key+checkall_temp].checkbox_list'
                            :label="item.value">{{item.text}}</el-checkbox>

                </el-checkbox-group>

                <el-input
                    v-if="field.type === 'input'||field.type === 'int' || field.type === 'float' ||field.type === 'string'|| field.type === 'text' "
                    :type='field.type ==="textarea" ? "textarea" : "input" '
                    :disabled = 'field.disabled'
                    v-model="submit_data[field.key]"
                    :placeholder='field.desc'></el-input>
                <!--
                    checkbox+input
                 -->
                <template  v-if='field.type==="CheckboxAndInputList" '>
                        <div  v-for='(item ,index) in field.spec'>
                                  <el-checkbox v-model="submit_data[field.key][index].checked"> {{item[0]}}</el-checkbox>
                                  <el-input  :placeholder='field.desc'  v-model ='submit_data[field.key][index].tol'>
                                  </el-input>
                        </div>
                </template>
                <!--
                    MultipleInput
                 -->
                <template v-if='field.type==="MultipleInput"' >
                            <div  class='MultipleInput'  v-for='(input_group,index1) in submit_data[field.key]'>
                                <el-input
                                v-for='(item, index2) in input_group'
                                type="input"
                                v-model='submit_data[index1][index2]'
                                :placeholder='item.desc'
                                class='MultipleInput'
                                >
                                </el-input>
                                <el-button class='dynamic_delbtn' type='danger' @click.prevent="onRemoveInputGroup(field.key,index1)">Del</el-button>
                            </div>
                             <el-button type='info' @click.prevent="onAddInputGroup(field.key)">Add</el-button>
                </template>
                <!--
                    RouteType
                 -->
                    <template v-if='field.type==="RouteType"' >
                                    <div>
                                            if size &gt;= 
                                            <el-input  type='input'  v-model = 'submit_data[field.key].threshold'></el-input>  
                                            then 
                                            <el-select v-model='submit_data[field.key].right' placeholder="请选择">
                                                    <el-option
                                                      v-for="r_item in  left_options"
                                                      :key="r_item.value"
                                                      :label="r_item.label"
                                                      :value="r_item.value"
                                                      >
                                                    </el-option>
                                          </el-select>
                                          else
                                          <el-select v-model='submit_data[field.key].left' placeholder="请选择">
                                                    <el-option
                                                      v-for="l_item in  right_options"
                                                      :key="l_item.value"
                                                      :label="l_item.label"
                                                      :value="l_item.value"
                                                      >
                                                    </el-option>
                                          </el-select>
                                    </div>
                    </template>
                <!--
                    radia,单选
                 -->
                <el-radio-group
                    v-if='field.type==="radio"'
                    v-model="submit_data[field.key]">
                    <el-radio
                        v-for='item in field.value.list'
                        :label="item.value">{{item.text || item.value}}</el-radio>
                </el-radio-group>

                <!-- select,下拉框 -->
                <el-select
                    v-if='field.type==="select" '
                    v-model="submit_data[field.key]"
                    :multiple='field.multiple ? true : false'
                    :placeholder="field.desc"
                    onchange ='onchange'
                    >
                    <el-option
                        v-for='item in field.value.list'
                        :value="item.value"
                        :label="item.text || item.value"></el-option>
                </el-select>
                <!--
                    switch，开关
                 -->
                <el-switch
                    v-if='field.type==="switch"'
                    :on-text="field.value.on"
                    :off-text="field.value.off"
                    :disabled='field.disabled'
                    v-model="submit_data[field.key]"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click='onSubmit("form-data")'>提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import FormDataJs from './FormData.js';
    module.exports=FormDataJs;
</script>
<style  lang='less'>
    .demo-form-inline{
        display: inline-block;
        float: right;
    }
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
    .actions-top{
        height: 46px;
    }
    .pagination{
        display: inline-block;
    }
    .checkbox_input{
      margin-bottom: 10px;
    }
    .checkbox_item{
        width: 100px;
    }
    .dynamic_input_item{
        width: 120px;
        margin-right:20px;
    }
    .dynamic_input_group{
        margin-bottom: 10px;
    }
    .dynamic_delbtn{
        /*display: inline-block;*/
    }
    .size_value{
      display: inline-block;
      width: 50px;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    input[type="number"]{
        -moz-appearance: textfield;
    }
</style>

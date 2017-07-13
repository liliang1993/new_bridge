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
                    v-if="!field.type || field.type === 'input' || field.type === 'textarea'|| field.type === 'number' "
                    :type='!field.type ? "input" : field.type'
                    :disabled = 'field.disabled'
                    v-model="submit_data[field.key]"
                    :placeholder='field.desc'></el-input>
                <!--
                    checkbox+input
                 -->
                <template  v-if='field.type==="checkout_input"' >
                    
                </template>
                <!--
                    dynamicInput
                 -->
                <template v-if='field.type==="dynamic_input"' >
                        <div  class='dynamic_input_group' v-if="field.list && field.list.length>0" v-for='(inputgroup,index) in field.list'>
                            <el-input
                            v-for='item in inputgroup'
                            type="input"
                            v-model='submit_data[item.key+index]'
                            :placeholder='item.desc'
                            class='dynamic_input_item'
                            :style='inputgroup.style'
                            >
                            </el-input>
                            <el-button class='dynamic_delbtn'type='danger' @click.prevent="onRemoveInput(field.list,inputgroup)">Del</el-button>
                        </div>
                         <el-button type='info' @click.prevent="onAddInput(field)">Add</el-button>
                </template>
                <!--
                    judgment
                 -->
                    <template v-if='field.type==="judgment"' >
                        
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

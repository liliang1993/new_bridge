<template>
    <div class="list">
        <el-col :span="24" class='actions-top' v-if="topform">
          <el-form  :inline="true" :model='topform.search_data' >
                <el-form-item v-for='item in topform.list' :label="item.label">
                    <el-input v-if="item.type==='input'" :placeholder="item.desc" v-model='topform.search_data.title'></el-input>
                    <el-button v-if="item.type==='button'" :type="item.style||'primary'" :icon='item.icon' :disabled="item.fn_type==='delete'?batch_flag:false"  @click='onClickTopBtns(item)' >{{item.text}}</el-button>
                     <el-date-picker
                        v-if="item.type==='datepicker'"
                        v-model="daterange_value"
                        type="daterange"
                        align="right"
                        placeholder="选择日期范围"
                        :picker-options="pickerOptions2">
                    </el-date-picker>

                    <el-select
                    v-if='item.type==="select"'
                    v-model="topform.search_data.title"
                    :multiple='item.multiple ? true : false'
                    :placeholder="item.desc"
                    >
                    <el-option
                        v-for='item in item.value.list'
                        :value="item.value"
                        :label="item.text || item.value"></el-option>
                </el-select>
                <slot name='list_header'></slot>
                </el-form-item>
            </el-form>
        </el-col>

        <el-table border style="width: 100%" align='center'
            :data="list"
            :ref = 'ref'
            
            v-loading='$store.state.global.ajax_loading'
            @selection-change='onSelectionChange'>
            <el-table-column
                v-if='selection'
                type="selection"
                width="55">
            </el-table-column>

            <template
                    v-for='(field,_index) in fields'>
                <el-table-column
                        v-if='!field.type'
                        :prop="field.key"
                        :label="field.label"
                        :align="field.align || 'center'"
                        :sortable="field.sort || false"
                        :formatter='field.formatter'
                        :show-overflow-tooltip='field.show_overflow_tooltip|| false'
                        :filters='field.filter_list'
                        :filter-method="field.filter_method"
                        :filter-multiple="field.filter_multiple"
                        :style='field.style'
                        :width='field.width'>
                </el-table-column>

                <el-table-column
                        v-if='field.type&&field.type==="input"'
                        :label="field.label"
                        :align="field.align || 'center'"
                        :width='field.width'>
                    <template scope='scope'  >
                        <el-input v-model="submit_data[field.key+_index]" :placeholder="field.label"></el-input>
                    </template>
                </el-table-column>
                 <!--
                    Conditianal-judgment
                    -->
                <el-table-column
                        v-if='field.type&&field.type==="judgment"'
                        :label="field.label"
                        :align="field.align || 'center'"
                        :width='field.width'>
                    <template scope='scope'  >
                        <span>if size >=</span>
                        <el-input v-model="submit_data[field.input.key]" :placeholder="field.input.desc"></el-input>
                        <span>then</span>
                        <el-select
                        v-model="submit_data[field.directSelect.key]"
                        :multiple='field.directSelect.multiple ? true : false'
                        :placeholder="field.directSelect.desc"
                        >
                            <el-option
                                v-for='item in field.directSelect.value.list'
                                :value="item.value"
                                :label="item.text || item.value"></el-option>
                        </el-select>
                        <span>else</span>
                        <el-select
                        v-model="submit_data[field.invertSelect.key]"
                        :multiple='field.invertSelect.multiple ? true : false'
                        :placeholder="field.invertSelect.desc"
                        >
                            <el-option
                                v-for='item in field.invertSelect.value.list'
                                :value="item.value"
                                :label="item.text || item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <!--
                    dynamicInput
                    -->
                <el-table-column
                        v-if='field.type&&field.type==="dynamic_input"'
                        :label='field.label'
                        :align="field.align || 'center'"
                        :width='field.width'>
                    <template scope='scope'  >
                        <div  class='dynamic_input_group' v-if="field.list && field.list.length>0" v-for='items in field.list'>
                                <el-input
                                v-for='(item,index) in items'
                                type="input"
                                v-model="submit_data[item.key+index]"
                                :placeholder='item.desc'
                                class='dynamic_input_item'
                                :style='items.style'
                                >
                                </el-input>
                                <el-button class='dynamic_delbtn'type='danger' @click.prevent="onRemoveInput(field.list,items)">Del</el-button>
                        </div>
                        <el-button type='info' @click.prevent="onAddInput(field)">Add</el-button>
                    </template>
                </el-table-column>

                <!--
                    checkbox+input
                    -->
                <el-table-column
                        v-if='field.type&&field.type==="checkout_input"'
                        :label='field.label'
                        :align="field.align || 'center'"
                        :width='field.width'>
                    <template scope='scope'  >
                        <el-input
                        v-for='item in field.list'
                        type="input"
                        v-model="submit_data[item.input.key]"
                        :placeholder='item.input.desc'
                        >
                             <el-checkbox slot="prepend" class='checkbox_input'size='small'  v-model="submit_data[item.checkbox.key]">{{item.checkbox.text}}</el-checkbox>
                        </el-input>
                    </template>
                </el-table-column>

                <!--
                    dropdown-select
                    -->
                <el-table-column
                    v-if='field.type&&field.type==="select"'
                    :label='field.label'
                    :align="field.align || 'center'"
                    :width='field.width'>
                    <template scope='scope'  >
                        <el-select
                        v-if='field.type==="select" && submit_data[field.key]'
                        v-model="submit_data[field.key]"
                        :multiple='field.multiple ? true : false'
                        :placeholder="field.desc"
                        >
                          <el-option
                          v-for='item in field.value.list'
                          :value="item.value"
                          :label="item.text || item.value"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <!--
                    icon
                    --> 
                <el-table-column
                    v-if='field.type&&field.type==="icon"'
                    :label='field.label'
                    :formatter='field.formatter'
                    :align="field.align || 'center'"
                    :width='field.width'>
                    <template scope='scope'>
                        <span :class="scope.row[field.key] === true ? 'enabled' : 'disabled'">{{scope.row[field.key]===true ? 'O' : 'X'}}</span>
                    </template>
                </el-table-column>
                <!--
                    symbol_position_list
                    --> 
                    
            </template>

            <el-table-column
                v-if='btn_info.show===true'
                :label="btn_info.label || '操作'"
                :width="btn_info.width || 80"
                :context="_self">
                <template scope='scope'>
                   <!--  <el-button
                        v-if='btn_info.select!==false'
                        type="info"
                        icon='view'
                        size="mini"
                        @click='onGetInfo(scope.row,scope.$index,list,"select")'></el-button> -->
                    <el-button
                        v-if='btn_info.update!==false'
                        type="info"
                        icon='edit'
                        size="mini"
                        @click='onEditDialog(scope.row,scope.$index,list)'></el-button>
                    <el-button
                        v-if='btn_info.delete!==false'
                        type="danger"
                        icon='delete'
                        size="mini"
                        @click='onDelete(scope.row,scope.$index)'></el-button>

                    <el-button
                        v-if='btn_info.list'
                        v-for='btn in btn_info.list'
                        :type="btn.type || 'info'"
                        size="mini"
                        @click='onGetInfo(scope.row,scope.$index,list,btn.fn_type || btn.text)'>{{btn.text}}</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class='btm-action'>
            <el-pagination
                v-if='pagination.total>0'
                class='pagination'
                :page-sizes="pagination.page_sizes"
                :page-size="pagination.page_size"
                :layout="pagination.layout"
                :total="pagination.total"
                :current-page='pagination.current_page'
                @current-change='onChangeCurrentPage'
                @size-change='onChangePageSize'>
            </el-pagination>
        </el-col>
    </div>
</template>

<script>
    import ListDataJs from './ListData.js';
    module.exports=ListDataJs;
</script>
<style scoped lang='less'>
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
    .enabled{
        color: #13CE66;
    }
    .disabled{
        color: #FF4949;
    }
</style>

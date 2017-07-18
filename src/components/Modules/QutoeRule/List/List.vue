<template>
  <div class='list'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click='onAddRule()'>{{$t('Add rule')}}</el-button>
        </el-col> 
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="handler" scope="scope">
              <el-button
                  type="info"
                  icon='edit'
                  size="mini"
                  @click='onEditRule(scope.row)'></el-button>
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                 @click='onDeleteQutoeRule(scope.row)' ></el-button>
          </template>
          <template slot="quoteAttr" scope="scope">
              <span :style="scope.row.quote_enable== true ? 'color:green;' : 'color:red;' ">{{scope.row.quote_enable == true ? 'O' : 'X'}}</span>
          </template>
          <template slot="tradeAttr" scope="scope">
              <span :style="scope.row.trade_enable== true ? 'color:green;' : 'color:red;' ">{{scope.row.trade_enable == true ? 'O' : 'X'}}</span>
          </template>
    </bel-table> 

    <drag-dialog
                v-if="ruleDialog.show"
                :title="ruleDialog.title"
                :buttons="ruleDialog.buttons"
                :isModal = "ruleDialog.isModal"
                @close="onCloseRuleDialog"
          >
                <form-data1
                  style="padding:20px 40px 20px 20px"
                  :LabelWidth = 'ruleDialog.labelWidth' 
                  ref='form-data'
                  :FieldList='add_rule_fieldlist'
                  :DefaultValue='default_value'
                  @onSelected = 'onSelected'
                  @onSubmit='onSubmit'
                  >
                  </form-data1>
      </drag-dialog>
  </div>
</template>
  
<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
    .actions-top{
        margin-bottom: 10px;
    }
</style>
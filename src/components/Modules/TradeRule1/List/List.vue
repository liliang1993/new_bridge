<!-- <template>
  <div class='list'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click='onAddGroup()'>{{$t('Add group')}}</el-button>
        </el-col> 
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="rulesdetail" scope="scope">
              <a
                  href="javascript:void(0);"
                 @click='onRulesDetail(scope.row)' > View rules</a>
          </template>
          <template slot="copygroup" scope="scope">
             <a
                  href="javascript:void(0);"
                 @click='onCopyGroup(scope.row)' > Copy to new group</a>
          </template>
          <template slot="remark" scope="scope">
              <a
                    href="javascript:void(0);"
                 @click='onEditRemark(scope.row)' >{{scope.row.remark|| '--------------'}}</a>
          </template>
    </bel-table> 

     <drag-dialog
                v-for = "(remark,index) in remarks"
                :key = 'remark'
                :title="remark.title"
                @close="onCloseRowDialog('remarks',index)"
      >
                <form-data
                style = 'padding: 10px '
                ref='form-data'
                :FieldList='remark.config.fieldlist'
                :DefaultValue='remark.config.default_value'
                :Rules='remark.config.rules'
                @onSubmit='onRemarkSubmit($event,index)'
                >  
                </form-data>
    </drag-dialog>

    <drag-dialog
                v-for = "(group,index) in groups"
                :key = 'group'
                :title="group.title"
                :ref='index'
                @close="onCloseRowDialog('groups',index)"
          >
                <copy-group
                      :TableData =' tableData'
                      :DefaultValue='group.default_value'
                      @onSubmit='onCopyGroupSubmit($event,index)'
                >    
                </copy-group>
        </drag-dialog>

        <drag-dialog
                v-for = "(rule,index) in rules"
                :key = 'rule'
                :title="rule.title"
                @close="onCloseRowDialog('rules',index)"
          >
            <view-rule 
            :ViewRule ='rule.config'
            @onAddRules = 'onShowAddRules'
            @onEditRowRules = 'onShowRowRules'
            @onSingleDeleteRule = 'onSingleDeleteRule'
            @onBatchDeleteRule = 'onBatchDeleteRule'
            @onSubmitChanges = 'onSubmitChanges'
            >  
            </view-rule>
        </drag-dialog>

        <drag-dialog
                v-if="add_group.show"
                style = 'padding: 10px'
                :title=" add_group.title"
                :isModal = 'add_group.isModal'
                @close="onCloseAddGroup()"
       >
            <view-group
            :GroupConfig = 'add_group.config'
            @onSubmit="onSubmitGroup"
            >  
            </view-group>
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
</style> -->
<template>
    <form-data1
      ref='form-data'
      :FieldList='fieldlist'
      :DefaultValue='default_value'
      >  
      </form-data1>
</template>
<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
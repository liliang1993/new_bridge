<template>
  <div class='list'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click = 'open_create_new_group_dialog'>{{$t('Add group')}}</el-button>
        </el-col> 
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="rulesdetail" scope="scope">
              <a
                  href="javascript:void(0);"
                  @click = "GroupTradeRulesTable"
                  > View rules</a>
          </template>
          <template slot="copygroup" scope="scope">
             <a
                  href="javascript:void(0);"
                  @click = 'copy_to_new_group(scope.row)'
                  > Copy to new group</a>
          </template>
          <template slot="remark" scope="scope">
              <a
                    href="javascript:void(0);"
                     @click = "onEditRemark(scope.row)"
                  >{{scope.row.remark}}</a>
          </template>
    </bel-table> 
    <drag-dialog
                v-if = 'create_new_group_dialog.show'
                :title="create_new_group_dialog.title"
                :isModal = 'create_new_group_dialog.isModal'
                @close="onCloseDialog('create_new_group_dialog')"
      >
                <form-data1
                style = 'padding: 10px;'
                ref='form-data'
                :FieldList='fieldlist'
                :DefaultValue='create_new_group_dialog.default_value'
                @onSubmit= "create_new_group_submit"
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
<template>
  <div class='list'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click='onAddSymbol()'>{{this.$t('Add symbol')}}</el-button>
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
                  @click='onEditSymbol(scope.row)'></el-button>
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                 @click='onDeleteSymbol(scope.row)' ></el-button>
          </template>
          <template slot="quoteAttr" scope="scope">
              <span :style="scope.row.quote_enable== true ? 'color:green;' : 'color:red;' ">{{scope.row.quote_enable == true ? 'O' : 'X'}}</span>
          </template>
          <template slot="tradeAttr" scope="scope">
              <span :style="scope.row.trade_enable== true ? 'color:green;' : 'color:red;' ">{{scope.row.trade_enable == true ? 'O' : 'X'}}</span>
          </template>
    </bel-table> 

    <drag-dialog
                v-if = 'add_symbol_dialog.show'
                :title="add_symbol_dialog.title"
                :isModal = "add_symbol_dialog.isModal"
                @close="onCloseDialog('add_symbol_dialog')"
        >
                <form-data1
                  style="padding:20px 40px 20px 20px"
                  ref='form-data'
                  :FieldList='add_symbol_fieldlist'
                  @onSubmit='add_symbol_submit'
                  >
                  </form-data1>
        </drag-dialog>

        <drag-dialog
                v-if = 'edit_symbol_dialog.show'
                :title="edit_symbol_dialog.title"
                :isModal = "edit_symbol_dialog.isModal"
                @close="onCloseDialog('edit_symbol_dialog')"
        >

                <form-data1
                  style="padding:20px 40px 20px 20px"
                  ref='form-data1'
                  :FieldList='edit_symbol_fieldlist'
                  :DefaultValue='default_value'
                  @onSubmit='edit_symbol_submit'
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
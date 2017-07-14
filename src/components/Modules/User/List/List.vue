<template>
    <div class='clearfix'>
    <el-row>
        <el-col :span='24' class='actions-top'>
            <el-button type='primary' @click='onAddUser()'>{{$t('Add user')}}</el-button>
        </el-col> 
        <el-col :span='24' >
            <strong>Users - </strong>{{nowTime}}
        </el-col>
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="status" scope="scope">
              <span :style="scope.row.status== 0 ? 'color:black;' : 'color:red;' ">{{scope.row.status == 0 ? 'Enabled' : 'Disabled'}}</span>
          </template>
          <template slot="handler" scope="scope">
              <el-button
                  type="info"
                  icon='edit'
                  size="mini"
                  @click='onEditUser(scope.row)'></el-button>
          </template>
    </bel-table> 
    <el-col :span="24" class='btm-action'>
            <el-pagination
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

        <drag-dialog
                v-if = 'add_user_dialog.show'
                :title="add_user_dialog.title"
                :isModal = 'add_user_dialog.isModal'
                @close="onCloseDialog('add_user_dialog')"
          >
                <form-data1
                 ref='add_user_form'
                  style="padding:20px 40px 20px 20px"
                  :FieldList='add_user_fieldlist'
                  @onSubmit='add_user_submit'
                  >
                  </form-data1>
        </drag-dialog>

         <drag-dialog
                v-if='edit_user_dialog.show'
                :title="edit_user_dialog.title"
                :isModal = 'edit_user_dialog.isModal'
                @close="onCloseDialog('edit_user_dialog')"
          >
                <form-data1
                 ref='edit_user_form'
                  style="padding:20px 40px 20px 20px"
                  :FieldList='edit_user_fieldist'
                  :DefaultValue='default_value'
                  @onSubmit='edit_user_submit'
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
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
     .pagination{
        display: inline-block;
    }
</style>
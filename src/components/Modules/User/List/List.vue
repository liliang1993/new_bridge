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
                v-if = 'userDialog.show'
                :title="userDialog.title"
                :isModal = "userDialog.isModal"
                @close="onCloseDialog()"
          >
                <form-data
                 ref='user-form'
                 v-if = 'userDialog.show'
                  style="padding:20px 40px 20px 20px"
                  :LabelWidth = 'labelWidth' 
                  :FieldList='fieldlist'
                  :DefaultValue='default_value'
                  :Rules='rules'
                  @onSubmit='onSubmit'
                  >
                  </form-data>
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
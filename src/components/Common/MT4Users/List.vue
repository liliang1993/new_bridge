<template>
    <div >
    <el-row :gutter='20' class='top-action'>
        <el-col :span='2'>
            <el-input v-model='keywords.login.value' placeholder='Login'></el-input>
         </el-col>
         <el-col :span='2'>
            <el-input v-model='keywords.group.value' placeholder='Group'></el-input>
         </el-col>
         <el-col :span='2'>
            <el-input v-model='keywords.city.value' placeholder='City'></el-input>
         </el-col>
          <el-col :span='2'>
            <el-button type='primary' @click='onSearch()'>Search</el-button>
         </el-col>
    </el-row>

    <bel-table
      ref="table"
      :configs="tableConfig">
            <template slot="login" scope="scope">
                <a 
                href = "JavaScript:void(0)"
                type="text" 
                @click='onShowDetail(scope.row)'>
                {{scope.row.LOGIN}}
                </a>
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
            v-for = '(item,index) in users_detail'
            :key = 'item'
            v-if = 'item.show'
            :title =  'item.title'
            @close = 'onCloseUsersDetail(index)'
      >
            <users-detail  :config = 'item.config'></users-detail>
      </drag-dialog>
  </div>
</template>

<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
.top-action{
    margin-bottom: 10px;
}
</style>

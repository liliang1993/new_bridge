<template>
    <div class='clearfix'>
    <el-row>
        <el-col :span='24' >
            <strong>Users - </strong>{{nowTime}}
        </el-col>
    </el-row>
    <bel-table
      ref="table"    
      :configs="tableConfig">
          <template slot="status" scope="scope">
              <span :style="scope.row.status== 0 ? 'color:black;' : 'color:red;' ">{{scope.row.status == 1 ? 'Error' : 'OK'}}</span>
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
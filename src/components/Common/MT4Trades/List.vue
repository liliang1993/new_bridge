<template>
    <div >
    <el-row :gutter='20' class='top-action'>
        <el-col :span='2'>
            <el-input  type="number" v-model='keywords.login.value' placeholder='Login'></el-input>
         </el-col>
         <el-col :span='2'>
            <el-input type="number" v-model='keywords.ord_id.value' placeholder='OrdId'></el-input>
         </el-col>
         <el-col :span='2'>
            <el-input v-model='keywords.symbol.value' placeholder='Symbol'></el-input>
         </el-col>
         <el-col :span='2'>
           <el-date-picker v-model="keywords.opentime.value" type="daterange" align="right" placeholder="OpenTime" picker-options="pickerOptions"></el-date-picker>
         </el-col>
         <el-col :span='2' :offset='2'>
            <el-date-picker v-model="keywords.closetime.value" type="daterange" align="right" placeholder="CloseTime" picker-options="pickerOptions"></el-date-picker>
         </el-col>
          <el-col :span='3' :offset='2'>
            <el-button type='primary' @click='onSearch()'>Search</el-button>
         </el-col>
         <el-col :span='24'>
                <strong>Users -</strong>{{nowTime}}
         </el-col>
    </el-row>

    <bel-table
      ref="table"
      :configs="tableConfig">
            <template slot="ord_id" scope="scope">
                <a 
                href = "JavaScript:void(0)"
                type="text" 
                @click='onShowDetail(scope.row)'>
                {{scope.row.TICKET}}
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
            v-for = '(item,index) in trades_detail'
            :key = 'item'
            v-if = 'item.show'
            :title =  'item.title'
            @close = 'onCloseTradesDetail(index)'
      >
            <trades-detail  :config = 'item.config'></trades-detail>
      </drag-dialog>
  </div>
</template>

<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
    .top-action{
      margin-bottom:10px;
    }
    .btm-action{
            margin-top: 20px;
            text-align: center;
        }
     .pagination{
        display: inline-block;
    }
</style>

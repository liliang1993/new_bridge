<template>
    <div class='clearfix'>
    <el-row style='margin-bottom:10px;'>
        <div class='actions-top'>
            <el-button type='primary' @click='onAddPosition()'>{{$t('Add Position')}}</el-button>
            <el-button type='primary' @click='onDeletePosition()'>{{$t('Delete Position')}}</el-button>
        </div>
    </el-row>
    <el-row class='prompt'>
           <strong >Order Positions - </strong>
           <span>{{nowTime}}</span>
           <strong class='next_refresh'>NEXT REFRESH: </strong> 
          <span class='remain_sec'>{{ remain_sec}}</span>
           <strong class='desc'>Enable Auto Refresh:</strong>
            <el-switch
              v-model="refresh_enable"
              on-color="#13ce66"
              off-color="#ff4949"
              on-value="true"
              off-value="false"
              @change ='changeSwitch'
              >
            </el-switch>
    </el-row>
    <bel-table
      ref="table"
      :configs="tableConfig">
           <template slot="lp_exec_orders" scope="scope">
              <a
                  href = "JavaScript:void(0)" 
                 @click='onLPOrdersDetail(scope.row)' >LP Order</a>
          </template>
          <template slot="detail" scope="scope">
              <a
                  href = "JavaScript:void(0)" 
                 @click='onDetail(scope.row)' >{{$t('Detail')}}</a>
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
        v-for = "(lp_order,index) in lp_orders"
        class='drag_dialog'
        :key="lp_order"
        :title="lp_order.title"
        @close = "onCloseLpOrder(index)"
      >
      <lp-order :LPOrder ='lp_order.config'></lp-order>
    </drag-dialog>

      <drag-dialog
        v-for = "(trade_log,index) in trade_logs"
        :key="trade_log"
        class='drag_dialog'
        :title="trade_log.title"
        @close = "onCloseTradeLog(index)"
      >
      <trade-log :TradeLog='trade_log.config'> </trade-log>
    </drag-dialog>
    <drag-dialog 
        v-if = 'add_position.show'
        class='drag_dialog'
        :title="add_position.title"
        @close = "onCloseOnlyDialog('add_position')"
      >
      <add-position></add-position>
    </drag-dialog>
    <drag-dialog 
        v-if = 'del_position.show'
        class='drag_dialog'
        :title="del_position.title"
        @onRestTableData = 'onRestTableData'
        @close = "onCloseOnlyDialog('del_position')"
      >
      <del-position></del-position>
    </drag-dialog>  
  </div>
</template>
  
<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
     .pagination{
        display: inline-block;
    }
  .prompt{
    margin-bottom:10px;
     strong{
         display:inline-block;

         line-height:16px;
         font-size:16px;
      }
     .next_refresh{
        margin-left:10px;
     }
     .remain_sec{
      display:inline-block;
      width:25px;
      height:25px;
      text-align:center;
      border:2px solid #ccc;
      line-height:21px;
    }
    .desc{
      margin-left:10px;
    }
  }
   
</style>

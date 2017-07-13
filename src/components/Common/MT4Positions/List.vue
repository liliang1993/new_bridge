<template>
    <div > 
    <el-row class='top-action'>
        <el-button type="primary" @click='reload'>Reload</el-button>
        <el-button type="primary" @click=' check_bridge_mt4_diff'>Check MT4 Bridge Diff</el-button>
    </el-row>
    <bel-table
      ref="table"
      :configs="tableConfig">
    </bel-table>
  </div>
</template>
<drag-dialog 
v-if = 'diff_orders.show' 
:title = 'diff_orders.title'
@close = 'close_diff_orders_dialog'
>
        <diff-orders  :config = 'diff_orders.config'></diff-orders>
</drag-dialog>
<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
.top-action{
    margin-bottom: 10px;
}
</style>

 
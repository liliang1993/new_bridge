<template>
    <div class='list'>
      <bel-table
      ref="table"
      :configs="tableConfig">
          <template slot="trade_log" scope="scope">
              <div>
                  <pre>{{scope.row.trade_log}}</pre>
              </div>
          </template>
    </bel-table>
  </div>
</template>

<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
pre{
    padding:20px;
    line-height:25px;
}

</style>

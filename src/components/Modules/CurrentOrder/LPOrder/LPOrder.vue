<template>
    <div class='list'>
    <bel-table
      ref="table"    
      :configs="tableConfig">
    </bel-table> 
  </div>
</template>
  
<script >
import LPOrderJs from './LPOrder.js';
module.exports=LPOrderJs;
</script>
<style scoped lang='less'>
</style>
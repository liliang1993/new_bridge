<template>
    <div >
        <div class="top-action">
            <el-date-picker v-model="keywords.time_range.value" type="daterange" align="right" placeholder="CloseTime" picker-options="pickerOptions"></el-date-picker>
            <el-input v-model='keywords.top.value'  class="top-value" placeholder='Top'></el-input>
            <el-button type='primary' @click='onSearch()'>Search</el-button>
        </div>

    <bel-table
      ref="table"
      :configs="tableConfig">
    </bel-table>
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
.top-value {
  display:inline-block;
  width:50px;
}
</style>

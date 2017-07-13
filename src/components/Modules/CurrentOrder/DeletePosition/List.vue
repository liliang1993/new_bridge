<template>
    <div class='list'>
      <div>
          <el-input
            class = 'orders_search'
            placeholder="bridge orders"
            icon="search"
            :disabled = 'search_disabled'
            v-model="orders_value"
            :on-icon-click="onIconClick">
          </el-input>
      </div>
      <bel-table
      ref="table"
      :configs="tableConfig">
        <template slot="lp_positions" scope="scope">
            <span v-for="(value,key) in scope.row.lp_positions" v-if='value != 0 && value != undefined' >{{key}}:{{value}}</span>      
        </template>
        <template slot="delete" scope="scope">
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                  @click='onDeleteRow(scope.row)'></el-button>
          </template>
    </bel-table>
    <el-input
                class= 'del_reason'
                type="textarea"
                autosize
                placeholder="the reason why you want to delete these orders"
                v-model="del_reason">
    </el-input>
    <el-row>           
         <el-col :span='2' >
                  <el-button  type='primary' :disabled='submit_disabled' @click='onSubmit' >Submit</el-button>
          </el-col> 
    </el-row>
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
.btm-action{
     text-align: center;
     margin-top: 10px;
}
.icon{
  font-size: 20px;
  color: blue;
}
.orders_search{
  width:200px;
  margin-bottom:10px;
}
.del_reason{
  width:300px;
  margin:10px 0;
}

</style>

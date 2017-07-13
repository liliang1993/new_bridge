<template>
    <div class='list'>
    	<el-row   class="top-action">
    		<!-- <el-col :span='3'>
    			<el-input placeholder='MT4 logins'  icon="search" v-model="keyword.mt4_logins" :on-icon-click="handleIconClick"></el-input>
    		</el-col>
                <el-col :span='3' :offset='1'>
        <el-input type='textarea' autosize placeholder='MT4 orders'   v-model="keyword.mt4_orders" :on-icon-click="handleIconClick"></el-input>
        </el-col>
        <el-col :span='5' class='search-button'>
            <el-button type='primary'>Search</el-button>
            <el-button type='primary'  @click ="onSubmit">Submit</el-button>
        </el-col> -->
          <el-col  :span='6' >
                  <el-input placeholder="请输入内容" v-model="keyword">
                  <el-select  v-model='search_header'  slot="prepend" placeholder="请选择">
                        <el-option label="MT4 logins" value="MT4 logins"></el-option>
                        <el-option label="MT4 orders" value="MT4 orders"></el-option>
                  </el-select>
                  <el-button slot="append" icon="search"  @click='onSearch'></el-button>
                </el-input>
          </el-col> 
    	</el-row>
      <bel-table
      ref="table"
      :configs="tableConfig">
        <template v-for='(item,index) in tableConfig.columns'  :slot="item.attr.label" scope="scope">
              <el-input  :placeholder='item.attr.label' v-model='scope.row[item.attr.prop].value'  :class='scope.row[item.attr.prop].class'></el-input>
        </template>
        <template slot="delete" scope="scope">
              <el-button
                  type="danger"
                  icon='delete'
                  size="mini"
                  @click='onDeleteRow(scope.row)'></el-button>
          </template>
    </bel-table>
    <el-row>
        <el-col :span='24' class='btm-action'>
              <el-button  class='icon'  icon="plus" @click='addNewRow()' ></el-button>
        </el-col>
         <el-col :span='2' >
                  <el-button  type='primary' @click='onSubmit' >Submit</el-button>
          </el-col> 
    </el-row>
    <drag-dialog
      v-if = 'addPositionDialog.show'
      :title = 'addPositionDialog.title'
      @close = 'onclose("addPositionDialog")'
    >
      <pre class='result'>{{addPositionDialog.result}}</pre>
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
.btm-action{
     text-align: center;
     margin-top: 10px;
}
.icon{
  font-size: 20px;
  color: blue;
}
.search-button{
  margin-left:  10px;
}
.result{
  width:500px;
  background-color:#ccc;
}
</style>

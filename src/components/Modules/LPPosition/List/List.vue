<template>
    <div class="list">
        <div >
                <span class=" green">green: position </span>
                <span class="red">red: negative</span>
                <strong style='margin-left:10px;'>NEXT REFRESH:</strong>
                <span class='remain_sec' >{{remain_sec}}</span>
                <span style='margin-left:10px;'>STATUS:</span>
                <span :style="{color : load_text_color}">{{load_status}}</span>
                <span></span>

        </div> 
         <bel-table
              ref="table"    
              :configs="tableConfig">
              <template v-for='item in  lp_names'  :slot="item" scope="scope">
                    <span :style="{'color' : scope.row[item]< 0 ? 'red' : 'green' }">{{scope.row[item]!==undefined ? Math.abs(scope.row[item]): ''}}</span>
              </template> 
              <template slot="total" scope="scope">
                    <span :style="{'color' : scope.row.total< 0 ? 'red' : 'green' }">{{Math.abs(scope.row.total)}}</span>
              </template> 
         </bel-table>
    </div>
</template>

<script>
    import ListJs from './List.js';
    module.exports=ListJs;
</script>
<style scoped lang='less'>
    .demo-form-inline{
        display: inline-block;
        float: right;
    }
    .btm-action{
        margin-top: 20px;
        text-align: center;
    }
    .actions-top{
        height: 46px;
    }
    .pagination{
        display: inline-block;
    }
    .green{
        color: green;
    }
    .red{
        color: red;
    }
    strong{
         display:inline-block;
         height:40px;
         line-height:40px;
      }
    .remain_sec{
      display:inline-block;
      vertical-align:middle;
      width:20px;
      height:20px;
      text-align:center;
      border:2px solid #ccc;
    }
</style>

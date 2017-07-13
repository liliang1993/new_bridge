<template>
    <section class="chart">
        <el-row class='header_row'><b>Total Qty:</b>{{total_qty}}</el-row>
        <el-row class='header_row'>
            <b>CURRENT:</b>
            <span>{{current_std_symbol}}</span>
            &nbsp;&nbsp;
            <b>NEXT REFRESH:</b>
             <span class='remain_sec' >{{remain_sec}}</span>
            <b>STATUS:</b>
            <span :style='{color:load_text_color}'>{{load_status}}</span>
        </el-row>
        <el-row>
            <el-button  type="primary"  v-for =' (item,key) in std_symbols'  @click='select_std_symbol_chart(key)'>{{key}}</el-button>  
        </el-row>
        <el-row  style='width:60%; margin-top:20px;'>
                <div class="pos_chart">
                    <div class="symbol_chart " v-for='(item,key) in  current_lp_symbols'>
                          <div class="lp_symbol_item">
                              <div class="lp_weight" :style="{width: item.weight_width+'%'}">
                                </div>
                                <div class="lp_text">
                                    <div>
                                            <a href="javascript:void(0)">
                                                <span class="lp_status"  :style="{'color': item.lp_symbol.trade_enable?'green' :'red'}">
                                                    {{item.lp_symbol.trade_enable? 'Enabled' : 'Disabled' }}
                                                </span>
                                                S:
                                                <span>
                                                    {{item.lp_symbol.lp_symbol}}
                                                </span>
                                                W:
                                                <span>
                                                    {{item.lp_symbol.weight}}
                                                </span>
                                            </a>
                                    </div>
                                    </div>
                                <div class="lp_position" :style="{width: item.position_width+'%', backgroundColor: item.position_bgcolor}">
                              </div>
                                <div class="lp_qty">
                                        <div style="margin-left: 10px;">
                                            <span>
                                            {{key}}
                                            </span>
                                            <span style="font-size: 15px;">
                                            {{item.quantity}}
                                            </span>
                                        </div>
                                </div>
                             </div>
                            <div style="height:20px; width:100%;">
                            </div>
                    </div>
                </div>
        </el-row>    
    </section>    
</template>

<script>
    import ListJs from './List.js';
    module.exports=ListJs;
</script>
<style scoped lang='less'>
  .header_row{
    margin-bottom:10px;
  }    
  .remain_sec{
      display:inline-block;
      vertical-align:middle;
      width:20px;
      height:20px;
      text-align:center;
      border:2px solid #ccc;
    }
  .el-button{
    width:100px;
}
  .pos_chart {
    margin: 5px;
    border-left: 1px solid black;
    border-right: 1px solid black;
    width: 100%;
}
.symbol_chart {
    width: 100%;
}
div.lp_symbol_item {
    position: relative;
}
div.lp_weight {
    position: absolute;
    top: -5px;
    height: 50px;
    width: 100%;
    border-right: 3px solid #140099;
}
div.lp_text {
    padding-top: 10px;
    padding-left: 10px;
    position: absolute;
    top: 0px;
    width: 100%;
    font-weight: bolder;
}
div.lp_position {
    border-right: 1px solid black;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    height: 40px;
    width: 0%;
    padding-top: 8px;
}
div.lp_qty {
    padding-top: 10px;
    position: absolute;
    top: 0px;
    right: -100%;
    width: 100%;
    font-weight: bolder;
}
a {
    color: #646464;
}
</style>

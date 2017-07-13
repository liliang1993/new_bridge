<template>
    <div class='list'>
    <el-row :gutter='20' class='top-action'>
            <el-select v-model="current_source" placeholder="请选择" @change = 'changeSelect'>
                <el-option
                  v-for="item in options"
                  :label="item.label"
                  :value="item.value">
                </el-option>
            </el-select>
         <b style='margin-left:10px;'>Status:</b>
         <span class='ws_status'  :style="{backgroundColor: ws_status_bgcolor}">{{current_time}}</span>
         <b style='margin-left:10px;'>Description:</b>
         <span :style="{color: load_desc_color}">{{load_desc}}</span>
    </el-row>

    <bel-table
      v-if = 'mt4_panel_show'
      ref="table"
      :configs="tableConfig">
      <template slot="adjust_enabled" scope="scope">
            <el-switch
              v-model="scope.row.adjust_enabled"
              on-color="#13ce66"
              off-color="#ff4949"
              @change ='changeSwitch($event,scope.row)'
              >
            </el-switch>
      </template>
      <template slot="rule_type" scope="scope">
            <a 
            href = "JavaScript:void(0)"
            type="text" 
            @click='show_json_table(scope.row)'>
            {{scope.row.type}}
            </a>
      </template>
      <template slot="edit_adjust" scope="scope">
          <el-row>
              <el-button icon="minus" @click="controlAdjust('reduce',scope.row)" >
              </el-button>
              <el-input style='display:inline-block;width:40px;'v-model="scope.row.adjust_step" ></el-input>
              <el-button icon="plus" @click="controlAdjust('add',scope.row)"></el-button>
          </el-row>
      </template>
      <template slot="adjust" scope="scope">
            <span :style="scope.row.attributes.adjust > 0 ? 'color:green;':(scope.row.attributes.adjust < 0 ?'color:red;' : 'color:black;')">{{scope.row.attributes.adjust > 0 ? '+'+scope.row.attributes.adjust : scope.row.attributes.adjust}}</span>
      </template>
      <template slot="std_symbol" scope="scope">
            <a href = "JavaScript:void(0)" type="text" @click = 'showLpQuotes(scope.row)'>{{scope.row.std_symbol}}</a>
      </template>
      <template   slot="bid_change" scope="scope">
            <span class='arrow' :style="scope.row.bid_change== '&darr;' ?'color : red;' : ' color: green;' " v-html ='scope.row.bid_change'></span>
      </template>
      <template   slot="ask_change" scope="scope">
            <span class='arrow' :style="scope.row.ask_change== '&darr;' ?'color : red;' : ' color: green;' " v-html ='scope.row.ask_change'></span>
      </template>
    </bel-table>
    <drag-dialog
                v-for="(rule_table,index) in rule_tables"
                :key = 'rule_table'
                :title="rule_table.title"
                @close="onCloseRowDialog('rule_tables',index)"
          >
               <rule-detail :Config='rule_table.config'></rule-detail> 
    </drag-dialog>
     <drag-dialog
            v-for="(lp_quote,index) in lp_quotes"
            :key = 'lp_quote'
            :title="lp_quote.title"
            @close="onCloseRowDialog('lp_quotes',index)"
      >
           <lp-quote :Config='lp_quote.config'></lp-quote> 
    </drag-dialog>
  </div>
</template>
<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
.negative{
  color: red;
}
.positive{
  color: green;
}
.ws_status{
  display:inline-block;
  line-height:30px;
  height:30px;
}
.top-action{
  margin-bottom:15px;
}
.arrow{
  font-size:20px;
}
</style>

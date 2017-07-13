<template>
    <div class='list'>
      <bel-table
      ref="table"
      :configs="tableConfig">
    </bel-table>
        <div class='lp_quote_container'  :style="{height : container_height+'px'}">
            <div class='quote_line' v-for='item in quote_lines' :style="{'color':item.color,'top': item.top+'px','border': 'solid 1px '+item.color}">
              <span style='padding-left:10px;position:absolute;top:-15px;'>
                {{item.text}}
              </span>
            </div>

       </div>
    </div>
</template>
<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
      .lp_quote_container{
            margin-top:10px;
            width:100%; 
            background:black; 
            border:solid 1px black; 
            position:relative;
      }
      .quote_line{
        width:100%;
        padding-top:-5px; 
        height:0px;
        position:absolute;
        font-size:12px;
      }
</style>
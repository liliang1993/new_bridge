<template>
    <div > 
        <drag-dialog
                v-for = "(item,key) in $store.state.traderule.remark_dialogs"
                :key = 'key'
                :title="item.title"
                @close="close_remark_dialog(key)"
      >
                <form-data1
                style = 'padding: 10px;'
                ref='form-data'
                :FieldList='fieldlist'
                :DefaultValue='item.default_value'
                @onSubmit='onRemarkSubmit($event,key)'
                >  
                </form-data1>
        </drag-dialog>
  </div>
</template>
<script >
import RemarkJs from './Remark.js';
module.exports=RemarkJs;
</script>
<style scoped lang='less'>
.top-action{
    margin-bottom: 10px;
}
</style>
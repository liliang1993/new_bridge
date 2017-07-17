<template>
    <div > 
        <drag-dialog
                v-for = "(item,key) in $store.state.traderule.copy_to_new_group_dialogs"
                :key = 'key'
                :title="item.title"
                @close="closeDialog(key)"
      >
                <form-data1
                style = 'padding: 10px;'
                ref='form-data'
                :FieldList='fieldlist'
                @onSubmit='onSubmit($event,key)'
                >  
                </form-data1>
        </drag-dialog>
  </div>
</template>
<script >
import CopyGroupJs from './CopyGroup.js';
module.exports=CopyGroupJs;
</script>
<style scoped lang='less'>
.top-action{
    margin-bottom: 10px;
}
</style>
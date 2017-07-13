<template>
  <div class='list'>
            <form-data
                LabelWidth = '80px'
                style = 'padding: 10px '
                ref='form-data'
                :FieldList='fieldlist'
                :DefaultValue='default_value'
                :Rules='rules'
                @onSubmit='onSubmit'
                >  
            </form-data>
  </div>
</template>
  
<script >
import ListJs from './List.js';
module.exports=ListJs;
</script>
<style scoped lang='less'>
    .actions-top{
        margin-bottom: 10px;
    }
</style>
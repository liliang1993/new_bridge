<template>
    <div class="list">
        <list-data
            ref='list-data'
            :TopForm='topform'
            :List='list'
            :FieldList='fields'
            :Selection='false'
            :BtnInfo='btn_info'
            @onGetDataList='onGetDataList'
            @onGetInfo='onGetInfo'
            @onDelete='onDelete'
            @onSelectionChange='onSelectionChange'
            @onSelectionChangeObj='onSelectionChangeObj'
            @onChangeCurrentPage='onGetDataList'
            @onChangePageSize='onChangePageSize'
            @onAddDialog='onAddDialog'
            @onEditDialog='onEditDialog'
            ></list-data>

            <form-dialog
            :Dialog='dialog'
            :FieldList='fieldlist'
            :Rules='rules'
            :DefaultValue='default_value'
            >
            </form-dialog>
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
</style>

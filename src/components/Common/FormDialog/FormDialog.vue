<template>
 <div class="">
  <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            :modal = "false"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            @close = 'onClose'
            >
            <slot></slot>
        </el-dialog>
        </div>
</template>

<script>
    import FormDialogJs from './FormDialog.js';
    module.exports=FormDialogJs;
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

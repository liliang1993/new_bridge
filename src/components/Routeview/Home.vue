<template >
    <!--  -->
    <div class="home" >
        <head-nav></head-nav>
        <div class="left-fixed-right-auto" >
            <left-menu></left-menu>
            <div class="right-content"  >
                <div class="content" :style="{marginLeft:$store.state.leftmenu.width}"  v-loading.lock = '$store.state.global.ajax_loading'>
                    <bread></bread>
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <traderule-remark></traderule-remark> 
        <copy-group></copy-group>
        <drag-dialog
                v-for = "(item,key) in $store.state.traderule.view_rules_dialogs"
                :key = 'key'
                :title="item.title"
                @close="onCloseDialog(key)"
        >
            <view-rules :ViewRule = 'item.tableData'></view-rules>
        </drag-dialog>
        
    </div>
</template>
<script>
    import {
        Bread,
        HeadNav,
        LeftMenu,
        DragDialog
    } from '../Common/';
    import {
        Remark as TraderuleRemark,
        CopyGroup,
        ViewRules
    }from '../Common/DialogView/TradeRule';
    export default {
        name: 'home',
        components:{
            Bread,
            HeadNav,
            LeftMenu,
            DragDialog,
            TraderuleRemark,
             CopyGroup,
             ViewRules
        },
        methods:{
            onCloseDialog(key){
                this.$store.dispatch('delete_view_rules_dialogs',key);
            }
        },
        mounted(){
            console.log('qweqwqweqwe',this.$store.state.traderule.view_rules_dialogs);
        }
    }
</script>
<style scoped lang='less'>
    .content{
        margin-top: 60px;
        /*background: #f1f2f7;*/
        background: #FFF;
        padding: 16px;
        min-height:950px;
    }
    .right-content{
        margin-bottom: 60px;
    }
    .left-fixed-right-auto{
        height:100%;
    }
</style>

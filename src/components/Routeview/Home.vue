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
    </div>
</template>
<script>
    import {
        Bread,
        HeadNav,
        LeftMenu
    } from '../Common/';
    import {
        Remark as TraderuleRemark,
        CopyGroup
    }from '../Common/DialogView/TradeRule';
    export default {
        name: 'home',
        components:{
            Bread,
            HeadNav,
            LeftMenu,
            TraderuleRemark,
             CopyGroup
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

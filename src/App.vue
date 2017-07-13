<template>
    <div id="app">
        <transition name="bounce">
            <router-view></router-view>
            
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {},
        methods:{
            
        },
        mounted(){
            
        },
        // created(){
        //     this.get_global_lps();
        //     this.get_global_std_symbols();
        // },
        watch:{
            $route(to,from){
                // console.log(to);
                if (!to.matched.length) {
                    this.$router.push('/404');
                }
            }
        }
    }
</script>
<style  lang='less'>
    
    .bounce-enter-active {
        animation: bounce-in .5s;
        -webkit-animation:bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-out .2s;
        -webkit-animation: bounce-out .2s;
    }
    
    @keyframes bounce-in {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes bounce-out {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.95);
        }
        100% {
            transform: scale(0);
        }
    }
    .success .el-input__inner {
        /*border: 0 none;
        border-bottom: 1px solid #ccc;
        border-radius: 0px;*/
        background-color: rgb(195, 253, 184);
    }
    .warning .el-input__inner{
        background-color: rgb(255, 206, 203);
    }
    .el-select .el-input {
    width: 120px;
  }
  .positive{
    color: green;
  }
  .negative{
    color:  red;
  }
  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
  .clearfix{zoom:1}
.el-table .cell, .el-table th>div{
    padding: 0px;
}
.el-table .cell{
    line-height:12px;
    font-size:12px;
}
.el-input{
    font-size:12px;
}
.el-table th>.cell{
    line-height:16px;
}
a{
    text-decoration:none;
}
.trade_rule{
    .el-input{
        width:100px;
    }
    .el-select{
        .el-input{
            width:100px;
            }
        }
}
.route_type{
    .threshold_input.el-input{
            width:40px;
        .el-input__inner{
            width:40px;
        }
    }
    .el-select{
        .el-input{
            width:80px;
            .el-input__icon{
                    width:20px;
                }
            .el-input__inner{
                    padding:0;
                    padding-left:5px;

                }
            }

        }
}

.limit_order_types_edit{
    .el-input.el-input-group.el-input-group--prepend{
        padding:5px 0;
        width:140px;
        .el-input-group__prepend{
            padding-left:2px;
        }
        .checkbox_item{
            width:60px;
            .el-checkbox__label{
                font-size:12px;
            }
        }
    }
    
}

</style>

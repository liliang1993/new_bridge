<template>
    <header class="head-nav">
       <el-row>
            <el-col :span="6" class='logo-container'>
               <h1>Bang router Dashboard</h1>
            </el-col>
            <el-col :span="10"  :offset="4" >
                <el-menu   theme="dark" :default-active="$route.path" class="el-menu-demo" mode="horizontal" unique-opened  @select='onselect' >
                    <template
                            v-for="(item,index) in routesFilter"
                            v-if="!item.hidden">
                                <el-submenu
                                    :index="item.path"
                                    v-if="!item.leaf"
                                >
                                    <template slot="title">{{$t(item.name)}} </template>

                                <!-- v-if="!child.hidden && $store.state.user.userinfo.access.indexOf(route.path+'/'+item.path+'/'+child.path)===-1" -->
                                    <el-menu-item
                                        v-for='(child,cindex) in item.children'
                                        v-if="!child.hidden"
                                        :index='item.path+"/"+child.path'>
                                       {{$t(child.name)}}<!-- {{route.path+'/'+item.path+'/'+child.path}} -->
                                    </el-menu-item>
                                </el-submenu>
                                <!-- :index="item.path+'/'+item.children[0].path"-->
                                <el-menu-item v-if="item.leaf&&item.children.length>0" :index='item.name'  >
                                    {{$t(item.name)}}<!---->
                                </el-menu-item>
                        </template>
                </el-menu>
            </el-col>
            <el-col :span="2" class="userinfo">
                <span class='username'>
                    <el-dropdown
                        trigger="click"
                        @command='setDialogInfo'>
                        <span class="el-dropdown-link">
                            {{this.$store.state.user.userinfo.username}}<i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                command='pass'
                               >{{$t('Change Password')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </span>
                <i class="fa fa-sign-out logout" @click='logout'></i>
            </el-col>
            <el-col :span="2" class="langinfo">
                <el-dropdown @command="handleCommand" trigger="click">
                    <span class="el-dropdown-link lang">{{$t('locales.' + locale)}}</span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item,key,index) in langs" :key="index" :command="key">{{$t('locales.' + key)}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>

        <drag-dialog
            v-if="changePassDialog.show"
            :isModal = "changePassDialog.isModal"
            title="Change Password"
            @close = "onclose('changePassDialog')"
        >   
                <form-data
                 ref='changePass-form'
                  style="padding:20px 40px 20px 20px"
                  :LabelWidth = 'changePassDialog.labelWidth' 
                  :FieldList='fieldlist'
                  :DefaultValue='changePassDialog.default_value'
                  :Rules='changePassDialog.rules'
                  @onSubmit='updUserPass'
                  >
                  </form-data>
        </drag-dialog>    

        <drag-dialog
          class='drag_dialog'
          v-if="topTraders.show"
          :title="topTraders.title"
          @close = "onclose('topTraders')"
        >
            <top-traders ></top-traders>

        </drag-dialog>
        <drag-dialog
          class='drag_dialog'
          v-if="mt4Trades.show"
          :title="mt4Trades.title"
          @close = "onclose('mt4Trades')"
        >
            <mt4-trades ></mt4-trades>
        </drag-dialog>

        <drag-dialog
          class='drag_dialog'
          v-if="mt4Users.show"
          :title="mt4Users.title"
          @close = "onclose('mt4Users')"
        >
            <mt4-users ></mt4-users>
        </drag-dialog>

        <drag-dialog
          class='drag_dialog'
          v-if="mt4Positions.show"
          :title="mt4Positions.title"
          @close = "onclose('mt4Positions')"
        >
            <!-- <mt4-users ></mt4-users> -->
            <mt4-positions></mt4-positions> 
        </drag-dialog>

<!--         <drag-dialog
          class='drag_dialog'
          v-if="mt4Positions.show"
          :title="mt4Positions.title"
          @close = "onclose('mt4Positions')"
        >
              
        </drag-dialog> -->

    </header>
</template>

<script>
    import HeadNavJs from './HeadNav.js';
    export default HeadNavJs;
</script>

<style scoped lang='less'>
    .logo-container{
        height: 60px;
    }
    .logo{
        height: 50px;
        width: auto;
        margin-left: 10px;
        margin-top: 5px;
    }
    .fa-user{
        position: relative;
        top:-2px;
        margin-right: 4px;
    }
    .head-nav{
        width:100%;
        height: 60px;
        background: #324057;
        position: fixed;
        top:0px;
        left:0px;
        z-index: 999;
        color:#FFF;
        border-bottom: 1px solid #1F2D3D;

        .logout{
            width:60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            float: right;
            cursor: pointer;
        }
    }
    .userinfo{
        text-align: right;
    }
    .username{
        height: 60px;
        line-height: 60px;
        cursor: pointer;

        .el-dropdown{
            color:#FFF;
        }
    }
    .lang {
          height: 60px;
          line-height: 60px;
          cursor: pointer;
          color: #fff;
        }
        .dialog-footer{
            display:block;
            width:100%;
            text-align:center
        }
.request_warning{
    color: #000;

}
</style>

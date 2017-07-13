import {
    login as LoginApi,
    common as CommonApi
} from 'config/request.js';
import {LANGS} from 'i18n/lang';
import DragDialog from '../DragDialog/';
import FormData from '../FormData/';
import TopTraders from 'modules/TopTraders/';
import Mt4Trades from 'common/MT4Trades/';
import Mt4Users from 'common/MT4Users/';
import Mt4Positions from 'modules/MT4Positions/';
import Vue from 'vue';
module.exports = {
    name: 'head-nav',
    components:{
        FormData,
         DragDialog,
         TopTraders,
         Mt4Positions,
         Mt4Users,
         Mt4Trades
    },
    data() {
        return {
                    request_warning_title:{
                        text: 'Request Warning'
                    },

                    topTraders:{
                            show:false,
                            title:{
                                text:'Top Traders',
                          }
                    },
                    mt4Positions:{
                            show:false,
                            title:{
                                text:'MT4 Positions',
                          }
                    },
                    mt4Trades:{
                        show:false,
                            title:{
                                text:'MT4 Traders',
                                className:''
                          }
                    },
                    mt4Users:{
                        show:false,
                            title:{
                                text:'MT4 Users',
                                className:''
                          }
                    },
            changePassDialog:{
                        show:false,
                        isModal: true,
                        default_value:{},
                        labelWidth: "180px",
                        rules: {
                                ori_password: [{
                                    required: true,
                                    message: '旧密码不能为空！',
                                    trigger: 'blur'
                                }],
                                new_password: [{
                                    required: true,
                                    message: '新密码不能为空！',
                                    trigger: 'blur'
                                }, {
                                    trigger: 'blur',
                                    validator: (rule, value, callback) => {
                                        if (value === '') {
                                            callback(new Error('请再次输入密码'));
                                        } else {
                                            if ('' !== this.changePassDialog.default_value.new_password) {
                                                this.$refs["changePass-form"].$refs["form-data"].validateField('confirm_password');
                                            }
                                            callback();
                                        }
                                    }
                                }],
                                confirm_password: [{
                                    required: true,
                                    message: '确认密码不能为空！',
                                    trigger: 'blur'
                                }, {
                                    trigger: 'blur',
                                    validator: (rule, value, callback) => {
                                        if (value === '') {
                                            callback(new Error('请再次输入密码'));
                                        } else if (value !==  this.changePassDialog.default_value.new_password) {
                                            callback(new Error('两次输入密码不一致!'));
                                        } else {
                                            callback();
                                        }
                                    }
                                }],
                            }                  
                        },
            locale: this.$store.state.global.locale,
            langs: LANGS
            }
    },
    computed: {
        routesFilter: function(){
          var routesList = this.$router.options.routes;
          return  routesList.filter(function(item){
                return item.direction == 'landscape';
          })
        },
        fieldlist(){
            return  [
                    {
                        type:'input',
                        key:'username',
                        label: 'User',
                        disabled: true
                        // value:''
                    },
                    {
                      type:'input',
                        key:'ori_password',
                        // value:'',
                        label:'Origin Password'
                    },
                    {
                      type:'input',
                        key:'new_password',
                        // value:'',
                        label: 'Password'
                    },
                    {
                        type:'input',
                        key:'confirm_password',
                        // value:'',
                        label: 'Confirm Password'
                    }
                    ]
            }
    },
    mounted() {
        // this.onGetSetting();
        Vue.config.lang = this.$store.state.global.locale;
    },
    methods: {
        /**
         * 
         */
        onselect(index){
                switch(index){
                    case 'Top Traders' : 
                                        this.topTraders.show = true; 
                                        break;
                    case 'MT4 Positions': 
                                        this.mt4Positions.show = true;
                                        break;
                    case 'MT4 Trades':
                                        this.mt4Trades.show = true; 
                                        break;
                    case 'MT4 User' : 
                                        this.mt4Users.show = true;
                                        break;
                }
        },
        onclose(type){
            this[type].show =false;
        },
        /**
         * 退出登录
         */
        logout() {
            this.$confirm('你确定退出登录么?', '确认退出', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                LoginApi.logout.call(this,(data)=>{
                    this.$store.dispatch('remove_userinfo').then(() => {
                    this.$router.push('/login');
                    });
                });
            });
        },

        /**
         * 弹出框-修改密码或者系统设置
         * @param {string} cmditem 弹框类型
         */
        setDialogInfo(cmditem) {
            if (!cmditem) {
                this.$message.error('菜单选项缺少command属性');
                return;
            }
            console.log('dianji',cmditem);
            switch (cmditem) {
                case 'pass':
                console.log('nav',this);
                    this.changePassDialog.default_value ={
                         username: this.$store.state.user.userinfo.username,
                         ori_password : '',
                         new_password : '',
                         confirm_password : ''
                    }
                    this.changePassDialog.show = true;
                    break;
            }
        },
        /**
         * 修改密码
         * @param  {object} userinfo 当前修改密码的表单信息
         */
        updUserPass(data) {
                            var params= {
                                    func_name:'user.change_password',
                                    args:[this.$store.state.user.userinfo.user_id , data.ori_password, data.new_password]
                            }
                            CommonApi.postFormAjax.call(this,params, (data) => {
                                this.changePassDialog.show = false;                 
                                this.$store.dispatch('remove_userinfo').then(() => {
                                this.$router.push('/login');
                                 this.$message.success('修改成, 请重新登录!');
                                });
                    });
        },
        /**
         * 更改系统默认语言
         * @Author Dannis
         * @param  {[type]} command [description]
         * @return {[type]}         [description]
         */
      handleCommand(command) {
         this.$store.dispatch('update_global_locale',command).then(() => {
                                this.locale = command;   
                                Vue.config.lang = command; 
                            });
      
    },
    }
}

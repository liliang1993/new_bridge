import {
        login as LoginApi,
        common as CommonApi
} from '../../config/request.js';
module.exports = {
        name: 'login',
        data() {
                return {
                        winSize: {
                                width: '',
                                height: ''
                        },
                        formOffset: {
                                position: 'absolute',
                                left: '',
                                top: ''
                        },
                        remumber: this.$store.state.user.remumber,
                        login_actions: {
                                disabled: false
                        },
                        data: {
                                username: '',
                                password: '',
                                // token: ''
                        },
                        rule_data: {
                                username: [{
                                        required: true,
                                        message: '用户名不能为空！',
                                        trigger: 'blur'
                                }],
                                password: [{
                                        required: true,
                                        message: '密码不能为空！',
                                        trigger: 'blur'
                                }],
                        }
                }
        },
        methods: {
                setSize() {
                        this.winSize.width = $(window).width() + "px";
                        this.winSize.height = $(window).height() + "px";
                        this.formOffset.left = (parseInt(this.winSize.width) / 2 - 175) + 'px';
                        this.formOffset.top = (parseInt(this.winSize.height) / 2 - 178) + 'px';
                },
                login(ref) {
                        this.$refs[ref].validate((valid) => {
                                if (valid) {
                                        this.login_actions.disabled = true;
                                        LoginApi.login.call(this , this[ref] , res => {
                                                if (res.result == true) {
                                                        console.log('res', res);
                                                        this.$store.dispatch('update_userinfo', {
                                                                userinfo: res.data
                                                        }).then(() => {
                                                                this.get_global_lps();
                                                                this.get_global_std_symbols ();
                                                                this.login_actions.disabled = false;
                                                                console.log('Roles',res.data);
                                                                if(res.data.role === 'Admin'){
                                                                        this.$router.push({
                                                                                path: '/home/user'
                                                                        });
                                                                }else if (res.data.role === 'RulesEditor'){
                                                                         this.$router.push({
                                                                                path: '/home/lp'
                                                                        });
                                                                }
                                                        });
                                                } else {
                                                        this.login_actions.disabled = false;
                                                        this.$message.error(res.message);
                                                }
                                        }, {
                                                errFn() {
                                                        this.login_actions.disabled = false;
                                                }
                                        });
                                }
                        });
                },
                resetForm(ref) {
                        this.$refs[ref].resetFields();
                }
        },
        created() {
                this.setSize();
                $(window).resize(() => {
                        this.setSize();
                });
        },
        mounted() {}
}
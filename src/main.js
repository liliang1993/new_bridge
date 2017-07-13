import Vue from 'vue';
import i18n from './i18n';
import $ from 'jquery';
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
Vue.use(ElementUI);

// var dialog = require('art-dialog');
//airDialog
import 'libs/artDialog/css/ui-dialog.css';
import artDialog from 'libs/artDialog/dialog-plus'
Vue.use( artDialog);

// //websocket
// import VueWebsocket from "vue-websocket";
// Vue.use(VueWebsocket,"ws://localhost", {
//     reconnection: false
// });
//bel-table
import BelTable from 'vue-bel-table'
Vue.use(BelTable);

//cookies
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// vuex
import Vuex from 'vuex';
Vue.use(Vuex);

//页面顶部进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


// root component
import App from './App';

//vuex store
import store from './store/';


import routes from './config/router.js';


import 'plugins/';
import 'mixin/';

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    window.scroll(0, 0);
    console.log('user',store.state.user.userinfo);
    if (!store.state.user.userinfo.user_id&& to.path !== '/login') {
         store.dispatch('remove_userinfo');
         next('/login');
     } else {
         if (store.state.user.userinfo.user_id&& to.path === '/login') {
             next({
                 path: '/home/user'
             });
         } else {
            NProgress.start();
            next();
         }
    }
})

router.afterEach(transition => {
    NProgress.done();
});



const appAdmin = new Vue({
    el: '#app',
    data() {
        return {

        };
    },
    // template: '<App/>',
    router,
    store,
    render: h => h(App)
})

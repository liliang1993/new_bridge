import {
    Login,
    Home,
    NotFound,
    Content,
    Modules
} from '../components/';

// console.log(Modules);
//重定向的默认路径不能写在首位,否则会影响点击后导航菜单的高亮样式
module.exports = [
{
    path: '/',
    redirect: to => {
        return 'login';
    },
    hidden: true
}, {
    path: '/login',
    component: Login,
    hidden: true
}, {
    path: '/404',
    component: Home,
    hidden: true,
    children: [{
        path: '',
        component: NotFound
    }]
},
{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'UserEdit',
    direction: 'vertical',
    component: Home,
    leaf: true, //单节点标志
    // hidden: true,
    children: [
    {
         path: 'user',
         name: 'User',
         icon: 'inbox',
        component: Modules.User.List
    },{
     hidden: true,
     path: '',
     redirect: to => {
         return 'user'
    }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'LogView',
    direction: 'vertical',
    component: Home,
    leaf: true, //单节点标志
    // hidden: true,
    children: [
    {
         path: 'auditlog',
         name: 'Audit log',
         icon: 'inbox',
        component: Modules.AduitLog.List
    },{
     hidden: true,
     path: '',
     redirect: to => {
         return 'auditlog'
    }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    direction: 'vertical',
    rights:'RulesEdit',
    component: Home,
    leaf: true, //单节点标志
    // hidden: true,
    children: [
    {
         path: 'lp',
         name: 'LP',
         icon: 'inbox',
        component: Modules.LP.List
    },{
     hidden: true,
     path: '',
     redirect: to => {
         return 'lp'
    }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'RulesEdit',
    direction: 'vertical',
    component: Home,
    leaf: true, //单节点标志
    // hidden: true,
    children: [
    {
         path: 'lpsymbol',
         name: 'LP Symbol',
         icon: 'inbox',
        component: Modules.LPSymbol.List
    },{
     hidden: true,
     path: '',
     redirect: to => {
         return 'lpsymbol'
    }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'RulesEdit',
    direction: 'vertical',
    component: Home,
    leaf: true, //单节点标志
    // hidden: true,
    children: [
    {
         path: 'traderule',
         name: 'Trade rule',
         icon: 'inbox',
        component: Modules.TradeRule1.List
    },{
     hidden: true,
     path: '',
     redirect: to => {
         return 'traderule'
    }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'RulesEdit',
    direction: 'vertical',
    component: Home,
    leaf: true, //单节点标志
    // hidden: true,
    children: [
    {
         path: 'qutoerule',
         name: 'Qutoe rule',
         icon: 'inbox',
        component: Modules.QutoeRule.List
    },{
     hidden: true,
     path: '',
     redirect: to => {
         return 'qutoerule'
    }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'RulesEdit',
    direction: 'vertical',
    component: Home,
    leaf: true, //单节点标志
    // hidden: true,
    children: [
    {
         path: 'currentorder',
         name: 'Current order',
         icon: 'inbox',
        component: Modules.CurrentOrder.List
    },{
     hidden: true,
     path: '',
     redirect: to => {
         return 'currentorder'
    }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'RulesEdit',
    direction: 'vertical',
    component: Home,
    leaf: true, //单节点标志
    // hidden: true,
    children: [
    {
         path: 'tradelog',
         name: 'Trade log',
         icon: 'inbox',
        component: Modules.TradeLog.List
    },{
     hidden: true,
     path: '',
     redirect: to => {
         return 'tradelog'
    }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'RulesEdit',
    direction: 'vertical',
    component: Home,
    // hidden: true,
    leaf: true,
    children: [
    {
        path: 'lpposition',
        name: 'LP position',
        component:Modules.LPPosition.List
      },{
         hidden: true,
         path: '',
         redirect: to => {
             return 'lpposition'
        }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'RulesEdit',
    direction: 'vertical',
    component: Home,
    // hidden: true,
    leaf: true,
    children: [
    {
        path: 'quoteadjust',
        name: 'Quote Adjust',
        component:Modules.QuoteAdjust.List
      },{
         hidden: true,
         path: '',
         redirect: to => {
             return 'quoteadjust'
        }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    rights:'RulesEdit',
    direction: 'vertical',
    rights:'RulesEdit',
    component: Home,
    // hidden: true,
    leaf: true,
    children: [
    {
        path: 'stdsymbolposition',
        name: 'STD symbol position',
        component:Modules.STDSymbolPosition.List
      },{
         hidden: true,
         path: '',
         redirect: to => {
             return 'stdsymbolposition'
        }
    }]
},{
    path: '/home',
    name: 'Home',
    icon: 'inbox',
    direction: 'vertical',
    component: Home,
    rights:'RulesEdit',
    // hidden: true,
    leaf: true,
    children: [
    {
        path: 'diagnosis',
        name: 'Diagnosis',
        component:Modules.Diagnosis.List
      },{
         hidden: true,
         path: '',
         redirect: to => {
             return 'diagnosis'
        }
    }]
},
{
    path: '/Toptraders',
    name: 'Top Traders',
    icon: 'inbox',
    direction: 'landscape',
    leaf: true,
    component: Home,
    children: [{
        path: 'list',
        name: 'List',
        component:  Modules.TopTraders.List
    }]
},
{
    path: '/MT4positions',
    name: 'MT4 Positions',
    icon: 'inbox',
    direction: 'landscape',
    component: Home,
    leaf: true,
    children: [{
        path: 'mt4positions',
        name: 'MT4positions',
        component: Modules.MT4Positions.List
    }
    ]
},
{
    path: '/MT4trades',
    name: 'MT4 Trades',
    icon: 'inbox',
    direction: 'landscape',
    component: Home,
    leaf: true,
    children: [
    {
        path: 'mt4trades',
        name: 'MT4trades',
        component: Modules.MT4Trades.List
    }]
},
{
    path: '/mt4user',
    name: 'MT4 User',
    icon: 'inbox',
    direction: 'landscape',
    component: Home,
    leaf: true,
    children: [{
        path: 'User',
        name: 'MT4User',
        component: Modules.MT4User.List
    }]
},

]

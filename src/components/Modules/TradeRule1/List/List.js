// import {
                //         FormDialog,
                //         FormData,
                //         DragDialog
                // } from 'common/';
                // import ViewGroup from '../Group/';
                // import ViewRule from '../Detail/';
                // import CopyGroup from '../CopyGroup/';
                // import {
                //         common as CommonApi
                // } from 'config/request.js';
                // module.exports = {
                //         name: 'user-list',
                //         components: {
                //                 FormDialog,
                //                 FormData,
                //                 DragDialog,
                //                 ViewRule,
                //                 ViewGroup,
                //                 CopyGroup
                //         },
                //         data() {
                //                 return {
                //                         tableData: [],
                //                         remarks: [],
                //                         groups: [],
                //                         rules: [],
                //                         Remark: {
                //                                 fieldlist: [{
                //                                         type: 'textarea',
                //                                         key: 'remark',
                //                                         // value:'',
                //                                         label: 'Remark'
                //                                 }],
                //                                 default_value: {},
                //                                 rules: {
                //                                         name: {}
                //                                 }
                //                         },
                //                         add_group: {
                //                                 show: false,
                //                                 title: {
                //                                         text: '',
                //                                         className: ''
                //                                 },
                //                                 isModal: true,
                //                                 config: {
                //                                         type: 'add',
                //                                         source: 'risehills',
                //                                         group: '',
                //                                         mt4_symbol: '',
                //                                         std_symbol: '',
                //                                         attributes: {
                //                                                 route_type: {
                //                                                         left: 'bestright',
                //                                                         right: 'ratio',
                //                                                         threshold: '0'
                //                                                 },
                //                                                 coverage: '',
                //                                                 better_fill: '',
                //                                                 open_partial: 'true',
                //                                                 open_lp_rejected_retry: 'false',
                //                                                 better_fill: '',
                //                                                 open_probe: '',
                //                                                 close_threshold: '',
                //                                                 close_probe: '',
                //                                                 limit_order_types: [],
                //                                                 lps: [],
                //                                                 bbook_exec_type: 'vwap',
                //                                                 slippages: []
                //                                         }
                //                                 }
                //                         }
                //                 }
                //         },
                //         computed: {
                //                 tableConfig: {
                //                         get() {
                //                                 return {
                //                                         table: {
                //                                                 attr: {
                //                                                         data: this.tableData,
                //                                                         maxHeight: '100%'
                //                                                 }
                //                                         },
                //                                         columns: [{
                //                                                 attr: {
                //                                                         prop: 'source',
                //                                                         label: this.$t('source'),
                //                                                         Width: 80,
                //                                                         sortable: true,
                //                                                         // scopedSlot: 'date',
                //                                                         align: 'center'
                //                                                 }
                //                                         }, {
                //                                                 attr: {
                //                                                         prop: 'group',
                //                                                         label: this.$t('group'),
                //                                                         Width: 80,
                //                                                         sortable: true,
                //                                                         align: 'center'
                //                                                 }
                //                                         }, {
                //                                                 attr: {
                //                                                         prop: 'mt4_symbol_count',
                //                                                         label: this.$t('MT4 symbol'),
                //                                                         Width: 40,
                //                                                         sortable: true,
                //                                                         align: 'center'
                //                                                 }
                //                                         }, {
                //                                                 attr: {
                //                                                         // prop: 'weight',
                //                                                         label: this.$t('View rules'),
                //                                                         width: 100,
                //                                                         sortable: true,
                //                                                         align: 'center',
                //                                                         scopedSlot: 'rulesdetail',
                //                                                 }
                //                                         }, {
                //                                                 attr: {
                //                                                         // prop: 'weight',
                //                                                         label: this.$t('Create to new rules'),
                //                                                         width: 180,
                //                                                         sortable: true,
                //                                                         align: 'center',
                //                                                         scopedSlot: 'copygroup',
                //                                                 }
                //                                         }, {
                //                                                 attr: {
                //                                                         prop: 'remark',
                //                                                         label: this.$t('Remark'),
                //                                                         width: 100,
                //                                                         sortable: true,
                //                                                         align: 'center',
                //                                                         scopedSlot: 'remark',
                //                                                 }
                //                                         }]
                //                                 }
                //                         },
                //                 }
                //         },
                //         methods: {
                //                 onRemarkSubmit(data, index) {
                //                         var params = {
                //                                 func_name: "trade_rule_remark.update_remark",
                //                                 args: [data.group, data.remark]
                //                         }
                //                         CommonApi.postFormAjax.call(this, params, data => {
                //                                 this.onCloseRowDialog("remarks", index);
                //                                 this.init();
                //                         });
                //                 },
                //                 onCloseRowDialog(type, index) {
                //                         this[type].splice(index, 1);
                //                 },
                //                 onEditRemark(row) {
                //                         var title = {
                //                                 text: 'Edit ' + row.source + "-" + row.group + ' remark'
                //                         }
                //                         var id = row.source + '-' + row.group;
                //                         var default_value = {
                //                                 remark: row.remark,
                //                                 group: row.group
                //                         };
                //                         var config = Object.assign({}, this.Remark, {
                //                                 default_value
                //                         })
                //                         var remark = {
                //                                 title,
                //                                 config,
                //                                 id
                //                         };
                //                         if (!this.isDialogExist(this.remarks, remark)) {
                //                                 this.remarks.push(remark);
                //                         };
                //                 },
                //                 onRulesDetail(row) {
                //                         var title = {
                //                                 text: 'Trade Rules - Source:' + row.source + ' Group:' + row.group
                //                         }
                //                         var id = row.source + '-' + row.group;
                //                         var config = row.view_rule;
                //                         var rule = {
                //                                 title,
                //                                 config,
                //                                 id
                //                         };
                //                         if (!this.isDialogExist(this.rules, rule)) {
                //                                 this.rules.push(rule);
                //                         };
                //                 },
                //                 resetTradeRule(data) {
                //                         // this.onGetTradeRuleList(()=>{
                //                         // });
                //                 },
                //                 onCopyGroup(row) {
                //                         var title = {
                //                                 text: 'Copy ' + row.source + ' - ' + row.group + ' to new group'
                //                         };
                //                         var id = row.source + '-' + row.group;
                //                         var default_value = {
                //                                 source: row.source,
                //                                 group: ''
                //                         };
                //                         var group = {
                //                                 title,
                //                                 default_value,
                //                                 id,
                //                                 row
                //                         };
                //                         if (!this.isDialogExist(this.groups, group)) {
                //                                 this.groups.push(group);
                //                         };
                //                 },
                //                 onCopyGroupSubmit(data, index) {
                //                         var temp = [];
                //                         var group = this.groups[index];
                //                         for (var attr of group.row.view_rule) {
                //                                 Object.assign(attr, {
                //                                         source: data.source,
                //                                         group: data.group
                //                                 });
                //                         }
                //                         var params = {
                //                                 func_name: "router_api.trade_add_rules",
                //                                 args: [group.row.view_rule]
                //                         }
                //                         CommonApi.postFormAjax.call(this, params, data => {
                //                                 this.onCloseRowDialog("groups", index);
                //                                 this.init();
                //                         });
                //                 },
                //                 onCloseAddGroup() {
                //                         this.add_group.show = false;
                //                 },
                //                 update_convert_limit_order_types(rows) {
                //                         var j, row, limit_order_type, limit_order_type;
                //                         for (row of rows) {
                //                                 row.convert_limit_order_types = [];
                //                                 for (j = 0; j < this.$store.state.global.limit_order_types.length; j++) {
                //                                         row.convert_limit_order_types.push({
                //                                                 input_val: '',
                //                                                 checkbox_val: false
                //                                         });
                //                                 };
                //                                 for (var item of row.attributes.limit_order_types) {
                //                                         this.$set(row.convert_limit_order_types, item.type, {
                //                                                 checkbox_val: true,
                //                                                 input_val: item.tol
                //                                         });
                //                                 }
                //                         };
                //                 },
                //                 onSubmitGroup({
                //                         source,
                //                         group,
                //                         mt4_symbol,
                //                         std_symbol,
                //                         attributes
                //                 }) {
                //                         this.add_group.show = false;
                //                         var id = source + "-" + group;
                //                         var func_name = this.add_group.title.text == 'Add trade rule' ? 'router_api.trade_add_rule' : 'router_api.trade_update_rule';
                //                         var params = {
                //                                 func_name,
                //                                 args: [source, group, mt4_symbol, std_symbol, attributes]
                //                         }
                //                         CommonApi.postFormAjax.call(this, params, data => {
                //                                 this.init();
                //                                 for (var rule of this.rules) {
                //                                         if (rule.id === id) {
                //                                                 for (var row of rule.config) {
                //                                                         if (row.mt4_symbol == mt4_symbol) {
                //                                                                 Object.assign(row, {
                //                                                                         std_symbol,
                //                                                                         attributes
                //                                                                 });
                //                                                                 this.update_convert_limit_order_types(rule.config);
                //                                                                 return;
                //                                                         };
                //                                                 };
                //                                                 if (this.add_group.title.text == 'Add trade rule') {
                //                                                         rule.config.push({
                //                                                                 source,
                //                                                                 group,
                //                                                                 mt4_symbol,
                //                                                                 std_symbol,
                //                                                                 attributes
                //                                                         });
                //                                                         this.update_convert_limit_order_types(rule.config);
                //                                                 }
                //                                         }
                //                                 }
                //                         })
                //                 },
                //                 onAddGroup() {
                //                         this.add_group.show = true;
                //                         this.resetGroupConfig();
                //                         this.add_group.title.text = 'Add trade rule';
                //                 },
                //                 onShowAddRules(opts) {
                //                         this.resetGroupConfig();
                //                         this.add_group.config = Object.assign({}, this.add_group.config, {
                //                                 source: opts.source,
                //                                 group: opts.group
                //                         });
                //                         this.add_group.show = true;
                //                         this.add_group.title.text = 'Add trade rule';
                //                 },
                //                 onShowRowRules(opts) {
                //                         this.add_group.show = true;
                //                         this.add_group.title.text = 'Edit trade rule';
                //                         this.resetGroupConfig();
                //                         Object.assign(this.add_group.config, opts);
                //                 },
                //                 onSubmitChanges(rows) {
                //                         this.init();
                //                         for (var rule of this.rules) {
                //                                 if (rule.id === rows[0].source + '-' + rows[0].group) {
                //                                         this.update_convert_limit_order_types(rows);
                //                                         rule.config = rows;
                //                                         break;
                //                                 }
                //                         };
                //                 },
                //                 onSingleDeleteRule(row) {
                //                         var args = [row.source, row.group, row.mt4_symbol];
                //                         var params = {
                //                                 func_name: "router_api.trade_del_rule",
                //                                 args
                //                         };
                //                         CommonApi.postFormAjax.call(this, params, data => {
                //                                 this.init();
                //                                 for (var rule of this.rules) {
                //                                         if (rule.id === row.source + '-' + row.group) {
                //                                                 for (var i = 0; i < rule.config.length; i++) {
                //                                                         var item = rule.config[i];
                //                                                         if (item.mt4_symbol === row.mt4_symbol) {
                //                                                                 rule.config.splice(i, 1);
                //                                                         }
                //                                                 }
                //                                         }
                //                                 };
                //                         })
                //                 },
                //                 onBatchDeleteRule(rows) {
                //                         var args = [];
                //                         for (var row of rows) {
                //                                 args.push({
                //                                         source: row.source,
                //                                         group: row.group,
                //                                         mt4_symbol: row.mt4_symbol
                //                                 });
                //                         };
                //                         var params = {
                //                                 func_name: "router_api.trade_del_rules",
                //                                 args: [args]
                //                         };
                //                         CommonApi.postFormAjax.call(this, params, data => {
                //                                 this.init();
                //                                 for (var rule of this.rules) {
                //                                         if (rule.id === rows[0].source + '-' + rows[0].group) {
                //                                                 for (var row of rows) {
                //                                                         for (var i = 0; i < rule.config.length; i++) {
                //                                                                 var item = rule.config[i];
                //                                                                 if (item.mt4_symbol === row.mt4_symbol) {
                //                                                                         rule.config.splice(i, 1);
                //                                                                         break;
                //                                                                 };
                //                                                         };
                //                                                 };
                //                                         };
                //                                 };
                //                         });
                //                 },
                //                 resetGroupConfig() {
                //                         this.add_group.config = {
                //                                 type: 'add',
                //                                 source: 'risehills',
                //                                 group: '',
                //                                 mt4_symbol: '',
                //                                 std_symbol: '',
                //                                 attributes: {
                //                                         route_type: {
                //                                                 left: 'bestright',
                //                                                 right: 'ratio',
                //                                                 threshold: '0'
                //                                         },
                //                                         coverage: '',
                //                                         better_fill: '',
                //                                         open_partial: 'true',
                //                                         open_lp_rejected_retry: 'false',
                //                                         better_fill: '',
                //                                         open_probe: '',
                //                                         close_threshold: '',
                //                                         close_probe: '',
                //                                         limit_order_types: [],
                //                                         lps: [],
                //                                         bbook_exec_type: 'vwap',
                //                                         slippages: []
                //                                 }
                //                         }
                //                 },
                //                 combineSourceandGroup(data) {
                //                         var temp = [];
                //                         for (var rule of data) {
                //                                 if (temp.length > 0) {
                //                                         var flag = false;
                //                                         for (var item of temp) {
                //                                                 if (item[0].source == rule.source && item[0].group == rule.group) {
                //                                                         flag = true;
                //                                                         item.push(rule);
                //                                                         break;
                //                                                 }
                //                                         }
                //                                         if (flag == false) {
                //                                                 temp.push([rule])
                //                                         }
                //                                 } else {
                //                                         temp.push([rule]);
                //                                 }
                //                         };
                //                         return temp;
                //                 },
                //                 onGetTradeRuleList(fn = null) {
                //                         var params = {
                //                                 func_name: 'router_api.trade_get_all_rules'
                //                         }
                //                         CommonApi.postNormalAjax.call(this, params, data => {
                //                                 var tempArr = [];
                //                                 //add
                //                                 this.update_convert_limit_order_types(data);
                //                                 //
                //                                 var arr = this.combineSourceandGroup(data);
                //                                 arr.forEach(item => {
                //                                         var opts = {};
                //                                         opts.mt4_symbol_count = item.length;
                //                                         opts.source = item[0].source;
                //                                         opts.group = item[0].group;
                //                                         opts.remark = '';
                //                                         opts.view_rule = item;
                //                                         tempArr.push(opts);
                //                                 });
                //                                 tempArr.sort((a, b) => {
                //                                         if (a.source > b.source) {
                //                                                 return 1
                //                                         } else if (a.source < b.source) {
                //                                                 return -1
                //                                         } else if (a.group > b.group) {
                //                                                 return 1
                //                                         } else if (a.group < b.group) {
                //                                                 return -1
                //                                         } else {
                //                                                 return 0
                //                                         }
                //                                 });
                //                                 this.tableData = this.onMergeAllRemark(tempArr, fn);
                //                         });
                //                 },
                //                 onMergeAllRemark(temp, fn) {
                //                         var params = {
                //                                 func_name: 'trade_rule_remark.get_all_remarks'
                //                         }
                //                         CommonApi.postNormalAjax.call(this, params, data => {
                //                                 for (var item of data) {
                //                                         for (var list of temp) {
                //                                                 if (item.group == list.group) {
                //                                                         Object.assign(list, item);
                //                                                         break;
                //                                                 }
                //                                         }
                //                                 }
                //                                 fn && fn();  
                //                         });
                //                         // console.log('tabledata',list,this.tableData);  
                //                         return temp;
                //                 },
                //                 // init:()=>{
                //                 //     return new Promise((resolve,reject)=>{
                //                 //       console.log('this',this);
                //                 //       this.onGetTradeRuleList();
                //                 //       resolve();
                //                 //     });
                //                 //   }
                //                 init() {
                //                         this.onGetTradeRuleList();
                //                 }
                //         },
                //         mounted() {
                //                 this.init();
                //         }
// }
import {
        FormData1,
} from 'common/';
module.exports = {
        name:'form',
        components: {
                FormData1
                },
        data(){
                return{
                     fieldlist: [ {
                          key: 'source',
                          type: 'select',
                          label: this.$t('Source'),
                          value: {
                              default: 'risehills',
                              list: [{
                                  value: 'risehills',
                                  text: 'risehills'
                              }, {
                                  value: 'solid',
                                  text: 'solid'
                              }]
                          }
                        },{
                          key: 'route_type',
                          type: 'RouteType',
                          label:'route_type',
                          default:{
                                threshold : 0,
                                right: 'ratio',
                                left:'bestright'
                          }
                        },{
                            key: 'slippages',
                          type: 'MultipleInput',
                          label:'slippages',
                          spec:[{
                                desc:'>= size'
                          },{
                                desc:'min slippage'       
                          },{
                                desc: 'max slippage'
                          }]    
                        },{
                            key:'limit_order_types',
                            type: 'CheckboxAndInputList',
                            label:'limit_order_types',
                            desc:"Do not change MT4's request price",
                            spec:["Instant","Market","Pending","Stopout","StopLoss","TakeProfit"]
                        }]   
                }
        }

}
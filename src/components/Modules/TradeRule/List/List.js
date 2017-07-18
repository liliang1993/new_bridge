import {
    FormData1,
    DragDialog
} from 'common/';
import ViewGroup from '../Group/';
import ViewRule from '../Detail/';
import CopyGroup from '../CopyGroup/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'user-list',
    components: {
        FormData1,
        DragDialog,
        ViewRule,
        ViewGroup,
        CopyGroup,
    },
    data() {
        return {
            tableData: [],
            remarks: [],
            groups: [],
            rules: [],
            create_new_group_dialog: {
                title: 'Add trade rule',
                isModal: true,
                show: false,
                default_value:{}
            },
            trade_rules:[],
        }
    },
    computed: {
        tableConfig: {
            get() {
                return {
                    table: {
                        attr: {
                            data: this.tableData,
                            maxHeight: '100%'
                        }
                    },
                    columns: [{
                        attr: {
                            prop: 'source',
                            label: this.$t('source'),
                            Width: 80,
                            sortable: true,
                            // scopedSlot: 'date',
                            align: 'center'
                        }
                    }, {
                        attr: {
                            prop: 'group',
                            label: this.$t('group'),
                            Width: 80,
                            sortable: true,
                            align: 'center'
                        }
                    }, {
                        attr: {
                            label: this.$t('MT4 symbol'),
                            Width: 40,
                            sortable: true,
                            formatter(item) {
                                return item.mt4_symbols.length;
                            },
                            align: 'center',
                        }
                    }, {
                        attr: {
                            // prop: 'weight',
                            label: this.$t('View rules'),
                            width: 100,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'rulesdetail',
                        }
                    }, {
                        attr: {
                            // prop: 'weight',
                            label: this.$t('Create to new rules'),
                            width: 180,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'copygroup',
                        }
                    }, {
                        attr: {
                            prop: 'remark',
                            label: this.$t('Remark'),
                            width: 100,
                            sortable: true,
                            align: 'center',
                            scopedSlot: 'remark',
                        }
                    }]
                }
            },
        },
        fieldlist() {
            return [{
                    key: 'source',
                    type: 'select',
                    value: {
                        default: '',
                        list: (() => {
                            var i, len, sources, source, result;
                            result = [];
                            sources = this.$store.state.global.sources;
                            for (i = 0, len = sources.length; i < len; i++) {
                                source = sources[i];
                                result.push({
                                    value: source,
                                    text: source
                                });
                            }
                            return result;
                        })()
                    },
                    desc: '请选择',
                    label: 'source'
                }, {
                    type: 'input',
                    key: 'group',
                    value: '',
                    label: 'Group'
                }, {
                    type: 'input',
                    key: 'mt4_symbol',
                    value: '',
                    label: 'MT4 Symbol'
                }, {
                    key: 'std_symbol',
                    type: 'select',
                    value: {
                        default: '',
                        list: (() => {
                            var i, len, std_symbols, std_symbol, result;
                            result = [];
                            std_symbols = this.$store.state.global.std_symbols;
                            for (i = 0, len = std_symbols.length; i < len; i++) {
                                std_symbol = std_symbols[i];
                                result.push({
                                    value: std_symbol,
                                    text: std_symbol
                                });
                            }
                            return result;
                        })()
                    },
                    desc: '请选择',
                    label: 'status'
                }, {
                    key: 'route_type',
                    type: 'RouteType',
                    label: 'route_type',
                    default: {
                        threshold: 0,
                        right: 'ratio',
                        left: 'bestright'
                    }
                },
                {
                    type: 'input',
                    key: 'coverage',
                    value: '',
                    label: 'coverage'
                },{
                    type: 'input',
                    key: 'better_fill',
                    value: '',
                    label: 'better_fill'
                },
                {
                    key: 'open_partial',
                    type: 'select',
                    value: {
                        default: true,
                        list: [{
                            value: true,
                            text: 'true'
                        }, {
                            value: false,
                            text: 'false'
                        }]
                    },
                    desc: '请选择',
                    label: 'open_partial'
                }, {
                    key: 'open_lp_rejected_retry',
                    type: 'select',
                    value: {
                        default: false,
                        list: [{
                            value: true,
                            text: 'true'
                        }, {
                            value: false,
                            text: 'false'
                        }]
                    },
                    desc: '请选择',
                    label: 'open_lp_rejected_retry  '
                },{
                    type: 'input',
                    key: 'open_threshold',
                    value: '',
                    label: 'open_threshold'
                },{
                    type: 'input',
                    key: 'open_probe',
                    value: '',
                    label: 'open_probe'
                },{
                    type: 'input',
                    key: 'close_threshold',
                    value: '',
                    label: 'close_threshold'
                },{
                    type: 'input',
                    key: 'close_probe',
                    value: '',
                    label: 'close_probe'
                },{
                    type: 'input',
                    key: 'close_probe',
                    value: '',
                    label: 'close_probe'
                },{
                    type: 'input',
                    key: 'markup',
                    value: '',
                    label: 'markup'
                },{
                    key: 'limit_order_types',
                    type: 'CheckboxAndInputList',
                    label: 'limit_order_types',
                    desc: "Do not change MT4's request price",
                    spec: ["Instant", "Market", "Pending", "Stopout", "StopLoss", "TakeProfit"]
                },{
                        label: 'lps',
                        type: 'CheckBoxList',
                        key: 'lps',
                        value: [],
                         list: (()=> {
                                      var i, len, results;
                                      results = [];
                                        var lps = this.$store.state.global.lps;
                                      for (i = 0, len = lps.length; i < len; i++) {
                                       var  lp = lps[i];
                                        console.log('lps', lps);
                                        results.push(lp);
                                      }
                                      console.log('results',results);
                                      return results;
                                    })()
                },
                {
                    key: 'bbook_exec_type',
                    type: 'select',
                    value: {
                        default: 'vwap',
                        list: [{
                            value:'vwap',
                            text: 'vwap'
                        }, {
                            value: 'worst',
                            text: 'worst'
                        }]
                    },
                    desc: '请选择',
                    label: 'bbook_exec_type'
                },{
                    key: 'slippages',
                    type: 'MultipleInput',
                    label: 'slippages',
                    spec: [{
                            type: 'float',
                            desc: '> =size'
                    }, {
                            type: 'float',
                            desc: 'min slippage'
                    }, {
                            type: 'float',
                            desc: 'max slippage'
                    }]
                }
            ]
        },
        get_up_traderule_table(){
            return this.$store.state.traderule.update_traderule_table;
        }
    },
    watch:{
        get_up_traderule_table(v){
                if(v){
                    if(v==true){
                         this.load_data();
                         this.$store.dispatch('update_traderule_table',false);
                    }
                }
        }
    },
    methods: {
        onCloseDialog(type) {
            this[type].show = false;
        },
        onEditRemark(row) {
            console.log('row',row);
            var title = {
                text: 'Edit ' + row.source + "-" + row.group + ' remark'
            }
            var key = row.source+"_"+row.group;
            var default_value = {
                remark: row.remark,
                group: row.group
            };
            console.log('default_value',default_value);
            var config  = Object.assign({},{default_value},{title});
            console.log('config',config);
            if (!(key in this.$store.state.traderule.remark_dialogs)) {
                this.$store.dispatch('update_remark_dialogs', {key,config});
            };
        },
        open_create_new_group_dialog(){
               this.create_new_group_dialog.show = true;
        },
        copy_to_new_group(row){
             console.log('row',row);
             var source = row.source;
             var group = row.group;
            var key = source+"_"+group;
            var title = 'Copy  '+source+' - '+group+' to new group';
            var config  = Object.assign({},{source,group,title});
            if (!(key in this.$store.state.traderule.copy_to_new_group_dialogs)) {
                this.$store.dispatch('update_copy_to_new_group_dialogs', {key,config});
            };
        },
        GroupTradeRulesTable(row){
            var title = {
                text: 'Trade Rules - Source:' + row.source + " Group: "+row.group 
            }
            var source = row.source;
            var group = row.group;
            var key = source+"_"+group;;
            var title = 'Trade Rules - Source:' +source+' Group: '+group;
            var tableData= [];
            var config = Object.assign({},{source,group,title});
            if (!(key in this.$store.state.traderule.view_rules_dialogs)) {
                this.$store.dispatch('update_view_rules_dialogs', {key,config});
            };
        },
        render_groups(rules) {
            var i, j, key, len, len1, rule, rule_key, source_group, source_groups, source_groups_dict;
            source_groups = [];
            this.$store.dispatch('update_trade_rules',rules);
            source_groups_dict = new Object;
            for (i = 0, len = rules.length; i < len; i++) {
                rule = rules[i];
                rule_key = [rule.source, rule.group];
                if (!(rule_key in source_groups_dict)) {
                    source_groups_dict[rule_key] = new Object({
                        source: rule.source,
                        group: rule.group,
                        mt4_symbols: [rule.mt4_symbol]
                    });
                } else {
                    source_groups_dict[rule_key].mt4_symbols.push(rule.mt4_symbol);
                }
            }
            for (key in source_groups_dict) {
                source_group = source_groups_dict[key];
                source_groups.push(source_group);
            }
            for (j = 0, len1 = source_groups.length; j < len1; j++) {
                source_group = source_groups[j];
                source_group.mt4_symbols.sort();
            }
            source_groups.sort(function(a, b) {
                if (a.source > b.source) {
                    return 1;
                } else if (a.source < b.source) {
                    return -1;
                } else {
                    if (a.group > b.group) {
                        return 1;
                    } else if (a.group < b.group) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            });
            this.tableData = source_groups;
            console.log('tableData',this.tableData);
        },
        render_remarks() {
            var i, j, len, len1, remark_dict, remark, row;
            var params = {
                func_name: 'trade_rule_remark.get_all_remarks'
            }
            remark_dict = new Object;
            CommonApi.postFormAjax.call(this, params, remarks => {
                for (i = 0, len = remarks.length; i < len; i++) {
                    remark = remarks[i];
                    remark_dict[remark.group] = remark.remark;
                };
                console.log('remark_dict', remark_dict);
                for (j = 0, len1 = this.tableData.length; j < len1; j++) {
                    row = this.tableData[j];
                    if (row.group in remark_dict) {
                        remark = remark_dict[row.group];
                        // Object.assign(row, {
                        //     remark: remark
                        // });
                        this.$set(row, 'remark', remark);
                    } else {
                        Object.assign(row, {
                            remark: '______________'
                        });
                    }
                };
                console.log('remark', this.tableData);
            }, {
                errFn(err) {
                    for (j = 0, len1 = this.tableData.length; j < len1; j++) {
                        row = this.tableData[j];
                        Object.assign(row, {
                            remark: 'Load remark error'
                        });
                    }
                }
            })
        },
        load_data(callback) {
            var params = {
                func_name: 'router_api.trade_get_all_rules'
            }
            CommonApi.postFormAjax.call(this, params, data => {
                this.trade_rules = data;
                callback&&callback();
                this.render_groups(data);
                this.render_remarks();
            })
        },
        init() {
             this.load_data();
        }
    },
    mounted() {
        this.init();
    }
}
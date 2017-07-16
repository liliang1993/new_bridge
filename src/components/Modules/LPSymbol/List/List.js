import {
        FormDialog,
        FormData1,
        DragDialog
} from 'common/';
import {
        common as CommonApi
} from 'config/request.js';
module.exports = {
        name: 'lp_symbol',
        components: {
                FormDialog,
                FormData1,
                DragDialog
        },
        data() {
                return {
                        add_symbol_dialog: {
                                show: false,
                                isModal: true,
                                title: {
                                        text: 'Add LP Symbol',
                                }
                        },
                        edit_symbol_dialog: {
                                show: false,
                                isModal: true,
                                title: {
                                        text: 'Edit LP Symbol',
                                }
                        },
                        tableData: [],
                        default_value:{},
                }
        },
        computed: {
                tableConfig: {
                        get() {
                                return {
                                        table: {
                                                attr: {
                                                        data: this.tableData,
                                                        maxHeight: '100%',
                                                        defaultSort: {
                                                                prop: 'std_symbol'
                                                        }
                                                }
                                        },
                                        columns: [{
                                                attr: {
                                                        prop: 'std_symbol',
                                                        label: this.$t('STD symbol'),
                                                        minWidth: 180,
                                                        sortable: true,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'lp',
                                                        label: this.$t('LP'),
                                                        minWidth: 180,
                                                        sortable: true,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'lp_symbol',
                                                        label: this.$t('LP symbol'),
                                                        minWidth: 180,
                                                        sortable: true,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'weight',
                                                        label: this.$t('Weight'),
                                                        width: 100,
                                                        sortable: true,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'min_qty',
                                                        label: this.$t('Min Qty'),
                                                        width: 100,
                                                        sortable: true,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'contract_size',
                                                        label: this.$t('Contract Size'),
                                                        minWidth: 180,
                                                        sortable: true,
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'quote_enable',
                                                        label: this.$t('Quote Enable'),
                                                        minWidth: 180,
                                                        sortable: true,
                                                        scopedSlot: 'quoteAttr',
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        prop: 'trade_enable',
                                                        label: this.$t('Trade Enable'),
                                                        minWidth: 180,
                                                        sortable: true,
                                                        scopedSlot: 'tradeAttr',
                                                        align: 'center'
                                                }
                                        }, {
                                                attr: {
                                                        // prop: 'address',
                                                        label: this.$t('Operation'),
                                                        minWidth: 180,
                                                        scopedSlot: 'handler',
                                                        align: 'center'
                                                }
                                        }]
                                }
                        }
                },
                add_symbol_fieldlist() {
                        return [{
                                type: 'input',
                                key: 'std_symbol',
                                label: 'STD symbol'
                        }, {
                                key: 'lp',
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
                                label: 'LP'
                        }, {
                                type: 'input',
                                key: 'lp_symbol',
                                value: '',
                                label: 'LP symbol'
                        }, {
                                key: 'quote_enable',
                                type: 'select',
                                value: {
                                        default: 'true',
                                        list: [{
                                                value: true,
                                                text: 'true'
                                        }, {
                                                value: false,
                                                text: 'false'
                                        }]
                                },
                                desc: '请选择',
                                label: 'Quote Enable'
                        }, {
                                key: 'trade_enable',
                                type: 'select',
                                value: {
                                        default: 'true',
                                        list: [{
                                                value: true,
                                                text: 'true'
                                        }, {
                                                value: false,
                                                text: 'false'
                                        }]
                                },
                                desc: '请选择',
                                label: 'Trade Enable'
                        }, {
                                type: 'input',
                                key: 'weight',
                                value: '',
                                label: 'Weight'
                        }, {
                                type: 'input',
                                key: 'min_qty',
                                value: '',
                                label: 'Min Qty'
                        }, {
                                type: 'input',
                                key: 'contract_size',
                                value: '',
                                label: 'Contract Size'
                        }]
                },
                edit_symbol_fieldlist() {
                        return [{
                                        type: 'input',
                                        key: 'std_symbol',
                                        disabled: true,
                                        value:'',
                                        label: 'STD symbol'
                                }, {
                                        type: 'input',
                                        key: 'lp',
                                        disabled: true,
                                        value:'',
                                        label: 'LP'
                                }, {
                                        type: 'input',
                                        key: 'lp_symbol',
                                        disabled: true,
                                        value:'',
                                        label: 'LP symbol'
                                }, {
                                        key: 'quote_enable',
                                        type: 'select',
                                        value: {
                                                default: '',
                                                list: [{
                                                        value: true,
                                                        text: 'true'
                                                }, {
                                                        value: false,
                                                        text: 'false'
                                                }]
                                        },
                                        desc: '请选择',
                                        label: 'Quote Enable'
                                }, {
                                        key: 'trade_enable',
                                        type: 'select',
                                        value: {
                                                default: '',
                                                list: [{
                                                        value: true,
                                                        text: 'true'
                                                }, {
                                                        value: false,
                                                        text: 'false'
                                                }]
                                        },
                                        desc: '请选择',
                                        label: 'Trade Enable'
                                },{
                                type: 'input',
                                key: 'weight',
                                value: '',
                                label: 'Weight'
                        }, {
                                type: 'input',
                                key: 'min_qty',
                                value: '',
                                label: 'Min Qty'
                        }, {
                                type: 'input',
                                key: 'contract_size',
                                value: '',
                                label: 'Contract Size'
                        }]
                }
        },
        methods: {
                onCloseDialog(type) {
                        this[type].show = false;
                },
                onAddSymbol() {
                        this.add_symbol_dialog.show = true;
                },
                onEditSymbol(row) {
                        console.log('1234',row);
                        this.edit_symbol_dialog.show = true;
                        this.$nextTick(()=>{
                                Object.assign(this.default_value , row);
                         });
                       

                },
                // onSubmit(data) {
                //         var tradeEnable = data['trade_enable'] === true ? true : false;
                //         var quoteEnable = data['quote_enable'] === true ? true : false;
                //         var weight = Number(data['weight']);
                //         var min_qty = Number(data['min_qty']);
                //         var contract_size = Number(data['contract_size']);
                //         //api jiekou shunxu youwu
                //         var args = [data.lp, data.lp_symbol, data.std_symbol, quoteEnable, tradeEnable, weight, min_qty, contract_size];
                //         var params = {
                //                 func_name: 'router_api.lp_add_symbol',
                //                 args
                //         }
                //         CommonApi.postFormAjax.call(this, params, res => {
                //                 this.symbolDialog.show = false;
                //                 if (this.symbolDialog.title.text = this.$t('Add LP symbol')) {
                //                         this.get_global_std_symbols();
                //                 }
                //                 this.load_data();
                //         });
                // },
                add_symbol_submit(data) {
                        var weight,min_qty,contract_size,quote_enable,trade_enable;
                        console.log('submit_symbols', data);
                         weight = data.weight*1;
                         min_qty = data.min_qty*1;
                         contract_size = data.contract_size*1;
    
                         var params={
                                func_name:'router_api.lp_add_symbol',
                                args:[data.lp,data.std_symbol,data.lp_symbol,data.quote_enable,data.trade_enable,weight,min_qty,contract_size]
                         }
                         CommonApi.postFormAjax.call(this,params,data=>{
                                this.load_data();
                                this.get_global_std_symbols();
                                this.onCloseDialog('add_symbol_dialog');
                         });
                },
                edit_symbol_submit(data) {
                       var weight,min_qty,contract_size,quote_enable,trade_enable;
                        console.log('submit_symbols', data);
                         weight = parseInt(data.weight);
                         min_qty = parseInt(data.min_qty);
                         contract_size = data.contract_size*1;
                         var params={
                                func_name:'router_api.lp_add_symbol',
                                args:[data.lp,data.std_symbol,data.lp_symbol,data.quote_enable,data.trade_enable,weight,min_qty,contract_size]
                         }
                         CommonApi.postFormAjax.call(this,params,data=>{
                                this.load_data();
                                this.onCloseDialog('edit_symbol_dialog');
                         }); 
                },
                onDeleteSymbol(row) {
                        this.$confirm('Are you sure you want to detele this?', 'prompt', {
                                type: 'warning'
                        }).then(() => {
                                var params = {
                                        func_name: 'router_api.lp_del_symbol',
                                        args: [row.lp, row.lp_symbol, row.std_symbol],
                                }
                                CommonApi.postNormalAjax.call(this, params, data => {
                                        this.load_data();
                                        this.get_global_std_symbols();
                                })
                        }).catch(() => {});
                },
                load_data() {
                        var params = {
                                func_name: 'router_api.lp_get_symbols'
                        };
                        CommonApi.postFormAjax.call(this, params, data => {
                                this.tableData = data;
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
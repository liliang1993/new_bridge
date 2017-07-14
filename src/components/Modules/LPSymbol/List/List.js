import {
        FormDialog,
        FormData,
        DragDialog
} from 'common/';
import {
        common as CommonApi
} from 'config/request.js';
module.exports = {
                name: 'lp_symbol',
                components: {
                        FormDialog,
                        FormData,
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
                                                text: 'Add LP Symbol',
                                        }
                                },
                                tableData: [],
                                default_value: {},
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
                fieldlist() {
                        return [{
                                type: 'input',
                                key: 'std_symbol',
                                label: 'STD symbol'
                        }, {
                                key: 'lp',
                                type: 'select',
                                value: {
                                        // default: 'imax',
                                        list: []
                                },
                                desc: '请选择',
                                label: 'LP'
                        }, {
                                key: 'lp',
                                type: 'input',
                                // value: 'imax',
                                hidden: true,
                                disabled: true,
                                label: 'LP'
                        }, {
                                type: 'input',
                                key: 'lp_symbol',
                                // value:'',
                                label: 'LP symbol'
                        }, {
                                key: 'quote_enable',
                                type: 'select',
                                value: {
                                        // default: 'true',
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
                                        // default: 'true',
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
                                // value:'',
                                label: 'Weight'
                        }, {
                                type: 'input',
                                key: 'min_qty',
                                // value:'',
                                label: 'Min Qty'
                        }, {
                                type: 'input',
                                key: 'contract_size',
                                // value:'',
                                label: 'Contract Size'
                        }]
                }
        },
        methods: {
                onCloseDialog() {
                        this.symbolDialog.show = false;
                },
                onAddSymbol() {
                        this.symbolDialog.title.text = this.$t('Add LP symbol');
                        this.symbolDialog.show = true;
                        this.fieldlist.forEach(item => {
                                if (item.key == 'lp') {
                                        if (item.type == 'select') {
                                                item.hidden = false;
                                                item.value.list = [];
                                                this.$store.state.global.lps.forEach((lp, index) => {
                                                        this.$set(item.value.list, index, {
                                                                value: lp,
                                                                text: lp
                                                        });
                                                })
                                        } else {
                                                item.hidden = true;
                                        }
                                } else if (item.key == 'std_symbol' || item.key == 'lp_symbol') {
                                        item.disabled = false;
                                }
                        });
                        this.default_value = Object.assign({}, this.default_value, {
                                std_symbol: '',
                                lp: this.$store.state.global.lps[0],
                                lp_symbol: '',
                                quote_enable: true,
                                trade_enable: true,
                                weight: '',
                                min_qty: '',
                                contract_size: ''
                        });
                },
                onEditSymbol(row) {
                        this.symbolDialog.show = true;
                        this.symbolDialog.title.text = this.$t('Edit LP symbol');
                        this.fieldlist.forEach(item => {
                                if (item.key == 'lp') {
                                        item.hidden = item.type == 'input' ? false : true;
                                }
                                if (item.key == 'std_symbol' || item.key == 'lp_symbol') {
                                        item.disabled = true;
                                }
                        });
                        this.default_value = Object.assign({}, this.default_value, row);
                },
                onSubmit(data) {
                        var tradeEnable = data['trade_enable'] === true ? true : false;
                        var quoteEnable = data['quote_enable'] === true ? true : false;
                        var weight = Number(data['weight']);
                        var min_qty = Number(data['min_qty']);
                        var contract_size = Number(data['contract_size']);
                        //api jiekou shunxu youwu
                        var args = [data.lp, data.lp_symbol, data.std_symbol, quoteEnable, tradeEnable, weight, min_qty, contract_size];
                        var params = {
                                func_name: 'router_api.lp_add_symbol',
                                args
                        }
                        CommonApi.postFormAjax.call(this, params, res => {
                                this.symbolDialog.show = false;
                                if (this.symbolDialog.title.text = this.$t('Add LP symbol')) {
                                        this.get_global_std_symbols();
                                }
                                this.load_data();
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
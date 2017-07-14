import {
        FormData1,
} from 'common/';
module.exports = {
        name: 'form',
        components: {
                FormData1
        },
        data() {
                return {
                       default_value:{}
                }
        },
        computed:{
                 fieldlist(){
                        return [{
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
                        }, {
                                key: 'route_type',
                                type: 'RouteType',
                                label: 'route_type',
                                default: {
                                        threshold: 0,
                                        right: 'ratio',
                                        left: 'bestright'
                                }
                        }, {
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
                        }, {
                                key: 'limit_order_types',
                                type: 'CheckboxAndInputList',
                                label: 'limit_order_types',
                                desc: "Do not change MT4's request price",
                                spec: ["Instant", "Market", "Pending", "Stopout", "StopLoss", "TakeProfit"]
                        }, {
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
                        }]
                 } 
        },
        mounted(){
               // this.default_value , 'lps' , ['gkgoh']
               Object.assign(this.default_value,{lps: ['gkgoh']});
        }
}
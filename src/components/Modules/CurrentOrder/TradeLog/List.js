module.exports = {
    name: 'user-list',
        data () {
      return {
        trade_log: this.TradeLog,
        tableData: [],
        }
    },
    props:{
        TradeLog: {
            type: Object,
            default () {
              return {}
            }
        }
    },
    computed: {
      tableConfig: {
        get () {
          return {
            table: {
              attr: {
                data: this.tableData,
                maxHeight: '100%',
                showHeader: false,
                defaultSort:{prop: 'std_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'log_key',
                  label: 'log_key',
                  width: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'trade_log',
                  label: 'trade_log',
                  width: 500,
                  sortable: true,
                  scopedSlot: 'trade_log',
                }
              }
            ]
          }
        }
      }

    },
    methods: {
            
    },
    mounted(){
            this.tableData = [];
            for(var k in this.trade_log){
            this.tableData.push({log_key :k, trade_log : this.trade_log[k]});  
            }
          console.log('table',this.tableData);
    }
}

import {
    DragDialog
} from 'common/';
import {
    common as CommonApi
} from 'config/request.js';
import Qs from 'qs'
module.exports = {
    name: 'user-list',
    components: {
        DragDialog
    },
        data () {
      return {
          tableData:[],
          profit_config: this.ProfitConfig
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
                defaultSort:{prop: 'std_symbol'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'symbol',
                  label: ' Symbol',
                  minWidth: 80,
                  sortable: true,
                  // scopedSlot: 'date',
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'abook_size',
                  label: 'ABook Size',
                  minWidth: 100,
                  align: 'center',
                   sortable: true,
                  formatter(item){
                    return item.abook_size.toFixed(2);
                  }
                }
              },
              {
                attr: {
                  prop: 'bbook_size',
                  label: 'BBook Size',
                  minWidth: 120,
                  align: 'center',
                   sortable: true,
                  formatter(item){
                    return item.bbook_size.toFixed(2);
                  }
                }
              },{
                attr: {
                  label: 'ABook Profit',
                  width: 150,
                  align: 'center',
                   sortable: true,
                  formatter(item){
                    return item.spread.toFixed(2);
                  }
                }
              },{
                attr: {
                  prop: 'bbook',
                  label: 'BBook Profit',
                  width: 150,
                  align: 'center',
                   sortable: true,
                  formatter(item){
                    return item.bbook.toFixed(2);
                  }
                }
              },{
                attr: {
                  label: 'Profit',
                  minWidth: 120,
                  align: 'center',
                   sortable: true,
                  formatter(item){
                    return(item.spread + item.bbook).toFixed(2);
                  }
                }
              }
            ]
          }
        }
      }
    },
    props:{
        ProfitConfig : {
            type: Array,
            required: true
        }
    },
    watch:{
        ProfitConfig(v){
            if(v){
                this.profit_config = v;
            }
        }
    },
    methods: {
        init(){
           this.tableData = this.profit_config;
         }
    },
    mounted() {
        this.init();
    }
}

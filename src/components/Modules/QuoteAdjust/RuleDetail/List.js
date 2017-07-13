module.exports = {
    name: 'user-list',
        data () {
      return {
        config: this.Config,
        tableData: [],
        }
    },
    props:{
        Config: {
            type: Object,
            default () {
              return {}
            }
        }
    },
    watch:{
      Config(v){
        if(v){

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
                border: false,
                defaultSort:{prop: 'attr'}
              }
            },
            columns: [
              {
                attr: {
                  prop: 'attr',
                  label: 'attr',
                  width: 180,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'value',
                  label: 'value',
                  width: 500,
                  sortable: true,
                  align: 'center'
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        init(){
            this.tableData = [];
            console.log('config',this.config);
            for(var k in  this.config){
            this.tableData.push(  {attr :k ,  value : this.config[k]===null ? 'null' : this.config[k]}  );  
            };
        }     
    },
    mounted() {
        this.init();
    }
}

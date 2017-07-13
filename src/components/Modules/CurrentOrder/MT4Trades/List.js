module.exports = {
    name: 'mt4_position',
        data () {
      return {
        keyword: {
          login: '',
          ord_id: '',
          symbol: '',
          opentime: '',
          closetime: ''
        },
        nowTime: '',
        pagination: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [],
        apis: {
                func_name: 'mt4.page_trades',
                get_list: '$$getUserListPage',
                config:  {'headers': {'Content-Type': 'application/x-www-form-urlencoded'}}
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
                defaultSort:{prop: 'TICKET',order:'descending'}
              }
            },
            columns: [
              // {
              //   attr: {
              //     type: 'selection',
              //     width: 80,
              //     align: 'center'
              //   }
              // },
              {
                attr: {
                  prop: 'TICKET',
                  label: 'OrdId',
                  minWidth: 120,
                  sortable: true,
                  // scopedSlot: 'date',
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'LOGIN',
                  label: 'Login',
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              },
              {
                attr: {
                  prop: 'SYMBOL',
                  label: 'Symbol',
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'CMD',
                  label: 'cmd',
                  width: 120,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'VOLUME',
                  label: 'Volume',
                  width: 120,
                  sortable: true,
                  align: 'center',
                  // formatter(item){
                  //     return item.VOLUME / 100;
                  // }
                }
              },{
                attr: {
                  prop: 'PROFIT',
                  label: 'Profit',
                  minWidth: 120,
                  sortable: true,
                  align: 'center'
                }
              },{
                attr: {
                  prop: 'OPEN_PRICE',
                  label: 'OpenPrice',
                  minWidth: 120,
                  sortable: true,
                  align: 'center',
              }
            },{
                attr: {
                  prop: 'CLOSE_PRICE',
                  label: 'ClosePrice',
                  minWidth: 100,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'COMMENT',
                  label: 'Comment',
                  minWidth: 180,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'OPEN_TIME',
                  label: 'OpenTime',
                  minWidth: 120,
                  sortable: true,
                  align: 'center',
                }
              },{
                attr: {
                  prop: 'CLOSE_TIME',
                  label: 'CloseTime',
                  minWidth: 120,
                  sortable: true,
                  align: 'center',
                }
              }
            ]
          }
        }
      }
    },
    methods: {
        onSearch(){
            var keywords = {};
            for(var k in this.keyword){
                if(this.keyword[k]){
                      switch(k){
                            case 'login' :   
                                             Object.assign(keywords,  { login : Number(this.keyword[k]) } );
                                            break;
                            case 'ord_id' :   
                                             Object.assign(keywords,  { ticket : Number(this.keyword[k]) } );
                                            break;   
                            case 'symbol' :
                                             Object.assign(keywords,  { symbol : this.keyword[k] } );  
                                             break;
                            case 'opentime' :
                                            var temp = []; 
                                            this.keyword[k].forEach(item=>{
                                                    temp.push( item.toLocaleString() );
                                             });
                                            Object.assign(keywords,  { opentime : temp } ); 
                                            break;
                            case 'closetime' :
                                            var temp = []; 
                                            this.keyword[k].forEach(item=>{
                                                    temp.push( item.toLocaleString() );
                                             });
                                            Object.assign(keywords,  { closetime : temp } );        
                                            break;      
                      }
                }
            };
            console.log('kw',keywords);
            var params =this.onGetDataListPage(keywords);
            this[this.apis.get_list](params, (data) => {
                this.tableData= data[0];
                this.pagination.total = data[1];
            });
        },
        init(){
            var params =this.onGetDataListPage();
            this[this.apis.get_list](params, (data) => {
                this.tableData= data[0];
                this.pagination.total = data[1];
            });
            this.nowTime=(new Date()).toString();
        }
    },
    mounted() {
        this.init();
    }
}

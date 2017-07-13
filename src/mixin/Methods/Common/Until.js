  import store from 'util/'
  import {
        common as CommonApi
} from 'config/request.js';
module.exports={
                /**
         * 判断对象是否为空
         * @Author   liang
         * @DateTime 2017-05-11
         * @param    {Object}   obj [description]
         * @return   {Boolean}      [true:为空对象;false:不为空对象]
         */
        isEmptyObject(obj){
       　　　　  for(var i in obj){//如果不为空，则会执行到这一步，返回true
       　　　　   return false;
       　　　  }
          return true;
        },  
          /**
         * 深度遍历对象中的属性
         * @Author   liang
         * @DateTime 2017-05-11
         * @param    {object}   obj 被遍历的对象
         * @return   {obj}       
         */

        deepGetAttribute(obj){
          var res={};
          for(var k in obj){
            if(typeof obj[k]==='object'){
              Object.assign(res,this.deepGetAttribute(obj[k]));
            }else{
              res[k] = obj[k];
            }
          }
          return res;
        },
        num_zfill(num, size){
          var s = num + ""
          while (s.length < size){
            s = "0" + s
          }     
          return s;
        },
        time_format(t) {
          if (isNaN(t)) {
            return "-";
          } else {
            return (new Date(t * 1000)).toISOString();
          }
        },
        dateTime_format(dateTime){
          var res = [];
          var d = new Date(dateTime[0]); 
          res[0]  = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + '00:00:00';              
          d =  new Date(dateTime[1]); 
          res[1] =  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + '23:59:59';
          return res;
          },
        num_format(n, digits){
          if(isNaN(n)){
           return "-"; 
          }else{
            return n.toFixed(digits)
          };
        },
        order_format(order_id){
            [req_uuid, lp, id] = order_id.split('_')
            return req_uuid + "_" + lp + "_" + this.num_zfill(id, 8);
        },
        get_median(values){
               values.sort((a,b)=>{return a - b}) 
              var half = Math.floor(values.length/2);
               if(values.length % 2){
                      return values[half];
               }else{
                       return (values[half-1] + values[half]) / 2.0;
               }
      },
          /**
       * 数组去重
       * @Author   liang
       * @DateTime 2017-05-15
       * @param    {array}   array 需要去重的数组
       * @return   {array}         去重后的数组
       */
      uniqueArray(array){
       var res = [];
       var json = {};
       for(var i = 0; i < array.length; i++){
        if(!json[array[i]]){
         res.push(array[i]);
         json[array[i]] = 1;
        }
       }
       return res;
      },

      addList(list,data){
          list.push(data);
          var res = this.uniqueArray(list);
          return res.sort();
      },
      delList(list,data){
          var index = list.indexOf(data);
          list.splice(index,1);
          return list;
      },
      is_int(n) {
        return Number(n) == n && n % 1 == 0;
      },
     is_number(n){
          if(!n){
              return false;
          }
          return Number(n) == n;
     } , 
      isDialogExist(dialogList,row){
          console.log('row',row,dialogList);
          if(dialogList.length<=0){
            return false;
          }
          for(var item of dialogList){
            if(item.id == row.id){
              return true;
            };
          };
          return false;
        },
        get_pips(num, digits) {
              return Math.round(num * (Math.pow(10, digits)));
        },
        lp_side(request) {
            var j, len, order, ref;
            ref = request.orders;
            for (j = 0, len = ref.length; j < len; j++) {
              order = ref[j];
              if (order.side) {
                return order.side;
              }
            }
            if (request.settle === 0) {
                    if (request.cmd === 0) {
                      return "buy";
                    } else {
                      return "sell";
                    }
              } else {
                  if (request.cmd === 0) {
                    return "sell";
                  } else {
                    return "buy";
                  }
              }
          },

          get_global_lps(){
                        var arr_lps, params,global_lps;
                        arr_lps = [];
                        params = {
                                func_name: 'router_api.lp_host_get_all_conf'
                        }
                        CommonApi.postFormAjax.call(this,params, data => {
                                console.log('data1',data);
                                for (var item of data) {
                                        arr_lps.push(item.lp);
                                }
                                global_lps = Array.from(new Set(arr_lps));
                                this.$store.dispatch('update_global_lps',  global_lps);
                                console.log('global_lps',arr_lps,global_lps);
                        });                       
                },
                get_global_std_symbols (){
                        var arr_std_symbols, params,global_std_symbols;
                        arr_std_symbols= [];
                        params = {
                                func_name: 'router_api.lp_get_symbols'
                        }
                        CommonApi.postFormAjax.call(this,params, data => {
                             console.log('data2',data);
                                for (var item of data) {
                                        arr_std_symbols.push(item.std_symbol);
                                }
                                global_std_symbols = Array.from(new Set(arr_std_symbols));
                                 console.log('global_std_symbols', arr_std_symbols,global_std_symbols);
                                this.$store.dispatch('update_global_std_symbols', global_std_symbols);
                        });  
                },
}
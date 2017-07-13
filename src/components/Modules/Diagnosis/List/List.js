import {
    ListData,
    FormDialog
} from 'common/';
import {
    common as CommonApi
} from 'config/request.js';
module.exports = {
    name: 'user-list',
    components: {
        ListData,
        FormDialog
    },
    data(){
        return {
            log_value:'',
            bridge_value:'',
            bridge_status:''        
        }
    },
    methods: {
        stringToXml(xmlString) {  
            var xmlDoc;  
            if (typeof xmlString == "string") {  
                //FF     
                if (document.implementation.createDocument) {  
                    var parser = new DOMParser();  
                    xmlDoc = parser.parseFromString(xmlString, "text/xml");  
                } else if (window.ActiveXObject) {  
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
                    xmlDoc.async = false;  
                    xmlDoc.loadXML(xmlString);  
                }  
            }  
            else {  
                xmlDoc = xmlString;  
            }  
            return xmlDoc;  
        },
        onGetErrLog(){
            var params ={
                func_name: 'bridge_info.get_error_log',
            }
            CommonApi.postNormalAjax.call(this,params,data=>{
                var xmlDate = this.stringToXml(data[1]);
                this.log_value = xmlDate.getElementsByTagName('body')[0].innerHTML;  
            });
        },
        onGetInfoLog(){
            var params ={
                func_name : 'bridge_info.get_info_log'
            }
            CommonApi.postNormalAjax.call(this,params,data=>{
                var xmlDate = this.stringToXml(data[1]);
                this.log_value = xmlDate.getElementsByTagName('body')[0].innerHTML;  
            });
        },
        onGetCurrentshopper(){
            var params ={
                func_name:'router_api.get_shoppers'
            }
            CommonApi.postNormalAjax.call(this,params,data=>{
                this.log_value=JSON.stringify(data);
            });
        },
        onGetBridgeStatus(){
            var params = {
                func_name: 'router_api.get_status'
            }
            CommonApi.postNormalAjax.call(this,params,data=>{
                this.bridge_status = JSON.stringify(data.valve); 
                delete data.valve;
                this.bridge_value =data; 
            });
        },
        onSetMaxConcurrency(){
            this.$prompt('Please Write Max Concurrency','prompt',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^([2-9][0-9]|[1-9][0-9]{2,})$/,
                inputErrorMessage: '请输入大于等于20的数字'
            }).then(({value})=>{
                var data={
                    func_name: 'router_api.set_max_concurrency',
                    args:[value]    
                }
                CommonApi.postNormalAjax.call(this,data,data=>{
                    console.log('shezhiwancheng');
                    this.onGetBridgeStatus();
                });
            }).catch(()=>{

            });

        },
        onStopBridge(){
            var params ={
                func_name:'router_api.close_valve'
            }
            this.$confirm('Are you sure you want to stop?', 'prompt', {
                    type: 'warning'
                }).then(() => {
                    CommonApi.postNormalAjax.call(this,params,data=>{
                        console.log(1000,data);
                        this.bridge_value = 'close '+data;
                    });
                }).catch(() => {

                });
        },
        onOpenBridge(){
            var params = {
                func_name: 'router_api.close_valve'
            }
            CommonApi.postNormalAjax.call(this,params,data=>{
                this.bridge_value = 'open '+data;
            })
        },
        init(){}
    },
    mounted() {
        this.init();
    },
    '$route' (to, from) {

    }
}

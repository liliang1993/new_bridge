import echarts from 'echarts';
module.exports = {
    name: 'echarts',
    data() {
        return {
            chartDom: null,
            data: {
                id: this.id,
                title: this.title,
                subtext: this.subtext,
                hover_title: this.hoverTitle,
                max_value: this.MaxValue,
                max_weight: this.MaxWeight, 
                text_list: this.textList,
                total_list: this.totalList,
                weight_list: this.weightList
            },

        }
    },
    methods: {
        init() {
            //基于准备好的dom，初始化echarts实例
            if (this.data.id){
                this.chartDom = echarts.init(document.getElementById('chartDom'));
            };
             return this;
        },
        update() {
            if (this.chartDom === null) {
                this.init();
            }
            this.chartDom.setOption({
                title: {
                    text: this.data.title,
                    subtext: this.data.subtext
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter(a){
                        var relVal ="";
                        relVal ="zongliang"+a[0]+"<br/>";
                        relVal +="bizhong"+a[1]*this.max_weight/this.max_value;
                    }
                },
                legend: {
                    data: ['总量', '比重']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: this.data.text_list
                },
                series: [{
                    name: '总量',
                    type: 'bar',
                    data: this.data.total_list
                }, {
                    name: '比重',
                    type: 'bar',
                    data: this.data.weight_list
                }]
            });
        }
    },
    mounted: function() {
        this.init()
            .update(this.data);
    },
    props: {
        echartShow:{
                type:Boolean,
                default: false
            },
        id: [String],
        title: [String, Number],
        subtext: [String, Number],
        hoverTitle: [String, Number],
        textList: {
            type: Array,
            required: true
        },
        totalList: {
            type: Array,
            required: true
        },
        weightList: {
            type: Array,
            required: true
        },
        MaxValue: {
            type: Array,
            required: true
        },
        MaxValue: {
            type: Array,
            required: true
        }
    },
    watch: {
        echartShow(v){
            this.echart_show =v;
            this.update();
        },
        weightList(v){
            this.data.weight_list = v;
            this.update();
        },
        totalList(v) {
            this.data.total_list = v;
            this.update();
        },
        textList(v) {
            this.data.text_list = v;
            this.update();
        },
        title(v) {
            this.data.title = v;
            this.update();
        },
        subtext(v) {
            this.data.subtext = v;
            this.update();
        },
        hoverTitle(v) {
            this.data.hover_title = v;
            this.update();
        },
        MaxValue(v) {
            this.data.max_value = v;
            this.update();
        },
        MaxWeight(v) {
            this.data.max_weight = v;
            this.update();
        }
    }
}
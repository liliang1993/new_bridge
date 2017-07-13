<template>
    <section class="chart">
        <el-row >
            <el-col :span="24">
                <div :id="data.id" style="width:700px; height:400px;" v-show= "echart_show"></div>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import DefaultJs from './Default.js';
    module.exports=DefaultJs;
</script>
<style scoped>
    
</style>

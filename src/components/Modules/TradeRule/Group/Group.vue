<template>
    <div class="form">
    	<el-form 
	            label-width="140px"
	            ref='form-data'
	            :rules='rules'
	            :model='form.attributes'>
	              <el-form-item class='add-form'  :label="$t('Source')" prop='source'>
	               	<el-select v-model="form.source"  v-if="form.type !=='edit'"> 		                 
		                    <el-option v-for="item in $store.state.global.sources" :value='item' :label='item'></el-option>   
		               </el-select>
		               <el-input v-model = 'form.source' v-if="form.type =='edit'" :disabled = "true"></el-input>
	               </el-form-item>
	              	<el-form-item class='add-form'  :label="$t('Group')" prop='group'>
	               	<el-input v-model="form.group" :disabled = "form.type =='edit'"></el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('MT4 Symbol')" prop='mt4_symbol'>
	               	<el-input v-model="form.mt4_symbol" :disabled = "form.type =='edit'"></el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('Std symbol')" prop='std_symbol'>
	               	  <el-select v-model="form.std_symbol" v-if="form.type !=='edit'"> 		                 
		                    <el-option v-for="item in option.std_symbol" :label='item.label' :value="item.value"></el-option>             
		               </el-select>
		               <el-input v-model = 'form.std_symbol'  v-if="form.type =='edit'" :disabled = "true"></el-input>
	               </el-form-item>

	               <el-form-item class='add-form'  :label="$t('route_type')" prop='route_type'>
	                        <span>if size >=</span>
	                        <el-input class='size_value'
	                        type="input"
	                        v-model="form.attributes.route_type.threshold"
	                        >
	                        </el-input>
	                        <span>then</span>
	                        <el-select v-model="form.attributes.route_type.right">
	                           	 <el-option value="best" label="ratio"></el-option>
		             	 <el-option value="bestright" label="solid"></el-option>
		              	 <el-option value="second" label="second"></el-option> 
		                <el-option value="ratio" label="ratio"></el-option>             
	                        </el-select>
	                        <span>else</span>
	                        <el-select v-model="form.attributes.route_type.left">
	                           	 <el-option value="best" label="ratio"></el-option>
		             	 <el-option value="bestright" label="solid"></el-option>
		              	 <el-option value="second" label="second"></el-option> 
		                <el-option value="ratio" label="ratio"></el-option>             
	                        </el-select>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('coverage')" prop='coverage'>
	               			<el-input v-model="form.attributes.coverage" placeholder="A book percentage."></el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('better_fill')" prop='better_fill'>
	               			<el-input v-model="form.attributes.better_fill" placeholder= "Better fill"></el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('open_partial')" prop='open_partial'>
	               			<el-select v-model="form.attributes.open_partial ">
		                           			<el-option :value="true" label="true"></el-option>
			             	 		<el-option :value="false" label="false"></el-option>             
	                       	 		</el-select>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('open_lp_rejected_retry')" prop='open_lp_rejected_retry'>
	               	<el-select v-model="form.attributes.open_lp_rejected_retry ">
		                           	 <el-option :value="true" label="true"></el-option>
			             	 <el-option :value="false" label="false"></el-option>             
	                       	 </el-select>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('open_threshold')" prop='open_threshold'>
	               	<el-input v-model="form.attributes.open_threshold" placeholder= "B book open probe threshold."></el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('open_probe')" prop='open_probe'>
	               	<el-input v-model="form.attributes.open_probe" placeholder="B book open probe threshold."></el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('close_threshold')" prop='close_threshold'>
	               	<el-input v-model="form.attributes.close_threshold" placeholder= "B book open probe threshold."></el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('close_probe')" prop='close_probe'>
	               	<el-input v-model="form.attributes.close_probe" placeholder= "Better fill"></el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('limit_order_types')" prop='limit_order_types'>
	               	<el-input
		                    v-for='(item,index) in  option.limit_order_types'
		                    type="input"
		                    v-model="item.input.key"
		                    placeholder='tolerate'	                
			>
                         			<el-checkbox  class='checkbox_item' slot="prepend"  size='small'  v-model="item.checkbox.key">{{item.checkbox.text}}</el-checkbox>
                   		 </el-input>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('lps')" prop='lps'>
	               	<el-checkbox  v-for="item in option.lps" v-model="item.key" :label="item.label" name="type"> </el-checkbox>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('bbook_exec_type')" prop='bbook_exec_type'>
	               		<el-select v-model="form.attributes.bbook_exec_type">
		                     <el-option value="vwap" label="vwap"></el-option>
			             	 <el-option value="worst" label="worst"></el-option>           
	                    </el-select>
	               </el-form-item>
	               <el-form-item class='add-form'  :label="$t('slippages')" prop='slippages'>
		             <el-row  v-for="group in option.slippages" style="margin-left:10px;margin-bottom:10px">
		    		<el-col :span="3"  v-for="(item,key) in group">
		    			<el-input  v-model="item.value" :placeholder="item.playholder"   
					:prop='key'>
		    			</el-input>
		    		</el-col>
	    			<el-col :span="5" >
	    				<el-button @click.prevent="removeSlippages(group)">Delete
	    				</el-button>
	    			</el-col>
	    		</el-row>
			<el-row>
					<el-col :span="24" style="margin-left:20px;"> 
						<el-button @click.prevent="addSlippages">Add
	    				</el-button>
					</el-col>
			</el-row>
	               </el-form-item>
	               <el-form-item>
	                	<el-button type="primary" @click='onSubmit("form-data")'>Submit</el-button>
	            	  </el-form-item>
		</el-form>
      </div>
</template>

<script>
    import GroupJs from './Group.js';
    module.exports=GroupJs;
</script>
<style scoped lang='less'>
.form{
      width:400px;
}
</style>

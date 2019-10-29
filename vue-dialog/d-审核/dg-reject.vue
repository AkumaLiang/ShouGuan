<template>
<!-- 驳回信息 -->
<el-dialog class="xdialog" title="驳回理由" width="48%" :visible.sync="$parent.isdgReject">
	<el-row>
		<span class="xlabel">请输入驳回原因：</span>
	</el-row>
	
	<el-row class="rowl">
		<el-input type="textarea" v-model="cause" :rows="3"></el-input>
	</el-row>
	
	<el-row class="xdg-btn-r">
		<el-button @click="$parent.isdgReject=false">取消</el-button>
		<el-button type="primary" @click="submitForm">确定</el-button>
	</el-row>
	
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		cause:'',
	}},
	methods:{
		//提交表单
		submitForm(){
			console.log(this.cause);
		}
	}

}
</script>

<style>

</style>

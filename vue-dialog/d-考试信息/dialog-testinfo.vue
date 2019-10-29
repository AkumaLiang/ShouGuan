<template>
<!-- 考试信息 -->
<el-dialog class="xdialog"  title="考试信息" width="48%" :visible.sync="$parent.isdialogTestInfo">
	
	
	<div class="xbox-c2">
		<el-row class="rowl">
			<el-col :offset="1" :span="3">地点 :</el-col>
			<el-col :span="10" class="val">{{v_test_info.addr}}</el-col>
		</el-row>
		<el-row class="rowl">
			<el-col :offset="1" :span="3">班级 :</el-col>
			<el-col :span="10" class="val">{{v_test_info.vclass}}</el-col>
		</el-row>
		<el-row class="rowl">
			<el-col :offset="1" :span="3">时间 :</el-col>
			<el-col :span="10" class="val">{{v_test_info.dtime}}</el-col>
		</el-row>
	</div>
	
	<div v-if="!read_only">
		<div class="xline"></div>
		
		<!-- 表单:修改原因 -->
		<div class="xbox-c2">
			<el-row class="rowl" style="text-align: right;">
				<el-button type="primary" size="small" @click="handleTested">已参加考试</el-button>
				<el-button type="primary" size="small" @click="handleTestAbs">缺考</el-button>		
			</el-row>
			
			<el-row class="rowl" style="padding-top: 0;">
				<el-input type="textarea" v-model="vCause" :rows="4" placeholder="请输入修改原因...."></el-input>
			</el-row>
		</div>
	</div>

</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		//绑定数据
		vCause:'',		//提交原因;
	}},
	props:{
		v_test_info:Object,
		read_only:Boolean
	},
	methods:{
		handleTested(){
			alert('已参加考试');
		},
		handleTestAbs(){
			alert('考试缺席');
		}
	},
	created(){
	}
}
</script>

<style scoped>
.xdialog .el-dialog__body{
	padding: 0;
}
.xbox-c2{
	box-sizing: border-box;
	padding: 20px;
}
</style>

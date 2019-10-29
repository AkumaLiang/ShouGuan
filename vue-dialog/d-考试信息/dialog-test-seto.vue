<template>
<!-- 考试信息 -->
<el-dialog class="xdialog"  title="安排考试" width="48%" :visible.sync="$parent.isdialogTestSto">
	
	
	<div class="xbox-c2">
		
		<el-form label-position="right" label-width="80px" :model="vform">
			<el-form-item label="地点 :">
				<el-input v-model="vform.addr"></el-input>
			</el-form-item>
			
			<el-form-item label="班级 :">
				<el-select v-model="vform.vclass" placeholder="请选择班级">
				    <el-option v-for="item in classList" :key="item" :label="item" :value="item"></el-option>
				  </el-select>
			</el-form-item>
			
			<el-form-item label="时间 :">
				<el-date-picker class="mwidth" v-model="vform.dtime" type="datetime" placeholder="选择日期时间" format="yyyy 年 MM 月 dd 日 HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
			</el-form-item>
			
			<el-form-item style="text-align: right;">
				<el-button @click="$parent.isdialogTestSto=false">取消</el-button>
				<el-button type="primary" @click="submitForm">提交</el-button>
			</el-form-item>
			
		</el-form>
		
	</div>
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		
		// 班级数据
		classList:[ '三a班','三b班','三c班'],
		
		//表单数据
		vform:{
			addr:'',//班级
			vclass:'',					//考试
			dtime:'',					//时间
		}
	}},
	methods:{
		submitForm(){
			console.log(this.vform);
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

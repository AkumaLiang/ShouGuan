<template>
<!-- 导出学员 -->
<el-dialog class="xdialog" title="学员导出" width="48%" :visible.sync="$parent.isdgExport">
	<el-checkbox-group v-model="checkList">
		<el-checkbox v-for="item in vlist" :key="item.id" :label="item.id" :value="item.id">{{item.name}}</el-checkbox>
	</el-checkbox-group>
	<el-row class="xdg-btn-r">
		<el-button type="primary" @click="stu_export">导出</el-button>
		<el-button @click="$parent.isdgExport=false">取消</el-button>
	</el-row>
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		checkList:[],	//选中的数据
	}},
	methods:{
		stu_export(){
			console.log( this.checkList);
		}
	},
	props:{
		vlist:Array
	}
}
</script>

<style scoped>
.el-checkbox{
	margin: 10px 13px;
}
.xdg-btn-r{
	margin-top: 12px;
}
</style>

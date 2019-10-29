<template>
<!-- 学员状态 -->

<!-- 标题和背景颜色 -->
<el-dialog  title="状态详情" class="xdialog" width="42%" :visible.sync="$parent.isdialogStatus">
	<!-- 时间轴 -->
	<el-steps process-status="wait" direction="vertical" space="74px" :active="1" style="margin-left: 10%;">
		<el-step v-for="(i,v) in step" :key="v.title" :title="i.title" :description="i.text"></el-step>
	</el-steps>
</el-dialog>

</template>

<script>
module.exports = {
	props:{
		step:Array
	}
}
</script>

<style>
/* step style */
.xdialog .el-step__title{
	font-size: 14px;
	color: #2878ff;
}
.xdialog .el-step__line{
	background-color: #1abc9c!important;
}
.xdialog .el-step__head,.el-step__title{
	color: #1abc9c!important;
}
.xdialog .el-step__description.is-finish{
	color: #c0c4cc;
}
.xdialog .is-text,.el-step__head.is-finish{
	border-color:#1abc9c!important;
}
.xdialog .el-step:last-child .is-text:last-child{
	background-color: #1abc9c;
	color: #fff;
	border-color:#1abc9c;
}
</style>

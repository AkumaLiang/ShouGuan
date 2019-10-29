<template>
<!-- 查看证书 -->
<!-- dialog-certificate-check.vue -->
<el-dialog class="xdialog" id="certificate-check"  title="查看证书" width="48%" :visible.sync="$parent.isCertificateCheck">
	<el-row class="rowl">
		<span class="xlabel">快递公司：</span>{{v_certificate_info.company}}
	</el-row>
	
	<el-row class="rowl">
		<span class="xlabel">邮寄单号：</span>{{v_certificate_info.code}}
	</el-row>
	
	<el-row class="rowl">
		<el-col :span="5"><span class="xlabel">附件：</span></el-col>
		<el-col :span="18">
			<ul>
				<li v-for="item in v_certificate_info.fileList" :key="item.id" class="xfile1">{{item.name}}<a class="acolor" :href="item.path">
				<el-button type="text" icon="el-icon-download"></el-button>
				</a></li>
			</ul>
		</el-col>
	</el-row>

</el-dialog>
</template>

<script>
module.exports = {
	props:{
		v_certificate_info:Object
	}
}
</script>

<style scoped>
ul{
	padding: 0;
	/* vertical-align: top; */
}
li{
	list-style: none;
}

.acolor{
	/* color: red; */
	display: block;
	width: 28px;
	height: 28px;
	float: right;
	/* background-color: red; */
	text-align: center;
	/* text-align: right; */
}
.acolor:hover{
	font-weight: bold;
}

#certificate-check{
	font-size: 16px;
}
#certificate-check li{
	border-bottom: solid 1px gainsboro;
	line-height: 29px;
	padding-left: 10px;
}
#certificate-check li:hover{
	background-color: rgba(240,240,240,.4);
}
#certificate-check li:last-child{
	border-bottom: none;
}
#certificate-check ul{
	border: solid 1px gainsboro;
}
#certificate-check ul:hover{
	cursor: default;
}
</style>

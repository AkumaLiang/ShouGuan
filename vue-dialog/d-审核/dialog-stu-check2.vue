<template>
<!-- 学员审核 -->

<el-dialog  title="学员审核" class="xdialog" width="60%" :visible.sync="$parent.isStuCheck2">
	
	
	<el-row class="lbox">
		<div class="ltitle">基本信息</div>
		<!-- 基本信息模块 -->
		<ul class="linfo">
			<li v-for="(item,k) in html" :key="k" v-if="item.v">
					<span class="key">{{item.k}}</span>
					<span class="val">{{item.v}}</span>
			</li>
		</ul>
	</el-row>

	<el-row class="lbox">
		<div class="ltitle">附件信息</div>
		<ul class="linfo">
			<li v-for="(item,k) in image" :key="k" v-if="item.v">
				<span class="key">{{item.k}}</span>
				<img class="limg" @click="show(item.v)" :src="item.v" alt="图片">
			</li>
		</ul>
		
	</el-row>
	
	<el-row class="lbox" v-if="stuinfo.stuOtherInfo">
		<el-row class="ltitle">其他信息</el-row>
		<el-row class="lrow ltext">{{stuinfo.stuOtherInfo}}</el-row>
	</el-row>
	
	<el-row  class="lbox">
		<el-row class="ltitle">标题</el-row>
		<el-row class="lrow limg-list">
			<img class="limg" style="margin: 4px 12px;" v-for="(url,k) in stuinfo.stuOtherPic" :key="k" @click="show(url)" :src="url" alt="图片">
		</el-row>
	</el-row>
	
	<el-row style="text-align: right;">
		<el-button class="lbtn" type="primary" size="medium" @click="confirm">通过</el-button>
		<el-button class="lbtn" size="medium" @click="reject">驳回</el-button>
	</el-row>
	
	<!-- 驳回内容 -->
	<el-dialog class="xdialog" title="驳回理由" width="48%" :visible.sync="isdgReject" append-to-body>
		<el-row>
			<span class="xlabel">请输入驳回原因：</span>
		</el-row>
		
		<el-row class="rowl">
			<el-input type="textarea" v-model="cause" :rows="3"></el-input>
		</el-row>
		
		<el-row class="xdg-btn-r">
			<el-button @click="isdgReject=false">取消</el-button>
			<el-button type="primary" @click="submitForm">确定</el-button>
		</el-row>
	</el-dialog>
	
	<!-- 新增Dom:放大图片显示 -->
	<el-dialog class="bigimg" :visible.sync="isBigImg" append-to-body>
		<img :src="bigimg" alt="">
	</el-dialog>

</el-dialog>

</template>

<script>
module.exports = {
	data(){return{
		bigimg:"http://img5.imgtn.bdimg.com/it/u=4048230840,177680441&fm=26&gp=0.jpg",
		cause:'',				//驳回信息
		isdgReject:false,		//是否打开驳回
		isBigImg:false,			//是否大图:新增变量
		html:[
			{k:"所属部门：",v:this.stuinfo.tisName||false},
			{k:"职称：",v:this.stuinfo.stuWord||false},
			{k:"姓名：",v:this.stuinfo.stuName||false},
			{k:"学历：",v:this.stuinfo.stuRecord||false},
			{k:"性别：",v:this.stuinfo.stuSex||false},
			{k:"工作单位：",v:this.stuinfo.stuWorkUnit||false},				
			{k:"项目：",v:this.stuinfo.proName||false},
			{k:"报考级别：",v:this.stuinfo.examLevel||false},
			{k:"公司名称：",v:this.stuinfo.stuCompanyName||false},
			{k:"职务：",v:this.stuinfo.stuPosition||flase},
			{k:"税号：",v:this.stuinfo.stuEin||false},
			{k:"工作年限：",v:this.stuinfo.stuYearNum||flase},
			{k:"身份证号：",v:this.stuinfo.stuCard||false},
			{k:"通讯地址：",v:this.stuinfo.stuMailAddress||false},
			{k:"地址：",v:this.stuinfo.stuAddress||false},
			{k:"电话：",v:this.stuinfo.stuPhone||false},
			{k:"邮箱：",v:this.stuinfo.stuEmail||false},
		],
		image:[
			{k:"学历：",v:this.stuinfo.stuRecordPic||false},
			{k:"证书：",v:this.stuinfo.stuCertificatePic||false},
			{k:"工作证明：",v:this.stuinfo.stuWordCertPic||false},
			{k:"身份证：",v:this.stuinfo.stuCardPic||false},
			{k:"照片：",v:this.stuinfo.stuPhotoPic||false},
			{k:"项目申报表：",v:this.stuinfo.stuProDeclarPic||false},
		]
	}},
	props:{
		stuinfo:Object
	},
	methods:{
		//show新增方法
		show(url){
			this.bigimg = url;
			this.isBigImg=true;
		},
	
		//通过
		confirm(){
			alert('通过');
		},
		//驳回
		reject(){
			// alert('驳回');
			this.isdgReject = true;
		},
		//提交表单
		submitForm(){
			console.log(this.cause);
		}
	}
}
</script>

<style>

.lrow{padding:13px 0}.ltitle{border-left:3px #1abc9c solid;padding-left:6px;margin-left:14px}.ltext{box-sizing:border-box;padding:20px;line-height:23px}.limg-list{box-sizing:border-box;padding:20px}.limg{height:94px;width:94px}.lbtn{padding:9px 33px}


/* 样式模块 */
/* .bigimg .el-dialog{background: none;box-shadow: none;} */
.bigimg img{display: block;margin:  0 auto;}
/* .bigimg .el-dialog__header{display: none;} */
/* .bigimg .el-dialog__body{padding: 0;} */



/* 新增的样式 */
.linfo{
	padding: 0;margin: 0;
	padding: 0 61px;
	/* background-color: skyblue; */
}
.linfo li{
	list-style: none;
	display: inline-block;
	width: 50%;
	box-sizing: border-box;
	margin: 18px 0;
}
.key {display: inline-block;width: 139px;text-align: right;vertical-align: top;}
.val {padding-left: 12px;display: inline-block;width: 222px;}
.el-dialog{
	min-width: 973px!important;
}
</style>

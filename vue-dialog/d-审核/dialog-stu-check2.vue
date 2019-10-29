<template>
<!-- 学员审核 -->

<el-dialog  title="学员审核" class="xdialog" width="60%" :visible.sync="$parent.isStuCheck2">
	
	
	<el-row class="lbox">
		<div class="ltitle">基本信息</div>
		<el-row class="lrow" v-for="(item,k) in html" :key="k">
			<el-col v-for="(i,ik) in item" :key="ik" :span="10" >
				<span class="key">{{i.k}}</span>
				<span class="val">{{i.v}}</span>
			</el-col>
		</el-row>		
	</el-row>

	<el-row class="lbox">
		<div class="ltitle">附件信息</div>
		<el-row :span="10" v-for="(item,k) in image" :key="k">
			<el-col v-for="(i,k) in item" :key="k" :span="10" class="lrow">
				<el-row>
					<el-col :span="4" class="key">{{i.k}}</el-col>
					<el-col :span="6" class="val">
						<img class="limg" :src="i.v" alt="图片">
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</el-row>
	
	<el-row class="lbox">
		<el-row class="ltitle">其他信息</el-row>
		<el-row class="lrow ltext">{{stuinfo.stuOtherInfo}}</el-row>
	</el-row>
	
	<el-row  class="lbox">
		<el-row class="ltitle">标题</el-row>
		<el-row class="lrow limg-list">
			<img class="limg" style="margin: 4px 12px;" v-for="(url,k) in stuinfo.stuOtherPic" :key="k" :src="url" alt="图片">
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

</el-dialog>

</template>

<script>
module.exports = {
	data(){return{
		cause:'',				//驳回信息
		isdgReject:false,		//是否打开驳回
		html:[
			[
							{k:"所属部门：",v:this.stuinfo.tisName},
							{k:"职称：",v:this.stuinfo.stuWord},
						],
						[
							{k:"姓名：",v:this.stuinfo.stuName},
							{k:"学历：",v:this.stuinfo.stuRecord},
						],
						[
							{k:"性别：",v:this.stuinfo.stuSex},
							{k:"工作单位：",v:this.stuinfo.stuWorkUnit},				
						],
						[
							{k:"项目：",v:this.stuinfo.proName},
							{k:"报考级别：",v:this.stuinfo.examLevel},
						],
						[
							{k:"公司名称：",v:this.stuinfo.stuCompanyName},
							{k:"职务：",v:this.stuinfo.stuPosition},
						],
						[
							{k:"税号：",v:this.stuinfo.stuEin},
							{k:"工作年限：",v:this.stuinfo.stuYearNum},
						],
						[
							{k:"身份证号：",v:this.stuinfo.stuCard},
							{k:"通讯地址：",v:this.stuinfo.stuMailAddress},
						],
						[
							{k:"地址：",v:this.stuinfo.stuAddress},
							
						],
						[
							{k:"电话：",v:this.stuinfo.stuPhone},
						],
						[
							{k:"邮箱：",v:this.stuinfo.stuEmail},
						],
		],
		image:[
			[
				{k:"学历：",v:this.stuinfo.stuRecordPic},
				{k:"证书：",v:this.stuinfo.stuCertificatePic}
			],
			[
				{k:"工作证明：",v:this.stuinfo.stuWordCertPic},
				{k:"身份证：",v:this.stuinfo.stuCardPic}
			],
			[
				{k:"照片：",v:this.stuinfo.stuPhotoPic},
				{k:"项目申报表：",v:this.stuinfo.stuProDeclarPic}
			],
		]
	}},
	props:{
		stuinfo:Object
	},
	methods:{
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
.key{display:inline-block;width:139px;text-align:right}.val{padding-left:12px}.lrow{padding:13px 0}.ltitle{border-left:3px #1abc9c solid;padding-left:6px;margin-left:14px}.ltext{box-sizing:border-box;padding:20px;line-height:23px}.limg-list{box-sizing:border-box;padding:20px}.limg{height:94px;width:94px}.lbtn{padding:9px 33px}
</style>

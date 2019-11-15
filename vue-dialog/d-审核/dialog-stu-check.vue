<template>
<!-- 学员审核 -->

<el-dialog  title="学员审核" class="xdialog" width="60%" :visible.sync="$parent.isStuCheck">
	<el-row class="lbox">
		<div class="ltitle">基本信息</div>
		<el-row class="lrow" v-for="(item,k) in html" :key="k">
			<el-col v-for="(i,ik) in item" :key="ik" :span="10">
				<span class="key">{{i.k}}</span>
				<span class="val">{{i.v}}</span>
			</el-col>
		</el-row>		
	</el-row>	
	<el-row style="text-align: right; margin-right: 64px; margin-top: 24px;">
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
				{k:"汇款日期：",v:this.stuinfo.stuRemittanceDate},
			],
			[
				{k:"姓名：",v:this.stuinfo.stuName},
				{k:"汇款金额：",v:this.stuinfo.stuRemittanceAmount},
			],
			[
				{k:"性别：",v:this.stuinfo.stuSex},
				{k:"报考级别：",v:this.stuinfo.nl},
			],
			[
				{k:"项目：",v:this.stuinfo.proName},
				{k:"汇款账户：",v:this.stuinfo.stuRemittanceAccount},
			],
			[
				{k:"公司名称：",v:this.stuinfo.stuCompanyName},
				{k:"进款账户：",v:this.stuinfo.nl},
			],
			[
				{k:"税号：",v:this.stuinfo.stuEin},
				{k:"交款方式：",v:this.stuinfo.nl},
			],
			[
				{k:"身份证号：",v:this.stuinfo.stuCard},
				{k:"订单号：",v:this.stuinfo.nl},
			],
			[
				{k:"地址：",v:this.stuinfo.stuAddress},
				{k:"其他：",v:this.stuinfo.otherInfo},
			],
			[
				{k:"电话：",v:this.stuinfo.stuPhone},
				{k:"付款人：",v:this.stuinfo.nl},
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
.key {
    display: inline-block;
    width: 139px;
    text-align: right;
    vertical-align: top;
}

.val {
    padding-left: 12px;
    display: inline-block;
    width: 222px;
}

.lrow{padding:13px 0}.ltitle{border-left:3px #1abc9c solid;padding-left:6px;margin-left:14px}.ltext{box-sizing:border-box;padding:20px;line-height:23px}.limg-list{box-sizing:border-box;padding:20px}.limg{height:94px;width:94px}.lbtn{padding:9px 33px}
</style>

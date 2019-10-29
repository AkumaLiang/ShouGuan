<template>
<!-- 申请开票 -->
<!-- dialog-invoice-seto.vue -->
<el-dialog class="xdialog"  title="申请开票" width="48%" :visible.sync="$parent.isdialogInvoiceSeto">
	<el-form label-width="86px" label-position="right">
		<el-row class="xdialog-invoice">
			<el-form-item label="发票类型: ">
				<el-radio-group v-model="vform.invoiceType"  @change="handleRadioChange">
					<el-radio v-for="item in vInvoiceType" :key="item.id" :label="item.id">{{item.name}}</el-radio>
				</el-radio-group>
			</el-form-item>
			
			<el-form-item label="公司名称: ">
				<el-input v-model="vform.firmName" :disabled="true"></el-input>
			</el-form-item>
			
			<el-form-item label="税号: ">
				<el-input v-model="vform.ein" :disabled="true"></el-input>
			</el-form-item>
			
			<div v-if="!isRoutineInvoice">
				<el-form-item label="开户行: ">
					<el-input v-model="vform.accountName"></el-input>
				</el-form-item>
				
				<el-form-item label="账号: ">
					<el-input v-model="vform.accountNo"></el-input>
				</el-form-item>
				
				<el-form-item label="电话: ">
					<el-input v-model="vform.mobile" :disabled="true"></el-input>
				</el-form-item>
				
				<el-form-item label="地址: ">
					<el-input v-model="vform.address" :disabled="true"></el-input>
				</el-form-item>
			</div>
		</el-row>

		<div class="xline"></div>

		<el-row class="xdialog-invoice2">
			<el-form-item label="教材邮寄: ">
				<el-radio-group v-model="vform.materialType">
					<el-radio v-for="item in vMailType" :key="item.id" :label="item.id">{{item.name}}</el-radio>
				</el-radio-group>
			</el-form-item>
			
			<el-form-item label="备注: ">
				<el-col :span="22">
					<el-input v-model="vform.noteInfo" type="textarea" row="4"></el-input>
				</el-col>
			</el-form-item>
			
			<el-form-item style="text-align: right;">
				<el-col :span="23">
					<el-button size="medium" @click="$parent.isdialogInvoiceSeto=false">取消</el-button>
					<el-button type="primary" size="medium" @click="submitForm">提交</el-button>
				</el-col>
			</el-form-item>
		</el-row>
	</el-form>
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		//发票选项
		vInvoiceType:[
			{id:1,name:'增值税专用发票'},
			{id:2,name:'增值税普通发票'},
			{id:3,name:'增值税电子发票'},
		],
		//是否邮寄教材
		vMailType:[
			{id:1,name:'是'},
			{id:0,name:'否'}
		],
		//表单
		vform:{
			firmName:this.v_base_info.firmName,	//公司名称
			ein:this.v_base_info.ein,			//税号  
			mobile:'', 		//电话
			address:'', 	//地址
			
			invoiceType:'',				// 发票类型  1增值税专用发票  2增值税普通发票  3增值税电子发票
			accountName:'',				// 开户行
			accountNo:'',				// 账户
			materialType:'',			// 教材邮寄  1是  0否
			noteInfo:'',				// 备注
		},
		isRoutineInvoice:true,
	}},
	props:{
		// 公司/税号/电话/地址
		v_base_info:Object
	},
	watch:{
		v_base_info:{
			immediate: true,
			deep: true,
			handler(_n,_o){
				this.vform.firmName=_n.firmName;	//公司名称
				this.vform.ein=_n.ein;			//税号  
				this.vform.mobile=_n.mobile; 		//电话
				this.vform.address=_n.address; 	//地址
			}
		}
	},
	methods:{
		// 提交表单
		submitForm(){
			console.log('提交表单....');
			console.log(this.vform);
		},
		// 发票类型选择
		handleRadioChange(val){
			this.isRoutineInvoice = this.vform.invoiceType==2; //普通发票
		}
	}
}
</script>

<style scoped>
.xdialog .el-dialog__body{
	padding: 10px 20px;
}

</style>

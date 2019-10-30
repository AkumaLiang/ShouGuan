<template>
<!-- 发票详情 -->
<!-- 开票 -->

<el-dialog title="发票详情" class="xdialog"  width="60%" :visible.sync="$parent.isdialogInvoice">
	
	
	<el-row class="xdialog-invoice">
		<el-row class="rowl2">
			<span class="xlabel">发票类型：</span>
			{{v_invoice.Financier==1?'增值税专用发票':v_invoice.Financier==2?'增值税普通发票':'增值税电子发票'}}
		</el-row>
		
		<el-row class="rowl2">
			<span class="xlabel">公司名称：</span>{{v_invoice.firmName}}
		</el-row>
		
		<el-row class="rowl2">
			<span class="xlabel">税号：</span>{{v_invoice.ein}}
		</el-row>
		
		<el-row class="rowl2">
			<span class="xlabel">开户行：</span>{{v_invoice.accountName}}
		</el-row>

		<el-row class="rowl2">
			<span class="xlabel">账号：</span>{{v_invoice.accountNo}}
		</el-row>
		
		<el-row class="rowl2">
			<span class="xlabel">电话：</span>{{v_invoice.mobile}}
		</el-row>
		
		<el-row class="rowl2">
			<span class="xlabel">地址：</span>{{v_invoice.address}}
		</el-row>
	</el-row>

	<div class="xline"></div>
	
	<!-- 只显示的内容 -->
	<el-row class="xdialog-invoice2" v-if="_is_only_show">
		<el-row class="rowl2">
			<span class="xlabel">教材邮寄：</span>{{v_invoice.materialType==1?'是':'否'}}
		</el-row>
		
		<!-- 如果是单独邮寄 -->
		<div v-if="v_invoice.mailType==1">
			<span class="xlabel">快递单号：</span>{{v_invoice.invoiceCourierNo}}
			<span class="xlabel">快递公司：</span>{{v_invoice.invoiceCourierName}}
		</div>
		
		
		<!-- 否则是统一邮寄 -->
		<div v-else>
			<el-row class="rowl2" style="margin-top: 26px">
				<span class="xlabel">发票快递单号：</span>{{v_invoice.invoiceCourierNo}}
				<span class="xlabel">发票快递公司：</span>{{v_invoice.invoiceCourierName}}
			</el-row>
			
			<el-row class="rowl2">
				<span class="xlabel">教材快递单号：</span>{{v_invoice.materialCourierNo}}
				<span class="xlabel">教材快递公司：</span>{{v_invoice.materialCourierName}}
			</el-row>
		</div>

		<el-row class="rowl2">
			<span class="xlabel">备注：</span>{{v_invoice.note}}
		</el-row>
		
		<el-row class="rowl2" style="text-align: right;margin-right: 10%;">
			<el-button type="primary" @click="$parent.isdialogInvoice=false">关闭</el-button>
		</el-row>
	</el-row>
	
	<!-- 只显示表单 -->
	<div v-else>
		
		<el-row class="xdialog-invoice2">

			<el-row class="rowl2">
				<span class="xlabel">教材邮寄：</span>{{v_invoice.materialType==1?'是':'否'}}
			</el-row>
			
			<el-row class="rowl2">
				<span class="xlabel">备注：</span>{{v_invoice.note}}
			</el-row>		
		</el-row>
		
		<div class="xline"></div>
		
		<el-row class="xdialog-invoice" style="padding: 10%;">
			<el-form label-position="right" :inline="true" label-width="100px">
				
				<el-form-item label="邮寄方式: ">
					<el-radio-group v-model="vform.mailType">
						<el-radio v-for="item in postMethod" :key="item.id" :label="item.id">{{item.name}}</el-radio>
					</el-radio-group>
				</el-form-item>
				<br>
				
				<!-- 统一邮寄 -->
				<div v-if="vform.mailType==0">
					<el-form-item label="快递单号: ">
						<el-input v-model="vform.invoiceCourierNo"></el-input>
					</el-form-item>
					
					<el-form-item label="快递公司: " >
						<el-select v-model="vform.invoiceCourierName">
						    <el-option v-for="item in postCompany" :key="item" :label="item" :value="item">{{item}}</el-option>
						  </el-select>
					</el-form-item>
				</div>
				<!-- 单独邮寄 -->
				<div v-else>
					<el-form-item label="发票快递单号: ">
						<el-input v-model="vform.invoiceCourierNo"></el-input>
					</el-form-item>
					
					<el-form-item label="发票快递公司: " >
						<el-select v-model="vform.invoiceCourierName">
						    <el-option v-for="item in postCompany" :key="item.id" :label="item.name" :value="item"></el-option>
						  </el-select>
					</el-form-item>
					
					<div v-if="v_invoice.materialType==1">
						<el-form-item label="教材快递单号: ">
							<el-input v-model="vform.materialCourierNo"></el-input>
						</el-form-item>
						
						<el-form-item label="教材快递公司: ">
							<el-select v-model="vform.materialCourierName">
							    <el-option v-for="item in postCompany" :key="item" :label="item" :value="item"></el-option>
							  </el-select>
						</el-form-item>
					</div>
				</div>
			
			</el-form>
			<el-row style="display:block; text-align: right;margin-top: 20px;">
				<el-button  @click="$parent.isdialogInvoice=false">取消</el-button>
				<el-button type="primary" @click="submitForm">提交</el-button>
			</el-row>
			
		</el-row>
	</div>
	
	
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		//邮寄方式:
		postMethod:[
			{id:1,name:'单独邮寄'},
			{id:0,name:'统一邮寄'},
		],
		//快递公司:
		postCompany:['顺丰','邮政'],
		
		vform:{
			mailType:1,					//邮寄方式;
			invoiceCourierNo:'',		//发票
			invoiceCourierName:'',
			materialCourierNo:'',		//教材
			materialCourierName:''
		}
	}},
	props:{
		v_invoice:Object,
		_is_only_show:Boolean,
	},
	methods:{
		submitForm(){
			console.log(this.vform);
		}
	}
}
</script>

<style scoped>.el-col:first-child{text-align:right;}.xdialog.el-dialog__body{padding:0;}.xdialog-invoice{padding-top:3rem!important;padding-bottom:2rem!important;}</style>

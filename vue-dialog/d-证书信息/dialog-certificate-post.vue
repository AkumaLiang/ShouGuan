<template>
<!-- 查看证书 -->
<!-- dialog-certificate-check.vue -->
<el-dialog class="xdialog"  id="certificate-check"  title="邮寄证书" width="48%" :visible.sync="$parent.isCertificatePost">
	
	<el-form label-position="right" ref="vform_dg" :model="vform" label-width="96px" :rules="rules">
		
		<el-form-item label="快递公司：" prop="postCompany">
			<el-select v-model="vform.postCompany">
				<el-option v-for="item in postCompany" :key="item" :label="item" :value="item">{{item}}</el-option>
			</el-select>
		</el-form-item>
		
		<el-form-item label="邮寄单号：" prop="postCode">
			<el-input v-model="vform.postCode"></el-input>
		</el-form-item>
		
		<el-form-item label="附件：">
			<el-upload action="" list-type="picture-card" :limit="5"
			accept="image/*" :auto-upload="false" :on-change="handleGetFiles">
			 <i class="el-icon-plus"></i>
			  <div slot="tip" class="el-upload__tip">【注】: 最多上传5张图片。</div>
			</el-upload>
		</el-form-item>
		
		<el-form-item style="text-align: right;">
			<el-button type="primary" @click="submitForm">提交</el-button>
		</el-form-item>
		
	</el-form>

</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		//快递公司:
		postCompany:['顺丰','邮政'],
		// 表单
		vform:{
			postCompany:'',
			postCode:'',
			fileList:[]
			
		},
		// 规则验证
		rules:{
			postCompany:[{ required: true, message: '请选择快递公司', trigger: 'change' }],
			postCode:[{ required: true, message: '请填写快递单号', trigger: 'blur' }]
		}
	}},
	methods:{
		//GetFiles
		handleGetFiles(f,fList){
			this.vform.fileList = fList;
		},
		//提交表弟那
		submitForm(){
			
			console.log(this.vform);
			
			return;
			
			this.$refs['vform_dg'].validate((valid) => {
				if (valid){
					alert('submit!');
				} else {
					return false;
				}
			});
		}
	},
	props:{
		v_certificate_info:Object
	}
}
</script>

<style>

</style>

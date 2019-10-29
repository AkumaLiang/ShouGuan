<template>
<!-- 邮寄信息 -->
<el-dialog class="xdialog"  title="邮寄信息" width="48%" :visible.sync="$parent.isdgMail">
	<el-form label-position="right" label-width="120px">
		<el-form-item label="快递单号：">
			<el-input v-model="stuMailNno" :disabled="is_read_only"></el-input>
		</el-form-item>
		
		<el-form-item label="教材快递公司：">
			<el-select v-model="stuMailFirm" placeholder="请选择" :disabled="is_read_only">
			    <el-option v-for="item in $parent.mailFirmList" :key="item" :label="item" :value="item">
			    </el-option>
			  </el-select>
		</el-form-item>
		
		<el-form-item class="xdg-btn-r" v-if="!is_read_only">
			<el-button @click="$parent.isdgMail=false">取消</el-button>
			<el-button type="primary" @click="submitForm">提交</el-button>
		</el-form-item>
	</el-form>
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{		
		stuMailNno:'',			//单号
		stuMailFirm:'',			//公司
		is_read_only:false,		//只读
	}},
	methods:{
		//导出
		submitForm(){
			console.log(this.stuMailNno,this.stuMailFirm);
		}
	},
	props:[ 'mail_read_only','mail_code','mail_firm'],
	watch:{
		mail_code:{
			immediate:true,
			handler:function(_n,o){
				this.stuMailNno =_n;
			}
		},
		mail_firm:{
			immediate:true,
			handler:function(_n,o){
				this.stuMailFirm =_n;
			}
		},
		mail_read_only:{
			immediate:true,
			handler:function(_n,o){
				this.is_read_only =_n;
			}
		}
	},
	created(){
		console.log('Hello!');
	}
}
</script>

<style>

</style>

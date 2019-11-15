<template>
<!-- 添加公告 add-notice-->
<el-dialog title="添加公告" width="56%" :visible.sync="$parent.isSubPanel">
<el-form id="vform" ref="vform" :model="vform" :rules="rules" label-position="right" label-width="92px">
	<el-form-item label="标题 :" prop="msTitle" >
		<el-input v-model="vform.msTitle"></el-input>
	</el-form-item>
	<el-form-item label="项目 :" prop="proId">
		<el-select v-model="vform.proId">
			<el-option v-for="item in vProList" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
		</el-select>
	</el-form-item>
	
	<!-- 隐藏域 -->
	<el-form-item label="公告内容：" prop="msInfo">
		<el-input type="text" v-model="vform.msInfo" style="display: none;"></el-input>
	</el-form-item>

	<div id="editor-box" @input="getText">
		<div id="editor-toolbar">
			<span class="ql-formats">
				<select class="ql-font"></select>
				<select class="ql-size"></select>
			</span>
			
			<span class="ql-formats">
				<button class="ql-bold"></button>
				<button class="ql-italic"></button>
				<button class="ql-underline"></button>
				<button class="ql-strike"></button>
			</span>
			
			<span class="ql-formats">
				<select class="ql-color"></select>
				<select class="ql-background"></select>
			</span>
			
			<span class="ql-formats">
				<button class="ql-script" value="sub"></button>
				<button class="ql-script" value="super"></button>
			</span>
			
			<span class="ql-formats">
				<button class="ql-header" value="1"></button>
				<button class="ql-header" value="2"></button>
				<button class="ql-blockquote"></button>
				<button class="ql-code-block"></button>
			</span>
			
			<span class="ql-formats">
				<button class="ql-list" value="ordered"></button>
				<button class="ql-list" value="bullet"></button>
				<button class="ql-indent" value="-1"></button>
				<button class="ql-indent" value="+1"></button>
			</span>
			
			<span class="ql-formats">
				<button class="ql-direction" value="rtl"></button>
				<select class="ql-align"></select>
			</span>
			
			<span class="ql-formats">
				<button class="ql-link"></button>
				<button class="ql-image"></button>
				<button class="ql-video"></button>
				<button class="ql-formula"></button>
			</span>
			
			<span class="ql-formats">
				
			</span>
		</div>
		<div id="editor-container"></div>
	</div>

	<el-form-item style="text-align: right;">
		<el-button type="primary" @click="submitForm('vform')">提交</el-button>
		<el-button @click="comTrigger">取消</el-button>
	</el-form-item>
	
	
</el-form>
</el-dialog>

</template>

<script>
module.exports = {
	data(){return{
		quill:null,	//编辑器
		//项目列表:
		//pid和name可以更改,对应HtmlDom里面的:label和:value即可;
		vProList:[
			{pid:1,name:'项目1'},
			{pid:2,name:'项目2'}
		],
		
		//表单数据
		vform:{
			msTitle:'',
			proId:'',
			msInfo:''
		},
		//规则数据
		rules:{
			msTitle:[{ required: true, message: '请填写标题', trigger: 'blur' }],
			proId:[{required: true, message: '请选择项目', trigger: 'change'}],
			msInfo:[{ required: true, message: '请填写公告内容', trigger: 'change' }]
		}
	}},
	mounted(){
		
			document.body.style.visibility="visible";
			let edit = document.getElementById('editor-container');
			
			var f = setInterval(()=>{
				if(document.getElementById('editor-container')!=undefined){
					this.quill = new Quill('#editor-container',{
						modules:{
							syntax: true,
							toolbar: '#editor-toolbar'
						},
						theme: 'snow',
						placeholder: '在此输入内容...',
					});
					clearInterval(f);
				}
				console.log('loading ... ');
			},600)
			
		
	},
	methods:{
		//关闭面板
		comTrigger(){
			this.$parent.isSubPanel = false;
		},
		//提交表单
		submitForm(formName){
			//提交表单之前调用一下;
			this.getText();
			
			//提交表单的验证;
			this.$refs[formName].validate((valid) => {
			  if (valid) {
				  //AJAX;
				  console.log(this.vform);
			  }else{return false;}
			});
		},
		//获取输入内容;
		getText(){
			this.vform.msInfo = document.querySelector('#editor-container').children[0].innerHTML;
			// console.log(this.vform.msInfo);
		}
	}
}
</script>
<style scoped>body>#editor-box{margin:50px auto;max-width:720px}#editor-container{height:350px;margin-bottom:30px}</style>

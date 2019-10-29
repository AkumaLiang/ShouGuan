<template>
<!-- 添加项目 -->
<!-- add-project -->

<el-dialog title="添加项目" width="50%" :visible.sync="$parent.isSubPanel">
	
<el-form id="vform" ref="vform" :model="vform" :rules="rules" label-position="right" label-width="104px">
	
	<el-form-item label="名称 :" prop="proName">
		<el-input v-model="vform.proName"></el-input>
	</el-form-item>
	
	<el-form-item label="所需证书 :" prop="proCertificate">
		
		<el-col :span="18">
			<el-input v-model="vform.proCertificateVal"></el-input>
		</el-col>
		<el-col :offset="1" :span="5">
			<el-button @click="addTag(1)">添加</el-button>
		</el-col>
		<el-tag :key="idx" v-for="(tag,idx) in vform.proCertificate" :disable-transitions="false" closable :type="tag.type" @close="delTag(1,idx)"> {{tag}}</el-tag>
	</el-form-item>
	
	<el-form-item label="项目成本 :" prop="proCost">
		
		<el-col :span="18">
			<el-input type="number" v-model.number="vform.proCostVal"></el-input>
		</el-col>
		<el-col :offset="1" :span="5">
			<el-button @click="addTag(2)">添加</el-button>
		</el-col>

		<el-tag :key="idx" v-for="(tag,idx) in vform.proCost" :disable-transitions="false" closable :type="tag.type" @close="delTag(2,idx)"> {{tag}}</el-tag>
	</el-form-item>

	 <!--  报名所需资料 -->
	<el-form-item label="报名所需资料 :" prop="proData">
		
		<!-- <el-checkbox disabled :checked="true" >所属部门</el-checkbox>
		<el-row>
			<el-checkbox-group>
				<el-checkbox disabled :checked="true" >所属部门</el-checkbox>
			</el-checkbox-group>
		</el-row> -->
		
		<el-form-item :key="k" v-for="(vtem,k) in vform.dataModel">

			<el-checkbox :label="vtem.name" :value="vtem.id" :indeterminate="vform.selectedList[k].isIndeterminate" v-model="vform.selectedList[k].isCheckedAll" @change="vform.selectedList[k].handleCheckAll" :checked="vtem.isCheckedAll"  class="checkbox-main"></el-checkbox>
			
			<el-checkbox-group class="checkbox-group" @change="vform.selectedList[k].handleChange" v-model="vform.selectedList[k].select_item">
				<el-checkbox  v-for="item in vtem.sub" :key="item.sid" :label="item.sid" :value="item.sid">{{item.name}}</el-checkbox>
			</el-checkbox-group>
			
		</el-form-item>
	</el-form-item>
	
	<!-- 上传图片 -->
	<!-- <el-upload style="display: none;"
		:action="upload_url"
		:on-preview="handlePreview"
	><el-button id="elupload" size="small" type="primary"></el-button></el-upload> -->
	
	<el-form-item label="项目介绍" prop="proInfo">
		<!-- 隐藏域 -->
		<el-input v-model="vform.proInfo" style="display: none;" ></el-input>
	</el-form-item>

	<!-- 文本编辑器 -->
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
		<div id="editor"></div>
	</div>
	
	<!--  -->
	<el-form-item label="附件：">
		<el-upload
		action=""
		:on-change="handleFileChange"
		:auto-upload="false"
		:on-remove="handleOnRemove"
		:file-list="vform.proAccessory"
		>
	<el-button size="medium" round>选取文件</el-button>	
	</el-upload>
		
	</el-form-item>
	
	<el-form-item style="text-align: right;">
		<el-button type="primary" @click="submitForm('vform')">提交</el-button>
		<el-button @click="comTrigger">取消</el-button>
	</el-form-item>
	
	
</el-form>

</el-dialog>

</template>

<script>
module.exports = {
	data(){
		var verify_Certificate = (rule, value, callback) => {
			if(this.vform.proCertificate<1){
				callback(new Error("至少有一个证书"));
			}else{
				callback();
			}
		}
		var verify_Cost = (rule, value, callback) => {
			if(this.vform.proCost.length<1){
				callback(new Error("至少有一个项目成本"));
			}
		}
		var verify_Data = (rule, value, callback) => {
			let isChecked = false
			for(let i =0 ;i<this.vform.selectedList;i++){
				if(this.vform.selectedList.isChecked){
					isChecked = true;
					break;
				}
			}
			
			if(!isChecked){
				callback(new Error('至少选择一项内容'));
			}else{
				callback();
			}
		}
		
		return{
		// upload_url:'https://jsonplaceholder.typicode.com/posts/',	//图片上传地址;
		setf:null,
		quill:null,	//编辑器
		//表单数据
		vform:{
			proName:'',			//项目名称
			
			proCertificate:[],	//项目证书（;号隔开）
			proCertificateVal:'',//单独的证书;
			
			proCost:[],			//项目成本 ,隔开
			proCostVal:'',		//单独的成本
			
			proData:[],			//项目资料（;号隔开）
			proInfo:'',			//项目介绍
			proAccessory:[
				{id:11,name: '企业规划.doc', url:"http://www.most.gov.cn/mostinfo/xinxifenlei/kjtjyfzbg/kjtjbg/kjtj2016/201603/P020160323556224535922.doc"},
				{id:12,name: '企业规划.doc', url:"http://www.most.gov.cn/mostinfo/xinxifenlei/kjtjyfzbg/kjtjbg/kjtj2016/201603/P020160323556224535922.doc"},
				{id:13,name: '企业规划.doc', url:"http://www.most.gov.cn/mostinfo/xinxifenlei/kjtjyfzbg/kjtjbg/kjtj2016/201603/P020160323556224535922.doc"},
			],	//附件 ,隔开
			//模型数据,
			dataModel:[
				{id:0,name:'基本信息',sub:[
					// {sid:"bmen",name:"所属部门"},
					// {sid:"xming",name:"姓名"},
					// {sid:"xbie",name:"性别"},
					// {sid:"xmu",name:"项目"},
					// {sid:"gsmc",name:"公司名称"},
					// {sid:"shao",name:"税号"},
					// {sid:"sfzh",name:"身份证号"},
					// {sid:"dzhi",name:"地址"},
					// {sid:"dhua",name:"电话"},
					// {sid:"yxiang",name:"邮箱"},
					{sid:"zcheng",name:"职称"},
					{sid:"xli",name:"学历"},
					// {sid:"gzdw",name:"工作单位"},
					{sid:"zwu",name:"职务"},
					{sid:"gznx",name:"工作年限"},
					// {sid:"txdz",name:"通讯地址"},
					// {sid:"hkje",name:"汇款金额"},
					// {sid:"hkzh",name:"汇款账户"}
					],
				},
				{id:1,name:'附件信息',sub:[
					{sid:"xli2",name:"学历"},
					{sid:"zshu",name:"证书"},
					{sid:"gzzm",name:"工作证明"},
					{sid:"sfz",name:"身份证"},
					{sid:"zpian",name:"照片"},
					{sid:"xmsbb",name:"项目申报表"}
					],
				},
				{id:2,name:'其他信息',sub:[
					{sid:"text",name:"文字信息"},
					{sid:"file",name:"文件信息"},
					],
				}
			],
			//选择的项目:
			selectedList:[],
				
			
		},
		//规则数据
		rules:{
			proName:[{ required: true, message: '请填写名称', trigger: 'blur' }],
			proCertificate:[{validator: verify_Certificate, trigger: 'change'}],
			proCost:[{validator: verify_Cost, trigger: 'change'}],
			proData:[{validator: verify_Data, trigger: 'change'}],
			proInfo:[{ required: true, message: '请填写信息', trigger: 'blur' }],
		}
	}},mounted(){
		document.body.style.visibility="visible";
		this.setf = setInterval(this.getDom,800);
	},
	methods:{
		handlePreview(f){
			console.log(f,f.response);
		},
		//colser panel
		comTrigger(){
			this.$parent.isSubPanel = false;
		},
		//add tag
		addTag(v){

			if(v==1){
				
				if(this.vform.proCertificateVal=='')return
				
				if(this.vform.proCertificate.indexOf(this.vform.proCertificateVal) > -1){
					alert('已经包含该同名证书!');return;
				}
				this.vform.proCertificate.push(this.vform.proCertificateVal);
				this.vform.proCertificateVal = '';

			}else if(v==2){
				if(this.vform.proCostVal=='')return

				if(this.vform.proCost.indexOf(this.vform.proCostVal) > -1){
					alert('已经包含该同名证书!');return;
				}

				this.vform.proCost.push(this.vform.proCostVal);
				this.vform.proCostVal = '';
			}
		},
		//delete tag
		delTag(q,idx){

			if(q==1){
				this.vform.proCertificate.splice(idx,1);
			}else if(q==2){
				this.vform.proCost.splice(idx,1);
			}
		},
		//file onchange
		handleFileChange(f,flist){
			this.vform.proAccessory = flist;
		},
		//获取输入内容;
		getText(){
			this.vform.proInfo = document.querySelector('#editor').children[0].innerHTML;
		},
		//提交表单之前调用一下;
		beforSubmit(){
			
			this.vform.proData = [];
			 // let f = false;
			 for(let i=0;i<this.vform.selectedList.length;i++){
				console.log('data:: ',this.vform.selectedList[i].select_item,this.vform.selectedList[i].select_item.length);
				
				if(this.vform.selectedList[i].select_item.length>0){
					
					// f = true;
					let sid = [];
					for(let j=0;j<this.vform.selectedList[i].select_item.length;j++){
						// debugger;
						console.log('sid[j]: ',this.vform.selectedList[i].select_item);
						sid.push(this.vform.selectedList[i].select_item[j]);
						// console.log('sid: ',sid);
					}
					this.vform.proData.push({id:i,sid:sid});
				}
			 }
			 console.log('this.vform.proData: ',this.vform.proData);
			 
			 //判断资料数据;
			 // if(!f){alert('至少有一个资料选项!');return false;}
			 
			//完善文本信息;
			this.getText();
		},
		//提交表单
		submitForm(formName){
			//提交表单之前调用一下;
			this.beforSubmit();
			console.log('名字: ',this.vform.proName);		//名字
			console.log('证书: ',this.vform.proCertificate);	//证书
			console.log('成本: ',this.vform.proCost);		//成本
			console.log('信息: ',this.vform.proInfo);		//信息
			console.log('资料: ',this.vform.proData);		//资料
			console.log('资料toStr: ',JSON.stringify(this.vform.proData));		//资料
			console.log('---------------');
			console.log('文件: ',this.vform.proAccessory);	//文件
			
			/*
			this.$refs[formName].validate((valid) => {
			  if (valid) {
				  
			  } else {
				return false;
			  }
			});
			*/
		},
		
		/*
		{
			container:'#editor-toolbar',
			handlers:{
				'image':function(val){
					if(val){
						document.querySelector('#elupload').click()
					}else{
						this.quill.format('image', false);
					}
				}
			}
		}
		*/
		
		getDom(){
			if(document.getElementById('editor')!= undefined){
				this.quill = new Quill('#editor',{
					modules:{
						syntax: true,
						toolbar: '#editor-toolbar',
					},
					theme:'snow',
					placeholder: '在此输入内容...',
				});
				console.log(this.quill);
				
				if(this.setf!=null){
					window.clearInterval(this.setf);
				}
			}else{ console.log('loading....');}
		},
		//将json还原为obj数据
		setJsonTo(jstr){
			let obj = JSON.parse(jstr);
			console.log(obj);
			for(let i=0;i<obj.length;i++){
				if(obj[i].id==0 || obj[i].id==1 || obj[i].id==2){
					
					for(let j=0;j<obj[i].sid.length;j++){
						this.vform.selectedList[i].select_item.push(obj[i].sid[j]);
					}
					// console.log('yox: ',obj[i].sid)
					// console.log('gox: ',this.vform.selectedList[i].select_item);
				}
				/*
				else if(){
					
				}
				else if(obj[i].id==2){
					
				}
				*/
			}
			
			console.log('go: ',this.vform.selectedList[0].select_item);
			console.log('go: ',this.vform.selectedList[1].select_item);
			console.log('go: ',this.vform.selectedList[2].select_item);
		},
		//文件移除时
		handleOnRemove(f,fList){
			console.log(f,fList);
			
		}

		
	},
	created(){
		
		for(let i=0;i<3;i++){
			this.vform.selectedList.push({
				isChecked:false,
				isCheckedAll:false,
				isIndeterminate:false,
				select_item:[],
				handleChange:(val)=>{			//选中
					
					console.log(val);
					
					//长度
					let checkedCount = val.length;
					
					//是否全选
					this.vform.selectedList[i].isCheckedAll = checkedCount === this.vform.dataModel[i].sub.length;
					//是否选中[图标]
					this.vform.selectedList[i].isIndeterminate = checkedCount > 0 && checkedCount < this.vform.dataModel[i].sub.length;
					// 是否选中
					this.vform.selectedList[i].isChecked = checkedCount >0;
				},
				
				handleCheckAll:(val)=>{			//全选
					// console.log('全选中....'+val);
					
					this.vform.selectedList[i].select_item = [];
					this.vform.selectedList[i].isChecked = val;
					if(val){
						for(let j=0;j<this.vform.dataModel[i].sub.length;j++){
							this.vform.selectedList[i].select_item.push(this.vform.dataModel[i].sub[j].sid);
						}
					}
					this.vform.selectedList[i].isIndeterminate = false;
				},
			});
		}
		
		//新数据;
		
		let jstr = '[{"id":0,"sid":["zcheng","gznx"]},{"id":1,"sid":["xli2","zshu","sfz","gzzm"]},{"id":2,"sid":["text","file"]}]';
		this.setJsonTo(jstr);
		
	},

}
</script>

<style scoped>#vform .el-tag{margin:0 4px}.checkbox-group{margin-left:20px}.checkbox-main{font-weight:bold}body>#editor-box{margin:50px auto;max-width:720px}#editor{height:350px;margin-bottom:30px}</style>

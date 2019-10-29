<template>
<!-- 新增部门 -->
<!-- add-department -->
<!--
1. 父级判断:isisSubPanel;
2. 接口信息: http://localhost:8080/jeefast/sgEduCostInfo/arrayList
-->
<el-dialog title="新增部门" width="40%" :visible.sync="$parent.isSubPanel"><!-- 新增员工 -->
<el-form id="vform" :rules="rules" :model="vform" label-position="right" label-width="96px"  ref="vform">	
	<el-form-item label="上级部门 ：" prop="parentId">
		<el-select v-model="vform.parentId" placeholder="选择部门">
			<el-option v-for="item in vpt.department" :key="item.val" :label="item.label" :value="item.val"></el-option>
		</el-select>
	</el-form-item>

	<el-form-item label="部门名称 ：" prop="name">
		<el-input v-model="vform.name"></el-input>
	</el-form-item>

	<el-form-item label="部门经理 ：" prop="deptManager">
		<el-select v-model="vform.deptManager">
			<el-option v-for="item in vpt.manager" :label="item.label" :key = "item.val" :value="item.val"></el-option>
		</el-select>
	</el-form-item>

	<el-form-item label="部门描述 ：" prop="deptInfo" id="charCountF">
		<el-input v-model="vform.deptInfo" @input="handleTextChange" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入描述信息"></el-input>
		<i id="charCountX">已输入{{charCount}}/200</i>
	</el-form-item>
	
	<el-form-item style="text-align:right">
		<el-button plain @click="comTrigger">取消</el-button>
		<el-button type="primary" plain @click="submitForm('vform')">添加</el-button>
	</el-form-item>
</el-form>
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		charCount:0,
		//选项数据;
		vpt:{
			//部门列表
			department:[
				{label:'策划部',val:'1'},
				{label:'设计部',val:'2'}
			],
			//经理人员
			manager:[
				{label:'策划部',val:'1'},
				{label:'设计部',val:'2'}
			]
		},
		//表单数据
		vform:{
			parentId:'',		//上级部门
			name:'',			//部门
			deptManager:'',		//经理人员
			deptInfo:'',		//部门描述
		},
		//规则数据
		rules:{
			parentId:[{ required: true, message: '请选择上级部门', trigger: 'change' }],
			name:[{ required: true, message: '请输入名字', trigger: 'blur' },
            { min: 1, max: 6, message: '长度最多 6 个字符', trigger: 'blur' }],
			deptManager:[{ required: true, message: '请部门经理', trigger: 'change' }],
			deptInfo:[{ required: true, message: '请输入部门描述', trigger: 'blur' },
            { max:200, message: '长度最多 200 个字符', trigger: 'change' }]
		}
	}},
	methods:{
		//关闭面板
		comTrigger(){
			this.$parent.isSubPanel = false;
		},
		//提交表单
		submitForm(formName){
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.vform);
					//提交表单;
				}else{
					return false;
				}
			});
		},
		//字数统计
		handleTextChange(val){
			if(val.length>=200){ this.vform.deptInfo = this.vform.deptInfo.substr(0,200);}
			this.charCount = this.vform.deptInfo.length;
		}
	},
	mounted(){document.body.style.visibility="visible";},// 处理数据加载延迟;
	created(){
		
		//获取数据;
	}
	
};
</script>

<style>
#vform{
    box-sizing: border-box;
	padding: 0 2rem;
}
#charCountF{
	position: relative;
}

#charCountX{
	/* display: block; */
	position: absolute;
	
	right: 1%;
	bottom: 1%;
	color: #ccc;
}
</style>

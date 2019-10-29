<template>
<!-- 新增员工 -->
<!-- 新增成员(代理) -->
<!-- add-member -->
<!--
1. 等待接口和规则库;
2. 进度=>页面完成;
-->
<el-dialog title="新增员工" width="40%" :visible.sync="$parent.isSubPanel">
<el-form id="vform" :rules="rules" :model="vform" label-position="right" label-width="80px" ref="vform">
    <el-form-item label="部门" prop="deptId">
        <el-select style="width:100%" v-model="vform.deptId">
			<el-option v-for="item in vpt.branch" :key="item.value" :label="item.name" :value="item.value">{{item.name}}</el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="姓名" prop="userName">
        <el-input v-model="vform.userName"></el-input>
    </el-form-item>

    <el-form-item label="性别" prop="userSex">
		<el-radio-group v-model="vform.userSex">
			<el-radio v-for="item in vpt.gender" :label="item.value" :key="item.value">{{item.name}}</el-radio>
		</el-radio-group>
    </el-form-item>

    <el-form-item label="角色" prop="roleId">
        <el-select style="width:100%" v-model="vform.roleId">
        <el-option v-for="item in vpt.role" :key="item.label" :label="item.name" :value="item.value">{{item.name}}</el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="登录账号" prop="userAccount">
        <el-input v-model="vform.userAccount"></el-input>
    </el-form-item>

    <el-form-item label="登录密码" prop="userPassword">
        <el-input v-model="vform.userPassword"></el-input>
    </el-form-item>

    <el-form-item label="确认密码" prop="checkPwd">
        <el-input v-model="vform.checkPwd"></el-input>
    </el-form-item>

    <el-form-item label="联系电话" prop="userPhone">
        <el-input v-model="vform.userPhone"></el-input>
    </el-form-item>

    <!-- 代理人的扩展 -->

<!-- 新增员工-代理人扩展表单 -->

<div v-if="isDelegation">
    <el-form-item label="代理所属公司" label-width="110px" prop="agencyFirm">
        <el-select style="width:100%" v-model="vform.agencyFirm">
			<el-option v-for="item in vpt.deg_company" :label="item.name" :key="item.value" :value="item.value"></el-option>
		</el-select>
    </el-form-item>
    
    <el-form-item label="代理地区" prop="agencyRegion">
		<el-cascader separator=" - " :options="vpt.deg_district" v-model="vform.agencyRegion"></el-cascader>
    </el-form-item>

    <el-form-item label="绑定项目" prop="projIds">
		<el-checkbox :indeterminate="isIndeterminate" v-model="isCheckAll" label="全选" name="type" @change="handleCheckAllChange"></el-checkbox>
		<el-checkbox-group v-model="vform.projIds" @change="handleCheckedProChange">
			<el-checkbox v-for="item in vpt.project" :key="item.label" :label="item.label" :value="item.label" name="type">{{item.name}}</el-checkbox>
		</el-checkbox-group>
    </el-form-item>
	
	<el-form-item :key="K" v-for="(item,K) in vform.refundRate"  :label="K==0?'返款比例':''" :rules="[{required: true, message:'请输入比例',trigger: 'blur' }]">
		<el-col :span="24">{{item.name}}<el-input v-model.number="item.ratio" style="max-width: 60%; margin: 0 4%;"></el-input>%</el-col>
	</el-form-item>

</div>

</el-form>
<div style="text-align: right; padding-right: 12%;">
	<el-button type="primary" plain @click="comTrigger">取消</el-button>
	<el-button type="primary" plain @click="submitForm('vform')">添加</el-button>
</div>
</el-dialog>

</template>

<script>
module.exports = {
	data(){
		
		var checkPwd = (rule, value, callback) => {
			if (value === '') {
			  callback(new Error('请再次输入密码'));
			} else if (value !== this.vform.userPassword) {
			  callback(new Error('两次输入密码不一致!'));
			} else {
			  callback();
			}
		  };
		  
		  var verifyProjId = (rule, value, callback) => {
			 for(let i=0;i<this.vform.refundRate.length;i++){
			 	if(this.vform.refundRate[i].ratio==''){
			 		callback(new Error('请填写完整'));
			 		return;
			 	}
			 }
			callback();
			
		  };

		
		return{
		//规则
		rules:{
			deptId:[{ required: true, message: '请选择部门', trigger: 'change' }],
			userName:[{required: true, message: '请输入姓名', trigger: 'blur'}],
			userSex:[{required: true, message: '请选择性别', trigger: 'change'}],
			roleId:[{required: true, message: '请选择角色', trigger: 'change'}],
			userAccount:[{required: true, message: '请输入账号', trigger: 'blur'}],
			userPassword:[{required: true, message: '请输入密码', trigger: 'blur'}],
			checkPwd:[{required: true,validator: checkPwd, trigger: 'blur'}],
			userPhone:[{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ len:11, message: '请正确输入手机号', trigger: 'change' }],
			agencyFirm:[{required: true, message: '请选择地区', trigger: 'change'}],
			projIds:[{ required: true, message: '请至少选择一个活动性质', trigger: 'change'}]
			
			
		},
		//is代理人?
		isDelegation:true,
		//选项:下面这些字段都是可以改的,只要对应 :label 或特殊情况的{{itemm.lable}} => 作为显示, :value =>作为值 ,
		vpt:{
			//部门
			branch:[
				{value:1,name:'技术部'},
				{value:2,name:'开发部'},
			],
			//性别
			gender:[
				{value:'1',name:'男'},
				{value:'0',name:'女'}
			],
			//角色:
			role:[
				{value:'1',name:'代理人员'},
				{value:'0',name:'公司人员'}
			],
			//代理公司
			deg_company:[
				{value:'1',name:'公司1'},
				{value:'2',name:'公司1'}
			],
			//代理地址 ing....
			deg_district:[
				{value:'hebei',label:'河北',children:
					[
						{value:'shijiazhuang',label:'石家庄'},
						{value:'qinhongdao',label:'秦皇岛'},
					],
				},
				{value:'beijing',label:'北京',children:
					[
						{value:'xi-1',label:'东城区'},
						{value:'xi-2',label:'西城区'},
					],
				}
			],
			//绑定项目
			project:[
						{name:'初级管理会计师',label:'1'},
						{name:'中级管理会计师',label:'2'},
						{name:'高级管理会计师',label:'3'},
						{name:'初级内控管理师',label:'4'},
						{name:'中级内控管理师',label:'5'},
						{name:'高级内控管理师',label:'6'},
						{name:'国际会计师AAIA',label:'7'},
						{name:'中级国际财务管理师',label:'8'},
						{name:'中级税务管理师',label:'9'}
					],
		},
		
		//表单
		vform:{			
			userName:'',		//姓名
			userSex:'',			//性别
			deptId:'',			//部门Id;
			roleId:'',			//角色id
			userAccount:'',		//员工账户
			userPassword:'',	//员工密码
			checkPwd:'',		//确认密码---无效;
			userPhone:'',		//手机号
			// userState:'',		//员工状态 0解冻 1冻结---无效;
			agencyFirm:'',		//所属公司
			agencyRegion:[],	//所属省-市
			agencyRegionPro:'',	//所属省
			agencyRegionCity:'',//所属市
			projIds:[],			//绑定项目集-每个项目集的返款比例;
			refundRate:[],		//返款比例
			memberType:'',		//0公司人员 1代理商人员
		},
		isIndeterminate:false,
		isCheckAll:false,
		
		
	}},mounted(){document.body.style.visibility="visible";},//处理数据加载延迟;
	methods:{
		//关闭面板
		comTrigger(){
			this.$parent.isSubPanel = false;
		},
		//区域发生改变
		resetAgencyRegion(){
			this.vform.agencyRegionPro = this.vform.agencyRegion[0];
			this.vform.agencyRegionCity = this.vform.agencyRegion[1];
		},
		//提交表单
		submitForm(formName){
			for(let i=0;i<this.vform.refundRate.length;i++){
				if(this.vform.refundRate[i].ratio==''){
					window.alert('请填写完整项目的返款比例!');
					return;
				}
			}
			this.resetAgencyRegion();
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.vform);
					//提交表单;
				}else{
					return false;
				}
			});
		
		},
		//checkBox全选
		handleCheckAllChange(val){
			// //选中的  和  原先的;
			if(val){
				this.vform.refundRate = [];
				for(let i=0;i<this.vpt.project.length;i++){
					//!important
					this.vform.projIds.push(this.vpt.project[i].label);
					this.vform.refundRate.push({
						pid:this.vpt.project[i].label,
						name:this.vpt.project[i].name,	//name
						ratio:''
					});
				}
			}else{
				this.vform.projIds = [];
				this.vform.refundRate = [];
			}
			this.isIndeterminate = false;
			console.log(val,this.vform.projIds);
		},
		//项目发生改变
		handleCheckedProChange(value){
			this.vform.refundRate = [];
			for(let i=0;i<value.length;i++){
				for(let j=0;j<this.vpt.project.length;j++){
					
					if(value[i]==this.vpt.project[j].label){
						
						this.vform.refundRate.push({
							pid:this.vpt.project[j].label,	//pid
							name:this.vpt.project[j].name,	//name
							ratio:''						//value
						});
					}
				}
			}
			// debugger;
			let checkedCount = value.length;
			this.isCheckAll =  checkedCount === this.vpt.project.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.vpt.project.length;
		}
	}
}
</script>
<style>
#vform{
	box-sizing: border-box;
	max-width: 76%;
	margin: 0 auto;
}
</style>

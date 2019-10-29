<template>
<!-- 新增角色 -->
<!--

-->
<el-dialog title="新增角色" width="40%" ref="vform" :visible.sync="$parent.isSubPanel">
<el-form id="vform" ref="vform"  label-position="right" label-width="86px" :model="vform" :rules="rules">

	<el-form-item label="角色名称 :" prop="role_name">
		<el-input v-model="vform.role_name"></el-input>
	</el-form-item>
	<el-form-item label="角色描述 :" prop="remark">
		<el-input v-model="vform.remark"></el-input>
	</el-form-item>

	<el-form-item label="权限 :">
		<el-row v-for="(vtem,j) in vform.power" :key="j">
			
			<el-checkbox :label="vtem.name" :value="vtem.menuId" v-model="vtem.isCheckedAll" :checked="vtem.isCheckedAll" @change.native="handle_CheckAll(j)" class="checkbox-main"></el-checkbox>
			
			<el-row class="checkbox-group"  >
				<el-checkbox  v-for="item in vtem.sub_menu" @change.native="handle_Change(item.menuId,j)" v-model="item.isChecked" :indeterminate="false" :checked="item.isChecked"  :key="item.menuId" :label="item.name" :value="item.menuId" ></el-checkbox>
			</el-row>
			
		</el-row>
	</el-form-item>
	
	<el-form-item style="text-align: right;">
		<el-button @click="comTrigger">取消</el-button>
		<el-button type="primary" @click="submitForm('vform')">提交</el-button>
	</el-form-item>
	
	</el-form>
</el-dialog>
</template>

<script>


module.exports = {
	data(){
		return{
		vform:{
			role_name:'',		//角色名称
			remark:'',			//备注 
			dept_id1:[],
			dept_id:[],
			
			//权限数据
			power:
			[
			
			// 主菜单一
			{ 
				parentId:0,						//数据
				menuId:1,						//数据
				name:'一级菜单1',				//数据
				parentId:false,					//固定的
				isCheckedAll:false,				//固定的
				select_sub:[],					//固定的
				sub_menu:[						//数据
					{parentId:1,menuId:12,name:'二级菜单',isChecked:false},
					{parentId:1,menuId:13,name:'二级菜单',isChecked:false},
				]
			},//完整的数据块

			// 主菜单二
			{
				parentId:0,						//数据
				menuId:2,						//数据
				name:'一级菜单2',				//数据
				parentId:false,					//固定的
				isCheckedAll:false,				//固定的
				select_sub:[],					//固定的
				sub_menu:[						//数据
					{parentId:2,menuId:22,name:'二级菜单',isChecked:false},
					{parentId:2,menuId:23,name:'二级菜单',isChecked:false},
				]
			},//完整的数据块

			],
		},
		//规则数据
		rules:{
			role_name:[{required: true, message: '请输入角色名称', trigger: 'blur'}],
			remark:[{required: true, message: '请输入角色描述', trigger: 'blur'}]
		}

	}},
	methods:{
		//获取权限;
		getPowerData(){
			
			let data = [];
			for(let i=0;i<this.vform.power.length;i++){
				if(this.vform.power[i].isChecked){
					data.push({
						mid:this.vform.power[i].menuId,
						sid:this.vform.power[i].select_sub
					});
				}
			}
			return data;
		},
		//提交表单
		submitForm(formName){
			// console.log(this.vform);
			
			//已经获取的权限数据;
			//mid:选项;
			//sid:选项;
			let power = this.getPowerData();		console.log(power);
			
			//是否选择了至少一个全选
			if(power.length<1){ window.alert('请至少选择一个权限!'); return;}
			
			
			this.$refs[formName].validate((valid) => {
			  if (valid) {
				  
				  // console.log(power);
				  console.log(this.vform.role_name);
				  console.log(this.vform.remark);
				  //AJAXdate;
				
			  } else {
				return false;
			  }
			});
		},
		//关闭面板
		comTrigger(){
			this.$parent.isSubPanel = false;
		},
		handleSubCheck(v){
			console.log(v);
		},
		handle_Change(mid,j){
			// console.log('mid: '+mid+',j:'+j,this.vform.power[j].sub_menu);			
			//遍历,根据mid进行操作;
			for(let i=0;i<this.vform.power[j].sub_menu.length;i++){
				// console.log('mid=,,',mid,i,this.vform.power[j].sub_menu[i].menuId,this.vform.power[j].sub_menu.length);
				if(mid == this.vform.power[j].sub_menu[i].menuId){
					
					console.log('mid='+mid+', i='+i+' ... ',this.vform.power[j].sub_menu[i].menuId);
					//是否选中:
					let isTrue = this.vform.power[j].sub_menu[i].isChecked;
					
					//$元素操作
					if(isTrue){
						//选中添加
						this.vform.power[j].select_sub.push(mid);
						console.log('add')
					}else{
						//取选移除
						for(let i=0;i<this.vform.power[j].select_sub.length;i++){
							
							//获得已选择的mid,对齐进行删除;
							if(mid == this.vform.power[j].select_sub[i]){
								this.vform.power[j].select_sub.splice(i,1);
								break;
							}
							
						}//end of for	
						console.log('remove');
					}
					
					
					//$判断是否到达临界值;
					
					//是否被选中
					this.vform.power[j].isChecked = this.vform.power[j].select_sub.length>0?true:false;
					console.log('this.vform.power[j].isChecked = > '+this.vform.power[j].isChecked.toString(),this.vform.power[j].select_sub.length);
					// console.log('this.vform.power[0].isChecked: ',this.vform.power[j].isChecked,this.vform.power[j].select_sub.length,this.vform.power[j].select_sub);
					//是否全选
					this.vform.power[j].isCheckedAll = this.vform.power[j].select_sub.length==this.vform.power[j].sub_menu.length;
					// console.log('this.vform.power[0].isCheckedAll',this.vform.power[j].isCheckedAll,this.vform.power[j].sub_menu.length);
					
					// debugger;
					break;
				}//end of if
			}//end of for

		},

		handle_CheckAll(j){
			//保持i,使用j;
			console.log('选择全部2'+this.vform.power[j].isCheckedAll);
			
			//赋值之前先清空;
			this.vform.power[j].select_sub = [];
			//判断是全选|取消全选;
			let isTrue = this.vform.power[j].isCheckedAll;
			this.vform.power[j].isChecked = isTrue;
			
			for(let i=0;i<this.vform.power[j].sub_menu.length;i++){
				
				//将所有子菜单全选|取消全选;
				this.vform.power[j].sub_menu[i].isChecked= isTrue;
		
				//如果是全选,则赋值;
				if(isTrue){
					this.vform.power[j].select_sub.push(this.vform.power[j].sub_menu[i].menuId);
				}
			}
			//如果不是全选;Nul;
		}
	},
	created(){
		
	}

};
</script>
<style scoped>#vform{margin:0 auto;width:70%;}.checkbox-group{margin-left:20px;}.checkbox-main{font-weight:bold;}</style>

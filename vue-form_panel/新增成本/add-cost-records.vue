<template>
<el-dialog width="80%" :visible.sync="$parent.isSubPanel">
<el-row type="flex" justify="space-between">
    <el-col id="vform">
		<div class="vtitle">添加成本记录</div>
        <el-form id="vform-content" :model="vform" label-position="right" label-width="192px" ref="vform" :rules="rules">

			<!-- 选择时间 -->
            <el-form-item label="时间段 ：" id="timefocus" prop="date">
				<el-date-picker value-format="yyyy-MM-dd" v-model="vform.time" @change="handleDtChange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :clearable="false" :editable="false"></el-date-picker>
            </el-form-item>

			<!-- 选择项目 -->
            <el-form-item label="项目 ：" v-if="projList.length"  prop="project">
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="vform.projId"  id="vform-content-projects" @change="handleProChecke" >
					<el-checkbox v-for="item in projList" :checked="item.checked" :label="item.label" :key="item.label" name="type">{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

			<!-- 项目成本选择 -->
           <el-form-item label="项目成本 ："  prop="cost">
                <el-row :key="k" v-for="(v,k) in vform.selectList" style="margin: 6px 0;">
					<el-row v-if="v.cost.length>0">
						<el-col :span="5">{{v.name}}</el-col>
						<el-col :span="8">
						    <el-select v-model="vform.selectList[k].def_cost" @change="handleChangeSelect(v.label)">
						        <el-option v-for="item in v.cost" :key="item.label" :label="item.label" :value="item.label"></el-option>
						    </el-select>
						</el-col>
					</el-row>
				</el-row>
            </el-form-item>

			<!-- 项目提成输入 -->
            <el-form-item label="项目提成 ：" prop="share">
                <el-row style="margin-bottom: 8px;" :key="k" v-for="(v,k) in vform.selectList">
                    <el-col :span="5">{{v.name}}</el-col>
                    <el-col :span="8">
                        <el-input v-model.number="vform.selectList[k].def_share" @keyup.native="handleChangeSelect(v.label)"></el-input>
                    </el-col>
                    <el-col :offset="1" :span="2">元</el-col>
                </el-row>
            </el-form-item>


			<!-- 工资 -->
            <el-form-item label="员工工资 ：" prop="staffWage">
                <el-col :span="13"><el-input v-model.number="vform.staffWage" @keyup.native="setLr"></el-input></el-col>
                <el-col :offset="1" :span="2">元</el-col>
            </el-form-item>
			<!-- 房租 -->
            <el-form-item label="房租 ：" prop="rent">
                <el-col :span="13"><el-input v-model.number="vform.rent" @keyup.native="setLr"></el-input></el-col>
                <el-col :offset="1" :span="2">元</el-col>
            </el-form-item>
			<!-- 杂费 -->
            <el-form-item label="杂费 ：" prop="misceFee">
                <el-col :span="13"><el-input v-model.number="vform.misceFee" @keyup.native="setLr"></el-input></el-col>
                <el-col :offset="1" :span="2">元</el-col>
            </el-form-item>
			<!-- 提交按钮 -->
            <el-form-item>
				<el-col :span="20" style="text-align: right;">
					<el-button type="primary" @click="submitForm('vform')">提交</el-button>
					<el-button @click="$parent.isSubPanel=false">取消</el-button>
				</el-col>
            </el-form-item>
        </el-form>
    </el-col>
	<!-- 表格 -->
    <el-col id="vtable">
        <div class="vtitle">表格预览</div>
		<div id="vtable-content">
            <template>
                <el-table :data="vform.selectList" style="width: 100%" show-summary>
                    <el-table-column prop="name" label="项目名称"></el-table-column>
                   <el-table-column prop="money" label="项目金额"></el-table-column>
                    <el-table-column prop="def_cost" label="项目成本"></el-table-column>
                    <el-table-column prop="taxes" label="税金"></el-table-column>
                    <el-table-column prop="def_share" label="项目提成"></el-table-column>
                    <el-table-column prop="result" label="毛利"></el-table-column>
                </el-table>
				<table id="ftrtd" style="width: 100%">
					<tr><td>员工工资</td><td class="last-td">{{vform.staffWage}}</td></tr>
					<tr><td>房租</td><td class="last-td">{{vform.rent}}</td></tr>
					<tr><td>杂费</td><td class="last-td">{{vform.misceFee}}</td></tr>
					<tr><td>利润</td><td class="last-td">{{vform.lr}}</td></tr>
				</table>
            </template>
        </div>
    </el-col>
</el-row>
</el-dialog>
</template>

<script>
module.exports = {
	data(){
		var verify_date= (rule, value, callback)=>{
			if(this.vform.time.length!=2){
				callback(new Error('请选择时间'));
			}else {
              callback();
            }
		}
		var verify_pro_cost = (rule, value, callback)=>{
			for(let i=0;i<this.vform.selectList.length;i++){
				if(this.vform.selectList[i].def_cost==''){
					callback(new Error('选项不能为空'));
				}else {
					callback();
				}
			}
		}
		var verify_pro_share = (rule, value, callback)=>{
			for(let i=0;i<this.vform.selectList.length;i++){
				if(this.vform.selectList[i].def_share==''){
					callback(new Error('输入不能为空'));
				}else {
					callback();
				}
			}
		}
		var verify_selectCount =(rule, value, callback)=>{
		
			if(this.vform.selectList.length < 1){
				callback(new Error('请至少选择一个项目'));
			}else {
				callback();
			}
		
		}

		return{
		//规则库
		rules:{
			// 自定义验证规则
			date:[{ required: true,validator: verify_date, trigger: 'blur' }],
			project:[{ required: true, validator: verify_selectCount, trigger: 'blur' }],
			staffWage:[{ required: true, message: '员工工资不能为空'},
					{ type: 'number', message: '员工工资必须为数字值'}],
			rent:[{ required: true, message: '房租不能为空'},
					{ type: 'number', message: '房租必须为数字值'}],
			misceFee:[{ required: true, message: '杂费不能为空'},
					{ type: 'number', message: '杂费为数字值'}],
			cost:[{ required: true, validator: verify_pro_cost, trigger: 'change' }],
			share:[{ required: true,validator: verify_pro_share, trigger: 'blur' }],
		},
		// 页面控制变量
		isIndeterminate:false,	//是否全选;样式控制
		checkAll:false,			//是否全选;
		
		focusTime:false,
		isAlert:false,
		isGetTime:false,		//是否已经获取时间
		
		dataCost:[],
		opt_project:[],
		opt_projId:[
			{value:0, label:"初级管理会计师"},
			{value:0, label: "初级内控管理师"}
		],

		//页面表单
		vform:{
			time:'',		//时间{开始+结束}
			startTime:'',	//开始时间
			endTime:'',		//结束时间

			//根据项目决定
			projShare:'',	//项目提成
			projProfit:'',	//项目利润

			projId:[],		//选择的所有项目的Id;
			
			staffWage:'',	//工资-
			rent:'',		//房租-
			misceFee:'',	//杂费-

			selectList:[],
			//def_cost;		项目成本
			//def_share;	项目提成
			
			lr:'',			//利润(计算)
		},

		//来自服务器的原始数据
		vList:[{
				"proId": 5,
				"proName": "项目5",
				"proCertificate": null,
				"proData": null,
				"operationId": null,
				"operationTime": null,
				"spare1": null,
				"proCost": '123,456,789',
				"proInfo": "这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，这里是项目介绍，",
				"proAccessory": "E:/excel导入导出/excel导入导出.doc,E:/excel导入导出/excel导入导出.doc,E:/excel导入导出/excel导入导出.doc,E:/excel导入导出/excel导入导出.doc",
				"stuTotal": null,
				"stuDept": null
			}, {
				"proId": 4,
				"proName": "项目4",
				"proCertificate": null,
				"proData": null,
				"operationId": null,
				"operationTime": null,
				"spare1": null,
				"proCost": '123,456,789',
				"proInfo": null,
				"proAccessory": null,
				"stuTotal": null,
				"stuDept": null
			}, {
				"proId": 3,
				"proName": "项目3",
				"proCertificate": null,
				"proData": null,
				"operationId": null,
				"operationTime": null,
				"spare1": null,
				"proCost": '123,456,789',
				"proInfo": null,
				"proAccessory": null,
				"stuTotal": null,
				"stuDept": null
			}, {
				"proId": 2,
				"proName": "项目2",
				"proCertificate": null,
				"proData": null,
				"operationId": null,
				"operationTime": null,
				"spare1": null,
				"proCost": '123,456,789',
				"proInfo": null,
				"proAccessory": null,
				"stuTotal": null,
				"stuDept": null
			}, {
				"proId": 1,
				"proName": "项目1",
				"proCertificate": null,
				"proData": null,
				"operationId": null,
				"operationTime": null,
				"spare1": null,
				"proCost": '103',
				"proInfo": null,
				"proAccessory": null,
				"stuTotal": null,
				"stuDept": null
			}],
		projId:[],		//项目id
		//服务器的数据进行整理后的数据;
		projList:[],
	}},
	methods:{
		//日期发生改变
		handleDtChange(v){
			console.log(v);
			this.vform.startTime = v[0];
			this.vform.endTime = v[1];
			this.isGetTime = true;
		},
		//设置实际的总利润(,在计算后,调用获取实际利润&并且设置)
		setLr(){
			//获取所有选择的项目的利润进行统计;
			let count=0.0;
			for(let i=0;i<this.vform.selectList.length;i++){
				if(this.vform.selectList[i].result!=''){
					count+=parseFloat(this.vform.selectList[i].result);
				}
			}
			//最后再减去[工资-房租-杂费],后获取实际的结果;
			if(this.vform.staffWage!='' && this.vform.rent!='' && this.vform.misceFee!=''){
				let lr = count - parseFloat(this.vform.staffWage)-parseFloat(this.vform.rent)-parseFloat(this.vform.misceFee);
				this.vform.lr = lr;
			}
		},
		//获取计算结果
		getResult(pid){
			//遍历pid获取其在selectList中的索引
			for(let i=0;i<this.vform.selectList.length;i++){
				if(pid==this.vform.selectList[i].label){

					//如果当前项目的成本+提成,不全则不进行计算;
					if(this.vform.selectList[i].def_cost=='' || this.vform.selectList[i].def_share==''){
						console.log('数值不完善,无法计算!!');	return;
					}

					//==>else
					//存储计算结果;
					let result = 0;
					
					//--get总金额
					let money = this.vform.selectList[i].money;
					//--get提成
					let share = this.vform.selectList[i].def_share;
					//--get成本
					let def_cost = this.vform.selectList[i].def_cost;
					//--get(计算)税金
					let taxes = parseFloat(def_cost) * 0.108; //10.8%;
					this.vform.selectList[i].taxes = taxes;
					//--get(计算)毛利率
					result = (parseFloat(money)-parseFloat(def_cost)-taxes-parseFloat(share));			//项目提成
					result = result.toFixed(2);
					this.vform.selectList[i].result = result;	
					break;
				}
			}
			this.setLr();
		},
		//bind:输入和选中发生变化的时候
		handleChangeSelect(val){ this.getResult(val);},
		//整理数据来自服务器的数据 到指定结构;
		resetData(){
			//使用projList存储整理后的数据;
			this.projList = [];
			
			for(let i=0;i< this.vList.length;i++){
				let cost = [];
				let opt_cost = [];
				
				if(this.vList[i].proCost!=null && this.vList[i].proCost.length!=0){
					cost = this.vList[i].proCost.split(',');
				}
				if(cost.length>0){
					for(let i=0;i<cost.length;i++){
						opt_cost.push({label:cost[i]});
					}
				}

				this.projList.push({
					label:this.vList[i].proId,				//项目Id;
					checked:false,							//当前项目是否选中;
					name:this.vList[i].proName,				//项目名字		
					cost:opt_cost,							//项目成本选择;	项目列表
					def_cost:cost.length==1?cost[0]:'',		//v-model成本;  已选择的成本
					def_share:'',							//v-model提成;	已选择的提成
					money:'',								//获取的金额;	项目的总金额
					taxes:'',								//税金			项目的税金
					result:'',								//计算结果;		项目的利润
				});
				
			}
			console.log(this.projList);

		},
		//项目全选(选择checkBox)
		handleCheckAllChange(val){
			if(!this.isGetTime){alert('请先选择时间!');val=false;}
			//全选
			if(val){
				for(let i=0;i<this.projList.length;i++){
					this.vform.projId.push(this.projList[i].label);
				}
				this.isIndeterminate = true;
				this.vform.selectList = this.projList;
				//全选,需要一条条去获取;
				for(let i=0;i<this.vform.selectList.length;i++){
					this.getMoney(this.vform.selectList[i].label);
				}
			//非全选
			}else{
				this.vform.projId = [];
				this.isIndeterminate = false;
				this.vform.selectList = [];
			}
		},
		//项目发生改变(选择checkBox)
		handleProChecke(value){
			
			console.log(value,typeof(value));
			
			//如果没有选择时间,则提示选择时间;
			if(!this.isGetTime){this.handleCheckAllChange(false); return; }
			
			let checkedCount = value.length;
			this.checkAll = (checkedCount === this.projList.length);							//全选状态
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.opt_project.length;	//半选状态;
			
			//清空已选择的值,赋值选择的值value-s;
			 this.vform.selectList = [];
			 for(let i=0;i<value.length;i++){
				 for(let j=0;j<this.vList.length;j++){
					 if(value[i]==this.projList[j].label){
						 this.vform.selectList.push(this.projList[j]);
					 }
				 }
			 }
			//然后更新pid(这个项目)的值[相关的参数:项目总金额],(也就是label);
			for(let i=0;i<this.vform.selectList.length;i++){
				this.getMoney(this.vform.selectList[i].label);
			}
		},
		//获取项目总金额
		getMoney(pid){

			let isGetMoney=false;		//是否获取成功 true|false
			//AJAX数据请求
			console.log('开始时间0,结束时间1: '+this.vform.time[0],this.vform.time[1]);
			
		   //遍历数组,获取对应Pid的项目进行 总金额更新;
			for(let i=0; i<this.vform.selectList.length;i++){
				if(pid==this.vform.selectList[i].label){
					this.vform.selectList[i].money= 12000;isGetMoney = true; break;
			}}
			return isGetMoney; //返回值是一个Boolean,表示是否获取时间成功;
		},
		
		//提交表单
		submitForm(formName){
			
			this.$refs[formName].validate((valid) => {
			  if (valid) {

				//获取项目
				let pro = [];
				
				console.log('Form: ',this.vform.selectList);
				
				 for(let i=0;i<this.vform.selectList.length;i++){
				 	pro.push({
				 		projId:this.vform.selectList[i].label,
				 		projCost:this.vform.selectList[i].def_cost,
				 		projShare:this.vform.selectList[i].def_share,
				 		projProfit:this.vform.selectList[i].result,
				 	})
				 }
				 //获取表单
				 let form = {
				 	startTime:this.vform.startTime,		//开始时间
				 	endTime:this.vform.endTime,			//结束时间
				 	pro,								//项目数据[{},{}]
					
					//房租-杂费-工作
				 	staffWage:this.vform.staffWage,		//
				 	rent:this.vform.rent,				//
				 	misceFee:this.vform.misceFee		//
				 }
				 
				 //打印表单					--总利润
				 console.log(form,'总利润: '+this.vform.lr);
				
			  }else{return false;}
			});
		},
		
		//设置表单(项目,和[工资-杂费-房租])
		setToForm(dt,pro,staffWage,rent,misceFee){
	
				//[工资-杂费-房租]
				this.vform.staffWage=staffWage;
				this.vform.rent=rent;
				this.vform.misceFee=misceFee;
				//绑定时间
				this.vform.time = dt;
				this.vform.startTime=dt[0];
				this.vform.endTime  =dt[1];
				this.isGetTime = true;
				
				//赋值Id;
				for(let i=0;i<pro.length;i++){
					this.vform.projId.push(pro[i].proId);
				}
				this.handleProChecke(this.vform.projId);
				console.log(this.vform.selectList);
				for(let i=0;i<this.vform.selectList.length;i++){
					console.log(i,pro[i]);
					this.vform.selectList[i].def_cost = pro[i].projCost;
					this.vform.selectList[i].def_share = pro[i].projShare;
				}
				
				console.log('this.vform.selectList: ',this.vform.selectList);

				//然后去调用 getResult(),获取每个项目的计算结果,统计总利润;
				for(let i=0;i<this.vform.selectList.length;i++){this.getResult(this.vform.selectList[i].label);}


		},

	},
	
	created(){
		
		console.log(this.vform.selectList);
		

		//AJAX获得数据给vlist
		
		//然后调用resetData()整理数据
		this.resetData();
		
		
		//如果是,下面仅在编辑项目的时候调用,
		//仅仅是测试数据
		let pro =[
			{
				proId:1,			//项目id;
				proName:"狐兔子",		//项目名字
				projCost:500,		//成本(已选择的);
				projShare:200		,//提成(已设置的);
			},
			{
				proId:2,			//项目id;
				proName:"狐狸呀",		//项目名字
				projCost:500,		//成本(已选择的);
				projShare:200		,//提成(已设置的);
			}
		]
		//时间.项目.[1.2.3];
		this.setToForm(
		//参数:
		//时间,项目,[杂费-房租-工作(具体看函数顺序)]
		["2019-10-29", "2019-11-21"],pro,100,100,100);
	},
	mounted(){document.body.style.visibility="visible";},
		
}
</script>
<style scoped>#vform{box-sizing:border-box}#vform.el-form-item__label{font-weight:bold}#vform-content{box-sizing:border-box;width:94%;border-right:solid 1px#000}.vtitle{font-size:18px;font-weight:bold}#vform-content-projects{max-width:530px}#ftrtd tr td{color:#888b92}#ftrtd{border-collapse:collapse}#ftrtd tr{height:42px;border:none;border-bottom:solid 1px#ebeef5}.last-td{text-align:right;padding-right:64px}</style>

<template>

<!-- 面授信息 -->
<el-dialog class="xdialog"  title="面授信息" width="48%" :visible.sync="$parent.isdialogTeachInfo">

	<!-- 时间安排 -->
	<el-row class="box">
		<el-row class="box-view" v-for="item in v_face_teach_info" :key="item.teatcher">
			<div class="box-title">第{{item.day}}天</div>

			<el-row class="rowl">
				<el-col :offset="2" :span="2">时间:</el-col>	
				<el-col :span="6">{{item.faceDetailTime}}</el-col>
				
				<el-col :offset="2" :span="3">老师名字 :</el-col>
				<el-col :offset="1" :span="5">{{item.faceDetailTeacher}}</el-col>
			</el-row>
			
			<el-row class="rowl">
				<el-col :offset="2" :span="2">课题 :</el-col>
				<el-col :span="6">{{item.faceDetailSubject}}</el-col>
				<el-col :offset="2" :span="3">参加人数:</el-col>
				<el-col :offset="1" :span="5">{{item.faceDetailNum}}</el-col>
			</el-row>
			
			<el-row class="rol">
				<el-col :offset="1" :span="12"> &nbsp;&nbsp;开课地点 : {{item.classPlace}}</el-col>

			</el-row>

		</el-row>
	</el-row>
	
	<!-- 考试安排 -->
	<el-row class="box">
		<el-row class="box-view">
			<div class="box-title">初步考试安排</div>
			<el-row class="rowl">
				<el-col :offset="2" :span="10">时间: {{v_test_info.examTime}}</el-col>
				<el-col :span="10">开课地点: {{v_test_info.examPlace}}</el-col>
			</el-row>
		</el-row>
	</el-row>
	
	<!-- 修改原因 -->
	
	<el-row class="box" style="text-align: right;padding-bottom: 12px;">
		<el-button type="primary" size="small" @click="handleFaceTeachEd">已参加面授</el-button>
		<el-button type="primary" size="small" @click="updateFaceTeach">申请修改</el-button>		
	</el-row>
	
	<el-row class="box" style="padding-top: 0;">
		<el-input type="textarea" v-model="vCause" :rows="4" placeholder="请输入修改原因...."></el-input>
	</el-row>
	
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		vCause:'',		//提交原因;
		v_face_teach_info:[],
		v_test_info:{},
	}},
	props:{
		_v_face_teach_info:Array,
		_v_test_info:Object
	},
	methods:{
		//已参加面授
		handleFaceTeachEd(){

		},
		//申请修改
		updateFaceTeach(){
			console.log(this.vCause);
		}
		
	},
	watch:{
		_v_face_teach_info:{
			deep:true,
			immediate:true,
			handler(_n,_o){
				this.v_face_teach_info=_n;
				// debugger;
			}
		},

		_v_test_info:{
			deep:true,
			immediate: true,
			handler(_n,_o){
				// console.log('v_test_info:',_n);
				this.v_test_info = _n;
			}
		}
		
	},
	created(){
		
	}
}
</script>

<style scoped>
.box{
	box-sizing: border-box;
	padding: 14px;
	position: relative;
}
.box-title{
	position: absolute;
	top: -11%;
	left: 4%;
	background-color: #ffffff;
	padding: 1px 8px;
	font-weight: bold;
}
.box-view{
	/* background-color: rosybrown; */
	border: solid 1px #e0e0e0;
	padding: 14px;
	margin-bottom: 39px;
}
.rowl{
	margin: 10px 0;
}
</style>

<template>

<!-- 安排面授 -->
<el-dialog class="xdialog"  title="安排面授" width="55%" :visible.sync="$parent.isdialogFaceSeto">

	<el-form id="vform" :inline="true">

	<!-- 时间安排 -->
	<el-row class="box">
		<el-row class="box-view" v-for="(v,k) in vFaceTeachInfo" :key="k" style="padding-bottom: 0;">
			<div class="box-title">第{{k+1}}天</div>
			<el-form-item label="时间：">
				<el-date-picker class="mwidth" v-model="vFaceTeachInfo[k].faceDetailTime" type="datetime" placeholder="选择日期时间" format="yyyy 年 MM 月 dd 日 HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
			</el-form-item>
			
			<el-form-item label="老师名字：">
				<el-input v-model="vFaceTeachInfo[k].faceDetailTeacher"></el-input>
			</el-form-item>
			<br>
			<el-form-item label="课题：">
				<el-input class="mwidth" v-model="vFaceTeachInfo[k].faceDetailSubject"></el-input>
			</el-form-item>
			
			<el-form-item label="参加人数：">
				<el-input min="1" type="number" v-model.number="vFaceTeachInfo[k].faceDetailNum"></el-input>
			</el-form-item>
			
			<el-row>
				<el-form-item label="开课地点：" >
					<el-input v-model="vFaceTeachInfo[k].classPlace" style="width: 400px;overflow-x: hidden;"></el-input>
				</el-form-item>
			</el-row>
		</el-row>
	</el-row>


	<el-row style="text-align: right; padding-right: 1rem; margin-bottom: 16px;">
		<el-button type="text" @click="handelPushDays">+ 新增安排</el-button>
	</el-row>
	
	<!-- 考试安排 -->

	<el-row class="box">
		<el-row class="box-view" style="padding-bottom: 6px;padding-top:38px;">
			<div class="box-title">初步考试安排</div>
			
			<el-form-item label="时间: ">
				<el-date-picker  class="mwidth" v-model="vTestInfo.examTime" type="datetime" placeholder="选择日期时间" format="yyyy 年 MM 月 dd 日 HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
			</el-form-item>
			
			<el-form-item label="开课地点: ">
				<el-input v-model="vTestInfo.examPlace"  style="min-width: 244px;overflow-x: hidden;"></el-input>
			</el-form-item>
		</el-row>
		
		
		<el-row style="margin-top: 22px; text-align: right;">
			<el-form-item>
				<el-button>取消</el-button>
				<el-button type="primary" @click="submitForm">提交</el-button>
			</el-form-item>
		</el-row>
		
	</el-row>
	
	

	</el-form>
</el-dialog>
</template>

<script>
module.exports = {
	data(){return{
		//数组列表
		vFaceTeachInfo:[
			{
				day:1,
				faceDetailTime:'',
				faceDetailTeacher:'王杰瑞',
				faceDetailSubject:'初级管理会计师',
				faceDetailNum:'100',
				classPlace:'河北师范大学公教楼A109',
			}
		],
		//数组列表
		vTestInfo:
			{
				examTime:'',
				examPlace:'',
			},
		day:1,
	}},
	methods:{
		handelPushDays(){
			this.day+=1;
			this.vFaceTeachInfo.push({
				day:this.day,
				faceDetailTime:'',
				faceDetailTeacher:'',
				faceDetailSubject:'',
				faceDetailNum:'1',
				classPlace:'',
			})
		},
		submitForm(){
			console.log(this.vFaceTeachInfo,this.vTestInfo);
		}
	},
	created(){
	}
};
</script>

<style scoped>
.box{
	box-sizing: border-box;
	padding: 14px;
	position: relative;
}
.box-title{
	position: absolute;
	top: -5%;
	left: 4%;
	background-color: #ffffff;
	padding: 1px 8px;
	font-weight: bold;
}
.box-view{
	/* background-color: rosybrown; */
	border: solid 1px #e0e0e0;
	padding: 28px;
	margin-bottom: 42px;
}
.rowl{
	margin: 10px 0;
}
.mwidth{
	min-width: 247px;
}
</style>

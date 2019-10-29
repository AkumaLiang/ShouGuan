Vue.component('tmp'{
	data(){return{
		isViewStu:true,
		// 普通表单
		form:{
			//选项数据
			department:'',	//部门
			project:'',		//项目
			gender:'',		//性别
			testLevel:'',	//考试等级
			payAccount:'',	//汇款账户
			pay:'',			//支付方式
			//输入数据
			name:'',		//用户名
			companyName:'',	//公司名
			taxCode:'',		//税号
			identityCode:'',//身份证号
			address:'',		//地址
			tel:'',			//电话
			emial:'',		//邮箱
			job:'',			//职称
			edu:'',			//学历
			jobCompany:'',	//工作单位
			duty:'',		//职务
			jobYears:'',	//工作年限
			postalAddress:'',//通讯地址
			payDate:'',		//汇款日期,
			payMoney:'',	//汇款金额
			payUser:'',		//付款人
			orderCode:'',	//订单号
			other:'',		//其他
			//文件对象;
			imgEdu:'',		//学历图片
			imgJob:'',		//工作证明
			imgPictrue:'',	//照片
			imgcertificat:'',//证书照片
			imgIdCard:'',	//身份证照片
			imgProject:'',	//项目申报表
			//文本内容
			text:'',		//其他信息;
			ImgOther:[]		//其他里面的更多图片;
			
		},
		// ImgUrlCode
		imgUrl:{
			// 证件图片显示,已失效
			// edu:'',				//学历
			// job:'',				//工作证明
			// pictue:'',			//照片
			// certificat:'',		//证书照片
			// idCard:'',			//身份证
			// project:'',			//项目申报表
			
			// 图片显示
			dialogImgUrl:'',
			dialogVisible:false
		},
		// --->opt项
		
		//--报考等级
		opt_testLevel:[
			{label:'一级',value:'1'},
			{label:'二级',value:'2'},
			{label:'三级',value:'3'},
			{label:'四级',value:'4'},
		],
		//--汇款账户
		opt_account:[
			{label:'工商银行',value:'1'},
			{label:'建设银行',value:'2'},
			{label:'信用卡',value:'3'},
		],
		//--支付方式:
		opt_pay:[
			{label:'微信',value:'1'},
			{label:'支付宝',value:'2'},
			{label:'财付通',value:'3'},
			{label:'现金',value:'4'}
		],
		//--重复:部门;
		opt_department:[
			{label:'技术部',value:'1'},
			{label:'测试部',value:'2'},
			{label:'运营部',value:'3'}
		],
		//--重复:项目;
		opt_project:[
			{label:'卫星',value:'1'},
			{label:'火箭',value:'2'},
			{label:'铁路运输',value:'3'}
		],
		//--重复:性别;
		opt_gender:[
			{label:'男',value:'1'},
			{label:'女',value:'0'},
		],
		//表单校验规则:
		form_rules:{
			department:[
				{ required: true, message: '请选择所属部门', trigger: 'change' },
			],
			name:[
				{ required: true, message: '请输入姓名', trigger: 'blur' },
				{ min: 2, max: 6, message: '名字长度在2到6个字符', trigger: 'blur' },
			],
			gender:[
				{ required: true, message: '请选择性别', trigger: 'change' },
			],
			project:[
				{ required: true, message: '请选择项目', trigger: 'change' },
			],
			companyName:[
				{ required: true, message: '请输入公司名', trigger: 'blur' },
				{ min: 2, max: 36, message: '公司名长度在2到36个字符', trigger: 'blur' },
			],
			taxCode:[
				{ required: true, message: '请输入税号', trigger: 'blur' },
			],
			identityCode:[
				{ required: true, message: '请输入身份证号', trigger: 'blur' },
			],
			address:[
				{ required: true, message: '请输入地址', trigger: 'blur' },
			],
			tel:[
				{ required: true, message: '请输入电话号码', trigger: 'blur' },
			],
			emial:[
				{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
				{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
			],
			job:[
				{ required: true, message: '请输入职称', trigger: 'blur' },
			],
			edu:[
				{ required: true, message: '请输入学历', trigger: 'blur' },
			],
			jobCompany:[
				{ required: true, message: '请输入工作单位', trigger: 'blur' },
			],
			testLevel:[
				{ required: true, message: '请选择报考级别', trigger: 'change' },
			],
			duty:[
				{ required: true, message: '请输入职务', trigger: 'blur' },
			],
			jobYears:[
				{ required: true, message: '请输入工作年限', trigger: 'blur' },
			],
			postalAddress:[
				{ required: true, message: '请输入通讯地址', trigger: 'blur' },
			],
			payDate:[
				{ type: 'date', required: true, message: '请选择汇款日期', trigger: 'change' }
			],
			payMoney:[
				{ required: true, message: '请输入汇款金额', trigger: 'blur' },
			],
			payUser:[
				{ required: true, message: '请输入付款人', trigger: 'blur' },
				{ min: 2, max: 6, message: '名字长度在2到6个字符', trigger: 'blur' }
			],
			account:[
				{ required: true, message: '请选择汇款账户', trigger: 'change' },
			],
			pay:[
				{ required: true, message: '请选择交款方式', trigger: 'change' },
			],
			orderCode:[
				{ required: true, message: '请输入订单号', trigger: 'blur' },
			],
			//图片校验
			xEdu:[
				{ required: true, message: '请上传图片', trigger: 'change'}
			],
			xJob:[
				{ required: true, message: '请上传图片', trigger: 'change'}
			],
			xPictue:[
				{ required: true, message: '请上传图片', trigger: 'change'}
			],
			xCertificat:[
				{ required: true, message: '请上传图片', trigger: 'change'}
			],
			xIdCard:[
				{ required: true, message: '请上传图片', trigger: 'change'}
			],
			xProject:[
				{ required: true, message: '请上传图片', trigger: 'change'}
			],
			// text:[
			// 	{ max: 6, message: '长度在最多300个字符', trigger: 'blur' }
			// ]
			
		}
	}},
	methods:{
		//preview 显示图片
		handlePictureCardPreview(f,flist){
			this.imgUrl.dialogImgUrl = f.url;
			this.imgUrl.dialogVisible = true;
		}
		//remove 移除图片
		,handleRemove(f){
			// this.$i.log(f);
		}
		//隐藏新增
		,hideNewStu(){
			// this.$parent.isNewStu = false;
		}
		,setToImg(_target,file){
			console.log(_target,file);
		}
		,setBeforShowPic(idx){
			setTimeout(function(){
				// document.getElementsByClassName('el-upload')[idx].style.visibility="visible";
				document.getElementsByClassName('el-upload')[idx].style.display='inline-block';
			},600);
		}
		,setBeforHidePic(idx){
			// document.getElementsByClassName('el-upload')[0].style.visibility="hidden";
			document.getElementsByClassName('el-upload')[idx].style.display="none";
		}
		//学历
		,handleFileChange_Edu(file, fileList){
			this.setBeforHidePic(0);
			this.form.imgEdu = file;
			// console.log('get->imgEdut',this.form.imgEdu,typeof(this.form.imgEdu.raw),typeof(file));
		}
		,delFile_Edu(){
			// document.getElementsByClassName('el-upload')[0].style.visibility="visible";
			this.setBeforShowPic(0);
			this.form.imgEdu = null;
			console.log('delete->imgEdut',this.form.imgEdu)
		}
		//工作证明
		,handleFileChange_Job(file, fileList){
			this.setBeforHidePic(1);
			this.form.imgJob = file;
		}
		,delFile_Job(){
			// document.getElementsByClassName('el-upload')[1].style.visibility="visible";
			this.setBeforShowPic(1);
			this.form.imgJob = null;
		}
		//照片
		,handleFileChange_Pictrue(file, fileList){
			this.setBeforHidePic(2);
			this.form.imgPictrue = file;
		}
		,delFile_Pictrue(){
			// document.getElementsByClassName('el-upload')[2].style.visibility="visible";
			this.setBeforShowPic(2);
			this.form.imgPictrue = null;
		}
		//证书
		,handleFileChange_Certificat(file, fileList){
			this.setBeforHidePic(3);
			this.form.imgcertificat = file;
		}
		,delFile_Certificat(){
			// document.getElementsByClassName('el-upload')[3].style.visibility="visible";
			this.setBeforShowPic(3);
			this.form.imgcertificat = null;
		}
		//身份证
		,handleFileChange_IdCard(file, fileList){
			this.setBeforHidePic(4);
			this.form.imgIdCard = file;
		}
		,delFile_IdCard(){
			// document.getElementsByClassName('el-upload')[4].style.visibility="visible";
			this.setBeforShowPic(4);
			this.form.imgIdCard = null;
		}
		
		//项目
		,handleFileChange_Project(file, fileList){
			this.setBeforHidePic(5);
			this.form.imgProject = file;
		}
		,delFile_Project(){
			// document.getElementsByClassName('el-upload')[5].style.visibility="visible";
			this.setBeforShowPic(5);
			this.form.imgProject = null;
		},
		delF(file,fileList){
			this.form.ImgOther = fileList;
			if(fileList.length<=4){
				this.setBeforShowPic(6);
			}
		},
		addF(file,fileList){
			this.form.ImgOther = fileList;
			console.log(fileList,fileList.length);
			if(fileList.length>=5){
				this.setBeforHidePic(6);
			}
		},
		//保存
		hanleSave(vform){
			console.log(vform);
			console.log(this.$refs.vform);
			// debugger;
			this.$refs[vform].validate((valid)=>{
				if(valid){
					window.alert('在这里请求数据!');
				}else{
					//规则校验失败
					return false;
				}
			});
		},
		//提交审核
		hanleSaveTo(vform){
			this.$refs[vform].validate((valid)=>{
				if(valid){
					window.alert('在这里请求数据!');
				}else{
					//规则校验失败
					return false;
				}
			});
		},
		//关闭之前的回调
		dialogBeforClose(){
			history.go(-1);
			// location.href=document.referrer;
		}
	},
	mounted(){document.body.style.visibility="visible";}// 处理数据加载延迟;
	template: `
	<el-dialog title="新增学员" :visible.sync="isViewStu" :before-close="dialogBeforClose">
		<el-form id="#new-stu-form" :rules="form_rules" ref="vform"  :model="form" label-position="right" label-width="86px">
			<div class="new-stu" id="new-stu-l1">
				<div class="new-stu-title">基本信息</div>
				<el-row>
						<el-col :span="11">
							<el-form-item label="所属部门 :" prop="department">
								<el-select placeholder="请选择部门" v-model="form.department">
									<el-option v-for="item in opt_department" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="姓名 :" prop="name">
								<el-input v-model="form.name"></el-input>
							</el-form-item>
							
							<el-form-item label="性别 :" prop="gender">
								<el-radio-group v-model="form.gender">
									<el-radio v-for="item in opt_gender" :key="item.value" :label="item.label" :value="item.value"></el-radio>
								</el-radio-group>
							</el-form-item>
							
							<el-form-item label="项目 :" prop="project">
								<el-select placeholder="请选择项目" v-model="form.project">
									<el-option v-for="item in opt_project" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							
							<el-form-item label="公司名称 :" prop="companyName">
								<el-input v-model="form.companyName"></el-input>
							</el-form-item>
							
							<el-form-item label="税号 :" prop="taxCode">
								<!-- 税号是否包含字母  -->
								<el-input v-model="form.taxCode"></el-input>
							</el-form-item>
							
							<el-form-item label="身份证号 :" prop="identityCode">
								<el-input v-model.number="form.identityCode"></el-input>
							</el-form-item>
							
							<el-form-item label="地址 :" prop="address">
								<el-input v-model="form.address"></el-input>
							</el-form-item>
							
							<el-form-item label="电话 :" prop="tel">
								<el-input v-model.number="form.tel"></el-input>
							</el-form-item>
							
							<el-form-item label="邮箱 :" prop="emial">
								<el-input v-model="form.emial"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11" :offset="2">
							<el-form-item label="职称 :" prop="job">
								<el-input v-model="form.job"></el-input>
							</el-form-item>
							<el-form-item label="学历 :" prop="edu">
								<el-input v-model="form.edu"></el-input>
							</el-form-item>
							<el-form-item label="工作单位 :" prop="jobCompany">
								<el-input v-model="form.jobCompany"></el-input>
							</el-form-item>
							<el-form-item label="报考级别 :" prop="testLevel">
								<el-select placeholder="请选择级别" v-model="form.testLevel">
									<el-option v-for="item in opt_testLevel" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="职务 :" prop="duty">
								<el-input v-model="form.duty"></el-input>
							</el-form-item>
							<el-form-item label="工作年限 :" prop="jobYears">
								<el-input v-model.number="form.jobYears"></el-input>
							</el-form-item>
							<el-form-item label="通讯地址 :" prop="postalAddress">
								<el-input v-model="form.postalAddress"></el-input>
							</el-form-item>
							<el-form-item label="汇款日期:" prop="payDate">
								<el-date-picker type="date" v-model="form.payDate" placeholder="请选择日期"></el-date-picker>
							</el-form-item>
							<el-form-item label="汇款金额 :" prop="payMoney">
								<el-input-number v-model.number="form.payMoney" controls-position="right" :min="1"></el-input-number> 元
							</el-form-item>
							<el-form-item label="付款人 :" prop="payUser">
								<el-input v-model="form.payUser"></el-input>
							</el-form-item>
							<el-form-item label="汇款账户 :" prop="account">
								<el-select placeholder="请选择账户" v-model="form.account">
									<el-option v-for="item in opt_account" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="交款方式 :" prop="pay">
								<el-select placeholder="请选择交款方式" v-model="form.pay">
									<el-option v-for="item in opt_pay" :key="item.value" :label="item.label" :value="item.value"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="订单号 :" prop="orderCode">
								<!-- 订单号是否为纯数字 -->
								<el-input v-model.number="form.orderCode"></el-input>
							</el-form-item>
							<el-form-item label="其他 :">
								<el-input v-model="form.other"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
			</div>
			
			<div class="new-stu" id="new-stu-l2">
				<div class="new-stu-title">附件信息</div>
				<div class="row">
					<el-col :span="12">
						<!-- <input type="file" name="" id="ty" value="" /> -->
						<el-form-item label="学历 :" id="x-edu" prop="xEdu">
							<el-upload action="" :limit="1" :auto-upload="false" :on-remove="delFile_Edu" :on-change="handleFileChange_Edu" list-type="picture-card" ><i class="el-icon-plus"></i></el-upload>
						</el-form-item>
						
						<el-form-item label="工作证明 :" id="x-job" prop="xJob">
							<el-upload action="" :limit="1" :auto-upload="false" :on-remove="delFile_Job" :on-change="handleFileChange_Job" list-type="picture-card" ><i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
						
						<el-form-item label="照片 :" id="x-pictue" prop="xPictue">
							<el-upload action="" :limit="1" :auto-upload="false" :on-remove="delFile_Pictrue" :on-change="handleFileChange_Pictrue" list-type="picture-card" ><i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
		
					</el-col>
					
					<el-col :span="12">
						<el-form-item label="证书 :" id="x-certificat" prop="xCertificat">
							<el-upload action="" :limit="1" :auto-upload="false" :on-remove="delFile_Certificat" :on-change="handleFileChange_Certificat" list-type="picture-card" ><i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
						
						<el-form-item label="身份证 :" id="x-idCard" prop="xIdCard">
							<el-upload action="" :limit="1" :auto-upload="false" :on-remove="delFile_IdCard" :on-change="handleFileChange_IdCard" list-type="picture-card" ><i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
						
						<el-form-item label="项目申报表 :" :auto-upload="false" id="x-project" prop="xProject">
							<el-upload action="" :limit="1" :auto-upload="false" :on-remove="delFile_Project" :on-change="handleFileChange_Project" list-type="picture-card" ><i class="el-icon-plus"></i>
							</el-upload>
						</el-form-item>
					</el-col>
					
				</div>
			</div>
			<!-- 解决E-UI奇怪的浮动Bug -->	
			<div style="clear:both"></div>
		
			<div class="new-stu" id="new-stu-l3">
				<div class="new-stu-title">其他信息</div>	
				<div id="new-stu-l3-text">
					<!-- prop="text" -->
					<el-form-item>
						<el-input type="textarea" v-model="form.text" rows="6" placeholder="请输入内容"></el-input>
					</el-form-item>
				</div>
		
				<div id="new-stu-l3-imgs">
					<el-upload
						action=""
						list-type="picture-card"
						:on-preview="handlePictureCardPreview" :limit="5" 
						:auto-upload="false" :on-remove="delF" :on-change="addF">
						<i class="el-icon-plus"></i>
						
						</el-upload>
						<el-dialog :visible.sync="imgUrl.dialogVisible" size="tiny">
							<img width="100%" :src="imgUrl.dialogImgUrl" alt="">
						</el-dialog>
					<div id="new-stu-l3-img-hint">说明：图片最多上传5张。</div>
				</div>
			</div>
	
			<div class="new-stu" id="new-stu-l4">
				<el-button type="primary" plain @click="hanleSave('vform')">保存</el-button>
				<el-button type="primary" plain @click="hanleSaveTo('vform')">提交审核</el-button>
				<el-button @click="isViewStu=false" type="primary" plain>取消</el-button>
			</div>
		</el-form>
	</el-dialog>
`
});
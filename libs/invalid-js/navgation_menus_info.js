/*
 0=>mg11:一级管理员:总教务
 1=>mg12:一级管理员:财务
 2=>mg2: 二级管理员
 3=>mg3: 代理人登录
*/
let mpath = './img/icon/';	//普通图标
let ipath = './img/3f/';		//白色图标

var NavData = {
	// 一级管理员:总教务
	mg11:[
		//学员审核
		{name:"学员审核",img:mpath+"学员审核1@2x.png",hover:"学员审核2@2x.png",imgf:ipath+'学员审核3@2x.png',item:[
			{name:"待审核",img:ipath+"待审核@2x.png",url:"viewStudent.html",arg:'{"q":1}'},
			{name:"未通过",img:ipath+"未通过@2x.png",url:"viewStudent.html",arg:'{"q":2}'},
			{name:"已通过",img:ipath+"已通过@2x.png",url:"viewStudent.html",arg:'{"q":3}'}
		]},
		//学员管理
		{name:"学员管理",img:mpath+"学员管理1@2x.png",hover:"学员管理2@2x.png",imgf:ipath+'学员管理0@2x.png',item:[
			{name:"报名成功",img:ipath+"报名成功@2x.png",url:"viewStudent.html",arg:'{"q":11}'},
			{name:"网课已开通",img:ipath+"网课@2x.png",url:"viewStudent.html",arg:'{"q":22}'},
			{name:"面授已确认",img:ipath+"面授安排@2x.png",url:"viewStudent.html",arg:'{"q":33}'},
			{name:"考试待确认",img:ipath+"考试待确认@2x.png",url:"viewStudent.html",arg:'{"q":44}'},
			{name:"考试结果",img:ipath+"考试结果@2x.png",url:"viewStudent.html",arg:'{"q":55}'}
		]},
		//项目管理
		{name:"项目管理",img:mpath+"项目管理1@2x.png",hover:"项目管理2@2x.png",imgf:ipath+'项目管理3@2x.png',item:[
			{name:"项目列表",img:ipath+"项目列表@2x.png",url:"/vpro/1",arg:'{}'},
			{name:"项目公告",img:ipath+"项目公告@2x.png",url:"/vpro/2",arg:'{}'}
		]},
		//组织架构
		{name:"组织架构",img:mpath+"组织架构1@2x.png",hover:"组织架构2@2x.png",imgf:ipath+'组织架构3@2x.png',item:[
			{name:"部门管理",img:ipath+"部门管理3@2x.png",url:"/vorg1",arg:'{}'},
			{name:"成员管理",img:ipath+"成员管理@2x.png",url:"/vorg2",arg:'{}'},
			{name:"角色管理",img:ipath+"角色管理@2x.png",url:"/vorg3",arg:'{}'}
		]}
	],
	// 一级管理员:财务
	mg12:[
		//财务管理
		{name:"财务管理",img:mpath+"财务管理1@2x.png",hover:"财务管理2@2x.png",imgf:ipath+'财务管理3@2x.png',item:[
			{name:"发票管理",img:ipath+"发票管理@2x.png",url:"",arg:'{}'},
			{name:"教材管理",img:ipath+"教材管理@2x.png",url:"",arg:'{}'},
			{name:"部门成本管理",img:ipath+"部门成本管理@2x.png",url:"",arg:'{}'}
		]},
		//学员审核
		{name:"学员审核",img:mpath+"学员审核1@2x.png",hover:"学员审核2@2x.png",imgf:ipath+'学员审核3@2x.png',item:[
			{name:"收入导出",img:ipath+"收入导出3@2x.png",url:"",arg:'{}'},
			{name:"账户管理",img:ipath+"账户管理3@2x.png",url:"",arg:'{}'}
		]},
		//收入导出
		{name:"收入导出",img:mpath+"收入导出1@2x.png",hover:"收入导出2@2x.png",imgf:ipath+'收入导出3@2x.png',item:[
			{name:"未导出",img:ipath+"未导出@2x.png",url:"",arg:'{}'},
			{name:"导出记录",img:ipath+"导出记录@2x.png",url:"",arg:'{}'}
		]},
		//账户管理
		{name:"账户管理",img:mpath+"账户管理1@2x.png",hover:"账户管理2@2x.png",imgf:ipath+'账户管理3@2x.png',item:[
			{name:"进款账户",img:ipath+"进账账户@2x.png",url:"",arg:'{}'},
			{name:"交款方式",img:ipath+"交款方式@2x.png",url:"",arg:'{}'}
		]},
	],
	// 二级管理员,这里有一个默认的首页
	mg2:[
		//学员管理
		{name:"学员管理",img:mpath+"学员管理1@2x.png",hover:"学员管理2@2x.png",imgf:ipath+'学员管理0@2x.png',item:[
			{name:"待报名",img:ipath+"待报名@2x.png",url:"",arg:'{}'},
			{name:"待审核",img:ipath+"待审核@2x.png",url:"",arg:'{}'},
			{name:"报名成功",img:ipath+"报名成功@2x.png",url:"",arg:'{}'},
			{name:"网课已开通",img:ipath+"网课@2x.png",url:"",arg:'{}'},
			{name:"面授安排待确认",img:ipath+"面授安排@2x.png",url:"",arg:'{}'},
			{name:"考试待确认",img:ipath+"考试待确认@2x.png",url:"",arg:'{}'},
			{name:"考试结果",img:ipath+"考试结果@2x.png",url:"",arg:'{}'}
		]},
		//财务管理
		{name:"财务管理",img:mpath+"财务管理1@2x.png",hover:"财务管理2@2x.png",imgf:ipath+'财务管理3@2x.png',item:[
			{name:"发票管理",img:ipath+"发票管理@2x.png",url:"",arg:'{}'},
			{name:"教材管理",img:ipath+"教材管理@2x.png",url:"",arg:'{}'},
			{name:"部门成本管理",img:ipath+"部门成本管理@2x.png",url:"",arg:'{}'}
		]},
		//部门管理
		{name:"部门管理",img:mpath+"部门管理1@2x.png",hover:"部门管理2@2x.png",imgf:ipath+'部门管理3@2x.png',item:[]},
		//消息管理
		{name:"消息管理",img:mpath+"",hover:"消息1@2x.png",imgf:ipath+'消息3@2x.png',item:[
			{name:"学员审核通知",img:ipath+"学员审核通知@2x.png",url:"",arg:'{}'},
			{name:"项目最新通知",img:ipath+"项目 最新通知@2x.png",url:"",arg:'{}'}
		]},
	],
	
	// 代理人登录,			----如果存在,img再添加;
	mg3:[
		//学员管理
		{name:"学员管理",img:mpath+"学员管理1@2x.png",hover:"学员管理2@2x.png",imgf:ipath+'学员管理0@2x.png',item:[]},
		//代理结算导出
		{name:"代理结算导出",img:mpath+"收入导出1@2x.png",hover:"收入导出2@2x.png",imgf:ipath+'导出记录@2x.png',item:[]}
		//模板拷贝
		/*
		//模板
		{name:"",imgf:ipath+'',item:[
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
			{name:"",img:ipath+"",url:"",arg:'{}'},
		]},
		*/
	]

}
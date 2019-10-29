## 新增成本记录:add-cost-records.vue


保存项目成本信息:jeefast/sgEduProjectInfo/arrayList


this.vList;		//来自服务器的原始数据;
this.projList;	//调用this.resetData()方法后,将this.vList的原始数据,整理成指定格式后,存放到this.projList中;
this.getMoney();//获取项目的`总金额`,这个需要根据项目id来请求数据;


this.submitForm();		//提交表单数据;

this.setToForm();		//设置表单数据; 
参数:
	_pro项目:[
		{
			proId,			//项目id;
			proName,		//项目名字
			projCost,		//成本(已选择的);
			projShare		//提成(已设置的);
		}
	],
	//工资-房租-杂费
	_staffWage,_rent,_misceFee
	
	
[vue/ts：数组push报错](https://segmentfault.com/q/1010000017562981);
[vue/ts：数组push报错](http://www.imooc.com/wenda/detail/494728);
[对vue中data的数组push无效](https://segmentfault.com/q/1010000017380916);
[vue 无法向data中的数组中push](https://ask.csdn.net/questions/762621);
[【已解决】vue-quill-editor 获取无法获取光标位置](https://blog.csdn.net/chanlingmai5374/article/details/88583010)

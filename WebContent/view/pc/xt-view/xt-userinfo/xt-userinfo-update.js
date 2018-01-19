//返回r
function goback(){
	tlocation("../xtUserinfoController/loadXtUserinfo");
}
$('#defaultForm').bootstrapValidator({
	message:'此值不是有效的'
});
//保存
function updateXtUserinfo(){
	submitBForm('defaultForm','../xtUserinfoController/updateXtUserinfo','../xtUserinfoController/loadXtUserinfo');
}

//初始化日期选择器
$(document).ready(function(){
	datetimeInit();
	InitBDataComboSetV('gender','xt_userinfo_sex','xt_userinfo_sex_');//读取性别数据字典
	InitBDataComboSetV('xt_userinfo_state','xt_userinfo_state','xt_userinfo_state_');//读取状态数据字典
});

/////////////////////部门选择器开始///////////////////
function departSelect(){
	$('#departSelectModal').modal();
	var setting = {
	   view:{
	       selectedMulti:false
	   },
	   check:{
	       enable:false
	   },
	   async:{
	       enable:true,//设置 zTree是否开启异步加载模式  加载全部信息
	       url:"../xtDepartinfoController/getXtDepartinfoBZTree",//Ajax获取数据的 URL地址  
	       otherParam:{ 
	    	 　　'expanded':function(){return 'false'} 
	       } //异步参数
	   },
	   data:{
		   //必须使用data  
	       simpleData:{
	           enable:true,
	           idKey:"id",//id编号命名 默认  
	           pIdKey:"pId",//父id编号命名 默认   
	           rootPId:0 //用于修正根节点父节点数据，即 pIdKey 指定的属性值  
	       }
	   },
	   edit:{
	       enable:false
	   },  
	   callback:{  
	       onClick:onClick//单击事件
	   }  
	};
	$.fn.zTree.init($("#tree"), setting);
	var node=$.fn.zTree.getNodeByParam("pId", 0);  
	$.fn.zTree.selectNode(node);  
	$.fn.zTree.expandNode(node, true, false, false);  
}

//单击事件
function onClick(event, treeId, treeNode, msg){  
}  
function doDepartSelect(){
	var zTree = $.fn.zTree.getZTreeObj("tree"),
	nodes = zTree.getSelectedNodes();
	if (nodes.length != 1) {
		toastrBoot(4,"请选择一条隶属部门信息");
		return;
	}
	msgTishCallFnBoot("确定要选择【<font color=red>"+nodes[0].name+"</font>】？",function(){
		$('#xt_departinfo_name').val(nodes[0].name);
		$('#xt_departinfo_id').val(nodes[0].id);
		$('#xt_post_name').val("");
		$('#xt_post_id').val("");
		$('#departSelectModal').modal('hide');
	})
}
/////////////////////部门选择器结束///////////////////

/////////////////////岗位选择器开始///////////////////
function postSelect(){
	var xt_departinfo_id = $('#xt_departinfo_id').val();
	if(xt_departinfo_id ==  null || xt_departinfo_id == ""){
		toastrBoot(4,"请选择隶属部门！");
		return;
	}
	$('#postSelectModal').modal();
	var setting = {
	   view:{
	       selectedMulti:false
	   },
	   check:{
	       enable:false
	   },
	   async:{
	       enable:true,//设置 zTree是否开启异步加载模式  加载全部信息
	       url:"../xtPostController/getXtPostBZTree",//Ajax获取数据的 URL地址  
	       otherParam:{ 
	    	 　　'expanded':function(){return 'true'},
	    	   	 'xt_departinfo_id':function(){ return $('#xt_departinfo_id').val()}
	       } //异步参数
	   },
	   data:{
		   //必须使用data  
	       simpleData:{
	           enable:true,
	           idKey:"id",//id编号命名 默认  
	           pIdKey:"pId",//父id编号命名 默认   
	           rootPId:0 //用于修正根节点父节点数据，即 pIdKey 指定的属性值  
	       }
	   },
	   edit:{
	       enable:false
	   },  
	   callback:{  
	       onClick:onClick//单击事件
	   }  
	};
	
	$.fn.zTree.init($("#posttree"), setting);
	var node=$.fn.zTree.getNodeByParam("pId", 0);  
	$.fn.zTree.selectNode(node);  
	$.fn.zTree.expandNode(node, true, false, false);  
}

function doPostSelect(){
	var zTree = $.fn.zTree.getZTreeObj("posttree"),
	nodes = zTree.getSelectedNodes();
	if (nodes.length != 1) {
		toastrBoot(4,"请选择隶属岗位");
		return;
	}
	msgTishCallFnBoot("确定要选择【<font color=red>"+nodes[0].name+"</font>】？",function(){
		$('#xt_post_name').val(nodes[0].name);
		$('#xt_post_id').val(nodes[0].id);
		$('#postSelectModal').modal('hide');
	})
}
/////////////////////岗位选择器结束///////////////////

//验证用户名是否被注册
function validateUser(thiz){
	var value = thiz.value;
	var xt_userinfo_name_ = $('#xt_userinfo_name_').val();
	if(null != value && '' != value){
		if(xt_userinfo_name_ != value){
			$.ajax({
				   type:"GET",
				   url:"../xtUserinfoController/validateUser",
				   data:"xt_userinfo_name="+value,
				   success:function(result){
					   result = eval("(" + result + ")");  
					   if(result.msg == 1){
						   toastrBoot(4,"该用户名已经被注册，请重新输入!");
							$('#xt_userinfo_name').val("");
							$("#xt_userinfo_name").focus();
						}
				   }
				});
		}
	}
}
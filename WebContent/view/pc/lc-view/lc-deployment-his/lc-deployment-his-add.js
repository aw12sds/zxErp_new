var lcDeploymentHisWinAdd;
var lcDeploymentHisFormAdd;
function addLcDeploymentHis(){
	initLcDeploymentHisFormAdd();
	lcDeploymentHisWinAdd = Ext.create('Ext.Window',{
		layout:'fit',
		width:800,
		height:400,
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'添加信息',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:lcDeploymentHisFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(lcDeploymentHisFormAdd,'../lcDeploymentHisController/addLcDeploymentHis',grid,lcDeploymentHisWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	lcDeploymentHisWinAdd.show();
	
}
function initLcDeploymentHisFormAdd(){
	lcDeploymentHisFormAdd = Ext.create('Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		/**新方法使用开始**/
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		/**新方法使用结束**/
		fieldDefaults:{
			labelWidth:70,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'流程部署Id',
			xtype:'textfield',
			name:'lc_deployment_his_id',
			maxLength:50,
			anchor:'100%'
		},
		{
			fieldLabel:'名称',
			xtype:'textfield',
			name:'lc_deployment_his_name',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'部署时间',
			xtype:'textfield',
			name:'lc_deployment_his_time',
			maxLength:255,
			anchor:'100%'
		},
		{
			fieldLabel:'租户编号',
			xtype:'textfield',
			name:'lc_deployment_his_tenantId',
			maxLength:50,
			anchor:'100%'
		},
		{
			fieldLabel:'流程编号',
			xtype:'numberfield',
			value:'0',
			name:'lc_process_id',
			maxLength:10,
			anchor:'100%'
		}
		]
	});
}

Ext.onReady(function(){
	reGetWidthAndHeight();
	var resultPanel = Ext.create('Ext.Window',{
		region:'center',
		xtype:'panel',
		title:'结果详细',
		layout:'fit',
		width:clientWidth,                    
		height:clientHeight, 
		closeAction:'hide',
		closable:false, 
		plain:true,
		draggable:false,
		resizable:false,
		html:'',
		autoScroll:true,
		id:'kcontent',
		frame:true,
		tools:[
		{
			xtype:'label',
			id:'ctime'
		},
		{
			xtype:'label',
			id:'cUser'
		}
		]
	}).show();
    Ext.create('Ext.Viewport', {
		layout:'border',
		xtype:'viewport',
		items:[resultPanel]
	});
	Ext.Ajax.request({  
		params:{xt_knowledge_id:$('#searchid').val()}, 
	    timeout:600000,/**设置超时时间10十分钟**/
	    method:'post',
	    url:'../xtKnowledgeController/getXtKnowledgeById',
	    success:function(response,opts){
	    	var respText = Ext.util.JSON.decode(response.responseText).data;
			Ext.getCmp('kcontent').body.update(respText.xt_knowledge_content);
			Ext.getCmp('cUser').setText(respText.xt_userinfo_realName);
			Ext.getCmp('ctime').setText(respText.xt_time);
	    },  
	    failure:function(response,opts){  
	    }  
	});
});
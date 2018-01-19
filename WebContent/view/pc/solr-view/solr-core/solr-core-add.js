var solrCoreWinAdd;
var solrCoreFormAdd;
function addSolrCore(){
	initSolrCoreFormAdd();
	reGetWidthAndHeight();
	solrCoreWinAdd = Ext.create('Ext.window.Window',{
		width:clientWidth,                    
		height:clientHeight, 
		maximized:true,
		maximizable:true,
		autoScroll:true,
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'添加信息',
		headerPosition:'left',
		items:solrCoreFormAdd,
		buttons:[{
			text:'保存',
			handler:function(button){
				if(getSolrIndexJSON() == false){
					return;
				}
				var params = {solrIndexJSON:encodeURI(getSolrIndexJSON())}
				submitFormIncludeParams(solrCoreFormAdd,'../solrCoreController/addSolrCore',grid,solrCoreWinAdd,false,true,params);
			}
		},{
			text:'关闭',
			handler:function(button){
				solrCoreWinAdd.close();
			}
		}]
	});
	solrCoreWinAdd.show();
}
function initSolrCoreFormAdd(){
	initSolrIndexGrid(0);
	solrCoreFormAdd = Ext.create('Ext.FormPanel',{
		waitMsgTarget:true,
		defaultType:'textfield',
		fieldDefaults:{
			labelWidth:145,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		title:'文档、实例配置',
		items:[{
				fieldLabel:'实例名称',
				xtype:'textfield',
				name:'solr_core_name',
				allowBlank:false,
				maxLength:200,
				width:400
			},
			{
				fieldLabel:'文档名称',
				xtype:'textfield',
				name:'solr_document_name',
				allowBlank:false,
				maxLength:200,
				width:400
			},
			{
				fieldLabel:'URLID',
				xtype:'textfield',
				hidden:true,
				id:'solr_url_id',
				name:'solr_url_id',
				maxLength:32,
				anchor:'100%'
			},
			{
				fieldLabel:'SchemaTemplet模板',
				xtype:"combo",
           		queryMode:'local', 
				store:solrSchemaTempletList,
				name:'solr_schema_templet_id',
				triggerAction:"all",
	            editable:false,
	            emptyText:'请选择',
	            valueField:"solr_schema_templet_id",
	            displayField:"solr_schema_templet_title",
				width:400
			},
			{
				fieldLabel:'DataConfig配置',
				xtype:"combo",
           		queryMode:'local', 
				store:solrDataConfigList,
				name:'solr_data_config_id',
				triggerAction:"all",
	            editable:false,
	            emptyText:'请选择',
	            valueField:"solr_data_config_id",
	            displayField:"solr_data_config_title",
				width:400
			},
			{
				fieldLabel:'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注',
				xtype:'textareafield',
				id:'solr_core_text',
				name:'solr_core_text',
				maxLength:32,
				width:800
			},
			{
				fieldLabel:'使用唯一编号编码',
				xtype:'textfield',
				name:'useonlynumbercode',
				allowBlank:false,
				maxLength:200,
				width:400
			}
			]
	});
	solrCoreFormAdd.add(solr_index_grid);
	Ext.getCmp('solr_url_id').setValue($("#solr_url_id_").val());
}

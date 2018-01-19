var zxOutsourceWinAdd;
var zxOutsourceFormAdd;
var zxOutsourceFormAddFieldSet;
var zxOutsourceTimeFormAddFieldSet;
var zxOutsourceWorkpieceFormAddFieldSet;
var zxOutsourceConcordatFormAddFieldSet;
function addZxOutsource(){
	initZxOutsourceFormAdd();
	reGetWidthAndHeight();
	zxOutsourceWinAdd = Ext.create('top.Ext.Window',{
		layout:'fit',
		width:clientWidth*1.1,                    
		height:clientHeight, 
		maximizable:true,
		minimizable:true,
		animateTarget:document.body,
		plain:true,
		modal:true,
		title:'添加信息',
		headerPosition:'top',
		listeners:{
			minimize:function(win,opts){
				if(!win.collapse()){
					win.collapse();
				}else{
					win.expand();
				}
			}
		},
		items:zxOutsourceFormAdd,
		buttons:[{
			text:'保存',
			itemId:'save',
			handler:function(button){
				submitForm(zxOutsourceFormAdd,'../zxOutsourceController/addZxOutsource',grid,zxOutsourceWinAdd,false,true);
			}
		},{
			text:'关闭',
			itemId:'close',
			handler:function(button){
				button.up('window').close();
			}
		}]
	});
	zxOutsourceWinAdd.show();
}
function initZxOutsourceFormAdd(){
	zxOutsourceWorkpieceFormAddFieldSet = Ext.create('top.Ext.form.FieldSet',{
		anchor:'100%',
		title:'工件信息',
		items:[
		       {
					layout:"column",
					items:[
					{
						columnWidth:.25,
						items:[
						{ 
							fieldLabel:'工件编号',
							xtype:'textfield',
							trigger1Cls:'x-form-ss-trigger',
							onTrigger1Click:function(){selectWorkpiece();},
							name:'workpiece_num',
							allowBlank: false,
							id:'workpiece_num',
							maxLength:255,
							anchor:'30%'
						}
						]
					},
					{
						columnWidth:.25,
						items:[{
							fieldLabel:'所属项目',
							xtype:'textfield',
							name:'project_name',
							id:'project_name',
							maxLength:100,
							readOnly:true,
							anchor:'20%'
						}]
					},
					{
						columnWidth:.25,
						items:[{
							fieldLabel:'工件名称',
							xtype:'textfield',
							name:'workpiece_name',
							id:'workpiece_name',
							maxLength:100,
							readOnly:true,
							anchor:'20%'
						}]
					},
					{
						columnWidth:.25,
						items:[{
							fieldLabel:'单位',
							xtype:'textfield',
							name:'workpiece_unit',
							id:'workpiece_unit',
							maxLength:100,
							readOnly:true,
							anchor:'20%'
						}]
					}
					]
				}
			]
	});
	
	zxOutsourceFormAddFieldSet = Ext.create('top.Ext.form.FieldSet',{
		anchor:'100%',
		title:'基本信息',
		items:[
		{
			layout:"column",
			items:[
			{
				fieldLabel:'工件',
				xtype:'textfield',
				name:'workpiece_id',
				id:'workpiece_id',
				maxLength:100,
				hidden:true,
				anchor:'20%'
			},
			{
				fieldLabel:'采购订单',
				xtype:'textfield',
				name:'buy_id',
				id:'buy_id',
				maxLength:100,
				hidden:true,
				anchor:'20%'
			},
			{
				fieldLabel:'采购合同',
				xtype:'textfield',
				name:'concordat_id',
				id:'concordat_id',
				maxLength:100,
				hidden:true,
				anchor:'20%'
			},
			{
				fieldLabel:'加工单位',
				xtype:'textfield',
				name:'machine_id',
				id:'machine_id',
				maxLength:100,
				hidden:true,
				anchor:'20%'
			},
			{
				columnWidth:.25,
				items:[{
					fieldLabel:'总数量',
					xtype:'textfield',
					name:'amount',
					allowBlank: false,
					maxLength:26,
					anchor:'20%'
				}]
			},
			{
				columnWidth:.25,
				items:[{
					fieldLabel:'需求日期',
					xtype:'datefield',
					format:'Y-m-d',
					name:'need_date',
					allowBlank: false,
					maxLength:20,
					anchor:'20%'
				}]
			},
			{
				columnWidth:.25,
				items:[{
					fieldLabel:'计划交货时间',
					xtype:'datefield',
					format:'Y-m-d',
					name:'plan_date',
					maxLength:20,
					anchor:'20%'
				}]
			},
			{
				columnWidth:.25,
				items:[{
					fieldLabel:'加工单位',
					xtype:'textfield',
					trigger1Cls:'x-form-ss-trigger',
					onTrigger1Click:function(){selectMachine();},
					name:'machine_name',
					id:'machine_name',
					maxLength:255,
					anchor:'30%'
				}]
			}
			]
		},
		{
		       layout:"column",
		       items:[
				{
					columnWidth:.3,
					items:[{
						fieldLabel:'状态',
						xtype:"combo",
						queryMode:'local', 
						store:outsource_status,
						triggerAction:"all",
			            editable:false,
			            emptyText:'请选择',
			            valueField:"xt_data_dictionary_value",
			            displayField:"xt_data_dictionary_name",
						name:'status',
						anchor:'20%'
					}]
				}
				]
			},
		{
			fieldLabel:'备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注',
			xtype:'textarea',
			name:'remark',
			maxLength:65535,
			height:20,
			anchor:'100%'
		},
		{
			xtype:'numberfield',
			hidden:true,
			value:'0',
			itemId:'zxOutsourceTimeFormNumber'
		},
		{
			xtype:'textfield',
			hidden:true,
			name:'zxOutsourceTime_removed_flag',
			itemId:'zxOutsourceTime_removed_flag'
		} 
		]
	});

	zxOutsourceConcordatFormAddFieldSet = Ext.create('top.Ext.form.FieldSet',{
		anchor:'100%',
		title:'合同与订单',
		items:[
		{
			layout:"column",
			items:[
			{
				columnWidth:.25,
				items:[
				{ 
					fieldLabel:'合同号',
					xtype:'textfield',
					trigger1Cls:'x-form-ss-trigger',
					onTrigger1Click:function(){selectConcordat();},
					name:'concordat_num',
					id:'concordat_num',
					maxLength:255,
					anchor:'30%'
				}
				]
			},
			{
				columnWidth:.25,
				items:[
				{ 
					fieldLabel:'采购订单号',
					xtype:'textfield',
					trigger1Cls:'x-form-ss-trigger',
					onTrigger1Click:function(){selectOrderBuy();},
					name:'buy_num',
					id:'buy_num',
					maxLength:255,
					anchor:'30%' 
				}]
			}
			]
		}
		]
	});
	zxOutsourceTimeFormAddFieldSet = Ext.create('top.Ext.form.FieldSet',{
		anchor:'100%',
		title:'外协分批到货',
		items:[{	
			xtype:'button',
			text:'添加分批信息',
			style:'float:left;margin-bottom:10px',
			labelAlign:"right", 
			listeners:{
				click:function(){
					addZxOutsourceTimeFormAdd();
				}
			}
		}
		]
	});
	zxOutsourceFormAdd = Ext.create('top.Ext.FormPanel',{
		labelWidth:50,
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		/**新方法使用开始**/  
        scrollable:true,  
        scrollable:'x',
        scrollable:'y',
        /**新方法使用结束**/ 
		fieldDefaults:{
			labelWidth:90,
			labelAlign:'left',
			margin:'4 5 4 5'
		},
		items:[
		        zxOutsourceWorkpieceFormAddFieldSet,
				zxOutsourceFormAddFieldSet,
				zxOutsourceConcordatFormAddFieldSet,
				zxOutsourceTimeFormAddFieldSet
		       ]
	});
}
function addZxOutsourceTimeFormAdd(){
	var numbers = gfiValue(zxOutsourceFormAddFieldSet,'zxOutsourceTimeFormNumber');
	sfiValue(zxOutsourceFormAddFieldSet,'zxOutsourceTimeFormNumber',numbers+1);
	zxOutsourceTimeFormAdd = Ext.create('top.Ext.FormPanel',{
		xtype:'form',
		waitMsgTarget:true,
		defaultType:'textfield',
		autoScroll:true,
		scrollable:true,
		scrollable:'x',
		scrollable:'y',
		layout : "column",
		fieldDefaults:{
			labelWidth:100,
			labelAlign:'left',
			flex:1,
			margin:'2 5 4 5'
		},
		items:[
		{
			fieldLabel:'ID',
			xtype:'textfield',
			name:'zxOutsourceTime['+numbers+'].id',
			itemId:'zxOutsourceTime['+numbers+'].id',
			maxLength:32,
			hidden:true,
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'外协ID',
			xtype:'textfield',
			columnWidth: .25,
			name:'zxOutsourceTime['+numbers+'].outsource_id',
			itemId:'zxOutsourceTime['+numbers+'].outsource_id',
			maxLength:32,
			hidden:true,
			hidden:true,
			anchor:'100%'
		},
		{
			fieldLabel:'计划交货时间',
			xtype:'datefield',
			columnWidth: .25,
			format:'Y-m-d',
			name:'zxOutsourceTime['+numbers+'].plan_date',
			itemId:'zxOutsourceTime['+numbers+'].plan_date',
			maxLength:10,
			anchor:'80%'
		},
		{
			fieldLabel:'实际到货时间',
			xtype:'datefield',
			columnWidth: .25,
			format:'Y-m-d',
			name:'zxOutsourceTime['+numbers+'].real_date',
			itemId:'zxOutsourceTime['+numbers+'].real_date',
			maxLength:10,
			anchor:'80%'
		},
		{
			fieldLabel:'排序',
			xtype:'numberfield',
			columnWidth: .25,
			value:'0',
			itemId:'zxOutsourceTime['+numbers+'].time_sort',
			name:'zxOutsourceTime['+numbers+'].time_sort',
			maxLength:10,
			anchor:'100%'
		},
		{
			xtype:'button',
			text:'删除',
			cls:'delBtn',
			icon:delIcon,
			style:'background:#368ECE;border-color:#126DAF;float:right;',
			labelAlign:'right',
			handler:function (){
				var _panel = this.ownerCt;
				zxOutsourceTimeFormAddFieldSet.remove(_panel); 
				var zxOutsourceTime_removed_flag = gfiValue(zxOutsourceFormAddFieldSet,'zxOutsourceTime_removed_flag');
				if(null == zxOutsourceTime_removed_flag || zxOutsourceTime_removed_flag == ''){
					sfiValue(zxOutsourceFormAddFieldSet,'zxOutsourceTime_removed_flag',","+numbers+",");
				}else{
					sfiValue(zxOutsourceFormAddFieldSet,'zxOutsourceTime_removed_flag',zxOutsourceTime_removed_flag+numbers+',');
				}
				resetTitle(zxOutsourceTimeFormAddFieldSet,true);
			}
		}
		]
	});
	zxOutsourceTimeFormAddFieldSet.add(zxOutsourceTimeFormAddFieldSet.items.getCount(),zxOutsourceTimeFormAdd);
	zxOutsourceTimeFormAddFieldSet.afterLayout();
	resetTitle(zxOutsourceTimeFormAddFieldSet,true);
}

var grid;
$(document).ready(function() {
	/////////////jehc扩展属性目的可方便使用（boot.js文件datatablesCallBack方法使用） 如弹窗分页查找根据条件 可能此时的form发生变化 此时 可以解决该类问题
	var opt = {
		searchformId:'searchForm'
	};
	var options = DataTablesPaging.pagingOptions({
		ajax:function (data, callback, settings){datatablesCallBack(data, callback, settings,'../zxSupplierController/getZxSupplierListByCondition',opt);},//渲染数据
			//在第一位置追加序列号
			fnRowCallback:function(nRow, aData, iDisplayIndex){
				jQuery('td:eq(1)', nRow).html(iDisplayIndex +1);  
				return nRow;
		},
		order:[],//取消默认排序查询,否则复选框一列会出现小箭头
		//列表表头字段
		colums:[
			{
				sClass:"col_text-center",
				width:"50px",
				data:"id",
				render:function (data, type, full, meta) {
					return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" name="checkId" class="checkchild " value="' + data + '" /><span></span></label>';
				},
				bSortable:false
			},
			{
				data:"id",
				width:"150px"
			},
			{
				data:'name'
			},
			{
				data:'classify'
			},
			{
				data:'num'
			},
			{
				data:'pay_type',
				render:function (data, type, full, meta) {
					var col_text = '∨';
					if(data == 1){
						col_text = '全款';
					}else if(data == 2){
						col_text = '货到付款';
					}else if(data == 3){
						col_text = '预付款';
					}
					jQuery('td:eq('+meta.col+')', meta.row).html(col_text); //通过异步渲染数据
					return col_text;
				}
			},
			{
				data:'type',
				render:function (data, type, full, meta) {
					var col_text = '∨';
					if(data == 1){
						col_text = '供应商';
					}else if(data == 2){
						col_text = '加工商';
					}
					jQuery('td:eq('+meta.col+')', meta.row).html(col_text); //通过异步渲染数据
					return col_text;
				}
			},
			{
				data:'yc_status',
				render:function (data, type, full, meta) {
					var col_text = '∨';
					if(data == '0'){
						col_text = '<font color="red">未验厂</font>';
					}else if(data == '1'){
						col_text = '申请保存中';
					}else if(data == '2'){
						col_text = '申请审核中';
					}else if(data == '3'){
						col_text = '申请退回';
					}else if(data == '4'){
						col_text = '验厂中';
					}else if(data == '5'){
						col_text = '验厂报告审核中';
					}else if(data == '6'){
						col_text = '验厂报告退回';
					}else if(data == '7'){
						col_text = '验厂完成';
					}
					jQuery('td:eq('+meta.col+')', meta.row).html(col_text); //通过异步渲染数据
					return col_text;
				}
			},
			{
				data:'yc_grade',
				render:function (data, type, full, meta) {
					var col_text = '∨';
					if(data == '1'){
						col_text = '合格';
					}else if(data == '2'){
						col_text = '<font color="red">限期整改</font>';
					}else if(data == '3'){
						col_text = '<font color="red">不合格</font>';
					}
					jQuery('td:eq('+meta.col+')', meta.row).html(col_text); //通过异步渲染数据
					return col_text;
				}
			},
			{
				data:'judge_cycle',
				render:function (data, type, full, meta) {
					var col_text = '∨';
					if(data == '1'){
						col_text = '年';
					}else if(data == '2'){
						col_text = '季度';
					}else if(data == '3'){
						col_text = '月';
					}
					jQuery('td:eq('+meta.col+')', meta.row).html(col_text); //通过异步渲染数据
					return col_text;
				}
			},
			{
				data:'judge_date',
				render:function (data, type, full, meta) {
					var col_text = '∨';
					if(data > 0)
					{
						var year = Math.floor(data/12);
						var month = data%12;
						col_text = month==0?(year - 1) + "-12":year + "-" + (month < 10?"0" + month:month);
					}
					jQuery('td:eq('+meta.col+')', meta.row).html(col_text); //通过异步渲染数据
					return col_text;
				}
			},
			{
				data:'judge_grade',
				render:function (data, type, full, meta) {
					var col_text = '∨';
					if(data == '1'){
						col_text = 'I级考核标准';
					}else if(data == '2'){
						col_text = 'Ⅱ级考核标准';
					}else if(data == '3'){
						col_text = 'Ⅲ级考核标准';
					}else if(data == '4'){
						col_text = '不合格，直接淘汰';
					}
					jQuery('td:eq('+meta.col+')', meta.row).html(col_text); //通过异步渲染数据
					return col_text;
				}
			},
			{
				data:'is_judge',
				render:function (data, type, full, meta) {
					if(data == ''||data == '0'){
						return '否';
					}else{
						return '是';
					}
				}
			},
			{
				data:'yc_num'
			},
			{
				data:'create_date'
			},
			{
				data:"id",
				width:"150px",
				render:function(data, type, row, meta) {
					var yc_status = row.yc_status;
			 		var is_judge = row.is_judge;
			 		var sid = data;
			 		
			 		yc_status = yc_status==''?'0':yc_status; 
			 		var text = '';
			 		var type = 0;
			 		if(yc_status == '0'){
			 			type = 1;
			 			text = '验厂申请';
			 		}else if(yc_status == '1'||yc_status == '2'||yc_status == '3'){
			 			type = 2;
			 			text = '验厂申请';
			 		}else if(yc_status == '4'||yc_status == '5'||yc_status == '6'){
			 			type = 3;
			 			text = '验厂报告';
			 		}else if(yc_status == '7'&&is_judge == '1'){
			 			type = 4;
			 			text = '再评审报告';
			 		}
			 		var button = '';
			 		if(type > 0)
			 			button = '<button class="btn btn-sm green btn-outline filter-submit margin-bottom" onclick=writeReport("'+ type +'","'+ row.yc_num +'","'+ yc_status +'","'+ sid +'")><i class="glyphicon glyphicon-eye-open"></i>'+ text +'</button>';

			 		return button;
				}
			}
		]
	});
	grid=$('#datatables').dataTable(options);
	//实现全选反选
	docheckboxall('checkall','checkchild');
	//实现单击行选中
	clickrowselected('datatables');
    $("#classify").append("<option value=''>请选择</option><option value='A'>A</option><option value='B'>B</option><option value='C'>C</option><option value='D'>D</option>");
    $("#type").append("<option value=''>请选择</option><option value='1'>供应商</option><option value='2'>加工商</option>");
});
//新增
function toZxSupplierAdd(){
	tlocation('../zxSupplierController/toZxSupplierAdd');
}
//修改
function toZxSupplierUpdate(){
	if($(".checkchild:checked").length != 1){
		toastrBoot(4,"选择数据非法");
		return;
	}
	var id = $(".checkchild:checked").val();
	tlocation("../zxSupplierController/toZxSupplierUpdate?id="+id);
}
//详情
function toZxSupplierDetail(){
	if($(".checkchild:checked").length != 1){
		toastrBoot(4,"选择数据非法");
		return;
	}
	var id = $(".checkchild:checked").val();
	tlocation("../zxSupplierController/toZxSupplierDetail?id="+id);
}
//删除
function delZxSupplier(){
	if(returncheckedLength('checkchild') <= 0){
		toastrBoot(4,"请选择要删除的数据");
		return;
	}
	msgTishCallFnBoot("确定要删除所选择的数据？",function(){
		var id = returncheckIds('checkId').join(",");
		var params = {id:id};
		ajaxBReq('../zxSupplierController/delZxSupplier',params,['datatables']);
	})
}
//添加验厂申请
function addZxJudgeApply(supplier_id,num){
	tlocation('../zxJudgeApplyController/toZxJudgeApplyAdd?supplier_id=' + supplier_id + '&num=' + num);
}
//编辑验厂申请
function updateZxJudgeApply(supplier_id,num){
	tlocation('../zxJudgeApplyController/toZxJudgeApplyUpdate?supplier_id=' + supplier_id + '&num=' + num);
}
//验厂申请明细
function detailZxJudgeApply(supplier_id,num){
	tlocation('../zxJudgeApplyController/toZxJudgeApplyDetail?supplier_id=' + supplier_id + '&num=' + num);
}
//填写验厂报告
function addZxJudgeReport(supplier_id,step){
	tlocation('../zxJudgeReportController/toZxJudgeReportAdd?supplier_id='+ supplier_id +'&step=' + step);
}
//填写再评审报告
function addJudgeAgainReport(supplier_id,step){
	tlocation('../zxJudgeReportController/toZxJudgeAgainReportAdd?supplier_id='+ supplier_id +'&step=' + step);
}
function writeReport(type,syc_num,yc_status,sid){
	var supplier_id = sid;
	var yc_num = syc_num + 1;
	if(type == 1||type == 2){
		$.post("../zxJudgeApplyController/canApply",{supplier_id:supplier_id},function(result){
			if(result == '7'||result == '8'||result == '9'){
				toastrBoot(4,'验厂中，不能再次申请');
			}else if(result == '5'){
				toastrBoot(4,'不能多次验厂');
			}else if(result == '0'||result == '6'){
				addZxJudgeApply(supplier_id,yc_num);
			}else if(result == '1'||result == '4'){
				updateZxJudgeApply(supplier_id,yc_num);
			}else if(result == '2'||result == '3'){
				detailZxJudgeApply(supplier_id,yc_num);
			}else if(result == '10'){
				toastrBoot(4,'已验厂，合格');
			}else if(result == '11'){
				addZxJudgeApply(supplier_id,yc_num);
			}else if(result == '12'){
				toastrBoot(4,'已验厂，不合格');
			}
		});
	}else if(type == 3){
		$.post("../zxJudgeReportController/getYCStep",{supplier_id:supplier_id,num:yc_num},function(result){
    		if(result == '0'){
    			toastrBoot(4,'没有权限');
    		}else if(result == '1'||result == '2'||result == '4'){
    			addZxJudgeReport(supplier_id,1);
    		}else if(result == '3'||result == '7'){
    			addZxJudgeReport(supplier_id,3);
    		}else if(result == '5'){
    			toastrBoot(4,'申请中，不能填写');
    		}else if(result == '6'){
    			toastrBoot(4,'还没有申请验厂');
    		}
    	});
	}else if(type == 4){
		$.post("../zxJudgeReportController/getAgainStep",{supplier_id:supplier_id},function(result){
    		if(result == '0'){
    			toastrBoot(4,'没有权限');
    		}else if(result == '1'||result == '2'||result == '4'){
    			addJudgeAgainReport(supplier_id,1);
    		}else if(result == '3'||result == '7'){
    			addJudgeAgainReport(supplier_id,3);
    		}else if(result == '5'){
    			toastrBoot(4,'没有验厂');
    		}else if(result == '6'){
    			toastrBoot(4,'当前没有再评审');
    		}
    	});
	}
}

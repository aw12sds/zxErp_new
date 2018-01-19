var grid;
$(document).ready(function() {
	/////////////jehc扩展属性目的可方便使用（boot.js文件datatablesCallBack方法使用） 如弹窗分页查找根据条件 可能此时的form发生变化 此时 可以解决该类问题
	var opt = {
		searchformId:'searchForm'
	};
	var options = DataTablesPaging.pagingOptions({
		ajax:function (data, callback, settings){datatablesCallBack(data, callback, settings,'../zxGoodsApplyController/getZxGoodsOutApplyListByCondition',opt);},//渲染数据
			//在第一位置追加序列号
			fnRowCallback:function(nRow, aData, iDisplayIndex){
				jQuery('td:eq(1)', nRow).html(iDisplayIndex +1);  
				return nRow;
		},
		order:[],//取消默认排序查询,否则复选框一列会出现小箭头
		//列表表头字段
		colums:[
			{
				sClass:"text-center",
				width:"50px",
				data:"apply_id",
				render:function (data, type, full, meta) {
					return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" name="checkId" class="checkchild " value="' + data + ","+full.status+'" /><span></span></label>';
				},
				bSortable:false
			},
			{
				data:"apply_id",
				width:"150px"
			},
			{
				data:'create_date'
			},
			{
				data:'status',
				render:function(data, type, row, meta) {
					return InitBDataCallFnByKey("Zx_Goods_Apply",data);
				}
			},
			{
				data:"apply_id",
				width:"150px",
				render:function(data, type, row, meta) {
					return "<a href=\"javascript:toZxGoodsApplyDetail('"+ data +"')\"><span class='glyphicon glyphicon-eye-open'></span></a>&emsp;"+
					       "<a href=\"javascript:toZxGoodsApplyOut('"+ data +"')\"><span class='glyphicon glyphicon-transfer text-danger' title='发放'></span></a>&emsp;";
					     
				}
				
			}
		]
	});
	grid=$('#datatables').dataTable(options);
	//实现全选反选
	docheckboxall('checkall','checkchild');
	//实现单击行选中
	clickrowselected('datatables');
});
//新增
function toZxGoodsApplyAdd(){
	tlocation('../zxGoodsApplyController/toZxGoodsApplyAdd');
}
//修改
function toZxGoodsApplyUpdate(){
	if($(".checkchild:checked").length != 1){
		toastrBoot(4,"选择数据非法");
		return;
	}
	var str = $(".checkchild:checked").val();
	var strs = str.split(",");
	var id = strs[0];
	var status = strs[1];
	if(status!=0){
		toastrBoot(4,"只有待申请状态的数据可以修改");
		return;
	}
	tlocation("../zxGoodsApplyController/toZxGoodsApplyUpdate?apply_id="+id);
}
//详情
function toZxGoodsApplyDetail(id){
	tlocation("../zxGoodsApplyController/toZxGoodsApplyOutDetail?apply_id="+id);
}
//发放
function toZxGoodsApplyOut(id){
	if(returncheckedLength('checkchild') <= 0){
		toastrBoot(4,"请选择要删除的数据");
		return;
	}
	var str = $(".checkchild:checked").val();
	var strs = str.split(",");
	var id = strs[0];
		/*var params = {apply_id:id};*/
		/*ajaxBReq('../zxGoodsApplyController/toZxGoodsApplyOut',params,['datatables']);*/
	tlocation("../zxGoodsApplyController/toZxGoodsApplyOut?apply_id="+id);
	/*var str = $(".checkchild:checked").val();
	var strs = str.split(",");
	var id = strs[0];
	var status = strs[1];
	msgTishCallFnBoot("确定要发放吗？",function(){
		var params = {apply_id:id};
		ajaxBReq('../zxGoodsApplyController/toApply',params,['datatables']);
	})*/
}
//删除
function delZxGoodsApply(){
	if(returncheckedLength('checkchild') <= 0){
		toastrBoot(4,"请选择要删除的数据");
		return;
	}
	var str = $(".checkchild:checked").val();
	var strs = str.split(",");
	var id = strs[0];
	var status = strs[1];
	if(status!=0){
		toastrBoot(4,"只有待申请状态的数据可以删除");
		return;
	}
	msgTishCallFnBoot("确定要删除所选择的数据？",function(){
		var id = returncheckIds('checkId').join(",");
		var params = {apply_id:id};
		ajaxBReq('../zxGoodsApplyController/delZxGoodsApply',params,['datatables']);
	})
}

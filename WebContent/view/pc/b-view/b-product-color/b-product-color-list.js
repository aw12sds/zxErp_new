var grid;
$(document).ready(function() {
	/////////////jehc扩展属性目的可方便使用（boot.js文件datatablesCallBack方法使用） 如弹窗分页查找根据条件 可能此时的form发生变化 此时 可以解决该类问题
	var opt = {
		searchformId:'searchForm'
	};
	var options = DataTablesPaging.pagingOptions({
		ajax:function (data, callback, settings){datatablesCallBack(data, callback, settings,'../bProductColorController/getBProductColorListByCondition',opt);},//渲染数据
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
				data:"b_product_color_id",
				render:function (data, type, full, meta) {
					return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" name="checkId" class="checkchild " value="' + data + '" /><span></span></label>';
				},
				bSortable:false
			},
			{
				data:"b_product_color_id",
				width:"50px"
			},
			{
				data:'b_product_color_name'
			},
			{
				data:'b_product_color_width'
			},
			{
				data:'b_product_color_height'
			},
			{
				data:'b_product_color_sort'
			},
			{
				data:'b_product_color_status',
                render:function(data, type, row, meta) {
                	if(data == 0){
                        return '可用';
                    }else if(data == 1){
                        return "禁用";
                    }else{
                    	return "缺省";
                    }
                }
			},
			{
				data:'b_product_color_ctime',
				render:function(data, type, row, meta) {
					return dateformat(data); 
				}
			},
			{
				data:'b_product_color_mtime',
				render:function(data, type, row, meta) {
					return dateformat(data); 
				}
			},
			{
				data:'xt_userinfo_realName'
			},
			{
				data:"b_product_color_id",
				width:"150px",
				render:function(data, type, row, meta) {
					return "<a href=\"javascript:toBProductColorDetail('"+ data +"')\"><span class='glyphicon glyphicon-eye-open'></span></a>";
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
function toBProductColorAdd(){
	tlocation('../bProductColorController/toBProductColorAdd?b_product_id='+$('#b_product_id').val());
}
//修改
function toBProductColorUpdate(){
	if($(".checkchild:checked").length != 1){
		toastrBoot(4,"选择数据非法");
		return;
	}
	var id = $(".checkchild:checked").val();
	tlocation("../bProductColorController/toBProductColorUpdate?b_product_color_id="+id);
}
//详情
function toBProductColorDetail(id){
	tlocation("../bProductColorController/toBProductColorDetail?b_product_color_id="+id);
}
//删除
function delBProductColor(){
	if(returncheckedLength('checkchild') <= 0){
		toastrBoot(4,"请选择要删除的数据");
		return;
	}
	msgTishCallFnBoot("确定要删除所选择的数据？",function(){
		var id = returncheckIds('checkId').join(",");
		var params = {b_product_color_id:id};
		ajaxBReq('../bProductColorController/delBProductColor',params,['datatables']);
	})
}

//返回商品列表
function toBProduct(){
	tlocation("../bProductController/loadBProduct");
}
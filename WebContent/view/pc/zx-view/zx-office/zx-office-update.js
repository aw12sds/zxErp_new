//返回r
function goback(){
	tlocation("../zxOfficeController/loadZxOffice");
}
$('#defaultForm').bootstrapValidator({
	message:'此值不是有效的'
});
//保存
function updateZxOffice(){
	submitBForm('defaultForm','../zxOfficeController/updateZxOffice','../zxOfficeController/loadZxOffice');
}
//初始化日期选择器
$(document).ready(function(){
	datetimeInit();
});


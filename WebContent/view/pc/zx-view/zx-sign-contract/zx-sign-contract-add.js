//返回r
function goback(){
	tlocation("../zxSignContractController/loadZxSignContract");
}
$('#defaultForm').bootstrapValidator({
	message:'此值不是有效的'
});
//保存
function addZxSignContract(){
	submitBForm('defaultForm','../zxSignContractController/addZxSignContract','../zxSignContractController/loadZxSignContract');
}
//初始化日期选择器
$(document).ready(function(){
	datetimeInit();
});
//员工选择器
function toChooseUser(){
	tlocation('../zxSignContractController/toZxSignContractUserChoose');
}

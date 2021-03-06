//返回r
function goback(){
	tlocation("../zxPeriodTransactionController/loadZxPeriodTransaction");
}
$('#defaultForm').bootstrapValidator({
	message:'此值不是有效的'
});
//保存
function updateZxPeriodTransaction(){
	submitBForm('defaultForm','../zxPeriodTransactionController/updateZxPeriodTransaction','../zxPeriodTransactionController/loadZxPeriodTransaction');
}
//初始化日期选择器
$(document).ready(function(){
	InitBDataComboSetV("zx_transaction_type","transaction_type","transaction_type_");
	InitBDataComboSetV("zx_repeat_type","repetition_type","repetition_type_");
	InitBDataComboSetV("whether","transaction_remind","transaction_remind_");
	InitBDataComboSetV("zx_week","repetition_week","repetition_week_");
	InitBDataComboSetV("zx_day","repetition_day","repetition_day_");
	datetimeInit();
	var repetition_type =$("#repetition_type_").val();
	if(repetition_type==2){
		$("#week").show();
	}else if(repetition_type==3){
		$("#day").show();
	}
	var transaction_remind =$("#transaction_remind_").val();
	if(transaction_remind==1){
		$("#remind_day").show();
		$("#remind_hour").show();
		$("#remind_minute").show();
	}else{
		$("#remind_day").hide();
		$("#remind_hour").hide();
		$("#remind_minute").hide();
	}
});
$('#transaction_remind').change(function () {
	var transaction_remind =$("#transaction_remind").val();
	if(transaction_remind==1){
		$("#remind_day").show();
		$("#remind_hour").show();
		$("#remind_minute").show();
	}else{
		$("#remind_day").hide();
		$("#remind_hour").hide();
		$("#remind_minute").hide();
	}
})
$('#repetition_type').change(function () {
	var repetition_type =$("#repetition_type").val();
	if(repetition_type==2){
		$("#week").show();
		$("#day").hide();
	}else if(repetition_type==3){
		$("#week").hide();
		$("#day").show();
	}else{
		$("#week").hide();
		$("#day").hide();
	}
})

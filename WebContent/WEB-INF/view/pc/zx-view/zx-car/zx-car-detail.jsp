<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/deng/include/includeboot.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="UTF-8">
<title>车辆管理详情页面</title>
</head>
<body>
	<div class="panel panel-default padding-10 no-margin">
		<legend>
		<div class="btn-group pull-right" style="margin-right: 20px;">
			<button type="button" onclick="goback()" class="btn btn-default">
				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>返回
			</button>
		</div>
		车辆管理详情
		</legend>
		<form class="form-horizontal" id="defaultForm" method="post">
			<div class="form-group" style="display:none;">
				<label class="col-lg-3 control-label">Id</label>
				<div class="col-lg-6">
					<input class="form-control" type="hidden" name="id"  placeholder="请输入Id" value="${zxCar.id }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">状态</label>
				<div class="col-lg-6">
					<input type="hidden" id="state_" value="${zxCar.state }">
					<select class="form-control" maxlength="32" disabled="disabled" data-bv-notempty data-bv-notempty-message="请选择状态" name="state" id="state" placeholder="请选择"></select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">车牌</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" maxlength="255" readonly="readonly" data-bv-notempty data-bv-notempty-message="请输入车牌"  name="car_no" placeholder="请输入车牌" value="${zxCar.car_no }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">可乘坐人数</label>
				<div class="col-lg-6">
					<input class="form-control" maxlength="10" readonly="readonly" data-bv-numeric data-bv-numeric-message="可乘坐人数为数字类型"  name="people_num" placeholder="请输入可乘坐人数" value="${zxCar.people_num }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">型号</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" maxlength="255" readonly="readonly" name="model" placeholder="请输入型号" value="${zxCar.model }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">品牌</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" maxlength="255" readonly="readonly" name="brand" placeholder="请输入品牌" value="${zxCar.brand }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">汽车主图</label>
				<div class="col-lg-6">
					<input class="form-control" type="hidden" name="car_img" id="car_img" value="${zxCar.car_img }">
					<img src = "../deng/images/default/add_d.png" class="img" width="96"  height="96"  id="car_img_pic">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">简介</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" maxlength="255" readonly="readonly" name="summary" placeholder="请输入简介" value="${zxCar.summary }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">购买时间</label>
				<div class="col-lg-6">
					<input class="form_datetime form-control" name="buy_time" readonly="readonly" placeholder="请选择时间" value="${zxCar.buy_time }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label"></label>
				<div class="col-lg-6">
					
				</div>
			</div>
		</form>
	</div>
</body>
<script type="text/javascript" src="../view/pc/zx-view/zx-car/zx-car-detail.js"></script> 
</html>

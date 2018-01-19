<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/deng/include/includeboot.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="UTF-8">
<title>基础库存详情页面</title>
</head>
<body>
	<div class="panel-body">
		<div class="page-header">
			<h4>库存详情</h4>
		</div>
		<form class="form-horizontal" id="defaultForm" method="post">
			<div class="form-group" style="display:none;">
				<label class="col-lg-3 control-label">库存编号</label>
				<div class="col-lg-6">
					<input class="form-control" type="hidden" name="b_stock_id"  placeholder="请输入库存编号" value="${bStock.b_stock_id }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户</label>
				<div class="col-lg-6">
					 <input class="form-control" type="text"readonly="readonly" data-bv-notempty data-bv-notempty-message="请选择商户、卖家" placeholder="请选择商户、卖家" id="b_seller_name" value="${bStock.b_seller_name }"/> 
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;品</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" style="width:280px;"  maxlength="32" readonly="readonly" id="b_product_name" value="${bStock.b_product_name }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" style="width:280px;"  maxlength="32" readonly="readonly" id="b_brand_name" value="${bStock.b_brand_name }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" style="width:280px;"  maxlength="32" readonly="readonly" id="b_category_name" value="${bStock.b_category_name }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</label>
				<div class="col-lg-6">
					<input class="form-control" maxlength="10" value="0" style="width:120px;" data-bv-numeric data-bv-numeric-message="库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存为数字类型"  name="b_stock_countable_sell" placeholder="请输入库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存" value="${bStock.b_stock_countable_sell }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存</label>
				<div class="col-lg-6">
					<input class="form-control" maxlength="10" value="0" style="width:120px;" data-bv-numeric data-bv-numeric-message="库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存为数字类型"  name="b_stock_countable_sell" placeholder="请输入库&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;存" value="${bStock.b_stock_countable_sell }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">可&nbsp;&nbsp;卖&nbsp;数</label>
				<div class="col-lg-6">
					<input class="form-control" maxlength="10" value="0" style="width:120px;" data-bv-numeric data-bv-numeric-message="可&nbsp;&nbsp;卖&nbsp;数为数字类型"  name="b_stock_locks_number" placeholder="请输入可&nbsp;&nbsp;卖&nbsp;数" value="${bStock.b_stock_locks_number }">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label"></label>
				<div class="col-lg-6">
					<button type="button" class="btn default" onclick="goback()">返回</button>
				</div>
			</div>
		</form>
	</div>
</body>
<script type="text/javascript" src="../view/pc/b-view/b-stock/b-stock-detail.js"></script> 
</html>

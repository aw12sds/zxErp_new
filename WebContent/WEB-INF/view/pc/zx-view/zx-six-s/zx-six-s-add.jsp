<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/deng/include/includeboot.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="UTF-8">
<title>6S新增页面</title>
</head>
<body>
	<div class="panel-body">
		<div class="page-header">
			<h4>创建6S信息</h4>
		</div>
		<form class="form-horizontal" id="defaultForm" method="post">
			<div class="form-group">
				<label class="col-lg-3 control-label">标题</label>
				<div class="col-lg-6">
					<textarea class="form-control" cols="100" style="height:200px" maxlength="100" data-bv-notempty data-bv-notempty-message="请输入标题"  name="title" placeholder="请输入标题"></textarea>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">检查日期</label>
				<div class="col-lg-3">
					<input class="form_date form-control" readonly="readonly" id="check_date" name="check_date" placeholder="请选择时间">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label"></label>
				<div class="col-lg-6">
					<button type="button" class="btn green" onclick="addZxSixS()">保存</button>
					<button type="button" class="btn default" onclick="goback()">返回</button>
				</div>
			</div>
		</form>
	</div>
</body>
<script type="text/javascript" src="../view/pc/zx-view/zx-six-s/zx-six-s-add.js"></script> 
</html>

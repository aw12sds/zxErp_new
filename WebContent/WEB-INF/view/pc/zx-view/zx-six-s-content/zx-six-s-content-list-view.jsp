<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/deng/include/includeboot.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="UTF-8">
<title>6S具体事项列表</title>
</head>
<body>  
	<input type="hidden" id="six_s_id" value="${six_s_id}"/>
	<div class="panel panel-default padding-10 no-margin">
	</div>
	<div class="panel-body">
		<div class="btn-group pull-right" style="margin-right: 20px;">
			<button class="btn btn-default" onclick="toZxSixSContentDetail()">
				<span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>明细
			</button>
			<button class="btn btn-default" onclick="search('datatables')">
				<span class="glyphicon glyphicon-refresh" aria-hidden="true"></span>刷新
			</button>
			<button class="btn btn-default" onclick="goback()">
				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>返回
			</button>
			<button class="btn btn-default" onclick="toZxSixSContentGaishan()">
				<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>改善
			</button>
		</div>
		<table id="datatables" class="table table-bordered table-striped table-hover">
			<thead>
				<tr>
					<th><label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" class="checkall" /><span></span></label></th>
					<th>序号</th>
					<th>检查场所</th>
					<th>责任部门</th>
					<th>责任人</th>
					<th>不符合项说明</th>
					<th>参考照片</th>
					<th>完成期限</th>
					<th>改善措施</th>
					<th>改善结果</th>
					<th>状态</th>
				</tr>
			</thead>
		</table>
	</div>
</body> 
<script type="text/javascript" src="../view/pc/zx-view/zx-six-s-content/zx-six-s-content-list-view.js"></script>  
</html> 
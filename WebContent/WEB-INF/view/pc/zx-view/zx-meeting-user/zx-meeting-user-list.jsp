<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/deng/include/include.jsp"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>  
<head>  
<meta charset="UTF-8">  
<title>与会人员列表</title>  
	<script type="text/javascript" src="../view/pc/zx-view/zx-meeting-user/zx-meeting-user-list.js"></script> 
	<script type="text/javascript" src="../view/pc/zx-view/zx-meeting/zx-meeting-attach.js"></script>
	<script type="text/javascript" src="../view/pc/zx-view/zx-meeting/zx-meeting-detail.js"></script>  
</head>  
<body> 
<input type='hidden' id='hs_upload_sucess' value="${hs_upload_sucess}"> 
</body>  
</html> 
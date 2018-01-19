<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/deng/include/includeboot.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="UTF-8">
<title>创建商户商品所选颜色页面</title>
</head>
<body>
	<div class="panel-body">
		<div class="page-header">
			<h4>创建商户商品所选颜色</h4>
		</div>
		<form class="form-horizontal" id="defaultForm" method="post">
			<div class="form-group">
				<label class="col-lg-3 control-label">名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" maxlength="100"  name="b_product_color_name" placeholder="请输入名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">宽&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</label>
				<div class="col-lg-6">
					<input class="form-control" maxlength="10" value="0" style="width:120px;" data-bv-numeric data-bv-numeric-message="宽&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度为数字类型"  name="b_product_color_width" placeholder="请输入宽&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">高&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</label>
				<div class="col-lg-6">
					<input class="form-control" maxlength="10" value="0" style="width:120px;" data-bv-numeric data-bv-numeric-message="高&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度为数字类型"  name="b_product_color_height" placeholder="请输入高&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</label>
				<div class="col-lg-6">
					<input class="form-control" maxlength="10" style="width:120px;" value="0"  data-bv-numeric data-bv-numeric-message="排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序为数字类型"  name="b_product_color_sort" placeholder="请输入排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态</label>
				<div class="col-lg-6">
					<select class="form-control" name="b_product_color_status">
						<option value="0">正常</option>
						<option value="1">禁用</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">附&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件</label>
				<div class="col-lg-6">
					<input class="form-control" type="hidden" name="xt_attachment_id" id="xt_attachment_id">
					<img src = "../deng/images/default/add_d.png" class="img" width="96"  height="96"  id="xt_attachment_id_pic">
				</div>
			</div>
			<div class="form-group" style="display: none;">
				<label class="col-lg-3 control-label">商品编号</label>
				<div class="col-lg-6">
					<input class="form-control" type="text" maxlength="32" id="b_product_id" value="${b_product_id }" name="b_product_id" placeholder="请输入商品编号">
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
				<div class="col-lg-6">
					<textarea class="form-control" maxlength="200"  name="b_product_color_remark" placeholder="请输入备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注"></textarea>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label">商&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户</label>
				<div class="col-lg-6">
					<div class="input-group" style="width:280px;" >
		        		<input class="form-control" type="hidden"  data-bv-notempty data-bv-notempty-message="请选择商户、卖家" placeholder="请选择商户、卖家" name="b_seller_id" id="b_seller_id"/> 
		                <input class="form-control" type="text"readonly="readonly" data-bv-notempty data-bv-notempty-message="请选择商户、卖家" placeholder="请选择商户、卖家" id="b_seller_name"/> 
						<span class="input-group-btn">
							<button class="btn btn-default" type="button" onclick="initBSellerList()">
								请选择
							</button>
						</span>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="col-lg-3 control-label"></label>
				<div class="col-lg-6">
					<button type="button" class="btn green" onclick="addBProductColor()">保存</button>
					<button type="button" class="btn default" onclick="goback()">返回</button>
				</div>
			</div>
		</form>
	</div>
</body>

<!-- 商户模态框（Modal）开始 -->
<div class="modal fade" id="bSellerSelectModal" tabindex="-1" role="dialog" aria-labelledby="bSellerModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title" id="bSellerModalLabel">
					商户选择器
				</h4>
			</div>
			<div class="modal-body">
				<div class="panel panel-default">
					<fieldset>
						<legend>查询区域</legend>
						<form method="POST" id="searchBSellerForm" class="form-inline">
							<div class="form-group">
								<label>商户名称</label>
								<input type="text" class="form-control" name="b_seller_name" placeholder="请输入商户名称">
							</div>
							<div class="form-group">
								<label>电话</label>
								<input type="text" class="form-control" name="b_seller_tel" placeholder="请输入电话">
							</div>
							<div class="form-group">
								<label>是否官方商店</label>
								<select class="form-control" name="b_seller_official" placeholder="请选择">
									<option value="">请选择</option>
									<option value="0">是</option>
									<option value="1">否</option>
								</select>
							</div>
						</form>
						<div class="form-group" style="margin-left: 35px;margin-top: 25px;">
							<button class="btn btn-primary" onclick="search('bSellersDatatables')">
								<i class="glyphicon glyphicon-search"></i>&nbsp;检索
							</button>
							<button class="btn btn-default" onclick="resetAll('searchBSellerForm');">重置</button>
						</div>
					</fieldset>
				</div>
				<div class="panel-body">
					<table id="bSellersDatatables" class="table table-bordered table-striped table-hover">
						<thead>
							<tr>
								<th><label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" class="checkallBSeller" /><span></span></label></th>
								<th>序号</th>
								<th>商户名称</th>
								<th>电话</th>
								<th>等级</th>
								<th>是否官方商店</th>
								<th>状态</th>
								<th>地址</th>
							</tr>
						</thead>
					</table>
				</div>
			</div>
			<div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="doBSellerSelect();">保存</button>
            </div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 商户模态框（Modal）结束 -->
<script type="text/javascript" src="../view/pc/b-view/b-product-color/b-product-color-add.js"></script> 
</html>

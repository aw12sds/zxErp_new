<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ include file="/deng/include/includeboot.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="UTF-8">
<title>采购申领表详情页面</title>
</head>
<body>
  <div class="panel panel-default padding-10 no-margin">
        <legend style="padding-bottom: 10px">
        <button type="button" class="btn btn-default pull-right" onclick="goback()">
        <span class="glyphicon glyphicon-chevron-left"></span>返回
        </button> 物品申请购买单</legend>
        <fieldset>

            <div class="container-fluid">
                <div class="row col-md-8 col-md-offset-2">
                    <div class="text-center h3 pbp">物品申请购买单</div>
                    <div class="text-bold pba text-center">
                        <span style="width:100px;white-space:pre-wrap;">申请人：${applyUser.xt_userinfo_realName }</span>
                        <span style="width:100px;white-space:pre-wrap;">部门：${applyUser.xt_departinfo_name }</span>
                        <span style="width:100px">职位：${applyUser.xt_departinfo_name }</span>
                        <span style="width:200px">申请日期：${applyUser.xt_post_name }</span>
                        <input class="form-control" type="hidden" name="detail" id="detail"  value='${zxPurchaseApply.zxPurchaseApplyDetail }'>
                    </div>
                      <div style="display:none;">
                      <input class="form-control"  name="size" id="size"  value='${size }'>
                       </div>
                    <div class="pbp">
                        <ul>
                            <li>1、300元一下，部门负责人审核；300元以上，部门人审核之后，由总经理进行审核。</li>
                            <li>2、为保证，物品正常使用，应提前进行申请。</li>
                        </ul>
                    </div>
                    <form class="form-horizontal" id="defaultForm" method="post">
                    <table id="example" class="table table-bordered">
                        <thead>
                            <tr class="text-bold" style="text-align:center">
                                <th class="col-md-1 text-center">序号</th>
                                <th class="col-md-2 text-center">物品名称</th>
                                <th class="col-md-2 text-center">品牌及规格型号</th>
                                <th class="col-md-2 text-center">数量</th>
                                <th class="col-md-2 text-center">估计价格</th>
                                <th class="col-md-2 text-center">用途</th>
                               <!--  <th class="col-md-1 text-center">操作</th> -->
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th colspan="6">合计：<span>1000</span></th>
                            </tr>
                        </tfoot>
                    </table>
					</form>
                </div>

            </div>

        </fieldset>

    </div>
    <!-- <div class="form_zxPurchaseApplyDetail"> -->
    <div class="form_zxPurchaseApplyDetail" style="display:none;">
<c:forEach var="zxPurchaseApplyDetail" items="${zxPurchaseApply.zxPurchaseApplyDetail }" varStatus="zxPurchaseApplyDetailStatus">
				<div id="form_zxPurchaseApplyDetail_${zxPurchaseApplyDetailStatus.index}">
			<fieldset>
			
					
				<legend><h5>序号${zxPurchaseApplyDetailStatus.index+1}</h5></legend>
					<div class="form-group">
						<label class="col-lg-3 control-label">序列号</label>
						<div class="col-lg-6">
							<input class="form-control" type="text" maxlength="32"  data-bv-notempty data-bv-notempty-message="请输入序列号"  id="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].id" name="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].id" placeholder="请输入序列号" value="${zxPurchaseApplyDetail.id }">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3 control-label">用品id</label>
						<div class="col-lg-6">
							<input class="form-control" type="text" maxlength="32"  id="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].goods_id" name="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].goods_id" placeholder="请输入用品id" value="${zxPurchaseApplyDetail.goods_id }">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3 control-label">用品</label>
						<div class="col-lg-6">
							<input class="form-control" type="text" maxlength="32"  id="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].name" name="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].name" placeholder="请输入用品id" value="${zxPurchaseApplyDetail.name }">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3 control-label">规格型号</label>
						<div class="col-lg-6">
							<input class="form-control" type="text" maxlength="32"  id="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].standard" name="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].standard" placeholder="请输入用品id" value="${zxPurchaseApplyDetail.standard }">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3 control-label">申请数量</label>
						<div class="col-lg-6">
							<input class="form-control" type="text" maxlength="20"  id="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].amount" name="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].amount" placeholder="请输入申请数量" value="${zxPurchaseApplyDetail.amount }">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3 control-label">估计价格</label>
						<div class="col-lg-6">
							<input class="form-control" type="text" maxlength="20"  id="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].estimated_price" name="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].estimated_price" placeholder="请输入申请数量" value="${zxPurchaseApplyDetail.estimated_price }">
						</div>
					</div>
					<div class="form-group">
						<label class="col-lg-3 control-label">用途</label>
						<div class="col-lg-6">
							<input class="form-control" type="text" maxlength="255"  id="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].reason" name="zxPurchaseApplyDetail[${zxPurchaseApplyDetailStatus.index}].reason" placeholder="请输入备注" value="${zxPurchaseApplyDetail.reason }">
						</div>
					</div>
				
					
				</fieldset>
				</div>
				</c:forEach>
		 </div>
</body>
<script type="text/javascript" src="../view/pc/zx-view/zx-purchase-apply/zx-purchase-apply-detail.js"></script> 
</html>

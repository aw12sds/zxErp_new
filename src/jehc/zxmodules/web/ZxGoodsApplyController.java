package jehc.zxmodules.web;
import java.util.List;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.ui.Model;
import jehc.zxmodules.model.ZxGoodsApplyDetail;
import jehc.zxmodules.model.ZxGoodsTree;
import jehc.zxmodules.model.ZxOfficeApply;
import jehc.zxmodules.model.ZxOfficeApplyShow;
import jehc.zxmodules.model.ZxOfficeClassify;
import jehc.zxmodules.model.ZxOfficeInventory;
import jehc.zxmodules.model.ZxPurchaseApply;
import jehc.zxmodules.service.ZxGoodsApplyDetailService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.activiti.engine.impl.task.TaskDefinition;
import org.activiti.engine.task.Task;
import org.apache.commons.lang.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.github.pagehelper.PageInfo;

import jehc.lcmodules.activitiutil.ActivitiUtil;
import jehc.lcmodules.activitiutil.util.Variable;
import jehc.lcmodules.lcmodel.LcApply;
import jehc.lcmodules.lcmodel.LcApproval;
import jehc.lcmodules.lcservice.LcApplyService;
import jehc.lcmodules.lcservice.LcApprovalService;
import jehc.lcmodules.lcservice.LcDeploymentHisService;
import jehc.xtmodules.xtcore.base.BaseAction;
import jehc.xtmodules.xtcore.base.BaseSearch;
import jehc.xtmodules.xtcore.base.BaseZTreeEntity;
import jehc.xtmodules.xtcore.util.excel.poi.ExportExcel;
import jehc.xtmodules.xtmodel.XtConstant;
import jehc.xtmodules.xtmodel.XtDepartinfo;
import jehc.xtmodules.xtmodel.XtUserinfo;
import jehc.xtmodules.xtservice.XtURService;
import jehc.xtmodules.xtservice.XtUserinfoService;
import jehc.xtmodules.xtcore.util.CommonUtils;
import jehc.xtmodules.xtcore.util.UUID;
import jehc.zxmodules.model.ZxGoodsApply;
import jehc.zxmodules.service.ZxGoodsApplyService;
import jehc.zxmodules.service.ZxOfficeApplyService;
import jehc.zxmodules.service.ZxOfficeClassifyService;
import jehc.zxmodules.service.ZxOfficeInventoryService;

/**
* 办公用品主表 
* 2018-01-08 13:18:13  季建吉
*/
@Controller
@RequestMapping("/zxGoodsApplyController")
public class ZxGoodsApplyController extends BaseAction{
	@Autowired
	private ZxGoodsApplyService zxGoodsApplyService;
	@Autowired
	private ZxGoodsApplyDetailService zxGoodsApplyDetailService;
	@Autowired
	private ZxOfficeClassifyService zxOfficeClassifyService;
	@Autowired
	private XtUserinfoService xtUserinfoService;
	@Autowired
	private XtURService xtURService;
	@Autowired
	private ZxOfficeApplyService zxOfficeApplyService;
	@Autowired
	private LcDeploymentHisService lc_Deployment_HisService;
	@Autowired
	private ActivitiUtil activitiUtil;
	@Autowired
	private LcApplyService lcApplyService;
	@Autowired
	private LcApprovalService lc_ApprovalService;
	@Autowired
	private ZxOfficeInventoryService zxOfficeInventoryService;
	/**
	* 载入初始化页面
	* @param zx_goods_apply 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadZxGoodsApply(ZxGoodsApply zxGoodsApply,HttpServletRequest request){
		return new ModelAndView("pc/zx-view/zx-goods-apply/zx-goods-apply-list");
	}
	/**
	* 加载初始化列表数据并分页
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxGoodsApplyListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxGoodsApplyListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		List<ZxGoodsApply> zxGoodsApplyList = zxGoodsApplyService.getZxGoodsApplyListByCondition(condition);
		PageInfo<ZxGoodsApply> page = new PageInfo<ZxGoodsApply>(zxGoodsApplyList);
		return outPageBootStr(page,request);
	}
	/**
	* 加载初始化列表数据并分页
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxGoodsOutApplyListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxGoodsOutApplyListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		condition.put("status","3");
		List<ZxGoodsApply> zxGoodsApplyList = zxGoodsApplyService.getZxGoodsApplyListByCondition(condition);
		PageInfo<ZxGoodsApply> page = new PageInfo<ZxGoodsApply>(zxGoodsApplyList);
		return outPageBootStr(page,request);
	}
	/**
	* 获取对象
	* @param apply_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getZxGoodsApplyById",method={RequestMethod.POST,RequestMethod.GET})
	public String getZxGoodsApplyById(String apply_id,HttpServletRequest request){
		ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(apply_id);
		return outDataStr(zxGoodsApply);
	}
	/**
	* 添加
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public String addZxGoodsApply(ZxGoodsApply zxGoodsApply,HttpServletRequest request){
		int i = 0;
		if(null != zxGoodsApply && !"".equals(zxGoodsApply)){
			XtUserinfo applyUser = xtUserinfoService.getXtUserinfoById(getXtUid());
			zxGoodsApply.setApply_id(UUID.toUUID());
			zxGoodsApply.setCreate_date(DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
			zxGoodsApply.setStatus("0");
			zxGoodsApply.setReason("部门申请");
			zxGoodsApply.setUser_id(applyUser.getXt_userinfo_id());
			i=zxGoodsApplyService.addZxGoodsApply(zxGoodsApply);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	
	/**
	* 申请
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/toApply",method={RequestMethod.POST,RequestMethod.GET})
	public String toApply(String apply_id,HttpServletRequest request,Model model){
		int i = 0;
		if(null != apply_id && !"".equals(apply_id)){
			String dep_user_id = null;
			Map<String, Object> conditionr = new HashMap<String, Object>();
			conditionr.put("flag", 1);
			List<XtUserinfo> xtUserinfoList = xtURService.getXtURListByCondition(conditionr);
			ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(apply_id);
			XtConstant Xt_Constant = getXtConstantCache("zx_goods_apply");
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("xt_constant_id", Xt_Constant.getXt_constant_id());
			String lc_his_id = lc_Deployment_HisService.getLcDeploymentHisNewUnique(condition).getId();
			LcApply lc_Apply = new LcApply();
			Map<String, Object> variables = new HashMap<String, Object>();
		    variables.put("taskType","部门申请审批流程" );
		    variables.put("owner",zxGoodsApply.getUser_id());
		    lc_Apply.setLc_apply_title(getXtU().getXt_userinfo_realName()+"于"+getSimpleDateFormat()+"，提交了一条部门申请申请流程");
			lc_Apply.setLc_apply_model_biz_id(zxGoodsApply.getApply_id());
			if(activitiUtil.addApply(lc_his_id, zxGoodsApply.getApply_id(), variables,lc_Apply)){
				zxGoodsApply.setStatus("1");
				
				i=zxGoodsApplyService.updateZxGoodsApplyBySelectiveByCondition(zxGoodsApply);
			}
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 审批
	* @param id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/approvalOfficeApply",method={RequestMethod.POST,RequestMethod.GET})
	public String approvalOfficeApply(String task_id,String task_status,String remark,HttpServletRequest request){
		int i = 0;
		if(null != task_id && !"".equals(task_id)){
			Map<String, Object> taskData = activitiUtil.getTask(task_id);
		    Variable variables = new Variable();
		    ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(taskData.get("businessKey").toString());
		    String vals = task_status + "," + zxGoodsApply.getUser_id() + ",";
		    variables.setKeys("status,owner,applyType");
		    variables.setTypes("S,S,S");
		    vals +=3;
		    variables.setValues(vals);
		    String s="aa";
		    Map<String, Object> taskData1= (Map<String, Object>) activitiUtil.getTask(task_id).get("taskVariables");
		    taskData1.get("owner");
		    TaskDefinition t=activitiUtil.getNextTaskDefinition(task_id,s);
			if(activitiUtil.completeTask(task_id, variables)){
				LcApproval lc_approval = new LcApproval();
				Map<String, Object> condition = new HashMap<String, Object>();
				condition.put("processInstance_id", ((Task) taskData.get("task")).getProcessInstanceId());
				List<LcApply> list = lcApplyService.getLcApplyListByCondition(condition);
				if(!list.isEmpty()){
					lc_approval.setLc_apply_id(list.get(0).getLc_apply_id());
				}
				lc_approval.setLc_approval_id(UUID.toUUID());
				lc_approval.setLc_approval_remark(remark);
				lc_approval.setLc_approval_time(CommonUtils.getDate());
				lc_approval.setLc_status_id(task_status);
				if(task_status.equals("yes")){
					lc_approval.setLc_status_name("审批通过");
					boolean isEnd = activitiUtil.isEnded(((Task) taskData.get("task")).getProcessInstanceId());
					if(isEnd){
						zxGoodsApply.setStatus("3");
						zxGoodsApplyService.updateZxGoodsApplyBySelectiveByCondition(zxGoodsApply);
					}
				}else{
					lc_approval.setLc_status_name("审批不通过");
					zxGoodsApply.setStatus("2");
					zxGoodsApplyService.updateZxGoodsApplyBySelectiveByCondition(zxGoodsApply);
				}
				lc_approval.setTaskId(task_id);
				lc_approval.setXt_userinfo_id(CommonUtils.getXtUid());
				lc_ApprovalService.addLcApproval(lc_approval);
				i = 1;
			}else{
				i = 0;
			};
		}
		if(i>0){ 
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
}
	/**
	* 修改
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/updateZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public String updateZxGoodsApply(ZxGoodsApply zxGoodsApply,HttpServletRequest request){
		int i = 0;
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("apply_id", zxGoodsApply.getApply_id());
		List<ZxGoodsApplyDetail> zxGoodsApplyDetaillist=zxGoodsApplyDetailService.getZxGoodsApplyDetailListByCondition(condition);
		List<ZxGoodsApplyDetail> zxGoodsApplyDetaillist2=zxGoodsApply.getZxGoodsApplyDetail();
		List<ZxGoodsApplyDetail> zxGoodsApplyDetaillist3=new ArrayList<>();
		List list1=new ArrayList();
		List list2=new ArrayList();
		//数据库中id
			for(int j=0;j<zxGoodsApplyDetaillist.size();j++){
				list1.add(zxGoodsApplyDetaillist.get(j).getId());
			}
			for(int g=0;g<zxGoodsApplyDetaillist2.size();g++){
				if(zxGoodsApplyDetaillist2.get(g).getGoods_id()!=null&&zxGoodsApplyDetaillist2.get(g).getId()==null){
					zxGoodsApplyDetaillist3.add(zxGoodsApplyDetaillist2.get(g));
				}
			}
			//传入的有的id
			for(int g=0;g<zxGoodsApplyDetaillist2.size();g++){
				if(zxGoodsApplyDetaillist2.get(g).getId()!=null){
					list2.add(zxGoodsApplyDetaillist2.get(g).getId());
				}
			}
			for(int g=0;g<zxGoodsApplyDetaillist3.size();g++){
				if(zxGoodsApplyDetaillist3.get(g).getId()==null){
					zxGoodsApplyDetaillist3.get(g).setId(UUID.toUUID());
					zxGoodsApplyDetaillist3.get(g).setApply_id(zxGoodsApply.getApply_id());
					zxGoodsApplyDetaillist3.get(g).setCreate_time(DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
					zxGoodsApplyDetailService.addZxGoodsApplyDetail(zxGoodsApplyDetaillist3.get(g));
				}
			}
			//list1删除项
			list1.removeAll(list2);
			for(int g=0;g<list1.size();g++){
				Map<String, Object> condition1 = new HashMap<String, Object>();
				condition1.put("id", list1.get(g));
				i=zxGoodsApplyDetailService.delZxGoodsApplyDetailById(condition1);	
			}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	
	/**
	* 发放
	* @param zx_goods_apply 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/outZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public String outZxGoodsApply(ZxGoodsApply zxGoodsApply,HttpServletRequest request){
		int i = 0;
		if(null != zxGoodsApply && !"".equals(zxGoodsApply)){
			List<ZxGoodsApplyDetail> zxGoodsApplyDetaillist=zxGoodsApply.getZxGoodsApplyDetail();
			for(int j=0;j<zxGoodsApplyDetaillist.size();j++){
				zxOfficeInventoryService.updateOfficeInventoryByOfficeId(zxGoodsApplyDetaillist.get(j).getGoods_id(),0-zxGoodsApplyDetaillist.get(j).getAmount());
			}
			zxGoodsApply.setStatus("4");
			i=zxGoodsApplyService.updateZxGoodsApply(zxGoodsApply);
		}
		if(i>0){
			return outAudStr(true);
		}else if(i==-1){
			return outAudStr(false);
		}
		else{
			return outAudStr(false);
		}
	}
	
	/**
	* 发放
	* @param zx_office_apply 
	* @param request 
	*//*
	@ResponseBody
	@RequestMapping(value="/updateZxOfficeOut",method={RequestMethod.POST,RequestMethod.GET})
	public String updateZxOfficeOut(ZxOfficeApplyShow zxOfficeApplyShow,HttpServletRequest request){
		int i = 0;
		int j=0;
		ZxOfficeApply zxOfficeApply=new ZxOfficeApply();
		ZxOfficeInventory zxOfficeInventory=new ZxOfficeInventory();
		if(null != zxOfficeApplyShow && !"".equals(zxOfficeApplyShow)){
			if(zxOfficeApplyShow.getOffice_id().contains(","))
			{
				zxOfficeApplyShow.setOffice_id(zxOfficeApplyShow.getOffice_id().substring(0, zxOfficeApplyShow.getOffice_id().length()-1));
			}
			if(zxOfficeApplyShow.getId().contains(","))
			{
				zxOfficeApplyShow.setId(zxOfficeApplyShow.getId().substring(0, zxOfficeApplyShow.getId().length()-1));
			}
			zxOfficeApply.setId(zxOfficeApplyShow.getId());
			zxOfficeInventory.setOffice_id(zxOfficeApplyShow.getOffice_id());
			i=zxOfficeApplyService.updateZxOfficeOut(zxOfficeApply);
			double amount=zxOfficeApplyShow.getInventoryamount()-zxOfficeApplyShow.getAmount();
			zxOfficeInventory.setAmount(amount);
			j=zxOfficeApplyService.updateZxOfficeOutInventory(zxOfficeInventory);
			
		}
		if(i>0&&j>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}*/
	/**
	* 删除
	* @param apply_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/delZxGoodsApply",method={RequestMethod.POST,RequestMethod.GET})
	public String delZxGoodsApply(String apply_id,HttpServletRequest request){
		int i = 0;
		if(null != apply_id && !"".equals(apply_id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("apply_id",apply_id.split(","));
			i=zxGoodsApplyService.delZxGoodsApply(condition);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}

	
	/**
	 * 读取用户用品树（Bootstrap---ztree）
	 * @param xt_departinfo_id
	 * @param request
	 */
	@ResponseBody
	@RequestMapping(value="/getGoodsTree",method={RequestMethod.POST,RequestMethod.GET})
	public String getGoodsTree(HttpServletRequest request){
		Map<String, Object> condition = new HashMap<String, Object>();
		String expanded=request.getParameter("expanded");
		boolean expandflag;
		if(expanded.equals("true")){
			expandflag=true;
		}else{
			expandflag=false;
		}
		List<BaseZTreeEntity> list = new ArrayList<BaseZTreeEntity>();
		List<ZxGoodsTree> zxGoodsTreelist = zxGoodsApplyService.getZxGoodsTree(condition);
		for(int i = 0; i < zxGoodsTreelist.size(); i++){
			ZxGoodsTree zxGoodsTree = zxGoodsTreelist.get(i);
			BaseZTreeEntity BaseZTreeEntity = new BaseZTreeEntity();
			BaseZTreeEntity.setId(zxGoodsTree.getId());
			BaseZTreeEntity.setPid(zxGoodsTree.getParentId());
			BaseZTreeEntity.setText(zxGoodsTree.getName());
			BaseZTreeEntity.setExpanded(expandflag);
			if(zxGoodsTree.getIsoffice().equals("office")){
				BaseZTreeEntity.setIcon("../deng/images/icons/doc_minus.png");
				BaseZTreeEntity.setContent("office");
				BaseZTreeEntity.setTempObject(zxGoodsTree.getStardard());
			}else{
				BaseZTreeEntity.setIcon("../deng/images/icons/folder_minus.png");
				BaseZTreeEntity.setContent("no-office");
			}
			BaseZTreeEntity.setSingleClickExpand(true);
			list.add(BaseZTreeEntity);
		}
		return outStr(BaseZTreeEntity.buildTree(list,false));
	}
	
	/**
	 * 读取用户用品分类树（Bootstrap---ztree）
	 * @param xt_departinfo_id
	 * @param request
	 */
	@ResponseBody
	@RequestMapping(value="/getGoodsClassifyTree",method={RequestMethod.POST,RequestMethod.GET})
	public String getGoodsClassifyTree(HttpServletRequest request){
		Map<String, Object> condition = new HashMap<String, Object>();
		String expanded=request.getParameter("expanded");
		boolean expandflag;
		if(expanded.equals("true")){
			expandflag=true;
		}else{
			expandflag=false;
		}
		List<BaseZTreeEntity> list = new ArrayList<BaseZTreeEntity>();
		List<ZxGoodsTree> zxGoodsTreelist = zxGoodsApplyService.getZxGoodsTreeClassify(condition);
		for(int i = 0; i < zxGoodsTreelist.size(); i++){
			ZxGoodsTree zxGoodsTree = zxGoodsTreelist.get(i);
			BaseZTreeEntity BaseZTreeEntity = new BaseZTreeEntity();
			BaseZTreeEntity.setId(zxGoodsTree.getId());
			BaseZTreeEntity.setPid(zxGoodsTree.getParentId());
			BaseZTreeEntity.setText(zxGoodsTree.getName());
			BaseZTreeEntity.setExpanded(expandflag);
			if(zxGoodsTree.getIsoffice().equals("office")){
				BaseZTreeEntity.setIcon("../deng/images/icons/doc_minus.png");
				BaseZTreeEntity.setContent("office");
			}else{
				BaseZTreeEntity.setIcon("../deng/images/icons/folder_minus.png");
				BaseZTreeEntity.setContent("no-office");
			}
			BaseZTreeEntity.setSingleClickExpand(true);
			list.add(BaseZTreeEntity);
		}
		return outStr(BaseZTreeEntity.buildTree(list,false));
	}
	/**
	* 发送至新增页面
	* @param request 
	*/
	@RequestMapping(value="/toZxGoodsApplyAdd",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toZxGoodsApplyAdd(ZxGoodsApply zxGoodsApply,HttpServletRequest request, Model model){
		XtUserinfo applyUser = xtUserinfoService.getXtUserinfoById(getXtUid());
		model.addAttribute("applyUser", applyUser);
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");    
		model.addAttribute("applyTime", simpleDateFormat.format(new Date()));
		return new ModelAndView("pc/zx-view/zx-goods-apply/zx-goods-apply-add");
	}
	/**
	* 发送至编辑页面
	* @param request 
	*/
	@RequestMapping(value="/toZxGoodsApplyUpdate",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toZxGoodsApplyUpdate(String apply_id,HttpServletRequest request, Model model){
		ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(apply_id);
		model.addAttribute("zxGoodsApply", zxGoodsApply);
		model.addAttribute("zxGoodsApplyJSON", outItemsStr(zxGoodsApply));
		XtUserinfo applyUser = xtUserinfoService.getXtUserinfoById(getXtUid());
		model.addAttribute("applyUser", applyUser);
		model.addAttribute("size", zxGoodsApply.getZxGoodsApplyDetail().size());
		return new ModelAndView("pc/zx-view/zx-goods-apply/zx-goods-apply-update");
	}
	/**
	* 发送至明细页面
	* @param request 
	*/
	@RequestMapping(value="/toZxGoodsApplyDetail",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toZxGoodsApplyDetail(String apply_id,HttpServletRequest request, Model model){
		ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(apply_id);
		model.addAttribute("zxGoodsApply", zxGoodsApply);
		model.addAttribute("zxGoodsApplyJSON", outItemsStr(zxGoodsApply));
		XtUserinfo applyUser = xtUserinfoService.getXtUserinfoById(getXtUid());
		model.addAttribute("applyUser", applyUser);
		model.addAttribute("size", zxGoodsApply.getZxGoodsApplyDetail().size());
		return new ModelAndView("pc/zx-view/zx-goods-apply/zx-goods-apply-detail");
	}
	
	/**
	* 发送至发放明细页面
	* @param request 
	*/
	@RequestMapping(value="/toZxGoodsApplyOutDetail",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toZxGoodsApplyOutDetail(String apply_id,HttpServletRequest request, Model model){
		ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(apply_id);
		model.addAttribute("zxGoodsApply", zxGoodsApply);
		model.addAttribute("zxGoodsApplyJSON", outItemsStr(zxGoodsApply));
		XtUserinfo applyUser = xtUserinfoService.getXtUserinfoById(getXtUid());
		model.addAttribute("applyUser", applyUser);
		model.addAttribute("size", zxGoodsApply.getZxGoodsApplyDetail().size());
		return new ModelAndView("pc/zx-view/zx-office-out/zx-goods-out-detail");
	}
	/**
	* 发送页面
	* @param request 
	*/
	@RequestMapping(value="/toZxGoodsApplyOut",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toZxGoodsApplyOut(String apply_id,HttpServletRequest request, Model model){
		ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(apply_id);
		model.addAttribute("zxGoodsApply", zxGoodsApply);
		XtUserinfo applyUser = xtUserinfoService.getXtUserinfoById(getXtUid());
		model.addAttribute("applyUser", applyUser);
		model.addAttribute("size", zxGoodsApply.getZxGoodsApplyDetail().size());
		model.addAttribute("zxGoodsApplyJSON", outItemsStr(zxGoodsApply));
		return new ModelAndView("pc/zx-view/zx-office-out/zx-goods-out");
	}
	/**
	* 发送至选择
	* @param request 
	*/
	@RequestMapping(value="/toZxGoodsApplyDetailMaterial",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toZxGoodsApplyDetailMaterial(String apply_id,HttpServletRequest request, Model model){
		/*ZxGoodsApply zxGoodsApply = zxGoodsApplyService.getZxGoodsApplyById(apply_id);
		model.addAttribute("zxGoodsApply", zxGoodsApply);
		model.addAttribute("zxGoodsApplyJSON", outItemsStr(zxGoodsApply));*/
		return new ModelAndView("pc/zx-view/zx-goods-apply/zx-goods-apply-list-material");
	}
}

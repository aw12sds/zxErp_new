package jehc.bmodules.bweb;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.github.pagehelper.PageInfo;

import jehc.bmodules.bmodel.BProductColorDefault;
import jehc.bmodules.bservice.BProductColorDefaultService;
import jehc.xtmodules.xtcore.base.BaseAction;
import jehc.xtmodules.xtcore.base.BaseSearch;
import jehc.xtmodules.xtcore.util.CommonUtils;
import jehc.xtmodules.xtcore.util.UUID;
import jehc.xtmodules.xtcore.util.excel.poi.ExportExcel;

/**
* 基础商品默认颜色 
* 2016-01-19 15:38:05  邓纯杰
*/
@Controller
@RequestMapping("/bProductColorDefaultController")
public class BProductColorDefaultController extends BaseAction{
	@Autowired
	private BProductColorDefaultService bProductColorDefaultService;
	/**
	* 载入初始化页面
	* @param b_product_color_default 
	* @param request 
	* @return
	*/
	@RequestMapping(value="/loadBProductColorDefault",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView loadBProductColorDefault(BProductColorDefault b_Product_Color_Default,HttpServletRequest request,Model model){
		model.addAttribute("b_product_id", b_Product_Color_Default.getB_product_id());
		return new ModelAndView("pc/b-view/b-product-color-default/b-product-color-default-list");
	}
	/**
	* 加载初始化列表数据并分页
	* @param b_product_color_default 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getBProductColorDefaultListByCondition",method={RequestMethod.POST,RequestMethod.GET})
	public String getBProductColorDefaultListByCondition(BaseSearch baseSearch,HttpServletRequest request){
		Map<String, Object> condition = baseSearch.convert();
		commonHPager(condition,request);
		String jehcimg_base_url = CommonUtils.getXtPathCache("jehcimg_base_url").get(0).getXt_path();
		List<BProductColorDefault> b_Product_Color_DefaultList = bProductColorDefaultService.getBProductColorDefaultListByCondition(condition);
		for(int i = 0; i < b_Product_Color_DefaultList.size(); i++){
			b_Product_Color_DefaultList.get(i).setJehcimg_base_url(jehcimg_base_url);
		}
		PageInfo<BProductColorDefault> page = new PageInfo<BProductColorDefault>(b_Product_Color_DefaultList);
		return outPageBootStr(page,request);
	}
	/**
	* 获取对象
	* @param b_product_color_default_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/getBProductColorDefaultById",method={RequestMethod.POST,RequestMethod.GET})
	public String getBProductColorDefaultById(String b_product_color_default_id,HttpServletRequest request){
		BProductColorDefault b_Product_Color_Default = bProductColorDefaultService.getBProductColorDefaultById(b_product_color_default_id);
		return outDataStr(b_Product_Color_Default);
	}
	/**
	* 添加
	* @param b_product_color_default 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/addBProductColorDefault",method={RequestMethod.POST,RequestMethod.GET})
	public String addBProductColorDefault(BProductColorDefault b_Product_Color_Default,HttpServletRequest request){
		int i = 0;
		if(null != b_Product_Color_Default && !"".equals(b_Product_Color_Default)){
			b_Product_Color_Default.setB_product_color_default_id(UUID.toUUID());
			b_Product_Color_Default.setB_product_color_default_ctime(getDate());
			b_Product_Color_Default.setXt_userinfo_id(CommonUtils.getXtUid());
			i=bProductColorDefaultService.addBProductColorDefault(b_Product_Color_Default);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 修改
	* @param b_product_color_default 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/updateBProductColorDefault",method={RequestMethod.POST,RequestMethod.GET})
	public String updateBProductColorDefault(BProductColorDefault b_Product_Color_Default,HttpServletRequest request){
		int i = 0;
		if(null != b_Product_Color_Default && !"".equals(b_Product_Color_Default)){
			b_Product_Color_Default.setB_product_color_default_mtime(getDate());
			i=bProductColorDefaultService.updateBProductColorDefault(b_Product_Color_Default);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 删除
	* @param b_product_color_default_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/delBProductColorDefault",method={RequestMethod.POST,RequestMethod.GET})
	public String delBProductColorDefault(String b_product_color_default_id,HttpServletRequest request){
		int i = 0;
		if(null != b_product_color_default_id && !"".equals(b_product_color_default_id)){
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("b_product_color_default_id",b_product_color_default_id.split(","));
			i=bProductColorDefaultService.delBProductColorDefault(condition);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 复制一行并生成记录
	* @param b_product_color_default_id 
	* @param request 
	*/
	@ResponseBody
	@RequestMapping(value="/copyBProductColorDefault",method={RequestMethod.POST,RequestMethod.GET})
	public String copyBProductColorDefault(String b_product_color_default_id,HttpServletRequest request){
		int i = 0;
		BProductColorDefault b_Product_Color_Default = bProductColorDefaultService.getBProductColorDefaultById(b_product_color_default_id);
		if(null != b_Product_Color_Default && !"".equals(b_Product_Color_Default)){
			b_Product_Color_Default.setB_product_color_default_id(UUID.toUUID());
			b_Product_Color_Default.setB_product_color_default_ctime(getDate());
			i=bProductColorDefaultService.addBProductColorDefault(b_Product_Color_Default);
		}
		if(i>0){
			return outAudStr(true);
		}else{
			return outAudStr(false);
		}
	}
	/**
	* 导出
	* @param excleData 
	* @param excleHeader 
	* @param excleText 
	* @param request 
	* @param request 
	*/
	@RequestMapping(value="/exportBProductColorDefault",method={RequestMethod.POST,RequestMethod.GET})
	public void exportBProductColorDefault(String excleData,String excleHeader,String excleText,HttpServletRequest request,HttpServletResponse response){
		ExportExcel exportExcel = new ExportExcel();
		exportExcel.exportExcel(excleData, excleHeader,excleText,response);
	}
	
	/**
	* 发送至新增页面
	* @param request 
	*/
	@RequestMapping(value="/toBProductColorDefaultAdd",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toBProductColorDefaultAdd(BProductColorDefault bProductColorDefault,HttpServletRequest request, Model model){
		model.addAttribute("b_product_id", bProductColorDefault.getB_product_id());
		return new ModelAndView("pc/b-view/b-product-color-default/b-product-color-default-add");
	}
	/**
	* 发送至编辑页面
	* @param request 
	*/
	@RequestMapping(value="/toBProductColorDefaultUpdate",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toBProductColorDefaultUpdate(String b_product_color_default_id,HttpServletRequest request, Model model){
		BProductColorDefault bProductColorDefault = bProductColorDefaultService.getBProductColorDefaultById(b_product_color_default_id);
		model.addAttribute("bProductColorDefault", bProductColorDefault);
		return new ModelAndView("pc/b-view/b-product-color-default/b-product-color-default-update");
	}
	/**
	* 发送至明细页面
	* @param request 
	*/
	@RequestMapping(value="/toBProductColorDefaultDetail",method={RequestMethod.POST,RequestMethod.GET})
	public ModelAndView toBProductColorDefaultDetail(String b_product_color_default_id,HttpServletRequest request, Model model){
		BProductColorDefault bProductColorDefault = bProductColorDefaultService.getBProductColorDefaultById(b_product_color_default_id);
		model.addAttribute("bProductColorDefault", bProductColorDefault);
		return new ModelAndView("pc/b-view/b-product-color-default/b-product-color-default-detail");
	}
}

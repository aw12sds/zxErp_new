package jehc.zxmodules.dao;
import java.util.List;
import java.util.Map;

import jehc.zxmodules.model.ZxMaterialClassify;
import jehc.zxmodules.model.ZxOfficeClassify;

/**
* 办公用品分类 
* 2017-11-30 08:41:46  季建吉
*/
public interface ZxOfficeClassifyDao{
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<ZxOfficeClassify> getZxOfficeClassifyListByCondition(Map<String,Object> condition);
	
	/**
	 * 查找所有根分类
	 * @return
	 */
	public List<ZxOfficeClassify> getZxOfficeClassifyList();
	
	/**
	 * 查找非父菜单分类
	 * @return
	 */
	public List<ZxOfficeClassify> getZxOfficeClassifyListAllChild(Map<String, Object> condition);
	
	/**
	 * 查找子分类
	 * @param condition
	 * @return
	 */
	public List<ZxOfficeClassify> getZxOfficeClassifyListChild();
	
	/**
	 * 查找父分类下的子分类
	 * @param condition
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<ZxOfficeClassify> getZxOfficeClassifyByParent(String id);
	
	/**
	 * 查询所有分类
	 * @param condition
	 * @return
	 */
	public List<ZxOfficeClassify> getZxOfficeClassifyListAll(Map<String, Object> condition);
	/**
	* 查询对象
	* @param classify_id 
	* @return
	*/
	public ZxOfficeClassify getZxOfficeClassifyById(String classify_id);
	/**
	* 查询对象
	* @param classify_id 
	* @return
	*/
	
	
	public int addZxOfficeClassify(ZxOfficeClassify zxOfficeClassify);
	/**
	* 修改子页
	* @param zx_office_classify 
	* @return
	*/
	public int updateZxOfficeClassifyLeaf(String id);
	/**
	* 修改
	* @param zx_office_classify 
	* @return
	*/
	public int updateZxOfficeClassify(ZxOfficeClassify zxOfficeClassify);
	/**
	* 修改（根据动态条件）
	* @param zx_office_classify 
	* @return
	*/
	public int updateZxOfficeClassifyBySelective(ZxOfficeClassify zxOfficeClassify);
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delZxOfficeClassify(Map<String,Object> condition);
	/**
	* 批量添加
	* @param zx_office_classifyList 
	* @return
	*/
	public int addBatchZxOfficeClassify(List<ZxOfficeClassify> zxOfficeClassifyList);
	/**
	* 批量修改
	* @param zx_office_classifyList 
	* @return
	*/
	public int updateBatchZxOfficeClassify(List<ZxOfficeClassify> zxOfficeClassifyList);
	/**
	* 批量修改（根据动态条件）
	* @param zx_office_classifyList 
	* @return
	*/
	public int updateBatchZxOfficeClassifyBySelective(List<ZxOfficeClassify> zxOfficeClassifyList);
}

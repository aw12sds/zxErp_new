package jehc.xtmodules.xtdao;
import java.util.List;
import java.util.Map;

import jehc.xtmodules.xtmodel.XtMR;

/**
* 资源角色; InnoDB free: 6144 kB 
* 2015-08-04 16:27:46  邓纯杰
*/
public interface XtMRDao{
	/**
	* 分页
	* @param condition 
	* @return
	*/
	public List<XtMR> getXtMRListByCondition(Map<String,Object> condition);
	/**
	* 查询对象
	* @param xt_m_r_id 
	* @return
	*/
	public XtMR getXtMRById(String xt_m_r_id);
	/**
	* 添加
	* @param xt_m_r 
	* @return
	*/
	public int addXtMR(XtMR xt_M_R);
	/**
	* 修改
	* @param xt_m_r 
	* @return
	*/
	public int updateXtMR(XtMR xt_M_R);
	/**
	* 删除
	* @param condition 
	* @return
	*/
	public int delXtMR(Map<String,Object> condition);
	
	/**
	 * 批量添加
	 * @param xt_M_RList
	 * @return
	 */
	public int addBatchXtMR(List<XtMR> xt_M_RList);
}

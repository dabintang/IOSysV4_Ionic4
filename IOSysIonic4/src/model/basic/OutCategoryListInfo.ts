import { BaseListInfo } from '../comm/BaseListInfo';

//支出分类列表
export class OutCategoryListInfo extends BaseListInfo {
  id: number; //主键
  name: string; //名称
  isActive: boolean; //是否可用
}
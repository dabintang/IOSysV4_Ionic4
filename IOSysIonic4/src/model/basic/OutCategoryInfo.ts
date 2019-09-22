import { BaseInfo } from '../comm/BaseInfo';

//支出分类
export class OutCategoryInfo extends BaseInfo {
  id: number; //主键
  name: string; //名称
  isActive: boolean; //是否可用
  remark: boolean; //备注
}

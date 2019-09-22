import { BaseInfo } from '../comm/BaseInfo';

//支出类型
export class OutTypeInfo extends BaseInfo {
  id: number; //主键
  outCategoryID: number; //支出分类ID
  name: string; //名称
  amountAccountID: number; //默认账户
  isActive: boolean; //是否可用
  remark: boolean; //备注
}

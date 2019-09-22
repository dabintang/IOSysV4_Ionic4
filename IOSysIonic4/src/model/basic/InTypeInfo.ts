import { BaseInfo } from '../comm/BaseInfo';

//收入类型
export class InTypeInfo extends BaseInfo {
  id: number; //主键
  name: string; //名称
  amountAccountID: number; //默认账户
  isActive: boolean; //是否可用
  remark: boolean; //备注
}

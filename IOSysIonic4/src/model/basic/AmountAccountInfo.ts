import { BaseInfo } from '../comm/BaseInfo';

//账户
export class AmountAccountInfo extends BaseInfo {
  id: number; //主键
  name: string; //名称
  amount: number; //金额
  isActive: boolean; //是否可用
  remark: boolean; //备注
}

import { BaseListInfo } from '../comm/BaseListInfo';

//账户列表
export class AmountAccountListInfo extends BaseListInfo {
  id: number; //主键
  name: string; //名称
  amount: number; //金额
  isActive: boolean; //是否可用
}
import { BaseListInfo } from '../comm/BaseListInfo';

//收入列表
export class InComeListInfo extends BaseListInfo {
  id: number; //主键
  inTypeName: string; //收入类型名称
  amountAccountName: string; //账户名称
  amount: number; //金额
}
import { BaseListInfo } from '../comm/BaseListInfo';

//借还列表
export class BorrowRepayListInfo extends BaseListInfo {
  id: number; //主键
  target: string; //对方名称
  brTypeName: string; //借还类型名称
  amountAccountName: string; //账户名称
  amount: number; //金额
}
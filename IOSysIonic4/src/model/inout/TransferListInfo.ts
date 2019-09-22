import { BaseListInfo } from '../comm/BaseListInfo';

//转账列表
export class TransferListInfo extends BaseListInfo {
  id: number; //主键
  fromAmountAccountName: string; //源账户名称
  toAmountAccountName: string; //目标账户名称
  amount: number; //金额
}
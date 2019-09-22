import { BaseInfo } from '../comm/BaseInfo';

//转账信息
export class TransferInfo extends BaseInfo {
  id: number; //主键
  transferDate: Date; //转账日期
  fromAmountAccountID: number; //源账户ID
  toAmountAccountID: number; //目标账户ID
  amount: number; //金额
  remark: string; //备注
}
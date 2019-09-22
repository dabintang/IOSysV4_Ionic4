import { BaseInfo } from '../comm/BaseInfo';

//收入
export class InComeInfo extends BaseInfo {
  id: number; //主键
  inDate: Date; //收入日期
  inTypeID: number; //收入类型ID
  amountAccountID: number; //账户ID
  amount: number; //金额
  remark: string; //备注
}
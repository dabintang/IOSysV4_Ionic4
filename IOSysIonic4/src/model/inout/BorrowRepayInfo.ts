import { BaseInfo } from '../comm/BaseInfo';

//借还
export class BorrowRepayInfo extends BaseInfo {
  id: number; //主键
  brDate: Date; //借还日期
  target: string; //对方名称
  brType: number; //借还类型
  amountAccountID: number; //账户ID
  amount: number; //金额
  remark: string; //备注
}
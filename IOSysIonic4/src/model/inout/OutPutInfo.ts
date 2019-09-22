import { BaseInfo } from '../comm/BaseInfo';

//支出信息
export class OutPutInfo extends BaseInfo {
  id: number; //主键
  outDate: Date; //支出日期
  outTypeID: number; //支出类型ID
  amountAccountID: number; //账户ID
  amount: number; //金额
  remark: string; //备注
}
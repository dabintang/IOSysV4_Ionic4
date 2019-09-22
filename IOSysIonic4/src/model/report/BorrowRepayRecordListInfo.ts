import { BaseListInfo } from '../comm/BaseListInfo';

//借还明细查询结果
export class BorrowRepayRecordListInfo extends BaseListInfo {
  seq: number; //顺序
  id: number; //主键
  brDate: Date; //借还日期
  target: string; //对方名称
  brType: number; //借还类型
  brTypeName: string; //借还类型名称
  amountAccountName: string; //账户名称
  amount: number; //金额
  remark: string; //备注
}

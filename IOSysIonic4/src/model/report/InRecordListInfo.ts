import { BaseListInfo } from '../comm/BaseListInfo';

//收入明细查询结果
export class InRecordListInfo extends BaseListInfo {
  seq: number; //顺序
  id: number; //主键
  inDate: Date; //收入日期
  inTypeName: string; //收入类型名称
  amountAccountName: string; //账户名称
  amount: number; //金额
  remark: string; //备注
}

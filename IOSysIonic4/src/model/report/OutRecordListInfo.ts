import { BaseListInfo } from '../comm/BaseListInfo';

//支出明细查询结果
export class OutRecordListInfo extends BaseListInfo {
  seq: number; //顺序
  id: number; //主键
  outDate: Date; //支出日期
  outCategoryName: string; //支出分类名称
  outTypeName: string; //支出类型名称
  amountAccountName: string; //账户名称
  amount: number; //金额
  remark: string; //备注
}

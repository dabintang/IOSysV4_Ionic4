import { BaseListInfo } from '../comm/BaseListInfo';

//支出列表
export class OutPutListInfo extends BaseListInfo {
  id: number; //主键
  outCategoryName: string; //支出分类名称
  outTypeName: string; //支出类型名称
  amountAccountName: string; //账户名称
  amount: number; //金额
}
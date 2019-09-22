import { BaseListInfo } from '../comm/BaseListInfo';

//月份支出类型统计
export class MonthOutTypeSumListInfo extends BaseListInfo {
  id: number; //支出类型ID
  name: string; //支出类型名称
  amount: number; //金额
}

import { BaseListInfo } from '../comm/BaseListInfo';
import { MonthOutTypeSumListInfo } from './MonthOutTypeSumListInfo';
import { EnmDataType } from '../enums/enmDataType';

//月份支出分类统计
export class MonthOutCategorySumListInfo extends BaseListInfo {
  id: number; //支出分类ID
  name: string; //支出分类名称
  dataType: EnmDataType; //数据类型
  amount: number; //金额
  lstSumOutType: Array<MonthOutTypeSumListInfo>; //月份支出类型统计
}

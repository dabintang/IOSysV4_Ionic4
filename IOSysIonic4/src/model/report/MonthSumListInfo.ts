import { SumListInfo } from '../comm/SumListInfo';
import { EnmDataType } from '../enums/enmDataType';

//月份统计结果
export class MonthSumListInfo<T> extends SumListInfo<T> {
  dataType: EnmDataType; //数据类型
  dataTypeName: string; //数据类型名称
}

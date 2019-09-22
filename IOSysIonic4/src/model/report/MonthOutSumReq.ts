import { EnmInGroupType } from '../enums/EnmInGroupType';
import { MonthSumReq } from './MonthSumReq';

//月份支出统计条件
export class MonthOutSumReq extends MonthSumReq {
  month: Date; //月份
}

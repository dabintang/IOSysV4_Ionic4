import { BaseReq } from '../comm/BaseReq';

//月份统计条件
export class MonthSumReq extends BaseReq {
  year: number; //年份（可选；不传时统计全部年份）
  isContainBorrowRepay: boolean; //是否包含借还
}

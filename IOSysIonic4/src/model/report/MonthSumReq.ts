import { BaseReq } from '../comm/BaseReq';

//月份统计条件
export class MonthSumReq extends BaseReq {
  isContainBorrowRepay: boolean; //是否包含借还
}

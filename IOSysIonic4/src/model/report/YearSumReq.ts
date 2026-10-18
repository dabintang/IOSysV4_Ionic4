import { BaseReq } from '../comm/BaseReq';

//年度统计条件
export class YearSumReq extends BaseReq {
  isContainBorrowRepay: boolean; //是否包含借还
}

import { BaseReq } from '../comm/BaseReq';
import { EnmInGroupType } from '../enums/EnmInGroupType';

//收入统计条件
export class InSumReq extends BaseReq {
  startDate?: Date; //开始日期
  endDate?: Date; //截止日期
  groupType?: EnmInGroupType; //统计类型
  isContainBorrowRepay?: boolean; //是否包含借还
}

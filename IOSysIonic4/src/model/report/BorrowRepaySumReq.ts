import { BaseReq } from '../comm/BaseReq';
import { EnmBorrowRepayGroupType } from '../enums/EnmBorrowRepayGroupType';

//借还统计条件
export class BorrowRepaySumReq extends BaseReq {
  groupType: EnmBorrowRepayGroupType; //统计类型
  isShowZero: boolean; //是否显示已还清记录
}

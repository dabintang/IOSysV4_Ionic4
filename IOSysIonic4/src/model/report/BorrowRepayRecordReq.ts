import { EnmBorrowRepayGroupType } from '../enums/EnmBorrowRepayGroupType';
import { PageBaseReq } from '../comm/PageBaseReq';

//借还统计条件
export class BorrowRepayRecordReq extends PageBaseReq {
  startDate?: Date; //开始日期
  endDate?: Date; //截止日期
  target: string; //对方名称
  lstBRType: Array<number>; //借还类型集合
  lstAmountAccountID: Array<number>; //账户ID集合
  remark: string; //备注（模糊匹配）
}
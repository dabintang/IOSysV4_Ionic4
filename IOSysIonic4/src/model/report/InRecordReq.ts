import { PageBaseReq } from '../comm/PageBaseReq';

//收入明细查询条件
export class InRecordReq extends PageBaseReq {
  startDate?: Date; //开始日期
  endDate?: Date; //截止日期
  lstInTypeID: Array<number>; //收入类型ID集合
  lstAmountAccountID: Array<number>; //账户ID集合
  remark: string; //备注（模糊匹配）
}

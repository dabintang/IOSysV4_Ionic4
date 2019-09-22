import { BaseReq } from '../comm/BaseReq';

//账号流水 请求类
export class AccountTurnoverListReq extends BaseReq {
  month: Date; //月份
  lstAmountAccountID: Array<number>; //账户ID集合
}
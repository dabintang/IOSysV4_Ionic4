import { BaseListInfo } from '../comm/BaseListInfo';
import { EnmDataType } from '../enums/enmDataType';

//账号流水列表信息
export class AccountTurnoverListInfo extends BaseListInfo {
  dataType: EnmDataType; //数据类型
  id: number; //主键
  date: Date; //日期
  amountAccountName: string; //账户名称
  typeName: string; //类型名称
  amount: number; //金额
}
import { BaseListInfo } from '../comm/BaseListInfo';

//收入类型列表
export class InTypeListInfo extends BaseListInfo {
  id: number; //主键
  name: string; //名称
  amountAccountID: number; //默认账户
  isActive: boolean; //是否可用
}

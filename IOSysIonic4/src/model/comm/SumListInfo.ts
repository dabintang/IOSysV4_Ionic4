import { BaseListInfo } from './BaseListInfo';

//统计结果
export class SumListInfo<T> extends BaseListInfo {
  name: string; //分组名
  value: number; //结果
}

import { ResultList } from './ResultList';

//月份合计金额的分页结果
export class ResultPageMonthAmountList<T> extends ResultList<T> {
  month: Date; //月份
  totalAmount: number; //合计金额
  hasPreMonth: boolean; //是否还有前一个月的数据
}
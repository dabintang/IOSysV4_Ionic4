import { ResultPageList } from './ResultPageList';

//带合计金额的分页结果
export class ResultPageAmountList<T> extends ResultPageList<T> {
  totalAmount: number; //合计金额
}
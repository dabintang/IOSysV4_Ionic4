//月度收支结余统计结果（同一月份的收入、支出合并为一行）
export class MonthInOutSumListInfo {
  month: string; //月份（yyyy-MM）
  inAmount: number; //月度收入
  outAmount: number; //月度支出（正数）
  balance: number; //月度结余（收入-支出）
  isExpand: boolean; //是否展开收入、支出明细（界面状态）
}

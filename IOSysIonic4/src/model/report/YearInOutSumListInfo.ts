//年度收支结余统计结果（同一年度的收入、支出合并为一行）
export class YearInOutSumListInfo {
  year: string; //年份
  inAmount: number; //年度收入
  outAmount: number; //年度支出（正数）
  balance: number; //年度结余（收入-支出）
}

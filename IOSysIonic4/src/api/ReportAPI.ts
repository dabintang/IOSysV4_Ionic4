import { Injectable } from '@angular/core';
import { API } from './API';
import { ResultInfo } from 'src/model/comm/ResultInfo';
import { UserTotalInfo } from 'src/model/report/UserTotalInfo';
import { ResultPageMonthAmountList } from 'src/model/comm/ResultPageMonthAmountList';
import { AccountTurnoverListInfo } from 'src/model/report/AccountTurnoverListInfo';
import { AccountTurnoverListReq } from 'src/model/report/AccountTurnoverListReq';
import { BorrowRepaySumReq } from 'src/model/report/BorrowRepaySumReq';
import { SumListInfo } from 'src/model/comm/SumListInfo';
import { ResultList } from 'src/model/comm/ResultList';
import { BorrowRepayRecordReq } from 'src/model/report/BorrowRepayRecordReq';
import { ResultPageList } from 'src/model/comm/ResultPageList';
import { BorrowRepayRecordListInfo } from 'src/model/report/BorrowRepayRecordListInfo';
import { MonthSumListInfo } from 'src/model/report/MonthSumListInfo';
import { MonthSumReq } from 'src/model/report/MonthSumReq';
import { InSumReq } from 'src/model/report/InSumReq';
import { InRecordReq } from 'src/model/report/InRecordReq';
import { ResultPageAmountList } from 'src/model/comm/ResultPageAmountList';
import { InRecordListInfo } from 'src/model/report/InRecordListInfo';
import { OutRecordReq } from 'src/model/report/OutRecordReq';
import { OutRecordListInfo } from 'src/model/report/OutRecordListInfo';
import { MonthOutSumReq } from 'src/model/report/MonthOutSumReq';
import { MonthOutCategorySumListInfo } from 'src/model/report/MonthOutCategorySumListInfo';

@Injectable()
export class ReportAPI {
  //构造函数
  constructor(private api: API) { }

  //查询账户流水明细列表
  async queryAccountTurnover(req: AccountTurnoverListReq, showLoader: boolean = true): Promise<ResultPageMonthAmountList<AccountTurnoverListInfo>> {
    return await this.api.postReq<ResultPageMonthAmountList<AccountTurnoverListInfo>>(
      '/api/Report/QueryAccountTurnover',
      req,
      showLoader
    );
  }

  //查询借还明细列表
  async queryBorrowRepayRecord(req: BorrowRepayRecordReq, showLoader: boolean = true): Promise<ResultPageList<BorrowRepayRecordListInfo>> {
    return await this.api.postReq<ResultPageList<BorrowRepayRecordListInfo>>(
      '/api/Report/QueryBorrowRepayRecord',
      req,
      showLoader
    );
  }

  //查询收入明细列表
  async queryInRecord(req: InRecordReq, showLoader: boolean = true): Promise<ResultPageAmountList<InRecordListInfo>> {
    return await this.api.postReq<ResultPageAmountList<InRecordListInfo>>(
      '/api/Report/QueryInRecord',
      req,
      showLoader
    );
  }

  //查询支出明细列表
  async queryOutRecord(req: OutRecordReq, showLoader: boolean = true): Promise<ResultPageAmountList<OutRecordListInfo>> {
    return await this.api.postReq<ResultPageAmountList<OutRecordListInfo>>(
      '/api/Report/QueryOutRecord',
      req,
      showLoader
    );
  }

  //用户收支统计
  async sumUserTotal(showLoader: boolean = true): Promise<ResultInfo<UserTotalInfo>> {
    return await this.api.get<ResultInfo<UserTotalInfo>>(
      '/api/Report/SumUserTotal',
      null,
      showLoader
    );
  }

  //借还统计
  async sumBorrowRepayTarget(req: BorrowRepaySumReq, showLoader: boolean = true): Promise<ResultList<SumListInfo<string>>> {
    return await this.api.get<ResultList<SumListInfo<string>>>(
      '/api/Report/SumBorrowRepayTarget',
      req,
      showLoader
    );
  }

  //月份统计
  async sumMonth(req: MonthSumReq, showLoader: boolean = true): Promise<ResultList<MonthSumListInfo<string>>> {
    return await this.api.get<ResultList<MonthSumListInfo<string>>>(
      '/api/Report/SumMonth',
      req,
      showLoader
    );
  }

  //收入统计
  async sumInCome(req: InSumReq, showLoader: boolean = true): Promise<ResultList<SumListInfo<string>>> {
    return await this.api.get<ResultList<SumListInfo<string>>>(
      '/api/Report/SumInCome',
      req,
      showLoader
    );
  }

  //月份支出统计
  async sumMonthOut(req: MonthOutSumReq, showLoader: boolean = true): Promise<ResultList<MonthOutCategorySumListInfo>> {
    return await this.api.get<ResultList<MonthOutCategorySumListInfo>>(
      '/api/Report/SumMonthOut',
      req,
      showLoader
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { SumListInfo } from 'src/model/comm/SumListInfo';
import { BasePage } from 'src/app/base/BasePage';
import { ReportAPI } from 'src/api/ReportAPI';
import { BorrowRepaySumReq } from 'src/model/report/BorrowRepaySumReq';
import { EnmBorrowRepayGroupType } from 'src/model/enums/EnmBorrowRepayGroupType';

@Component({
  selector: 'app-borrow-repay-sum-list',
  templateUrl: './borrow-repay-sum-list.page.html',
  styleUrls: ['./borrow-repay-sum-list.page.scss'],
})
export class BorrowRepaySumListPage extends BasePage implements OnInit {

  //列表
  list: Array<SumListInfo<string>>;

  constructor(
    private rptAPI: ReportAPI
  ) {
    super();
  }

  ngOnInit() {
    //初始化
    this.initPage();
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<SumListInfo<string>>> {
    //条件
    let req = new BorrowRepaySumReq();
    req.groupType = EnmBorrowRepayGroupType.Target;
    req.isShowZero = false;

    //查询列表
    const lstInfo = (await this.rptAPI.sumBorrowRepayTarget(req, showLoader)).lstInfo;
    return lstInfo;
  }

  //初始化
  async initPage() {
    //查询
    this.list = await this.search();
  }

  //刷新
  async doRefresh(event: any) {
    //查询
    this.list = await this.search(false);

    //刷新完成
    event.target.complete();
  }
}

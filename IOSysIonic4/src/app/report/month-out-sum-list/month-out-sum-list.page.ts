import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ReportAPI } from 'src/api/ReportAPI';
import { BasicAPI } from 'src/api/BasicAPI';
import { BasicStore } from 'src/store/BasicStore';
import { MonthOutCategorySumListInfo } from 'src/model/report/MonthOutCategorySumListInfo';
import { DateHelper } from 'src/helper/DateHelper';
import { MonthOutSumReq } from 'src/model/report/MonthOutSumReq';
import { MonthOutTypeSumListInfo } from 'src/model/report/MonthOutTypeSumListInfo';

@Component({
  selector: 'app-month-out-sum-list',
  templateUrl: './month-out-sum-list.page.html',
  styleUrls: ['./month-out-sum-list.page.scss'],
})
export class MonthOutSumListPage extends BasePage implements OnInit {

  isContainBorrowRepay: boolean; //是否包含借还
  reqMonth: Date; //月份
  list: Array<MonthOutCategorySumListInfo>; //列表

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private rptAPI: ReportAPI,
    private basicAPI: BasicAPI,
    private basicStore: BasicStore,
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.reqMonth = DateHelper.parse(params.month);
      this.isContainBorrowRepay = params.isContainBorrowRepay;

      //初始化
      this.initPage();
    });
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<MonthOutCategorySumListInfo>> {
    //条件
    let req = new MonthOutSumReq();
    req.month = this.reqMonth;
    req.isContainBorrowRepay = this.isContainBorrowRepay;

    //查询列表
    const lstInfo = (await this.rptAPI.sumMonthOut(req, showLoader)).lstInfo;
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

  //计算总金额
  totalAmount(): number {
    let total = 0;
    if (this.list) {
      this.list.forEach(item => {
        total += item.amount;
      });
    }

    return total;
  }

  //跳转到收支统计明细页面
  async openDetail(itemOC: MonthOutCategorySumListInfo, itemOT: MonthOutTypeSumListInfo) {
    this.router.navigate(
      ['tabs/reportTab/monthInOutSumDetailList'],
      {
        queryParams: {
          month: DateHelper.format(this.reqMonth),
          dataType: itemOC.dataType,
          groupID: itemOT.id,
          groupName: itemOT.name
        }
  });
}
}

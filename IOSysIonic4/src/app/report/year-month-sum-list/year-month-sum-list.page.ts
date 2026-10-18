import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { ReportAPI } from 'src/api/ReportAPI';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MonthSumListInfo } from 'src/model/report/MonthSumListInfo';
import { MonthSumReq } from 'src/model/report/MonthSumReq';
import { EnmDataType } from 'src/model/enums/enmDataType';

@Component({
  selector: 'app-year-month-sum-list',
  templateUrl: './year-month-sum-list.page.html',
  styleUrls: ['./year-month-sum-list.page.scss'],
})
//年度内月份（收入或支出）统计页面
export class YearMonthSumListPage extends BasePage implements OnInit {

  isContainBorrowRepay: boolean; //是否包含借还
  reqYear: number; //年份
  dataType: EnmDataType; //数据类型（1：收入；2：支出）
  dataTypeName: string; //数据类型名称
  list: Array<MonthSumListInfo<string>>; //列表

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private rptAPI: ReportAPI,
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.reqYear = Number(params.year);
      this.dataType = Number(params.dataType);
      this.dataTypeName = this.dataType == EnmDataType.In ? '收入' : '支出';
      this.isContainBorrowRepay = params.isContainBorrowRepay;

      //初始化
      this.initPage();
    });
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<MonthSumListInfo<string>>> {
    //条件
    let req = new MonthSumReq();
    req.year = this.reqYear;
    req.isContainBorrowRepay = this.isContainBorrowRepay;

    //查询列表（该年份的月份统计）
    const lstInfo = (await this.rptAPI.sumMonth(req, showLoader)).lstInfo;

    //只保留当前数据类型（收入/支出）
    return lstInfo.filter(m => m.dataType == this.dataType);
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
        total += item.value;
      });
    }

    return total;
  }

  //跳转到统计指定月份的收入/支出页面
  clickItem(item: MonthSumListInfo<string>) {
    switch (item.dataType) {
      case EnmDataType.In:
        this.router.navigate(
          ['tabs/reportTab/monthInSumList'],
          { queryParams: { month: item.name + '-01', isContainBorrowRepay: this.isContainBorrowRepay } });
        break;
      case EnmDataType.Out:
        this.router.navigate(
          ['tabs/reportTab/monthOutSumList'],
          { queryParams: { month: item.name + '-01', isContainBorrowRepay: this.isContainBorrowRepay } });
        break;
    }
  }
}

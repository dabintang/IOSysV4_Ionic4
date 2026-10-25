import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { YearSumListInfo } from 'src/model/report/YearSumListInfo';
import { YearInOutSumListInfo } from 'src/model/report/YearInOutSumListInfo';
import { ReportAPI } from 'src/api/ReportAPI';
import { YearSumReq } from 'src/model/report/YearSumReq';
import { PopoverController } from '@ionic/angular';
import { MonthSumPopComponent } from 'src/app/components/month-sum-pop/month-sum-pop.component';
import { MonthSumPop } from 'src/model/report/MonthSumPop';
import { EnmShowInOutType } from 'src/model/enums/EnmShowInOutType';
import { EnmDataType } from 'src/model/enums/enmDataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-year-in-out-sum-list',
  templateUrl: './year-in-out-sum-list.page.html',
  styleUrls: ['./year-in-out-sum-list.page.scss'],
})
//年度结余统计页面（同一年度的收入、支出合并为一行）
export class YearInOutSumListPage extends BasePage implements OnInit {

  //条件
  req: YearSumReq = new YearSumReq();
  //弹框筛选条件
  reqPop: MonthSumPop = new MonthSumPop();
  //列表
  list: Array<YearInOutSumListInfo>;

  constructor(
    private rptAPI: ReportAPI,
    private router: Router,
    private popCtrl: PopoverController) {
    super();
  }

  ngOnInit() {
    this.reqPop.isContainBorrowRepay = false;
    //本页面只保留“是否包含借还”一个筛选项
    this.reqPop.isShowInOutFilter = false;
    this.reqPop.enmShowInOutType = EnmShowInOutType.All;

    //初始化
    this.initPage();
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<YearInOutSumListInfo>> {
    //条件
    this.req.isContainBorrowRepay = this.reqPop.isContainBorrowRepay;

    //查询列表（按年度的收入、支出）
    const lstInfo = (await this.rptAPI.sumYear(this.req, showLoader)).lstInfo;

    //合并同一年度
    return this.sumByYear(lstInfo);
  }

  //把同一年度的收入、支出合并为一行
  private sumByYear(lstInfo: Array<YearSumListInfo<string>>): Array<YearInOutSumListInfo> {
    const list = new Array<YearInOutSumListInfo>();
    if (!lstInfo) {
      return list;
    }

    lstInfo.forEach(item => {
      //取（或新建）该年度的记录
      let info = list.find(m => m.year == item.name);
      if (!info) {
        info = new YearInOutSumListInfo();
        info.year = item.name;
        info.inAmount = 0;
        info.outAmount = 0;
        list.push(info);
      }

      //累加收入、支出（服务端返回的支出为负数，这里转为正数）
      switch (item.dataType) {
        case EnmDataType.In:
          info.inAmount += item.value;
          break;
        case EnmDataType.Out:
          info.outAmount += -item.value;
          break;
      }
    });

    //计算结余
    list.forEach(info => info.balance = info.inAmount - info.outAmount);

    //按年份倒序
    return list.sort((a, b) => Number(b.year) - Number(a.year));
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

  //显示筛选弹框
  async shouPop(event: Event) {
    //筛选弹框
    const popover = await this.popCtrl.create({
      component: MonthSumPopComponent,
      event: event,
      componentProps: { reqPop: this.reqPop }
    });

    //打开筛选弹框
    await popover.present();

    //筛选弹框返回
    await popover.onDidDismiss();

    //如果是否包含借还条件有变化
    if (this.req.isContainBorrowRepay != this.reqPop.isContainBorrowRepay) {
      this.initPage();
    }
  }

  //跳转到统计指定年份的月份结余页面
  clickItem(item: YearInOutSumListInfo) {
    this.router.navigate(
      ['tabs/reportTab/monthInOutSumList'],
      { queryParams: { year: item.year, isContainBorrowRepay: this.reqPop.isContainBorrowRepay } });
  }
}

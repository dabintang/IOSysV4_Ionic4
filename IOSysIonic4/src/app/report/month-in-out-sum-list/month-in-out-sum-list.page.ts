import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { MonthSumListInfo } from 'src/model/report/MonthSumListInfo';
import { MonthInOutSumListInfo } from 'src/model/report/MonthInOutSumListInfo';
import { ReportAPI } from 'src/api/ReportAPI';
import { MonthSumReq } from 'src/model/report/MonthSumReq';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { MonthSumPopComponent } from 'src/app/components/month-sum-pop/month-sum-pop.component';
import { MonthSumPop } from 'src/model/report/MonthSumPop';
import { EnmShowInOutType } from 'src/model/enums/EnmShowInOutType';
import { EnmDataType } from 'src/model/enums/enmDataType';
import { Store } from 'src/store/Store';

//缓存键：是否包含借还（从收入/支出统计页返回时，地址栏可能没有该参数，需沿用上次的选择）
const CACHE_KEY_IS_CONTAIN_BORROW_REPAY = 'MonthInOutSumList.IsContainBorrowRepay';

@Component({
  selector: 'app-month-in-out-sum-list',
  templateUrl: './month-in-out-sum-list.page.html',
  styleUrls: ['./month-in-out-sum-list.page.scss'],
})
//月度结余统计页面（指定年份内，同一月份的收入、支出合并为一行）
export class MonthInOutSumListPage extends BasePage implements OnInit {

  reqYear: number; //年份
  //弹框筛选条件
  reqPop: MonthSumPop = new MonthSumPop();
  //列表
  list: Array<MonthInOutSumListInfo>;
  //最近一次查询时的是否包含借还
  private lastIsContainBorrowRepay: boolean;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private rptAPI: ReportAPI,
    private popCtrl: PopoverController,
    private store: Store) {
    super();
  }

  ngOnInit() {
    //本页面只保留“是否包含借还”一个筛选项
    this.reqPop.isShowInOutFilter = false;
    this.reqPop.enmShowInOutType = EnmShowInOutType.All;

    //入参
    this.activeRoute.queryParams.subscribe((params: Params) => {
      //年份（地址栏没有该参数时沿用上次的值）
      const year = Number(params.year);
      if (!isNaN(year)) {
        this.reqYear = year;
      }

      this.reqPop.isContainBorrowRepay = this.getIsContainBorrowRepay(params.isContainBorrowRepay);

      //初始化
      this.initPage();
    });
  }

  //获取是否包含借还条件（优先取地址栏参数；没有参数时沿用上次的选择，如从收入/支出统计页返回）
  private getIsContainBorrowRepay(paramVal: any): boolean {
    let val: boolean;
    if (paramVal === true || paramVal === 'true') {
      val = true;
    } else if (paramVal === false || paramVal === 'false') {
      val = false;
    } else if (typeof this.reqPop.isContainBorrowRepay === 'boolean') {
      val = this.reqPop.isContainBorrowRepay;
    } else {
      val = this.store.getSession<boolean>(CACHE_KEY_IS_CONTAIN_BORROW_REPAY) === true;
    }

    //记录本次条件
    this.store.setSession(CACHE_KEY_IS_CONTAIN_BORROW_REPAY, val);

    return val;
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<MonthInOutSumListInfo>> {
    //条件
    const req = new MonthSumReq();
    req.year = this.reqYear;
    req.isContainBorrowRepay = this.reqPop.isContainBorrowRepay;
    this.lastIsContainBorrowRepay = req.isContainBorrowRepay;
    this.store.setSession(CACHE_KEY_IS_CONTAIN_BORROW_REPAY, req.isContainBorrowRepay);

    //查询列表（指定年份内按月份的收支统计）
    const lstInfo = (await this.rptAPI.sumMonth(req, showLoader)).lstInfo;

    //合并同一月份
    return this.sumByMonth(lstInfo);
  }

  //把同一月份的收入、支出合并为一行
  private sumByMonth(lstInfo: Array<MonthSumListInfo<string>>): Array<MonthInOutSumListInfo> {
    const list = new Array<MonthInOutSumListInfo>();
    if (!lstInfo) {
      return list;
    }

    lstInfo.forEach(item => {
      //取（或新建）该月份的记录
      let info = list.find(m => m.month == item.name);
      if (!info) {
        info = new MonthInOutSumListInfo();
        info.month = item.name;
        info.inAmount = 0;
        info.outAmount = 0;
        info.isExpand = false;
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

    //按月份倒序
    return list.sort((a, b) => a.month < b.month ? 1 : -1);
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

  //展开/收起该月份的收支明细
  toggleExpand(item: MonthInOutSumListInfo) {
    item.isExpand = !item.isExpand;
  }

  //跳转到该月份的收入统计页面
  openInSum(item: MonthInOutSumListInfo) {
    this.router.navigate(
      ['tabs/reportTab/monthInSumList'],
      { queryParams: { month: item.month + '-01', isContainBorrowRepay: this.reqPop.isContainBorrowRepay } });
  }

  //跳转到该月份的支出统计页面
  openOutSum(item: MonthInOutSumListInfo) {
    this.router.navigate(
      ['tabs/reportTab/monthOutSumList'],
      { queryParams: { month: item.month + '-01', isContainBorrowRepay: this.reqPop.isContainBorrowRepay } });
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
    if (this.lastIsContainBorrowRepay != this.reqPop.isContainBorrowRepay) {
      //同步到地址栏（replaceUrl 不产生新的历史记录），由 queryParams 订阅触发重新查询；
      //否则从收入/支出统计页返回时，地址栏还是旧值，页面会按旧值重建
      this.router.navigate([], {
        relativeTo: this.activeRoute,
        queryParams: { isContainBorrowRepay: this.reqPop.isContainBorrowRepay },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    }
  }
}

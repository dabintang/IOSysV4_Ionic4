import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { MonthSumListInfo } from 'src/model/report/MonthSumListInfo';
import { ReportAPI } from 'src/api/ReportAPI';
import { MonthSumReq } from 'src/model/report/MonthSumReq';
import { PopoverController } from '@ionic/angular';
import { MonthSumPopComponent } from 'src/app/components/month-sum-pop/month-sum-pop.component';
import { MonthSumPop } from 'src/model/report/MonthSumPop';
import { EnmShowInOutType } from 'src/model/enums/EnmShowInOutType';
import { EnmDataType } from 'src/model/enums/enmDataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-month-sum-list',
  templateUrl: './month-sum-list.page.html',
  styleUrls: ['./month-sum-list.page.scss'],
})
export class MonthSumListPage extends BasePage implements OnInit {

  //条件
  req: MonthSumReq = new MonthSumReq();
  //弹框筛选条件
  reqPop: MonthSumPop = new MonthSumPop();
  //列表
  list: Array<MonthSumListInfo<string>>;

  constructor(
    private rptAPI: ReportAPI,
    private router: Router,
    private popCtrl: PopoverController) {
    super();
  }

  ngOnInit() {
    this.reqPop.isContainBorrowRepay = false;
    this.reqPop.isShowInOutFilter = true;
    this.reqPop.enmShowInOutType = EnmShowInOutType.All;

    //初始化
    this.initPage();
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<MonthSumListInfo<string>>> {
    //条件
    this.req.isContainBorrowRepay = this.reqPop.isContainBorrowRepay;

    //查询列表
    const lstInfo = (await this.rptAPI.sumMonth(this.req, showLoader)).lstInfo;
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
    const retModal = await popover.onDidDismiss();

    //如果是否包含借还条件有变化
    if (this.req.isContainBorrowRepay != this.reqPop.isContainBorrowRepay) {
      this.initPage();
    }

    if (retModal.data) {
      this.reqPop = retModal.data as MonthSumPop;
      this.initPage();
    }
  }

  //是否显示记录
  showRecord(item: MonthSumListInfo<string>): boolean {
    switch (this.reqPop.enmShowInOutType) {
      case EnmShowInOutType.In:
        if (item.dataType != EnmDataType.In) {
          return false;
        }
        break;
      case EnmShowInOutType.Out:
        if (item.dataType != EnmDataType.Out) {
          return false;
        }
        break;
    }

    return true;
  }

  //跳转到统计指定月份收入页面
  clickItem(item: MonthSumListInfo<string>) {
    switch (item.dataType) {
      case EnmDataType.In:
        this.router.navigate(
          ['tabs/reportTab/monthInSumList'],
          { queryParams: { month: item.name + '-01', isContainBorrowRepay: this.reqPop.isContainBorrowRepay } });
        break;
      case EnmDataType.Out:
        this.router.navigate(
          ['tabs/reportTab/monthOutSumList'],
          { queryParams: { month: item.name + '-01', isContainBorrowRepay: this.reqPop.isContainBorrowRepay } });
        break;
    }
  }
}

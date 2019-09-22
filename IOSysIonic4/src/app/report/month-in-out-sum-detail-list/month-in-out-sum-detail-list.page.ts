import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { EnmDataType } from 'src/model/enums/enmDataType';
import { ActivatedRoute, Params } from '@angular/router';
import { MonthInOutSumDetailListInfo } from 'src/model/report/MonthInOutSumDetailListInfo';
import { ReportAPI } from 'src/api/ReportAPI';
import { InRecordReq } from 'src/model/report/InRecordReq';
import { DateHelper } from 'src/helper/DateHelper';
import { OutRecordReq } from 'src/model/report/OutRecordReq';
import { BorrowRepayRecordReq } from 'src/model/report/BorrowRepayRecordReq';
import { ModalController } from '@ionic/angular';
import { InComeDetailPage } from 'src/app/inout/in-come-detail/in-come-detail.page';
import { OutPutDetailPage } from 'src/app/inout/out-put-detail/out-put-detail.page';
import { BorrowRepayDetailPage } from 'src/app/inout/borrow-repay-detail/borrow-repay-detail.page';
import { ArrayHelper, SortReq } from 'src/helper/ArrayHelper';

@Component({
  selector: 'app-month-in-out-sum-detail-list',
  templateUrl: './month-in-out-sum-detail-list.page.html',
  styleUrls: ['./month-in-out-sum-detail-list.page.scss'],
})
export class MonthInOutSumDetailListPage extends BasePage implements OnInit {

  reqMonth: Date; //月份
  dataType: EnmDataType; //数据类型
  groupID: number; //分组ID
  groupName: string; //分组名
  list: Array<MonthInOutSumDetailListInfo>; //列表

  constructor(
    private activeRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private rptAPI: ReportAPI
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.reqMonth = DateHelper.parse(params.month) as Date;
      this.dataType = Number(params.dataType) as EnmDataType;
      this.groupID = Number(params.groupID);
      this.groupName = params.groupName as string;

      //初始化
      this.initPage();
    });
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<MonthInOutSumDetailListInfo>> {
    let lstRecord: Array<MonthInOutSumDetailListInfo>;
    switch (this.dataType) {
      case EnmDataType.In:
        lstRecord = await this.queryInRecord(showLoader);
        break;
      case EnmDataType.Out:
        lstRecord = await this.queryOutRecord(showLoader);
        break;
      case EnmDataType.BorrowRepay:
        lstRecord = await this.queryBorrowRepayRecord(showLoader);
        break;
      default:
        lstRecord = new Array<MonthInOutSumDetailListInfo>();
        break;
    }

    //排序条件
    const lstSortReq = new Array<SortReq>();
    lstSortReq.push(new SortReq('date', false));

    //排序
    lstRecord = ArrayHelper.sortArrayObj(lstRecord, lstSortReq);

    return lstRecord;
  }

  //查询收入明细列表
  async queryInRecord(showLoader: boolean = true): Promise<Array<MonthInOutSumDetailListInfo>> {
    //条件
    let req = new InRecordReq();
    req.startDate = DateHelper.getMonthStart(this.reqMonth);
    req.endDate = DateHelper.getMonthEnd(this.reqMonth);
    req.lstInTypeID = [this.groupID];

    //查询列表
    const lstInfo = (await this.rptAPI.queryInRecord(req, showLoader)).lstInfo;

    let list = new Array<MonthInOutSumDetailListInfo>();
    lstInfo.forEach(info => {
      let item = new MonthInOutSumDetailListInfo();
      list.push(item);

      item.id = info.id;
      item.date = info.inDate;
      item.amountAccountName = info.amountAccountName;
      item.amount = info.amount;
    });

    return list;
  }

  //查询支出明细列表
  async queryOutRecord(showLoader: boolean = true): Promise<Array<MonthInOutSumDetailListInfo>> {
    //条件
    let req = new OutRecordReq();
    req.startDate = DateHelper.getMonthStart(this.reqMonth);
    req.endDate = DateHelper.getMonthEnd(this.reqMonth);
    req.lstOutTypeID = [this.groupID];

    //查询列表
    const lstInfo = (await this.rptAPI.queryOutRecord(req, showLoader)).lstInfo;

    let list = new Array<MonthInOutSumDetailListInfo>();
    lstInfo.forEach(info => {
      let item = new MonthInOutSumDetailListInfo();
      list.push(item);

      item.id = info.id;
      item.date = info.outDate;
      item.amountAccountName = info.amountAccountName;
      item.amount = info.amount;
    });

    return list;
  }

  //查询借还明细列表
  async queryBorrowRepayRecord(showLoader: boolean = true): Promise<Array<MonthInOutSumDetailListInfo>> {
    //条件
    let req = new BorrowRepayRecordReq();
    req.startDate = DateHelper.getMonthStart(this.reqMonth);
    req.endDate = DateHelper.getMonthEnd(this.reqMonth);
    req.lstBRType = [this.groupID];

    //查询列表
    const lstInfo = (await this.rptAPI.queryBorrowRepayRecord(req, showLoader)).lstInfo;

    let list = new Array<MonthInOutSumDetailListInfo>();
    lstInfo.forEach(info => {
      let item = new MonthInOutSumDetailListInfo();
      list.push(item);

      item.id = info.id;
      item.date = info.brDate;
      item.amountAccountName = info.amountAccountName;
      item.amount = info.amount;
    });

    return list;
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

  //打开详细页面
  async openDetail(item: MonthInOutSumDetailListInfo) {
    switch (this.dataType) {
      case EnmDataType.In:
        this.openInComeDetail(item);
        break;
      case EnmDataType.Out:
        this.openOutPutDetail(item);
        break;
      case EnmDataType.BorrowRepay:
        this.openBorrowRepayDetail(item);
        break;
    }
  }

  //打开收入详细页面
  async openInComeDetail(item: MonthInOutSumDetailListInfo) {
    //详细页面
    const modal = await this.modalCtrl.create({
      component: InComeDetailPage,
      componentProps: { id: item.id, date: item.date, isView: true }
    });

    //打开详细页面
    await modal.present();
  }

  //打开支出详细页面
  async openOutPutDetail(item: MonthInOutSumDetailListInfo) {
    //详细页面
    const modal = await this.modalCtrl.create({
      component: OutPutDetailPage,
      componentProps: { id: item.id, date: item.date, isView: true }
    });

    //打开详细页面
    await modal.present();
  }

  //打开借还详细页面
  async openBorrowRepayDetail(item: MonthInOutSumDetailListInfo) {
    //详细页面
    const modal = await this.modalCtrl.create({
      component: BorrowRepayDetailPage,
      componentProps: { id: item.id, date: item.date, isView: true }
    });

    //打开详细页面
    await modal.present();
  }
}

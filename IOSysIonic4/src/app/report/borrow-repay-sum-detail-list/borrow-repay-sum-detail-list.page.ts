import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { ActivatedRoute, Params } from '@angular/router';
import { ResultPageList } from 'src/model/comm/ResultPageList';
import { BorrowRepayRecordListInfo } from 'src/model/report/BorrowRepayRecordListInfo';
import { BorrowRepayRecordReq } from 'src/model/report/BorrowRepayRecordReq';
import { ReportAPI } from 'src/api/ReportAPI';
import { EnmBorrowRepayType } from 'src/model/enums/EnmBorrowRepayType';
import { ModalController } from '@ionic/angular';
import { BorrowRepayDetailPage } from 'src/app/inout/borrow-repay-detail/borrow-repay-detail.page';

@Component({
  selector: 'app-borrow-repay-sum-detail-list',
  templateUrl: './borrow-repay-sum-detail-list.page.html',
  styleUrls: ['./borrow-repay-sum-detail-list.page.scss'],
})
export class BorrowRepaySumDetailListPage extends BasePage implements OnInit {

  //借还者姓名
  target: string;
  //列表
  list: Array<BorrowRepayRecordListInfo>;

  constructor(
    private activeRoute: ActivatedRoute,
    private rptAPI: ReportAPI,
    private modalCtrl: ModalController) {
    super();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((params: Params) => {
      //获取参数
      this.target = params.target;

      //初始化
      this.initPage();
    });
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<BorrowRepayRecordListInfo>> {
    //条件
    let req = new BorrowRepayRecordReq();
    req.target = this.target;

    //查询列表
    const lstInfo = (await this.rptAPI.queryBorrowRepayRecord(req, showLoader)).lstInfo;
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

  //获取金额
  getAmount(item: BorrowRepayRecordListInfo): number {
    if (item.brType == EnmBorrowRepayType.BorrowIn || item.brType == EnmBorrowRepayType.RepayIn) {
      return item.amount;
    } else {
      return -item.amount;
    }
  }

  //计算总金额
  totalAmount(): number {
    let total = 0;
    if (this.list) {
      this.list.forEach(item => {
        total += this.getAmount(item);
      });
    }

    return total;
  }

  //打开详细页面
  async openDetail(item: BorrowRepayRecordListInfo) {
    //详细页面
    const modal = await this.modalCtrl.create({
      component: BorrowRepayDetailPage,
      componentProps: { id: item.id, date: item.brDate, isView: true }
    });

    //打开详细页面
    await modal.present();
  }
}

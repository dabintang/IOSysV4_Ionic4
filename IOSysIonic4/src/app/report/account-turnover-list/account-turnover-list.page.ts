import { Component, OnInit } from '@angular/core';
import { ResultPageMonthAmountList } from 'src/model/comm/ResultPageMonthAmountList';
import { AccountTurnoverListInfo } from 'src/model/report/AccountTurnoverListInfo';
import { BasePage } from 'src/app/base/BasePage';
import { ModalController } from '@ionic/angular';
import { ReportAPI } from 'src/api/ReportAPI';
import { AccountTurnoverListReq } from 'src/model/report/AccountTurnoverListReq';
import { BorrowRepayDetailPage } from 'src/app/inout/borrow-repay-detail/borrow-repay-detail.page';
import { EnmDataType } from 'src/model/enums/enmDataType';
import { InComeDetailPage } from 'src/app/inout/in-come-detail/in-come-detail.page';
import { OutPutDetailPage } from 'src/app/inout/out-put-detail/out-put-detail.page';
import { TransferDetailPage } from 'src/app/inout/transfer-detail/transfer-detail.page';
import { DateHelper } from 'src/helper/DateHelper';
import { ComHelper } from 'src/helper/comHelper';
import { AccountTurnoverFilterPage } from '../account-turnover-filter/account-turnover-filter.page';
import { BasicAPI } from 'src/api/BasicAPI';
import { BasicStore } from 'src/store/BasicStore';

@Component({
  selector: 'app-account-turnover-list',
  templateUrl: './account-turnover-list.page.html',
  styleUrls: ['./account-turnover-list.page.scss'],
})
export class AccountTurnoverListPage extends BasePage implements OnInit {

  //条件
  req: AccountTurnoverListReq = new AccountTurnoverListReq();
  //是否还有更多数据
  hasMore = true;
  //列表
  list = new Array<ResultPageMonthAmountList<AccountTurnoverListInfo>>();

  constructor(
    private rptAPI: ReportAPI,
    private modalCtrl: ModalController,
    private basicStore: BasicStore,
    private basicAPI: BasicAPI
  ) {
    super();
  }

  async ngOnInit() {
    //账户列表
    let lstAcc = this.basicStore.getAmountAccountList();
    if (lstAcc == null) {
      //查询列表
      lstAcc = (await this.basicAPI.queryAmountAccount(false)).lstInfo;
    }

    //筛选账户条件
    this.req.lstAmountAccountID = new Array<number>();
    lstAcc.forEach(acc => {
      this.req.lstAmountAccountID.push(acc.id);
    });

    //初始化
    this.initPage();
  }

  //查询
  async search(month: Date, showLoader: boolean = true): Promise<ResultPageMonthAmountList<AccountTurnoverListInfo>> {
    //查询条件
    this.req.month = month;

    //查询列表
    const result = await this.rptAPI.queryAccountTurnover(this.req, showLoader);

    //是否还有更多数据
    this.hasMore = result.hasPreMonth;

    return result;
  }

  //初始化
  async initPage() {
    //查询
    let result = await this.search(new Date());

    //清空原来的数据，加入新数据
    this.list.splice(0, this.list.length, result);

    //是否需要加载更多
    if (this.needLoadMore()) {
      this.loadMore(true);
    }
  }

  //刷新
  async doRefresh(event: any) {
    //查询
    let result = await this.search(new Date(), false);

    //清空原来的数据，加入新数据
    this.list.splice(0, this.list.length, result);

    //是否需要加载更多
    if (this.needLoadMore()) {
      this.loadMore(false);
    }

    //刷新完成
    event.target.complete();
  }

  //打开详细页面
  async openDetail(itemAcc: AccountTurnoverListInfo) {

    let pageDetai = null;
    switch (itemAcc.dataType) {
      case EnmDataType.BorrowRepay:
        pageDetai = BorrowRepayDetailPage;
        break;
      case EnmDataType.In:
        pageDetai = InComeDetailPage;
        break;
      case EnmDataType.Out:
        pageDetai = OutPutDetailPage;
        break;
      case EnmDataType.Transfer:
        pageDetai = TransferDetailPage;
        break;
    }

    //详细页面
    const modal = await this.modalCtrl.create({
      component: pageDetai,
      componentProps: { id: itemAcc.id, date: itemAcc.date, isView: true }
    });

    //打开详细页面
    await modal.present();
  }

  //是否需要加载更多
  needLoadMore() {
    //当前页面上的记录数
    let count = 0;
    for (let itemMonth of this.list) {
      count += itemMonth.lstInfo.length;
    }

    //如果还有更多数据，并且当前页面数据没满一页，则需要加载更多
    if (this.hasMore && count < ComHelper.PageSize) {
      return true;
    }

    return false;
  }

  //上拉加载
  async doInfinite(event) {
    //加载更多
    await this.loadMore(false);

    event.target.complete();
  }

  //加载更多
  async loadMore(showLoader: boolean) {
    //查询前一个月数据
    let reqMonth = DateHelper.addMonth(this.req.month, -1);

    //查询
    let result = await this.search(reqMonth, showLoader);

    //在最后加入新数据
    this.list.push(result);

    //是否需要加载更多
    if (this.needLoadMore()) {
      this.loadMore(showLoader);
    }
  }

  //打开账户筛选页面
  async accountFilter() {
    //筛选页面
    const modal = await this.modalCtrl.create({
      component: AccountTurnoverFilterPage,
      componentProps: { lstSelectedAccID: this.req.lstAmountAccountID }
    });

    //打开筛选页面
    await modal.present();

    //筛选页面返回
    const retModal = await modal.onDidDismiss();
    if (retModal.data) {
      this.req.lstAmountAccountID = retModal.data;
      this.initPage();
    }
  }
}

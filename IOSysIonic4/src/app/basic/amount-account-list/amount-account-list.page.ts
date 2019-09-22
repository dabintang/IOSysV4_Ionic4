import { Component, OnInit } from '@angular/core';
import { AmountAccountListInfo } from 'src/model/basic/AmountAccountListInfo';
import { BasicAPI } from 'src/api/BasicAPI';
import { BasePage } from 'src/app/base/BasePage';
import { ModalController } from '@ionic/angular';
import { AmountAccountDetailPage } from '../amount-account-detail/amount-account-detail.page';
import { ArrayHelper, SortReq } from 'src/helper/ArrayHelper';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';

@Component({
  selector: 'app-amount-account-list',
  templateUrl: './amount-account-list.page.html',
  styleUrls: ['./amount-account-list.page.scss']
})
export class AmountAccountListPage extends BasePage implements OnInit {
  //列表
  list: Array<AmountAccountListInfo>;

  constructor(
    private basicAPI: BasicAPI,
    private msgBox: MsgboxUtil,
    private modalCtrl: ModalController
  ) {
    super();
  }

  //初始化
  ngOnInit() {
    //初始化
    this.initPage();
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<AmountAccountListInfo>> {
    //查询列表
    let lstInfo = (await this.basicAPI.queryAmountAccount(showLoader)).lstInfo;

    //排序条件
    const lstSortReq = new Array<SortReq>();
    lstSortReq.push(new SortReq('isActive', false));
    lstSortReq.push(new SortReq('amount', false));

    //排序
    lstInfo = ArrayHelper.sortArrayObj(lstInfo, lstSortReq);

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

  //合计金额
  sumAmount(): number {
    let total = 0;

    if (this.list) {
      this.list.forEach(item => {
        total += item.amount;
      });
    }

    return total;
  }

  //打开详细页面
  async openDetail(id: number) {
    //详细页面
    const modal = await this.modalCtrl.create({
      component: AmountAccountDetailPage,
      componentProps: { id: id }
    });

    //打开详细页面
    await modal.present();

    //详细页面返回
    const retModal = await modal.onDidDismiss();
    if (retModal.data) {
      this.initPage();
    }
  }

  //删除
  removeItem(id: number) {
    this.msgBox.ask('删除确认', '（如果此类型已被使用，请不要删除!可以修改是否可用属性。）', [
      {
        text: '取消'
      },
      {
        text: '删除',
        handler: () => {
          this.basicAPI.deleteAmountAccount(id).then(result => {
            if (result.isOK) {
              this.initPage();
            } else {
              this.msgBox.infoDanger(result.msg);
            }
          });
        }
      }
    ]);
  }
}

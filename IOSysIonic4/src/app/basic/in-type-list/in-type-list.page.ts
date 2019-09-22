import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { InTypeListInfo } from 'src/model/basic/InTypeListInfo';
import { BasicAPI } from 'src/api/BasicAPI';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { ModalController } from '@ionic/angular';
import { InTypeDetailPage } from '../in-type-detail/in-type-detail.page';

@Component({
  selector: 'app-in-type-list',
  templateUrl: './in-type-list.page.html',
  styleUrls: ['./in-type-list.page.scss']
})
export class InTypeListPage extends BasePage implements OnInit {

  //列表
  list: Array<InTypeListInfo>;

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
  async search(showLoader: boolean = true): Promise<Array<InTypeListInfo>> {
    //查询列表
    const lstInfo = (await this.basicAPI.queryInType(showLoader)).lstInfo;
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

  //打开详细页面
  async openDetail(id: number) {
    //详细页面
    const modal = await this.modalCtrl.create({
      component: InTypeDetailPage,
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
          this.basicAPI.deleteInType(id).then(result => {
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

import { Component, OnInit } from '@angular/core';
import { OutCategoryTypeListInfo } from 'src/model/basic/OutCategoryTypeListInfo';
import { BasicAPI } from 'src/api/BasicAPI';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { ModalController } from '@ionic/angular';
import { BasePage } from 'src/app/base/BasePage';
import { OutCategoryDetailPage } from '../out-category-detail/out-category-detail.page';
import { OutTypeDetailPage } from '../out-type-detail/out-type-detail.page';

@Component({
  selector: 'app-out-type-list',
  templateUrl: './out-type-list.page.html',
  styleUrls: ['./out-type-list.page.scss'],
})
export class OutTypeListPage extends BasePage implements OnInit {

  //列表
  list: Array<OutCategoryTypeListInfo>;

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
  async search(showLoader: boolean = true): Promise<Array<OutCategoryTypeListInfo>> {
    //查询列表
    const lstInfo = (await this.basicAPI.queryOutCategoryType(showLoader)).lstInfo;
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

  //打开支出分类详细页面
  async openOutCategoryDetail(id: number) {
    //详细页面
    const modal = await this.modalCtrl.create({
      component: OutCategoryDetailPage,
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

  //删除分类
  removeOutCategory(id: number) {
    this.msgBox.ask('删除确认', '（如果此分类已被使用，请不要删除!可以修改是否可用属性。）', [
      {
        text: '取消'
      },
      {
        text: '删除',
        handler: () => {
          this.basicAPI.deleteOutCategory(id).then(result => {
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

  //打开支出类型详细页面
  async openOutTypeDetail(ocID: number, otID: number, event: any) {
    if (event) {
      //阻止事件冒泡
      event.stopPropagation();
    }

    //详细页面
    const modal = await this.modalCtrl.create({
      component: OutTypeDetailPage,
      componentProps: { ocID: ocID, otID: otID }
    });

    //打开详细页面
    await modal.present();

    //详细页面返回
    const retModal = await modal.onDidDismiss();
    if (retModal.data) {
      this.initPage();
    }
  }

  //删除类型
  removeOutType(id: number) {
    this.msgBox.ask('删除确认', '（如果此类型已被使用，请不要删除!可以修改是否可用属性。）', [
      {
        text: '取消'
      },
      {
        text: '删除',
        handler: () => {
          this.basicAPI.deleteOutType(id).then(result => {
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

import { Component, OnInit } from '@angular/core';
import { OutCategoryInfo } from 'src/model/basic/OutCategoryInfo';
import { ModalController, NavParams } from '@ionic/angular';
import { BasicAPI } from 'src/api/BasicAPI';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { BasePage } from 'src/app/base/BasePage';
import { ComHelper } from 'src/helper/comHelper';

@Component({
  selector: 'app-out-category-detail',
  templateUrl: './out-category-detail.page.html',
  styleUrls: ['./out-category-detail.page.scss'],
})
export class OutCategoryDetailPage extends BasePage implements OnInit {

  //信息
  item: OutCategoryInfo = new OutCategoryInfo();

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private basicAPI: BasicAPI,
    private msgBox: MsgboxUtil
  ) {
    super();
  }

  ngOnInit() {
    //传入的主键ID
    const id = this.navParams.get('id');

    //初始化页面
    this.initPage(id);
  }

  //获取操作模式：添加/修改
  getOpeModel() {
    if (this.item.id > 0) {
      return '修改';
    }

    return '添加';
  }

  //初始化页面
  async initPage(id: number) {
    //添加
    if (id === 0) {
      this.item.id = id;
      this.item.isActive = true;
      return;
    }

    //修改
    try {
      const ret = await this.basicAPI.getOutCategory(id);
      if (ret.isOK) {
        this.item = ret.info;
      }
    } catch (err) {
      //异常，销毁本页面
      this.dismiss(false);
    }
  }

  //检查输入是否合法
  chkInput() {
    if (ComHelper.isEmptry(this.item.name)) {
      this.msgBox.infoDanger('请输入名称');
      return false;
    }

    return true;
  }

  //保存
  async save() {
    if (this.chkInput() === false) {
      return;
    }

    await this.msgBox.actSheet(
      [
        {
          text: '保存',
          role: 'destructive',
          handler: () => {
            this.basicAPI
              .saveOutCategory(this.item)
              .then(result => {
                if (result.isOK) {
                  this.dismiss(true);
                } else {
                  this.msgBox.infoDanger(result.msg);
                }
              })
              .catch(err => {
                //异常，销毁本页面
                this.dismiss(false);
              });
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]);
  }

  //销毁页面
  dismiss(isSave: boolean) {
    this.modalCtrl.dismiss(isSave);
  }
}

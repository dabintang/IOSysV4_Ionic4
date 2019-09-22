import { Component, OnInit } from '@angular/core';
import { OutTypeInfo } from 'src/model/basic/OutTypeInfo';
import { BasePage } from 'src/app/base/BasePage';
import { ActionSheetController, ModalController, NavParams } from '@ionic/angular';
import { BasicAPI } from 'src/api/BasicAPI';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { ComHelper } from 'src/helper/comHelper';

@Component({
  selector: 'app-out-type-detail',
  templateUrl: './out-type-detail.page.html',
  styleUrls: ['./out-type-detail.page.scss'],
})
export class OutTypeDetailPage extends BasePage implements OnInit {
  //支出类型
  item: OutTypeInfo = new OutTypeInfo();

  constructor(
    private actionSheet: ActionSheetController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private basicAPI: BasicAPI,
    private msgBox: MsgboxUtil
  ) {
    super();
  }

  ngOnInit() {
    //传入的分类ID
    const ocID = this.navParams.get('ocID');

    //传入的类型ID
    const otID = this.navParams.get('otID');

    //初始化页面
    this.initPage(ocID, otID);
  }

  //获取操作模式：添加/修改
  getOpeModel() {
    if (this.item.id > 0) {
      return '修改';
    }

    return '添加';
  }

  //初始化页面
  async initPage(ocID: number, otID: number) {
    //添加
    if (otID === 0) {
      this.item.id = otID;
      this.item.outCategoryID = ocID;
      this.item.isActive = true;
      return;
    }

    //修改
    try {
      const ret = await this.basicAPI.getOutType(otID);
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

    if (ComHelper.isEmptry(this.item.outCategoryID) || this.item.outCategoryID <= 0) {
      this.msgBox.infoDanger('请选择所属分类');
      return false;
    }

    if (ComHelper.isEmptry(this.item.amountAccountID) || this.item.amountAccountID <= 0) {
      this.msgBox.infoDanger('请选择默认账户');
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
              .saveOutType(this.item)
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

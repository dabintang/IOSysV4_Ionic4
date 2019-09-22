import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { TransferInfo } from 'src/model/inout/TransferInfo';
import { ModalController, NavParams } from '@ionic/angular';
import { InOutAPI } from 'src/api/InOutAPI';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { ComHelper } from 'src/helper/comHelper';
import { isNumeric } from 'rxjs/util/isNumeric';

@Component({
  selector: 'app-transfer-detail',
  templateUrl: './transfer-detail.page.html',
  styleUrls: ['./transfer-detail.page.scss'],
})
export class TransferDetailPage extends BasePage implements OnInit {

  //转账信息
  item: TransferInfo = new TransferInfo();
  //是否查看模式
  isView: boolean;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private inoutAPI: InOutAPI,
    private msgBox: MsgboxUtil
  ) {
    super();
  }

  ngOnInit() {
    //传入的参数
    const id = this.navParams.get('id');
    const date = this.navParams.get('date');
    this.isView = this.navParams.get('isView');

    //初始化页面
    this.initPage(id, date);
  }

  //获取操作模式：添加/修改
  getOpeModel() {
    if (this.isView) {
      return '查看';
    }

    if (this.item.id > 0) {
      return '修改';
    }

    return '添加';
  }

  //初始化页面
  async initPage(id: number, date: Date) {
    //添加
    if (id === 0) {
      this.item.id = id;
      this.item.transferDate = date;
      return;
    }

    //修改
    try {
      const ret = await this.inoutAPI.getTransfer(id);
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
    if (ComHelper.isEmptry(this.item.transferDate)) {
      this.msgBox.infoDanger('请选择日期');
      return false;
    }

    if (ComHelper.isEmptry(this.item.fromAmountAccountID) || this.item.fromAmountAccountID <= 0) {
      this.msgBox.infoDanger('请选择源账户');
      return false;
    }

    if (ComHelper.isEmptry(this.item.toAmountAccountID) || this.item.toAmountAccountID <= 0) {
      this.msgBox.infoDanger('请选择目标账户');
      return false;
    }

    if (isNumeric(this.item.amount) === false) {
      this.msgBox.infoDanger('请输入金额');
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
            this.inoutAPI
              .saveTransfer(this.item)
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

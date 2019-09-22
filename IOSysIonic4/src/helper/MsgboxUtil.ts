import { Injectable } from '@angular/core';
import { ToastController, AlertController, LoadingController, ActionSheetController } from '@ionic/angular';
import { createWiresService } from 'selenium-webdriver/firefox';
import { AlertButton, ActionSheetButton } from '@ionic/core';

// 弹框相关功能
@Injectable()
export class MsgboxUtil {
  constructor(
    private actionSheet: ActionSheetController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  // 用toast提示信息，颜色danger
  async infoDanger(msg: string) {
    await this.info(msg, 'danger');
  }

  // 用toast提示信息
  async info(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      color: color,
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // 用alert弹出询问框
  async ask(title: string, msg: string, btns: AlertButton[]) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: btns
    });

    await alert.present();
  }

  // 用底部弹出询问框
  async actSheet(btns: (ActionSheetButton | string)[]) {
    const actSheet = await this.actionSheet.create({
      buttons: btns
    });

    await actSheet.present();
  }

  // 遮罩层
  private loader: HTMLIonLoadingElement = null;
  // 遮罩层数量
  private loaderNum = 0;

  // 显示遮罩层
  async loading(msg: string = '稍候...') {
    // 原来没哟遮罩层，才打开遮罩层
    if (this.loaderNum <= 0) {
      this.loaderNum += 1;

      this.loader = await this.loadingCtrl.create({
        message: msg,
        duration: 5000
      });

      await this.loader.present();

      // 遮罩层已应关闭
      if (this.loaderNum <= 0) {
        this.dismissLoading();
      }
    } else {
      this.loaderNum += 1;
    }
  }

  // 关闭遮罩层
  async dismissLoading() {
    this.loaderNum = this.loaderNum <= 0 ? 0 : this.loaderNum - 1;

    if (this.loader && this.loaderNum <= 0) {
      this.loader.dismiss();
    }
  }
}

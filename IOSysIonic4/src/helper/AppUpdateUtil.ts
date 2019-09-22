import { Injectable } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { MsgboxUtil } from './MsgboxUtil';
import { AppAPI } from 'src/api/AppAPI';
import { AppVerInfo } from 'src/model/app/AppVerInfo';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ConfigStore } from 'src/store/ConfigStore';

// app更新相关功能
@Injectable()
export class AppUpdateUtil {
  constructor(
    private platform: Platform,
    private appVer: AppVersion,
    private transfer: FileTransfer,
    private file: File,
    private fileOpener: FileOpener,
    private alertCtrl: AlertController,
    private msgBox: MsgboxUtil,
    private appAPI: AppAPI,
    private configStroe: ConfigStore,
  ) { }

  // 更新app
  async doUpdate() {
    // 当前只支持android
    if (this.isAndroid() === false) {
      return;
    }

    // 从api获取最新app版本信息
    const newVerInfo = (await this.appAPI.getAppVer()).info;
    // 当前版本号
    const curVer = await this.getVersionNumber();
    // 如果已是最新版本
    if (newVerInfo.ver === curVer) {
      return;
    }

    if (newVerInfo.isForce) {
      this.msgBox.ask('升级提示', '发现新版本,请立即升级？', [
        {
          text: '确定',
          handler: () => {
            // 下载安装
            this.downloadInstall(newVerInfo);
          }
        }
      ]);
    } else {
      this.msgBox.ask('升级提示', '发现新版本,是否立即升级？', [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: () => {
            // 下载安装
            this.downloadInstall(newVerInfo);
          }
        }
      ]);
    }
  }

  // 下载安装
  async downloadInstall(verInfo: AppVerInfo) {
    const alert = await this.alertCtrl.create({
      header: '下载进度：0%',
      backdropDismiss: false,
      buttons: ['后台下载']
    });

    await alert.present();

    const fileTransfer: FileTransferObject = this.transfer.create();
    const apk = this.file.externalRootDirectory + 'download/iosys.apk'; // apk保存的目录
    
    // 下载
    const downloadUrl = this.configStroe.getApiBaseUrl() + verInfo.path;
    fileTransfer.download(downloadUrl, apk).then(() => {
      this.fileOpener.open(apk, 'application/vnd.android.package-archive');
    });

    fileTransfer.onProgress((event: ProgressEvent) => {
      const num = Math.floor(event.loaded / event.total * 100);
      if (num === 100) {
        alert.dismiss();
      } else {
        const title = document.getElementsByClassName('alert-title')[0];
        title && (title.innerHTML = '下载进度：' + num + '%');
      }
    });
  }

  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 获得app版本号,如0.01
   */
  async getVersionNumber(): Promise<string> {
    const verNum = await this.appVer.getVersionNumber();
    return verNum;

    // return '4.6.0';
  }

}

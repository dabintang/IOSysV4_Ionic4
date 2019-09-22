import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginReq } from 'src/model/account/LoginReq';
import { AccountAPI } from 'src/api/AccountAPI';
import { CryptoHelper } from 'src/helper/CryptoHelper';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { AccountStore } from 'src/store/AccountStore';
import { ComHelper } from 'src/helper/comHelper';
import { AlertController } from '@ionic/angular';
import { ConfigStore } from 'src/store/ConfigStore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  req: LoginReq = new LoginReq(); //登录条件
  isSavePwd = false; //是否保存密码

  constructor(
    private router: Router,
    private accountAPI: AccountAPI,
    private msgBox: MsgboxUtil,
    private accStore: AccountStore,
    private alertCtrl: AlertController,
    private configStroe: ConfigStore
  ) { }

  ngOnInit() {
    //如果之前保存了密码，设置账户密码
    const preReq = this.accStore.getLoginReq();
    if (preReq != null) {
      this.isSavePwd = true;
      this.req.loginName = preReq.loginName;
      this.req.password = preReq.password;
    } else {
      this.isSavePwd = false;
      this.req.loginName = '';
      this.req.password = '';
    }
  }

  //登录
  async logIn() {
    //验证
    if (this.checkInput() === false) {
      return false;
    }

    //登录条件加密
    const reqLogin = new LoginReq();
    reqLogin.loginName = this.req.loginName;
    reqLogin.password = CryptoHelper.encryptAES(this.req.password);

    //请求登录接口
    const res = await this.accountAPI.login(reqLogin);
    if (res.isOK) {
      //登录成功
      //设置登录信息
      this.accStore.setLoginInfo(res.info);

      //保存密码
      if (this.isSavePwd) {
        this.accStore.setLoginReq(this.req);
      }

      //跳转到tabs页
      this.router.navigate(['']);
    } else {
      //登录失败
      this.msgBox.infoDanger(res.msg);
    }
  }

  //验证
  checkInput() {
    if (ComHelper.isEmptry(this.req.loginName)) {
      this.msgBox.infoDanger('请输入账号');
      return false;
    } else if (ComHelper.isEmptry(this.req.password)) {
      this.msgBox.infoDanger('请输入密码');
      return false;
    }
    return true;
  }

  //显示筛选弹框
  async shouPop(event: Event) {

    let apiBaseUrl = this.configStroe.getApiBaseUrl();

    const alert = await this.alertCtrl.create({
      header: '接口地址',
      inputs: [
        {
          name: 'txtApiBaseUrl',
          type: 'text',
          placeholder: '请输入接口地址',
          value: apiBaseUrl
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: '确定',
          handler: (data) => {
            this.configStroe.setApiBaseUrl(data.txtApiBaseUrl);
          }
        }, {
          text: '恢复默认',
          handler: (data) => {
            this.configStroe.setApiBaseUrl(null);
          }
        }
      ]
    });

    await alert.present();
  }
}

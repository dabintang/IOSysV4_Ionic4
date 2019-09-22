import { Component } from '@angular/core';

import { Platform, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AppUpdateUtil } from 'src/helper/AppUpdateUtil';

declare var chcp: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private appUpdate: AppUpdateUtil
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      // app升级
      this.appUpdate.doUpdate();

      // 跳到登录页
      this.router.navigate(['login']);
    });
  }
}

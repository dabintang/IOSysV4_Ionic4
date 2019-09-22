import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { AccountAPI } from '../api/AccountAPI';
import { API } from '../api/API';
import { AccountStore } from 'src/store/AccountStore';
import { Store } from 'src/store/Store';
import { BasicAPI } from 'src/api/BasicAPI';
import { BasicStore } from 'src/store/BasicStore';
import { FormsModule } from '@angular/forms';
import { InOutAPI } from 'src/api/InOutAPI';

import { ComponentsModule } from './components/components.module';
import { BorrowRepayDetailPage } from './inout/borrow-repay-detail/borrow-repay-detail.page';
import { InComeDetailPage } from './inout/in-come-detail/in-come-detail.page';
import { OutPutDetailPage } from './inout/out-put-detail/out-put-detail.page';
import { TransferDetailPage } from './inout/transfer-detail/transfer-detail.page';
import { ReportAPI } from 'src/api/ReportAPI';
import { AppUpdateUtil } from 'src/helper/AppUpdateUtil';
import { AppAPI } from 'src/api/AppAPI';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ConfigStore } from 'src/store/ConfigStore';

@NgModule({
  declarations: [AppComponent, BorrowRepayDetailPage, InComeDetailPage, OutPutDetailPage, TransferDetailPage],
  entryComponents: [BorrowRepayDetailPage, InComeDetailPage, OutPutDetailPage, TransferDetailPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      backButtonText: '',
      mode: 'ios'
    }),
    AppRoutingModule,
    FormsModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    FileTransfer,
    File,
    FileOpener,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    MsgboxUtil,
    API,
    AccountAPI,
    BasicAPI,
    InOutAPI,
    Store,
    AccountStore,
    BasicStore,
    ConfigStore,
    ReportAPI,
    AppAPI,
    AppUpdateUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

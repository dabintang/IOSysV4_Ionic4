import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { AccountStore } from 'src/store/AccountStore';
import { UserTotalInfo } from 'src/model/report/UserTotalInfo';
import { ReportAPI } from 'src/api/ReportAPI';
import { MsgboxUtil } from 'src/helper/MsgboxUtil';
import { Router } from '@angular/router';
import { BasicStore } from 'src/store/BasicStore';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss']
})
export class MinePage extends BasePage implements OnInit {
  //用户统计信息
  info: UserTotalInfo;
  // //是否使用手势密码
  // isGesture = false;
  //是否包含借还
  isBR = false;

  constructor(
    private accStore: AccountStore,
    private basStore: BasicStore,
    private rptAPI: ReportAPI,
    private msgBox: MsgboxUtil,
    private router: Router) {
    super();
  }

  ngOnInit() {
    // //是否使用手势
    // this.isGesture = this.accStore.getIsGesture();
    //初始化
    this.initPage();
  }

  //统计
  async search(showLoader: boolean = true): Promise<UserTotalInfo> {
    //统计
    return (await this.rptAPI.sumUserTotal(showLoader)).info;
  }

  //初始化
  async initPage() {
    //查询
    this.info = await this.search();
  }

  //刷新
  async doRefresh(event: any) {
    //查询
    this.info = await this.search(false);

    //刷新完成
    event.target.complete();
  }

  //年收入
  sumInYear(): number {
    if (!this.info) {
      return 0;
    }

    let amount = this.info.totalInCurYear;
    if (this.isBR) {
      amount += this.info.totalBRInCurYear;
    }

    return amount;
  }

  //年支出
  sumOutYear(): number {
    if (!this.info) {
      return 0;
    }

    let amount = this.info.totalOutCurYear;
    if (this.isBR) {
      amount += this.info.totalBROutCurYear;
    }

    return amount;
  }

  //月收入
  sumInMonth(): number {
    if (!this.info) {
      return 0;
    }

    let amount = this.info.totalInCurMonth;
    if (this.isBR) {
      amount += this.info.totalBRInCurMonth;
    }

    return amount;
  }

  //月支出
  sumOutMonth(): number {
    if (!this.info) {
      return 0;
    }

    let amount = this.info.totalOutCurMonth;
    if (this.isBR) {
      amount += this.info.totalBROutCurMonth;
    }

    return amount;
  }

  //退出登录
  async logOut() {
    await this.msgBox.actSheet(
      [
        {
          text: '退出',
          role: 'destructive',
          handler: () => {
            //清空缓存
            this.accStore.clear();
            this.basStore.clear();

            //跳到登录页
            this.router.navigate(['login']);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]);
  }
}

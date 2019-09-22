import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { ModalController, NavParams } from '@ionic/angular';
import { BasicStore } from 'src/store/BasicStore';

@Component({
  selector: 'app-account-turnover-filter',
  templateUrl: './account-turnover-filter.page.html',
  styleUrls: ['./account-turnover-filter.page.scss'],
})
export class AccountTurnoverFilterPage extends BasePage implements OnInit {

  //账户列表
  lstAccount: Array<AccountFilterInfo>;
  //是否全选
  isSelectAll = true;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private basicStore: BasicStore) {
    super();
  }

  ngOnInit() {

    //初始化页面
    this.initPage();
  }

  //初始化页面
  async initPage() {
    //账户列表
    let list = this.basicStore.getAmountAccountList();

    //入参
    let lstParamsAccount = this.navParams.get('lstSelectedAccID') as Array<number>;

    //筛选列表
    this.lstAccount = new Array<AccountFilterInfo>();
    list.forEach(item => {
      let account = new AccountFilterInfo();
      this.lstAccount.push(account);

      account.id = item.id;
      account.name = item.name;
      if (lstParamsAccount.indexOf(account.id) > -1) {
        account.checked = true;
      }
    });
  }

  //全选/全不选
  selectAll() {
    this.lstAccount.forEach(item => {
      item.checked = this.isSelectAll;
    });
  }

  //筛选
  doFilter() {
    let lstChecked = new Array<number>();
    lstChecked.push(0); //如果一条也没选，让它查询不出数据

    this.lstAccount.forEach(item => {
      if (item.checked) {
        lstChecked.push(item.id);
      }
    });

    this.dismiss(lstChecked);
  }

  //销毁页面
  dismiss(lstChecked: Array<number>) {
    this.modalCtrl.dismiss(lstChecked);
  }
}

//账户筛选信息
class AccountFilterInfo {
  id: number; //主键ID
  name: string; //账户名称
  checked: boolean; //是否选中
}

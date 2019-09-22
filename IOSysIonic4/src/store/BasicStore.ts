import { Store } from './Store';
import { Injectable } from '@angular/core';
import { AmountAccountListInfo } from 'src/model/basic/AmountAccountListInfo';
import { InTypeListInfo } from 'src/model/basic/InTypeListInfo';
import { OutCategoryTypeListInfo } from 'src/model/basic/OutCategoryTypeListInfo';
import { IDNameInfo } from 'src/model/comm/IDNameInfo';

@Injectable()
export class BasicStore {
  constructor(private store: Store) {}

  //清空缓存
  clear() {
    this.setAmountAccountList(null);
    this.setInTypeList(null);
    this.setOutCategoryTypeList(null);
  }

  //保存账户列表信息
  setAmountAccountList(list: Array<AmountAccountListInfo>) {
    this.store.setSession('AmountAccountListInfo', list);
  }

  //获取账户列表信息
  getAmountAccountList(): Array<AmountAccountListInfo> {
    return this.store.getSession<Array<AmountAccountListInfo>>('AmountAccountListInfo');
  }

  //保存收入类型列表信息
  setInTypeList(list: Array<InTypeListInfo>) {
    this.store.setSession('InTypeListInfo', list);
  }

  //获取收入类型列表信息
  getInTypeList(): Array<InTypeListInfo> {
    return this.store.getSession<Array<InTypeListInfo>>('InTypeListInfo');
  }

  //保存支出分类/类型列表信息
  setOutCategoryTypeList(list: Array<OutCategoryTypeListInfo>) {
    this.store.setSession('OutCategoryTypeListInfo', list);
  }

  //获取支出分类/类型列表信息
  getOutCategoryTypeList(): Array<OutCategoryTypeListInfo> {
    return this.store.getSession<Array<OutCategoryTypeListInfo>>('OutCategoryTypeListInfo');
  }

  //保存借还类型列表信息
  setBorrowRepayList(list: Array<IDNameInfo>) {
    this.store.setSession('BorrowRepayList', list);
  }

  //获取借还类型列表信息
  getBorrowRepayList(): Array<IDNameInfo> {
    return this.store.getSession<Array<IDNameInfo>>('BorrowRepayList');
  }
}

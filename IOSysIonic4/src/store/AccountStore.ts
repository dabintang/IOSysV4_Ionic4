import { LoginReq } from 'src/model/account/LoginReq';
import { Store } from './Store';
import { LoginInfo } from 'src/model/account/LoginInfo';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountStore {
  constructor(private store: Store) {}

  //清空缓存
  clear() {
    this.setLoginReq(null);
    this.setLoginInfo(null);
  }

  //保存登录条件
  setLoginReq(val: LoginReq) {
    this.store.setLocal('LoginReq', val);
  }

  //获取登录条件
  getLoginReq(): LoginReq {
    return this.store.getLocal<LoginReq>('LoginReq');
  }

  // //保存是否使用手势
  // setIsGesture(val: boolean) {
  //   this.store.setLocal('IsGesture', val);
  // }

  // //获取是否使用手势
  // getIsGesture(): boolean {
  //   return this.store.getLocal<boolean>('IsGesture');
  // }

  //保存登录信息
  setLoginInfo(val: LoginInfo) {
    this.store.setSession('LoginInfo', val);
  }

  //获取登录信息
  getLoginInfo(): LoginInfo {
    return this.store.getSession<LoginInfo>('LoginInfo');
  }
}

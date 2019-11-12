import { LoginReq } from 'src/model/account/LoginReq';
import { Store } from './Store';
import { LoginInfo } from 'src/model/account/LoginInfo';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigStore {
  constructor(private store: Store) { }

  //保存接口地址
  setApiBaseUrl(val: string) {
    this.store.setLocal('ApiBaseUrl', val);
  }

  //获取接口地址
  getApiBaseUrl(): string {
    let apiBaseUrl = this.store.getLocal<string>('ApiBaseUrl');
    if (apiBaseUrl == null) {
      apiBaseUrl = 'http://172.81.235.6:20001';
      this.setApiBaseUrl(apiBaseUrl);
    }

    return apiBaseUrl;
  }
}

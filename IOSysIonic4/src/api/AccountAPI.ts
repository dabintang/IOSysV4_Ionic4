import { Injectable } from '@angular/core';
import { API } from 'src/api/API';
import { LoginReq } from 'src/model/account/LoginReq';
import { LoginInfo } from 'src/model/account/LoginInfo';
import { ResultInfo } from 'src/model/comm/ResultInfo';

@Injectable()
export class AccountAPI {
  //构造函数
  constructor(private api: API) {
  }

  //登录
  async login(req: LoginReq): Promise<ResultInfo<LoginInfo>> {
    return await this.api.postReq<ResultInfo<LoginInfo>>("/api/Account/Login", req);
  }
}
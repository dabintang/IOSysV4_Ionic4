import { Injectable } from '@angular/core';
import { API } from './API';
import { AppVerInfo } from 'src/model/app/AppVerInfo';
import { ResultInfo } from 'src/model/comm/ResultInfo';

@Injectable()
export class AppAPI {

  // 构造函数
  constructor(private api: API) { }

  // 获取最新app版本信息
  async getAppVer(): Promise<ResultInfo<AppVerInfo>> {
    return await this.api.get<ResultInfo<AppVerInfo>>(
      '/api/App/GetAppVer',
      null,
      false
    );
  }
}

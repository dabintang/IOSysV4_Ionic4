import { BaseInfo } from '../comm/BaseInfo';

// app版本信息
export class AppVerInfo extends BaseInfo {
  ver: string; // 版本号
  isForce: boolean; // 是否强制更新
  path: string; // APP安装包路径
}

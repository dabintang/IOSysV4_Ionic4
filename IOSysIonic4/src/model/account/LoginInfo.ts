import { BaseInfo } from 'src/model/comm/baseInfo';

//登录信息
export class LoginInfo extends BaseInfo {
  nickName: string; //昵称
  familyName: string; //家庭名称
  token: string; //token
}

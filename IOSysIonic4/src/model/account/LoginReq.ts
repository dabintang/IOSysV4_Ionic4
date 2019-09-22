import { BaseReq } from 'src/model/comm/BaseReq';

//登录参数
export class LoginReq extends BaseReq {
  loginName:string;//登录名
  password:string;//密码
}

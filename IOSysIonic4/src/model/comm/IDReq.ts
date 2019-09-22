import { BaseReq } from './BaseReq';

//主键ID 作为请求条件
export class IDReq extends BaseReq {
  id: number; //主键ID
}

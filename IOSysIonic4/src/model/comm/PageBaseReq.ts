import { BaseReq } from './BaseReq';

//分页请求类 基类
export class PageBaseReq extends BaseReq {
  pageNum: number; //获取页码
  pageSize: number; //每页条数
  sort: number; //排序
}

import { ResultList } from './ResultList';

//分页列表结果
export class ResultPageList<T> extends ResultList<T> {
  startNum: number; //返回的第一条记录位置（第几条）
  totalRecord: number; //总条数
  hasMore: boolean; //是否还有更多的记录
}
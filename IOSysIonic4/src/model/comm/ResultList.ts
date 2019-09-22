//列表结果
export class ResultList<T> implements IResult {
  isOK: boolean; //是否成功
  code: string; //消息编码
  msg: string; //信息
  lstInfo: Array<T>; //结果
}
//单个结果
export class ResultInfo<T> implements IResult {
  isOK: boolean; //是否成功
  code: string; //消息编码
  msg: string; //信息
  info: T; //结果
}
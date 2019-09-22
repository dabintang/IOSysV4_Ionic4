//通用帮助类
export class ComHelper {

  static PageSize: number = 15;

  //判断是否空值（null或者undefined）
  //val：需判断的内容
  static isEmptry(val: any): boolean {
    if (val == null || typeof (val) == 'undefined' || val == '') {
      return true;
    }

    return false;
  }

  //字符串填充
  //str：需填充的字符串
  //len：填充到个数
  //padStr：填充内容
  static padding(str: any, len: number, padStr: string): string {
    let padLen = len - (str + '').length;
    for (let i = 0; i < padLen; i++) {
      str = padStr + str;
    }

    return str;
  }
}

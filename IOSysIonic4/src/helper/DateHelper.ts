import { ComHelper } from './comHelper';

//日期帮助类
export class DateHelper {

  private static SIGN_REGEXP: RegExp = /([yMdhsm])(\1*)/g;
  private static DEFAULT_PATTERN = 'yyyy-MM-dd';

  //格式化日期
  //date：日期
  //pattern：格式（默认为 yyyy-MM-dd）
  static format(date: Date, pattern: string = ''): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    pattern = pattern || this.DEFAULT_PATTERN;
    let that = this;
    return pattern.replace(this.SIGN_REGEXP, ($0) => {
      switch ($0.charAt(0)) {
        case 'y':
          return ComHelper.padding(date.getFullYear(), $0.length, '0');
        case 'M':
          return ComHelper.padding(date.getMonth() + 1, $0.length, '0');
        case 'd':
          return ComHelper.padding(date.getDate(), $0.length, '0');
        case 'w':
          return (date.getDay() + 1) + '';
        case 'h':
          return ComHelper.padding(date.getHours(), $0.length, '0');
        case 'm':
          return ComHelper.padding(date.getMinutes(), $0.length, '0');
        case 's':
          return ComHelper.padding(date.getSeconds(), $0.length, '0');
      }
    });
  }

  //解析日期字符串
  //dateStr：日期字符串
  //pattern：格式（默认为 yyyy-MM-dd）
  static parse(dateStr: string, pattern: string = ''): Date {
    pattern = pattern || this.DEFAULT_PATTERN;
    let matchs1 = pattern.match(this.SIGN_REGEXP);
    let matchs2 = dateStr.match(/(\d)+/g);
    if (matchs1.length === matchs2.length) {
      let _date = new Date(1970, 0, 1);
      for (let i = 0; i < matchs1.length; i++) {
        let _int = parseInt(matchs2[i]);
        let sign = matchs1[i];
        switch (sign.charAt(0)) {
          case 'y':
            _date.setFullYear(_int);
            break;
          case 'M':
            _date.setMonth(_int - 1);
            break;
          case 'd':
            _date.setDate(_int);
            break;
          case 'h':
            _date.setHours(_int);
            break;
          case 'm':
            _date.setMinutes(_int);
            break;
          case 's':
            _date.setSeconds(_int);
            break;
        }
      }
      return _date;
    }
    return null;
  }

  //日期加减
  //date：日期
  //addDay：加天数（如减天数，传入负数）
  static addDay(date: Date, addDay: number): Date {
    date.setDate(date.getDate() + addDay);
    return date;
  }

  //月份加减
  //date：日期
  //addMonth：加月数（如减月数，传入负数）
  static addMonth(date: Date, addMonth: number): Date {
    date.setMonth(date.getMonth() + addMonth);
    return date;
  }

  //获取制定日期的月初
  static getMonthStart(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  //获取制定日期的月末
  static getMonthEnd(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  }
}

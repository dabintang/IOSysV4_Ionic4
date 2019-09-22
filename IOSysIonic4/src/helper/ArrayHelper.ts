//数组帮助类
export class ArrayHelper {
  //对象数组排序
  //arrObj：对象数组
  //lstSortReq：排序条件
  static sortArrayObj<T>(arrObj: Array<T>, lstSortReq: Array<SortReq>): Array<T> {
    if (!arrObj || !lstSortReq) {
      return arrObj;
    }

    arrObj.sort((item1, item2) => {
      //排序结果
      let sortRet: number = 0;

      //循环多个排序条件
      for (let req of lstSortReq) {
        let v1 = item1[req.fieldName];
        let v2 = item2[req.fieldName];

        //因子
        let factor = req.asc ? 1 : -1;

        if (v1 > v2) {
          sortRet = factor;
          break; //结束内部循环
        } else if (v1 < v2) {
          sortRet = -factor;
          break; //结束内部循环
        }
      }

      return sortRet;
    });

    return arrObj;
  }
}

//排序条件
export class SortReq {
  constructor(fieldName: string, asc: boolean) {
    this.fieldName = fieldName;
    this.asc = asc;
  }

  fieldName: string; //排序字段
  asc: boolean; //是否升序
}

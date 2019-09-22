import { Injectable } from '@angular/core';
import { API } from 'src/api/API';
import { AmountAccountListInfo } from 'src/model/basic/AmountAccountListInfo';
import { ResultList } from 'src/model/comm/ResultList';
import { AmountAccountInfo } from 'src/model/basic/AmountAccountInfo';
import { ResultInfo } from 'src/model/comm/ResultInfo';
import { IDReq } from 'src/model/comm/IDReq';
import { InTypeListInfo } from 'src/model/basic/InTypeListInfo';
import { InTypeInfo } from 'src/model/basic/InTypeInfo';
import { OutCategoryTypeListInfo } from 'src/model/basic/OutCategoryTypeListInfo';
import { OutCategoryInfo } from 'src/model/basic/OutCategoryInfo';
import { OutTypeInfo } from 'src/model/basic/OutTypeInfo';
import { BasicStore } from 'src/store/BasicStore';
import { IDNameInfo } from 'src/model/comm/IDNameInfo';

@Injectable()
export class BasicAPI {
  //构造函数
  constructor(private api: API, private basicStore: BasicStore) {}

  /********************** 账户 Start **********************/

  //查询账户列表
  async queryAmountAccount(showLoader: boolean = true): Promise<ResultList<AmountAccountListInfo>> {
    let list = await this.api.get<ResultList<AmountAccountListInfo>>(
      '/api/Basic/QueryAmountAccount',
      null,
      showLoader
    );

    //缓存
    this.basicStore.setAmountAccountList(list.lstInfo);

    return list;
  }

  //获取账户
  async getAmountAccount(id: number): Promise<ResultInfo<AmountAccountInfo>> {
    const url = '/api/Basic/GetAmountAccount/' + id;
    return await this.api.get<ResultInfo<AmountAccountInfo>>(url, null, false);
  }

  //保存资金账户
  async saveAmountAccount(info: AmountAccountInfo): Promise<ResultInfo<number>> {
    const url = '/api/Basic/SaveAmountAccount';
    return await this.api.postInfo<ResultInfo<number>>(url, info, true);
  }

  //删除资金账户
  async deleteAmountAccount(id: number): Promise<ResultInfo<boolean>> {
    const url = '/api/Basic/DeleteAmountAccount';

    const req: IDReq = new IDReq();
    req.id = id;

    return await this.api.postInfo<ResultInfo<boolean>>(url, req, true);
  }

  /********************** 账户 End **********************/

  /********************** 收入类型 Start **********************/

  //查询收入类型列表
  async queryInType(showLoader: boolean = true): Promise<ResultList<InTypeListInfo>> {
    let list = await this.api.get<ResultList<InTypeListInfo>>(
      '/api/Basic/QueryInType',
      null,
      showLoader
    );

    //缓存
    this.basicStore.setInTypeList(list.lstInfo);

    return list;
  }

  //获取收入类型
  async getInType(id: number): Promise<ResultInfo<InTypeInfo>> {
    const url = '/api/Basic/GetInType/' + id;
    return await this.api.get<ResultInfo<InTypeInfo>>(url, null, false);
  }

  //保存收入类型
  async saveInType(info: InTypeInfo): Promise<ResultInfo<number>> {
    const url = '/api/Basic/SaveInType';
    return await this.api.postInfo<ResultInfo<number>>(url, info, true);
  }

  //删除收入类型
  async deleteInType(id: number): Promise<ResultInfo<boolean>> {
    const url = '/api/Basic/DeleteInType';

    const req: IDReq = new IDReq();
    req.id = id;

    return await this.api.postInfo<ResultInfo<boolean>>(url, req, true);
  }

  /********************** 收入类型 End **********************/

  /********************** 支出类型/类型 Start **********************/

  //查询支出分类类型列表
  async queryOutCategoryType(showLoader: boolean = true): Promise<ResultList<OutCategoryTypeListInfo>> {
    let list = await this.api.get<ResultList<OutCategoryTypeListInfo>>(
      '/api/Basic/QueryOutCategoryType',
      null,
      showLoader
    );

    //缓存
    this.basicStore.setOutCategoryTypeList(list.lstInfo);

    return list;
  }

  //获取支出分类
  async getOutCategory(id: number): Promise<ResultInfo<OutCategoryInfo>> {
    const url = '/api/Basic/GetOutCategory/' + id;
    return await this.api.get<ResultInfo<OutCategoryInfo>>(url, null, false);
  }

  //保存支出分类
  async saveOutCategory(info: OutCategoryInfo): Promise<ResultInfo<number>> {
    const url = '/api/Basic/SaveOutCategory';
    return await this.api.postInfo<ResultInfo<number>>(url, info, true);
  }

  //删除支出分类
  async deleteOutCategory(id: number): Promise<ResultInfo<boolean>> {
    const url = '/api/Basic/DeleteOutCategory';

    const req: IDReq = new IDReq();
    req.id = id;

    return await this.api.postInfo<ResultInfo<boolean>>(url, req, true);
  }

  //获取支出类型
  async getOutType(id: number): Promise<ResultInfo<OutTypeInfo>> {
    const url = '/api/Basic/GetOutType/' + id;
    return await this.api.get<ResultInfo<OutTypeInfo>>(url, null, false);
  }

  //保存支出类型
  async saveOutType(info: OutTypeInfo): Promise<ResultInfo<number>> {
    const url = '/api/Basic/SaveOutType';
    return await this.api.postInfo<ResultInfo<number>>(url, info, true);
  }

  //删除支出类型
  async deleteOutType(id: number): Promise<ResultInfo<boolean>> {
    const url = '/api/Basic/DeleteOutType';

    const req: IDReq = new IDReq();
    req.id = id;

    return await this.api.postInfo<ResultInfo<boolean>>(url, req, true);
  }

  /********************** 支出类型/类型 End **********************/

  /********************** 下拉框 Start **********************/

  //获取借还类型
  async queryBorrowRepayType(): Promise<ResultList<IDNameInfo>> {
    const url = '/api/Basic/QueryBorrowRepayType';
    let list = await this.api.get<ResultList<IDNameInfo>>(url, null, false);

    //缓存
    this.basicStore.setBorrowRepayList(list.lstInfo);

    return list;
  }

  /********************** 下拉框 End **********************/
}

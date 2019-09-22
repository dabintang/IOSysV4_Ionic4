import { Injectable } from '@angular/core';
import { API } from 'src/api/API';
import { ResultList } from 'src/model/comm/ResultList';
import { InComeListInfo } from 'src/model/inout/InComeListInfo';
import { ResultInfo } from 'src/model/comm/ResultInfo';
import { InComeInfo } from 'src/model/inout/InComeInfo';
import { IDReq } from 'src/model/comm/IDReq';
import { TransferListInfo } from 'src/model/inout/TransferListInfo';
import { TransferInfo } from 'src/model/inout/TransferInfo';
import { BorrowRepayListInfo } from 'src/model/inout/BorrowRepayListInfo';
import { BorrowRepayInfo } from 'src/model/inout/BorrowRepayInfo';
import { OutPutListInfo } from 'src/model/inout/OutPutListInfo';
import { OutPutInfo } from 'src/model/inout/OutPutInfo';

@Injectable()
export class InOutAPI {
  //构造函数
  constructor(private api: API) {}

  /********************** 收入 Start **********************/

  //查询收入列表
  async queryInCome(date: string, showLoader: boolean = true): Promise<ResultList<InComeListInfo>> {
    const url = '/api/InOut/QueryInCome/' + date;
    return await this.api.get<ResultList<InComeListInfo>>(url, null, showLoader);
  }

  //获取收入信息
  async getInCome(id: number): Promise<ResultInfo<InComeInfo>> {
    const url = '/api/InOut/GetInCome/' + id;
    return await this.api.get<ResultInfo<InComeInfo>>(url, null, false);
  }

  //保存收入信息
  async saveInCome(info: InComeInfo): Promise<ResultInfo<number>> {
    const url = '/api/InOut/SaveInCome';
    return await this.api.postInfo<ResultInfo<number>>(url, info, true);
  }

  //删除收入信息
  async deleteInCome(id: number): Promise<ResultInfo<boolean>> {
    const url = '/api/InOut/DeleteInCome';

    const req: IDReq = new IDReq();
    req.id = id;

    return await this.api.postInfo<ResultInfo<boolean>>(url, req, true);
  }

  /********************** 收入 End **********************/

  /********************** 支出 Start **********************/

  //查询支出列表
  async queryOutPut(date: string, showLoader: boolean = true): Promise<ResultList<OutPutListInfo>> {
    const url = '/api/InOut/QueryOutPut/' + date;
    return await this.api.get<ResultList<OutPutListInfo>>(url, null, showLoader);
  }

  //获取支出信息
  async getOutPut(id: number): Promise<ResultInfo<OutPutInfo>> {
    const url = '/api/InOut/GetOutPut/' + id;
    return await this.api.get<ResultInfo<OutPutInfo>>(url, null, false);
  }

  //保存支出信息
  async saveOutPut(info: OutPutInfo): Promise<ResultInfo<number>> {
    const url = '/api/InOut/SaveOutPut';
    return await this.api.postInfo<ResultInfo<number>>(url, info, true);
  }

  //删除支出信息
  async deleteOutPut(id: number): Promise<ResultInfo<boolean>> {
    const url = '/api/InOut/DeleteOutPut';

    const req: IDReq = new IDReq();
    req.id = id;

    return await this.api.postInfo<ResultInfo<boolean>>(url, req, true);
  }

  /********************** 支出 End **********************/

  /********************** 转账 Start **********************/

  //查询转账列表
  async queryTransfer(
    date: string,
    showLoader: boolean = true
  ): Promise<ResultList<TransferListInfo>> {
    const url = '/api/InOut/QueryTransfer/' + date;
    return await this.api.get<ResultList<TransferListInfo>>(url, null, showLoader);
  }

  //获取转账信息
  async getTransfer(id: number): Promise<ResultInfo<TransferInfo>> {
    const url = '/api/InOut/GetTransfer/' + id;
    return await this.api.get<ResultInfo<TransferInfo>>(url, null, false);
  }

  //保存转账信息
  async saveTransfer(info: TransferInfo): Promise<ResultInfo<number>> {
    const url = '/api/InOut/SaveTransfer';
    return await this.api.postInfo<ResultInfo<number>>(url, info, true);
  }

  //删除转账信息
  async deleteTransfer(id: number): Promise<ResultInfo<boolean>> {
    const url = '/api/InOut/DeleteTransfer';

    const req: IDReq = new IDReq();
    req.id = id;

    return await this.api.postInfo<ResultInfo<boolean>>(url, req, true);
  }

  /********************** 转账 End **********************/

  /********************** 借还 Start **********************/

  //查询借还列表
  async queryBorrowRepay(
    date: string,
    showLoader: boolean = true
  ): Promise<ResultList<BorrowRepayListInfo>> {
    const url = '/api/InOut/QueryBorrowRepay/' + date;
    return await this.api.get<ResultList<BorrowRepayListInfo>>(url, null, showLoader);
  }

  //获取借还信息
  async getBorrowRepay(id: number): Promise<ResultInfo<BorrowRepayInfo>> {
    const url = '/api/InOut/GetBorrowRepay/' + id;
    return await this.api.get<ResultInfo<BorrowRepayInfo>>(url, null, false);
  }

  //保存借还信息
  async saveBorrowRepay(info: BorrowRepayInfo): Promise<ResultInfo<number>> {
    const url = '/api/InOut/SaveBorrowRepay';
    return await this.api.postInfo<ResultInfo<number>>(url, info, true);
  }

  //删除借还信息
  async deleteBorrowRepay(id: number): Promise<ResultInfo<boolean>> {
    const url = '/api/InOut/DeleteBorrowRepay';

    const req: IDReq = new IDReq();
    req.id = id;

    return await this.api.postInfo<ResultInfo<boolean>>(url, req, true);
  }

  /********************** 借还 End **********************/
}

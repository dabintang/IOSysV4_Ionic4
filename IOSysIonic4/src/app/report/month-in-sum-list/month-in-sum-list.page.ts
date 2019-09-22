import { Component, OnInit } from '@angular/core';
import { BasePage } from 'src/app/base/BasePage';
import { ReportAPI } from 'src/api/ReportAPI';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SumListInfo } from 'src/model/comm/SumListInfo';
import { InSumReq } from 'src/model/report/InSumReq';
import { DateHelper } from 'src/helper/DateHelper';
import { EnmInGroupType } from 'src/model/enums/EnmInGroupType';
import { BasicStore } from 'src/store/BasicStore';
import { BasicAPI } from 'src/api/BasicAPI';
import { InTypeListInfo } from 'src/model/basic/InTypeListInfo';
import { EnmDataType } from 'src/model/enums/enmDataType';
import { IDNameInfo } from 'src/model/comm/IDNameInfo';

@Component({
  selector: 'app-month-in-sum-list',
  templateUrl: './month-in-sum-list.page.html',
  styleUrls: ['./month-in-sum-list.page.scss'],
})
export class MonthInSumListPage extends BasePage implements OnInit {

  isContainBorrowRepay: boolean; //是否包含借还
  reqMonth: Date; //月份
  list: Array<SumListInfo<string>>; //列表

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private rptAPI: ReportAPI,
    private basicAPI: BasicAPI,
    private basicStore: BasicStore,
  ) {
    super();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.reqMonth = DateHelper.parse(params.month);
      this.isContainBorrowRepay = params.isContainBorrowRepay;

      //初始化
      this.initPage();
    });
  }

  //查询
  async search(showLoader: boolean = true): Promise<Array<SumListInfo<string>>> {
    //条件
    let req = new InSumReq();
    req.startDate = DateHelper.getMonthStart(this.reqMonth);
    req.endDate = DateHelper.getMonthEnd(this.reqMonth);
    req.groupType = EnmInGroupType.InType;
    req.isContainBorrowRepay = this.isContainBorrowRepay;

    //查询列表
    const lstInfo = (await this.rptAPI.sumInCome(req, showLoader)).lstInfo;
    return lstInfo;
  }

  //初始化
  async initPage() {
    //查询
    this.list = await this.search();
  }

  //刷新
  async doRefresh(event: any) {
    //查询
    this.list = await this.search(false);

    //刷新完成
    event.target.complete();
  }

  //计算总金额
  totalAmount(): number {
    let total = 0;
    if (this.list) {
      this.list.forEach(item => {
        total += item.value;
      });
    }

    return total;
  }

  //跳转到收支统计明细页面
  async clickItem(item: SumListInfo<string>) {
    let dataType: EnmDataType = null; //数据类型
    let groupID: number = -1; //分组ID：收入类型ID/借还类型ID

    //获取收入类型
    let lstInType = await this.queryInType();
    lstInType.forEach(inType => {
      if (item.name == inType.name) {
        dataType = EnmDataType.In;
        groupID = inType.id;
        return false;
      }
    });

    //没找到收入类型，看看是不是借还类型
    if (dataType == null && this.isContainBorrowRepay) {
      let lstBRType = await this.queryBorrowRepayType();
      lstBRType.forEach(brType => {
        if (item.name == brType.name) {
          dataType = EnmDataType.BorrowRepay;
          groupID = brType.id;
          return false;
        }
      });
    }

    //如果既不是收入类型，也不是借还类型，说明是异常数据，不做处理
    if (dataType == null) {
      return;
    }

    this.router.navigate(
      ['tabs/reportTab/monthInOutSumDetailList'],
      { queryParams: { month: DateHelper.format(this.reqMonth), dataType: dataType, groupID: groupID, groupName: item.name } });
  }

  //获取收入类型
  async queryInType(): Promise<Array<InTypeListInfo>> {
    let list = this.basicStore.getInTypeList();
    if (list == null) {
      list = (await this.basicAPI.queryInType(false)).lstInfo;
    }

    return list;
  }

  //获取借还类型
  async queryBorrowRepayType(): Promise<Array<IDNameInfo>> {
    let list = this.basicStore.getBorrowRepayList();
    if (list == null) {
      list = (await this.basicAPI.queryBorrowRepayType()).lstInfo;
    }

    return list;
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inoutTab',
        children: [
          {
            path: '',
            loadChildren: '../inout/inout-tab/inout-tab.module#InoutTabPageModule'
          },
          {
            path: 'inComeList',
            loadChildren: '../inout/in-come-list/in-come-list.module#InComeListPageModule'
          },
          {
            path: 'outPutList',
            loadChildren: '../inout/out-put-list/out-put-list.module#OutPutListPageModule'
          },
          {
            path: 'transferList',
            loadChildren: '../inout/transfer-list/transfer-list.module#TransferListPageModule'
          },
          {
            path: 'borrowRepayList',
            loadChildren: '../inout/borrow-repay-list/borrow-repay-list.module#BorrowRepayListPageModule'
          }
        ]
      },
      {
        path: 'reportTab',
        children: [
          {
            path: '',
            loadChildren: '../report/report-tab/report-tab.module#ReportTabPageModule'
          },
          {
            path: 'accountTurnoverList',
            loadChildren: '../report/account-turnover-list/account-turnover-list.module#AccountTurnoverListPageModule'
          },
          {
            path: 'borrowRepaySumList',
            loadChildren: '../report/borrow-repay-sum-list/borrow-repay-sum-list.module#BorrowRepaySumListPageModule'
          },
          {
            path: 'borrowRepaySumDetailList/:target',
            loadChildren: '../report/borrow-repay-sum-detail-list/borrow-repay-sum-detail-list.module#BorrowRepaySumDetailListPageModule'
          },
          {
            path: 'monthSumList',
            loadChildren: '../report/month-sum-list/month-sum-list.module#MonthSumListPageModule'
          },
          {
            path: 'monthInSumList',
            loadChildren: '../report/month-in-sum-list/month-in-sum-list.module#MonthInSumListPageModule'
          },
          {
            path: 'monthInOutSumDetailList',
            loadChildren: '../report/month-in-out-sum-detail-list/month-in-out-sum-detail-list.module#MonthInOutSumDetailListPageModule'
          },
          {
            path: 'monthOutSumList',
            loadChildren: '../report/month-out-sum-list/month-out-sum-list.module#MonthOutSumListPageModule'
          }
        ]
      },
      {
        path: 'basicTab',
        children: [
          {
            path: '',
            loadChildren: '../basic/basic-tab/basic-tab.module#BasicTabPageModule'
          },
          {
            path: 'inTypeList',
            loadChildren: '../basic/in-type-list/in-type-list.module#InTypeListPageModule'
          },
          {
            path: 'outTypeList',
            loadChildren: '../basic/out-type-list/out-type-list.module#OutTypeListPageModule'
          },
          {
            path: 'amountAccountList',
            loadChildren:
              '../basic/amount-account-list/amount-account-list.module#AmountAccountListPageModule'
          }
        ]
      },
      {
        path: 'mineTab',
        children: [
          {
            path: '',
            loadChildren: '../mine/mine/mine.module#MinePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/inoutTab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/inoutTab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }

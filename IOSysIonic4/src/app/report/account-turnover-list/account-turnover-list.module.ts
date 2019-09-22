import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AccountTurnoverListPage } from './account-turnover-list.page';
import { AccountTurnoverFilterPage } from '../account-turnover-filter/account-turnover-filter.page';

const routes: Routes = [
  {
    path: '',
    component: AccountTurnoverListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AccountTurnoverListPage, AccountTurnoverFilterPage],
  entryComponents: [AccountTurnoverFilterPage]
})
export class AccountTurnoverListPageModule {}

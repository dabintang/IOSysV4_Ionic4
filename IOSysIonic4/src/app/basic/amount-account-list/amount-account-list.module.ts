import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AmountAccountListPage } from './amount-account-list.page';
import { AmountAccountDetailPage } from '../amount-account-detail/amount-account-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AmountAccountListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AmountAccountListPage, AmountAccountDetailPage],
  entryComponents: [AmountAccountDetailPage]
})
export class AmountAccountListPageModule {}

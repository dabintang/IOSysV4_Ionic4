import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonthInOutSumDetailListPage } from './month-in-out-sum-detail-list.page';

const routes: Routes = [
  {
    path: '',
    component: MonthInOutSumDetailListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonthInOutSumDetailListPage]
})
export class MonthInOutSumDetailListPageModule {}

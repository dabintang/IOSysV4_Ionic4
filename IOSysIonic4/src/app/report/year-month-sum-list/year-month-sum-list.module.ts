import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { YearMonthSumListPage } from './year-month-sum-list.page';

const routes: Routes = [
  {
    path: '',
    component: YearMonthSumListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [YearMonthSumListPage]
})
export class YearMonthSumListPageModule {}

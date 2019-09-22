import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonthOutSumListPage } from './month-out-sum-list.page';

const routes: Routes = [
  {
    path: '',
    component: MonthOutSumListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonthOutSumListPage]
})
export class MonthOutSumListPageModule {}

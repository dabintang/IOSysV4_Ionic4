import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonthInSumListPage } from './month-in-sum-list.page';

const routes: Routes = [
  {
    path: '',
    component: MonthInSumListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonthInSumListPage]
})
export class MonthInSumListPageModule {}

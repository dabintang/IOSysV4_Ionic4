import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonthSumListPage } from './month-sum-list.page';
import { MonthSumPopComponent } from 'src/app/components/month-sum-pop/month-sum-pop.component';

const routes: Routes = [
  {
    path: '',
    component: MonthSumListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonthSumListPage, MonthSumPopComponent],
  entryComponents: [MonthSumPopComponent]
})
export class MonthSumListPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InComeListPage } from './in-come-list.page';

const routes: Routes = [
  {
    path: '',
    component: InComeListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InComeListPage],
  entryComponents: []
})
export class InComeListPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InTypeListPage } from './in-type-list.page';
import { InTypeDetailPage } from '../in-type-detail/in-type-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: InTypeListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [InTypeListPage, InTypeDetailPage],
  entryComponents: [InTypeDetailPage]
})
export class InTypeListPageModule {}

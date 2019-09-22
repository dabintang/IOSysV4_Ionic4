import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OutTypeListPage } from './out-type-list.page';
import { OutCategoryDetailPage } from '../out-category-detail/out-category-detail.page';
import { OutTypeDetailPage } from '../out-type-detail/out-type-detail.page';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: '',
    component: OutTypeListPage
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
  declarations: [OutTypeListPage, OutCategoryDetailPage, OutTypeDetailPage],
  entryComponents: [OutCategoryDetailPage, OutTypeDetailPage]
})
export class OutTypeListPageModule {}

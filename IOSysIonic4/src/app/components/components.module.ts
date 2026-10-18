import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IonTdbPickerSingleComponent } from './ion-tdb-picker-single/ion-tdb-picker-single.component';
import { AmountAccountPickerComponent } from './amount-account-picker/amount-account-picker.component';
import { OutCategoryPickerComponent } from './out-category-picker/out-category-picker.component';
import { InTypePickerComponent } from './in-type-picker/in-type-picker.component';
import { BorrowRepayTypePickerComponent } from './borrow-repay-type-picker/borrow-repay-type-picker.component';
import { IonTdbPickerMulti2Component } from './ion-tdb-picker-multi2/ion-tdb-picker-multi2.component';
import { OutTypePickerComponent } from './out-type-picker/out-type-picker.component';
import { MonthSumPopComponent } from './month-sum-pop/month-sum-pop.component';

@NgModule({
  declarations: [
    IonTdbPickerSingleComponent,
    IonTdbPickerMulti2Component,
    AmountAccountPickerComponent,
    InTypePickerComponent,
    OutCategoryPickerComponent,
    BorrowRepayTypePickerComponent,
    OutTypePickerComponent,
    MonthSumPopComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    IonTdbPickerSingleComponent,
    IonTdbPickerMulti2Component,
    AmountAccountPickerComponent,
    InTypePickerComponent,
    OutCategoryPickerComponent,
    BorrowRepayTypePickerComponent,
    OutTypePickerComponent,
    MonthSumPopComponent],
  entryComponents: [MonthSumPopComponent]
})
export class ComponentsModule { }

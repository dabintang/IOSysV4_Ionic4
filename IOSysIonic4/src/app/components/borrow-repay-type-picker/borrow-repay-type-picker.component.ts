import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonTdbPickerSingleComponent } from '../ion-tdb-picker-single/ion-tdb-picker-single.component';
import { PickerController } from '@ionic/angular';
import { BasicStore } from 'src/store/BasicStore';
import { BasicAPI } from 'src/api/BasicAPI';
import { PickerColOption } from 'src/model/comm/PickerColOption';

@Component({
  selector: 'borrow-repay-type-picker',
  templateUrl: './borrow-repay-type-picker.component.html',
  styleUrls: ['./borrow-repay-type-picker.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BorrowRepayTypePickerComponent),
    multi: true
  }]
})
export class BorrowRepayTypePickerComponent extends IonTdbPickerSingleComponent {

  constructor(
    protected pickerCtrl: PickerController,
    private basicStore: BasicStore,
    private basicAPI: BasicAPI
  ) {
    super(pickerCtrl);
  }

  ngOnInit() {
    //初始化选项
    this.initOptions();
  }

  //初始化选项
  async initOptions() {
    let list = this.basicStore.getBorrowRepayList();
    if (list == null) {
      //查询列表
      list = (await this.basicAPI.queryBorrowRepayType()).lstInfo;
    }

    //构建选项
    list.forEach(item => {
      let option = new PickerColOption();
      option.text = item.name;
      option.value = item.id;

      this.options.push(option);
    });

    //刷新显示文本
    this.refreshText();
  }
}
